import { EmptyData } from "@/app/components/EmptySearch/EmptyData";
import { SearchBar } from "@/app/components/SearchBar/SearchBar";
import { FavouriteContext } from "@/app/context/FavouriteContext";
import { useFetchUsers } from "@/app/hooks/useFetchUsers";
import { MainNavigatorStackList } from "@/app/types/Navigations";
import { ItemUser } from "@/app/types/SearchUser";
import { Heart } from "@/assets/images/Heart";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import React, { useContext, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  SafeAreaView,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import { styles } from "./Home.styles";

export const Home = () => {
  const [userSearched, setUserSearched] = useState<ItemUser[] | null>(null);
  const favouriteList = useContext(FavouriteContext);
  const navigation = useNavigation<NavigationProp<MainNavigatorStackList>>();
  const { width } = useWindowDimensions();

  const { isLoading, users } = useFetchUsers();
  // const users = USER_MOCK;
  // const isLoading = false;

  const handleOnPressUser = (item) => {
    navigation.navigate("UserDetails", {
      user: item,
    });
  };

  const renderItem = ({ item }: { item: any }) => {
    const isFavourite = favouriteList.favouriteUsers.includes(item.id);
    return (
      <TouchableOpacity
        style={[styles.userButton, { width: width / 2 - 20 }]}
        onPress={() => handleOnPressUser(item)}
      >
        <Image source={{ uri: item.avatar_url }} style={styles.avatar} />
        <Text style={styles.name}>{item.login}</Text>
        {isFavourite ? (
          <View style={styles.favouriteIcon}>
            <Heart width={15} height={15} isFavourite />
          </View>
        ) : null}
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <SearchBar setUserSearched={setUserSearched} />
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          keyExtractor={(data) => String(data.id)}
          renderItem={renderItem}
          // data={users}
          data={userSearched ? userSearched : users}
          contentContainerStyle={styles.flatListContainer}
          ListEmptyComponent={<EmptyData text="No users were found" />}
        />
      )}
    </SafeAreaView>
  );
};
