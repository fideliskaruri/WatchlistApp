import React from "react"
import { View, Text, TouchableOpacity, StyleSheet } from "react-native"
import { BottomTabBarProps } from "@react-navigation/bottom-tabs"

const CustomTabBar: React.FC<BottomTabBarProps> = ({ state, descriptors, navigation }) => {
    return (
        <View style={styles.container}>
            <View style={styles.tabBar}>
                {state.routes.map((route, index) => {
                    const { options } = descriptors[route.key]
                    const isFocused = state.index === index

                    const onPress = () => {
                        const event = navigation.emit({
                            type: "tabPress",
                            target: route.key,
                            canPreventDefault: true,
                        })
                        if (!isFocused && !event.defaultPrevented) {
                            navigation.navigate(route.name)
                        }
                    }

                    const onLongPress = () => {
                        navigation.emit({
                            type: "tabLongPress",
                            target: route.key,
                        })
                    }

                    return (
                        <TouchableOpacity
                            key={route.key}
                            onPress={onPress}
                            onLongPress={onLongPress}
                            style={styles.tab}
                        >
                            {/* Apply selected color */}
                            {options.tabBarIcon?.({ focused: isFocused, color: isFocused ? "#D8F000" : "#888", size: 24 })}
                            <Text style={{ color: isFocused ? "#D8F000" : "#888", fontSize: 12 }}>
                                {options.title}
                            </Text>
                        </TouchableOpacity>
                    )
                })}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        position: "absolute",
        bottom: 20, // Adjust height above the screen bottom
        left: 20,
        right: 20,
        alignItems: "center",
        borderColor: "#d8f000",
        borderWidth: 1,
        borderRadius: 25,
    },
    tabBar: {
        flexDirection: "row",
        backgroundColor: "#222", // Darker background
        borderRadius: 25, // Round the corners
        paddingVertical: 10,
        paddingHorizontal: 20,
        shadowColor: "#000",
        shadowOpacity: 0.2,
        shadowRadius: 10,
        elevation: 5, // Shadow for Android
        height: 60,
        alignItems: "center",
        justifyContent: "space-between",
    },
    tab: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
})

export default CustomTabBar
