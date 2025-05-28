import { MainNavigatorStackList } from "@/app/types/Navigations";
import { RepoUserData } from "@/app/types/RepoUserData";
import { useIsFavourite } from "@/app/utils/useIsFavourite";

import { FavouriteContext } from "@/app/context/FavouriteContext";
import { Heart } from "@/assets/images/Heart";
import { RouteProp, useRoute } from "@react-navigation/native";
import React, { useContext, useEffect, useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { styles } from "./UserDetails.styles";

export const UserDetails = () => {
  const route = useRoute<RouteProp<MainNavigatorStackList, "UserDetails">>();
  const user = route.params.user;
  const [userData, setUserData] = useState<RepoUserData>();
  const data = useContext(FavouriteContext);

  const fetchUserRepoData = async (username: string) => {
    try {
      const response = await fetch(`https://api.github.com/users/${username}`);
      const data = await response.json();
      setUserData(data);
    } catch (error) {
      console.error("Error fetching user repositories:", error);
    }
  };

  useEffect(() => {
    fetchUserRepoData(user.login);
  }, []);

  const { isFavourite } = useIsFavourite(userData?.id || 0);

  const addFavouriteUser = () => {
    if (userData) {
      const userId = userData.id;
      if (!data.favouriteUsers.includes(userId)) {
        data.setFavouriteUsers((prev) => [...prev, userId]);
      } else {
        data.setFavouriteUsers((prev) => prev.filter((id) => id !== userId));
      }
    }
  };

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
