import { NgModule } from '@angular/core'
import { Routes } from '@angular/router'
import { NativeScriptRouterModule } from '@nativescript/angular'

import { EventsComponent } from './events/events.component'
import { PlacesComponent } from './places/places.component'
import { CalendarComponent } from './calendar/calendar.component'
import { EventDetailComponent } from './event-detail/event-detail.component'
import { PlaceDetailComponent } from './place-detail/place-detail.component'
import { PlacesMapComponent } from './places-map/places-map.component'

const routes: Routes = [
  { path: '', redirectTo: '/events', pathMatch: 'full' },
  { path: 'events', component: EventsComponent },
  { path: 'places', component: PlacesComponent },
  { path: 'calendar', component: CalendarComponent },
  { path: 'event/:id', component: EventDetailComponent },
  { path: 'place/:id', component: PlaceDetailComponent },
  { path: 'places-map', component: PlacesMapComponent },
]

@NgModule({
  imports: [NativeScriptRouterModule.forRoot(routes)],
  exports: [NativeScriptRouterModule],
})
export class AppRoutingModule {}