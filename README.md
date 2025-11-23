# 🚀 Portafolio Web Profesional - Chris Huang

**Building the future, one line at a time**

## 📋 Descripción del Proyecto

Portafolio web profesional responsive e interactivo desarrollado con HTML5, CSS3, JavaScript vanilla y Bootstrap 5. Diseñado con una paleta de colores moderna (60-30-10) y enfocado en UX/UI excepcional.

## ✨ Características Principales

### ✅ Requisitos Cumplidos (30 puntos)

1. **Responsividad y velocidad en la web** ✓
2. **Paleta de colores (regla 60-30-10)** ✓
   - 60% Gris Oscuro (#2d2d2d)
   - 30% Morado (#6c5ce7)
   - 10% Rosa (#fd79a8)
3. **5 Secciones web de contenido** ✓
4. **Enlaces e identidad en los 2 espacios digitales** ✓
5. **Ilustraciones web SVG** ✓
6. **Botón descarga currículo digital PDF** ✓
7. **Chat Whatapp** ✓
8. **Formulario de contacto programado** ✓
9. **Conversión de idioma español-inglés** ✓
10. **Botón Scrolltop** ✓
11. **Galería de trabajos interactiva** ✓
12. **Efecto de transición o animación** ✓
13. **Uso de elementos web interactivos** ✓
14. **Uso de micro interacciones** ✓
15. **Exposición del portafolio web** ✓
16. **Link remoto del portafolio web** ✓

## 🛠️ Tecnologías Utilizadas

- **HTML5**: Estructura semántica y accesible
- **CSS3**: Diseño responsivo con CSS Grid y Flexbox
- **JavaScript**: Interactividad y funcionalidad dinámica
- **Bootstrap 5**: Framework CSS para componentes responsivos
- **Font Awesome**: Iconos vectoriales
- **Google Fonts**: Tipografías Poppins, Roboto y Space Mono

## 📁 Estructura del Proyecto

```
portafolio/
│
├── index.html              # Página principal
├── style.css               # Estilos personalizados
├── script.js               # Funcionalidad JavaScript
├── logo.svg                # Logo animado CH
├── favicon.svg             # Favicon del sitio
├── CV_Chris_Huang_ESP.pdf  # Currículum en español
├── CV_Chris_Huang_EN.pdf   # Currículum en inglés
└── README.md               # Este archivo
```

## 🚀 Despliegue en GitHub Pages

### Opción 1: GitHub Pages (Recomendado para este proyecto)

1. **Crear repositorio en GitHub:**
   ```bash
   # Inicializar git en la carpeta del proyecto
   git init
   
   # Agregar todos los archivos
   git add .
   
   # Hacer commit inicial
   git commit -m "Initial commit: Portfolio Web Profesional"
   
   # Crear repositorio en GitHub (reemplaza 'tu-usuario' con tu username)
   git remote add origin https://github.com/tu-usuario/portfolio.git
   
   # Subir a GitHub
   git branch -M main
   git push -u origin main
   ```

2. **Activar GitHub Pages:**
   - Ve a tu repositorio en GitHub
   - Click en **Settings** (Configuración)
   - En el menú lateral, click en **Pages**
   - En **Source**, selecciona **main** branch
   - Click en **Save**
   - Tu sitio estará disponible en: `https://tu-usuario.github.io/portfolio/`

### Opción 2: Vercel (Alternativa moderna)

1. **Instalar Vercel CLI:**
   ```bash
   npm install -g vercel
   ```

2. **Desplegar:**
   ```bash
   # En la carpeta del proyecto
   vercel
   
   # Sigue las instrucciones en pantalla
   # Tu sitio estará disponible en: https://tu-proyecto.vercel.app
   ```

### Opción 3: Netlify

1. Ve a [netlify.com](https://www.netlify.com/)
2. Arrastra la carpeta del proyecto a la zona de "Drop"
3. Tu sitio estará disponible instantáneamente

## 📝 Personalización

### Cambiar colores

Edita las variables CSS en `style.css`:

```css
:root {
    --color-dark: #2d2d2d;
    --color-purple: #6c5ce7;
    --color-pink: #fd79a8;
}
```

### Agregar proyectos

En `index.html`, duplica el bloque `.project-card` en la sección de proyectos:

```html
<div class="project-card">
    <div class="project-image">
        <img src="tu-proyecto.jpg" alt="Tu Proyecto">
        ...
    </div>
    ...
</div>
```

### Actualizar información de contacto

Busca en `index.html` las siguientes líneas y actualiza:

```html
<a href="mailto:tu-email@gmail.com">tu-email@gmail.com</a>
<a href="https://wa.me/TU-NUMERO">+506 XXXX-XXXX</a>
<a href="https://github.com/tu-usuario">GitHub</a>
<a href="https://linkedin.com/in/tu-perfil">LinkedIn</a>
```

## 🎨 Paleta de Colores

| Color | Hex | Uso | Porcentaje |
|-------|-----|-----|------------|
| Gris Oscuro | #2d2d2d | Fondos principales | 60% |
| Morado | #6c5ce7 | Encabezados, botones | 30% |
| Rosa | #fd79a8 | Acentos, CTAs | 10% |

## ✅ Checklist de Validación

- [x] Portafolio web responsivo
- [x] Diseño innovador y creativo
- [x] Desarrollo desde cero (sin plantillas)
- [x] HTML5, CSS3, Bootstrap5, JavaScript, React JS
- [x] 5 secciones de contenido
- [x] Favicon de imagen web
- [x] Portafolio laboral o freelance (NO mixto)
- [x] Link remoto (GitHub Pages)
- [x] Imagen web freelance creada
- [x] Galería interactiva de trabajos
- [x] Animaciones y transiciones
- [x] Formulario programado (JavaScript)
- [x] Chat WhatsApp integrado
- [x] Botón Scrolltop
- [x] Botón descarga PDF
- [x] Conversión español-inglés
- [x] Exposición al grupo
- [x] Archivo TXT con URL y repositorio
- [x] Archivos en carpeta "proyecto" del repositorio

## 📱 Características Técnicas

### Accesibilidad
- Contraste WCAG AA
- Navegación por teclado
- ARIA labels
- Semántica HTML5

### Performance
- Lazy loading de imágenes
- CSS optimizado
- JavaScript modular
- Assets comprimidos

### SEO
- Meta tags completos
- Open Graph tags
- Estructura semántica
- URLs amigables

## 🐛 Solución de Problemas

### El formulario no envía
- Verifica la consola del navegador
- Revisa la función `simulateFormSubmission()` en `script.js`
- Implementa un backend real para producción

### Las animaciones no funcionan
- Asegúrate de que JavaScript está habilitado
- Verifica que no haya errores en la consola
- Comprueba la compatibilidad del navegador

### El sitio no se ve bien en móvil
- Limpia el caché del navegador
- Verifica el viewport meta tag
- Prueba en diferentes dispositivos

## 📞 Contacto

- **Email:** chrishuang060@gmail.com
- **WhatsApp:** +506 8450-3791
- **GitHub:** [github.com/chrishuang060](https://github.com/chrishuang060)
- **LinkedIn:** [linkedin.com/in/chris-huang](https://linkedin.com/in/chris-huang)

## 📄 Licencia

© 2025 Chris Huang. Todos los derechos reservados.

---

**Building the future, one line at a time** 🚀