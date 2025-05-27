import { SearchUser } from "@/app/types/SearchUser";
import { debounce } from "@/app/utils/debounce";
import React from "react";
import { TextInput, View } from "react-native";

type Props = {
  setUserSearched: any;
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
    <View style={{ padding: 10 }}>
      <TextInput
        onChangeText={handleSearch}
        placeholder="Search..."
        style={{
          height: 40,
          borderColor: "gray",
          borderWidth: 1,
          borderRadius: 5,
          paddingHorizontal: 10,
        }}
      />
    </View>
  );
};
