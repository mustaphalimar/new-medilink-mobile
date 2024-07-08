import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import {
  MaterialCommunityIcons,
  MaterialIcons,
  FontAwesome6,
  Ionicons,
} from "@expo/vector-icons";
import { ProfileStackScreenProps } from "../../navigators/private-stack";
import { useUser } from "../../hooks/use-user";
import { useTheme } from "@react-navigation/native";
import { useState } from "react";

const YourProfile: React.FC<ProfileStackScreenProps<"YourProfileScreen">> = ({
  navigation,
}) => {
  const user = useUser();
  const theme = useTheme();

  const [name, setName] = useState(user.user.name);
  const [email, setEmail] = useState(user.user.email);
  const [phoneNumber, setPhoneNumber] = useState("+2126123456");
  const [dob, setDob] = useState("30/06/1992");

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
          <Text style={{ fontSize: 20, fontWeight: "600" }}>Your Profile</Text>
        </View>
      </View>
      <ScrollView
        style={{ marginTop: 20 }}
        contentContainerStyle={{ alignItems: "center" }}
      >
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
        </View>
        <View style={{ width: "100%" }}>
          <View style={{ marginTop: 30, gap: 10 }}>
            <Text>Name</Text>
            <TextInput
              value={name}
              style={{
                borderWidth: 1,
                borderColor: theme.colors.border,
                borderRadius: 10,
                padding: 10,
                width: "100%",
                height: 50,
              }}
              onChangeText={(t) => {
                setName(t);
              }}
            />
          </View>
          <View style={{ marginTop: 30, gap: 10, width: "100%" }}>
            <Text>Email</Text>
            <TextInput
              value={email}
              onChangeText={(t) => {
                setEmail(t);
              }}
              style={{
                borderWidth: 1,
                borderColor: theme.colors.border,
                borderRadius: 10,
                padding: 10,
                width: "100%",
                height: 50,
              }}
            />
          </View>
          <View style={{ marginTop: 30, gap: 10, width: "100%" }}>
            <Text>Phone Number</Text>
            <TextInput
              value={phoneNumber}
              onChangeText={(t) => {
                setPhoneNumber(t);
              }}
              style={{
                borderWidth: 1,
                borderColor: theme.colors.border,
                borderRadius: 10,
                padding: 10,
                width: "100%",
                height: 50,
              }}
            />
          </View>
          <View style={{ marginTop: 30, gap: 10, width: "100%" }}>
            <Text>Date of birth</Text>
            <TextInput
              value={dob}
              onChangeText={(t) => {
                setDob(t);
              }}
              style={{
                borderWidth: 1,
                borderColor: theme.colors.border,
                borderRadius: 10,
                padding: 10,
                width: "100%",
                height: 50,
              }}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
export default YourProfile;
const styles = StyleSheet.create({
  backArrow: {
    // paddingHorizontal: 24,
    height: 52,
    alignItems: "center",
    flexDirection: "row",
  },
});
