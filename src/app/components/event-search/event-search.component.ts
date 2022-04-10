import {
    Component,
    EventEmitter,
    Input,
    OnDestroy,
    OnInit,
    Output,
} from '@angular/core';
import { Subject, Subscription } from 'rxjs';

@Component({
    selector: 'event-search',
    templateUrl: './event-search.component.html',
    styleUrls: ['./event-search.component.css'],
})
export class EventSearchComponent implements OnInit, OnDestroy {
    @Input() resetSubject: Subject<any>;
    @Output() keyUpEventEmitter = new EventEmitter();

    resetSubscription: Subscription = new Subscription();
    searchValue: String = '';

    ngOnInit(): void {
        this.resetSubscription = this.resetSubject.subscribe(() => {
            this.searchValue = '';
        });
    }

    ngOnDestroy(): void {
        if (this.resetSubscription) {
            this.resetSubscription.unsubscribe();
        }
    }

    handleKeyUpEvent(): void {
        this.keyUpEventEmitter.emit(this.searchValue);
    }
}
