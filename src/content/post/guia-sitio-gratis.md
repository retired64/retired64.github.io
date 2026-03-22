---
title: "Sitio web gratis desde Android con Termux y GitHub Pages"
description: "Guía completa paso a paso para publicar un blog usando Astro Cactus, sin pagar hosting, sin necesitar computadora, sin instalar Node.js."
publishDate: "21 Mar 2026"
tags: ["astro", "web"]
pinned: true
---

> Guía completa paso a paso para publicar un blog profesional usando Astro Cactus,
> sin pagar hosting, sin necesitar computadora, sin instalar Node.js.

---

## ¿Qué vas a lograr? Update Cactus

Al terminar esta guía tendrás un sitio web con blog personal publicado en internet,
completamente gratis, con modo oscuro y claro, búsqueda integrada y optimizado para SEO.
Todo hecho desde tu celular Android usando Termux y Git. El build lo hace GitHub
automáticamente en sus servidores cada vez que subes un cambio.

---

## ¿Cómo funciona este enfoque?

En lugar de instalar Node.js y pnpm en Termux, usamos **GitHub Actions** para construir
el sitio. Tú solo editas archivos y haces `git push`. GitHub se encarga del resto.

```
Tu celular (Termux)          GitHub
─────────────────            ──────────────────────────────────
Editar archivos     →  push  →  GitHub Actions construye el sitio
git add / commit / push      →  GitHub Pages publica el resultado
```

Ventajas de este enfoque:
- No necesitas instalar Node.js ni pnpm en Termux
- Termux solo necesita Git, que pesa muy poco
- El build corre en un entorno limpio y estable en cada push
- Funciona igual desde cualquier dispositivo donde tengas Git

---

## Requisitos previos

