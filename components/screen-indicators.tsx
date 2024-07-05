import { useTheme } from "@react-navigation/native";
import { StyleSheet, View } from "react-native";

const ScreenIndicators = ({
  count,
  activeIndex,
}: {
  count: number;
  activeIndex: number;
}) => {
  const theme = useTheme();

  return (
    <View style={styles.container}>
      {new Array(count).fill("1").map((_, i) => (
        <View
          key={i}
          style={{
            ...styles.progressDot,
            backgroundColor:
              i === activeIndex ? theme.colors.primary : theme.colors.border,
          }}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 32,
    gap: 8,
  },
  progressDot: {
    width: 8,
    height: 8,
    borderRadius: 8,
  },
});

export default ScreenIndicators;
