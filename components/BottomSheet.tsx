import { Animated, Dimensions, Text, View, TouchableWithoutFeedback, StyleSheet } from "react-native"
import { useRef, useEffect } from "react"

const { height } = Dimensions.get('window');

export const BottomSheet = ({ visible, onClose, children }: { visible: boolean, onClose?: () => void, children: React.ReactNode }) => {
    const translateY = useRef(new Animated.Value(height)).current;
    const opacity = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.parallel([
            Animated.spring(translateY, {
                toValue: visible ? 0 : height,
                // duration: 300,
                useNativeDriver: true,
                friction: 9,
            }),
            Animated.spring(opacity, {
                toValue: visible ? 1 : 0,
                // duration: 300,
                useNativeDriver: true,
                friction: 9,
            })
        ]).start();
    }, [visible]);



    return (
        <View style={StyleSheet.absoluteFill} pointerEvents={visible ? 'auto' : 'none'}>
            <TouchableWithoutFeedback onPress={onClose}>
                <Animated.View style={[styles.backdrop, { opacity: opacity }]} />
            </TouchableWithoutFeedback>
            <Animated.View style={[styles.sheet, { transform: [{ translateY: translateY }] }]}>
                <View style={styles.content}>
                    <View style={styles.handle} />
                    {children}
                </View>
            </Animated.View>
        </View>
    )
}

const styles = StyleSheet.create({
    backdrop: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0,0,0,0.6)',

    },
    sheet: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: height * 0.8,
        backgroundColor: 'white',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -10 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 20,
    },
    content: {
        flex: 1,
        alignItems: 'center',
    },
    handle: {
        width: 40,
        height: 5,
        backgroundColor: '#E0E0E0',
        borderRadius: 3,
        marginBottom: 20,
    },
    title: {
        fontSize: 22,
        fontWeight: '700',
        color: '#333',
    }
});