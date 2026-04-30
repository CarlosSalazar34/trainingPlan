import { BottomSheet } from "./BottomSheet"
import { useContext } from "react"
import { TrainingSheetContext } from "../context/TrainingSheetContext"
import { Text, TextInput, View } from "react-native"

export const CreateTrainingSheet = () => {
    const { visible, setVisible } = useContext(TrainingSheetContext);
    return (
        <BottomSheet visible={visible} onClose={() => {
            setVisible(false);
        }}>
            <View style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                width: '100%',

            }}>
                <Text style={{
                    fontSize: 24,
                    fontWeight: '600',
                    color: '#333',
                    lineHeight: 32,
                    marginBottom: 10,
                }}>Nombre de la Rutina</Text>
                <TextInput placeholder="Pecho y Tríceps" style={{
                    width: '100%',
                    height: 50,
                    borderColor: '#E0E0E0',
                    borderWidth: 1,
                    borderRadius: 12,
                    padding: 10,
                    fontSize: 20,
                    color: '#333',
                    fontWeight: '400',
                    lineHeight: 24,
                    marginBottom: 10,
                }} />
            </View>
        </BottomSheet>
    )
}