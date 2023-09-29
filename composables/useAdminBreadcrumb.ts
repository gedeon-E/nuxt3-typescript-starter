import { useAdminBreadcrumbStore } from '@/stores/admin-breadcrumb'
import { AdminBreadcrumItemI } from '~/types/breadcrumb'

// eslint-disable-next-line import/prefer-default-export
export const useAdminBreadcrumb = (icon: string, items: AdminBreadcrumItemI[] = []) => {
  const adminBreadcrumbStore = useAdminBreadcrumbStore()
  const { setBreadcrumb, hideBreadcrumb } = adminBreadcrumbStore

  if (icon) {
    setBreadcrumb(icon, items)
  } else {
    hideBreadcrumb()
  }
}
