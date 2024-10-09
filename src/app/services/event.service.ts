import { Injectable } from '@angular/core';
import { Event } from '../models/event.model';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  private events: Event[] = [
    {
      id: 1,
      name: 'Art Exhibition',
      date: new Date(2024, 4, 15),
      location: 'City Gallery',
      description: 'Contemporary art exhibition featuring local artists.',
      imageUrl: 'https://example.com/art_exhibition.jpg',
      placeId: 1
    },
    {
      id: 2,
      name: 'Jazz Concert',
      date: new Date(2024, 4, 20),
      location: 'Grand Theater',
      description: 'Open-air jazz concert with renowned musicians.',
      imageUrl: 'https://example.com/jazz_concert.jpg',
      placeId: 2
    },
    {
      id: 3,
      name: 'Poetry Reading',
      date: new Date(2024, 5, 5),
      location: 'City Library',
      description: 'Local poets share their latest works.',
      imageUrl: 'https://example.com/poetry_reading.jpg',
      placeId: 3
    },
    {
      id: 4,
      name: 'Film Festival',
      date: new Date(2024, 5, 15),
      location: 'Cinema Complex',
      description: 'Annual film festival showcasing independent films.',
      imageUrl: 'https://example.com/film_festival.jpg',
      placeId: 4
    },
    {
      id: 5,
      name: 'Classical Music Concert',
      date: new Date(2024, 6, 1),
      location: 'Grand Theater',
      description: 'Symphony orchestra performing classical masterpieces.',
      imageUrl: 'https://example.com/classical_concert.jpg',
      placeId: 2
    },
    {
      id: 6,
      name: 'Modern Dance Performance',
      date: new Date(2024, 6, 10),
      location: 'City Gallery',
      description: 'Contemporary dance showcase by local and international performers.',
      imageUrl: 'https://example.com/dance_performance.jpg',
      placeId: 1
    },
    {
      id: 7,
      name: 'Book Fair',
      date: new Date(2024, 7, 5),
      location: 'City Library',
      description: 'Annual book fair featuring local and international publishers.',
      imageUrl: 'https://example.com/book_fair.jpg',
      placeId: 3
    },
    {
      id: 8,
      name: 'Summer Movie Marathon',
      date: new Date(2024, 7, 20),
      location: 'Cinema Complex',
      description: 'All-day movie marathon featuring classic summer blockbusters.',
      imageUrl: 'https://example.com/movie_marathon.jpg',
      placeId: 4
    }
  ];

  getUpcomingEvents(): { [key: string]: Event[] } {
    const now = new Date();
    const tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
    const nextWeek = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 7);

    return this.events
      .filter(event => event.date >= now)
      .sort((a, b) => a.date.getTime() - b.date.getTime())
      .reduce((acc, event) => {
        if (event.date.toDateString() === now.toDateString()) {
          acc['Today'] = [...(acc['Today'] || []), event];
        } else if (event.date.toDateString() === tomorrow.toDateString()) {
          acc['Tomorrow'] = [...(acc['Tomorrow'] || []), event];
        } else if (event.date < nextWeek) {
          acc['Next This Week'] = [...(acc['Next This Week'] || []), event];
        }
        return acc;
      }, {} as { [key: string]: Event[] });
  }

  getEventById(id: number): Event | undefined {
    return this.events.find(event => event.id === id);
  }

  getEventsForPlace(placeId: number): { upcoming: Event[], past: Event[] } {
    const now = new Date();
    const placeEvents = this.events.filter(event => event.placeId === placeId);
    return {
      upcoming: placeEvents.filter(event => event.date >= now).sort((a, b) => a.date.getTime() - b.date.getTime()),
      past: placeEvents.filter(event => event.date < now).sort((a, b) => b.date.getTime() - a.date.getTime())
    };
  }

  getEventsForMonth(date: Date): Event[] {
    return this.events.filter(event => 
      event.date.getMonth() === date.getMonth() && event.date.getFullYear() === date.getFullYear()
    ).sort((a, b) => a.date.getTime() - b.date.getTime());
  }

  getAllEvents(): Event[] {
    return this.events.sort((a, b) => a.date.getTime() - b.date.getTime());
  }
}