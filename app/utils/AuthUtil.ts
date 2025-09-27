import type { NavigationGuardNext } from 'vue-router'
import type { UserI } from '~/types/user'

export const shouldHaveOneOfPermissions =
({ permissions } : { next?: NavigationGuardNext, permissions: string[] }) => {
  const { data } = useAuth()

  if (!userHasOneOfPermissions(data.value as UserI, permissions)) {
    navigateTo('/admin/unauthorized')
  }
  return true
}

export const userHasOneOfPermissions = (user: UserI, permissions: string[]): boolean => {
  const permissionsFiltered = permissions?.filter(p => p)

  if (!permissions || permissionsFiltered.length === 0) {
    return true
  }

  if (user) {
    const currentUserPermissions = user.roles?.flatMap(role => role.permissions)
    if (!permissions || permissionsFiltered.length === 0) {
      return true
    }
    return !!permissionsFiltered
      .find(p => currentUserPermissions
        ?.find(currentUserPermission => currentUserPermission?.slug === p ||
          currentUserPermission?.slug === (`${p.split(':')[0]}:ALL`)))
  }
  return false
}

export const PERMISSIONS = {
  USER: {
    CREATE: 'USER:CREATE',
    READ: 'USER:READ',
    DELETE: 'USER:DELETE',
    UPDATE: 'USER:UPDATE',
    LOCK: 'USER:LOCK',
    UNLOCK: 'USER:UNLOCK',
    VALIDATE: 'USER:VALIDATE'
  },
  ROLE: {
    CREATE: 'ROLE:CREATE',
    READ: 'ROLE:READ',
    DELETE: 'ROLE:DELETE',
    UPDATE: 'ROLE:UPDATE',
    ADD_PERMISSIONS: 'ROLE:ADD_PERMISSIONS',
    UPDATE_PERMISSIONS: 'ROLE:UPDATE_PERMISSIONS'
  },
  RESSOURCE: {
    READ: 'ROLE:READ'
  }
}
