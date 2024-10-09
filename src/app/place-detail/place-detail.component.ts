import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PlaceService } from '../services/place.service';
import { EventService } from '../services/event.service';
import { Place } from '../models/place.model';
import { Event } from '../models/event.model';

@Component({
  selector: 'ns-place-detail',
  templateUrl: './place-detail.component.html',
})
export class PlaceDetailComponent implements OnInit {
  place: Place | undefined;
  upcomingEvents: Event[] = [];
  pastEvents: Event[] = [];

  constructor(
    private route: ActivatedRoute,
    private placeService: PlaceService,
    private eventService: EventService
  ) {}

  ngOnInit(): void {
    const id = +this.route.snapshot.params.id;
    this.place = this.placeService.getPlaceById(id);
    if (this.place) {
      const events = this.eventService.getEventsForPlace(this.place.id);
      this.upcomingEvents = events.upcoming;
      this.pastEvents = events.past;
    }
  }
}