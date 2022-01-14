
import { ActionReducerMap, createReducer, MetaReducer, on } from '@ngrx/store';
import { environment } from '../../environments/environment';
import { LoadWeathersAction, LoadWeathersSuccessAction, saveSingleWeatherForcast, LoadFavoritesLocationAction } from '../actions/weather.actions';
import { LoadCitiesAction, LoadCitiesSuccessAction, selectCity } from '../actions/city.actions';
import { city } from '../model/city';
import { WeatherData } from '../model/weather';
import { favorite } from '../model/favorite';
import { failureAction } from '../actions/error.action';

export interface WeatherState {
  weatherData: WeatherData | undefined;
  favorites: Array<favorite>;
  msg: { message: string };
}
export interface ErrorState {
  error: string;
}
const InitialErrorState: ErrorState = {
  error: ''
}
const initialWeatherState: WeatherState = {
  weatherData: undefined,
  favorites: new Array<favorite>(),
  msg: { message: '' }
};

export interface Citiestate {
  cities: Array<city>;
  selectedCity: { name: string, key: string }
}

const initialCitiestate: Citiestate = {
  cities: new Array<city>(),
  selectedCity: {name:'', key:''}
};

export interface AppState {
  weather: WeatherState;
  cities: Citiestate;
  error: ErrorState;
}

const weatherReducer = createReducer(
  initialWeatherState,
  on(LoadWeathersAction, state => ({ ...state })),
  on(LoadWeathersSuccessAction, (state, payload) => ({ ...state, weatherData: payload.data })),
  on(saveSingleWeatherForcast, (state, payload) => {
    if (!payload.f) {
      return state;
    }
    let sesstionFav = JSON.parse(sessionStorage.getItem('faviorate') || "[]") as Array<{ name: string, key: string }>;
    if (!sesstionFav) {
      sesstionFav = new Array<{ name: string, key: string }>();
    }
    if (sesstionFav.some((item) => payload.f.key == item.key)) {
      return {
        ...state,
        msg: { message: 'This favorite Allready exist' }
      };
    }
    sesstionFav.push({
      ...payload.f
    });
    sessionStorage.setItem('faviorate', JSON.stringify(sesstionFav));
    return {
      ...state,
      favorites: [...state.favorites, payload.f],
      msg: { message: 'This favorite Was added Successfuly' }
    };
  }),
  on(LoadFavoritesLocationAction, (state, payload) => {
    let sessionFav = JSON.parse(sessionStorage.getItem('faviorate') || "[]") as Array<{ name: string, key: string }>;
    if (!sessionFav) {
      sessionFav = [];
    }
    return {
      ...state,
      favorites: sessionFav
    };
  })
);


const CityReducer = createReducer(
  initialCitiestate,
  on(LoadCitiesAction, state => ({ ...state })),
  on(LoadCitiesSuccessAction, (state, payload) => {
    return { ...state, cities: payload.data };
  }),

  on(selectCity, (state, payload) => ({ ...state,cities:new Array<city>(), selectedCity: { name: payload.name, key: payload.key } }))
);

const ErrorReducer = createReducer(
  InitialErrorState,
  on(failureAction, (state, payload) => ({ ...state, error: payload.error }))
)

export const reducers: ActionReducerMap<AppState> = {
  cities: CityReducer,
  weather: weatherReducer,
  error: ErrorReducer
};

export const metaReducers: MetaReducer<any>[] = !environment.production ? [] : [];