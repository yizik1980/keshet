import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import {  Store } from '@ngrx/store';
import { fromEvent, Subscription, timer } from 'rxjs';
import {  debounce } from 'rxjs/operators';
import { LoadCitiesAction, selectCity } from 'src/app/actions/city.actions';
import { LoadWeathersAction } from 'src/app/actions/weather.actions';
import { city } from 'src/app/model/city';

import { AppState } from './../../reducers';

@Component({
  selector: 'app-search-city',
  templateUrl: './search-city.component.html',
  styleUrls: ['./search-city.component.css']
})
export class SearchCityComponent implements OnInit, OnDestroy {
  cities: city[] = [];
  citiesSubscription = new Subscription();
  choosenCity: city | undefined ;
  showLoader = false;
  choosenCityName='';
  @ViewChild('autocompelet')
  autocompelet: ElementRef | undefined;
  constructor(private store: Store<AppState>) { }

  ngOnDestroy(): void {
    this.citiesSubscription.unsubscribe();
    this.cities = new Array<city>();
  }

  ngAfterViewInit(): void {
    if(this.autocompelet){
      const observeInput = fromEvent<KeyboardEvent>(this.autocompelet.nativeElement, 'input')
      .pipe(debounce(ev => {
        return ev.key === 'Enter' ? timer(0):timer(1000);
      }));

      fromEvent<InputEvent>(this.autocompelet.nativeElement, 'focus')
      .subscribe((e: InputEvent) => {
        this.cities = new Array<city>();
        observeInput.subscribe((ev: KeyboardEvent) => {
          let target = ev.target as HTMLInputElement;
          if (target.value && target.value.length > 2) {
            this.showLoader = true;
            this.store.dispatch(LoadCitiesAction({ city: target.value }));
          }else{
            this.cities = new Array<city>();
          }
        });
      })

      fromEvent<InputEvent>(this.autocompelet.nativeElement, 'blur').subscribe((e: InputEvent) => {
        observeInput.subscribe();
      })
    }

  }

  selectCity($event: city) {
    this.choosenCity = $event;
    this.choosenCityName = $event.LocalizedName;
    this.store.dispatch(selectCity({ key: this.choosenCity.Key, name: this.choosenCity.LocalizedName }));
  }

  ngOnInit(): void {

     this.citiesSubscription = this.store.select(store => store.cities?.cities)
     .subscribe(cities => {
      this.showLoader = false;
      if(this.cities){
        this.cities = cities;
      }
    });
  }

  focusCity($event: any) {
    this.showLoader = true;
  }

  showWeather() {
    if (this.choosenCity) {
      this.store.dispatch(LoadWeathersAction({ cityName: this.choosenCity.LocalizedName }));
    }
  }

}