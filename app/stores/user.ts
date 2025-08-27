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
    return new Promise<UserI>((resolve) => {
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
    return $fetchApi<HttpPaginationResponseI<UserI[]>>('/users', {
      method: 'get',
      params: {
        page,
        limit
      }
    })
  }

  function updateUser (payload: UserI) {
    return new Promise<UserI>((resolve) => {
      $fetchApi<UserI>(`/users/${payload.id}`, {
        method: 'put',
        body: payload
      }).then((data) => {
        showSuccessSnackbar('Utilisateur modifié avec succès')
        resolve(data)
      })
    })
  }

  function deleteUser (userId: number) {
    return new Promise<void>((resolve) => {
      $fetchApi(`/users/${userId}`, {
        method: 'delete'
      }).then(() => {
        showSuccessSnackbar('Utilisateur supprimé avec succès')
        resolve()
      })
    })
  }

  function lockUser (userId: number) {
    return new Promise<void>((resolve) => {
      $fetchApi(`/users/${userId}/lock`, {
        method: 'put'
      }).then(() => {
        showSuccessSnackbar('Utilisateur bloqué avec succès')
        resolve()
      })
    })
  }

  function unlockUser (userId: number) {
    return new Promise<void>((resolve) => {
      $fetchApi(`/users/${userId}/unlock`, {
        method: 'put'
      }).then(() => {
        showSuccessSnackbar('Utilisateur débloqué avec succès')
        resolve()
      })
    })
  }

  return {
    storeUser,
    fetchUsersWithPagination,
    updateUser,
    deleteUser,
    unlockUser,
    lockUser
  }
})
