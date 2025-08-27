import type { RessourceI } from './ressource'
import type { PermissionI } from './permission'

export interface RoleI {
  id: number;
  name: string;
  permissions?: PermissionI[];
  ressources?: RessourceI[];
}
