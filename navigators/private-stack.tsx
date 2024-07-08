import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";
import Feather from "react-native-vector-icons/Feather";
import DoctorDetails from "../screens/private/doctor-details";
import HomeScreen from "../screens/private/home";

import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useTheme } from "@react-navigation/native";
import { Text, View } from "react-native";
import ExploreScreen from "../screens/private/explore";
import ChatScreen from "../screens/private/chat";
import BookingsScreen from "../screens/private/bookings";
import ProfileScreen from "../screens/private/profile";
import BookAppointment from "../screens/private/book-appointment";
import YourProfile from "../screens/private/your-profile";

const Tab = createBottomTabNavigator();

export type PrivateStackParamList = {
  Explore: undefined;
  Bookings: undefined;
  Chat: undefined;
  Profile: undefined;
};

export type HomeStackParamList = {
  HomeScreen: undefined;
  DoctorDetails: undefined;
  BookAppointment: undefined;
};

export type ProfileStackParamList = {
  ProfileScreen: undefined;
  YourProfileScreen: undefined;
  SettingsScreen: undefined;
};

const HomeStack = createNativeStackNavigator<HomeStackParamList>();

export type HomeStackScreenProps<T extends keyof HomeStackParamList> =
  NativeStackScreenProps<HomeStackParamList, T>;

function HomeStackScreen() {
  return (
    <HomeStack.Navigator screenOptions={{ headerShown: false }}>
      <HomeStack.Screen name="HomeScreen" component={HomeScreen} />
      <HomeStack.Screen name="DoctorDetails" component={DoctorDetails} />
      <HomeStack.Screen name="BookAppointment" component={BookAppointment} />
    </HomeStack.Navigator>
  );
}

const ProfileStack = createNativeStackNavigator<ProfileStackParamList>();

export type ProfileStackScreenProps<T extends keyof ProfileStackParamList> =
  NativeStackScreenProps<ProfileStackParamList, T>;

function ProfileStackScreen() {
  return (
    <ProfileStack.Navigator screenOptions={{ headerShown: false }}>
      <ProfileStack.Screen name="ProfileScreen" component={ProfileScreen} />
      <ProfileStack.Screen name="YourProfileScreen" component={YourProfile} />
    </ProfileStack.Navigator>
  );
}

export type PrivateStackScreenProps<T extends keyof PrivateStackParamList> =
  NativeStackScreenProps<PrivateStackParamList, T>;

const PrivateNavigator = () => {
  const theme = useTheme();

  // return user ?

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          height: 100,
        },
        headerStyle: { borderWidth: 3, padding: 1 },
      }}
    >
      <Tab.Group
        screenOptions={{
          headerShown: false,
          headerStyle: { borderWidth: 1 },
        }}
      >
        <Tab.Screen
          name="HomeStackScreen"
          options={{
            tabBarShowLabel: false,

            tabBarIcon: ({ focused }) => (
              <View
                style={{ alignItems: "center", opacity: focused ? 1 : 0.5 }}
              >
                <Feather name="home" color={theme.colors.primary} size={24} />
                <Text style={{ fontSize: 12 }}>Home</Text>
              </View>
            ),
          }}
          component={HomeStackScreen}
        />
        {/* <Tab.Screen
          name="DoctorDetails"
          options={{
            tabBarShowLabel: false,
            tabBarIcon: ({ focused }) => (
              <Feather name="home" color={theme.colors.primary} size={24} />
            ),
          }}
          component={DoctorDetails}
        /> */}

        <Tab.Screen
          name="ExploreScreen"
          options={{
            tabBarShowLabel: false,
            tabBarIcon: ({ focused }) => (
              <View
                style={{ alignItems: "center", opacity: focused ? 1 : 0.5 }}
              >
                <Feather name="search" color={theme.colors.primary} size={24} />
                <Text style={{ fontSize: 12 }}>Explore</Text>
              </View>
            ),
          }}
          component={ExploreScreen}
        />
        <Tab.Screen
          name="Bookings"
          options={{
            tabBarShowLabel: false,
            tabBarIcon: ({ focused }) => (
              <View
                style={{ alignItems: "center", opacity: focused ? 1 : 0.5 }}
              >
                <Feather
                  name="calendar"
                  color={theme.colors.primary}
                  size={24}
                />
                <Text style={{ fontSize: 12 }}>Bookings</Text>
              </View>
            ),
          }}
          // @ts-ignore
          component={BookingsScreen}
        />
        <Tab.Screen
          name="Chat"
          options={{
            tabBarShowLabel: false,
            tabBarIcon: ({ focused }) => (
              <View
                style={{ alignItems: "center", opacity: focused ? 1 : 0.5 }}
              >
                <Feather
                  name="message-circle"
                  color={theme.colors.primary}
                  size={24}
                />
                <Text style={{ fontSize: 12 }}>Chat</Text>
              </View>
            ),
          }}
          component={ChatScreen}
        />
        <Tab.Screen
          name="Profile"
          options={{
            tabBarShowLabel: false,
            tabBarIcon: ({ focused }) => (
              <View
                style={{ alignItems: "center", opacity: focused ? 1 : 0.5 }}
              >
                <Feather name="user" color={theme.colors.primary} size={24} />
                <Text style={{ fontSize: 12 }}>Profile</Text>
              </View>
            ),
          }}
          // @ts-ignore
          component={ProfileStackScreen}
        />
      </Tab.Group>
    </Tab.Navigator>
  );
};
export default PrivateNavigator;
