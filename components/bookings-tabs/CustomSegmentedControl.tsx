import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

interface CustomSegmentedControlProps {
  tabs: string[];
  onTabPress: (index: number) => void;
}

const CustomSegmentedControl: React.FC<CustomSegmentedControlProps> = ({
  tabs,
  onTabPress,
}) => {
  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  const handleTabPress = (index: number) => {
    setSelectedIndex(index);
    onTabPress(index);
  };

  return (
    <View style={styles.container}>
      <View style={styles.segmentedControl}>
        {tabs.map((tab, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.tab, selectedIndex === index && styles.activeTab]}
            onPress={() => handleTabPress(index)}
          >
            <Text
              style={[
                styles.tabText,
                selectedIndex === index && styles.activeTabText,
              ]}
            >
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  segmentedControl: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#f1f1f1",
    borderRadius: 5,
    padding: 5,
  },
  tab: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  activeTab: {
    // backgroundColor: "#007AFF",
    borderBottomWidth: 2,
    borderBottomColor: "#007AFF",
  },
  tabText: {
    fontSize: 16,
  },
  activeTabText: {
    color: "#007AFF",
  },
});

export default CustomSegmentedControl;
