import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

import * as _ from 'lodash';

import { Event } from '../models/event.model';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root',
})
export class EventsService {
    private events: Event[] = [];

    constructor(private httpClient: HttpClient) {}

    getEvents(): Observable<Event[]> {
        const completionSubject = new Subject<Event[]>();

        this.httpClient
            .get<Event[]>(environment.baseApi + '/events')
            .subscribe({
                next: (res) => {
                    this.events = res;
                    completionSubject.next(res);
                    completionSubject.complete();
                },
                error: (error) => {
                    console.log(error.message);
                    completionSubject.error(error.message);
                    completionSubject.complete();
                },
            });

        return completionSubject.asObservable();
    }

    sortEvents(filterOption: string): Event[] {
        if (filterOption === 'Name') {
            return _.sortBy(this.events, [
                (event) => {
                    return event.title;
                },
            ]);
        }

        if (filterOption === 'Start Date') {
            return _.sortBy(this.events, [
                (event) => {
                    return event.startDate;
                },
            ]);
        }

        if (filterOption === 'Location') {
            return _.sortBy(this.events, [
                (event) => {
                    return event.location;
                },
            ]);
        }

        console.log('Error occured filtering...');
        return [];
    }

    searchEvents(search: string, filterValue: string): Event[] {
        let events = this.events;
        if (filterValue !== '') {
            events = this.sortEvents(filterValue);
        }

        if (search === '') {
            return events;
        }

        return _.filter(events, (event: Event) => {
            const title: string = event.title.toLowerCase();
            const location: string = event.location.toLowerCase();
            const website: string = event.website.toLowerCase();
            const startDate: string = event.startDate.toString().toLowerCase();
            const endDate: string | null = event.endDate
                ? event.endDate.toString().toLowerCase()
                : null;

            return (
                title.includes(search) ||
                location.includes(search) ||
                website.includes(search) ||
                startDate.includes(search) ||
                (endDate != null && endDate.includes(search))
            );
        });
    }
}
