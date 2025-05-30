import { MainNavigatorStackList } from "@/app/types/Navigations";

import * as testIDSelectors from "@/app/config/testIDSelectors";
import { FavouriteContext } from "@/app/context/FavouriteContext";
import { useFetchUserRepoData } from "@/app/hooks/useFetchUserRepoData";
import { useHandleFavourite } from "@/app/hooks/useHandleFavourite";
import { BackArrow } from "@/assets/images/BackArrow";
import { GitHubLogo } from "@/assets/images/GitHubLogo";
import { Heart } from "@/assets/images/Heart";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import React, { useContext } from "react";

import {
  ActivityIndicator,
  Image,
  Linking,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { styles } from "./UserDetails.styles";

export const UserDetails = () => {
  const route = useRoute<RouteProp<MainNavigatorStackList, "UserDetails">>();
  const navigation = useNavigation();
  const user = route.params?.user;
  const data = useContext(FavouriteContext);

  const { users: userData, isLoading } = useFetchUserRepoData(user.login);

  const { addFavouriteUser, removeFavouriteUser } = useHandleFavourite();

  const handleFavouriteUser = () => {
    if (userData) {
      const userId = userData.id;
      if (!data?.favouriteUsers?.includes(userId)) {
        addFavouriteUser(userId);
      } else {
        removeFavouriteUser(userId);
      }
    }
  };

  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator style={styles.loading} />
      ) : (
        <>
          <TouchableOpacity
            onPress={handleFavouriteUser}
            style={styles.heartIcon}
          >
            <Heart isFavourite={data.favouriteUsers?.includes(user.id)} />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleGoBack} style={styles.backArrow}>
            <BackArrow />
          </TouchableOpacity>

          <View style={styles.topInformation}>
            <Image
              source={{ uri: userData?.avatar_url }}
              style={styles.avatar}
            />
            <Text style={[styles.name, styles.whiteText]}>
              {userData?.name}
            </Text>
          </View>

          <View style={styles.bottomInformation}>
            {userData?.bio ? (
              <Text style={[styles.textAlignCenter, styles.whiteText]}>
                Bio: {userData.bio}
              </Text>
            ) : null}
            <Text style={styles.whiteText}>
              Public Repos: {userData?.public_repos}
            </Text>
            <Text style={styles.whiteText}>
              Number of followers: {userData?.followers}
            </Text>
            {userData?.location ? (
              <Text style={styles.whiteText}>
                Location: {userData?.location}
              </Text>
            ) : null}
          </View>

          {userData?.html_url ? (
            <TouchableOpacity
              style={styles.gitHubButton}
              onPress={() => Linking.openURL(userData?.html_url)}
              testID={testIDSelectors.UserDetails.GITHUB_BUTTON}
            >
              <GitHubLogo />
            </TouchableOpacity>
          ) : null}
        </>
      )}
    </View>
  );
};
