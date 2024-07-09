import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { useTheme } from "@react-navigation/native";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import BookingTabs from "../../components/bookings-tabs/bookings-tabs";
import { BookingsStackScreenProps } from "../../navigators/private-stack";

const BookingsScreen: React.FC<BookingsStackScreenProps<"BookingsScreen">> = ({
  navigation,
  route,
}) => {
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
            <MaterialIcons
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
          <MaterialIcons name="search" size={30} color={theme.colors.text} />
        </View>
      </View>
      <BookingTabs navigation={navigation} route={route} />
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
