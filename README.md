# Documentación de Estudio: React Native Training App

Este documento sirve como guía para entender los conceptos clave de React Native utilizados en este proyecto, incluyendo el manejo de áreas seguras, navegación, dimensiones y contexto.

---

## 0. Instalación y Librerías Necesarias

Para que este proyecto funcione correctamente, necesitas instalar las siguientes dependencias. Si estás usando **Expo**, puedes correr:

```bash
npx expo install react-native-safe-area-context react-native-screens @react-navigation/native @react-navigation/native-stack @expo/vector-icons
```

### ¿Qué hace cada una?
- **`react-native-safe-area-context`**: Maneja los bordes de la pantalla (notch, barras de sistema).
- **`@react-navigation/native` & `native-stack`**: Permiten la navegación entre diferentes pantallas.
- **`react-native-screens`**: Optimiza el rendimiento de la navegación usando pantallas nativas.
- **`@expo/vector-icons`**: Proporciona los íconos (Ionicons) usados en el Header y el Menú.

---

## 1. Safe Area (Manejo de Áreas Seguras)

En dispositivos modernos (como iPhone con "notch" o Android con cámaras frontales), el contenido puede quedar oculto detrás de elementos del sistema.

### `SafeAreaProvider`
Es el contenedor raíz que habilita el soporte de áreas seguras en toda la aplicación. Se coloca en el punto más alto del árbol de componentes (`App.tsx`).

```tsx
// App.tsx
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function App() {
  return (
    <SafeAreaProvider>
      {/* El resto de la app */}
    </SafeAreaProvider>
  );
}
```

### `useSafeAreaInsets`
Es un hook que devuelve un objeto con los valores exactos (en píxeles) de los bordes "seguros" del dispositivo. Es más flexible que `SafeAreaView` porque permite aplicar el padding solo donde lo necesites.

### `SafeAreaView` (Componente Automático)
Es el componente más sencillo para manejar áreas seguras. Envuelve tu contenido y **automáticamente** aplica el padding necesario para evitar el notch y las barras del sistema.

```tsx
import { SafeAreaView } from 'react-native-safe-area-context';

const MyScreen = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Text>Este texto nunca quedará oculto.</Text>
    </SafeAreaView>
  );
};
```

**Diferencia clave:**
- **`SafeAreaView`**: Es automático y fácil de usar, pero a veces añade padding que no quieres (por ejemplo, si quieres que una imagen de fondo sí llegue hasta arriba del todo).
- **`useSafeAreaInsets`**: Es manual. Tú decides exactamente qué componente recibe el padding (como hicimos en el `Header`).

---

## 2. Navegación y Tabs

### Navegación de Stack
Utilizamos `@react-navigation/native-stack` para movernos entre pantallas completas. Aunque en este momento solo tenemos `MainPage`, la estructura está lista en `App.tsx`.

### Tabs Manuales (Estructura de MainPage)
En lugar de usar un navegador de tabs nativo, `MainPage.tsx` implementa un sistema de tabs personalizado usando **Estado de React**.

- **`activeTab`**: Estado que guarda qué sección está seleccionada (ej. 'Inicio', 'Perfil').
- **`renderContent()`**: Función que decide qué componente mostrar basándose en `activeTab`.

---

## 3. Dimensions API

Se usa para obtener las dimensiones físicas de la pantalla del usuario. Es vital para el diseño responsivo.

```tsx
import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

// Ejemplo: Un contenedor que siempre ocupe el 92% del ancho de la pantalla
const cardWidth = width * 0.92;
```

---

## 4. Context API (Estado Global)

El contexto permite pasar datos a través del árbol de componentes sin tener que pasar "props" manualmente en cada nivel.

En este proyecto, `TrainingSheetProvider` envuelve la app para que cualquier componente pueda abrir o cerrar la hoja de "Crear Entrenamiento".

```tsx
// Uso del contexto en cualquier componente:
const { setVisible } = useContext(TrainingSheetContext);

return <Button onPress={() => setVisible(true)} title="Nuevo" />;
```

---

## 5. Análisis de la Estructura de UI

La estructura principal en `MainPage.tsx` sigue un patrón de diseño vertical muy común:

