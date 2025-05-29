import { MainNavigatorStackList } from "@/app/types/Navigations";
import { useIsFavourite } from "@/app/utils/useIsFavourite";

import { FavouriteContext } from "@/app/context/FavouriteContext";
import { useFetchUserRepoData } from "@/app/hooks/useFetchUserRepoData";
import { StorageKey } from "@/app/types/Storage";
import { storeData } from "@/app/utils/storage";
import { Heart } from "@/assets/images/Heart";
import { RouteProp, useRoute } from "@react-navigation/native";
import React, { useContext } from "react";
import {
  ActivityIndicator,
  Image,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { styles } from "./UserDetails.styles";

export const UserDetails = () => {
  const route = useRoute<RouteProp<MainNavigatorStackList, "UserDetails">>();
  const user = route.params.user;
  const data = useContext(FavouriteContext);

  const { users: userData, isLoading } = useFetchUserRepoData(user.login);

  const { isFavourite } = useIsFavourite(userData?.id || 0);

  const addFavouriteUser = () => {
    if (userData) {
      const userId = userData.id;
      if (!data.favouriteUsers.includes(userId)) {
        data.setFavouriteUsers((prev) => {
          storeData(StorageKey.favouriteUsers, [...prev, userId]); //TODO: Improve this logic
          return [...prev, userId];
        });
      } else {
        data.setFavouriteUsers((prev) => {
          storeData(StorageKey.favouriteUsers, [
            ...prev.filter((id) => id !== userId),
          ]); //TODO: Improve this logic
          return prev.filter((id) => id !== userId);
        });
      }
    }
  };

  if (isLoading) return <ActivityIndicator style={styles.loading} />;

  return (
    <View style={styles.container}>
      <View style={styles.topInformation}>
        <TouchableOpacity onPress={addFavouriteUser} style={styles.heartIcon}>
          <Heart isFavourite={isFavourite} />
        </TouchableOpacity>

        <Image source={{ uri: userData?.avatar_url }} style={styles.avatar} />
        <Text style={styles.name}>{userData?.name}</Text>
      </View>

      <View style={styles.bottomInformation}>
        {userData?.bio ? (
          <Text style={styles.textAlignCenter}>Bio: {userData.bio}</Text>
        ) : null}
        <Text>Public Repos: {userData?.public_repos}</Text>
        <Text>Number of followers: {userData?.followers}</Text>
        {userData?.bio ? <Text>Location: {userData?.location}</Text> : null}
      </View>
    </View>
  );
};
