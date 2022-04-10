import {
    Component,
    EventEmitter,
    Input,
    OnDestroy,
    OnInit,
    Output,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subject, Subscription } from 'rxjs';

@Component({
    selector: 'event-filter',
    templateUrl: './event-filter.component.html',
    styleUrls: ['./event-filter.component.css'],
})
export class EventFilterComponent implements OnInit, OnDestroy {
    @Input() resetSubject: Subject<any>;
    @Output() optionSelected = new EventEmitter();

    filterOptions = ['Name', 'Start Date', 'Location'];
    selectionControl = new FormControl(this.filterOptions);
    resetSubscription: Subscription = new Subscription();

    ngOnInit(): void {
        this.resetSubscription = this.resetSubject.subscribe(() => {
            this.selectionControl.setValue('');
        });

        this.selectionControl.valueChanges.subscribe((value) => {
            if (value !== '') {
                this.optionSelected.emit(value);
            }
        });
    }

    ngOnDestroy(): void {
        if (this.resetSubscription) {
            this.resetSubscription.unsubscribe();
        }
    }
}
