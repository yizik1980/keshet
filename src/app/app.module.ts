import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { environment } from '../environments/environment';
import {  StoreDevtoolsModule } from '@ngrx/store-devtools';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { SearchCityComponent } from './components/search-city/search-city.component'
import { EffectsModule } from '@ngrx/effects';
import { HttpMonitorEffects } from './effects/http-monitor.effects';
import {metaReducers,reducers} from './reducers';
import { WeatherItemComponent } from './components/weather-item/weather-item.component';
import { WeatherViewComponent } from './components/weather-view/weather-view.component';
import { AutocompleteComponent } from './components/autocomplete/autocomplete.component';
import { HeaderComponent } from './components/header/header.component';
import { AppRoutingModule } from './app-routing.module';
import { CommonModule } from '@angular/common';
import { ErrorComponent } from './components/error/error.component';
import { MessageComponent } from './components/message/message.component';

@NgModule({
  declarations: [
    AppComponent,
    SearchCityComponent,
    WeatherItemComponent,
    WeatherViewComponent,
    AutocompleteComponent,
    HeaderComponent,
    ErrorComponent,
    MessageComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    CommonModule,
    AppRoutingModule,
    HttpClientModule,
    StoreModule.forRoot(reducers,{metaReducers}),
    EffectsModule.forRoot([HttpMonitorEffects]),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production, // Restrict extension to log-only mode
      autoPause: true, // Pauses recording actions and state changes when the extension window is not open
    })
  ],
  providers: [ ],
  bootstrap: [AppComponent]
})
export class AppModule { }
