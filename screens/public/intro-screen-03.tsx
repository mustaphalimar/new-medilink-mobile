import Icons from "@expo/vector-icons/MaterialIcons";
import { useTheme } from "@react-navigation/native";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import Animated, { FadeInDown, FadeInUp } from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Artwork03 from "../../components/artworks/Artwork03";
import ScreenIndicators from "../../components/screen-indicators";
import PrimaryButton from "../../components/ui/primary-button";
import { PublicStackScreenProps } from "../../navigators/public-stack";
import { INTRO_SCREEN_03 } from "../../utils/contants";

const IntroScreen03 = ({
  navigation,
}: PublicStackScreenProps<"IntroScreen03">) => {
  const theme = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.card }]}>
      <View style={styles.backArrow}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icons name="arrow-back-ios" size={24} color={theme.colors.text} />
        </TouchableOpacity>
      </View>
      <Animated.View
        entering={FadeInUp.duration(1000).springify()}
        exiting={FadeInUp.duration(1000).springify()}
        style={{
          alignItems: "center",
          flex: 1,
          marginTop: useSafeAreaInsets().top + 150,
          justifyContent: "center",
        }}
      >
        <Artwork03 width={300} height={300} />
      </Animated.View>
      <View style={{ flex: 1 }} />

      <View style={{ padding: 24 }}>
        <Animated.Text
          entering={FadeInDown.duration(1000).springify()}
          style={styles.title}
        >
          {INTRO_SCREEN_03.title}
        </Animated.Text>
        <Animated.Text
          entering={FadeInDown.delay(100).springify()}
          style={styles.description}
        >
          {INTRO_SCREEN_03.description}
        </Animated.Text>

        <ScreenIndicators count={3} activeIndex={2} />

        <View style={styles.touchableWrapper}>
          <PrimaryButton
            onPress={() => navigation.navigate("LoginScreen")}
            label="Get Started"
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
    paddingVertical: 50,
  },
  title: {
    fontSize: 40,
    fontWeight: "800",
  },
  description: {
    color: "#333",
    marginTop: 16,
    fontSize: 16,
  },
  touchableWrapper: {
    alignItems: "center",
  },
  backArrow: {
    paddingHorizontal: 24,
    height: 52,
    alignItems: "center",
    flexDirection: "row",
  },
});

export default IntroScreen03;
