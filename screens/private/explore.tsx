import { useTheme } from "@react-navigation/native";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
const ExploreScreen = () => {
  const theme = useTheme();
  return (
    <SafeAreaView>
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
        }}
      >
        <View
          style={{ backgroundColor: theme.colors.primary, borderRadius: 10 }}
        >
          <Text
            style={{
              fontSize: 60,
              fontWeight: "900",

              color: "white",
              padding: 4,
            }}
          >
            Coming
          </Text>
        </View>
        <Text
          style={{
            fontSize: 60,
            fontWeight: "900",
            color: theme.colors.primary,
          }}
        >
          Soon
        </Text>
      </View>
    </SafeAreaView>
  );
};
export default ExploreScreen;
const styles = StyleSheet.create({});
