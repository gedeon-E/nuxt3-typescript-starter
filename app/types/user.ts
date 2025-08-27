import { RoleI } from './role'

export interface UserI {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  roles?: RoleI[];
}
