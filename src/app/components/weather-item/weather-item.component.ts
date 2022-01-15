import { Component, Input, OnInit } from '@angular/core';
import { DailyForecast } from 'src/app/model/weather';


@Component({
  selector: 'app-weather-item',
  templateUrl: './weather-item.component.html',
  styleUrls: ['./weather-item.component.css']
})
export class WeatherItemComponent implements OnInit {
  @Input()
  weather:DailyForecast | undefined;
  iconSrcDay:string | undefined;
  iconSrcNight:string | undefined;
  constructor() {}
  ngOnInit(): void {
    const d = new Date().getHours();
    this.iconSrcNight = this.weather?.Night.IconUrl;
    this.iconSrcDay = this.weather?.Day.IconUrl;
  }
}
