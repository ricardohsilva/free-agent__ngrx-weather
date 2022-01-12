import { WeatherEnum } from "../enums/weather.enum";

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
    public weather_image: string;

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
            this.weather_image = WeatherEnum[data.weather_state_abbr];      
        }
    }
}