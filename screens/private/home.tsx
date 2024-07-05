import { ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import DoctorSpeciality from "../../components/doctor-speciality";
import HomeHeader from "../../components/home-header";
import NearbyHospitals from "../../components/nearby-hospitals";
import TopSpecialist from "../../components/top-specialist";
import UpcomingSchedule from "../../components/upcoming-schedule";
import { PrivateStackScreenProps } from "../../navigators/private-stack";
import { useLocation } from "../../hooks/use-location";
import { useEffect } from "react";
import * as Location from "expo-location";
import { useUser } from "../../hooks/use-user";
import axios from "axios";
import { API_URL } from "../../utils/contants";

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
      <ScrollView>
        <HomeHeader />
        <UpcomingSchedule />
        <DoctorSpeciality />
        <NearbyHospitals />
        <TopSpecialist navigation={navigation} />
      </ScrollView>
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
