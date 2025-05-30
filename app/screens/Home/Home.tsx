import { EmptyData } from "@/app/components/EmptySearch/EmptyData";
import { SearchBar } from "@/app/components/SearchBar/SearchBar";
import * as testIDSelectors from "@/app/config/testIDSelectors";
import { FavouriteContext } from "@/app/context/FavouriteContext";
import { useFetchSearchUser } from "@/app/hooks/useFetchSearchUser";
import { useFetchUsers } from "@/app/hooks/useFetchUsers";
import { useHandleFavourite } from "@/app/hooks/useHandleFavourite";
import { MainNavigatorStackList } from "@/app/types/Navigations";
import { ItemUser } from "@/app/types/SearchUser";
import { User } from "@/app/types/User";
import { debounce } from "@/app/utils/debounce";
import { Heart } from "@/assets/images/Heart";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import React, { useContext } from "react";
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
  const favouriteList = useContext(FavouriteContext);
  const navigation = useNavigation<NavigationProp<MainNavigatorStackList>>();
  const { width } = useWindowDimensions();

  const { addFavouriteUser, removeFavouriteUser } = useHandleFavourite();
  const { fetchSearchUsers, users: userSearched } = useFetchSearchUser();

  const { isLoading, users } = useFetchUsers();

  const handleOnPressUser = (item: ItemUser | User) => {
    navigation.navigate("UserDetails", {
      user: item,
    });
  };

  const renderItem = ({ item }: { item: ItemUser | User }) => {
    const isFavourite = favouriteList.favouriteUsers?.includes(item.id);
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

  return (
    <SafeAreaView style={styles.container}>
      <SearchBar
        handleSearch={(text) =>
          debounce(async () => {
            fetchSearchUsers(text);
          })
        }
      />
      {isLoading ? (
        <ActivityIndicator testID={testIDSelectors.Home.LOADING_INDICATOR} />
      ) : (
        <FlatList
          keyExtractor={(data) => String(data.id)}
          renderItem={renderItem}
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
