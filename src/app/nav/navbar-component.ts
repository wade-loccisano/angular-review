import { Component } from "@angular/core";
import { EventService, ISession } from "../events";
import { AuthService } from "../user/auth.service";

@Component({
    selector: 'nav-bar',
    templateUrl: './navbar-component.html',
    styles: [`
        .nav.navbar-nav { font-size: 15px }
        li > a.active { color: #f97924; }
    `]
})

export class NavBarComponent {
    searchTerm: string = "";
    foundSessions: ISession[];

    constructor(
        public auth: AuthService,
        private eventService: EventService,
        ) {}

    searchSessions(searchTerm) {
        this.eventService.searchSessions(searchTerm).subscribe
            (sessions => {
                this.foundSessions = sessions;
                console.log(this.foundSessions);
            }
        );
    }
}