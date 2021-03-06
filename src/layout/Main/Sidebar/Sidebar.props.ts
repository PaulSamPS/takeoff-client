import { DetailedHTMLProps, HTMLAttributes } from 'react';

export interface SidebarProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  requests: any[];
  chats: any[];
}
