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
import { RoleI } from '~/types/role'
import { FormActionE } from '~/types/form'

const snackbarStore = useSnackbarStore()
const roleStore = useRoleStore()

const props = defineProps({
  modelValue: Boolean,
  action: { type: String as PropType<FormActionE>, default: '' },
  entity: { type: Object as PropType<RoleI>, default: () => ({}) }
})
const emit = defineEmits(['update:modelValue'])

const { showErrorSnackbar } = snackbarStore
const { updateRole, storeRole } = roleStore

const form = ref<typeof Form>()
const actionLoading = ref(false)

const dialogTitle = computed(() => (props.action === FormActionE.CREATE ? 'Création de role' : 'Modifier le role'))
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

const fields = [
  { name: 'name', placeholder: 'Veuillez entre le nom', label: 'Nom', type: 'text' }
]
const formSchema = object({
  name: string()
    .max(255)
    .required('Veuillez renseigner le nom')
})

async function onSubmit () {
  if (form.value) {
    const { valid } = await form.value.validate()
    if (valid) {
      actionLoading.value = true
      if (props.action === 'create') {
        await storeRole(form.value.getValues())
      } else if (props.action === 'update') {
        await updateRole(form.value.getValues())
      }
      actionLoading.value = false
      form.value.resetForm()
      dialog.value = false
    } else {
      showErrorSnackbar('Formulaire incorrect')
    }
  }
}
</script>
