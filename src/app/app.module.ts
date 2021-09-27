import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { 
  jQ_TOKEN,
  TOASTR_TOKEN, 
  Toastr, 
  CollapsibleWellComponent,
  SimpleModalComponent,
  ModalTriggerDirective,
 } from './common/index';

import {
  EventsListComponent,
  EventThumbnailComponent,
  EventService,
  EventDetailsComponent,
  CreateEventComponent,
  CreateSessionComponent,
  SessionListComponent,
  DurationPipe,
  UpvoteComponent,
  VoterService,
} from './events/index';

import { EventsAppComponent } from './events-app.component';
import { NavBarComponent } from './nav/navbar-component';
import { appRoutes } from './routes';
import { Error404Component } from './errors/404.component';
import { EventRouteActivator } from './events/event-details/event-route-activator.service';
import { EventListResolver } from './events/events-list-resolver.service';
import { AuthService } from './user/auth.service';

let toastr: Toastr = window['toast'];
let jQuery = window['$'];

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
    CreateSessionComponent,
    SessionListComponent,
    CollapsibleWellComponent,
    SimpleModalComponent,
    UpvoteComponent,
    DurationPipe,
    ModalTriggerDirective,
    SimpleModalComponent,
  ],
  providers: [
    EventService,
    VoterService, 
    {
      provide: TOASTR_TOKEN,
      useValue: toastr
    }, 
    {
      provide: jQ_TOKEN,
      useValue: jQuery
    }, 
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