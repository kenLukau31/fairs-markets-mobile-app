import React from "react";
import {
  View,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  useColorScheme,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

// Import components
import { ProfileHeader } from "@/components/profile-components/ProfileHeader";
import { MarketCard } from "@/components/profile-components/MarketCard";
import { SellerCard } from "@/components/profile-components/SellerCard";
import { PrimaryButton } from "@/components/ui/PrimaryButton";

// Imports thematization
import { Colors } from "@/constants/theme";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";

import { MARKETS, SELLERS } from "@/constants/data";

const currentUser = SELLERS[0];

export default function ProfileScreen() {
  const isSeller = false;
  const colorScheme = useColorScheme() ?? "light";
  const currentColors = Colors[colorScheme];

  return (
    <ThemedView style={styles.container}>
      <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
        {/* Header Section */}
        <View
          style={[
            styles.headerSection,
            { backgroundColor: currentColors.background },
          ]}
        >
          {/* Icon Settings */}
          <TouchableOpacity
            style={styles.topRightIcon}
            onPress={() => console.log("Settings")}
          >
            <Ionicons
              name="settings-sharp"
              size={26}
              color={currentColors.tint}
            />
          </TouchableOpacity>

          {/* Profile Component */}
          <ProfileHeader user={currentUser} />

          {/* Button for sellers */}
          {isSeller && (
            <View style={{ marginTop: 10 }}>
              <PrimaryButton
                title="Criar Anúncio"
                iconName="add-sharp"
                onPress={() => console.log("Criar")}
              />
            </View>
          )}
        </View>

        {/* Markets */}
        <View style={styles.section}>
          <ThemedText type="subtitle" style={styles.sectionTitle}>
            Feiras Favoritas
          </ThemedText>

          <FlatList
            horizontal
            data={MARKETS}
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <MarketCard
                item={item}
                onPress={(market) => console.log("Ver feira:", market.title)}
              />
            )}
            contentContainerStyle={{ paddingHorizontal: 20 }}
          />
        </View>

        {/* Sellers */}
        <View style={styles.section}>
          <ThemedText type="subtitle" style={styles.sectionTitle}>
            Feirantes Favoritos
          </ThemedText>

          <FlatList
            horizontal
            data={SELLERS}
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={{ paddingHorizontal: 20 }}
            renderItem={({ item }) => (
              <SellerCard
                item={item}
                onPress={(seller) => console.log("Ver perfil de:", seller.name)}
              />
            )}
          />
        </View>

        {/* became a seller */}
        {!isSeller && (
          <View style={styles.becomeSellerContainer}>
            <View style={styles.divider} />

            <ThemedText type="subtitle" style={{ marginBottom: 10 }}>
              Queres tornar-te feirante?
            </ThemedText>

            <ThemedText style={{ marginBottom: 20 }}>
              Divulga os teus produtos e associa-te às feiras em que participas.
            </ThemedText>

          <Image      
              source={require("../../assets/markets/vegetables.png")} 
              style={{ width: "100%", height: 120, marginBottom: 20 }}
              resizeMode="contain"
            />

            <PrimaryButton
              title="Criar Perfil Público"
              onPress={() => console.log("Criar perfil")}
              style={{ width: "100%", marginBottom: 10 }}
            />

            {/* <PrimaryButton 
                    title="Ignorar" 
                    onPress={() => console.log("Ignorar")}
                    style={{ 
                        width: '100%', 
                        backgroundColor: currentColors.background, 
                        borderColor: '#E0E0E0' 
                    }}
                    textColor={Colors[colorScheme].text}
                /> */}
          </View>
        )}
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  headerSection: {
    paddingTop: 60,
    paddingBottom: 20,
    paddingHorizontal: 20,
    alignItems: "center",
    position: "relative",
  },

  topRightIcon: {
    position: "absolute",
    top: 50,
    right: 20,
    zIndex: 10,
  },

  section: {
    paddingLeft: 20,
    marginTop: 30,
  },

  sectionTitle: {
    marginBottom: 15,
  },

  becomeSellerContainer: {
    padding: 20,
    marginTop: 20,
  },
  divider: {
    height: 1,
    backgroundColor: "#E0E0E0",
    marginBottom: 30,
    width: "100%",
  },
  placeholderImage: {
    height: 100,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
    backgroundColor: "#f9f9f9",
    borderRadius: 10,
  },
});
