<template>
  <div v-if="visible" class="common-breadcrumb-container">
    <v-breadcrumbs :items="items">
      <template #prepend>
        <div v-if="icon" class="wrapper-link-icon">
          <v-icon size="small" :icon="icon" />
        </div>
      </template>
      <template #divider>
        <v-icon icon="mdi-chevron-right" />
      </template>
    </v-breadcrumbs>
    <v-divider class="mb-2" />
  </div>
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { useAdminBreadcrumbStore } from '@/stores/admin-breadcrumb'

const adminBreadcrumbStore = useAdminBreadcrumbStore()
const { icon, items, visible } = storeToRefs(adminBreadcrumbStore)
</script>

<style lang="scss">
.wrapper-link-icon {
  margin-right: 20px;
  border: 1px solid #eee;
  width: 35px;
  height: 35px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  background-color: #eee;
}
</style>
