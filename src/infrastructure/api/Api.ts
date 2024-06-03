import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
} from 'axios';
import { injectable } from 'inversify';

// tslint:disable-next-line: no-empty-interface
export interface ApiResponse<T> extends AxiosResponse<T> {}

// tslint:disable-next-line: no-empty-interface
export interface ApiError<T> extends AxiosError<T> {}

@injectable()
export class Api {
  private api: AxiosInstance;
  constructor() {
    this.api = axios.create();
    this.api.interceptors.request.use((param: any) => {
      return ({
        ...param
      });
    });
    this.api.interceptors.response.use((param: AxiosResponse) => ({
      ...param
    }));
  }

  public get<T, R = ApiResponse<T>>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<R> {
    return this.api.get(url, config);
  }

  public post<T, B, R = ApiResponse<T>>(
    url: string,
    data?: B,
    config?: AxiosRequestConfig
  ): Promise<R> {
    return this.api.post(url, data, config);
  }

  public patch<T, B, R = ApiResponse<T>>(
    url: string,
    data?: B,
    config?: AxiosRequestConfig
  ): Promise<R> {
    return this.api.patch(url, data, config);
  }

  public delete<T,R = ApiResponse<T>>(
    url: string,
  ): Promise<R> {
    return this.api.delete(url);
  }

  public put<T, B, R = ApiResponse<T>>(
    url: string,
    data?: B,
    config?: AxiosRequestConfig
  ): Promise<R> {
    return this.api.put(url, data, config);
  }

  // TODO: Add other methods here (put, patch, delete)

  public success<T>(response: ApiResponse<T>) {
    return response.data;
  }

  public error(error: ApiError<Error>) {
    throw error;
  }
}
