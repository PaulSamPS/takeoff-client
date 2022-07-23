import React, { useRef } from 'react';
import styles from './DatePicker.module.scss';
import { ReactComponent as ArrowDownIcon } from '../../helpers/icons/arrowDown.svg';
import cn from 'classnames';
import { useOnClickOutside } from '../../hooks/useOnclickOutside';

const months = [
  { _id: 0, value: 'Января' },
  { _id: 1, value: 'Февраля' },
  { _id: 2, value: 'Марта' },
  { _id: 3, value: 'Апреля' },
  { _id: 4, value: 'Мая' },
  { _id: 5, value: 'Июня' },
  { _id: 6, value: 'Июля' },
  { _id: 7, value: 'Августа' },
  { _id: 8, value: 'Сентября' },
  { _id: 9, value: 'Октября' },
  { _id: 10, value: 'Ноября' },
  { _id: 11, value: 'Декабря' },
];

const days = [
  { _id: 0, value: '1' },
  { _id: 1, value: '2' },
  { _id: 2, value: '3' },
  { _id: 3, value: '4' },
  { _id: 4, value: '5' },
  { _id: 5, value: '6' },
  { _id: 6, value: '7' },
  { _id: 7, value: '8' },
  { _id: 8, value: '9' },
  { _id: 9, value: '10' },
  { _id: 10, value: '11' },
  { _id: 11, value: '12' },
  { _id: 12, value: '13' },
  { _id: 13, value: '14' },
  { _id: 14, value: '15' },
  { _id: 15, value: '16' },
  { _id: 16, value: '17' },
  { _id: 17, value: '18' },
  { _id: 18, value: '19' },
  { _id: 19, value: '20' },
  { _id: 20, value: '21' },
  { _id: 21, value: '22' },
  { _id: 22, value: '23' },
  { _id: 23, value: '24' },
  { _id: 24, value: '25' },
  { _id: 25, value: '26' },
  { _id: 26, value: '27' },
  { _id: 27, value: '28' },
  { _id: 28, value: '29' },
  { _id: 29, value: '30' },
  { _id: 30, value: '31' },
];

const years = [
  { _id: 0, value: '1993' },
  { _id: 1, value: '1994' },
  { _id: 2, value: '1995' },
  { _id: 3, value: '1996' },
  { _id: 4, value: '1997' },
  { _id: 5, value: '1998' },
  { _id: 6, value: '1999' },
  { _id: 7, value: '2000' },
  { _id: 8, value: '2001' },
  { _id: 9, value: '2002' },
  { _id: 10, value: '2003' },
  { _id: 11, value: '2004' },
  { _id: 12, value: '2005' },
  { _id: 13, value: '2006' },
  { _id: 14, value: '2007' },
  { _id: 15, value: '2008' },
  { _id: 16, value: '2009' },
  { _id: 17, value: '2010' },
  { _id: 18, value: '2011' },
  { _id: 19, value: '2012' },
  { _id: 20, value: '2013' },
  { _id: 21, value: '2014' },
  { _id: 22, value: '2015' },
  { _id: 23, value: '2016' },
  { _id: 24, value: '2017' },
  { _id: 25, value: '2018' },
  { _id: 26, value: '2018' },
  { _id: 27, value: '2019' },
  { _id: 28, value: '2020' },
  { _id: 29, value: '2021' },
  { _id: 30, value: '2022' },
];

export const DatePicker = () => {
  const [day, setDay] = React.useState<string>('');
  const [month, setMonth] = React.useState<string>('');
  const [year, setYear] = React.useState<string>('');
  const [dayOpen, setDayOpen] = React.useState<boolean>(false);
  const [monthOpen, setMonthOpen] = React.useState<boolean>(false);
  const [yearOpen, setYearOpen] = React.useState<boolean>(false);
  const formData = new FormData();
  const refDay = useRef<HTMLDivElement>(null);
  const refMonth = useRef<HTMLDivElement>(null);
  const refYear = useRef<HTMLDivElement>(null);
  useOnClickOutside(refDay, () => setDayOpen(false));
  useOnClickOutside(refMonth, () => setMonthOpen(false));
  useOnClickOutside(refYear, () => setYearOpen(false));

  const handleSelectDay = (selectDay: string) => {
    setDay(selectDay);
    setDayOpen(false);
    formData.set('day', day);
  };

  const handleSelectMonth = (selectMonth: string) => {
    setMonth(selectMonth);
    setMonthOpen(false);
    formData.set('month', month);
  };

  const handleSelectYear = (selectYear: string) => {
    setYear(selectYear);
    setYearOpen(false);
    formData.set('year', year);
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
