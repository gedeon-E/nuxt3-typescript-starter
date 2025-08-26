import { PermissionI } from './permission'

export interface RessourceI {
  id: number;
  name: string;
  permissions: PermissionI[]
}
