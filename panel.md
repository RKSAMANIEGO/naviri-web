# Pasos para Refactorizar el Panel Administrativo

Esta es una guía paso a paso para migrar los módulos del panel administrativo a la arquitectura "Híbrida: Basada en Características + Capas". Marca cada paso como completado (`- [x]`) a medida que avanzas.

**¡Importante!** Después de completar cada módulo principal, **testea** la funcionalidad afectada y haz **commit** a la rama `development` usando conventional commits y gitmojis.

## Fase 1: Preparación (Si es necesario)

*(Verificar si ya existen las carpetas base de `pasos.md`. Si no, crearlas)*

-   [x] Verificar existencia de `src/features`.
-   [x] Verificar existencia de `src/shared/components` (para posibles componentes compartidos del admin).
-   [x] Verificar existencia de `src/shared/hooks` (para posibles hooks compartidos del admin).

## Fase 2: Refactorizar Módulos del Panel (`features`)

*(Repite este bloque para CADA módulo administrativo. Haz commit después de cada uno.)*

---

-   [x] **Módulo: `admin-dashboard`**
    -   [x] Crear carpeta `src/features/admin-dashboard/`. (Note: Actual path created is `src/features/admin-dashboard/`)
    -   [x] Crear subcarpetas: `pages` (creada). (`components`, `hooks`, `services`, `types` se crearán según sea necesario).
    -   [x] **Crear/Mover Página:** Creada `src/features/admin-dashboard/pages/AdminDashboardPage.jsx`. (Note: Actual path created is `src/features/admin-dashboard/pages/AdminDashboardPage.jsx`)
    -   [x] **Mover Componentes Específicos:** (N/A - No se identificaron componentes específicos para mover en este paso).
    -   [x] **Mover Hooks Específicos:** (N/A - No se identificaron hooks específicos para mover en este paso).
    -   [x] **Mover Servicios API:** (N/A - No se identificaron servicios específicos para mover en este paso).
    -   [x] **Actualizar Importaciones:** Actualizado `AppRouter.jsx`.
    -   [ ] **Testear:** Verificar funcionalidad del dashboard.
    -   [ ] **Commit:** `feat(admin-dashboard): :sparkles: structure admin-dashboard feature`

---

-   [x] **Módulo: `admin-products`**
    -   [x] Crear carpeta `src/features/admin-products/`.
    -   [x] Crear subcarpetas necesarias (`pages`, `components`, `components/Modal`, `services`, `styles`).
    -   [x] **Mover Página:** Mover `src/pages/PageProductAdmin/ProductAdmin.jsx` to `src/features/admin-products/pages/ProductAdminPage.jsx`.
    -   [x] **Mover Componentes Específicos:** Movidos `ProductSearch`, `ProductsTable`, `ProductsCards`, `ModalCrudProduct`, and `ModalProducts` to `src/features/admin-products/components/` (and `components/Modal/`).
    -   [ ] **Mover Hooks Específicos:** (Identify and move if any exist).
    -   [x] **Mover Servicios API:** Movidos admin product functions from `src/services/productService.js` to `src/features/admin-products/services/adminProductsApi.js`.
    -   [x] **Mover Estilos Específicos:** Movido `src/styles/productAdmin.module.css` to `src/features/admin-products/styles/productAdmin.module.css`.
    -   [x] **Actualizar Importaciones:** Corregidas rutas in `AppRouter.jsx`, `ProductAdminPage.jsx`, `ProductSearch.jsx`, `ProductsTable.jsx`, `ProductsCards.jsx`, `ModalCrudProduct.jsx`, `ModalProducts.jsx`, and `productService.js`.
    -   [ ] **Testear:** Verificar CRUD de productos en el panel.
    -   [ ] **Commit:** `feat(admin-products): :sparkles: structure admin-products feature`

---

-   [ ] **Módulo: `admin-categories`**
    -   [ ] Crear carpeta `src/features/admin/admin-categories/`.
    -   [ ] Crear subcarpetas necesarias.
    -   [ ] **Mover Página:** Mover `src/pages/CategoriaPage.jsx` a `src/features/admin/admin-categories/pages/CategoryAdminPage.jsx`.
    -   [ ] **Mover Componentes Específicos:** Mover componentes de gestión de categorías.
    -   [ ] **Mover Hooks Específicos:** Mover hooks relacionados.
    -   [ ] **Mover Servicios API:** Mover funciones CRUD de categorías.
    -   [ ] **Actualizar Importaciones:** Corregir rutas en `AppRouter.jsx` y archivos movidos.
    -   [ ] **Testear:** Verificar CRUD de categorías.
    -   [ ] **Commit:** `feat(admin-categories): :sparkles: structure admin-categories feature`

---

