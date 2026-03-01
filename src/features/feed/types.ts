import { User } from "@/api/services/users/types";

export type UserSummary = {
  id: number;
  firstName: string;
  lastName: string;
  image: string;
  email: string;
  company: { name: string; department: string; title: string };
};

export function toUserSummary(user: User): UserSummary {
  return {
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    image: user.image,
    email: user.email,
    company: {
      name: user.company.name,
      department: user.company.department,
      title: user.company.title,
    },
  };
}

export type UserDetail = {
  id: number;
  firstName: string;
  lastName: string;
  image: string;
  email: string;
  phone: string;
  username: string;
  age: number;
  birthDate: string;
  role: string;
  company: { name: string; department: string; title: string };
  address: { address: string; city: string; state: string; country: string };
};

export function toUserDetail(user: User): UserDetail {
  return {
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    image: user.image,
    email: user.email,
    phone: user.phone,
    username: user.username,
    age: user.age,
    birthDate: user.birthDate,
    role: user.role,
    company: {
      name: user.company.name,
      department: user.company.department,
      title: user.company.title,
    },
    address: {
      address: user.address.address,
      city: user.address.city,
      state: user.address.state,
      country: user.address.country,
    },
  };
}
