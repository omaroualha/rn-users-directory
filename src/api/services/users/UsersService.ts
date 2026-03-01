import { AbstractService } from "@/api/AbstractService";
import { User, UsersResponse } from "./types";

export class UsersService extends AbstractService {
  async getUsers(limit: number, skip: number): Promise<UsersResponse> {
    return this.get<UsersResponse>("/users", { params: { limit, skip } });
  }

  async searchUsers(query: string): Promise<UsersResponse> {
    return this.get<UsersResponse>("/users/search", { params: { q: query } });
  }

  async getUserById(id: number): Promise<User> {
    return this.get<User>(`/users/${id}`);
  }
}
