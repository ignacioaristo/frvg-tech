import { FavouriteContext } from "@/app/index";
import { MainNavigatorStackList } from "@/app/types/Navigations";
import { RepoUserData } from "@/app/types/RepoUserData";
import { useIsFavourite } from "@/app/utils/useIsFavourite";

import { Heart } from "@/assets/images/Heart";
import { RouteProp, useRoute } from "@react-navigation/native";
import React, { useContext, useEffect, useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

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
    <View
      style={{
        flex: 1,
        alignItems: "center",
      }}
    >
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
        }}
      >
        <TouchableOpacity
          onPress={addFavouriteUser}
          style={{ position: "absolute", top: 30, right: 30 }}
        >
          <Heart isFavourite={isFavourite} />
        </TouchableOpacity>

        <Image
          source={{ uri: userData?.avatar_url }}
          style={{
            width: 200,
            height: 200,
            borderRadius: 100,
          }}
        />
        <Text
          style={{
            textAlign: "center",
            fontWeight: "bold",
            fontSize: 20,
            marginTop: 20,
          }}
        >
          {userData?.name}
        </Text>
      </View>

      <View
        style={{
          flex: 1,
          alignItems: "center",
        }}
      >
        {userData?.bio ? (
          <Text style={{ textAlign: "center" }}>Bio: {userData.bio}</Text>
        ) : null}
        <Text>Public Repos: {userData?.public_repos}</Text>
        <Text>Number of followers: {userData?.followers}</Text>
        {userData?.bio ? <Text>Location: {userData?.location}</Text> : null}
      </View>
    </View>
  );
};
