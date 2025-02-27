import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Subject } from 'rxjs';
import {
  CalendarEvent,
  CalendarEventTimesChangedEvent,
  CalendarView,
  DAYS_OF_WEEK,
} from 'angular-calendar';
import { colors } from '../demo-utils/colors';
import { addDays, addHours, endOfMonth, startOfDay, subDays } from 'date-fns';

@Component({
  selector: 'mwl-demo-component',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: 'template.html',
  styleUrls: ['./jalali-component-styles.scss']
})
export class DemoComponent {
  view: CalendarView = CalendarView.Month;
  viewDate = new Date();
  locale: string = 'fa';
  weekStartsOn: number = DAYS_OF_WEEK.SATURDAY;
  weekendDays: number[] = [DAYS_OF_WEEK.FRIDAY];

  events: CalendarEvent[] = [
    {
      start: subDays(startOfDay(new Date()), 1),
      end: addDays(new Date(), 1),
      title: 'A 3 day event',
      color: colors.red,
      allDay: true,
      resizable: {
        beforeStart: true,
        afterEnd: true,
      },
      draggable: true,
      cssClass: 'cal-cell-event',
      meta: {showTitle: false}
    },
    {
      start: startOfDay(new Date()),
      title: '$80000',
      color: colors.yellow,
      cssClass: 'cal-cell-event',
      meta: {showTitle: true}
    },
    // {
    //   start: subDays(endOfMonth(new Date()), 3),
    //   end: addDays(endOfMonth(new Date()), 3),
    //   title: 'A long event that spans 2 months',
    //   color: colors.blue,
    //   allDay: true,
    // },
    // {
    //   start: addHours(startOfDay(new Date()), 2),
    //   end: addHours(new Date(), 2),
    //   title: 'A draggable and resizable event',
    //   color: colors.yellow,
    //   resizable: {
    //     beforeStart: true,
    //     afterEnd: true,
    //   },
    //   draggable: true,
    // },
  ];

  refresh = new Subject<void>();

  eventTimesChanged({
    event,
    newStart,
    newEnd,
  }: CalendarEventTimesChangedEvent): void {
    event.start = newStart;
    event.end = newEnd;
    this.refresh.next();
  }
}
