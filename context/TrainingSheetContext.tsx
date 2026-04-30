import { createContext, useState } from "react";

interface TrainingSheetContext {
    visible: boolean;
    setVisible: (visible: boolean) => void;
}

export const TrainingSheetContext = createContext<TrainingSheetContext>({
    visible: false,
    setVisible: () => { },
});

export const TrainingSheetProvider = ({ children }: { children: React.ReactNode }) => {
    const [visible, setVisible] = useState(false);

    return (
        <TrainingSheetContext.Provider value={{ visible, setVisible }}>
            {children}
        </TrainingSheetContext.Provider>
    )
}