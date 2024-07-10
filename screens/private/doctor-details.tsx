import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { useTheme } from "@react-navigation/native";
import axios from "axios";
import { useEffect, useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import { SafeAreaView } from "react-native-safe-area-context";
import { HomeStackScreenProps } from "../../navigators/private-stack";
import { API_URL } from "../../utils/contants";

export const statistics = [
  {
    id: 2,
    name: "Years Exp.",
    icon_name: "work",
    number: "10+",
    icon: MaterialIcons,
  },
  {
    id: 3,
    name: "Rating",
    icon_name: "star",
    number: "4.4+",
    icon: MaterialIcons,
  },
  {
    id: 4,
    name: "Reviews",
    icon_name: "comment",
    number: "4659+",
    icon: MaterialIcons,
  },
];

const working_hours = [
  {
    id: 1,
    day: "Monday",
    working_hours: "09:00AM - 06:00PM",
  },
  {
    id: 2,
    day: "Tuesday",
    working_hours: "09:00AM - 06:00PM",
  },
  {
    id: 3,
    day: "Wednesday",
    working_hours: "09:00AM - 06:00PM",
  },
  {
    id: 4,
    day: "Thursday",
    working_hours: "09:00AM - 06:00PM",
  },
  {
    id: 5,
    day: "Friday",
    working_hours: "09:00AM - 06:00PM",
  },
];

const mapInitialRegion = {
  latitude: 33.99662740945178,
  longitude: -6.874844017752231,
  latitudeDelta: 0.1,
  longitudeDelta: 0.1,
};
const DoctorDetails = ({
  navigation,
  route,
}: HomeStackScreenProps<"DoctorDetails">) => {
  const theme = useTheme();
  const [doctorData, setDoctorData] = useState<any>();
  // @ts-ignore
  const doctorId = route.params ? route.params.doctorId : "";
  const [patientsNumber, setPatientsNumber] = useState(0);

  useEffect(() => {
    async function fetchDoctorDetails() {
      try {
        const res = await axios(`${API_URL}/doctor/${doctorId}`);
        console.log("DOCTOR : ", res.data);
        setPatientsNumber(res.data.patients.length);

        setDoctorData(res.data);
      } catch (error: any) {
        console.log("Error fetching doctor data : ", error.message);
      }
    }

    fetchDoctorDetails();
  }, []);

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
        <Text style={{ fontSize: 20, fontWeight: "600" }}>Doctor Details</Text>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
          <View
            style={{
              borderWidth: 1,
              borderColor: theme.colors.border,
              padding: 8,
              borderRadius: 50,
            }}
          >
            <MaterialIcons name="share" size={26} />
          </View>
          <View
            style={{
              borderWidth: 1,
              borderColor: theme.colors.border,
              padding: 8,
              borderRadius: 50,
            }}
          >
            <MaterialCommunityIcons name="heart-outline" size={26} />
          </View>
        </View>
      </View>
      <ScrollView>
        {/* Header */}

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
                  {doctorData && doctorData.name}
                </Text>
                <Text style={{ fontSize: 14, opacity: 0.5 }}>
                  {doctorData && doctorData.speciality}
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
          <View style={{ alignItems: "center", justifyContent: "center" }}>
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
              <MaterialIcons
                // @ts-ignore
                name="people"
                size={30}
                color={theme.colors.primary}
              />
              {/* <MaterialIcons
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
              {patientsNumber}
            </Text>
            <Text style={{ fontSize: 14, opacity: 0.5 }}>Patients</Text>
          </View>
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
                  {/* <MaterialIcons
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

        {/*  About */}
        <View style={{ marginTop: 30, gap: 6 }}>
          <Text style={{ fontSize: 24, fontWeight: "600" }}>About</Text>
          <Text style={{ opacity: 0.6, fontSize: 16, lineHeight: 22 }}>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cum
            aliquam sequi dolor aperiam consequatur dolorem, nesciunt aut
            molestias reprehenderit ipsa itaque ducimus laudantium.
          </Text>
        </View>

        {/*  Working Hours */}
        <View style={{ marginTop: 30, gap: 6 }}>
          <Text style={{ fontSize: 24, fontWeight: "600" }}>Working Hours</Text>
          <View
            style={{
              width: "100%",
              height: 1,
              backgroundColor: "black",
              opacity: 0.2,
              marginVertical: 10,
            }}
          />
          <View style={{ marginTop: 10, gap: 10 }}>
            {working_hours.map((wh) => {
              return (
                <View
                  key={wh.id}
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Text style={{ fontSize: 16, opacity: 0.5 }}>{wh.day}</Text>
                  <Text style={{ fontSize: 16 }}>{wh.working_hours}</Text>
                </View>
              );
            })}
          </View>
        </View>

        {/*  Address */}
        <View style={{ marginTop: 30, minHeight: 600 }}>
          <Text style={{ fontSize: 24, fontWeight: "600" }}>Address</Text>
          <View
            style={{
              width: "100%",
              height: 1,
              backgroundColor: "black",
              opacity: 0.2,
              marginVertical: 10,
            }}
          />
          <View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
            <MaterialIcons
              name="location-on"
              size={30}
              color={theme.colors.primary}
            />
            <Text>1er Étage, 45, 14 Ave Mohamed Ben Abdellah, Rabat</Text>
          </View>
          <View
            style={{
              marginTop: 20,
              width: "100%",
              height: 300,
              borderRadius: 10,
              overflow: "hidden",
            }}
          >
            <MapView
              style={{ width: "100%", height: "100%" }}
              initialRegion={mapInitialRegion}
              showsUserLocation
              showsMyLocationButton
            >
              <Marker coordinate={mapInitialRegion} />
            </MapView>
          </View>
        </View>

        {/*  Reviews */}
        <View></View>
      </ScrollView>
      <TouchableOpacity
        style={{
          position: "absolute",
          backgroundColor: theme.colors.primary,
          borderRadius: 50,
          height: 50,
          justifyContent: "center",
          alignItems: "center",
          bottom: 10,
          right: 20,
          width: "100%",
        }}
        onPress={() =>
          // @ts-ignore
          navigation.navigate("BookAppointment", {
            doctorId,
          })
        }
      >
        <Text style={{ color: "white", fontSize: 18, fontWeight: 600 }}>
          Book Appointment
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  backArrow: {
    // paddingHorizontal: 24,
    height: 52,
    alignItems: "center",
    flexDirection: "row",
  },
});

export default DoctorDetails;
