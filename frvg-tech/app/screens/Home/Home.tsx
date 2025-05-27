import { SearchBar } from "@/app/components/SearchBar/SearchBar";
import { ItemUser } from "@/app/types/SearchUser";
import { User } from "@/app/types/User";
import React, { useEffect, useState } from "react";
import { FlatList, Image, Text, View } from "react-native";

export const Home = () => {
  const [users, setUsers] = useState<User[]>();
  const [userSearched, setUserSearched] = useState<ItemUser[] | null>(null);

  const fetchUsers = async () => {
    try {
      const response = await fetch("https://api.github.com/users");
      const data: User[] = await response.json();
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const renderItem = ({ item, index }: { item: any; index: any }) => (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: index % 2 === 0 ? "#f0f0f0" : "#d0d0d0",
      }}
    >
      <Image
        source={{ uri: item.avatar_url }}
        style={{ width: 50, height: 50, borderRadius: 25, marginLeft: 10 }}
      />
      <Text style={{ padding: 20 }}>{item.login}</Text>
    </View>
  );

  return (
    <View>
      <SearchBar setUserSearched={setUserSearched} />
      <FlatList
        keyExtractor={(data) => String(data.id)}
        renderItem={renderItem}
        data={userSearched ? userSearched : users}
      />
    </View>
  );
};
