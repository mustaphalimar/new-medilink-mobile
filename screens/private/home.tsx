import * as Location from "expo-location";
import { useEffect } from "react";
import { FlatList, ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import DoctorSpeciality from "../../components/doctor-speciality";
import HomeHeader from "../../components/home-header";
import NearbyHospitals from "../../components/nearby-hospitals";
import TopSpecialist from "../../components/top-specialist";
import UpcomingSchedule from "../../components/upcoming-schedule";
import { useLocation } from "../../hooks/use-location";

import { useUser } from "../../hooks/use-user";

const sections = [
  { key: "HomeHeader", component: HomeHeader },
  { key: "UpcomingSchedule", component: UpcomingSchedule },
  { key: "DoctorSpeciality", component: DoctorSpeciality },
  { key: "NearbyHospitals", component: NearbyHospitals },
  { key: "TopSpecialist", component: TopSpecialist },
];

const HomeScreen = ({ navigation }: { navigation: any }) => {
  const location = useLocation();
  const user = useUser();

  useEffect(() => {
    const getPermissions = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        console.log("please grant permission");
        return;
      }
      let currentLocation = await Location.getCurrentPositionAsync({});
      location.setLocation(currentLocation);
    };

    getPermissions();
  }, []);

  useEffect(() => {
    console.log({ location: location.location?.coords });
  }, [location]);

  useEffect(() => {}, []);

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={sections}
        renderItem={({ item }) => {
          const Component = item.component;
          return (
            <View style={{ marginVertical: 10 }}>
              <Component navigation={navigation} />
            </View>
          );
        }}
        keyExtractor={(item) => item.key}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    paddingHorizontal: 16,
  },
});
export default HomeScreen;
