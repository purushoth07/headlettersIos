import { CountryResponseData } from "./country_response_data";

export interface DSTResponse {
    Status: string;
    Message: string;
    Data: CountryResponseData;
    ErrorMessage: string;
}