<template>
  <CommonDialog
    v-model="dialog"
    title="Modifier le mot de passe"
    primary-action-text="Modifier"
    primary-action-icon="mdi-lock-reset"
    :can-submit="isFormValid"
    :action-loading="loading"
    :submit="handleSubmit"
  >
    <Form
      ref="formRef"
      :validation-schema="validationSchema"
    >
      <v-row>
        <v-col cols="12">
          <Field
            v-slot="{ field, errorMessage }"
            name="oldPassword"
          >
            <v-text-field
              v-bind="field"
              :error-messages="errorMessage"
              variant="solo-filled"
              label="Ancien mot de passe"
              class="mb-3"
              flat
              rounded="xl"
              :type="showOldPassword ? 'text' : 'password'"
              :append-inner-icon="showOldPassword ? 'mdi-eye' : 'mdi-eye-off'"
              required
              @click:append-inner="showOldPassword = !showOldPassword"
            />
          </Field>

          <Field
            v-slot="{ field, errorMessage }"
            name="newPassword"
          >
            <v-text-field
              v-bind="field"
              :error-messages="errorMessage"
              label="Nouveau mot de passe"
              :type="showNewPassword ? 'text' : 'password'"
              variant="solo-filled"
              class="mb-3"
              flat
              rounded="xl"
              :append-inner-icon="showNewPassword ? 'mdi-eye' : 'mdi-eye-off'"
              required
              @click:append-inner="showNewPassword = !showNewPassword"
            />
          </Field>

          <Field
            v-slot="{ field, errorMessage }"
            name="confirmPassword"
          >
            <v-text-field
              v-bind="field"
              :error-messages="errorMessage"
              label="Confirmer le nouveau mot de passe"
              type="password"
              variant="solo-filled"
              flat
              rounded="xl"
              required
            />
          </Field>
        </v-col>
      </v-row>
    </Form>
  </CommonDialog>
</template>

<script lang="ts" setup>
import { Form, Field } from 'vee-validate'
import * as yup from 'yup'
import { useAuthStore } from '~/stores/auth'
import { useSnackbarStore } from '~/stores/snackbar'

const props = defineProps({
  modelValue: Boolean
})

const emit = defineEmits(['update:modelValue', 'submit'])

const authStore = useAuthStore()
const snackbarStore = useSnackbarStore()

const loading = ref(false)
const formRef = ref()
const showOldPassword = ref(false)
const showNewPassword = ref(false)

const validationSchema = yup.object({
  oldPassword: yup.string().required('L\'ancien mot de passe est requis'),
  newPassword: yup
    .string()
    .min(5, 'Le mot de passe doit contenir au moins 6 caractères')
    .max(255)
    .required('Le nouveau mot de passe est requis'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('newPassword')], 'Les mots de passe ne correspondent pas')
    .required('La confirmation du mot de passe est requise')
})

const isFormValid = computed(() => true)

const dialog = computed({
  get () {
    return Boolean(props.modelValue)
  },
  set (value) {
    emit('update:modelValue', value)
    if (!value && formRef.value) {
      formRef.value.resetForm()
    }
  }
})

async function onSubmit (values: {
  oldPassword: string
  newPassword: string
  confirmPassword: string
}) {
  try {
    loading.value = true
    await authStore.changePassword({
      oldPassword: values.oldPassword,
      newPassword: values.newPassword
    })
    snackbarStore.showSuccessSnackbar('Mot de passe modifié avec succès')
    dialog.value = false
    emit('submit')
  } finally {
    loading.value = false
  }
}

async function handleSubmit () {
  if (formRef.value) {
    const { valid } = await formRef.value.validate()
    if (valid) {
      await onSubmit(formRef.value.getValues())
    }
  }
}
</script>
