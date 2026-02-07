# Gestión de Productos - Trabajo Final React JS

Aplicación web desarrollada con React JS como Trabajo Final Integrador del curso. Permite a los usuarios registrarse, iniciar sesión y gestionar un catálogo de productos mediante operaciones CRUD (Crear, Leer, Actualizar, Eliminar).

## Link de Producción

[https://utn-react-final.vercel.app](https://utn-react-final.vercel.app)

## Tecnologías Utilizadas

- **React JS 19** - Componentes, hooks (useState, useEffect, useContext)
- **Vite** - Build tool y servidor de desarrollo
- **React Router DOM v7** - Navegación SPA y rutas protegidas (createBrowserRouter)
- **Firebase Authentication** - Registro e inicio de sesión
- **Firebase Firestore** - Base de datos NoSQL para productos
- **CSS Nativo Modular** - Estilos por componente, breakpoints unificados
- **Context API** - Estado global de autenticación (AuthContext)

## Instalación y Ejecución Local

### Requisitos previos
- Node.js (v18 o superior)
- npm
- Cuenta de Firebase con proyecto configurado

### Pasos

1. Clonar el repositorio:
```bash
git clone <url-del-repositorio>
cd final
```

2. Instalar dependencias:
```bash
npm install
```

3. Crear archivo `.env` en la raíz del proyecto con las credenciales de Firebase (ver `.env.example`):
```
VITE_FIREBASE_API_KEY=tu-api-key
VITE_FIREBASE_AUTH_DOMAIN=tu-proyecto.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=tu-proyecto
VITE_FIREBASE_STORAGE_BUCKET=tu-proyecto.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123456789:web:abcdef
```

4. Ejecutar en modo desarrollo:
```bash
npm run dev
```

5. Abrir en el navegador: `http://localhost:5173`

## Estructura del Proyecto

```
src/
├── components/           # Componentes reutilizables
│   ├── Navbar.jsx        # Barra de navegación responsive
│   ├── PrivateRoute.jsx  # Protección de rutas privadas
│   ├── ProductCard.jsx   # Tarjeta individual de producto
│   ├── ProductForm.jsx   # Formulario crear/editar producto
│   ├── ProductList.jsx   # Listado de productos
│   └── AuthForm.jsx      # Formulario unificado Login/Register
├── context/
│   ├── AuthContext.jsx    # Provider de autenticación
│   └── AuthContextDef.js # Definición del contexto
├── hooks/
│   └── useAuth.js        # Hook personalizado de autenticación
├── pages/
│   ├── Login.jsx         # Página de inicio de sesión
│   ├── Register.jsx      # Página de registro
│   ├── Dashboard.jsx     # Panel principal con CRUD
│   └── About.jsx         # Página informativa
├── services/
│   ├── firebase.js       # Configuración de Firebase
│   └── productService.js # Operaciones CRUD con Firestore
├── styles/               # Archivos CSS modulares
│   ├── Auth.css
│   ├── Navbar.css
│   ├── Dashboard.css
│   ├── ProductForm.css
│   ├── ProductCard.css
│   ├── ProductList.css
│   ├── shared.css
│   └── breakpoints.css
├── App.jsx               # Componente raíz con RouterProvider
├── App.css
├── main.jsx              # Punto de entrada con AuthProvider
└── index.css             # Estilos globales y reset
```

## Consideraciones de Desarrollo

- **AuthContext** se separó en tres archivos (AuthContextDef.js, AuthContext.jsx, useAuth.js) para resolver el warning de Fast Refresh de Vite.
- **Rutas protegidas**: PrivateRoute verifica autenticación mediante useAuth() y redirige a /login si no hay sesión activa.
- **Persistencia de sesión**: onAuthStateChanged de Firebase mantiene la sesión activa al recargar la página.
- **Credenciales seguras**: claves de Firebase en variables de entorno (.env) excluidas del repositorio.
- **Responsive**: CSS modular por componente, breakpoints unificados, menú hamburguesa en el navbar.
- **Commits progresivos**: historial de commits refleja el desarrollo gradual.
- **RouterProvider**: migración a createBrowserRouter y rutas anidadas.
- **404**: página no encontrada incluida en el router.
