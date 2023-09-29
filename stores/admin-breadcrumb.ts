import { defineStore } from 'pinia'
import { AdminBreadcrumItemI } from '~/types/breadcrumb'

// eslint-disable-next-line import/prefer-default-export
export const useAdminBreadcrumbStore = defineStore('admin-breadcrumb', {
  state: () => ({
    icon: '',
    items: [] as AdminBreadcrumItemI[],
    visible: false
  }),
  actions: {
    setBreadcrumb (icon: string, items: AdminBreadcrumItemI[]) {
      this.icon = icon
      this.items = items
      this.visible = true
    },
    hideBreadcrumb () {
      this.visible = false
    }
  }
})
