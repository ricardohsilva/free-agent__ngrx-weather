import { HttpErrorResponse } from "@angular/common/http";
import { createReducer, on } from "@ngrx/store";

import { LocationModel } from "../../models/location.model";
import * as LocationActions from '../actions/location.action';

export interface State {
    selectedLocation: LocationModel;
    locations: LocationModel[];
    loadingLocations: boolean;
    loadingSelectedLocation: boolean;
    error: HttpErrorResponse;
}

const initialState: State = {
    selectedLocation: null,
    locations: [],
    loadingLocations: false,
    loadingSelectedLocation: false,
    error: null
};

export const locationReducer = createReducer(
    initialState,
    on(LocationActions.getLocationsStart, (state) => {
        return ({
            ...state,
            locations: [],
            loadingLocations: true,
            error: null
        });
    }),
    on(LocationActions.getLocationsEnd, (state, action) => {
        let locations = [];
        action.payload.forEach(location => {
            locations.push(new LocationModel(location))
        });

        return ({
            ...state,
            locations: locations,
            loadingLocations: false,
            error: null
        })
    }),
    on(LocationActions.getLocationByIdStart, (state) => {
        return ({
            ...state,
            selectedLocation: null,
            loadingSelectedLocation: true,
            error: null
        });
    }),
    on(LocationActions.getLocationByIdEnd, (state, action) => {
        return ({
            ...state,
            selectedLocation: new LocationModel(action.payload),
            loadingSelectedLocation: false,
            error: null
        })
    }),
    on(LocationActions.locationErrors, (state, action) => {
        return ({
            ...state,
            isLoading: false,
            loadingSelectedLocation: false,
            error: action.payload.error
        });
    }),
);