import { RoleI } from './role'

export interface UserI {
  id: number;
  email: string;
  roles?: RoleI[];
}