- Android con Termux instalado (descárgalo desde **F-Droid**, no desde Play Store)
- Una cuenta en [github.com](https://github.com) (es gratis)
- Conexión a internet

---

## Parte 1 — Preparar Termux

Solo necesitas Git y nano. Nada más.

### Actualizar paquetes

```bash
pkg update && pkg upgrade
```

Cuando te pregunte si deseas continuar escribe `y` y presiona Enter.

### Instalar Git y nano

```bash
pkg install git nano
git --version
```

Debe mostrar algo como `git version 2.x.x`.

### Configurar tu identidad en Git

Solo se hace una vez. Usa el mismo correo que tienes en GitHub.

```bash
git config --global user.name "TuNombre"
git config --global user.email "tucorreo@ejemplo.com"
```

Eso es todo lo que necesitas instalar en Termux.

---

## Parte 2 — Crear el proyecto en GitHub

### Usar el template oficial

1. Ve a [github.com/chrismwilliams/astro-theme-cactus](https://github.com/chrismwilliams/astro-theme-cactus)
2. Haz clic en el botón verde **Use this template**
3. Selecciona **Create a new repository**
4. Ponle un nombre, por ejemplo: `mi-blog`
5. Asegúrate de que esté en **Public**
6. Haz clic en **Create repository**
### Clonar el repositorio en Termux

```bash
cd ~
git clone https://github.com/TUNOMBREDEUSUARIO/mi-blog.git
cd mi-blog
```

---

## Parte 3 — Configurar el deploy automático

### Crear el workflow de GitHub Actions

El template ya trae un `ci.yml` que solo verifica errores pero no despliega.
Necesitas crear un archivo `deploy.yml` que construya y publique el sitio.

```bash
nano .github/workflows/deploy.yml
```

Pega este contenido exacto:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: false

jobs:
  build:
    name: Build site
    runs-on: ubuntu-latest

    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Install pnpm
        uses: pnpm/action-setup@v4
        with:
          version: 10
          run_install: false

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: "pnpm"

      - name: Install dependencies
        run: pnpm install --frozen-lockfile

      - name: Build site
        run: pnpm build

      - name: Run Pagefind (search index)
        run: pnpm postbuild

      - name: Upload Pages artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: dist/

  deploy:
    name: Deploy to GitHub Pages
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}

    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

Guarda: `Ctrl + O` → `Enter` → `Ctrl + X`

> **¿Qué hace este workflow?**
> Cada vez que haces `git push` a `main`, GitHub lanza una máquina Ubuntu,
> instala Node y pnpm, construye tu sitio con Astro, genera el índice de
> búsqueda con Pagefind y publica el resultado en GitHub Pages. Tú no tocas
> nada de eso desde el celular.

### Activar GitHub Pages

1. Ve a tu repositorio en GitHub
2. Haz clic en **Settings** → **Pages**
3. En **Source** selecciona **GitHub Actions**
4. Guarda

---

## Parte 4 — Configuración básica del sitio

Hay tres archivos que debes editar antes de publicar.

### 4.1 Configuración principal

```bash
nano src/site.config.ts
```

Cambia estos valores:

| Campo | Qué poner |
|-------|-----------|
| `title` | El nombre de tu sitio |
| `description` | Una frase que describe tu sitio |
| `author` | Tu nombre o alias |
| `url` | `https://TUUSUARIO.github.io/mi-blog/` |
| `lang` | `"es-MX"` si tu sitio es en español |

> **Importante:** Si tu repositorio se llama `TUUSUARIO.github.io` (formato
> usuario.github.io), la URL es `https://TUUSUARIO.github.io` sin subdirectorio
> ni diagonal al final. Si tiene otro nombre, incluye el nombre del repo con
> diagonal al final.

Guarda: `Ctrl + O` → `Enter` → `Ctrl + X`

### 4.2 Links de redes sociales

```bash
nano src/components/SocialList.astro
```

Modifica el arreglo `socialLinks`:

```js
const socialLinks = [
  {
    friendlyName: "GitHub",
    link: "https://github.com/TUUSUARIO",
    name: "mdi:github",
  },
  {
    friendlyName: "YouTube",
    link: "https://youtube.com/@TUCANAL",
    name: "mdi:youtube",
  },
];
```

Los íconos disponibles los encuentras en [icones.js.org](https://icones.js.org/)
buscando el prefijo `mdi:`.

### 4.3 Favicon e imagen para redes sociales

Reemplaza estos dos archivos en `public/`:

- `public/icon.svg` — El ícono en la pestaña del navegador
- `public/social-card.png` — La imagen al compartir en redes (1200 × 630 px)

---

## Parte 5 — Crear contenido

### Estructura de carpetas

```
src/content/
├── post/     ← Artículos completos de blog
├── note/     ← Notas cortas y rápidas
└── tag/      ← Páginas de etiquetas personalizadas (opcional)
```

El nombre del archivo se convierte en la URL del post.

Ejemplo: `src/content/post/hola-mundo.md` → `tusitio.com/posts/hola-mundo/`

### Crear tu primer artículo

```bash
nano src/content/post/mi-primer-post.md
```

```markdown
---
title: "Mi Primer Artículo"
description: "Una descripción para SEO entre 50 y 160 caracteres. Esta aparece en Google."
publishDate: "2025-03-21"
tags: ["personal", "inicio"]
---

## Bienvenidos

Este es el primer artículo de mi blog...
```

### Todos los campos disponibles en el frontmatter

| Campo | Tipo | Requerido | Descripción |
|-------|------|-----------|-------------|
| `title` | string | Sí | Título del artículo (máx. 60 chars) |
| `description` | string | Sí | Descripción SEO (50–160 chars) |
| `publishDate` | fecha | Sí | Formato: `"2025-03-21"` |
| `updatedDate` | fecha | No | Fecha de última edición |
| `tags` | array | No | Etiquetas: `["tag1", "tag2"]` |
| `coverImage` | objeto | No | Imagen de portada |
| `ogImage` | string | No | URL de imagen para redes sociales |
| `draft` | boolean | No | `true` = no aparece publicado |
| `pinned` | boolean | No | `true` = fijado al inicio de la lista |

**Ejemplo completo:**

```markdown
---
title: "Configurar Flutter en Android con Termux"
description: "Guía paso a paso para configurar Flutter desde cero en Android sin necesitar computadora"
publishDate: "2025-03-21"
updatedDate: "2025-03-25"
tags: ["flutter", "android", "termux"]
coverImage:
  src: "./images/cover.jpg"
  alt: "Captura de la configuración de Flutter"
draft: false
pinned: true
---
```

> **Notas sobre los campos:**
> - `draft: true` — el post se sube al repo pero **no aparece** en el sitio publicado
> - Las etiquetas en `tags` se convierten automáticamente a minúsculas
> - `publishDate` en el futuro hace que el post no aparezca hasta esa fecha

### Crear una nota corta

```bash
nano src/content/note/primera-nota.md
```

```markdown
---
title: "Una nota rápida"
publishDate: "2025-03-21"
---

Solo quería dejar esto por aquí.
```

### Sistema de etiquetas automático

Cada etiqueta genera automáticamente una página en `tusitio.com/tags/nombre-tag/`.

Puedes personalizar esas páginas creando archivos en `src/content/tag/`:

```bash
nano src/content/tag/flutter.md
```

```markdown
---
title: "Flutter"
description: "Guías y tutoriales sobre desarrollo con Flutter"
---
```

---

## Parte 6 — Personalizar estilos de forma segura

La regla de oro: **nunca modifiques `@layer base`**. Todo lo tuyo va en
`@layer components` o en las variables de color.

```bash
nano src/styles/global.css
```

### Cambiar colores del tema

```css
@theme {
  --color-global-bg: oklch(98.48% 0 0);
  --color-global-text: oklch(26.99% 0.0096 235.05);
  --color-link: oklch(55.44% 0.0431 185.69);
  --color-accent: oklch(55.27% 0.195 19.06);
  --color-accent-2: oklch(18.15% 0 0);
  --color-quote: oklch(55.27% 0.195 19.06);
}
```

Para convertir tus colores a oklch usa [oklch.com](https://oklch.com).

### Agregar clases CSS propias

```css
@layer components {
  /* Tus clases van aquí, nunca serán tocadas al actualizar el tema */
  .mi-badge {
    @apply bg-accent text-white px-2 py-1 rounded-full text-sm;
  }
}
```

---

## Parte 7 — Autenticarse y subir a GitHub

GitHub ya no acepta contraseñas. Necesitas un **Personal Access Token**.

1. Ve a **github.com** → tu foto → **Settings**
2. Baja hasta **Developer settings** → **Personal access tokens** → **Tokens (classic)**
3. Clic en **Generate new token (classic)**
4. Nombre: `Termux Token`, permisos: marca **repo** completo
5. Clic en **Generate token** y **copia el token inmediatamente** — solo se muestra una vez

Para que Termux lo recuerde:

```bash
git config --global credential.helper store
```

### Primer push y deploy

```bash
git add .
git commit -m "Configuracion inicial del sitio"
git push origin main
```

La primera vez te pedirá usuario y contraseña. En contraseña pega el token.

Ve a la pestaña **Actions** de tu repositorio y verás el workflow corriendo.
En 3 a 5 minutos tu sitio estará publicado.

---

## Parte 8 — Flujo de trabajo diario

Para publicar cualquier cambio — un nuevo post, una edición, lo que sea:

```bash
git add .
git commit -m "Nuevo post: título del post"
git push origin main
```

GitHub Actions construye y despliega automáticamente. En menos de 5 minutos
el cambio está live.

### Guardar borradores sin publicar

Agrega `draft: true` al frontmatter:

```markdown
---
title: "Post que estoy escribiendo"
publishDate: "2025-03-21"
draft: true
---
```

El post se sube al repositorio pero no aparece en el sitio. Cuando lo termines
quita esa línea y haz push.

---

## Parte 9 — Mantener el tema actualizado

### Configurar el upstream (solo una vez)

```bash
git remote add upstream https://github.com/chrismwilliams/astro-theme-cactus.git
git remote -v
```

### Proceso de actualización

```bash
# 1. Guarda tus cambios
git add .
git commit -m "Mis cambios antes de actualizar"

# 2. Trae los cambios del tema original
git fetch upstream

# 3. Fusiona
git merge upstream/main

# 4. Sube — GitHub Actions instala dependencias nuevas automáticamente
git push origin main
```

> No necesitas correr `pnpm install` localmente. El workflow siempre instala
> las dependencias frescas en cada build desde el `pnpm-lock.yaml` del repo.

### Si hay conflictos

Casi siempre ocurren en `src/site.config.ts` o `package.json`, nunca en
`src/content/`.

Git marca los conflictos así:

```
<<<<<<< HEAD
Tu versión
=======
La versión del tema actualizado
>>>>>>> upstream/main
```

Edita el archivo, decide qué conservar, borra las marcas y luego:

```bash
git add archivo-resuelto.ts
git commit -m "Merge con upstream resuelto"
git push origin main
```

> **Regla de oro:** Nunca hagas clic en "Discard Changes" al sincronizar en
> GitHub. Perderías tus personalizaciones.

---

## Parte 10 — Workflows incluidos en el template

El template trae archivos en `.github/` que se ejecutan en tu repo:

| Archivo | Qué hace | Se ejecuta cuando |
|---------|----------|-------------------|
| `ci.yml` | Verifica TypeScript y que el build no truene | Cada push a main |
| `stale.yml` | Cierra issues/PRs inactivos | Todos los días automáticamente |
| `dependabot.yml` | Abre PRs con actualizaciones de dependencias | Cuando hay versiones nuevas |
| `deploy.yml` | **El que creaste** — construye y publica el sitio | Cada push a main |

Cuando haces push a `main` corren en paralelo `ci.yml` y `deploy.yml`.
Si `ci.yml` falla no detiene el deploy, son independientes.

`stale.yml` no sirve para un blog personal pero tampoco molesta, consumes
minutos mínimos de Actions.

---

## Referencia rápida de comandos

```bash
# Clonar el repo en un dispositivo nuevo
git clone https://github.com/TUUSUARIO/mi-blog.git

# Publicar cualquier cambio
git add .
git commit -m "Descripción del cambio"
git push origin main

# Actualizar el tema desde upstream
git fetch upstream
git merge upstream/main
git push origin main

# Configurar credenciales (una sola vez por dispositivo)
git config --global credential.helper store
```

---

## Solución de errores comunes

**El sitio muestra 404 en GitHub Pages**
Verifica que la `url` en `src/site.config.ts` coincida exactamente con tu URL
de GitHub Pages, incluyendo la diagonal final si tienes subdirectorio.

**Git pide contraseña en cada push**
```bash
git config --global credential.helper store
```

**El workflow falla en GitHub Actions**
Ve a la pestaña **Actions** de tu repo, haz clic en el workflow fallido y lee
el log. Astro indica exactamente qué archivo y línea tiene el error.

**El post no aparece en el sitio**
Revisa que no tenga `draft: true` y que `publishDate` no sea una fecha futura.

**La búsqueda no funciona en el sitio publicado**
Verifica que el paso `pnpm postbuild` esté en tu `deploy.yml`. Sin ese paso
Pagefind no genera el índice y la búsqueda no funciona.

---

## Archivos clave para memorizar

```
.github/workflows/deploy.yml    → El workflow que construye y publica el sitio
src/site.config.ts              → Configuración del sitio (título, URL, autor)
src/styles/global.css           → CSS personalizado (usa @layer components)
src/components/SocialList.astro → Links de redes sociales
src/content/post/               → Tus artículos de blog
src/content/note/               → Tus notas cortas
public/                         → Favicon, social card, imágenes estáticas
```

---

*Guía escrita para acompañar el video tutorial. Cualquier duda déjala en los comentarios.*