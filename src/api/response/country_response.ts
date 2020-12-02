import { CountryData } from "./country_data";

export interface CountryResponse {
    Status: string;
    Message: string;
    Data: CountryData;
    ErrorMessage: string;
}