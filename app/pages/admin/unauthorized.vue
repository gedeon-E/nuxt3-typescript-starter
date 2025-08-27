<template>
  <div class="page-mini-container">
    <v-card rounded="xl">
      <v-card-text>
        <div class="text-center py-16">
          <h1 class="mb-10">
            Vous n'êtes pas autorisé à accéder à cette page
          </h1>
          <v-btn to="/" color="primary">
            Retourner à l'accueil
          </v-btn>
        </div>
      </v-card-text>
    </v-card>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  layout: 'admin'
})
</script>
