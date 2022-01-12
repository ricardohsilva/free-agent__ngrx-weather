import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { LocationModel } from "../models/location.model";
import { BaseService } from "./base.service";

@Injectable({ providedIn: 'root' })
export class LocationService extends BaseService<LocationModel>{
    serviceName = 'location';

    constructor(
        protected http: HttpClient
    ) { super(http); }

    public search(querystring?: string): Observable<LocationModel[]> {
        let url = `${this.url}/search`;
        if(querystring && querystring.length >0){
            url = `${url}?${querystring}`
        }
        return this.http.get<any>(url);
    }
}