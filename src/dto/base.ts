import { AxiosError, AxiosResponse } from 'axios';

export type ApiResponse<T> = AxiosResponse<T>;

export type ApiErrorResponse = AxiosError<ExceptionResponse>

export interface ExceptionResponse {
    error : string,
    message : string,
    statusCode : number,
}