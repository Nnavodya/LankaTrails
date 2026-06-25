import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

interface FavoritesContextType {
  favorites: string[];
  toggleFavorite: (id: string) => Promise<void>;
  isFavorite: (id: string) => boolean;
  loading: boolean;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(
  undefined,
);

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadFavorites();
  }, []);

  const loadFavorites = async () => {
    try {
      const saved = await AsyncStorage.getItem("favorites");
      if (saved) {
        setFavorites(JSON.parse(saved));
      }
    } catch (e) {
      console.log("Error loading favorites:", e);
    } finally {
      setLoading(false);
    }
  };

  const toggleFavorite = async (id: string) => {
    try {
      let updated: string[];
      if (favorites.includes(id)) {
        updated = favorites.filter((f) => f !== id);
      } else {
        updated = [...favorites, id];
      }
      setFavorites(updated);
      await AsyncStorage.setItem("favorites", JSON.stringify(updated));
    } catch (e) {
      console.log("Error toggling favorite:", e);
    }
  };

  const isFavorite = (id: string) => favorites.includes(id);

  return (
    <FavoritesContext.Provider
      value={{ favorites, toggleFavorite, isFavorite, loading }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error("useFavorites must be used within a FavoritesProvider");
  }
  return context;
}
