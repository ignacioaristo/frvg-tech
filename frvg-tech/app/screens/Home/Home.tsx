import { EmptyData } from "@/app/components/EmptySearch/EmptyData";
import { SearchBar } from "@/app/components/SearchBar/SearchBar";
import { FavouriteContext } from "@/app/context/FavouriteContext";
import { useFetchUsers } from "@/app/hooks/useFetchUsers";
import { useHandleFavourite } from "@/app/hooks/useHandleFavourite";
import { MainNavigatorStackList } from "@/app/types/Navigations";
import { ItemUser, SearchUser } from "@/app/types/SearchUser";
import { User } from "@/app/types/User";
import { debounce } from "@/app/utils/debounce";
import { Heart } from "@/assets/images/Heart";
import { API_GITHUB } from "@/config";
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
} from "react-native";
import { styles } from "./Home.styles";

export const Home = () => {
  const [userSearched, setUserSearched] = useState<ItemUser[] | null>(null);
  const favouriteList = useContext(FavouriteContext);
  const navigation = useNavigation<NavigationProp<MainNavigatorStackList>>();
  const { width } = useWindowDimensions();

  const { addFavouriteUser, removeFavouriteUser } = useHandleFavourite();

  const { isLoading, users } = useFetchUsers();
  // const users = USER_MOCK;
  // const isLoading = false;

  const handleOnPressUser = (item: ItemUser | User) => {
    navigation.navigate("UserDetails", {
      user: item,
    });
  };

  const renderItem = ({ item }: { item: ItemUser | User }) => {
    const isFavourite = favouriteList.favouriteUsers.includes(item.id);
    const handleFavouriteUser = () => {
      if (isFavourite) {
        removeFavouriteUser(item.id);
      } else {
        addFavouriteUser(item.id);
      }
    };
    return (
      //TODO: Make button a Share Component
      <TouchableOpacity
        style={[styles.userButton, { width: width / 2 - 20 }]}
        onPress={() => handleOnPressUser(item)}
      >
        <Image source={{ uri: item.avatar_url }} style={styles.avatar} />
        <Text style={styles.name}>{item.login}</Text>
        <TouchableOpacity
          onPress={handleFavouriteUser}
          style={styles.favouriteIcon}
        >
          <Heart width={25} height={25} isFavourite={isFavourite} />
        </TouchableOpacity>
      </TouchableOpacity>
    );
  };

  //TODO: Move this into the service folder
  const handleSearch = async (text: string) => {
    debounce(async () => {
      const response = await fetch(
        `${API_GITHUB}/search/users?q=${text.trim()}`
      );
      const user: SearchUser = await response.json();
      setUserSearched(user.items);
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <SearchBar handleSearch={handleSearch} />
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          keyExtractor={(data) => String(data.id)}
          renderItem={renderItem}
          // data={users}
          numColumns={2}
          columnWrapperStyle={styles.columnWrapperStyle}
          data={userSearched ? userSearched : users}
          contentContainerStyle={styles.flatListContainer}
          ListEmptyComponent={<EmptyData text="No users were found" />}
        />
      )}
    </SafeAreaView>
  );
};
