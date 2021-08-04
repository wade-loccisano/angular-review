import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { ToastrService } from './common/toastr.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {
  EventsListComponent,
  EventThumbnailComponent,
  EventService,
  EventDetailsComponent,
  CreateEventComponent,
} from './events/index';

import { EventsAppComponent } from './events-app.component';
import { NavBarComponent } from './nav/navbar-component';
import { appRoutes } from './routes';
import { Error404Component } from './errors/404.component';
import { EventRouteActivator } from './events/event-details/event-route-activator.service';
import { EventListResolver } from './events/events-list-resolver.service';
import { AuthService } from './user/auth.service';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes),
  ],
  declarations: [
    EventsAppComponent,
    EventsListComponent,
    EventThumbnailComponent,
    NavBarComponent,
    EventDetailsComponent,
    CreateEventComponent,
    Error404Component,
  ],
  providers: [
    EventService, 
    ToastrService, 
    EventRouteActivator,
    EventListResolver,
    { 
      provide: 'canDeactivateCreateEvent', 
      useValue: checkDirtyState 
    },
    AuthService,
  ],
  bootstrap: [
    EventsAppComponent,
  ]
})
export class AppModule { }

export function checkDirtyState(component: CreateEventComponent) {
  if (component.isDirty) {
    return window.confirm('You have not saved this event, do you really want to cancel?');
  }
  return true;
}