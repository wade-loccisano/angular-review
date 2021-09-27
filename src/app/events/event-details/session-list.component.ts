import { Component, Input, OnChanges } from "@angular/core";
import { AuthService } from "src/app/user/auth.service";
import { ISession } from "../shared/index";
import { VoterService } from "./voter.service";

@Component({
    selector: 'session-list',
    template: './session-list.component.html'
})

export class SessionListComponent implements OnChanges {
    @Input() sessions: ISession[]
    @Input() filterBy: string;
    @Input() sortBy: string;
    visibleSessions: ISession[] = [];

    constructor(
        private auth: AuthService,
        private voterService: VoterService,
    ) {}

    ngOnChanges() {
        if(this.sessions) {
            this.filterSessions(this.filterBy);
        }
    }

    toggleVote(session: ISession) {
        if(this.userHasVoted(session)) {
            this.voterService.deleteVoter(session, this.auth.currentUser.userName);
        } else {
            this.voterService.addVoter(session, this.auth.currentUser.userName);
        }
        // if(this.sortBy === 'votes') {
        //     this.visibleSessions.sort(sortByVotesDesc);
        // }
    }

    userHasVoted(session: ISession) {
        return this.voterService.userHasVoted(session, this.auth.currentUser.userName);
    }

    filterSessions(filter) {
        if (filter === 'all') {
            this.visibleSessions = [...this.sessions];
        } else {
            this.visibleSessions = this.sessions.filter(session => {
                return session.level.toLocaleLowerCase() === filter;
            });
        }
    }
}