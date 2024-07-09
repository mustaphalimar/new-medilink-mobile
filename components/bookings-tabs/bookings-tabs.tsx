import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { BookingsStackScreenProps } from "../../navigators/private-stack";
import CustomSegmentedControl from "./CustomSegmentedControl";
import Completed from "./tabs/completed";
import Scheduled from "./tabs/scheduled";
import Upcoming from "./tabs/upcoming";

const BookingTabs: React.FC<BookingsStackScreenProps<"BookingsScreen">> = ({
  navigation,
  route,
}) => {
  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  const handleTabPress = (index: number) => {
    setSelectedIndex(index);
  };

  return (
    <View style={styles.container}>
      <CustomSegmentedControl
        tabs={["Upcoming", "Scheduled", "Completed"]}
        onTabPress={handleTabPress}
      />
      <View style={styles.content}>
        {selectedIndex === 0 && (
          <Upcoming navigation={navigation} route={route} />
        )}
        {selectedIndex === 1 && <Scheduled />}
        {selectedIndex === 2 && (
          <Completed navigation={navigation} route={route} />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    alignItems: "center",
  },
  content: {
    width: "100%",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
});

export default BookingTabs;
