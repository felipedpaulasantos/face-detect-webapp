export interface MenuItems {
  displayName?: string;
  iconName?: string;
  route?: string;
  children?: MenuItems[];
  disabled?: boolean;
}
