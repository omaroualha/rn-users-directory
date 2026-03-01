import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

export interface ServiceConfig {
  baseURL: string;
}

export abstract class AbstractService {
  protected readonly client: AxiosInstance;

  constructor(config: ServiceConfig) {
    this.client = axios.create({
      baseURL: config.baseURL,
      timeout: 10000,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
  }

  protected async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.get<T>(url, config);
    return response.data;
  }
}
