import { StyleSheet, Text, View } from "react-native";
import { Colors } from "../constants/colors";

export default function Footer() {
  return (
    <View style={styles.footer}>
      <Text style={styles.footerText}>© 2026 LankaTrails</Text>
      <Text style={styles.footerSubText}>Discover Sri Lanka</Text>
      <Text style={styles.footerCopy}>
        © 2026 LankaTrails. All rights reserved.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    backgroundColor: Colors.tabBar,
    padding: 24,
    alignItems: "center",
  },
  footerText: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.white,
    marginBottom: 4,
  },
  footerSubText: {
    fontSize: 13,
    color: "#A8D5B5",
    marginBottom: 8,
  },
  footerCopy: {
    fontSize: 11,
    color: Colors.gray,
  },
});