```tsx
<View style={styles.container}>
    {/* 1. Encabezado persistente */}
    <Header />

    {/* 2. Contenido Dinámico (Cambia según la Tab activa) */}
    {renderContent()}

    {/* 3. Barra de Navegación Inferior (Controla el estado global de la página) */}
    <BottomAppBar activeTab={activeTab} onTabChange={setActiveTab} />

    {/* 4. Componente de Superposición (Solo se muestra cuando se activa) */}
    <CreateTrainingSheet />
</View>
```

---

## 6. Funcionamiento Detallado del Código

### A. El Flujo de las Pestañas (Tabs)
El cambio de pestañas funciona mediante un "acuerdo" entre `MainPage` y `BottomAppBar`:

1.  **Estado Maestro**: En `MainPage.tsx`, definimos `const [activeTab, setActiveTab] = useState('Inicio');`.
2.  **Pasar la Función**: Le pasamos `setActiveTab` al componente `BottomAppBar` como una "prop" llamada `onTabChange`.
3.  **Ejecución**: Cuando el usuario toca un botón en la barra inferior, se llama a `onTabChange('NombreDeTab')`, lo cual actualiza el estado en el padre (`MainPage`).
4.  **Re-render**: Al cambiar el estado, `MainPage` se vuelve a dibujar, ejecutando `renderContent()` y mostrando la nueva sección.

### B. El Mecanismo `renderContent`
En lugar de navegar a una nueva pantalla, usamos una lógica de **Renderizado Condicional**:

```tsx
const renderContent = () => {
    switch (activeTab) {
        case 'Inicio': return <HomeComponent />;
        case 'Perfil': return <ProfileComponent />;
        default: return <HomeComponent />;
    }
};
```
Esto permite que la transición sea instantánea y que el `Header` y la `BottomAppBar` no parpadeen ni desaparezcan, ya que nunca abandonamos la pantalla `MainPage`.

### C. Animaciones con `Animated`
Usamos el API nativo de animaciones para darle un toque premium:
- **`useRef(new Animated.Value(-100)).current`**: Creamos una referencia a un valor que empieza fuera de pantalla.
- **`Animated.spring` / `Animated.timing`**: Funciones que mueven ese valor suavemente.
- **`transform: [{ translateY: translateAnim }]`**: Aplicamos ese valor al estilo de un componente `Animated.View`.

### D. Funcionamiento de `CreateTrainingSheet` (Context)
Este componente es un "Bottom Sheet" que vive en el nivel raíz de la página. 
- No recibe props para abrirse.
- En su lugar, usa `useContext(TrainingSheetContext)`.
- Escucha el valor `visible`. Cuando `MainPage` llama a `setVisible(true)`, el Sheet reacciona y se desliza hacia arriba automáticamente.

---

## 7. ScrollView y el Manejo de Listas

En dispositivos móviles, cuando el contenido es más largo que la pantalla, necesitamos envolverlo en un `ScrollView`.

### `ScrollView` vs `View`
A diferencia de un `View` normal, el `ScrollView` permite al usuario deslizar el dedo para ver el contenido oculto.

### `contentContainerStyle` (Muy importante)
En un `ScrollView`, hay dos formas de aplicar estilos:
1.  **`style`**: Se aplica al contenedor del scroll (el tamaño de la "ventana" por donde ves).
2.  **`contentContainerStyle`**: Se aplica al **contenido interno**. 

En `MainPage.tsx` lo usamos así:
```tsx
<ScrollView 
  contentContainerStyle={{
    paddingBottom: 120, // Espacio extra para que el contenido no quede tapado por la barra inferior
    alignItems: 'center'
  }}
>
  {/* Tus tarjetas de entrenamiento */}
</ScrollView>
```

**Truco de diseño:** Siempre añade un `paddingBottom` generoso en el `contentContainerStyle` de tus scrolls si tienes una barra de navegación inferior, para que el usuario pueda hacer scroll hasta el final y ver todo el contenido sin que la barra lo tape.

---

## Consejos para estudiar:
- **Flujo de Datos**: Sigue el camino de la función `setActiveTab` desde `MainPage` hasta el `TouchableOpacity` dentro de `BottomAppBar`.
- **Efectos Secundarios**: Mira cómo el `useEffect` en `MainPage` dispara las animaciones cada vez que `activeTab` cambia.
- **Personalización**: Intenta crear una nueva función `renderNotificaciones()` y agrégala al `switch` de `renderContent`.
