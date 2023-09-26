import { defineStore } from 'pinia'

interface BreadcrumItemI {
  title: string;
  href: string;
}

// eslint-disable-next-line import/prefer-default-export
export const useAdminBreadcrumbStore = defineStore('admin-breadcrumb', {
  state: () => ({
    icon: '',
    items: [] as BreadcrumItemI[],
    visible: false
  }),
  actions: {
    setBreadcrumb (icon: string, items: BreadcrumItemI[]) {
      this.icon = icon
      this.items = items
      this.visible = true
    },
    hideBreadcrumb () {
      this.visible = false
    }
  }
})
