import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { DailyForecast } from 'src/app/model/weather';
import { AppState } from 'src/app/reducers';

@Component({
  selector: 'app-weather-item',
  templateUrl: './weather-item.component.html',
  styleUrls: ['./weather-item.component.css']
})
export class WeatherItemComponent implements OnInit {
  @Input()
  weather:DailyForecast | undefined;
  constructor() {}
  ngOnInit(): void {}
}
