import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MatertialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import MatertialIcons from "@expo/vector-icons/MaterialIcons";
import { HomeStackScreenProps } from "../../navigators/private-stack";
import { useTheme } from "@react-navigation/native";
import { useEffect, useState } from "react";
import axios from "axios";
import { API_URL, dayNames, months } from "../../utils/contants";
import { MotiView } from "moti";
import { Skeleton } from "moti/skeleton";
import { statistics } from "./doctor-details";
import { useUser } from "../../hooks/use-user";

const BookAppointment = ({
  navigation,
  route,
}: HomeStackScreenProps<"BookAppointment">) => {
  const theme = useTheme();

  const [doctorData, setDoctorData] = useState<any>();
  const [loading, setLoading] = useState(false);
  const [availableDates, setAvailableDates] = useState<
    { day: string; month: string; dayName: string }[]
  >([]);
  const [days, setDays] = useState<{ day: string; month: string }[]>([]);
  const [selectedDay, setSelectedDay] = useState("");
  const user = useUser();

  // @ts-ignore
  const doctorId = route.params ? route.params.doctorId : "";

  useEffect(() => {
    async function fetchDoctorDetails() {
      try {
        setLoading(true);
        const res = await axios(`${API_URL}/doctor/${doctorId}`);

        setDoctorData(res.data.user);
        setLoading(false);
      } catch (error: any) {
        console.log("Error fetching doctor data : ", error.message);
      }
    }

    fetchDoctorDetails();
  }, []);

  useEffect(() => {
    async function getAvailableDates() {
      const today = new Date().toJSON();
      try {
        const res = await axios.get(
          `${API_URL}/appointments/available-dates?start=${today}&end=2024-07-14T23:00:00.000Z`
        );
        const dateObjects = res.data.map((dateString: string) => {
          const date = new Date(dateString);
          const day = date.getUTCDate();
          const dayName = date.getUTCDay();

          const month = date.toLocaleString("default", { month: "long" });
          return { day, month, dayName };
        });
        // Use a Map to ensure unique (day, month) combinations
        const uniqueDatesMap = new Map();
        dateObjects.forEach(
          ({
            day,
            month,
            dayName,
          }: {
            day: string;
            month: string;
            dayName: string;
          }) => {
            uniqueDatesMap.set(`${dayName}-${day}-${month}`, {
              day,
              month,
              dayName,
            });
          }
        );

        // Convert the Map back to an array
        const uniqueDates = Array.from(uniqueDatesMap.values());
        setSelectedDay(`${uniqueDates[0].month}/${uniqueDates[0].day}`);

        setAvailableDates(uniqueDates);
        console.log(availableDates);
      } catch (error: any) {
        console.log(error.message);
      }
    }

    getAvailableDates();
  }, []);

  const makeAppointment = async () => {
    try {
      console.log("Selected Day:", selectedDay);

      // Assuming selectedDay is in the format "Month/Day" (e.g., "April/29")
      let monthAndDay = selectedDay.split("/");

      const [monthName, day] = monthAndDay;

      console.log("Month Name:", monthName);
      console.log("day:", day);

      // Assuming months is an object with month names as keys and month numbers as values
      // @ts-ignore
      let monthNumber = Object.values(months).indexOf(monthName);

      console.log("Month Number:", monthNumber);
      monthNumber += 1;

      // Create the date string in the format "YYYY-MM-DDTHH:mm:ss.sssZ"
      console.log(`2024-${monthNumber.toString().padStart(2, "0")}-${day}`);

      const date = new Date(
        `2024-${monthNumber.toString().padStart(2, "0")}-${day}`
      ).toISOString();

      console.log("SELECTED DAY :", date);
      console.log("PATIENT : ", user.user.patient);

      const res = await axios.post(`${API_URL}/appointments`, {
        date,
        doctorId,
        patientId: user.user.patient.id,
      });

      if (res.status === 201) {
        //@ts-ignore
        navigation.navigate("Bookings");
      }
    } catch (error: any) {
      console.log(error.message);
    }
  };

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
      </View>
      <ScrollView>
        <Text style={{ fontSize: 20, fontWeight: "600", textAlign: "center" }}>
          Book Appointment
        </Text>
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
                source={require("../../assets/images/user.png")}
                style={{
                  width: 100,
                  height: 100,
                  borderRadius: 50,
                  opacity: 0.5,
                }}
              />
            </View>
            <View style={{ gap: 10 }}>
              <View>
                <Text style={{ fontWeight: "600", fontSize: 20 }}>
                  {loading && (
                    <Skeleton
                      colorMode={"light"}
                      radius="round"
                      height={16}
                      width={100}
                    />
                  )}
                  {doctorData && doctorData.name}
                </Text>
                <Text style={{ fontSize: 14, opacity: 0.5 }}>Cardiology</Text>
              </View>
              <View
                style={{ flexDirection: "row", gap: 4, alignItems: "center" }}
              >
                <MatertialIcons
                  name="location-on"
                  size={20}
                  color={theme.colors.primary}
                />
                <Text style={{ opacity: 0.5 }}>Rabat, Morocco</Text>
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
        </View>

        {/* Doctor Statistics */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 4,
          }}
        >
          {statistics.map((s) => {
            const Icon = s.icon;
            return (
              <View
                key={s.id}
                style={{ alignItems: "center", justifyContent: "center" }}
              >
                <View
                  style={{
                    backgroundColor: "#cfddfa",
                    width: 60,
                    height: 60,
                    borderRadius: 50,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Icon
                    // @ts-ignore
                    name={s.icon_name}
                    size={30}
                    color={theme.colors.primary}
                  />
                  {/* <MatertialIcons
                name="work"
                size={30}
                color={theme.colors.primary}
              /> */}
                </View>
                <Text
                  style={{
                    color: theme.colors.primary,
                    fontWeight: "600",
                    fontSize: 18,
                  }}
                >
                  {s.number}
                </Text>
                <Text style={{ fontSize: 14, opacity: 0.5 }}>{s.name}</Text>
              </View>
            );
          })}
        </View>

        {/* Book Appointment */}
        <Text
          style={{
            marginTop: 24,
            fontSize: 14,
            textTransform: "uppercase",
            opacity: 0.5,
          }}
        >
          Book Appointment
        </Text>

        <View style={{ marginTop: 20 }}>
          <Text style={{ fontSize: 20, fontWeight: "600" }}>Day</Text>
          <ScrollView
            horizontal
            style={{ marginTop: 10, gap: 4, paddingVertical: 10 }}
          >
            {availableDates &&
              availableDates.map((d, i) => {
                return (
                  <TouchableOpacity
                    key={`${d.month}/${d.day}`}
                    style={{
                      marginHorizontal: 10,
                      width: 80,
                      height: 50,
                      borderRadius: 50,
                      backgroundColor:
                        `${d.month}/${d.day}` === selectedDay
                          ? theme.colors.primary
                          : theme.colors.background,
                      justifyContent: "flex-end",
                      alignItems: "center",
                      gap: 2,
                      paddingVertical: 5,
                      borderWidth: 1,
                      borderColor: theme.colors.border,
                    }}
                    onPress={() => setSelectedDay(`${d.month}/${d.day}`)}
                  >
                    {i === 0 ? (
                      <Text
                        style={{
                          color:
                            `${d.month}/${d.day}` === selectedDay
                              ? theme.colors.background
                              : theme.colors.text,
                          opacity: 0.6,
                        }}
                      >
                        Today
                      </Text>
                    ) : (
                      <Text
                        style={{
                          color:
                            `${d.month}/${d.day}` === selectedDay
                              ? theme.colors.background
                              : theme.colors.text,
                          opacity: 0.6,
                        }}
                      >
                        {dayNames[`${d.dayName}`]}
                      </Text>
                    )}
                    <View style={{ flexDirection: "row", gap: 4 }}>
                      <Text
                        style={{
                          color:
                            `${d.month}/${d.day}` === selectedDay
                              ? theme.colors.background
                              : theme.colors.text,
                          fontSize: 15,
                          fontWeight: "600",
                        }}
                      >
                        {d.day}
                      </Text>
                      <Text
                        style={{
                          color:
                            `${d.month}/${d.day}` === selectedDay
                              ? theme.colors.background
                              : theme.colors.text,
                          fontSize: 15,
                          fontWeight: "600",
                        }}
                      >
                        {d.month}
                      </Text>
                    </View>
                  </TouchableOpacity>
                );
              })}
          </ScrollView>
        </View>
        <View style={{ marginTop: 10 }}>
          <Text style={{ fontSize: 20, fontWeight: "600" }}>Time</Text>
        </View>
      </ScrollView>

      <TouchableOpacity
        style={{
          position: "absolute",
          backgroundColor: theme.colors.primary,
          borderRadius: 50,
          height: 60,
          justifyContent: "center",
          alignItems: "center",
          bottom: 10,
          right: 20,
          width: "100%",
        }}
        onPress={makeAppointment}
      >
        <Text style={{ color: "white", fontSize: 18, fontWeight: 600 }}>
          Make Appointment
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};
export default BookAppointment;
const styles = StyleSheet.create({
  backArrow: {
    // paddingHorizontal: 24,
    height: 52,
    alignItems: "center",
    flexDirection: "row",
  },
});
