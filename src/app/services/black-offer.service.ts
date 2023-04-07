import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BlackOfferService {

  //private apiUrl = 'http://localhost:8000/data/';
  private apiUrl = 'https://blackcoffer.herokuapp.com/';

  constructor(private http: HttpClient) { }

  getData(): Observable<any> {
    console.log(this.apiUrl);
    return this.http.get<any>(`${this.apiUrl}data`);
  }
  get_chart(queryParams: any): Observable<any> {
    let params = new HttpParams();
    for (const key in queryParams) {
      params = params.set(key, queryParams[key]);
    }
    return this.http.get<any>(`${this.apiUrl}get_charts`, { params: params });
  }

  get_countries(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}country_plot`);
  }


}
