import { ItemUser } from "./SearchUser";
import { User } from "./User";

export type MainNavigatorStackList = {
  Home: undefined;
  UserDetails: {
    user: ItemUser | User;
    favouriteList?: number[];
  };
};
