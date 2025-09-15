export interface MenuSubItemI {
  text: string,
  to: string,
  permissions?: string[]
}

export interface MenuItemI {
  text: string,
  icon: string,
  to?: string,
  permissions?: string[],
  subItems?: Array<MenuSubItemI>
}

export interface MenuSectionI {
  text: string,
  items: Array<MenuItemI>
}
