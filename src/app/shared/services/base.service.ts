import { HttpClient } from '@angular/common/http';
import { Injectable, SkipSelf } from "@angular/core";
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export abstract class BaseService<TModel> {
    protected serviceName;

    constructor(
        @SkipSelf() protected http: HttpClient
    ) { }

    protected get url():string{
        return `${environment.apiEndpoint}/${this.serviceName}`;
    }

    public get(querystring?:string):Observable<TModel[]>{
        let url = this.url;
        if(querystring && querystring.length >0){
            url = `${url}?${querystring}`
        }
        return this.http.get<any>(url);
    }

    public getById(id: number):Observable<TModel>{
        return this.http.get<any>(`${this.url}/${id}`);
    }
}