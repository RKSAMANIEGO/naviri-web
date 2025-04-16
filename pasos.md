# Pasos para Refactorizar la Arquitectura del Proyecto

Esta es una guía paso a paso para migrar la estructura actual del proyecto a la arquitectura "Híbrida: Basada en Características + Capas". Marca cada paso como completado (`- [x]`) a medida que avanzas.

**¡Importante!** Después de completar cada grupo principal de tareas (o incluso sub-tareas significativas), **testea** la funcionalidad afectada y haz **commit** a la rama `development` usando conventional commits y gitmojis.

## Fase 1: Crear Estructura Base de Carpetas

-   [x] Crear carpeta `src/core`
-   [x] Crear carpeta `src/shared`
-   [x] Crear carpeta `src/features`
-   [x] Dentro de `src/core`, crear:
    -   [x] `api`
    -   [x] `config`
    -   [x] `context`
    -   [x] `router`
    -   [x] `styles`
-   [x] Dentro de `src/shared`, crear:
    -   [x] `assets`
    -   [x] `components`
    -   [x] `hooks`
    -   [x] `layouts`
    -   [x] `utils`

## Fase 2: Mover Elementos Centrales (`core`)

-   [x] **Router:**
    -   [x] Mover `src/routes/router.jsx` a `src/core/router/AppRouter.jsx`.
    -   [x] Actualizar importación en `src/App.jsx`.
-   [x] **API Client:**
    -   [x] Identificar/crear configuración centralizada de API (ej: Axios) en `src/core/api/apiClient.js`.
    -   [x] Actualizar servicios para usar `apiClient` (se hará gradualmente al mover servicios).
-   [x] **Estilos Globales:**
    -   [x] Mover estilos globales de `src/index.css` y `src/App.css` a `src/core/styles/global.css` (o similar).
    -   [x] Asegurar importación correcta en `src/main.jsx`.
-   [x] **Contexto Global:**
    -   [x] Mover `src/context/authProvider.js` a `src/core/context/AuthContext.js` (o `src/features/auth/context/` si es muy específico).
    -   [ ] Mover `src/context/CartContext.jsx` a `src/features/cart/context/CartContext.jsx` (más específico de la feature).
    -   [x] Actualizar `src/main.jsx` o `src/App.jsx` para envolver con los providers desde sus nuevas ubicaciones.

*(Testea la carga inicial de la aplicación y la funcionalidad básica del router/contexto. Haz commit.)*

## Fase 3: Mover Elementos Compartidos (`shared`)

-   [ ] **Layouts:**
    -   [ ] Mover `src/pages/layout/MainLayout.jsx` a `src/shared/layouts/MainLayout.jsx`.
    -   [ ] Mover `src/pages/layout/AdminLayout.jsx` a `src/shared/layouts/AdminLayout.jsx`.
    -   [ ] Actualizar importaciones en `src/core/router/AppRouter.jsx`.
-   [ ] **Componentes UI Comunes:**
    -   [ ] Mover `src/components/header/Header.jsx` (y `header.module.css`) a `src/shared/components/Header/`.
    -   [ ] Mover `src/components/footer/Footer.jsx` (y `footer.module.css`) a `src/shared/components/Footer/`.
    -   [ ] Mover `src/components/sidebar/Sidebar.jsx` (y `sidebar.module.css`) a `src/shared/components/Sidebar/`.
    -   [ ] Identificar y mover otros componentes reutilizables (botones, modales base, inputs, `ProductCard.jsx` si es genérico) a `src/shared/components/`. Mover sus CSS Modules.
    -   [ ] Actualizar *todas* las importaciones de estos componentes movidos.
-   [ ] **Hooks Comunes:**
    -   [ ] Identificar y mover hooks reutilizables a `src/shared/hooks/`.
    -   [ ] Actualizar importaciones.
-   [ ] **Utils:**
    -   [ ] Identificar y mover funciones de utilidad genéricas a `src/shared/utils/`.
    -   [ ] Actualizar importaciones.

*(Testea que los layouts y componentes compartidos se rendericen correctamente en todas las páginas donde se usan. Haz commit.)*

## Fase 4: Refactorizar Característica por Característica (`features`)

*(Repite este bloque para CADA característica. Haz commit después de cada una.)*

-   [ ] **Característica: `[NombreDeCaracteristica]`** (ej: `homepage`)
    -   [ ] Crear carpeta `src/features/[nombre-de-caracteristica]/`.
    -   [ ] Crear subcarpetas necesarias: `pages`, `components`, `hooks`, `services`, `types`.
    -   [ ] **Mover Páginas:** Mover archivos de página relevantes (ej: `src/pages/home/Home.jsx` a `src/features/homepage/pages/HomePage.jsx`).
    -   [ ] **Mover Componentes Específicos:** Mover componentes usados *solo* en esta característica (ej: `SectionPrincipal.jsx` a `src/features/homepage/components/HeroSection.jsx`). Mover sus CSS Modules.
    -   [ ] **Mover Hooks Específicos:** Mover hooks usados *solo* en esta característica (ej: `useBlogAdmin.jsx` a `src/features/admin-blogs/hooks/useAdminBlogs.js`).
    -   [ ] **Mover Servicios API:** Mover funciones de API relevantes desde los archivos `src/services/*.js` al archivo `services/[featureName]Api.js` dentro de la característica (ej: funciones CRUD de blog a `src/features/admin-blogs/services/adminBlogsApi.js`).
    -   [ ] **Actualizar Importaciones:** Corregir todas las rutas de importación dentro de los archivos movidos y en los archivos que los usan (especialmente en `AppRouter.jsx`).
    -   [ ] **Testear:** Verificar que toda la funcionalidad de esta característica específica funcione como se espera.
    -   [ ] **Commit:** `feat([nombre-caracteristica]): :sparkles: structure [nombre-caracteristica] feature`

**Lista de Características a Refactorizar:**

-   [ ] `homepage`
-   [ ] `products` (público)
-   [ ] `categories` (público, si aplica)
-   [ ] `blogs` (público)
-   [ ] `services-public` (público)
-   [ ] `about` (público)
-   [ ] `testimonials` (público)
-   [ ] `contact` (público)
-   [ ] `cart`
-   [ ] `auth`
-   [ ] `policy` (público)
-   [ ] `admin-dashboard`
-   [ ] `admin-products`
-   [ ] `admin-categories`
-   [ ] `admin-blogs`
-   [ ] `admin-services`
-   [ ] `admin-promotions`
-   [ ] `admin-policies`
-   [ ] `admin-comments`
-   [ ] `admin-contacts`
-   [ ] `admin-emails`
-   [ ] `admin-settings` (si aplica)

## Fase 5: Limpieza Final

-   [ ] Revisar carpetas antiguas (`src/pages`, `src/components`, `src/hooks`, `src/services`, `src/context`, `src/styles` si moviste todo) y eliminar las que estén completamente vacías.
-   [ ] Revisar `src/App.jsx` y `src/main.jsx` para asegurar que solo contengan configuración mínima y renderizado principal.
-   [ ] Ejecutar linters y formateadores (ESLint, Prettier) en todo el proyecto.
-   [ ] Realizar una ronda final de pruebas de regresión completas en toda la aplicación.
-   [ ] Revisar y actualizar `README.md` si es necesario para reflejar la nueva estructura.

*(Haz un commit final de limpieza.)*