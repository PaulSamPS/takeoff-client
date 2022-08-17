import React, { useRef } from 'react';
import styles from './DatePicker.module.scss';
import { ReactComponent as ArrowDownIcon } from '../../helpers/icons/arrowDown.svg';
import cn from 'classnames';
import { useOnClickOutside } from '../../hooks/useOnclickOutside';
import { days, months, years } from '../../helpers/optionsSelect/selectDate';

export const DatePicker = () => {
  const [day, setDay] = React.useState<string>('');
  const [month, setMonth] = React.useState<string>('');
  const [year, setYear] = React.useState<string>('');
  const [dayOpen, setDayOpen] = React.useState<boolean>(false);
  const [monthOpen, setMonthOpen] = React.useState<boolean>(false);
  const [yearOpen, setYearOpen] = React.useState<boolean>(false);

  const refDay = useRef<HTMLDivElement>(null);
  const refMonth = useRef<HTMLDivElement>(null);
  const refYear = useRef<HTMLDivElement>(null);

  useOnClickOutside(refDay, () => setDayOpen(false));
  useOnClickOutside(refMonth, () => setMonthOpen(false));
  useOnClickOutside(refYear, () => setYearOpen(false));

  const handleSelectDay = (selectDay: string) => {
    setDay(selectDay);
    setDayOpen(false);
  };

  const handleSelectMonth = (selectMonth: string) => {
    setMonth(selectMonth);
    setMonthOpen(false);
  };

  const handleSelectYear = (selectYear: string) => {
    setYear(selectYear);
    setYearOpen(false);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.dropdown}>
        <div className={cn(styles.value, styles.day)} onClick={() => setDayOpen(!dayOpen)}>
          <span>{day}</span>
          <ArrowDownIcon />
          {dayOpen && (
            <div className={cn(styles.items, styles.day)} ref={refDay}>
              {days.map((day) => (
                <span
                  className={styles.item}
                  key={day._id}
                  onClick={() => handleSelectDay(day.value)}
                >
                  {day.value}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className={styles.dropdown}>
        <div className={cn(styles.value, styles.month)} onClick={() => setMonthOpen(!monthOpen)}>
          <span>{month}</span>
          <ArrowDownIcon />
          {monthOpen && (
            <div className={cn(styles.items, styles.month)} ref={refMonth}>
              {months.map((month) => (
                <span
                  className={styles.item}
                  key={month._id}
                  onClick={() => handleSelectMonth(month.value)}
                >
                  {month.value}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className={styles.dropdown}>
        <div className={cn(styles.value, styles.year)} onClick={() => setYearOpen(!yearOpen)}>
          <span>{year}</span>
          <ArrowDownIcon />
          {yearOpen && (
            <div className={cn(styles.items, styles.year)} ref={refYear}>
              {years.map((year) => (
                <span
                  className={styles.item}
                  key={year._id}
                  onClick={() => handleSelectYear(year.value)}
                >
                  {year.value}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
