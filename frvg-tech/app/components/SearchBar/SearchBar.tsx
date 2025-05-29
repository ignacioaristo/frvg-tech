import React from "react";
import { TextInput, View } from "react-native";
import { styles } from "./SearchBar.styles";

type Props = {
  handleSearch: (text: string) => void;
};

export const SearchBar: React.FC<Props> = ({ handleSearch }) => {
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
