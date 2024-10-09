import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RouterExtensions } from '@nativescript/angular';
import { EventService } from '../services/event.service';
import { PlaceService } from '../services/place.service';
import { Event } from '../models/event.model';
import { Place } from '../models/place.model';
import { WebView } from '@nativescript/core';

@Component({
  selector: 'ns-event-detail',
  templateUrl: './event-detail.component.html',
})
export class EventDetailComponent implements OnInit {
  event: Event | undefined;
  place: Place | undefined;
  mapHtml: string;

  constructor(
    private route: ActivatedRoute,
    private eventService: EventService,
    private placeService: PlaceService,
    private routerExtensions: RouterExtensions
  ) {}

  ngOnInit(): void {
    const id = +this.route.snapshot.params.id;
    this.event = this.eventService.getEventById(id);
    if (this.event) {
      this.place = this.placeService.getPlaceById(this.event.placeId);
      if (this.place) {
        this.generateMapHtml();
      }
    }
  }

  onPlaceTap(): void {
    if (this.event) {
      this.routerExtensions.navigate(['/place', this.event.placeId]);
    }
  }

  generateMapHtml(): void {
    if (this.place) {
      this.mapHtml = `
        <html>
          <head>
            <link rel="stylesheet" href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css" />
            <script src="https://unpkg.com/leaflet@1.7.1/dist/leaflet.js"></script>
            <style>
              #map { height: 200px; width: 100%; }
            </style>
          </head>
          <body>
            <div id="map"></div>
            <script>
              var map = L.map('map').setView([${this.place.latitude}, ${this.place.longitude}], 15);
              L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; OpenStreetMap contributors'
              }).addTo(map);
              L.marker([${this.place.latitude}, ${this.place.longitude}]).addTo(map).bindPopup("${this.place.name}");
            </script>
          </body>
        </html>
      `;
    }
  }

  onWebViewLoaded(args: any): void {
    const webview = args.object as WebView;
    webview.android.getSettings().setBuiltInZoomControls(false);
    webview.android.getSettings().setDisplayZoomControls(false);
  }
}