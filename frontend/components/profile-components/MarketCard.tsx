import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export interface MarketItemData {
  id: number;
  title: string;
  schedule: string;
  address: string;
  image: string;
}
interface MarketCardProps {
  item: MarketItemData;
  onPress?: (item: MarketItemData) => void;
}

export function MarketCard({ item, onPress }: MarketCardProps) {
  return (
    <TouchableOpacity
      style={styles.cardContainer}
      activeOpacity={0.8}
      onPress={() => onPress && onPress(item)}
    >
      <Image source={{ uri: item.image }} style={styles.cardImage} />
      <View style={styles.cardInfo}>
        <Text style={styles.cardTitle} numberOfLines={1}>
          {item.title}
        </Text>
        <Text style={styles.cardSchedule}>{item.schedule}</Text>
        <View style={styles.addressRow}>
          <Ionicons name="location-sharp" size={12} color="gray" />
          <Text style={styles.cardAddress} numberOfLines={1}>
            {item.address}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

// Styles
const styles = StyleSheet.create({
  cardContainer: {
    width: 200, // Largura fixa do cartão
    marginRight: 15,
    borderRadius: 12,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 10,
  },
  cardImage: {
    width: "100%",
    height: 110,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    backgroundColor: "#f0f0f0",
  },
  cardInfo: {
    padding: 12,
  },
  cardTitle: {
    fontWeight: "bold",
    fontSize: 15,
    color: "#000000",
    marginBottom: 4,
  },
  cardSchedule: {
    fontSize: 12,
    color: "#C64F23",
    fontWeight: "600",
    marginBottom: 4,
  },
  addressRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  cardAddress: {
    fontSize: 11,
    color: "#666",
    marginLeft: 2,
  },
});
