import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const IoniconButton = ({
  onPress,
  name,
  size = 32,
  activeOpacity = 0.75,
}: {
  onPress: () => void;
  name: keyof typeof Ionicons.glyphMap;
  size?: number;
  activeOpacity?: number;
}) => {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={activeOpacity}>
      <Ionicons name={name} size={size} color="black" />
    </TouchableOpacity>
  );
};

export default IoniconButton;

const styles = StyleSheet.create({});
