<p align="center">
  <img src="https://user-images.githubusercontent.com/97107085/148986115-eaeeea35-fd96-40b5-8773-b670305a92b6.png" height="100" alt="Rangle-Logo" />
  <span>
  <img src="https://ngrx.io/assets/images/badge.svg" height="100" alt="NgRx-Logo" />
</p>

> In this project we are going to be using the basic methods from NgRx, such as createReducer, createAction, createEffect, dispatch and select.

## Example
<p align="center">
  <img align="center" src="https://user-images.githubusercontent.com/97107085/148989801-e31ea0cb-63b8-4092-8b8d-0de0be3bd7ba.gif"/>
</p>

## Packages
 
| Packages.           | Versions.         |
| -----------------   | ----------------- |
| angular/cli         | @13.1.2           |
| ngrx/store          | @13.0.2           |
| ngrx/effects        | @13.0.2           |
| typescript.         | @4.5.2            |
| angular/flex-layout | @13.0.0           |
| angular/material.   | @13.1.1           |


## Project Structure
    .
    ├── ...
    ├── src                   
    │   ├── app
    │   │    ├── main
    │   │    │     ├── weather
    │   │    │     │     ├── weather.component.html
    │   │    │     │     ├── weather.component.ts
    │   │    │     │     └── weather.component.scss
    │   │    │     ├── main.routes.ts
    │   │    │     └── main.module.ts
    │   │    └── shared
    │   │    │     ├── components
    │   │    │     │      └── toolbar
    │   │    │     │              └── ...
    │   │    │     ├── enums
    │   │    │     │      └── weather.enum.ts
    │   │    │     ├── filters
    │   │    │     │      └── location.filter.ts
    │   │    │     └── models
    │   │    │     │      ├── location.model.ts
    │   │    │     │      └── weather.model.ts
    │   │    │     ├── services
    │   │    │     │      ├── base.service.ts
    │   │    │     │      └── location.service.ts
    │   │    │     ├── store
    │   │    │     │      ├── actions
    │   │    │     │      │      └── location.action.ts    
    │   │    │     │      ├── reducers
    │   │    │     │      │      └── location.reducer.ts
    │   │    │     │      └── effects
    │   │    │     │             └── location.effect.ts
    │   │    │     │  
    │   │    │     └── shared.module.ts
    │   │    └──... 
    │   │ 
    │   ├── assets 
    │   │      └── ...
    │   ├── environment 
    │   │      └── ...
    │   └── ...                
    └── ...

# The Weather API
For this application, we'll be using the MetaWeather API.

We'll be focusing on two endpoints:

/location/search/?query=$city to get a woeid for a given city name
/location/${woeid} to get the weather for a given woeid

Open https://weather-api-r.herokuapp.com/location/search/?query=chicago in your browser to see the response for the city of Chicago. 

The woeid for Chicago is 2379574. Navigate to https://weather-api-r.herokuapp.com/location/2379574 to get the Chicago's Weather.

## Setup and Run the project

`npm install` followed by
`ng s` and finally

Your code should be running at localhost:4200


## The Model

      .
    ├── ...
    ├── src                   
    │   ├── shared
    │         └── models #Create a new folder
    │                ├── location.model #Create a new file
    │                └── weather.model #Create a new file
    
The Weather API is going to return the weather object in the following format:
```json
      {
         "id":5743173973311488,
         "weather_state_name":"Clear",
         "weather_state_abbr":"c",
         "wind_direction_compass":"ESE",
         "created":"2022-01-12T13:03:32.444761Z",
         "applicable_date":"2022-01-16",
         "min_temp":-9.334999999999999,
         "max_temp":-2.98,
         "the_temp":-1.9900000000000002,
         "wind_speed":6.14471944642753,
         "wind_direction":123.32256672951142,
         "air_pressure":1016.5,
         "humidity":52,
         "visibility":16.894150660144753,
         "predictability":68
      }
```

Consequently, our Weather model will be:

