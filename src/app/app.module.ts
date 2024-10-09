import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core'
import { NativeScriptModule } from '@nativescript/angular'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { EventsComponent } from './events/events.component'
import { PlacesComponent } from './places/places.component'
import { CalendarComponent } from './calendar/calendar.component'
import { EventDetailComponent } from './event-detail/event-detail.component'
import { PlaceDetailComponent } from './place-detail/place-detail.component'
import { PlacesMapComponent } from './places-map/places-map.component'

@NgModule({
  bootstrap: [AppComponent],
  imports: [
    NativeScriptModule,
    AppRoutingModule
  ],
  declarations: [
    AppComponent,
    EventsComponent,
    PlacesComponent,
    CalendarComponent,
    EventDetailComponent,
    PlaceDetailComponent,
    PlacesMapComponent
  ],
  providers: [],
  schemas: [NO_ERRORS_SCHEMA],
})
export class AppModule {}