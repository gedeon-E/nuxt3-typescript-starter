import { defineStore } from 'pinia'
import { useSnackbarStore } from '@/stores/snackbar'
import { RoleI } from '../types/role'

// eslint-disable-next-line import/prefer-default-export
export const useRoleStore = defineStore('role', {
  state: () => ({
    roles: [] as RoleI[],
    loading: false,
    cached: false
  }),
  actions: {
    fetchRoles (force = false) {
      if (!this.loading && (!this.cached || force)) {
        this.loading = true

        useFetchApi('/roles', {
          method: 'get'
        }).then(({ data }) => {
          if (data.value) {
            this.roles = data.value
            this.loading = false
            this.cached = true
          }
        })
      }
    },
    updateRole (payload: RoleI) {
      return new Promise((resolve) => {
        useFetchApi(`/roles/${payload.id}`, {
          method: 'put',
          body: payload
        }).then(({ data }) => {
          if (data.value) {
            const snackbarStore = useSnackbarStore()
            const { showSuccessSnackbar } = snackbarStore
            showSuccessSnackbar('Role modifié avec succès')

            resolve(data.value)
            this.fetchRoles(true)
          }
        })
      })
    },
    storeRole (role: RoleI) {
      return new Promise((resolve) => {
        useFetchApi('/roles', {
          method: 'post',
          body: role
        }).then(({ data }) => {
          if (data.value) {
            const snackbarStore = useSnackbarStore()
            const { showSuccessSnackbar } = snackbarStore
            showSuccessSnackbar('Role ajouté avec succès')

            resolve(data.value)
            this.fetchRoles(true)
          }
        })
      })
    },
    deleteRole (roleId: number) {
      return new Promise((resolve) => {
        useFetchApi(`/roles/${roleId}`, {
          method: 'delete'
        }).then(({ status }) => {
          if (status.value === 'success') {
            const snackbarStore = useSnackbarStore()
            const { showSuccessSnackbar } = snackbarStore
            showSuccessSnackbar('Role supprimé avec succès')

            resolve(null)
            this.fetchRoles(true)
          }
        })
      })
    },
    updatePermissions (roleId: number, permissions: number[]) {
      return new Promise((resolve) => {
        useFetchApi(`/roles/${roleId}/update-permissions`, {
          method: 'post',
          body: { permissions }
        }).then(({ status }) => {
          if (status.value === 'success') {
            const snackbarStore = useSnackbarStore()
            const { showSuccessSnackbar } = snackbarStore
            showSuccessSnackbar('Role modifié avec succès')

            resolve(null)
            this.fetchRoles(true)
          }
        })
      })
    }
  }
})
