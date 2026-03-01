import { BASE_URL } from "@/constants/api";
import { ServiceConfig } from "./AbstractService";
import { UsersService } from "./services";

const config: ServiceConfig = { baseURL: BASE_URL };

export class ApiHub {
  readonly users: UsersService;

  constructor() {
    this.users = new UsersService(config);
  }
}

export const apiHub = new ApiHub();
