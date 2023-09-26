import { useAdminBreadcrumbStore } from '@/stores/admin-breadcrumb'

// eslint-disable-next-line import/prefer-default-export
export const useAdminBreadcrumb = (icon, items = []) => {
  const adminBreadcrumbStore = useAdminBreadcrumbStore()
  const { setBreadcrumb, hideBreadcrumb } = adminBreadcrumbStore

  if (icon) {
    setBreadcrumb(icon, items)
  } else {
    hideBreadcrumb()
  }
}
