import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import {
  CityActionTypes, LoadCitiesSuccessAction, selectCity
} from '../actions/city.actions';
import { map, catchError, switchMap } from 'rxjs/operators';
import { RemoteInfoService } from '../services/remote-info.service';
import { of } from 'rxjs';
import {  failureAction } from '../actions/error.action';
import { LoadWeathersSuccessAction } from '../actions/weather.actions';
import { HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable()
export class HttpMonitorEffects {
  constructor(
    private citiesActions$: Actions,
    private weatherActions$: Actions,
    private http: RemoteInfoService
  ) { }
  @Effect()
  LoadCities$ = this.citiesActions$.pipe(
    ofType(CityActionTypes.LoadCities))
    // .pipe(debounceTime(2000))
    .pipe(switchMap((action: any) => {
        return this.http.getCities(action.city);
      })
    ).pipe(
      map((citiesRes) =>{  
      return LoadCitiesSuccessAction({ data: citiesRes })
    })
    ).pipe(catchError((err:HttpErrorResponse) => {
      return of(failureAction({error:err.message}));
    }));

  @Effect()
  weatherEffect$ = this.weatherActions$.pipe(ofType(selectCity)).pipe(
     switchMap((loc: any) => {
      return this.http.getCurrentWheaterFormLocation(loc.key)
    }))
    .pipe(map(weatherOb =>{
      const cloneWeather = {
        ...weatherOb,
        DailyForecasts:weatherOb.DailyForecasts.map(item => {
          const Dayicon = item.Day.Icon > 10 ? item.Day.Icon + '' : '0' + item.Day.Icon;
          const Nighticon = item.Night.Icon > 10 ? item.Night.Icon + '' : '0' + item.Night.Icon;
          return {
            ...item,
            Day: {
              ...item.Day,
              IconUrl: `${environment.iconsUrl}${Dayicon}-s.png`
            },
            Night: {
              ...item.Night,
              IconUrl: `${environment.iconsUrl}${Nighticon}-s.png`
            },
          };
        })
      };
      
    return LoadWeathersSuccessAction({ data: cloneWeather })
    }
     ))
    .pipe(catchError((err:HttpErrorResponse) => {
      return of(failureAction({error:err.message}));
    }));

}
