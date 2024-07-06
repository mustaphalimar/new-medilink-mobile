import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import CustomSegmentedControl from "./CustomSegmentedControl";
import Upcoming from "./tabs/upcoming";
import Scheduled from "./tabs/scheduled";
import Completed from "./tabs/completed";

const BookingTabs: React.FC = () => {
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
        {selectedIndex === 0 && <Upcoming />}
        {selectedIndex === 1 && <Scheduled />}
        {selectedIndex === 2 && <Completed />}
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
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default BookingTabs;
