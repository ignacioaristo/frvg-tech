import { ItemUser } from "./SearchUser";

export type MainNavigatorStackList = {
  Home: undefined;
  UserDetails: {
    user: ItemUser;
  };
};
