import { useTheme } from "@react-navigation/native";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import MatertialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import MatertialIcons from "@expo/vector-icons/MaterialIcons";
import { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../../../utils/contants";
import { useUser } from "../../../hooks/use-user";

const Completed = () => {
  const theme = useTheme();
  const user = useUser();
  const [appointments, setAppointments] = useState<any[]>([]);

  useEffect(() => {
    async function getPendingAppointments() {
      try {
        const res = await axios.get(
          `${API_URL}/patient/my-appointments/completed/${user.user.patient.id}`
        );

        if (res.status === 200) {
          setAppointments(res.data);
        }
      } catch (error: any) {
        console.log(error.message);
        alert("Error occured!");
      }
    }

    getPendingAppointments();
  }, []);

  return (
    <ScrollView style={styles.container}>
      {appointments.length ? (
        appointments.map((appt) => {
          return (
            <View
              key={appt.id}
              style={{
                width: 340,
                height: 240,
                backgroundColor: "white",
                borderRadius: 12,
                borderWidth: 1,
                borderColor: theme.colors.border,
                padding: 16,
                gap: 10,
                shadowColor: "#000", // Shadow color for iOS
                shadowOffset: { width: 0, height: 2 }, // Shadow offset for iOS
                shadowOpacity: 0.1, // Shadow opacity for iOS
                shadowRadius: 5, // Shadow radius for iOS
                elevation: 10,
                margin: 4,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  borderBottomWidth: 1,
                  paddingBottom: 10,
                  borderBottomColor: theme.colors.border,
                }}
              >
                <Text style={{ fontWeight: "600" }}>
                  {new Date(appt.date).toUTCString()}
                </Text>
              </View>
              <View
                style={{
                  marginTop: 10,
                  flexDirection: "row",
                  gap: 20,
                  alignItems: "center",
                  borderBottomWidth: 1,
                  paddingBottom: 10,
                  borderBottomColor: theme.colors.border,
                }}
              >
                <View>
                  <Image
                    source={require("../../../assets/images/user.png")}
                    style={{ width: 80, height: 80, borderRadius: 10 }}
                  />
                </View>
                <View style={{ gap: 5 }}>
                  <Text style={{ fontSize: 16, fontWeight: "600" }}>
                    Dr. {appt.doctor.user.name}
                  </Text>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 4,
                    }}
                  >
                    <MatertialIcons
                      name="location-pin"
                      size={20}
                      color={"#1aa"}
                    />
                    <Text style={{ opacity: 0.6 }}>Rabat, Morocco.</Text>
                  </View>
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 4,
                      }}
                    >
                      <MatertialCommunityIcons
                        name="book-check"
                        size={20}
                        color={"#1aa"}
                      />
                      <Text style={{ opacity: 0.6 }}>Booking ID : </Text>
                    </View>
                    <Text style={{ color: theme.colors.primary }}>
                      #DR28930
                    </Text>
                  </View>
                </View>
              </View>

              {/* Buttons */}

              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-around",
                }}
              >
                <TouchableOpacity
                  style={{
                    width: "100%",
                    backgroundColor: theme.colors.primary,
                    borderRadius: 50,
                    height: 45,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  // @ts-ignore
                  onPress={() => {}}
                >
                  <Text
                    style={{ color: "white", fontSize: 18, fontWeight: 600 }}
                  >
                    Add Review
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          );
        })
      ) : (
        <Text>You haven't completed any appointments yet.</Text>
      )}
    </ScrollView>
  );
};
export default Completed;
const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
});
