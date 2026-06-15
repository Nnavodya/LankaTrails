import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect, useRouter } from "expo-router";
import { useCallback, useState } from "react";
import {
  FlatList,
  Image,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { Colors } from "../../constants/colors";
import { attractions } from "../../data/attractions";

interface Attraction {
  id: string;
  name: string;
  image: any;
  location: string;
  category: string;
  rating: number;
  description: string;
  latitude: number;
  longitude: number;
}

export default function FavoritesScreen() {
  const router = useRouter();
  const [favoriteAttractions, setFavoriteAttractions] = useState<Attraction[]>(
    [],
  );

  useFocusEffect(
    useCallback(() => {
      loadFavorites();
    }, []),
  );
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    await loadFavorites();
    setRefreshing(false);
  };

  const loadFavorites = async () => {
    try {
      const saved = await AsyncStorage.getItem("favorites");
      if (saved) {
        const favIds = JSON.parse(saved);
        const favList = attractions.filter((a) => favIds.includes(a.id));
        setFavoriteAttractions(favList as Attraction[]);
      } else {
        setFavoriteAttractions([]);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const removeFavorite = async (id: string) => {
    try {
      const saved = await AsyncStorage.getItem("favorites");
      let favs = saved ? JSON.parse(saved) : [];
      favs = favs.filter((f: string) => f !== id);
      await AsyncStorage.setItem("favorites", JSON.stringify(favs));
      setFavoriteAttractions((prev) => prev.filter((a) => a.id !== id));
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>❤️ My Favorites</Text>
      </View>

      {favoriteAttractions.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyIcon}>🤍</Text>
          <Text style={styles.emptyTitle}>No Favorites Yet</Text>
          <Text style={styles.emptyDesc}>
            Explore attractions and tap the heart to save your favorites!
          </Text>
          <TouchableOpacity
            style={styles.exploreBtn}
            onPress={() => router.push("/attractions")}
          >
            <Text style={styles.exploreBtnText}>Explore Attractions →</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={favoriteAttractions}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={loadFavorites} />
          }
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.card}
              onPress={() =>
                router.push({ pathname: "/details", params: { id: item.id } })
              }
            >
              <Image
                source={
                  typeof item.image === "string"
                    ? { uri: item.image }
                    : item.image
                }
                style={styles.cardImage}
              />
              <View style={styles.cardContent}>
                <View style={styles.cardHeader}>
                  <Text style={styles.cardName}>{item.name}</Text>
                  <TouchableOpacity
                    onPress={() => removeFavorite(item.id)}
                    style={styles.removeBtn}
                  >
                    <Text style={styles.removeIcon}>❤️</Text>
                  </TouchableOpacity>
                </View>
                <Text style={styles.cardLocation}>📍 {item.location}</Text>
                <View style={styles.categoryBadge}>
                  <Text style={styles.categoryBadgeText}>{item.category}</Text>
                </View>
              </View>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  header: {
    backgroundColor: Colors.tabBar,
    paddingTop: 50,
    paddingBottom: 16,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
  },
  backBtn: { marginRight: 12 },
  backText: { color: Colors.white, fontSize: 16 },
  headerTitle: { fontSize: 20, fontWeight: "bold", color: Colors.white },
  emptyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 32,
  },
  emptyIcon: { fontSize: 64, marginBottom: 16 },
  emptyTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: Colors.dark,
    marginBottom: 8,
  },
  emptyDesc: {
    fontSize: 14,
    color: Colors.gray,
    textAlign: "center",
    lineHeight: 22,
    marginBottom: 24,
  },
  exploreBtn: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 12,
    elevation: 2,
  },
  exploreBtnText: { color: Colors.white, fontWeight: "bold", fontSize: 16 },
  listContainer: { padding: 16 },
  card: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    marginBottom: 16,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    overflow: "hidden",
  },
  cardImage: { width: "100%", height: 160, backgroundColor: Colors.lightGray },
  cardContent: { padding: 14 },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  cardName: { fontSize: 16, fontWeight: "bold", color: Colors.dark, flex: 1 },
  removeBtn: { padding: 4 },
  removeIcon: { fontSize: 22 },
  cardLocation: { fontSize: 13, color: Colors.gray, marginBottom: 6 },
  categoryBadge: {
    backgroundColor: Colors.lightGray,
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 10,
    alignSelf: "flex-start",
  },
  categoryBadgeText: { fontSize: 11, color: Colors.dark, fontWeight: "600" },
});
