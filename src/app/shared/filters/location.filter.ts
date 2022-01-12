export class LocationFilter {
    public query: string;

    constructor(data?: any){
        if(data){
            this.query = data.query;
        }
    }

    public toQueryString():string{
        let qs = '';

        if(this.query){
            qs += `query=${this.query}`
        }

        return qs;
    }
}