import { Ionicons } from "@expo/vector-icons"
import { View, TouchableOpacity } from "react-native"


export const BottomAppBar = () => {
    const options = [
        { icon: 'home-outline', label: 'Inicio' },
        { icon: 'fitness-outline', label: 'Entrenamientos' },
        { icon: 'bar-chart-outline', label: 'Progreso' },
        { icon: 'person-outline', label: 'Perfil' },
    ] as const;
    return (
        <View style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: 100,
            backgroundColor: 'black',
            borderTopLeftRadius: 24,
            borderTopRightRadius: 24,
            padding: 16,
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-around',
            paddingBottom: 40,
        }}>
            {
                options.map((item, index) => (
                    <TouchableOpacity
                        key={index}
                    >
                        <Ionicons
                            name={item.icon}
                            size={24}
                            color="white"
                        />
                    </TouchableOpacity>
                ))
            }
        </View>
    )
}