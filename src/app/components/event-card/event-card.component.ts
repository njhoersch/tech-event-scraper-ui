import { Component, Input, OnInit } from '@angular/core';
import { Event } from '../../models/event.model';

@Component({
    selector: 'event-card',
    templateUrl: './event-card.component.html',
    styleUrls: ['./event-card.component.css'],
})
export class EventCardComponent {
    @Input() event: Event;
}
