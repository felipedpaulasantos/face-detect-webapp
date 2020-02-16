export interface MenuItem {
  displayName: string;
  iconName?: string;
  route?: string;
  children?: MenuItem[];
  disabled?: boolean;
}
