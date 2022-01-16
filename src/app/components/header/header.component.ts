import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { map, Subscription } from 'rxjs';
import { selectCity } from 'src/app/actions/city.actions';
import { TemperatureType } from 'src/app/model/weather';
import { AppState } from 'src/app/reducers';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Output()
  toggleViewEmitter = new EventEmitter<boolean>();
  subScriptionList = new Array<Subscription>();
  selectCity: { name: string; key: string; } | undefined;
  data: {
    currentDate: Date,
    weatherDescription: string,
    temperture: TemperatureType,
    iconSrc: string
  } | undefined;
  show = false;
  constructor(private store: Store<AppState>) { }
  ngOnDestroy(): void {
    this.subScriptionList.map(item => item.unsubscribe());
    this.toggleViewEmitter.unsubscribe();
  }

  ngOnInit(): void {
    const subscriptionSelection = this.store.select(st => st.cities?.selectedCity)
      .subscribe(selectedCity => {
        this.selectCity = selectedCity;
      });
    // weather data
    const subscriptionWeather = this.store.select(st => st.weather?.weatherData)
      .pipe(map(res => {
        if (!res) {
          return res;
        }
        const { Temperature: { Maximum }, Day, Night } = res.DailyForecasts[0];
        const d = new Date().getHours();

        return {
          currentDate: res.Headline.EffectiveDate,
          weatherDescription: res.Headline.Text,
          temperture: Maximum,
          iconSrc: d > 6 || d <= 18 ? Day.IconUrl : Night.IconUrl
        }
      }))
      .subscribe(data => {
        if (data){
          this.data = data;
          this.toggleBar()
        }
      });
    //init default city locatio
    this.store.dispatch(selectCity({ key: '215854', name: 'Tel Aviv' }));

    this.subScriptionList = [subscriptionSelection, subscriptionWeather];
  }
  toggleBar(){
    this.show = !this.show;
    this.toggleViewEmitter.emit(this.show);
  }

}
