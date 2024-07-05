import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useUser } from "../../hooks/use-user";

const ProfileScreen = () => {
  const user = useUser();

  return (
    <SafeAreaView>
      {user.user && <Text>Email : {user.user.email}</Text>}
    </SafeAreaView>
  );
};
export default ProfileScreen;
const styles = StyleSheet.create({});
