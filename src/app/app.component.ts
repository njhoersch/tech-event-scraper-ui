import { Component, OnInit } from '@angular/core';
import { EventsService } from './services/events.service';

import { Event } from './models/event.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ErrorComponent } from './components/error/error.component';
import { Subject } from 'rxjs';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
    private readonly durationInSeconds: number = 5;

    loading: boolean = false;
    events: Event[] = [];
    error: boolean = false;
    resetSubject = new Subject<any>();
    searchString: string = '';
    filterOption: string = '';

    constructor(
        private eventsService: EventsService,
        private _snackBar: MatSnackBar
    ) {}

    ngOnInit(): void {}

    onClickGetEvents(): void {
        this.resetSubject.next(null);
        this.filterOption = '';
        this.searchString = '';
        this.loading = true;

        this.eventsService.getEvents().subscribe({
            next: (res: Event[]) => {
                this.events = res;
                this.loading = false;
            },
            error: (error) => {
                this.events = [];

                this.loading = false;
                this.error = true;
                console.log(
                    'An error occured while fetching events: ' + error.message
                );

                this._snackBar.openFromComponent(ErrorComponent, {
                    duration: this.durationInSeconds * 1000,
                });
            },
        });
    }

    handleSearch(searchString: string): void {
        this.searchString = searchString.toLowerCase();
        this.events = this.eventsService.searchEvents(
            this.searchString,
            this.filterOption
        );
    }

    handleFilter(filterOption: string): void {
        this.filterOption = filterOption;
        this.events = this.eventsService.searchEvents(
            this.searchString,
            this.filterOption
        );
    }
}
