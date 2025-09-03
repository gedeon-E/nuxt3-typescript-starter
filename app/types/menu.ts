export interface MenuSubItemI {
  text: string,
  translationKey: string,
  to: string,
  permissions?: string[]
}

export interface MenuItemI {
  text: string,
  translationKey: string,
  icon: string,
  to?: string,
  permissions?: string[],
  subItems?: Array<MenuSubItemI>
}

export interface MenuSectionI {
  text: string,
  translationKey: string,
  items: Array<MenuItemI>
}
