import { Component, OnInit } from '@angular/core';
import { EventService } from '../services/event.service';
import { Event } from '../models/event.model';

@Component({
  selector: 'ns-calendar',
  templateUrl: './calendar.component.html',
})
export class CalendarComponent implements OnInit {
  events: Event[];

  constructor(private eventService: EventService) {}

  ngOnInit(): void {
    this.events = this.eventService.getAllEvents();
  }
}