import { useState, useCallback, useMemo } from "react"
import {
    StyleSheet,
    TextInput,
    View,
    RefreshControl,
    ScrollView,
} from "react-native"
import { AntDesign } from "@expo/vector-icons"
import CustomScrollView from "@/components/CustomScrollView"
import FriendsCard from "@/components/FriendsCard"

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
        {
            id: "6",
            name: "Ethan",
            profilePic: "https://randomuser.me/api/portraits/men/22.jpg",
            watchlists: ["Anime Collection", "Fantasy Series"],
            friendCount: 12,
            lastActive: "Online",
        },
    ])

    const [searchQuery, setSearchQuery] = useState<string>("")
    const [refreshing, setRefreshing] = useState(false)

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



    return (
        <>
            <View style={styles.container}>
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
            </View>

            <CustomScrollView
            >
                <ScrollView style={styles.friendsContainer} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>

                    <FriendsCard filteredFriends={filteredFriends} />
                </ScrollView>
            </CustomScrollView>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        backgroundColor: "#151718",
        height: "15%"
    },
    searchContainer: {
        position: "absolute",
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
        top: 60,
        width: "90%",
        alignSelf: "center",
        zIndex: 2,
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
    friendsContainer: {
        marginTop: -40,
        paddingBottom: 50,

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
