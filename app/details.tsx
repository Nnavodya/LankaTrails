import * as Linking from "expo-linking";
import * as Location from "expo-location";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Colors } from "../constants/colors";
import { useFavorites } from "../contexts/FavoritesContext";
import { attractions } from "../data/attractions";

export default function DetailsScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { isFavorite: checkIsFavorite, toggleFavorite } = useFavorites();
  const [distance, setDistance] = useState<string | null>(null);
  const [locationLoading, setLocationLoading] = useState(false);

  const attraction = attractions.find((a) => a.id === id);
  const isFavorite = attraction ? checkIsFavorite(attraction.id) : false;

  const openMaps = () => {
    if (!attraction) return;
    const url = `https://www.google.com/maps/search/?api=1&query=${attraction.latitude},${attraction.longitude}`;
    Linking.openURL(url);
  };

  const calculateDistance = async () => {
    try {
      setLocationLoading(true);
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        alert("Location permission denied!");
        return;
      }
      const location = await Location.getCurrentPositionAsync({});
      const userLat = location.coords.latitude;
      const userLng = location.coords.longitude;

      const R = 6371;
      const dLat = ((attraction!.latitude - userLat) * Math.PI) / 180;
      const dLng = ((attraction!.longitude - userLng) * Math.PI) / 180;
      const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos((userLat * Math.PI) / 180) *
          Math.cos((attraction!.latitude * Math.PI) / 180) *
          Math.sin(dLng / 2) *
          Math.sin(dLng / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      const dist = R * c;
      setDistance(dist.toFixed(1));
    } catch (e) {
      alert("Could not get location!");
    } finally {
      setLocationLoading(false);
    }
  };

  if (!attraction) {
    return (
      <View style={styles.container}>
        <Text>Attraction not found!</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Image
        source={
          typeof attraction.image === "string"
            ? { uri: attraction.image }
            : attraction.image
        }
        style={styles.image}
      />

      <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
        <Text style={styles.backText}>← Back</Text>
      </TouchableOpacity>

      <View style={styles.content}>
        <View style={styles.titleRow}>
          <Text style={styles.name}>{attraction.name}</Text>
          <TouchableOpacity
            onPress={() => toggleFavorite(attraction.id)}
            style={styles.favBtn}
          >
            <Text style={styles.favIcon}>{isFavorite ? "❤️" : "🤍"}</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.rating}>⭐ {attraction.rating}</Text>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{attraction.category}</Text>
          </View>
        </View>

        <Text style={styles.location}>📍 {attraction.location}</Text>

        <Text style={styles.sectionTitle}>About</Text>
        <Text style={styles.description}>{attraction.description}</Text>

        <TouchableOpacity style={styles.navigateBtn} onPress={openMaps}>
          <Text style={styles.navigateBtnText}>
            🗺️ Navigate with Google Maps
          </Text>
        </TouchableOpacity>

        {/* Distance Calculator */}
        <TouchableOpacity
          style={styles.distanceBtn}
          onPress={calculateDistance}
          disabled={locationLoading}
        >
          {locationLoading ? (
            <ActivityIndicator color={Colors.white} size="small" />
          ) : (
            <Text style={styles.distanceBtnText}>
              📍 Calculate Distance from Me
            </Text>
          )}
        </TouchableOpacity>

        {distance && (
          <View style={styles.distanceResult}>
            <Text style={styles.distanceResultText}>
              🗺️ You are {distance} km away
            </Text>
          </View>
        )}

        <TouchableOpacity
          style={[styles.favoriteBtn, isFavorite && styles.favoriteBtnActive]}
          onPress={() => toggleFavorite(attraction.id)}
        >
          <Text
            style={[
              styles.favoriteBtnText,
              isFavorite && styles.favoriteBtnTextActive,
            ]}
          >
            {isFavorite ? "❤️ Remove from Favorites" : "🤍 Add to Favorites"}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  image: {
    width: "100%",
    height: 280,
    backgroundColor: Colors.lightGray,
  },
  backBtn: {
    position: "absolute",
    top: 50,
    left: 16,
    backgroundColor: "rgba(0,0,0,0.5)",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
  },
  backText: {
    color: Colors.white,
    fontWeight: "bold",
  },
  content: {
    padding: 20,
  },
  titleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  name: {
    fontSize: 22,
    fontWeight: "bold",
    color: Colors.dark,
    flex: 1,
  },
  favBtn: {
    padding: 8,
  },
  favIcon: {
    fontSize: 28,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
    gap: 12,
  },
  rating: {
    fontSize: 16,
    color: Colors.secondary,
    fontWeight: "bold",
  },
  badge: {
    backgroundColor: Colors.lightGray,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: "600",
    color: Colors.dark,
  },
  location: {
    fontSize: 14,
    color: Colors.gray,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.dark,
    marginBottom: 8,
  },
  description: {
    fontSize: 15,
    color: Colors.gray,
    lineHeight: 24,
    marginBottom: 24,
  },
  navigateBtn: {
    backgroundColor: Colors.primary,
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 12,
    elevation: 2,
  },
  navigateBtnText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: "bold",
  },
  distanceBtn: {
    backgroundColor: Colors.secondary,
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 12,
    elevation: 2,
  },
  distanceBtnText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: "bold",
  },
  distanceResult: {
    backgroundColor: Colors.lightGray,
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 12,
  },
  distanceResultText: {
    fontSize: 15,
    fontWeight: "bold",
    color: Colors.dark,
  },
  favoriteBtn: {
    backgroundColor: Colors.white,
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    borderWidth: 2,
    borderColor: Colors.danger,
    marginBottom: 32,
    elevation: 2,
  },
  favoriteBtnActive: {
    backgroundColor: Colors.danger,
  },
  favoriteBtnText: {
    color: Colors.danger,
    fontSize: 16,
    fontWeight: "bold",
  },
  favoriteBtnTextActive: {
    color: Colors.white,
  },
});
