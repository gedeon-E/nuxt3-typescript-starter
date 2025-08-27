<template>
  <div class="page-container">
    <v-row>
      <v-col cols="12" md="8" lg="8">
        <v-card class="pa-4" rounded="xl" elevation="1">
          <v-card-title class="text-h6 mb-3">
            Informations de compte
          </v-card-title>

          <v-divider class="mb-4" />

          <v-row>
            <v-col cols="12" md="6">
              <v-list>
                <v-list-item>
                  <template #prepend>
                    <v-icon icon="mdi-account" color="primary" />
                  </template>
                  <v-list-item-title>Nom d'utilisateur</v-list-item-title>
                  <v-list-item-subtitle>
                    {{ currentUser?.username || 'Non défini' }}
                  </v-list-item-subtitle>
                </v-list-item>

                <v-list-item>
                  <template #prepend>
                    <v-icon icon="mdi-account-box" color="primary" />
                  </template>
                  <v-list-item-title>Nom complet</v-list-item-title>
                  <v-list-item-subtitle>
                    {{ currentUser?.firstName }} {{ currentUser?.lastName }}
                  </v-list-item-subtitle>
                </v-list-item>
              </v-list>
            </v-col>

            <v-col cols="12" md="6">
              <v-list>
                <v-list-item>
                  <template #prepend>
                    <v-icon icon="mdi-email" color="primary" />
                  </template>
                  <v-list-item-title>Email</v-list-item-title>
                  <v-list-item-subtitle>{{ currentUser?.email }}</v-list-item-subtitle>
                </v-list-item>
              </v-list>

              <v-list-item>
                <template #prepend>
                  <v-icon icon="mdi-account-multiple" color="primary" />
                </template>
                <v-list-item-title>Rôles</v-list-item-title>
                <v-list-item-subtitle>
                  <v-chip
                    v-for="role in currentUser?.roles"
                    :key="role.id"
                    size="small"
                    color="primary"
                    variant="outlined"
                    class="mr-1"
                  >
                    {{ role.name }}
                  </v-chip>
                </v-list-item-subtitle>
              </v-list-item>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>

    <v-row class="mt-4">
      <v-col cols="12">
        <v-btn
          color="primary"
          size="large"
          prepend-icon="mdi-lock-reset"
          rounded="xl"
          @click="showPasswordDialog = true"
        >
          <span class="text-none">
            Modifier le mot de passe
          </span>
        </v-btn>
      </v-col>
    </v-row>

    <UserPasswordChangeDialog
      v-model="showPasswordDialog"
      @submit="handlePasswordChange"
    />
  </div>
</template>

<script lang="ts" setup>
import type { UserI } from '~/types/user'

definePageMeta({
  layout: 'admin'
})

useAdminBreadcrumb('mdi-account', [{
  title: 'Mon compte',
  href: '/admin/my-account'
}])

const { data: currentUserData } = useAuth()
const currentUser = currentUserData.value as UserI

const showPasswordDialog = ref(false)

function handlePasswordChange () {
  showPasswordDialog.value = false
}
</script>