```typescript
export class WeatherModel {
    public air_pressure: number;
    public applicable_date: Date;
    public created: Date;
    public humidity: number;
    public id: number;
    public max_temp: number;
    public min_temp: number;
    public predictability: number;
    public visibility: number;
    public weather_state_abbr: string;
    public weather_state_name: string;
    public wind_direction: number;
    public wind_direction_compass: string;
    public wind_speed: number;

    constructor(data?: any) {
        if (data) {
            this.air_pressure = data.air_pressure;
            this.applicable_date = data.applicable_date;
            this.created = data.created;
            this.humidity = data.humidity;
            this.id = data.id;
            this.max_temp = data.max_temp;
            this.min_temp = data.min_temp;
            this.predictability = data.predictability;
            this.visibility = data.visibility;
            this.weather_state_abbr = data.weather_state_abbr;
            this.weather_state_name = data.weather_state_name;
            this.wind_direction = data.wind_direction;
            this.wind_direction_compass = data.wind_direction_compass;
            this.wind_speed = data.wind_speed;        
        }
    }
}
```

For the Location:

```json
{
  "time":"2022-01-12T08:53:56.580719-06:00",
   "sun_rise":"2022-01-12T07:16:51.939257-06:00",
   "sun_set":"2022-01-12T16:41:16.630411-06:00",
   "timezone_name":"LMT",
   "title":"Chicago",
   "location_type":"City",
   "woeid":2379574,
   "latt_long":"41.884151,-87.632408",
   "timezone":"US/Central"
   consolidated_weather: [] // Array of Weather Conditions
}
```

So, we will add in the location.model.ts the following code:

```typescript
import { WeatherModel } from "./weather.model";

export class LocationModel {
    public woeid: number;
    public title: string;
    public timezone_name: string;
    public timezone: string;
    public time: Date;
    public sun_set: Date;
    public sun_rise: Date;
    public sources: [];
    public location_type: string;
    public latt_long: string;
    public consolidated_weather: WeatherModel[] = [];

    constructor(data?: any) {
        if (data) {
            this.woeid = data.woeid;
            this.title = data.title;
            this.timezone_name = data.timezone_name;
            this.timezone = data.timezone;
            this.time = data.time;
            this.sun_set = data.sun_set;
            this.sun_rise = data.sun_rise;
            this.sources = data.sources;
            this.location_type = data.location_type;
            this.latt_long = data.latt_long;
            if (data.consolidated_weather) {
                data.consolidated_weather.forEach(weather => {
                    this.consolidated_weather.push(new WeatherModel(weather));
                });
            }
        }
    }
}
```

Note: Since `consolidated_weather` is an Array of Weather. We are creating a new WeatherModel object for each item inside of this array.




## What is NgRx
NgRx provides us a state management.
It is a stream of actions where we can dispatch or subscribe to the action in our whole app.


## Registering our NgRx Actions
For each kind of event that we have in our app. We will need to register an Action in the NgRx.

For example: In our app, we will need to fetch All Locations from the backend. Consequently, it is necessary to tell the NgRx what is this Action.

But how to do that?
To fetch we have 3 kind of steps
Action 1 - When you send a request to the backend - Start fetching.
Action 2 - When the backend returns the data - End fetching.
Action 3 - When the backend returns an error - Error.

Translating these steps into NgRx sytax:

```typescript
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
```

Basically, we give a name for that Action. Secondly, we set the props for this action (The props are optional).

In the Action 1 we are passing the querystring. Hence, the payload will be a string.
In the Action 2 the backend is returning an Array of Locations. So the payload will be LocationModel[].
In the Action 3 we are passing any http error that we might have. 

## Registering a Reducer
To register a reducer, it is necessary to set a State interface and Initial State.

##### The State Interface

For the state interface, it is necessary to tell the Reducer the format of your state.
In our case, we have the following interface.

```typescript
export interface State {
    selectedLocation: LocationModel;
    locations: LocationModel[];
    loadingLocations: boolean;
    loadingSelectedLocation: boolean;
    error: HttpErrorResponse;
}
```

##### The Initial State
The initial state is only to tell the NgRx how the state should be when the app initialized.

```typescript
const initialState: State = {
    selectedLocation: null,
    locations: [],
    loadingLocations: false,
    loadingSelectedLocation: false,
    error: null
};
```

##### The Reducer
The syntax to create a reducer is going to be:

