<template>
  <v-data-table
    v-model="selectedRoles"
    v-model:items-per-page="itemsPerPage"
    v-model:page="page"
    :headers="headers"
    :items="roles"
    :loading="loading"
    items-per-page-text="Items par page"
    item-value="id"
    select-strategy="single"
    show-expand
    show-select
    return-object
    hover
    expand-on-click
  >
    <template #[`item.index`]="{ index }">
      {{ (itemsPerPage * (page - 1)) + index + 1 }}
    </template>

    <template #expanded-row="{ columns, item }">
      <tr>
        <td :colspan="columns.length" class="mb-3">
          <p class="mt-3">
            Liste de permissions pour <strong>"{{ item.name }}"</strong>
          </p>

          <div v-if="item.ressources && !item.ressources.length" class="mt-2 mb-4">
            <v-chip>Aucune permission affectée</v-chip>
          </div>
          <div
            v-for="ressource in (item.ressources || [])"
            :key="ressource.id"
            class="d-flex align-center"
          >
            <v-chip
              class="mr-2 bg-primary"
              prepend-icon="mdi-shield-account"
              color="white"
            >
              {{ ressource.name }}
            </v-chip>
            <v-chip-group>
              <v-chip v-for="permission in ressource.permissions" :key="permission.id">
                {{ permission.name }}
              </v-chip>
            </v-chip-group>
          </div>
        </td>
      </tr>
    </template>
  </v-data-table>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { RoleI } from '~/types/role'

const props = defineProps({
  selectedRoles: {
    type: Array as PropType<RoleI[]>,
    default: () => []
  },
  roles: {
    type: Array as PropType<RoleI[]>,
    required: true
  },
  loading: Boolean
})

const emit = defineEmits(['update:selectedRoles'])

const selectedRoles = ref<RoleI[]>(props.selectedRoles)
const itemsPerPage = ref(10)
const page = ref(1)

const headers = [
  {
    title: '#',
    align: 'start' as const,
    sortable: false,
    key: 'index'
  },
  {
    title: 'Nom',
    key: 'name'
  }
]

watch(() => props.selectedRoles, (newValue) => {
  selectedRoles.value = newValue
})

watch(selectedRoles, (newValue) => {
  emit('update:selectedRoles', newValue)
})
</script>
