import React from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { MarketCard } from "@/components/profile-components/MarketCard";
import { MARKETS } from "@/constants/data";

export default function SellerProfile() {
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: 100 }}
    >
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.settingsIcon}>
          <Ionicons name="settings-outline" size={26} color="#C05528" />
        </TouchableOpacity>
        <Image
          source={{ uri: "https://randomuser.me/api/portraits/women/66.jpg" }}
          style={styles.profileImage}
        />
        <Text style={styles.name}>Albertina Magalhães</Text>
        <View style={styles.locationContainer}>
          <Ionicons name="location-sharp" size={16} color="gray" />
          <Text style={styles.location}>Matosinhos</Text>
        </View>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Criar Anúncio +</Text>
        </TouchableOpacity>
      </View>

      {/* Markets */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Feiras Favoritas</Text>
        <FlatList
          horizontal
          data={MARKETS}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <MarketCard
              item={item}
              onPress={(market) => console.log("Clicked market:", market.title)}
            />
          )}
          contentContainerStyle={{ paddingHorizontal: 20 }}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  header: { alignItems: "center", padding: 20, paddingTop: 60 },
  settingsIcon: { position: "absolute", right: 20, top: 50 },
  profileImage: { width: 110, height: 110, borderRadius: 55, marginBottom: 15 },
  name: { fontSize: 24, fontWeight: "bold", color: "#333" },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },
  location: { color: "gray", marginLeft: 4, fontSize: 16 },
  button: {
    backgroundColor: "#C05528",
    paddingHorizontal: 25,
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 20,
  },
  buttonText: { color: "#fff", fontWeight: "bold" },
  section: { paddingLeft: 20, marginTop: 30 },
  sectionTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 15 },
});
