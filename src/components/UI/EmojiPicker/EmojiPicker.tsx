import React, { useRef } from 'react';
import styles from './EmojiPicker.module.scss';
import { BaseEmoji, Picker } from 'emoji-mart';
import { ReactComponent as SmileIcon } from '../../../helpers/icons/smile.svg';
import { useOnClickOutside } from '../../../hooks/useOnclickOutside';
import { EmojiPickerProps } from './EmojiPicker.props';
import cn from 'classnames';

export const EmojiPicker = ({ className, setText, text, left }: EmojiPickerProps): JSX.Element => {
  const [showEmoji, setShowEmoji] = React.useState<boolean>(false);
  const [offsetBot, setOffsetBot] = React.useState<number>(0);

  const refPicker = useRef<HTMLDivElement>(null);
  const postRef = React.useRef<SVGSVGElement>(null);

  useOnClickOutside(refPicker, () => setShowEmoji(false));

  const coordsEl = () => {
    const rect = postRef.current?.getBoundingClientRect();
    setOffsetBot(rect!.bottom);
  };

  const addEmoji = (e: BaseEmoji) => {
    setText(text + '' + e.colons);
  };

  const handleClickIcon = () => {
    setShowEmoji(!showEmoji);
    coordsEl();
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
            bottom: `${offsetBot < 300 ? -235 : 32}px`,
            left: `${left}px`,
            zIndex: '8',
            width: '255px',
          }}
        />
      )}
      <SmileIcon className={styles.emoji} onClick={handleClickIcon} ref={postRef} />
    </div>
  );
};
