export interface NavItem {
  displayName: string;
  route?: string;
  iconName?: string;
  children?: NavItem[];
  onClick?(): void;
}
