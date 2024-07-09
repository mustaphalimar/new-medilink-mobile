import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { useTheme } from "@react-navigation/native";
import {
  Image,
  ImageSourcePropType,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

const hospitals = [
  {
    id: 1,
    name: "Hospital 1",
    image: require("../assets/hospitals/hospital-1.jpg"),
  },
  {
    id: 2,
    name: "Hospital 2",
    image: require("../assets/hospitals/hospital-2.jpg"),
  },
  {
    id: 3,
    name: "Hospital 3",
    image: require("../assets/hospitals/hospital-3.jpg"),
  },
];

const getImageSource = (image: ImageSourcePropType) => {
  return Image.resolveAssetSource(image);
};

interface Props {
  hospital: {
    id: string;
    name: string;
    image: ImageSourcePropType;
  };
}

const Hospital = ({ hospital }: Props) => {
  const theme = useTheme();

  return (
    <Pressable
      key={hospital.id}
      style={{
        margin: 10,
        width: 200,
        height: 200,
        backgroundColor: "white",
        overflow: "hidden",
        borderRadius: 10,
        borderWidth: 1,
        borderColor: theme.colors.border,
        shadowColor: "#000", // Shadow color for iOS
        shadowOffset: { width: 0, height: 2 }, // Shadow offset for iOS
        shadowOpacity: 0.25, // Shadow opacity for iOS
        shadowRadius: 3, // Shadow radius for iOS
        elevation: 5, // Shadow for Android
      }}
    >
      <View
        style={{
          width: "100%",
          height: "70%",
          backgroundColor: "black",
          position: "relative",
        }}
      >
        <Image
          source={getImageSource(hospital.image)}
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
          }}
        />
        <View
          style={{
            position: "absolute",
            bottom: 0,
            right: 0,
            backgroundColor: "white",
            flexDirection: "row",
            borderRadius: 20,
            alignItems: "center",
            padding: 3,
            width: 60,
            margin: 10,
          }}
        >
          <MaterialCommunityIcons name="star" size={18} color={"#eddb51"} />
          <Text style={{ fontWeight: 500 }}>4.5</Text>
        </View>
      </View>
      <View style={{ padding: 10, gap: 2, marginTop: 2 }}>
        <Text style={{ fontSize: 16, fontWeight: 500 }}>{hospital.name}</Text>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <MaterialCommunityIcons
            name="clock"
            color={theme.colors.primary}
            size={16}
          />
          <Text style={{ fontSize: 12, opacity: 0.6 }}>15 min - 1.5km</Text>
        </View>
      </View>
    </Pressable>
  );
};

const NearbyHospitals = () => {
  const theme = useTheme();
  return (
    <View style={{ marginTop: 20 }}>
      <Text style={{ fontSize: 20, fontWeight: 500, marginBottom: 10 }}>
        Nearby Hospitals
      </Text>
      <ScrollView
        style={{ marginTop: 10 }}
        contentContainerStyle={{
          flexDirection: "row",
          gap: 30,
        }}
        horizontal={true}
      >
        {hospitals.map((hospital) => {
          // @ts-ignore
          return <Hospital key={hospital.id} hospital={hospital} />;
        })}
      </ScrollView>
    </View>
  );
};
export default NearbyHospitals;
const styles = StyleSheet.create({});
