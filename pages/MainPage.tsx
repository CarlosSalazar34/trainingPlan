import {
    StyleSheet, Text, View, ScrollView, Dimensions,
    TouchableOpacity, Animated
} from 'react-native';
import { BottomSheet } from '../components/BottomSheet';
import { useRef, useEffect, useState } from 'react';
import { Header } from '../components/Header';
import { Ionicons } from '@expo/vector-icons';
import { BottomAppBar } from '../components/BottomAppBar';

interface TrainingData {
    trainingName: string;
    trainingDescription: string;
    muscleGroup: string;
    exercises: ExerciseData[];
}

interface ExerciseData {
    exerciseName: string;
    sets: number;
    reps: number;
    weight: number;
    rest: number;
}


export const MainPage = () => {
    const translateAnim = useRef(new Animated.Value(-100)).current;
    const [create, setCreate] = useState(false);
    const opacityAnim = useRef(new Animated.Value(0)).current;
    const cardsTranslateAnim = useRef(new Animated.Value(-30)).current;

    const animateCards = () => {
        Animated.parallel([
            Animated.timing(
                opacityAnim,
                {
                    duration: 600,
                    toValue: 1,
                    useNativeDriver: true,
                }
            ),
            Animated.spring(
                cardsTranslateAnim,
                {
                    toValue: 0,
                    friction: 6,
                    useNativeDriver: true,
                }
            )
        ]).start();
    }

    const trains: TrainingData[] = [
        {
            trainingName: 'Pecho y Tríceps',
            trainingDescription: 'Un entrenamiento intenso para desarrollar la fuerza y el tamaño de los músculos del pecho y los tríceps.',
            muscleGroup: 'Pecho y Tríceps',
            exercises: [
                {
                    exerciseName: 'Press de Banca',
                    sets: 3,
                    reps: 10,
                    weight: 100,
                    rest: 60,
                },
                {
                    exerciseName: 'Press Inclinado',
                    sets: 3,
                    reps: 10,
                    weight: 100,
                    rest: 60,
                },
                {
                    exerciseName: 'Fondos',
                    sets: 3,
                    reps: 10,
                    weight: 100,
                    rest: 60,
                },
            ],
        },
        {
            trainingName: 'Espalda y Bíceps',
            trainingDescription: 'Enfoque en amplitud y densidad de la espalda junto con trabajo directo de bíceps.',
            muscleGroup: 'Espalda y Bíceps',
            exercises: [
                { exerciseName: 'Dominadas', sets: 4, reps: 8, weight: 0, rest: 90 },
                { exerciseName: 'Remo con Barra', sets: 3, reps: 10, weight: 60, rest: 60 },
                { exerciseName: 'Curl con Barra Z', sets: 3, reps: 12, weight: 30, rest: 60 },
            ],
        },
        {
            trainingName: 'Piernas Completo',
            trainingDescription: 'Día pesado de tren inferior enfocado en fuerza y estabilidad.',
            muscleGroup: 'Piernas',
            exercises: [
                { exerciseName: 'Sentadillas con Barra', sets: 4, reps: 8, weight: 100, rest: 120 },
                { exerciseName: 'Prensa de Piernas', sets: 3, reps: 12, weight: 200, rest: 90 },
                { exerciseName: 'Peso Muerto Rumano', sets: 3, reps: 10, weight: 80, rest: 90 },
            ],
        },
    ]

    const translate = () => {
        Animated.spring(
            translateAnim,
            {
                toValue: 0,
                friction: 4,
                useNativeDriver: true,
            }
        ).start();
    }

    useEffect(() => {
        translate();
        animateCards();
    }, [])

    return (
        <View style={styles.container}>
            <Header />
            <ScrollView contentContainerStyle={{
                alignItems: 'center',
                paddingVertical: 16,
                paddingBottom: 100,
            }} style={{ flex: 1, width: '100%' }}>
                <Animated.View style={{
                    width: Dimensions.get('window').width * 0.92,
                    transform: [{ translateY: translateAnim }],
                    backgroundColor: 'black',
                    borderRadius: 24,
                    padding: 24,
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 10 },
                    shadowOpacity: 0.3,
                    shadowRadius: 20,
                    elevation: 10,
                }}>
                    <Ionicons name="fitness" size={48} color="#A7FF83" style={{ marginBottom: 20 }} />
                    <Text style={{
                        fontSize: 36,
                        color: 'white',
                        fontWeight: '600',
                        lineHeight: 42,
                    }}>Bienvenido, Carlos</Text>

                    <Text style={{
                        fontSize: 16,
                        marginTop: 12,
                        color: 'rgba(255, 255, 255, 0.6)',
                        fontWeight: '400',
                        lineHeight: 24,
                    }}>¿En qué consiste tu entrenamiento hoy?</Text>
                </Animated.View>

                <View style={{ marginTop: 24, width: '100%', alignItems: 'center' }}>
                    <TouchableOpacity
                        onPress={() => setCreate(true)}
                        style={{
                            width: Dimensions.get('window').width * 0.92,
                            height: 70,
                            borderRadius: 20,
                            backgroundColor: 'white',
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignItems: 'center',
                            elevation: 4,
                            shadowColor: '#000',
                            shadowOffset: { width: 0, height: 4 },
                            shadowOpacity: 0.1,
                            shadowRadius: 8,
                        }}
                    >
                        <Ionicons name="add-circle" size={28} color="black" style={{ marginRight: 12 }} />
                        <Text style={{ color: 'black', fontSize: 18, fontWeight: '600' }}>Crear nuevo entrenamiento</Text>
                    </TouchableOpacity>

                    {
                        trains.map((train, index) => {
                            return (
                                <Animated.View
                                    key={index}
                                    style={{
                                        marginTop: 24,
                                        width: Dimensions.get('window').width * 0.92,
                                        borderRadius: 20,
                                        backgroundColor: 'white',
                                        padding: 24,
                                        elevation: 4,
                                        shadowColor: '#000',
                                        shadowOffset: { width: 0, height: 4 },
                                        shadowOpacity: 0.1,
                                        shadowRadius: 8,
                                        opacity: opacityAnim,
                                        transform: [{ translateY: cardsTranslateAnim }]
                                    }}
                                >
                                    <Text style={{ fontSize: 24, fontWeight: '600' }}>{train.trainingName}</Text>
                                    <Text style={{ fontSize: 16, marginTop: 12, color: 'rgba(0, 0, 0, 0.6)', fontWeight: '400', lineHeight: 24, }}>{train.trainingDescription}</Text>
                                </Animated.View>
                            )
                        })
                    }
                </View>

            </ScrollView>
            <BottomAppBar />
            <BottomSheet visible={create} onClose={() => setCreate(false)}>
                <Text style={{ fontSize: 24, fontWeight: '600', color: 'black', width: '100%' }}>Nuevo entrenamiento</Text>
            </BottomSheet>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F7',
    },
});