import { User } from "./User";

export type ItemUser = User & { score: number };

export type SearchUser = {
  total_count: number;
  incomplete_results: boolean;
  items: ItemUser[];
};
