<template>
  <div class="page-container">
    <div class="d-flex mb-4 justify-end flex-wrap">
      <v-btn
        v-if="userHasOneOfPermissions(currentUser, [PERMISSIONS.ROLE.CREATE])"
        prepend-icon="mdi-plus"
        color="primary"
        rounded="xl"
        class="my-1"
        @click="onAddRole()"
      >
        <span class="text-none">Ajouter</span>
      </v-btn>
      <v-btn
        v-if="userHasOneOfPermissions(currentUser, [PERMISSIONS.ROLE.UPDATE])"
        :disabled="!selectedRole"
        prepend-icon="mdi-pencil"
        color="white"
        rounded="xl"
        class="ml-2 my-1"
        @click="onEditRole()"
      >
        <span class="text-none">Modifier</span>
      </v-btn>
      <v-btn
        v-if="userHasOneOfPermissions(currentUser, [PERMISSIONS.ROLE.DELETE])"
        :disabled="!selectedRole || deletionInLoading"
        :loading="deletionInLoading"
        prepend-icon="mdi-delete"
        color="white"
        rounded="xl"
        class="ml-2 my-1"
        @click="onDeleteRole()"
      >
        <span class="text-none">Supprimer</span>
      </v-btn>
      <v-btn
        v-if="userHasOneOfPermissions(currentUser, [PERMISSIONS.ROLE.UPDATE])"
        :disabled="!selectedRole"
        prepend-icon="mdi-shield-account"
        color="white"
        rounded="xl"
        class="ml-2 my-1"
        @click="onUpdatePermissions()"
      >
        <span class="text-none">Mettre à jour les permissions</span>
      </v-btn>
    </div>

    <v-card rounded="xl" elevation="0">
      <template #text>
        <RoleListView
          v-model:selected-roles="selectedRoles"
          :roles="roles"
          :loading="roleLoading"
        />
      </template>
    </v-card>

    <RoleFormDialog
      v-model="roleFormDialogVisible"
      :action="roleFormDialogAction"
      :entity="selectedRole || undefined"
    />
    <template v-if="selectedRole">
      <RolePermissionsFormDialog
        v-model="rolePermissionsDialogVisible"
        :role="selectedRole"
      />
    </template>
    <CommonConfirmDialog
      v-model="confirmDialogVisible"
      :text="textConfirmDeletion"
      action-text="Supprimer"
      action-icon="mdi-delete"
      @confirm="onConfirmDeletion"
    />
  </div>
</template>

<script lang="ts" setup>
import { useRoleStore } from '@/stores/role'
import { shouldHaveOneOfPermissions, userHasOneOfPermissions, PERMISSIONS } from '@/utils/AuthUtil'
import type { RoleI } from '~/types/role'
import type { UserI } from '~/types/user'
import { FormActionE } from '~/types/form'

definePageMeta({
  layout: 'admin',
  middleware: [(_, __, next) => shouldHaveOneOfPermissions({
    next,
    permissions: [PERMISSIONS.ROLE.READ]
  })]
})

useAdminBreadcrumb('mdi-security', [{
  title: 'Roles',
  href: '/admin/roles'
}])

const roleStore = useRoleStore()
const { fetchRoles, deleteRole } = roleStore

const { data: currentUserData } = useAuth()
const currentUser = currentUserData.value as UserI

const { data: rolesResponse, pending: roleLoading } = await fetchRoles()
const roles = ref<RoleI[]>([])

const selectedRoles = ref<RoleI[]>([])
const roleFormDialogVisible = ref(false)
const roleFormDialogAction = ref<FormActionE | undefined>(undefined)
const confirmDialogVisible = ref(false)
const deletionInLoading = ref(false)
const rolePermissionsDialogVisible = ref(false)

const textConfirmDeletion = computed(
  () => `Voulez-vous vraiment supprimer le role <strong>"${selectedRole.value?.name}"</strong> ?`
)

const selectedRole = computed(
  () => (selectedRoles.value.length > 0 ? selectedRoles.value[0] : null)
)

watch(rolesResponse, (newRoles) => {
  roles.value = newRoles || []
})

watch(roles, (newRoles) => {
  if (selectedRole.value) {
    const freshRole = newRoles.find(role => role.id === selectedRole.value?.id)
    selectedRoles.value = freshRole ? [freshRole] : []
  }
})

function onEditRole () {
  roleFormDialogAction.value = FormActionE.UPDATE
  roleFormDialogVisible.value = true
}

function onAddRole () {
  roleFormDialogAction.value = FormActionE.CREATE
  roleFormDialogVisible.value = true
}

function onDeleteRole () {
  confirmDialogVisible.value = true
}

async function onConfirmDeletion () {
  if (selectedRole.value) {
    deletionInLoading.value = true
    await deleteRole(selectedRole.value.id)
    deletionInLoading.value = false
  }
}

function onUpdatePermissions () {
  rolePermissionsDialogVisible.value = true
}
</script>
