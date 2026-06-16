# The Universe of Things 🎬

🔗 [Repositorio](https://github.com/FactoriaF5-Asturias/project-p5-digital-academy-team4-the-univers-of-things) · [GitHub Pages](#) *(disponible próximamente)*

## Descripción del proyecto

The Universe of Things es una aplicación web de catálogo de películas Disney que permite a los usuarios explorar el catálogo disponible, gestionar su lista de favoritos y personalizar su experiencia. Cuenta con un sistema de autenticación con roles diferenciados: usuario customer y administrador.

## Tecnologías

| Tecnología | Uso |
| :--- | :--- |
| Vue.js 3 | Framework frontend principal |
| Vue Router | Navegación y rutas protegidas |
| Pinia | Gestión de estado global |
| SASS | Estilos y diseño responsive |
| Tailwind CSS | Utilidades de estilos |
| Firebase | Autenticación y almacenamiento |
| Vitest | Testing unitario |
| Playwright | Testing end-to-end |

## Funcionalidades principales

- Catálogo de películas Disney con búsqueda, filtrado y paginación
- Sistema de autenticación con roles (customer y admin)
- Gestión de favoritos: agregar, editar, eliminar y valorar
- Dashboard de usuario con gestión de perfil y avatar
- Panel de administración: gestión de usuarios y películas destacadas
- Diseño responsive (móvil y desktop)

## Diseño y prototipado

### Prototipo visual — Stitch
*(Capturas próximamente)*

### Wireframes — Figma
*(Enlace próximamente)*

### Userflow
*(Diagrama próximo)*

## Instalación y ejecución

### Requisitos previos
Tener instalado [Node.js](https://nodejs.org/).

### Pasos
1. Clona el repositorio:
   ```bash
   git clone https://github.com/FactoriaF5-Asturias/project-p5-digital-academy-team4-the-univers-of-things.git
   ```
2. Instala las dependencias:
   ```bash
   npm install
   ```
3. Inicia el servidor de desarrollo:
   ```bash
   npm run dev
   ```
4. Ejecuta los tests unitarios:
   ```bash
   npm run test
   ```
5. Ejecuta los tests E2E:
```bash
   # Instala los navegadores (solo la primera vez)
   npx playwright install

   # Ejecuta todos los tests E2E
   npm run test:e2e

   # Solo en Chromium
   npm run test:e2e -- --project=chromium

   # Un archivo específico
   npm run test:e2e -- tests/example.spec.ts

   # Modo debug
   npm run test:e2e -- --debug
```

## Estructura del proyecto

```
├──.vscode
src/
├── assets/              # Imágenes, fuentes, estilos globales (SASS)
|   ├── main.css
|   ├── main.scss
├── components/          # Componentes reutilizables de UI
│   ├── layout/          # Componentes de estructura
│   │   ├── HeaderPublic.vue
│   │   ├── HeaderDashboard.vue
│   │   └── Footer.vue
│   ├── ui/              # Componentes de UI pequeños (botones, inputs, modales)
│   │   ├── StarRating.vue
│   │   ├── MovieCard.vue
│   │   ├── FavoriteCard.vue
│   │   ├── SearchBar.vue
│   │   └── Pagination.vue
│   └── admin/           # Componentes exclusivos de admin
│       └── UserTable.vue
|   
├──Router
├── views/               # Vistas principales (Páginas)
│   ├── HomeView.vue
│   ├── LoginView.vue
│   ├── RegisterView.vue
│   ├── UserDashboardView.vue
│   ├── FavoritesView.vue
│   ├── ProfileView.vue
│   ├── AdminDashboardView.vue
│   ├── UsersManagementView.vue
│   └── FeaturedManagementView.vue
├── router/
│   └── index.js         # Configuración de rutas y guards
├── stores/              # Lógica de estado (Pinia)
│   ├── authStore.js
│   ├── favoritesStore.js
│   └── featuredStore.js
├── services/            # Llamadas a APIs y Firebase
│   ├── authService.js
│   ├── disneyService.js
│   └── firebaseConfig.js # Configuración inicial de Firebase
├── utils/               # Funciones de utilidad (validaciones, formateadores)
│   ├── validators.js    # Lógica de validateEmail, validatePassword
│   └── helpers.js
└── App.vue
```

## Credenciales de demo

*(Disponibles próximamente)*

| Rol | Email | Contraseña |
| :--- | :--- | :--- |
| Customer | - | - |
| Admin | - | - |

## Planificación

El proyecto se ha planificado y gestionado mediante Jira, organizado en épicas e historias de usuario.

*(Capturas de Jira próximamente)*

## Tests

### Tests unitarios — Vitest
*(Capturas de resultados próximamente)*

### Tests E2E — Playwright
*(Capturas de resultados próximamente)*

## 👩‍💻 Equipo — Disney Team

Proyecto desarrollado por:

| Nombre | Rol |
| :--- | :--- |
| Andrea Pérez | Training Developer · F5 Bootcamp |
| Raana Afkari | Training Developer · F5 Bootcamp |
| Gema Miguel | Training Developer · F5 Bootcamp |
| Luisa Cortés | Training Developer · F5 Bootcamp |
