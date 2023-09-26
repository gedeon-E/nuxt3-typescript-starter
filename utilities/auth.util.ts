import { UserI } from '~/types/user'

export const shouldHaveOneOfPermissions = (permissions: string[]) => {
  if (!userHasOneOfPermissions(permissions)) {
    return navigateTo('/unauthorized')
  }
  return null
}

export const userHasOneOfPermissions = (permissions: string[]) => {
  const { data: currentUser } = useAuth()

  const currentUserPermissions = (currentUser.value as UserI)
    .roles.flatMap(role => role.permissions)
  const permissionsFiltered = permissions?.filter(p => p)
  if (!permissions || permissionsFiltered.length === 0) {
    return true
  }
  return permissionsFiltered
    .find(p => currentUserPermissions
      .find(currentUserPermission => currentUserPermission.slug === p ||
        currentUserPermission.slug === (`${p.split(':')[0]}:ALL`)))
}
