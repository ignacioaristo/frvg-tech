import { ItemUser, SearchUser } from "@/app/types/SearchUser";
import { debounce } from "@/app/utils/debounce";
import React from "react";
import { TextInput, View } from "react-native";
import { styles } from "./SearchBar.styles";

type Props = {
  setUserSearched: (users: ItemUser[]) => void;
};

export const SearchBar: React.FC<Props> = ({ setUserSearched }) => {
  const handleSearch = async (text: string) => {
    debounce(async () => {
      const response = await fetch(
        `https://api.github.com/search/users?q=${text.trim()}`
      );
      const user: SearchUser = await response.json();
      setUserSearched(user.items);
    });
  };

  return (
    <View style={styles.container}>
      <TextInput
        onChangeText={handleSearch}
        placeholder="Search..."
        placeholderTextColor={"#A0AEC0"}
        autoCapitalize="none"
        autoComplete="off"
        style={styles.input}
      />
    </View>
  );
};
