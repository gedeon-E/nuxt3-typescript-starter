<template>
  <CommonDialog
    v-model="dialog"
    title="Affectation des permissions"
    :submit="onSubmit"
    :action-loading="actionLoading"
    min-width="600"
    primary-action-text="Valider"
  >
    <div v-for="ressource in ressources" :key="ressource.id">
      <p class="text-capitalize font-weight-bold">
        {{ ressource.name }}
      </p>
      <v-chip-group column>
        <v-tooltip
          v-for="permission in ressource.permissions"
          :key="permission.id"
          :text="permission.description"
        >
          <template #activator="{ props: permissionTooltipProps }">
            <v-chip
              v-bind="permissionTooltipProps"
              :class="{ active: permissions.find(p => p.id === permission.id) }"
              :prepend-icon="permissions.find(p => p.id === permission.id)
                ? 'mdi-check-circle'
                : undefined
              "
              @click="togglePermission(permission)"
            >
              {{ permission.name }}
            </v-chip>
          </template>
        </v-tooltip>
      </v-chip-group>

      <v-divider class="my-2" />
    </div>
  </CommonDialog>
</template>

<script lang="ts" setup>
import { useRoleStore } from '@/stores/role'
import { useRessourceStore } from '@/stores/ressource'
import type { PermissionI } from '~/types/permission'
import type { RoleI } from '~/types/role'

const roleStore = useRoleStore()
const ressourceStore = useRessourceStore()

const props = defineProps({
  modelValue: Boolean,
  role: { type: Object as PropType<RoleI>, required: true }
})
const emit = defineEmits(['update:modelValue'])
const { updatePermissions } = roleStore
const { fetchRessources } = ressourceStore

const { data: ressourcesData } = await fetchRessources()
const ressources = computed(() => ressourcesData.value || [])

const actionLoading = ref(false)
const permissions = ref<PermissionI[]>(props.role?.permissions ?? [])

watch(() => props.role, (newRole) => {
  permissions.value = newRole.permissions || []
})

const dialog = computed({
  get () {
    return props.modelValue
  },
  set (value) {
    emit('update:modelValue', value)
  }
})

async function onSubmit () {
  actionLoading.value = true
  await updatePermissions(props.role.id, permissions.value.map(p => p.id))
  actionLoading.value = false
  dialog.value = false
}

function togglePermission (permission: PermissionI) {
  const index = permissions.value.findIndex(p => p.id === permission.id)
  if (index !== -1) {
    permissions.value.splice(index, 1)
  } else {
    permissions.value.push(permission)
  }
}

fetchRessources()
</script>

<style lang="scss">
  .v-chip-group .v-chip.active {
    background-color: $primary;
    color: white;
  }
</style>
