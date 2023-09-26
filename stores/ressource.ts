import { defineStore } from 'pinia'
import { RessourceI } from '~/types/ressource'

// eslint-disable-next-line import/prefer-default-export
export const useRessourceStore = defineStore('ressource', {
  state: () => ({
    ressources: [] as RessourceI[],
    loading: false,
    cached: false
  }),
  actions: {
    fetchRessources (force = false) {
      if (!this.loading && (!this.cached || force)) {
        this.loading = true

        useFetchApi('/ressources', {
          method: 'get'
        }).then(({ data }) => {
          if (data.value) {
            this.ressources = data.value
            this.loading = false
            this.cached = true
          }
        })
      }
    }
  }
})
