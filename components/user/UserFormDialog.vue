<template>
  <CommonDialog
    v-model="dialog"
    :title="dialogTitle"
    :submit="onSubmit"
    :action-loading="actionLoading"
    width="400"
    action-text="Confirmer"
  >
    <Form
      ref="form"
      :validation-schema="formSchema"
      :initial-values="initialValues"
      @submit="onSubmit"
    >
      <DynamicFields :fields="fields" />
    </Form>
  </CommonDialog>
</template>

<script lang="ts" setup>
import { object, string } from 'yup'
import { Form } from 'vee-validate'
import { useSnackbarStore } from '@/stores/snackbar'
import { useRoleStore } from '@/stores/role'
import { useUserStore } from '@/stores/user'
import { storeToRefs } from 'pinia'
import { UserI } from '~/types/user'
// eslint-disable-next-line import/no-extraneous-dependencies
import { PropType } from 'vue'
import { FormActionE } from '~/types/form'

const snackbarStore = useSnackbarStore()
const roleStore = useRoleStore()
const userStore = useUserStore()
const { loading: roleLoading, roles } = storeToRefs(roleStore)

const props = defineProps({
  modelValue: Boolean,
  action: { type: String as PropType<FormActionE>, default: '' },
  entity: { type: Object as PropType<UserI>, default: () => ({}) }
})
const emit = defineEmits(['update:modelValue', 'created', 'updated'])

const { showErrorSnackbar } = snackbarStore
const { fetchRoles } = roleStore
const { updateUser, storeUser } = userStore

const form = ref<typeof Form>()
const actionLoading = ref(false)

const dialogTitle = computed(() => (props.action === FormActionE.CREATE ? 'Création d\'un utilisateur' : 'Modifier l\' utilisateur'))
const dialog = computed({
  get () {
    return props.modelValue
  },
  set (value) {
    emit('update:modelValue', value)
  }
})
const initialValues = computed(() => {
  if (props.action === FormActionE.UPDATE) {
    return props.entity || {}
  }
  return {}
})

const fields = computed(() => [
  { name: 'email', placeholder: 'Veuillez entre l\' email', label: 'Email', type: 'text' },
  {
    name: 'password',
    placeholder: 'Veuillez entre un mot de passe',
    label: 'Mot de passe',
    type: 'password',
    updateMode: props.action === FormActionE.UPDATE
  },
  {
    name: 'roles',
    placeholder: 'Veuillez sélectionner les roles',
    label: 'Roles',
    type: 'select-multiple',
    items: roles.value,
    loading: roleLoading.value
  }
])

const formSchema = computed(() => object({
  email: string()
    .max(255)
    .required('Veuillez renseigner l\'e-mail')
    .email('Veuillez renseigner un email valide'),
  password: props.action === FormActionE.CREATE
    ? string().required('Veuillez renseigner le mot de passe').max(255)
    : string().max(255).nullable()
}))

async function onSubmit () {
  if (form.value) {
    const { valid } = await form.value.validate()
    if (valid) {
      actionLoading.value = true
      if (props.action === 'create') {
        await storeUser(form.value.getValues())
        emit('created')
      } else if (props.action === 'update') {
        const payload = form.value.getValues()
        payload.roles = payload.roles.map((role: any) => {
          if (typeof role === 'object') {
            return role.id
          }
          return role
        })

        await updateUser(payload)
        emit('updated')
      }
      actionLoading.value = false
      form.value.resetForm()
      dialog.value = false
    } else {
      showErrorSnackbar('Formulaire incorrect')
    }
  }
}

fetchRoles()
</script>
