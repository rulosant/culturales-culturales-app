import { Component, OnInit } from '@angular/core';
import { RouterExtensions } from '@nativescript/angular';
import { PlaceService } from '../services/place.service';
import { Place } from '../models/place.model';

@Component({
  selector: 'ns-places',
  templateUrl: './places.component.html',
})
export class PlacesComponent implements OnInit {
  places: Place[];

  constructor(
    private placeService: PlaceService,
    private routerExtensions: RouterExtensions
  ) {}

  ngOnInit(): void {
    this.places = this.placeService.getCulturalPlaces();
  }

  onMapViewTap(): void {
    this.routerExtensions.navigate(['/places-map']);
  }
}