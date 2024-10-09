import { Component, OnInit } from '@angular/core';
import { EventService } from '../services/event.service';
import { Event } from '../models/event.model';

@Component({
  selector: 'ns-events',
  templateUrl: './events.component.html',
})
export class EventsComponent implements OnInit {
  groupedEvents: { [key: string]: Event[] };

  constructor(private eventService: EventService) {}

  ngOnInit(): void {
    this.groupedEvents = this.eventService.getUpcomingEvents();
  }
}