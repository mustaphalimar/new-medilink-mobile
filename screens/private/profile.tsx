import { FontAwesome6, MaterialIcons } from "@expo/vector-icons";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useUser } from "../../hooks/use-user";

import { useTheme } from "@react-navigation/native";
import { ProfileStackScreenProps } from "../../navigators/private-stack";

const ProfileScreen: React.FC<ProfileStackScreenProps<"ProfileScreen">> = ({
  navigation,
}) => {
  const user = useUser();
  const theme = useTheme();

  return (
    <SafeAreaView style={{ paddingHorizontal: 20 }}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <View style={styles.backArrow}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <MaterialIcons
              name="arrow-back-ios"
              size={24}
              color={theme.colors.text}
            />
          </TouchableOpacity>
        </View>
        <View
          style={{
            width: "90%",
            alignItems: "center",
          }}
        >
          <Text style={{ fontSize: 20, fontWeight: "600" }}>Profile</Text>
        </View>
      </View>

      <View style={{ marginTop: 60, alignItems: "center" }}>
        <View style={{ alignItems: "center" }}>
          <View>
            <Image
              source={require("../../assets/images/user.png")}
              style={{
                width: 100,
                height: 100,
                borderRadius: 50,
                opacity: 0.8,
              }}
            />
          </View>
          <Text style={{ marginTop: 10, fontSize: 24, fontWeight: "500" }}>
            {user.user.name}
          </Text>
        </View>
        <View style={{ marginTop: 30, gap: 16 }}>
          <TouchableOpacity
            onPress={() => navigation.push("YourProfileScreen")}
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                gap: 16,
                alignItems: "center",
              }}
            >
              <FontAwesome6
                name="user"
                size={30}
                color={theme.colors.primary}
              />
              <Text style={{ fontSize: 20 }}>Your Profile</Text>
            </View>
            <MaterialIcons
              name="keyboard-arrow-right"
              size={26}
              color={theme.colors.primary}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                gap: 16,
                alignItems: "center",
              }}
            >
              <MaterialIcons
                name="settings"
                size={30}
                color={theme.colors.primary}
              />
              <Text style={{ fontSize: 20 }}>Settings</Text>
            </View>
            <MaterialIcons
              name="keyboard-arrow-right"
              size={26}
              color={theme.colors.primary}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                gap: 16,
                alignItems: "center",
              }}
            >
              <MaterialIcons
                name="logout"
                size={30}
                color={theme.colors.primary}
              />
              <Text style={{ fontSize: 20 }}>Log out</Text>
            </View>
            <MaterialIcons
              name="keyboard-arrow-right"
              size={26}
              color={theme.colors.primary}
            />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};
export default ProfileScreen;
const styles = StyleSheet.create({
  backArrow: {
    // paddingHorizontal: 24,
    height: 52,
    alignItems: "center",
    flexDirection: "row",
  },
});
