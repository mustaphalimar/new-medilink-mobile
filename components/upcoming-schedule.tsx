import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useTheme } from "@react-navigation/native";
import { Image, StyleSheet, Text, View } from "react-native";

const UpcomingSchedule = () => {
  const theme = useTheme();
  return (
    <View style={{ marginTop: 20 }}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
          <Text style={{ fontSize: 20, fontWeight: 500 }}>
            Upcoming Schedule
          </Text>
          <View
            style={{
              width: 20,
              height: 20,
              borderRadius: 50,
              backgroundColor: theme.colors.primary,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text style={{ color: "white", fontWeight: "bold" }}>0</Text>
          </View>
        </View>
      </View>

      <View>
        <Text
          style={{
            marginTop: 10,
            opacity: 0.6,
          }}
        >
          No scheduled appointments for you yet.
        </Text>
      </View>
      {/* <View
        style={{
          marginTop: 20,
          borderRadius: 20,
          padding: 16,
          width: "100%",
          height: 150,
          justifyContent: "space-between",
          backgroundColor: theme.colors.primary,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
            <Image
              source={require("../assets/images/toni-kroos.jpg")}
              style={{ width: 54, height: 54, borderRadius: 50 }}
            />
            <View>
              <Text style={{ color: "white", fontSize: 18, fontWeight: "500" }}>
                Dr. Toni Kroos
              </Text>
              <Text style={{ color: theme.colors.border, fontWeight: "500" }}>
                Neurosurgeon Consultation
              </Text>
            </View>
          </View>
          <View
            style={{
              backgroundColor: theme.colors.background,
              padding: 5,
              borderRadius: 50,
            }}
          >
            <MaterialCommunityIcons
              name="phone"
              size={30}
              color={theme.colors.primary}
            />
          </View>
        </View>

        <View
          style={{
            width: "100%",
            height: 50,
            backgroundColor: "#3465cf",
            borderRadius: 12,
            flexDirection: "row",
            padding: 10,
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
            <MaterialCommunityIcons
              name="calendar"
              size={30}
              color={theme.colors.background}
            />
            <Text style={{ color: theme.colors.background }}>
              Thursday, 20 June
            </Text>
          </View>
          <View
            style={{
              width: 1,
              height: "100%",
              backgroundColor: theme.colors.border,
              opacity: 0.5,
            }}
          />
          <View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
            <MaterialCommunityIcons
              name="clock"
              size={30}
              color={theme.colors.background}
            />
            <Text>
              <Text style={{ color: theme.colors.background }}>
                09:00 - 10:00
              </Text>
            </Text>
          </View>
        </View>
      </View> */}
    </View>
  );
};
const styles = StyleSheet.create({});

export default UpcomingSchedule;