```typescript
export const reducerName = createReducer(
    initialState,
    on(ACTION TYPE, (state) => {
        return YOUR NEW STATE;
    })
)
```

So following this idea our `getLocationsStart`, `getLocationsEnd` and `locationErrors` would be written as follow:

```typescript
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
    on(LocationActions.locationErrors, (state, action) => {
        return ({
            ...state,
            isLoading: false,
            loadingSelectedLocation: false,
            error: action.payload.error
        });
    })
)
```

When you dispatch an Action, NgRx is going to run a switch function. Selecting the right reducer for the dispatched Action.

Example: If you call the dispatch method as `getLocationsStart`, Ngrx is going select the following Reducer:

```typescript
on(LocationActions.getLocationsStart, (state) => {
        return ({
            ...state,
            locations: [],
            loadingLocations: true,
            error: null
        });
})
```


## Effects
> Effects allow us to handle asynchronous operations in NgRx.
> Effects are Observables and them are going to keep listening the registered Action.

To create an effect you will need to use the method from NgRx called 'createEffect()'. 
Inside the createEffect we need to set the Action this Effect will be keep listening. Hence, we must set teh Action in the ofType().
In the following example we are going to keep listening the Action `getLocationsStart`. Hence, everytime that we dispatch a Action for `getLocationsStart`, this Effect will be triggered.

```typescript
getLocations$ = createEffect((): any => this.actions$.pipe(
        ofType(LocationActions.getLocationsStart),
        mergeMap((action) => this.locationService.search(action.payload.querystring)
            .pipe(
                map(
                    (response) => (
                        { type: LocationActions.getLocationsEnd.type, payload: response })
                ),
                catchError((err) => of({ type: LocationActions.locationErrors.type, payload: { error: err } })))
        )
    )
);
```

When this async task is resolved. It is necessary to pass the next Action.
In this example, the Effect will call the Actions`getLocationsEnd` for success and `locationErrors` if there is an error.



## Searching for a City - Toolbar
On ngOnInit we are registering an Observable to keep tracking any changes in the Location State.

```typescript
this._subscriptions.add(this.store.select('locationReducer')
            .subscribe(state => {
                this.locations = state.locations;
                this.isLoading = state.loadingLocations;
                if (state.error) {
                    console.warn(state.error.message);
                }
            })
);
```

When any change is made. This listener will be called.

In our Toolbar component, we have a search field to find the available cities that we want to check the weather.
As soon you type a word, we are going to call the function getLocations().
This function getLocations() is going to call the Action `getLocationsStart` and as a payload, we are passing the querystring.

```typescript
this.store.dispatch({
    type: LocationActions.getLocationsStart.type,
    payload: { querystring: this.filter.toQueryString() }
});
```

NgRx is going to dispatch the Action `getLocationsStart`. As a result, the reducer with type `getLocationsStart` will be triggered and the new State will be set.

```typescript
on(LocationActions.getLocationsStart, (state) => {
        return ({
            ...state,
            locations: [],
            loadingLocations: true, /// The new State will be loadingLocations as true
            error: null
        });
    }),
```

Since we have an Effect listening to the Action `getLocationsStart`. This effect will be called.
If the response is equal a success, a new Action will be dispatch with name `getLocationsEnd`. Otherwise, `locationsError`.

```typescript
    getLocations$ = createEffect((): any => this.actions$.pipe(
        ofType(LocationActions.getLocationsStart),
        mergeMap((action) => this.locationService.search(action.payload.querystring)
            .pipe(
                map(
                    (response) => (
                        { type: LocationActions.getLocationsEnd.type, payload: response }) /// Dispatch new Action as Get Locations End
                ),
                catchError((err) => of({ type: LocationActions.locationErrors.type, payload: { error: err } }))) /// Dispatch new Action as Get Locations Over
        ))
    );
```

The Reducer `getLocationsEnd` will be triggered. Consequently, a new state will be set with the searched cities.

```typescript
    on(LocationActions.getLocationsEnd, (state, action) => {
        let locations = [];
        action.payload.forEach(location => {
            locations.push(new LocationModel(location))
        });

        return ({
            ...state,
            locations: locations, // New State for Locations
            loadingLocations: false, // Is Loading is now False
            error: null
        })
    }),
```
