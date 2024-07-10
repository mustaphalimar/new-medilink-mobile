import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { useTheme } from "@react-navigation/native";
import axios from "axios";
import { useEffect, useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { useUser } from "../hooks/use-user";
import { API_URL } from "../utils/contants";
import { parseISO, format } from "date-fns";
import { extractTime } from "../utils/helpers";

const UpcomingSchedule = () => {
  const theme = useTheme();

  const user = useUser();

  const [upcomingSchedule, setUpcomingSchedule] = useState<any>();
  const [upcomingSchedules, setUpcomingSchedules] = useState<number>();

  useEffect(() => {
    async function getUpcomingAppointment() {
      try {
        const res = await axios.get(
          `${API_URL}/patient/my-appointments/pending/${user.user.patient.id}`
        );

        if (res.status === 200) {
          setUpcomingSchedules(res.data.length);
          setUpcomingSchedule(res.data[0]);
        }
      } catch (error: any) {
        console.log(error.message);
        alert("Error occured!");
      }
    }

    getUpcomingAppointment();
  }, []);

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
            <Text style={{ color: "white", fontWeight: "bold" }}>
              {upcomingSchedules}
            </Text>
          </View>
        </View>
      </View>
      {upcomingSchedule ? (
        <View
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
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 10 }}
            >
              <Image
                source={require("../assets/images/doctor-avatar.png")}
                style={{ width: 60, height: 60, borderRadius: 50 }}
              />
              <View>
                <Text
                  style={{ color: "white", fontSize: 18, fontWeight: "500" }}
                >
                  Dr. {upcomingSchedule.doctor.name}
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
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 4 }}
            >
              <MaterialCommunityIcons
                name="calendar"
                size={30}
                color={theme.colors.background}
              />
              <Text style={{ color: theme.colors.background }}>
                {new Date(upcomingSchedule.date).toUTCString().split("2024")[0]}
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
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 4 }}
            >
              <MaterialCommunityIcons
                name="clock"
                size={30}
                color={theme.colors.background}
              />
              <Text>
                <Text style={{ color: theme.colors.background }}>
                  {extractTime(upcomingSchedule.date)}
                </Text>
              </Text>
            </View>
          </View>
        </View>
      ) : (
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
      )}
    </View>
  );
};
const styles = StyleSheet.create({});

export default UpcomingSchedule;
