import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { selectCity } from 'src/app/actions/city.actions';
import { DailyForecast, WeatherData } from 'src/app/model/weather';
import { AppState } from 'src/app/reducers';


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
    .subscribe(forcastList => {
        if(forcastList)
        this.dailyForcast = forcastList;
      })

  }

}
