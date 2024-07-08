import Icons from "@expo/vector-icons/MaterialIcons";
import { useTheme } from "@react-navigation/native";
import React, { useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import PrimaryButton from "../../components/ui/primary-button";
import { PublicStackScreenProps } from "../../navigators/public-stack";
// @ts-ignore
import googleSVG from "../../assets/images/google.png";
import Animated, { FadeInDown, FadeInUp } from "react-native-reanimated";
// @ts-ignore
import facebookSVG from "../../assets/images/facebook.png";
import axios from "axios";
import { API_URL } from "../../utils/contants";
import { useUser } from "../../hooks/use-user";

const SignUpScreen = ({
  navigation,
}: PublicStackScreenProps<"SignupScreen">) => {
  const theme = useTheme();

  const [loading, setLoading] = useState(false);

  const [value, setValue] = useState({
    email: "",
    password: "",
    name: "",
  });

  const user = useUser();

  const signUp = async () => {
    const { email, password, name } = value;

    if (!email || !password || !name) return;

    try {
      const res = await axios.post(`${API_URL}/users`, {
        name,
        email,
        password,
        role: "PATIENT",
      });

      if (res.status === 201) {
        alert("Account created. Check your emails.");
        user.setUser(res.data);
      }
    } catch (error: any) {
      alert("Email already exists.");
      console.log(error);
    }
  };

  return (
    <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
      <View style={[styles.container, { backgroundColor: theme.colors.card }]}>
        <View style={styles.backArrow}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icons name="arrow-back-ios" size={24} color={theme.colors.text} />
          </TouchableOpacity>
        </View>

        <View
          style={{
            paddingHorizontal: 10,
            marginTop: 80,
            display: "flex",
            gap: 10,
          }}
        >
          <Animated.Text
            entering={FadeInDown.duration(1000).springify()}
            style={{ fontSize: 26, fontWeight: "800", textAlign: "center" }}
          >
            Join us to start your journey
          </Animated.Text>
          <Animated.Text
            entering={FadeInDown.delay(100).springify()}
            style={{
              textAlign: "center",
              color: "#333",

              paddingHorizontal: 8,
            }}
          >
            Create an account and start using our services today.
          </Animated.Text>
        </View>

        {/* <Animated.View
          entering={FadeInUp.duration(1000).springify()}
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
            paddingHorizontal: 10,
            gap: 8,
            marginTop: 20,
          }}
        >
          <TouchableOpacity
            style={[
              styles.socialIcon,
              { backgroundColor: theme.colors.background },
            ]}
          >
            <Image source={googleSVG} style={{ width: 24, height: 24 }} />
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.socialIcon,
              { backgroundColor: theme.colors.background },
            ]}
          >
            <Image source={facebookSVG} style={{ width: 24, height: 24 }} />
          </TouchableOpacity>
        </Animated.View> */}

        <Animated.View
          entering={FadeInUp.duration(1000).springify()}
          style={{
            display: "flex",
            gap: 16,
            alignItems: "center",
            justifyContent: "center",
            marginTop: 40,
            paddingHorizontal: 20,
          }}
        >
          <View style={styles.inputContainer}>
            <TextInput
              placeholder="John Doe"
              autoCapitalize="none"
              style={{
                fontSize: 16,
                fontWeight: "500",
                color: theme.colors.text,
                paddingLeft: 48,
                paddingRight: 12,
                height: 48,
                borderRadius: 12,

                backgroundColor: theme.colors.background,
                width: "100%",
              }}
              value={value.name}
              onChangeText={(text) => setValue({ ...value, name: text })}
            />
            <Icons
              name="person"
              color={theme.colors.text}
              size={24}
              style={styles.icon}
            />
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              placeholder="Email@example.com"
              autoCapitalize="none"
              style={{
                fontSize: 16,
                fontWeight: "500",
                color: theme.colors.text,
                paddingLeft: 48,
                paddingRight: 12,
                height: 48,
                borderRadius: 12,

                backgroundColor: theme.colors.background,
                width: "100%",
              }}
              value={value.email}
              onChangeText={(text) => setValue({ ...value, email: text })}
            />
            <Icons
              name="email"
              color={theme.colors.text}
              size={24}
              style={styles.icon}
            />
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              placeholder="Password"
              autoCapitalize="none"
              style={{
                fontSize: 16,
                fontWeight: "500",
                color: theme.colors.text,
                paddingLeft: 48,
                paddingRight: 12,
                height: 48,
                borderRadius: 12,
                backgroundColor: theme.colors.background,
                width: "100%",
              }}
              value={value.password}
              onChangeText={(text) => setValue({ ...value, password: text })}
            />
            <Icons
              name="lock"
              size={24}
              color={theme.colors.text}
              style={styles.icon}
            />
          </View>
          <PrimaryButton
            label="Sign Up"
            style={{ width: "90%", marginTop: 10 }}
            onPress={signUp}
          />
          <TouchableOpacity
            style={{}}
            onPress={() => navigation.navigate("LoginScreen")}
          >
            <Text style={{ color: theme.colors.primary }}>
              Already have an account? Login
            </Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
    paddingTop: 50,
  },
  backArrow: {
    paddingHorizontal: 24,
    height: 52,
    alignItems: "center",
    flexDirection: "row",
    marginTop: Platform.OS === "android" ? 40 : 0,
  },
  inputContainer: {
    position: "relative",
    width: "100%",
  },

  icon: {
    position: "absolute",
    left: 12,
    top: 12,
    opacity: 0.5,
    // transform: [{ translateY: "-50%" }],
  },

  socialIcon: {
    padding: 12,
    borderRadius: 10,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default SignUpScreen;
