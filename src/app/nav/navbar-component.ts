import { Component } from "@angular/core";
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
    constructor(public auth: AuthService) {}
}