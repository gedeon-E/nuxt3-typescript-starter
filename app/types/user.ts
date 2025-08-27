import type { RoleI } from './role'

export interface UserI {
  id: number;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  locked: boolean;
  roles?: RoleI[];
}
