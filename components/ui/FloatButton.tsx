import React, { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Animated, Easing, Dimensions } from 'react-native';
import { AntDesign, MaterialIcons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

type ActionButtonProps = {
    icon: string;
    label: string;
    onPress: () => void;
    iconType?: 'AntDesign' | 'MaterialIcons';
    backgroundColor?: string;
};

type ExpandableFloatingButtonProps = {
    actions: ActionButtonProps[];
    mainButtonColor?: string;
};

const ExpandableFloatingButton: React.FC<ExpandableFloatingButtonProps> = ({
    actions,
    mainButtonColor = '#1890ff'
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const animation = useState(new Animated.Value(0))[0];
    const overlayAnimation = useState(new Animated.Value(0))[0];

    const toggleMenu = () => {
        const toValue = isOpen ? 0 : 1;

        Animated.parallel([
            Animated.timing(animation, {
                toValue,
                duration: 300,
                easing: Easing.bezier(0.4, 0, 0.2, 1),
                useNativeDriver: true
            }),
            Animated.timing(overlayAnimation, {
                toValue,
                duration: 300,
                easing: Easing.bezier(0.4, 0, 0.2, 1),
                useNativeDriver: false
            })
        ]).start();

        setIsOpen(!isOpen);
    };

    const renderActionButton = (action: ActionButtonProps, index: number) => {
        // Calculate positions to distribute buttons from center
        const totalActions = actions.length;
        const yOffset = height * 0.4; // Start from 40% up from bottom
        const spacing = (height * 0.5) / (totalActions + 1);
        const y = yOffset - spacing * (index + 1);

        const scaleInterpolation = animation.interpolate({
            inputRange: [0, 1],
            outputRange: [0.5, 1]
        });

        const opacityInterpolation = animation.interpolate({
            inputRange: [0, 0.5, 1],
            outputRange: [0, 0, 1]
        });

        return (
            <Animated.View
                key={action.label}
                style={[
                    styles.actionButton,
                    {
                        top: y,
                        transform: [{ scale: scaleInterpolation }],
                        opacity: opacityInterpolation
                    }
                ]}
            >
                <View style={styles.actionButtonContainer}>
                    <Text style={styles.label}>{action.label}</Text>
                    <TouchableOpacity
                        style={[
                            styles.actionButtonInner,
                            { backgroundColor: action.backgroundColor || '#3498db' }
                        ]}
                        onPress={() => {
                            action.onPress();
                            toggleMenu();
                        }}
                    >
                        {action.iconType === 'MaterialIcons' ? (
                            <MaterialIcons name={action.icon as keyof typeof MaterialIcons.glyphMap} size={24} color="white" />
                        ) : (
                            <AntDesign name={action.icon as keyof typeof AntDesign.glyphMap} size={24} color="white" />
                        )}
                    </TouchableOpacity>

                </View>
            </Animated.View>
        );
    };

    const overlayOpacity = overlayAnimation.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 0.7]
    });

    return (
        <>
            {/* Overlay that covers the screen when menu is open */}
            <Animated.View
                style={[
                    styles.overlay,
                    {
                        opacity: overlayOpacity,
                        pointerEvents: isOpen ? 'auto' : 'none'
                    }
                ]}
                pointerEvents={isOpen ? 'auto' : 'none'}
            >
                <TouchableOpacity
                    style={styles.overlayTouchable}
                    onPress={isOpen ? toggleMenu : undefined}
                    activeOpacity={1}
                />
            </Animated.View>

            {/* Action buttons container */}
            <View style={styles.container}>
                {isOpen && actions.map((action, index) => renderActionButton(action, index))}

                <TouchableOpacity
                    style={[styles.mainButton, { backgroundColor: mainButtonColor }]}
                    onPress={toggleMenu}
                >
                    <Animated.View
                        style={{
                            transform: [
                                {
                                    rotate: animation.interpolate({
                                        inputRange: [0, 1],
                                        outputRange: ['0deg', '45deg']
                                    })
                                }
                            ]
                        }}
                    >
                        <AntDesign name="plus" size={24} color="grey" />
                    </Animated.View>
                </TouchableOpacity>
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'black',
        zIndex: 1
    },
    overlayTouchable: {
        width: '100%',
        height: '100%'
    },
    container: {
        position: 'absolute',
        alignItems: 'center',
        bottom: 120,
        right: 24,
        zIndex: 2
    },
    mainButton: {
        width: 56,
        height: 56,
        borderRadius: 28,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        zIndex: 3
    },
    actionButton: {
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        width: 200,
        zIndex: 3,
    },
    actionButtonContainer: {
        bottom: 300,
        gap: 16,
        right: 50,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        width: 150,
        zIndex: 3,
    },
    actionButtonInner: {
        width: 48,
        height: 48,
        borderRadius: 28,
        backgroundColor: '#3498db',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 2.5,
        elevation: 3
    },
    labelContainer: {
        // marginLeft: 16,
        backgroundColor: 'transparent',
        zIndex: 2
    },
    label: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600'
    }
});

export default ExpandableFloatingButton;