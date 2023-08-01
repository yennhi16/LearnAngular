import { Component, OnInit } from '@angular/core';
import { CalendarEvent } from 'angular-calendar';
import { addDays, addHours } from 'date-fns';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  ngOnInit(): void {}
  title = 'Heroes-app';
  viewDate: Date = new Date();
  dateInput!: any;
  handleChangeDateInput(event: Date) {
    console.log('DateInput', event);
    console.log('dateCalendar', this.viewDate);
  }
  events: CalendarEvent[] = [
    {
      title: 'Event 1',
      start: new Date(),
      end: new Date(),
    },
    {
      title: 'Event 2',
      start: new Date(),
      end: new Date(),
    },
    {
      title: 'Event 3',
      start: addHours(new Date(), 3),
      end: addDays(new Date(), 4),
    },
  ];
}
