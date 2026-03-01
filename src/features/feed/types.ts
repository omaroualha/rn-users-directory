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
