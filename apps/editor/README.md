# Angry Pixel Editor

Un editor visual para crear y editar escenas del motor Angry Pixel Engine.

## 🚀 Características

-   **Editor Visual**: Interfaz intuitiva para crear y editar entidades
-   **Herramientas**: Selección, movimiento, creación y eliminación de entidades
-   **Panel de Propiedades**: Edición en tiempo real de propiedades de entidades
-   **Panel de Capas**: Gestión de visibilidad y bloqueo de entidades
-   **Sistema de Cuadrícula**: Cuadrícula configurable con opción de snap
-   **Zoom y Cámara**: Controles de zoom y navegación por la escena
-   **Estado Persistente**: Gestión de estado con Zustand

## 🛠️ Stack Tecnológico

-   **Vite** - Build tool y dev server
-   **React 18** - Framework de UI
-   **TypeScript** - Tipado estático (heredado del monorepo)
-   **Tailwind CSS** - Framework de CSS utilitario
-   **Zustand** - Gestión de estado

## 📦 Instalación

Este editor es parte de un monorepo. Para instalar todas las dependencias:

```bash
# Desde la raíz del monorepo
yarn install

# O con npm
npm install
```

## 🚀 Desarrollo

### Desde la raíz del monorepo (Recomendado)

```bash
# Iniciar servidor de desarrollo
yarn new-editor:dev

# O con npm
npm run new-editor:dev
```

### Desde el directorio del editor

```bash
cd apps/editor

# Iniciar servidor de desarrollo
yarn dev

# Construir para producción
yarn build

# Vista previa de la build
yarn preview
```

## 🎯 Uso

### Herramientas Disponibles

1. **👆 Select**: Seleccionar entidades para editar
2. **✋ Move**: Mover entidades seleccionadas
3. **➕ Create**: Crear nuevas entidades haciendo clic en el canvas
4. **🗑️ Delete**: Eliminar entidades seleccionadas

### Tipos de Entidades

-   **🖼️ Sprite**: Imágenes y sprites
-   **📝 Text**: Texto renderizable
-   **⬜ Shape**: Formas geométricas básicas
-   **📷 Camera**: Cámaras de la escena

### Controles de Cámara

-   **🔍+**: Aumentar zoom
-   **🔍-**: Reducir zoom
-   **Reset**: Restablecer zoom al 100%

### Propiedades Editables

-   **Nombre**: Identificador de la entidad
-   **Posición**: Coordenadas X e Y
-   **Tamaño**: Ancho y alto
-   **Visibilidad**: Mostrar/ocultar entidad
-   **Bloqueo**: Prevenir modificaciones accidentales
-   **Propiedades específicas**: Dependiendo del tipo de entidad

## 🏗️ Estructura del Proyecto

```
apps/editor/
├── src/
│   ├── components/          # Componentes React
│   │   ├── Toolbar.tsx     # Barra de herramientas
│   │   ├── Canvas.tsx      # Área de edición principal
│   │   ├── PropertiesPanel.tsx  # Panel de propiedades
│   │   └── LayersPanel.tsx      # Panel de capas
│   ├── stores/             # Estado global con Zustand
│   │   └── editorStore.ts  # Store principal del editor
│   ├── App.tsx             # Componente principal
│   ├── main.tsx            # Punto de entrada
│   └── index.css           # Estilos globales y Tailwind
├── package.json            # Dependencias específicas del editor
├── vite.config.ts          # Configuración de Vite
├── tailwind.config.js      # Configuración de Tailwind
└── tsconfig.json           # Configuración de TypeScript
```

## 🔧 Configuración

### Monorepo Integration

Este editor está configurado para funcionar dentro del monorepo de Angry Pixel Engine:

-   **TypeScript**: Configuración heredada del monorepo raíz
-   **ESLint**: Configuración compartida del monorepo
-   **Prettier**: Formateo consistente con el resto del proyecto

### Tailwind CSS

La aplicación incluye configuración personalizada de Tailwind con:

-   Paleta de colores personalizada
-   Componentes utilitarios predefinidos
-   Sistema de espaciado consistente

### Vite

Configuración optimizada para React con:

-   Hot Module Replacement (HMR)
-   Build optimizado para producción
-   Puerto personalizado (3001)

## 🎨 Personalización

### Colores

Los colores primarios se pueden modificar en `tailwind.config.js`:

```javascript
colors: {
    primary: {
        50: "#eff6ff",
        500: "#3b82f6",
        600: "#2563eb",
        // ... más variantes
    },
},
```

### Componentes

Los estilos de componentes están definidos en `index.css` usando `@layer components`:

```css
.btn-primary {
    @apply bg-primary-600 hover:bg-primary-700 text-white font-medium py-2 px-4 rounded-lg;
}
```

## 🚧 Próximas Características

-   [ ] Importación/exportación de escenas
-   [ ] Sistema de prefabs
-   [ ] Animaciones
-   [ ] Física básica
-   [ ] Sistema de partículas
-   [ ] Editor de scripts
-   [ ] Colaboración en tiempo real

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la licencia del motor Angry Pixel Engine.
