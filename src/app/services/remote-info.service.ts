import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { WeatherData } from '../model/weather';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { city } from '../model/city';

@Injectable({
  providedIn: 'root'
})
export class RemoteInfoService {

  constructor(private http: HttpClient) { }
  getCurrentWheaterFormLocation(locationName: string): Observable<WeatherData> {
    return this.http.get<WeatherData>
      (`${environment.fiveDays}${locationName}?${environment.apiCode}`);
  };
  getCities(text: string): Observable<city[]> {
    const url = environment.autocomplet+ '?' + environment.apiCode+ '&q=' + text;
    return this.http.get<city[]>(url);
  }

}
