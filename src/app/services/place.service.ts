import { Injectable } from '@angular/core';
import { Place } from '../models/place.model';

@Injectable({
  providedIn: 'root',
})
export class PlaceService {
  private places: Place[] = [
    {
      id: 1,
      name: 'City Gallery',
      address: '123 Art St, Cityville',
      description: 'A modern gallery showcasing contemporary art from local and international artists.',
      latitude: 40.7128,
      longitude: -74.0060
    },
    {
      id: 2,
      name: 'Grand Theater',
      address: '456 Broadway Ave, Cityville',
      description: 'Historic theater hosting various performances, concerts, and shows.',
      latitude: 40.7589,
      longitude: -73.9851
    },
    {
      id: 3,
      name: 'City Library',
      address: '789 Book Ln, Cityville',
      description: 'Public library with a vast collection of books and regular cultural events.',
      latitude: 40.7532,
      longitude: -73.9822
    },
    {
      id: 4,
      name: 'Cinema Complex',
      address: '101 Movie Blvd, Cityville',
      description: 'Modern cinema complex showing the latest films and hosting film festivals.',
      latitude: 40.7614,
      longitude: -73.9776
    },
  ];

  getCulturalPlaces(): Place[] {
    return this.places;
  }

  getPlaceById(id: number): Place | undefined {
    return this.places.find(place => place.id === id);
  }
}