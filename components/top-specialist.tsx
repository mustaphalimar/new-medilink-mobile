import { NavigationProp, useTheme } from "@react-navigation/native";
import axios from "axios";
import { useEffect, useState } from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { API_URL } from "../utils/contants";
import { Doctor } from "../utils/types";
import SpecialistDoctorCard from "./specialist-doctor-card";

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
          const doctors = res.data.map((d: any) => ({
            id: d.id,
            ...d.user,
            name: d.name,
          }));
          setDoctors(doctors);
          console.log("DOCTORS:", doctors);
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

      {doctors && (
        <FlatList
          style={{ gap: 15, marginTop: 10 }}
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
  );
};
export default TopSpecialist;
const styles = StyleSheet.create({});
