import Icons from "@expo/vector-icons/MaterialIcons";
import { useTheme } from "@react-navigation/native";
import React, { useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  SafeAreaView,
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
// @ts-ignore
import facebookSVG from "../../assets/images/facebook.png";

import axios from "axios";
import { API_URL } from "../../utils/contants";
import { useUser } from "../../hooks/use-user";

const LoginScreen = ({ navigation }: PublicStackScreenProps<"LoginScreen">) => {
  const theme = useTheme();
  const [loading, setLoading] = useState(false);
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const user = useUser();

  const signIn = async () => {
    const { email, password } = values;
    try {
      const res = await axios.post(`${API_URL}/auth/login`, values);
      const data = await res.data;

      if (res.status === 201) {
        user.setUser(data);
      }
    } catch (error: any) {
      console.log(error.message);
    }
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
      <SafeAreaView
        style={[styles.container, { backgroundColor: theme.colors.card }]}
      >
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
          <Text
            style={{ fontSize: 26, fontWeight: "800", textAlign: "center" }}
          >
            Welcome Back
          </Text>
          <Text
            style={{
              textAlign: "center",
              color: "#333",

              paddingHorizontal: 8,
            }}
          >
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid,
            enim?
          </Text>
        </View>

        <View
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
              placeholder="Email@example.com"
              autoCapitalize="none"
              value={values.email}
              onChangeText={(text) => setValues({ ...values, email: text })}
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
              value={values.password}
              onChangeText={(text) => setValues({ ...values, password: text })}
            />
            <Icons
              name="lock"
              color={theme.colors.text}
              size={24}
              style={styles.icon}
            />
          </View>

          <PrimaryButton
            label="Login"
            style={{ width: "100%", marginTop: 10 }}
            onPress={signIn}
          />
          <Text style={{ opacity: 0.6 }}>OR</Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-around",

              gap: 8,
            }}
          >
            <TouchableOpacity
              style={[
                styles.socialIcon,
                {
                  backgroundColor: theme.colors.background,
                  flexDirection: "row",
                  gap: 6,
                },
              ]}
              onPress={signIn}
            >
              <Image source={googleSVG} style={{ width: 24, height: 24 }} />
              <Text style={{ opacity: 0.6 }}>Continue with Google</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={{}}
            onPress={() => navigation.navigate("SignupScreen")}
          >
            <Text style={{ color: theme.colors.primary }}>
              Don't have an account? Sign Up
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
  },
  backArrow: {
    paddingHorizontal: 24,
    height: 52,
    alignItems: "center",
    flexDirection: "row",
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

export default LoginScreen;
