import { EmptyData } from "@/app/components/EmptySearch/EmptyData";
import { SearchBar } from "@/app/components/SearchBar/SearchBar";
import { FavouriteContext } from "@/app/context/FavouriteContext";
import { MainNavigatorStackList } from "@/app/types/Navigations";
import { ItemUser } from "@/app/types/SearchUser";
import { User } from "@/app/types/User";
import { Heart } from "@/assets/images/Heart";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import React, { useContext, useEffect, useState } from "react";
import {
  FlatList,
  Image,
  SafeAreaView,
  Text,
  TouchableOpacity,
} from "react-native";
import { styles } from "./Home.styles";

export const Home = () => {
  const [users, setUsers] = useState<User[]>();
  const [userSearched, setUserSearched] = useState<ItemUser[] | null>(null);
  const favouriteList = useContext(FavouriteContext);
  const navigation = useNavigation<NavigationProp<MainNavigatorStackList>>();

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

  const handleOnPressUser = (item) => {
    navigation.navigate("UserDetails", {
      user: item,
    });
  };

  const renderItem = ({ item, index }: { item: any; index: number }) => {
    const isFavourite = favouriteList.favouriteUsers.includes(item.id);
    return (
      <TouchableOpacity
        style={[styles.userButton, index % 2 === 0 && styles.greayButton]}
        onPress={() => handleOnPressUser(item)}
      >
        <Image source={{ uri: item.avatar_url }} style={styles.avatar} />
        <Text style={styles.name}>{item.login}</Text>
        {isFavourite ? <Heart width={15} height={15} isFavourite /> : null}
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <SearchBar setUserSearched={setUserSearched} />
      <FlatList
        keyExtractor={(data) => String(data.id)}
        renderItem={renderItem}
        data={userSearched ? userSearched : users}
        ListEmptyComponent={<EmptyData text="No users were found" />}
      />
    </SafeAreaView>
  );
};
