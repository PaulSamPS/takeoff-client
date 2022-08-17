import { DetailedHTMLProps, HTMLAttributes } from 'react';

export interface EmojiPickerProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  setText: (text: string) => void;
  text: string;
  left: number;
}
