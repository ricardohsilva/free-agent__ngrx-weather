import { Component, OnDestroy, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { Subscription } from "rxjs";
import { LocationModel } from "src/app/shared/models/location.model";

import * as fromApp from '../../shared/store/reducers/app.reducer';

@Component({
    selector: 'app-weather',
    templateUrl: './weather.component.html',
    styleUrls: ['./weather.component.scss']
})
export class WeatherComponent implements OnInit, OnDestroy {

    public selectedLocation: LocationModel = new LocationModel();
    public isLoading: boolean;
    private _subscriptions: Subscription = new Subscription();

    constructor(
        private store: Store<fromApp.AppState>
    ) { }

    public ngOnInit(): void {
        this.initializeStore();
    }

    public initializeStore(): void {
        /* Keep Listening changes from ToolBar Search */
        this._subscriptions.add(this.store.select('locationReducer')
            .subscribe(state => {
                this.selectedLocation = state.selectedLocation;
                this.isLoading = state.loadingSelectedLocation;
                if (state.error) {
                    console.warn(state.error.message);
                }
            })
        );
    }

    public ngOnDestroy(): void { }
}