-   [ ] **Módulo: `admin-contacts`** (Anteriormente `customers` / `InfoContact`)
    -   [ ] Crear carpeta `src/features/admin/admin-contacts/`.
    -   [ ] Crear subcarpetas necesarias.
    -   [ ] **Mover Página:** Mover `src/pages/contactoadmin/InfoContact.jsx` a `src/features/admin/admin-contacts/pages/ContactAdminPage.jsx`.
    -   [ ] **Mover Componentes Específicos:** Mover componentes de visualización de contactos.
    -   [ ] **Mover Hooks Específicos:** Mover hooks relacionados.
    -   [ ] **Mover Servicios API:** Mover funciones API de contactos.
    -   [ ] **Actualizar Importaciones:** Corregir rutas en `AppRouter.jsx` y archivos movidos.
    -   [ ] **Testear:** Verificar visualización de contactos.
    -   [ ] **Commit:** `feat(admin-contacts): :sparkles: structure admin-contacts feature`

---

-   [ ] **Módulo: `admin-comments`** (Anteriormente `comentary` / `ComentAdminPage`)
    -   [ ] Crear carpeta `src/features/admin/admin-comments/`.
    -   [ ] Crear subcarpetas necesarias.
    -   [ ] **Mover Página:** Mover `src/pages/ComentAdminPage.jsx` a `src/features/admin/admin-comments/pages/CommentAdminPage.jsx`. (Revisar si `<h1>Comentarios</h1>` en `AppRouter` debe ser reemplazado por esta página).
    -   [ ] **Mover Componentes Específicos:** Mover componentes de gestión de comentarios.
    -   [ ] **Mover Hooks Específicos:** Mover hooks relacionados.
    -   [ ] **Mover Servicios API:** Mover funciones API de comentarios.
    -   [ ] **Actualizar Importaciones:** Corregir rutas en `AppRouter.jsx` y archivos movidos.
    -   [ ] **Testear:** Verificar gestión de comentarios.
    -   [ ] **Commit:** `feat(admin-comments): :sparkles: structure admin-comments feature`

---

-   [ ] **Módulo: `admin-blogs`**
    -   [ ] Crear carpeta `src/features/admin/admin-blogs/`.
    -   [ ] Crear subcarpetas necesarias.
    -   [ ] **Mover Página:** Mover `src/pages/BlogAdminPage.jsx` a `src/features/admin/admin-blogs/pages/BlogAdminPage.jsx`.
    -   [ ] **Mover Componentes Específicos:** Mover componentes de gestión de blogs (editor, tabla, etc.).
    -   [ ] **Mover Hooks Específicos:** Mover `useBlogAdmin.jsx` (si existe) a `src/features/admin-blogs/hooks/useAdminBlogs.js`.
    -   [ ] **Mover Servicios API:** Mover funciones CRUD de blogs para admin.
    -   [ ] **Actualizar Importaciones:** Corregir rutas en `AppRouter.jsx` y archivos movidos.
    -   [ ] **Testear:** Verificar CRUD de blogs en el panel.
    -   [ ] **Commit:** `feat(admin-blogs): :sparkles: structure admin-blogs feature`

---

-   [ ] **Módulo: `admin-policies`** (Anteriormente `page/policy`)
    -   [ ] Crear carpeta `src/features/admin/admin-policies/`.
    -   [ ] Crear subcarpetas necesarias.
    -   [ ] **Mover Página:** Mover `src/pages/PolicyAdminPage.jsx` a `src/features/admin/admin-policies/pages/PolicyAdminPage.jsx`.
    -   [ ] **Mover Componentes Específicos:** Mover editor/formulario de políticas.
    -   [ ] **Mover Hooks Específicos:** Mover hooks relacionados.
    -   [ ] **Mover Servicios API:** Mover funciones API de gestión de políticas.
    -   [ ] **Actualizar Importaciones:** Corregir rutas en `AppRouter.jsx` y archivos movidos.
    -   [ ] **Testear:** Verificar edición de políticas.
    -   [ ] **Commit:** `feat(admin-policies): :sparkles: structure admin-policies feature`

---

-   [ ] **Módulo: `admin-services`** (Anteriormente `page/service`)
    -   [ ] Crear carpeta `src/features/admin/admin-services/`.
    -   [ ] Crear subcarpetas necesarias.
    -   [ ] **Mover Página:** Mover `src/pages/ServiceAdminPage.jsx` a `src/features/admin/admin-services/pages/ServiceAdminPage.jsx`.
    -   [ ] **Mover Componentes Específicos:** Mover componentes de gestión de servicios.
    -   [ ] **Mover Hooks Específicos:** Mover hooks relacionados.
    -   [ ] **Mover Servicios API:** Mover funciones CRUD de servicios.
    -   [ ] **Actualizar Importaciones:** Corregir rutas en `AppRouter.jsx` y archivos movidos.
    -   [ ] **Testear:** Verificar CRUD de servicios.
    -   [ ] **Commit:** `feat(admin-services): :sparkles: structure admin-services feature`

