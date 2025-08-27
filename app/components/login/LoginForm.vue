<template>
  <div class="login-form-container">
    <h1>{{ config.appName }}</h1>
    <h2 class="text-primary">
      AUTHENTIFICATION
    </h2>

    <hr>

    <Form class="mt-10" :validation-schema="loginSchema" @submit="(onSubmit as any)">
      <p class="mb-6">
        Veuillez renseigner vos identifiants pour vous connectez
      </p>

      <div class="mb-2">
        <Field v-slot="{ field, errorMessage }" name="email">
          <v-text-field
            v-bind="field"
            v-model="email"
            :error-messages="errorMessage"
            placeholder="Entrer votre E-mail"
            prepend-inner-icon="mdi-email-outline"
            variant="solo-filled"
            rounded
            flat
          />
        </Field>
      </div>

      <div class="mb-2">
        <Field v-slot="{ field, errorMessage }" name="password">
          <v-text-field
            v-bind="field"
            :append-inner-icon="passwordVisible ? 'mdi-eye-off' : 'mdi-eye'"
            :type="passwordVisible ? 'text' : 'password'"
            :error-messages="errorMessage"
            placeholder="Entrer votre mot de passe"
            prepend-inner-icon="mdi-lock-outline"
            variant="solo-filled"
            rounded
            flat
            @click:append-inner="passwordVisible = !passwordVisible"
          />
        </Field>
      </div>

      <v-btn
        :loading="loading"
        :disabled="loading"
        append-icon="mdi-arrow-top-right"
        color="primary"
        size="large"
        type="submit"
        block
        rounded
      >
        <span class="text-none" style="letter-spacing: 0;">Se connecter</span>
      </v-btn>
    </Form>
  </div>

  <LoginOtpDialog
    v-if="config.loginWithOTP"
    v-model="showOtpForm"
    :email="email"
    :token="tokenForOTPVerification"
  />
</template>

<script lang="ts" setup>
import { Form, Field } from 'vee-validate'
import { object, string } from 'yup'
import { useSnackbarStore } from '@/stores/snackbar'
import { useAuthStore } from '@/stores/auth'

interface FormValueI {
  email: string;
  username?: string;
  password: string;
}

const authStore = useAuthStore()
const snackbarStore = useSnackbarStore()
const config = useAppConfig()
const { signIn } = useAuth()

const passwordVisible = ref(false)
const loading = ref(false)
const showOtpForm = ref(false)
const email = ref()
const tokenForOTPVerification = ref()
const { showErrorSnackbar, showSuccessSnackbar } = snackbarStore

const loginSchema = object({
  email: string()
    .required('Veuillez renseigner un email ou un nom d\'utilisateur'),
  password: string().required('Veuillez renseigner un mot de passe')
})

function onSubmit (values: FormValueI) {
  if (config.loginWithOTP) {
    signInWithOtpVerification(values)
  } else {
    signInOTPLess(values)
  }
}

function signInOTPLess (values: FormValueI) {
  loading.value = true

  signIn({ ...values, username: values.email }, { callbackUrl: '/admin' })
    .then(() => {
      showSuccessSnackbar('Connexion effectuée avec succès')
    })
    .catch((error) => {
      if (error.response && error.response.status === 429) {
        showErrorSnackbar('Trop de tentatives de connexion, veuillez réessayer plus tard')
      } else if (error.response && error.response.status.toString().startsWith('4')) {
        // eslint-disable-next-line no-underscore-dangle
        const message = error.response._data?.msg || error.response._data?.message
        showErrorSnackbar(message || 'Identifiants incorrect')
      } else {
        showErrorSnackbar('Une erreur est survenue, connexion impossible')
      }
    })
    .finally(() => {
      loading.value = false
    })
}

function signInWithOtpVerification (values: FormValueI) {
  loading.value = true

  authStore.signInWithOtpVerification({ ...values, username: values.email })
    .then((data) => {
      tokenForOTPVerification.value = data.token
      showOtpForm.value = true
    })
    .catch((error) => {
      if (error.status === 401) {
        showErrorSnackbar('Identifiants incorrects')
      } else if (!error.status) {
        showErrorSnackbar('Impossible de se connecter au serveur, veuillez vérifier votre connexion internet ou réessayer plus tard')
      }
    })
    .finally(() => {
      loading.value = false
    })
}

</script>

<style lang="scss">
.login-form-container{
  padding: 40px;
  h1 {
    font-size: 12px;
    font-weight: 200;
  }
  h2 {
    font-size: 24px;
  }
  hr {
    background-color: $primary;
    height: 10px;
    width: 50px;
    border: none;
    margin: 10px 0;
    position: relative;
    &:after {
      content: "";
      display: block;
      background-color: $primary-dark;
      position: absolute;
      right: -12px;
      width: 10px;
      height: 100%;
    }
  }
}
</style>
