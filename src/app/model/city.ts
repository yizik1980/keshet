export interface country {
    ID: string;
    LocalizedName: string;
}

export interface administrativeArea {
    ID: string;
    LocalizedName: string;
}

export interface city {
    Version: number;
    Key: string;
    Type: string;
    Rank: number;
    LocalizedName: string;
    Country: country;
    AdministrativeArea: administrativeArea;
}