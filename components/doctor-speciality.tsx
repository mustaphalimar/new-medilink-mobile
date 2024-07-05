import { ScrollView, StyleSheet, Text, View } from "react-native";

import Dentist from "./specialities/dentist";
import Cardiology from "./specialities/cardiology";
import Eyeology from "./specialities/eyeology";
import { useTheme } from "@react-navigation/native";

const specialities = [
  {
    id: 1,
    name: "Dentist",
    icon: Dentist,
  },
  {
    id: 2,
    name: "Cardiology",
    icon: Cardiology,
  },
  {
    id: 3,
    name: "Eyeology",
    icon: Eyeology,
  },
];

const DoctorSpeciality = () => {
  const theme = useTheme();
  return (
    <View style={{ marginTop: 20 }}>
      <Text style={{ fontSize: 20, fontWeight: 500, marginBottom: 10 }}>
        Doctor Speciality
      </Text>
      <ScrollView
        style={{
          flexDirection: "row",
          marginTop: 10,
        }}
        contentContainerStyle={{
          justifyContent: "space-around",
          width: "100%",
        }}
        horizontal={true}
      >
        {specialities.map((sp) => {
          const Icon = sp.icon;
          return (
            <View key={sp.id} style={{ alignItems: "center" }}>
              <View
                style={{
                  backgroundColor: "#cfddfa",
                  width: 50,
                  height: 50,
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: 50,
                  padding: 30,
                }}
              >
                <Icon />
              </View>
              <Text style={{ fontWeight: "600", marginTop: 4 }}>{sp.name}</Text>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({});

export default DoctorSpeciality;
