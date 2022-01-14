import { createAction, props } from '@ngrx/store';
import { favorite } from '../model/favorite';
import { WeatherData } from '../model/weather';

export enum WeatherActionTypes {
  LoadWeathers = '[Weather] Load Weathers',
  LoadWeathersSuccess = '[Weather] Load Weathers Success',
  RemoveWeatherForcast = '[Weather] Remove Weathers Forcast',
  saveSingleWeatherForcast = '[Weather] Save Single Forcast',
  LoadFavoritesLocation  = '[Weather] Load FavorateLocations',
  LoadSingleWeathersSuccess = '[Weather] Load Single Weathers Success',
}
export const LoadWeathersAction = createAction(WeatherActionTypes.LoadWeathers, props<{cityName:string}>());
export const LoadWeathersSuccessAction = createAction(WeatherActionTypes.LoadWeathersSuccess,  props< { data: WeatherData }>());
export const saveSingleWeatherForcast = createAction(WeatherActionTypes.LoadFavoritesLocation, props<{f:favorite}>());
export const LoadFavoritesLocationAction = createAction(WeatherActionTypes.LoadFavoritesLocation);

// export type WeatherActions = LoadWeathers | LoadWeathersSuccess | LoadWeathersFailure;

