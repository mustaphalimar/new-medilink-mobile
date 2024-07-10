import { MaterialIcons } from "@expo/vector-icons";
import { useTheme } from "@react-navigation/native";
import React, { useState } from "react";
import {
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
// @ts-ignore
import axios from "axios";
import { useUser } from "../../hooks/use-user";
import { API_URL } from "../../utils/contants";

const SignUpScreen = ({
  navigation,
}: PublicStackScreenProps<"SignupScreen">) => {
  const theme = useTheme();

  const [value, setValue] = useState({
    email: "",
    password: "",
    name: "",
    confirmedPassword: "",
  });

  const user = useUser();

  const signUp = async () => {
    const { email, password, confirmedPassword, name } = value;

    if (!email || !password || !name || !confirmedPassword) return;

    if (password !== confirmedPassword) alert("Passwords don't match.");

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
            <MaterialIcons
              name="arrow-back-ios"
              size={24}
              color={theme.colors.text}
            />
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
            Join us to start your journey
          </Text>
          <Text
            style={{
              textAlign: "center",
              color: "#333",

              paddingHorizontal: 8,
            }}
          >
            Create an account and start using our services today.
          </Text>
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
              value={value.name}
              onChangeText={(text) => setValue((pv) => ({ ...pv, name: text }))}
              placeholder="John Doe"
              autoCapitalize="none"
              style={{
                fontSize: 16,
                fontWeight: "500",
                color: theme.colors.text,
                paddingLeft: 48,
                paddingRight: 12,
                height: 48,
                borderRadius: 8,
                borderWidth: 1,
                borderColor: theme.colors.border,
                backgroundColor: theme.colors.background,
                width: "100%",
              }}
            />
            <MaterialIcons
              name="person"
              color={theme.colors.text}
              size={24}
              style={styles.icon}
            />
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              value={value.email}
              onChangeText={(text) =>
                setValue((pv) => ({ ...pv, email: text }))
              }
              placeholder="Email@example.com"
              autoCapitalize="none"
              style={{
                fontSize: 16,
                fontWeight: "500",
                color: theme.colors.text,
                paddingLeft: 48,
                paddingRight: 12,
                height: 48,
                borderRadius: 8,
                borderWidth: 1,
                borderColor: theme.colors.border,
                backgroundColor: theme.colors.background,
                width: "100%",
              }}
            />
            <MaterialIcons
              name="email"
              color={theme.colors.text}
              size={24}
              style={styles.icon}
            />
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              value={value.password}
              onChangeText={(text) =>
                setValue((pv) => ({ ...pv, password: text }))
              }
              placeholder="Password"
              autoCapitalize="none"
              style={{
                fontSize: 16,
                fontWeight: "500",
                color: theme.colors.text,
                paddingLeft: 48,
                paddingRight: 12,
                height: 48,
                borderRadius: 8,
                borderWidth: 1,
                borderColor: theme.colors.border,
                backgroundColor: theme.colors.background,
                width: "100%",
              }}
            />
            <MaterialIcons
              name="lock"
              size={24}
              color={theme.colors.text}
              style={styles.icon}
            />
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              value={value.confirmedPassword}
              onChangeText={(text) =>
                setValue((pv) => ({ ...pv, confirmedPassword: text }))
              }
              placeholder="Comfirm Password"
              autoCapitalize="none"
              style={{
                fontSize: 16,
                fontWeight: "500",
                color: theme.colors.text,
                paddingLeft: 48,
                paddingRight: 12,
                height: 48,
                borderRadius: 8,
                borderWidth: 1,
                borderColor: theme.colors.border,
                backgroundColor: theme.colors.background,
                width: "100%",
              }}
            />
            <MaterialIcons
              name="lock"
              size={24}
              color={theme.colors.text}
              style={styles.icon}
            />
          </View>

          <PrimaryButton
            label="Sign Up"
            style={{ width: "100%", marginTop: 10 }}
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
        </View>
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
