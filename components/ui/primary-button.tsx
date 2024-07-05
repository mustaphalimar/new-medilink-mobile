import { useTheme } from "@react-navigation/native";
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  StyleProp,
  ViewStyle,
  TextStyle,
} from "react-native";

interface Props {
  onPress?: () => void;
  label: string;
  style?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
}

const PrimaryButton = ({ label, onPress, labelStyle, style }: Props) => {
  const theme = useTheme();

  return (
    <TouchableOpacity
      style={[
        {
          backgroundColor: theme.colors.primary,
          paddingHorizontal: 32,
          height: 52,
          borderRadius: 12,
          alignItems: "center",
          justifyContent: "center",
        },
        style,
      ]}
      onPress={onPress}
    >
      <Text
        style={[
          {
            fontSize: 16,
            fontWeight: "600",
            color: "white",
          },
          labelStyle,
        ]}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({});

export default PrimaryButton;
