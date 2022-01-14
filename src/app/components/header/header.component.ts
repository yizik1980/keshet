import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { map, Subscription } from 'rxjs';
import { TemperatureType, WeatherData } from 'src/app/model/weather';
import { AppState } from 'src/app/reducers';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit , OnDestroy {
  subScriptionList = new Array<Subscription>();
  selectCity: { name: string; key: string; } | undefined;
  data:{
    currentDate:Date,
    weatherDescription:string,
    temperture: TemperatureType,
  } | undefined;
  constructor(private store: Store<AppState>) { }
  ngOnDestroy(): void {
    this.subScriptionList.map(item=>item.unsubscribe());
  }

  ngOnInit(): void {
    const subscriptionSelection = this.store.select(st => st.cities?.selectedCity)
      .subscribe(selectedCity => {
        this.selectCity = selectedCity;
      });
      // weather data
    const subscriptionWeather = this.store.select(st => st.weather?.weatherData)
      .pipe(map(res => {
        if(!res){
          return res;
        }
        const {Maximum,Minimum} = res.DailyForecasts[0].Temperature;
        return {
          currentDate: res.Headline.EffectiveDate,
          weatherDescription: res.Headline.Text,
          temperture: Maximum
        }
      }))
      .subscribe(data => {
        if(data)
        this.data = data;
      });

      this.subScriptionList = [subscriptionSelection,subscriptionWeather];
  }

}
