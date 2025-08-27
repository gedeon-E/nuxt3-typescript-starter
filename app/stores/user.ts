import { defineStore } from 'pinia'
import { useSnackbarStore } from '@/stores/snackbar'
import type { HttpPaginationResponseI } from '~/types/http'
import type { UserI } from '../types/user'

// eslint-disable-next-line import/prefer-default-export
export const useUserStore = defineStore('user', () => {
  const snackbarStore = useSnackbarStore()
  const { showSuccessSnackbar } = snackbarStore
  const { $fetchApi } = useNuxtApp()

  function storeUser (user: UserI) {
    return new Promise((resolve) => {
      $fetchApi<UserI>('/users', {
        method: 'post',
        body: user
      }).then((data) => {
        showSuccessSnackbar('Utilisateur ajouté avec succès')
        resolve(data)
      })
    })
  }

  function fetchUsersWithPagination ({ page, limit }: { page: number, limit: number }) {
    return useFetchApi<HttpPaginationResponseI<UserI[]>>('/users', {
      method: 'get',
      params: {
        page,
        limit
      }
    })
  }

  function updateUser (payload: UserI) {
    return new Promise((resolve) => {
      useFetchApi(`/users/${payload.id}`, {
        method: 'put',
        body: payload
      }).then(({ status, data }) => {
        if (status.value === 'success') {
          showSuccessSnackbar('Utilisateur modifié avec succès')

          resolve(data.value)
        }
      })
    })
  }

  function deleteUser (userId: number) {
    return new Promise((resolve) => {
      useFetchApi(`/users/${userId}`, {
        method: 'delete'
      }).then(({ status }) => {
        if (status.value === 'success') {
          showSuccessSnackbar('Utilisateur supprimé avec succès')

          resolve(null)
        }
      })
    })
  }

  return {
    storeUser,
    fetchUsersWithPagination,
    updateUser,
    deleteUser
  }
})
