import React, { useRef } from 'react';
import styles from './EmojiPicker.module.scss';
import { BaseEmoji, Picker } from 'emoji-mart';
import { ReactComponent as SmileIcon } from '../../../helpers/icons/smile.svg';
import { useOnClickOutside } from '../../../hooks/useOnclickOutside';
import { EmojiPickerProps } from './EmojiPicker.props';
import cn from 'classnames';

export const EmojiPicker = ({ className, setText, text, bottom, left }: EmojiPickerProps) => {
  const [showEmoji, setShowEmoji] = React.useState<boolean>(false);
  const refPicker = useRef<HTMLDivElement>(null);
  useOnClickOutside(refPicker, () => setShowEmoji(false));

  const addEmoji = (e: BaseEmoji) => {
    setText(text + '' + e.colons);
  };
  return (
    <div className={cn(styles.picker, className)} ref={refPicker}>
      {showEmoji && (
        <Picker
          onSelect={addEmoji}
          skin={2}
          theme={'light'}
          perLine={7}
          set={'apple'}
          i18n={{ categories: { people: 'смайлы', recent: 'недавние' } }}
          style={{
            top: 'unset',
            right: 'unset',
            bottom: `${bottom}px`,
            left: `${left}px`,
            zIndex: '8',
            width: '255px',
          }}
        />
      )}
      <SmileIcon className={styles.emoji} onClick={() => setShowEmoji(!showEmoji)} />
    </div>
  );
};
