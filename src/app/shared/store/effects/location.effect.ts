import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { of } from "rxjs";

import * as LocationActions from '../actions/location.action';
import { LocationService } from "../../services/location.service";

@Injectable()
export class LocationEffect {
    getLocations$ = createEffect((): any => this.actions$.pipe(
        ofType(LocationActions.getLocationsStart),
        mergeMap((action) => this.locationService.search(action.payload.querystring)
            .pipe(
                map(
                    (response) => (
                        { type: LocationActions.getLocationsEnd.type, payload: response })
                ),
                catchError((err) => of({ type: LocationActions.locationErrors.type, payload: { error: err } })))
        ))
    );

    getLocationById$ = createEffect((): any => this.actions$.pipe(
        ofType(LocationActions.getLocationByIdStart),
        mergeMap((action) => this.locationService.getById(action.payload.woeid)
            .pipe(
                map(
                    (response) => (
                        { type: LocationActions.getLocationByIdEnd.type, payload: response })
                ),
                catchError((err) => of({ type: LocationActions.locationErrors.type, payload: { error: err } })))
        ))
    );

    constructor(
        private actions$: Actions,
        private locationService: LocationService
    ) { }
}