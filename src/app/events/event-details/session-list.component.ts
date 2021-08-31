import { Component, Input } from "@angular/core";
import { ISession } from "..";

@Component({
    selector: 'session-list',
    template: './session-list.component.html'
})

export class SessionListComponent {
    @Input() sessions: ISession[]
}