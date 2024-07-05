import { StyleSheet, Text, View } from "react-native";
import PrivateStack from "./private-stack";
import PublicStack from "./public-stack";
import LoadingScreen from "../components/loading";
import { useUser } from "../hooks/use-user";

const RootNavigator = () => {
  const user = useUser();

  console.log("USER : ", user.user);

  return user.user ? <PrivateStack /> : <PublicStack />;
};
export default RootNavigator;
const styles = StyleSheet.create({});
