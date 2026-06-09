# Primeros pasos

> **Nota:** La sección **Tutorial** te guía paso a paso para construir un juego desde cero. El **Manual** es una referencia: cada página explica una parte clave del motor, con ejemplos. Si eres nuevo en Angry Pixel, empieza por el Tutorial; usa el Manual para consultar.

> **Requisitos previos:**
>
> - Familiaridad con la terminal / línea de comandos.
> - Familiaridad con JavaScript o TypeScript.
> - [Node.js](https://nodejs.org/) en su versión 20 o superior instalado.

## Instalación

Hay dos formas de iniciar un proyecto: generar un nuevo proyecto a partir de la plantilla oficial (skeleton), o instalar el motor manualmente en tu propio proyecto.

### Plantilla oficial (skeleton)

El [skeleton oficial](https://github.com/angry-pixel-studio/angry-pixel-skeleton) proporciona una estructura de proyecto preconfigurada y lista para usar. Es un monorepo (workspaces de npm) donde el juego vive en una única base de código y desde ahí se compila para web, escritorio y móvil. Incluye comandos integrados para exportar a cada plataforma; por ejemplo `npm run build` (web), `npm run build:desktop` (escritorio mediante Electron) y `npm run build:android` (Android). Consulta el `README.md` del skeleton para la lista completa de comandos y más detalles.

Genera un nuevo proyecto a partir de él e instala sus dependencias:

```bash
npx degit angry-pixel-studio/angry-pixel-skeleton my-game
cd my-game
npm install
```

### Instalación manual

Recomendada para proyectos existentes, o para desarrolladores con experiencia que quieran configurar su propio proyecto desde cero. Instala el motor desde npm:

```bash
npm install angry-pixel
```

El motor incluye sus propias definiciones de tipos, por lo que no se necesitan paquetes adicionales para TypeScript.

> **Nota:** Recomendamos configurar tu proyecto con un empaquetador como [Vite](https://vite.dev/), que proporciona un servidor de desarrollo con recarga en caliente y una compilación de producción.

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
