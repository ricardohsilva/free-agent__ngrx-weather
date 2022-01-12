import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { Store } from "@ngrx/store";
import { debounceTime, fromEvent, map, Subscription } from "rxjs";

import { LocationFilter } from "../../filters/location.filter";
import { LocationModel } from "../../models/location.model";
import * as LocationActions from '../../../shared/store/actions/location.action';
import * as fromApp from '../../../shared/store/reducers/app.reducer';

@Component({
    selector: 'app-toolbar',
    templateUrl: './toolbar.component.html',
    styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit, OnDestroy {
    @ViewChild('search', { static: true }) search: ElementRef;

    public locations: LocationModel[] = [];
    public isLoading: boolean = false;
    public filter: LocationFilter = new LocationFilter();

    private _subscriptions: Subscription = new Subscription();

    constructor(
        private store: Store<fromApp.AppState>
    ) { }

    public ngOnInit(): void {
        this.initializeStore();
        this._subscriptions.add(fromEvent(this.search.nativeElement, 'keyup').pipe(
            debounceTime(500)
        ).subscribe(() => {
            this.store.dispatch({
                type: LocationActions.getLocationsStart.type,
                payload: { querystring: this.filter.toQueryString() }
            });
        }));
    }

    public ngOnDestroy(): void {
        this._subscriptions.unsubscribe();
    }

    public initializeStore(): void {
        this._subscriptions.add(this.store.select('locationReducer')
            .subscribe(state => {
                this.locations = state.locations;
                this.isLoading = state.loadingLocations;
                if (state.error) {
                    console.warn(state.error.message);
                }
            })
        );
    }

    public onLocationSelect(location: LocationModel): void {
        this.search.nativeElement.blur();

        this.store.dispatch({
            type: LocationActions.getLocationByIdStart.type,
            payload: location
        });
    }

    public displayFn(locationWoeid: number): string {
        const location = this.locations.find(item => item.woeid === locationWoeid);
        return location?.title;
    }
}