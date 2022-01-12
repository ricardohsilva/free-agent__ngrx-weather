import { HttpErrorResponse } from "@angular/common/http";
import { createAction, props } from "@ngrx/store";
import { LocationModel } from "../../models/location.model";

export const getLocationsStart = createAction(
    '[Location] Get Locations Start',
    props<{ payload: { querystring: string } }>(),
);

export const getLocationsEnd = createAction(
    '[Location] Get Locations End',
    props<{ payload: LocationModel[]; }>(),
);

export const locationErrors = createAction(
    '[Location] Location Errors',
    props<{ payload: {error: HttpErrorResponse}; }>()
);

export const getLocationByIdStart = createAction(
    '[Location] Get Location Start',
    props<{ payload: LocationModel }>(),
);

export const getLocationByIdEnd = createAction(
    '[Location] Get Location End',
    props<{ payload: LocationModel; }>(),
);
