# Primeros pasos

> **Nota:** La sección **Tutorial** te guía paso a paso para construir un juego desde cero. El **Manual** es una referencia: cada página explica una parte clave del motor, con ejemplos. Si eres nuevo en Angry Pixel, empieza por el Tutorial; usa el Manual para consultar.

## Instalación

Hay dos formas de iniciar un proyecto: instalar el motor manualmente en tu propio proyecto, o generar un nuevo proyecto a partir de la plantilla oficial (skeleton).

### Instalación manual

Crea una carpeta de proyecto e instala el motor desde npm:

```bash
mkdir my-game
cd my-game
npm install angry-pixel
```

El motor incluye sus propias definiciones de tipos, por lo que no se necesitan paquetes adicionales para TypeScript.

> **Nota:** Recomendamos configurar tu proyecto con un empaquetador como [Vite](https://vite.dev/), que proporciona un servidor de desarrollo con recarga en caliente y una compilación de producción.

### Plantilla oficial (skeleton)

El [skeleton oficial](https://github.com/angry-pixel-studio/angry-pixel-app-skeleton) proporciona una estructura de proyecto preconfigurada y lista para usar. Genera un nuevo proyecto a partir de él e instala sus dependencias:

```bash
npx degit angry-pixel-studio/angry-pixel-app-skeleton my-game
cd my-game
npm install
```

## Estructura de carpetas sugerida

La siguiente estructura es una convención para organizar un proyecto. La plantilla skeleton la sigue, y es la disposición utilizada a lo largo de este manual.

```
my-game/
├── src/
│   ├── main.ts        # Inicializa la instancia de Game, carga las escenas y ejecuta el juego
│   ├── component/     # Archivos de componentes
│   ├── config/        # Archivos de configuración y parámetros
│   ├── entity/        # Archivos de definición de entidades
│   ├── scene/         # Archivos de escenas
│   └── system/        # Archivos de sistemas
└── public/            # Recursos: imágenes, archivos de sonido, exportaciones de editores de mapas, etc.
```
