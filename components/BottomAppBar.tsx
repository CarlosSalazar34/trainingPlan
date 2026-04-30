import { Ionicons } from "@expo/vector-icons"
import { View, TouchableOpacity } from "react-native"



interface BottomAppBarProps {
    activeTab: string;
    onTabChange: (tab: string) => void;
}

export const BottomAppBar = ({ activeTab, onTabChange }: BottomAppBarProps) => {
    const options = [
        { icon: 'home-outline', activeIcon: 'home', label: 'Inicio' },
        { icon: 'fitness-outline', activeIcon: 'fitness', label: 'Entrenamientos' },
        { icon: 'bar-chart-outline', activeIcon: 'bar-chart', label: 'Progreso' },
        { icon: 'person-outline', activeIcon: 'person', label: 'Perfil' },
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
                options.map((item, index) => {
                    const isActive = activeTab === item.label;
                    return (
                        <TouchableOpacity
                            key={index}
                            onPress={() => onTabChange(item.label)}
                            style={{
                                alignItems: 'center',
                                justifyContent: 'center',
                                width: 50,
                                height: 50,
                            }}
                        >
                            <Ionicons
                                name={isActive ? item.activeIcon : item.icon}
                                size={26}
                                color={isActive ? "#A7FF83" : "rgba(255, 255, 255, 0.5)"}
                            />
                        </TouchableOpacity>
                    );
                })
            }
        </View>
    )
}