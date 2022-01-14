import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { selectCity } from 'src/app/actions/city.actions';
import { saveSingleWeatherForcast } from 'src/app/actions/weather.actions';
import { DailyForecast, WeatherData } from 'src/app/model/weather';
import { AppState } from 'src/app/reducers';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-weather-view',
  templateUrl: './weather-view.component.html',
  styleUrls: ['./weather-view.component.scss']
})
export class WeatherViewComponent implements OnInit, OnDestroy {
  weathers$ = new Observable<WeatherData>();
  dailyForcast = new  Array<DailyForecast>() ;
  
  subscriptioWeather = new Subscription();
  constructor(private store: Store<AppState>, private route: ActivatedRoute) { }
  ngOnDestroy(): void {
    this.subscriptioWeather.unsubscribe();
  }
  ngOnInit(): void {
    

    this.subscriptioWeather = this.store.select(st => st.weather?.weatherData?.DailyForecasts)
      .pipe(map(res => {
          if(!res){
            return res;
          }
          return  res.map(item => {
              const Dayicon = item.Day.Icon > 10 ? item.Day.Icon + '' : '0' + item.Day.Icon;
              const Nighticon = item.Night.Icon > 10 ? item.Night.Icon + '' : '0' + item.Night.Icon;
              return {
                ...item,
                Day: {
                  ...item.Day,
                  IconUrl: `${environment.iconsUrl}/${Dayicon}-s.png`
                },
                Night: {
                  ...item.Night,
                  IconUrl: `${environment.iconsUrl}/${Nighticon}-s.png`
                },
              };
            });
          
        
      })).subscribe(forcastList => {
        if(forcastList)
        this.dailyForcast = forcastList;
      })

    this.route.paramMap.subscribe(paramMap => {
      const key = paramMap.get('key');
      const name = paramMap.get('name');
      if (name && key) {
        this.store.dispatch(selectCity({ key, name }));
      } else {
        //default Tel Aviv Weather forcast
        this.store.dispatch(selectCity({ key: '215854', name: 'Tel Aviv' }));
      }
    })
  }

}
