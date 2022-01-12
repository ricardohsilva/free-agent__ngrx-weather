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