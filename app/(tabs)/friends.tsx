import { useState, useCallback, useMemo } from "react"
import {
    StyleSheet,
    TextInput,
    TouchableOpacity,
    Image,
    View,
    RefreshControl,
    ScrollView,
} from "react-native"
import { ThemedView } from "@/components/ThemedView"
import { ThemedText } from "@/components/ThemedText"
import { AntDesign, Feather } from "@expo/vector-icons"
import ParallaxScrollView from "@/components/ParallaxScrollView"

// Type definition
interface Friend {
    id: string
    name: string
    profilePic: string
    watchlists: string[]
    friendCount: number
    lastActive?: string
}

export default function FriendsPage() {
    const [friends] = useState<Friend[]>([
        {
            id: "1",
            name: "Alice",
            profilePic: "https://randomuser.me/api/portraits/women/65.jpg",
            watchlists: ["Sci-fi Nights", "Weekend Binges"],
            friendCount: 10,
            lastActive: "2 hours ago",
        },
        {
            id: "2",
            name: "Bob",
            profilePic: "https://randomuser.me/api/portraits/men/75.jpg",
            watchlists: ["Action Thrills", "Drama Feast"],
            friendCount: 8,
            lastActive: "Just now",
        },
        {
            id: "3",
            name: "Charlie",
            profilePic: "https://randomuser.me/api/portraits/men/35.jpg",
            watchlists: ["Comedies Forever"],
            friendCount: 5,
            lastActive: "Yesterday",
        },
        {
            id: "4",
            name: "Diana",
            profilePic: "https://randomuser.me/api/portraits/women/32.jpg",
            watchlists: ["True Crime", "Documentaries"],
            friendCount: 15,
            lastActive: "3 days ago",
        },
        {
            id: "5",
            name: "Ethan",
            profilePic: "https://randomuser.me/api/portraits/men/22.jpg",
            watchlists: ["Anime Collection", "Fantasy Series"],
            friendCount: 12,
            lastActive: "Online",
        },
    ])

    const [searchQuery, setSearchQuery] = useState<string>("")
    const [refreshing, setRefreshing] = useState(false)
    const [expandedFriend, setExpandedFriend] = useState<string | null>(null)

    const filteredFriends = useMemo(() => {
        if (!searchQuery.trim()) return friends
        return friends.filter(
            (friend) =>
                friend.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                friend.watchlists.some((list) => list.toLowerCase().includes(searchQuery.toLowerCase())),
        )
    }, [friends, searchQuery])

    const handleSearch = (query: string) => setSearchQuery(query)

    const onRefresh = useCallback(() => {
        setRefreshing(true)
        setTimeout(() => setRefreshing(false), 1500)
    }, [])

    const toggleExpand = (id: string) => {
        setExpandedFriend(expandedFriend === id ? null : id)
    }

    return (
        <ParallaxScrollView
        >
            <View style={styles.searchContainer}>
                <AntDesign name="search1" size={20} color="#888" style={styles.searchIcon} />
                <TextInput
                    style={styles.searchInput}
                    placeholder="Search friends..."
                    placeholderTextColor="#888"
                    value={searchQuery}
                    onChangeText={handleSearch}
                />
            </View>

            <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
                {filteredFriends.map((item) => (
                    <TouchableOpacity key={item.id} onPress={() => toggleExpand(item.id)} activeOpacity={0.8}>
                        <View style={[styles.friendCard, expandedFriend === item.id && styles.expandedCard]}>
                            <Image source={{ uri: item.profilePic }} style={styles.profilePic} />
                            <View style={styles.friendDetails}>
                                <ThemedText style={styles.friendName}>{item.name}</ThemedText>
                                <ThemedText style={styles.friendStatus}>{item.lastActive}</ThemedText>
                                <ThemedText style={styles.friendWatchlists}>
                                    {item.watchlists.join(", ")}
                                </ThemedText>
                            </View>
                            <TouchableOpacity style={styles.moreButton} onPress={() => toggleExpand(item.id)}>
                                <Feather name={expandedFriend === item.id ? "chevron-up" : "chevron-down"} size={20} color="#444" />
                            </TouchableOpacity>
                        </View>

                        {expandedFriend === item.id && (
                            <View style={styles.expandedOptions}>
                                <TouchableOpacity style={styles.optionButton}>
                                    <ThemedText>Add to Watchlist</ThemedText>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.optionButton}>
                                    <ThemedText>Start New Watchlist</ThemedText>
                                </TouchableOpacity>
                            </View>
                        )}
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </ParallaxScrollView>
    )
}

const styles = StyleSheet.create({
    headerImage: {
        width: "100%",
        height: 250,
    },
    searchContainer: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#fff",
        borderRadius: 10,
        paddingHorizontal: 15,
        marginBottom: 10,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 2,
    },
    searchIcon: {
        marginRight: 10,
    },
    searchInput: {
        flex: 1,
        height: 40,
        fontSize: 16,
        color: "#333",
    },
    friendCard: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#fff",
        padding: 15,
        marginVertical: 5,
        borderRadius: 10,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 2,
    },
    expandedCard: {
        backgroundColor: "#f0f0f0",
    },
    profilePic: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 15,
    },
    friendDetails: {
        flex: 1,
    },
    friendName: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#333",
    },
    friendStatus: {
        fontSize: 14,
        color: "#666",
    },
    friendWatchlists: {
        fontSize: 14,
        color: "#888",
    },
    moreButton: {
        padding: 10,
    },
    expandedOptions: {
        backgroundColor: "#fff",
        borderRadius: 10,
        padding: 10,
        marginTop: 5,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 2,
    },
    optionButton: {
        padding: 10,
        borderRadius: 5,
        backgroundColor: "#ddd",
        marginBottom: 5,
        alignItems: "center",
    },
})
