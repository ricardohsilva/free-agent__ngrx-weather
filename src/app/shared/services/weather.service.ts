import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { WeatherModel } from "../models/weather.model";
import { BaseService } from "./base.service";

@Injectable({ providedIn: 'root' })
export class WeatherService extends BaseService<WeatherModel>{
    serviceName = 'location';

    constructor(
        protected http: HttpClient
    ) { super(http); }
}