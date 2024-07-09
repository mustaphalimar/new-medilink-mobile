import { MaterialIcons } from "@expo/vector-icons";
import { useTheme } from "@react-navigation/native";
import axios from "axios";
import { useEffect, useState } from "react";
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import RenderHtml from "react-native-render-html";
import { SafeAreaView } from "react-native-safe-area-context";
import { useUser } from "../../hooks/use-user";
import { BookingsStackScreenProps } from "../../navigators/private-stack";
import { API_URL } from "../../utils/contants";
import { createMarkup } from "../../utils/helpers";

const { width } = Dimensions.get("window");

const statuses = {
  DONE: "Completed",
  SCHEDULED: "Scheduled",
  PENDING: "Pending",
  CANCELED: "Canceled",
};

const MyAppointments: React.FC<BookingsStackScreenProps<"MyAppointments">> = ({
  navigation,
  route,
}) => {
  // @ts-ignore
  const apptId = route.params ? route.params.apptId : "";
  const [appt, setAppt] = useState<any>();
  const user = useUser();

  const theme = useTheme();

  useEffect(() => {
    async function fetchApptDetails(apptId: string) {
      try {
        const res = await axios.get(`${API_URL}/appointments/${apptId}`);
        if (res.status === 200) {
          setAppt(res.data);
          console.log(appt.Consultation.instructions);
        }
      } catch (error: any) {
        console.log("Error fetching appt details : ", error.message);
      }
    }

    fetchApptDetails(apptId);
  }, [apptId]);

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
        <View style={{ marginLeft: 90 }}>
          <Text style={{ fontSize: 18 }}>My Appointment</Text>
        </View>
      </View>

      <ScrollView style={{ height: "100%" }}>
        {/* Doctor Infos : Photo, name, location  */}
        <View style={{ marginTop: 20, padding: 10 }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 10,
            }}
          >
            <View>
              <Image
                source={require("../../assets/images/doctor-avatar.png")}
                style={{
                  width: 100,
                  height: 100,
                  borderRadius: 50,
                  opacity: 0.8,
                }}
              />
            </View>
            <View style={{ gap: 10 }}>
              <View>
                <Text style={{ fontWeight: "600", fontSize: 20 }}>
                  {appt && appt.doctor.name}
                </Text>
                <Text style={{ fontSize: 14, opacity: 0.5 }}>
                  {appt && appt.doctor.speciality}
                </Text>
              </View>
              <View
                style={{ flexDirection: "row", gap: 4, alignItems: "center" }}
              >
                <MaterialIcons
                  name="location-on"
                  size={20}
                  color={theme.colors.primary}
                />
                <Text style={{ opacity: 0.5 }}>
                  {appt && (appt.doctor.address ?? "Rabat, Morocco")}
                </Text>
              </View>
            </View>
          </View>
          {/* Seprator */}
          <View
            style={{
              width: "100%",
              height: 1,
              backgroundColor: "black",
              opacity: 0.2,
              marginVertical: 20,
            }}
          />
        </View>
        {/* Scheduled Appointment */}
        <View>
          <Text style={{ fontSize: 18, fontWeight: "500" }}>
            Scheduled Appointment
          </Text>
          <View style={{ marginTop: 18, gap: 10 }}>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text style={{ fontSize: 16, opacity: 0.6 }}>Date</Text>
              <Text style={{ fontSize: 16 }}>
                {appt && new Date(appt.date).toUTCString().split("2024")[0]}
              </Text>
            </View>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text style={{ fontSize: 16, opacity: 0.6 }}>Time</Text>
              <Text style={{ fontSize: 16 }}>
                {appt && new Date(appt.date).toUTCString().split("2024")[1]}
              </Text>
            </View>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text style={{ fontSize: 16, opacity: 0.6 }}>Status</Text>
              <Text style={{ fontSize: 16, gap: 4 }}>
                {/* @ts-ignore */}
                {appt && statuses[appt.status]}
              </Text>
            </View>
          </View>
        </View>
        <View
          style={{
            width: "100%",
            height: 1,
            backgroundColor: "black",
            opacity: 0.2,
            marginVertical: 20,
          }}
        />
        {/* Instuctions */}
        <View>
          <Text style={{ fontSize: 18, fontWeight: "500" }}>Instuctions</Text>
          <View style={{ marginTop: 18, gap: 10 }}>
            {appt && appt.Consultation ? (
              <RenderHtml
                contentWidth={width}
                source={createMarkup(appt.Consultation.instructions)}
              />
            ) : (
              <View>
                <Text>Appointment hasn't been completed yet.</Text>
              </View>
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
export default MyAppointments;
const styles = StyleSheet.create({
  backArrow: {
    height: 52,
    alignItems: "center",
    flexDirection: "row",
  },
});
