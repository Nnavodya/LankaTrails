import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Alert,
  FlatList,
  Image,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Colors } from "../../constants/colors";
import { useFavorites } from "../../contexts/FavoritesContext";
import { attractions } from "../../data/attractions";

export default function FavoritesScreen() {
  const router = useRouter();
  const { favorites, toggleFavorite } = useFavorites();
  const [refreshing, setRefreshing] = useState(false);

  const favoriteAttractions = attractions
    .filter((a) => favorites.includes(a.id))
    .sort((a, b) => a.name.localeCompare(b.name));

  const onRefresh = async () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 500);
  };

  const confirmRemove = (id: string) => {
    Alert.alert(
      "Remove Favorite",
      "Do you want to remove this attraction from favorites?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Remove",
          style: "destructive",
          onPress: () => toggleFavorite(id),
        },
      ],
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>
          ❤️ My Favorites ({favoriteAttractions.length})
        </Text>
      </View>

      {favoriteAttractions.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyIcon}>🤍</Text>
          <Text style={styles.emptyTitle}>No Favorites Yet</Text>
          <Text style={styles.emptyDesc}>
            Save attractions to access them quickly later.
          </Text>
          <TouchableOpacity
            style={styles.exploreBtn}
            onPress={() => router.push("/attractions" as any)}
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
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
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
                    onPress={() => confirmRemove(item.id)}
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
  },
  headerTitle: { fontSize: 22, fontWeight: "bold", color: Colors.white },
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
