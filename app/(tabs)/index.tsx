import { useState } from "react"
import {
  View,
  TouchableOpacity,
  FlatList,
  Text,
  StyleSheet,
} from "react-native"
import Animated from "react-native-reanimated"

import ParallaxScrollView from "@/components/ParallaxScrollView"
import { ThemedText } from "@/components/ThemedText"
import { ThemedView } from "@/components/ThemedView"

const watchlistsData = {
  mine: [
    { id: "1", name: "Sci-fi Nights", movies: 12 },
    { id: "2", name: "Weekend Binges", movies: 8 },
    { id: "3", name: "Action Thrills", movies: 15 },
  ],
  friends: [
    { id: "4", name: "Bob's Comedy Picks", movies: 10 },
    { id: "5", name: "Charlie's Top Hits", movies: 7 },
    { id: "6", name: "Diana's True Crime", movies: 9 },
  ],
}

export default function HomeScreen() {
  const [activeTab, setActiveTab] = useState<"mine" | "friends">("mine")

  return (
    <ParallaxScrollView >
        <View style={styles.tabContainer}>
          {["mine", "friends"].map((tab) => (
            <TouchableOpacity
              key={tab}
              style={[
                styles.tabButton,
                activeTab === tab && styles.activeTabButton,
              ]}
              onPress={() => setActiveTab(tab as "mine" | "friends")}
            >
              <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>
                {tab === "mine" ? "My Watchlists" : "Friends' Watchlists"}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      <FlatList
        data={watchlistsData[activeTab]}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 16 }}
        renderItem={({ item }) => (
          <ThemedView style={styles.watchlistCard}>
            <ThemedText type="subtitle">{item.name}</ThemedText>
            <ThemedText type="default">{item.movies} Movies</ThemedText>
          </ThemedView>
        )}
      />
    </ParallaxScrollView>
  )
}

const styles = StyleSheet.create({
  tabContainer: {
    flexDirection: "row",
    
    justifyContent: "center",
    gap: 10,
  },
  tabButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    backgroundColor: "#444",
  },
  activeTabButton: {
    backgroundColor: "#D8F000",
  },
  tabText: {
    fontSize: 16,
    color: "#fff",
  },
  activeTabText: {
    color: "#222",
    fontWeight: "bold",
  },
  watchlistCard: {
    backgroundColor: "#333",
    padding: 15,
    borderRadius: 10,
    marginVertical: 5,
  },
})
