import { useTheme } from "@react-navigation/native";
import { View, Text, StyleSheet, TextInput } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useLocation } from "../hooks/use-location";
import { useEffect, useState } from "react";

const HomeHeader = () => {
  const location = useLocation();
  const [geoLocation, setGeoLocation] = useState<{
    city: string;
    country: string;
  } | null>({ city: "", country: "" });

  useEffect(() => {
    const getGeocodeAsync = async (coords: {
      longitude: number;
      latitude: number;
    }) => {
      const { longitude, latitude } = coords;

      // `https://geocode.maps.co/reverse?lat=${latitude}&lon=${longitude}&api_key=api_key`;
      try {
        const response = await fetch(
          `https://geocode.maps.co/reverse?lat=${latitude}&lon=${longitude}&api_key=664fb1891abfd170250572ikr70a309`
        );

        const data = await response.json();

        console.log(data);

        setGeoLocation({
          city: data.address.city,
          country: data.address.country,
        });

        // if (data.results && data.results.length > 0) {
        //   setGeoLocation(data.results[0].formatted_address);
        // }
      } catch (error) {
        console.log("An error occured : ", error);
      }
    };

    if (location.location?.coords) {
      getGeocodeAsync(location.location?.coords);
    }
  }, [location]);

  const theme = useTheme();
  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <View>
          <Text style={[{ opacity: 0.6 }]}>Location</Text>
          <View
            style={{
              marginTop: 6,
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <MaterialIcons
              name="location-on"
              size={26}
              color={theme.colors.primary}
            />
            <Text style={{ fontWeight: "600" }}>
              {geoLocation ? (
                <>
                  {geoLocation.city}, {geoLocation.country}
                </>
              ) : (
                ""
              )}
            </Text>
            <MaterialIcons name="keyboard-arrow-down" size={26} />
          </View>
        </View>
        <View
          style={{
            backgroundColor: theme.colors.border,
            opacity: 0.7,
            padding: 6,
            borderRadius: 50,
          }}
        >
          <MaterialCommunityIcons
            name="bell"
            size={26}
            color={theme.colors.text}
          />
        </View>
      </View>

      <View
        style={{
          marginTop: 16,
          flexDirection: "row",
          gap: 10,
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <TextInput
          placeholder="Search"
          style={{
            flex: 1,
            padding: 5,
            borderRadius: 10,
            borderWidth: 1,
            height: 45,
            borderColor: theme.colors.border,
          }}
        />
        <View
          style={{
            borderRadius: 10,
            backgroundColor: theme.colors.primary,
            width: 35,
            height: 35,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <MaterialCommunityIcons name="filter" size={30} color="white" />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default HomeHeader;
