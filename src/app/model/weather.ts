
export interface Headline {
    EffectiveDate: Date;
    EffectiveEpochDate: number;
    Severity: number;
    Text: string;
    Category: string;
    EndDate?: any;
    EndEpochDate?: any;
    MobileLink: string;
    Link: string;
}

export interface TemperatureType {
    Value: number;
    Unit: string;
    UnitType: number;
}


export interface Temperature {
    Minimum: TemperatureType;
    Maximum: TemperatureType;
}

export interface DayInfo {
    Icon: number;
    IconPhrase: string;
    HasPrecipitation: boolean;
    IconUrl: string;
}


export class DailyForecast {
    Date!: Date;
    EpochDate!: number;
    Temperature!: Temperature;
    Day!: DayInfo;
    Night!: DayInfo;
    Sources!: string[];
    MobileLink!: string;
    Link!: string;
 
}

export interface WeatherData {
    Headline: Headline;
    DailyForecasts: DailyForecast[];
}
