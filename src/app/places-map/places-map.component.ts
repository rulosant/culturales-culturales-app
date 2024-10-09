import { Component, OnInit } from '@angular/core';
import { PlaceService } from '../services/place.service';
import { Place } from '../models/place.model';
import { WebView } from '@nativescript/core';

@Component({
  selector: 'ns-places-map',
  templateUrl: './places-map.component.html',
})
export class PlacesMapComponent implements OnInit {
  places: Place[];
  mapHtml: string;

  constructor(private placeService: PlaceService) {}

  ngOnInit(): void {
    this.places = this.placeService.getCulturalPlaces();
    this.generateMapHtml();
  }

  generateMapHtml(): void {
    const mapCenter = this.getMapCenter();
    const markers = this.places.map(place => 
      `L.marker([${place.latitude}, ${place.longitude}]).addTo(map).bindPopup("${place.name}")`
    ).join(';');

    this.mapHtml = `
      <html>
        <head>
          <link rel="stylesheet" href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css" />
          <script src="https://unpkg.com/leaflet@1.7.1/dist/leaflet.js"></script>
          <style>
            #map { height: 100vh; width: 100vw; }
          </style>
        </head>
        <body>
          <div id="map"></div>
          <script>
            var map = L.map('map').setView([${mapCenter.lat}, ${mapCenter.lng}], 12);
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
              attribution: '&copy; OpenStreetMap contributors'
            }).addTo(map);
            ${markers}
          </script>
        </body>
      </html>
    `;
  }

  getMapCenter(): { lat: number, lng: number } {
    if (this.places.length > 0) {
      const latSum = this.places.reduce((sum, place) => sum + place.latitude, 0);
      const lngSum = this.places.reduce((sum, place) => sum + place.longitude, 0);
      return {
        lat: latSum / this.places.length,
        lng: lngSum / this.places.length
      };
    }
    return { lat: 0, lng: 0 };
  }

  onWebViewLoaded(args: any): void {
    const webview = args.object as WebView;
    webview.android.getSettings().setBuiltInZoomControls(false);
    webview.android.getSettings().setDisplayZoomControls(false);
  }
}