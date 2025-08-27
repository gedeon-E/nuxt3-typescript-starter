import { defineStore } from 'pinia'
import { useSnackbarStore } from '@/stores/snackbar'
import type { RoleI } from '../types/role'

// eslint-disable-next-line import/prefer-default-export
export const useRoleStore = defineStore('role', () => {
  const snackbarStore = useSnackbarStore()
  const { showSuccessSnackbar } = snackbarStore
  const { $fetchApi } = useNuxtApp()

  function fetchRoles (options = { immediate: true }) {
    return useFetchApi<RoleI[]>('/roles', {
      method: 'get',
      immediate: options.immediate
    })
  }

  const { refresh: refreshRoles } = fetchRoles({ immediate: false })

  function updateRole (payload: RoleI) {
    return new Promise<RoleI>((resolve) => {
      $fetchApi<RoleI>(`/roles/${payload.id}`, {
        method: 'put',
        body: payload
      }).then((data) => {
        showSuccessSnackbar('Role modifié avec succès')

        resolve(data)
        refreshRoles()
      })
    })
  }

  function storeRole (role: RoleI) {
    return new Promise<RoleI>((resolve) => {
      $fetchApi<RoleI>('/roles', {
        method: 'post',
        body: role
      }).then((data) => {
        showSuccessSnackbar('Role ajouté avec succès')

        resolve(data)
        refreshRoles()
      })
    })
  }

  function deleteRole (roleId: number) {
    return new Promise<void>((resolve) => {
      $fetchApi<void>(`/roles/${roleId}`, {
        method: 'delete'
      }).then(() => {
        showSuccessSnackbar('Role supprimé avec succès')

        resolve()
        refreshRoles()
      })
    })
  }

  function updatePermissions (roleId: number, permissions: number[]) {
    return new Promise<void>((resolve) => {
      $fetchApi<void>(`/roles/${roleId}/update-permissions`, {
        method: 'post',
        body: { permissions }
      }).then(() => {
        showSuccessSnackbar('Role modifié avec succès')

        resolve()
        refreshRoles()
      })
    })
  }

  return {
    fetchRoles,
    updateRole,
    storeRole,
    deleteRole,
    updatePermissions
  }
})
