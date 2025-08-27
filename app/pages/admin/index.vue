<template>
  <div class="page-container">
    <p class="page-title mb-6 text-muted">
      Bienvenue dans votre espace admin
    </p>

    <div class="d-flex flex-wrap hello-cards">
      <v-card class="hello-card">
        <v-card-text>
          <p>
            Bonjour
            <span class="text-primary font-weight-bold">
              {{ currentUser.firstName }} {{ currentUser.lastName }}
            </span>,
            nous sommes ravis de vous revoir
          </p>
          <div class="mt-2">
            <v-chip v-for="role in currentUser.roles" :key="role.id" class="mr-2">
              <v-icon icon="mdi-shield-key" class="mr-2" color="primary" />

              <span class="text-muted">
                {{ role.name }}
              </span>
            </v-chip>

            <br>

            <v-chip class="mr-2 mt-2">
              <v-icon icon="mdi-email" size="small" start color="primary" />
              <span class="text-muted">{{ currentUser.email }}</span>
            </v-chip>
          </div>
        </v-card-text>
      </v-card>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { UserI } from '~/types/user'

definePageMeta({
  layout: 'admin'
})

useAdminBreadcrumb(null)

const { data } = useAuth()
const currentUser = data.value as UserI
</script>

<style lang="scss" scoped>
.page-title {
  font-weight: lighter;
  font-size: 20px;
  &::after {
    content: '';
    display: block;
    width: 50px;
    height: 10px;
    background-color: $primary;
  }
}

.hello-cards {
  margin: 50px 0;
  .hello-card {
    width: max-content;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    margin-right: 20px;
    margin-bottom: 20px;
    .site-name {
      font-size: 20px;
      font-weight: bold;
      color: $primary;
      margin-bottom: 10px;
    }
  }
}
</style>
