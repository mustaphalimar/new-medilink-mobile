import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MatertialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import MatertialIcons from "@expo/vector-icons/MaterialIcons";
import { PrivateStackScreenProps } from "../../navigators/private-stack";
import { useTheme } from "@react-navigation/native";
import BookingTabs from "../../components/bookings-tabs/bookings-tabs";

type BookingsScreenProps = PrivateStackScreenProps<"Bookings">;

const BookingsScreen: React.FC<BookingsScreenProps> = ({ navigation }) => {
  const theme = useTheme();
  return (
    <SafeAreaView
      style={{
        position: "relative",
        height: "100%",
        paddingHorizontal: 20,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <View style={styles.backArrow}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <MatertialIcons
              name="arrow-back-ios"
              size={24}
              color={theme.colors.text}
            />
          </TouchableOpacity>
        </View>
        <View>
          <Text style={{ fontSize: 18 }}>My Bookings</Text>
        </View>
        <View>
          <MatertialIcons name="search" size={30} color={theme.colors.text} />
        </View>
      </View>
      <BookingTabs />
    </SafeAreaView>
  );
};

export default BookingsScreen;

const styles = StyleSheet.create({
  backArrow: {
    height: 52,
    alignItems: "center",
    flexDirection: "row",
  },
});