---

-   [ ] **Módulo: `admin-emails`** (Anteriormente `mail` / `InfoEmails`)
    -   [ ] Crear carpeta `src/features/admin/admin-emails/`.
    -   [ ] Crear subcarpetas necesarias.
    -   [ ] **Mover Página:** Mover `src/pages/formClient/InfoEmails.jsx` a `src/features/admin/admin-emails/pages/EmailAdminPage.jsx`.
    -   [ ] **Mover Componentes Específicos:** Mover componentes de visualización de emails.
    -   [ ] **Mover Hooks Específicos:** Mover hooks relacionados.
    -   [ ] **Mover Servicios API:** Mover funciones API relacionadas con emails (si aplica).
    -   [ ] **Actualizar Importaciones:** Corregir rutas en `AppRouter.jsx` y archivos movidos.
    -   [ ] **Testear:** Verificar visualización de emails.
    -   [ ] **Commit:** `feat(admin-emails): :sparkles: structure admin-emails feature`

---

-   [ ] **Módulo: `admin-promotions`**
    -   [ ] Crear carpeta `src/features/admin/admin-promotions/`.
    -   [ ] Crear subcarpetas necesarias.
    -   [ ] **Mover Página:** Mover `src/pages/PromotionAdminPage.jsx` a `src/features/admin/admin-promotions/pages/PromotionAdminPage.jsx`.
    -   [ ] **Mover Componentes Específicos:** Mover componentes de gestión de promociones.
    -   [ ] **Mover Hooks Específicos:** Mover hooks relacionados.
    -   [ ] **Mover Servicios API:** Mover funciones CRUD de promociones.
    -   [ ] **Actualizar Importaciones:** Corregir rutas en `AppRouter.jsx` y archivos movidos.
    -   [ ] **Testear:** Verificar CRUD de promociones.
    -   [ ] **Commit:** `feat(admin-promotions): :sparkles: structure admin-promotions feature`

---

-   [ ] **Módulo: `admin-settings`**
    -   [ ] Crear carpeta `src/features/admin/admin-settings/`.
    -   [ ] Crear subcarpetas necesarias.
    -   [ ] **Mover Página:** Crear o mover la página de configuración (ej: `src/features/admin/admin-settings/pages/SettingsAdminPage.jsx`).
    -   [ ] **Mover Componentes Específicos:** Mover `src/components/AdminPanel/AdminConfi.jsx` (UserSettings) a `src/features/admin/admin-settings/components/UserSettings.jsx` (o a `shared` si se usa en más sitios).
    -   [ ] **Mover Hooks Específicos:** Mover hooks relacionados con la configuración.
    -   [ ] **Mover Servicios API:** Mover funciones API de configuración.
    -   [ ] **Actualizar Importaciones:** Corregir rutas en `AdminLayout.jsx` y otros archivos.
    -   [ ] **Testear:** Verificar funcionalidad de configuración.
    -   [ ] **Commit:** `feat(admin-settings): :sparkles: structure admin-settings feature`

---

## Fase 3: Refactorizar Componentes/Hooks Compartidos del Admin (`shared`)

-   [ ] Identificar componentes usados en *múltiples* módulos del panel admin (ej: una tabla genérica de admin, un modal de confirmación de admin).
-   [ ] Mover estos componentes a `src/shared/components/Admin/` (o similar).
-   [ ] Actualizar importaciones en las features correspondientes.
-   [ ] Identificar hooks usados en *múltiples* módulos del panel admin.
-   [ ] Mover estos hooks a `src/shared/hooks/`.
-   [ ] Actualizar importaciones.
-   [ ] **Testear:** Verificar que los componentes/hooks compartidos funcionen en todos los módulos donde se usan.
-   [ ] **Commit:** `refactor(shared): :recycle: move shared admin components/hooks`

## Fase 4: Limpieza Final del Panel

-   [ ] Revisar carpetas antiguas relacionadas con el admin (`src/pages/admin`, `src/components/AdminPanel`, etc.) y eliminar las que estén completamente vacías.
-   [ ] Revisar `src/shared/layouts/AdminLayout.jsx` para asegurar que las importaciones sean correctas (ej: `Sidebar`, `UserSettings` si se movió).
-   [ ] Revisar `src/core/router/AppRouter.jsx` y verificar que todas las rutas `/admin/*` apunten a las páginas dentro de `src/features/admin-*/pages/`.
-   [ ] Ejecutar linters y formateadores (ESLint, Prettier) en las carpetas `src/features/admin-*` y `src/shared/` afectadas.
-   [ ] Realizar una ronda final de pruebas de regresión completas en todo el panel administrativo.

*(Haz un commit final de limpieza para el panel.)*