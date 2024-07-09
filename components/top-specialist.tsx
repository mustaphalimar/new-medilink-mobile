import { NavigationProp, useTheme } from "@react-navigation/native";
import axios from "axios";
import { useEffect, useState } from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { API_URL } from "../utils/contants";
import { Doctor } from "../utils/types";
import SpecialistDoctorCard from "./specialist-doctor-card";

const doctors = [
  {
    id: 1,
    name: "Dr. Toni Kroos",
    speciality: "Neurosurgeon",
    image: require("../assets/images/toni-kroos.jpg"),
  },
  {
    id: 2,
    name: "Dr. Dani Carvajal",
    speciality: "Cardiology",
    image: require("../assets/images/dani_carvajal.jpg"),
  },
  {
    id: 3,
    name: "Dr. Luka Modriç",
    speciality: "Eyeology",
    image: require("../assets/images/luka_modric.jpg"),
  },
];

interface Props {
  navigation: NavigationProp<any, any>;
}

const TopSpecialist = ({ navigation }: Props) => {
  const theme = useTheme();
  const [doctors, setDoctors] = useState<Doctor[]>([]);

  useEffect(() => {
    async function fetchDoctors() {
      try {
        const res = await axios.get(`${API_URL}/doctor`);

        if (res.data) {
          const doctors = res.data.map((d: any) => ({ id: d.id, ...d.user }));
          setDoctors(doctors);
          console.log(doctors);
        }
      } catch (error: any) {
        console.log("error fetching doctors:", error.message);
      }
    }

    fetchDoctors();
  }, []);

  return (
    <View style={{ marginTop: 20 }}>
      <Text style={{ fontSize: 20, fontWeight: 500, marginBottom: 10 }}>
        Top Specialist
      </Text>

      <View style={{ gap: 15, marginTop: 10 }}>
        {doctors && (
          <FlatList
            data={doctors}
            renderItem={({ item: d }) => (
              <Pressable
                key={d.id}
                // onPress={() => navigation && navigation.push("DoctorDetails")}
              >
                <SpecialistDoctorCard doctor={d} navigation={navigation} />
              </Pressable>
            )}
          />
        )}
      </View>
    </View>
  );
};
export default TopSpecialist;
const styles = StyleSheet.create({});
