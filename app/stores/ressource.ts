import { defineStore } from 'pinia'
import type { RessourceI } from '~/types/ressource'

// eslint-disable-next-line import/prefer-default-export
export const useRessourceStore = defineStore('ressource', () => {
  function fetchRessources () {
    return useFetchApi<RessourceI[]>('/ressources', {
      method: 'get'
    })
  }

  return { fetchRessources }
})
