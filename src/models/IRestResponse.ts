export interface IRestResponse {
    success: boolean;
    value?: any;
    error?: any;
    nextLink?: string;
    prevLink?: string;
}