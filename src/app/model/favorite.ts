import { WeatherData } from "./weather";

export interface favorite {
    name: string,
    key: string,
    DailyForecast?: WeatherData;
}