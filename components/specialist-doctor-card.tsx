import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import {
  TypedNavigator,
  useTheme,
  useNavigation,
  NavigationProp,
} from "@react-navigation/native";

import {
  Image,
  ImageSourcePropType,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import {
  HomeStackScreenProps,
  PrivateStackParamList,
  PrivateStackScreenProps,
} from "../navigators/private-stack";

interface Props {
  doctor: {
    id: string;
    name: string;
    email: string;
  };
  navigation: NavigationProp<any, any>;
}

const getImageSource = (image: ImageSourcePropType) => {
  return Image.resolveAssetSource(image);
};

const SpecialistDoctorCard = ({ doctor, navigation }: Props) => {
  const theme = useTheme();

  const { id, name } = doctor;

  return (
    <View
      style={{
        width: "98%",
        height: 180,
        backgroundColor: "white",
        borderRadius: 10,
        borderWidth: 1,
        borderColor: theme.colors.border,
        padding: 10,
        gap: 10,
        shadowColor: "#000", // Shadow color for iOS
        shadowOffset: { width: 0, height: 2 }, // Shadow offset for iOS
        shadowOpacity: 0.1, // Shadow opacity for iOS
        shadowRadius: 3, // Shadow radius for iOS
        elevation: 5,
        margin: 4,
      }}
    >
      <View style={{ flexDirection: "row", gap: 15 }}>
        <View>
          <Image
            source={require("../assets/images/doctor-avatar.png")}
            style={{ width: 80, height: 80, borderRadius: 10 }}
          />
        </View>
        <View>
          <View
            style={{
              gap: 30,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                backgroundColor: "#cfddfa",
                gap: 4,
                padding: 6,
                borderRadius: 20,
              }}
            >
              <MaterialIcons
                name="verified"
                size={20}
                color={theme.colors.primary}
              />
              <Text style={{ color: theme.colors.primary, fontWeight: "500" }}>
                Professional Doctor
              </Text>
            </View>
            <View style={{}}>
              <MaterialCommunityIcons
                name="heart-outline"
                size={24}
                style={{ opacity: 0.5 }}
              />
            </View>
          </View>
          <View style={{ marginTop: 10 }}>
            <View>
              <Text style={{ fontWeight: "600" }}>{name}</Text>
              <Text style={{ fontSize: 12, opacity: 0.5 }}>Cardiology</Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: 4,
              }}
            >
              <View
                style={{ flexDirection: "row", gap: 4, alignItems: "center" }}
              >
                <View style={{ flexDirection: "row" }}>
                  <MaterialCommunityIcons
                    name="star"
                    size={18}
                    color={"#eddb51"}
                  />
                  <MaterialCommunityIcons
                    name="star"
                    size={18}
                    color={"#eddb51"}
                  />
                  <MaterialCommunityIcons
                    name="star"
                    size={18}
                    color={"#eddb51"}
                  />
                  <MaterialCommunityIcons
                    name="star"
                    size={18}
                    color={"#eddb51"}
                  />
                </View>
                <Text style={{ fontWeight: 600, fontSize: 13 }}>4.8</Text>
              </View>

              <View
                style={{
                  width: 1,
                  height: "100%",
                  backgroundColor: theme.colors.border,
                  opacity: 0.5,
                }}
              />
              <View>
                <Text style={{ opacity: 0.5 }}>49 Reviews</Text>
              </View>
            </View>
          </View>
        </View>
      </View>

      {/* Button  */}
      <TouchableOpacity
        style={{
          width: "100%",
          backgroundColor: "#cfddfa",
          borderRadius: 10,
          height: 50,
          justifyContent: "center",
          alignItems: "center",
        }}
        onPress={() =>
          navigation.navigate("DoctorDetails", {
            doctorId: id,
          })
        }
      >
        <Text
          style={{
            color: theme.colors.primary,
            fontSize: 16,
            fontWeight: "600",
          }}
        >
          Make Appointment
        </Text>
      </TouchableOpacity>
    </View>
  );
};
export default SpecialistDoctorCard;
const styles = StyleSheet.create({});
