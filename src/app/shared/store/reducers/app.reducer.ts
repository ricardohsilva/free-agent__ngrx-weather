import { ActionReducerMap } from "@ngrx/store";

import * as fromLocation from '../reducers/location.reducer';

export interface AppState {
    locationReducer: fromLocation.State;
}

export const appReducer: ActionReducerMap<AppState> = {
    locationReducer: fromLocation.locationReducer
}