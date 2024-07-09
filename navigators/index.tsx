import { StyleSheet } from "react-native";
import { useUser } from "../hooks/use-user";
import PrivateStack from "./private-stack";
import PublicStack from "./public-stack";

const RootNavigator = () => {
  const user = useUser();

  console.log("USER : ", user.user);

  return user.user ? <PrivateStack /> : <PublicStack />;
};
export default RootNavigator;
const styles = StyleSheet.create({});
