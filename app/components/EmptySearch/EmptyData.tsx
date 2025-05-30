import { EmptySearch } from "@/assets/images/EmptySearch";
import React from "react";
import { Text, View } from "react-native";
import { styles } from "./EmptyData.styles";

type Props = {
  text: string;
};

export const EmptyData: React.FC<Props> = ({ text }) => {
  return (
    <View style={styles.container}>
      <EmptySearch />
      <Text style={styles.text}>{text}</Text>
    </View>
  );
};
