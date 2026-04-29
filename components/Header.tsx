import { View, Text, TouchableOpacity, Animated } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { useRef, useEffect } from "react"
import { Ionicons } from '@expo/vector-icons';


export const Header = () => {
    const insets = useSafeAreaInsets();
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const translateAnim = useRef(new Animated.Value(-100)).current;
    const fadeIn = () => {
        Animated.timing(
            fadeAnim,
            {
                toValue: 1,
                duration: 800,
                useNativeDriver: true,
            }
        ).start();
    }

    const translate = () => {
        Animated.spring(
            translateAnim,
            {
                toValue: 0,
                // friction: 4,
                useNativeDriver: true,
            }
        ).start();
    }



    useEffect(() => {
        fadeIn();
        translate();
    }, [])
    return (
        <Animated.View style={{
            paddingTop: insets.top + 16,
            backgroundColor: 'black',
            opacity: fadeAnim,
            padding: 16,
            display: 'flex',
            width: '100%',
            borderBottomLeftRadius: 20,
            borderBottomRightRadius: 20,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            transform: [{ translateY: translateAnim }]
        }}>
            <Text style={{ color: 'white', fontSize: 24 }}>Training App</Text>
            <TouchableOpacity
                style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    padding: 10,
                    borderRadius: 12,
                }}>
                <Ionicons name="settings-outline" size={24} color="white" />
            </TouchableOpacity>

        </Animated.View>
    )
}