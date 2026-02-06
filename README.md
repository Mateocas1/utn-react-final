# Gestion de Productos - Trabajo Final React JS

Aplicacion web desarrollada con React JS como Trabajo Final Integrador del curso de React. Permite a los usuarios registrarse, iniciar sesion y gestionar un catalogo de productos mediante operaciones CRUD (Crear, Leer, Actualizar, Eliminar).

## Tecnologias Utilizadas

- **React JS 18** - Componentes, hooks (useState, useEffect, useContext)
- **Vite** - Build tool y servidor de desarrollo
- **React Router DOM v6** - Navegacion SPA y rutas protegidas
- **Firebase Authentication** - Registro e inicio de sesion
- **Firebase Firestore** - Base de datos NoSQL para productos
- **CSS Nativo** - Estilos modulares con Flexbox, mobile-first
- **Context API** - Estado global de autenticacion (AuthContext)

## Instalacion y Ejecucion Local

### Requisitos previos
- Node.js (v16 o superior)
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

3. Crear archivo `.env` en la raiz del proyecto con las credenciales de Firebase (ver `.env.example`):
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
│   ├── Navbar.jsx        # Barra de navegacion responsive
│   ├── PrivateRoute.jsx  # Proteccion de rutas privadas
│   ├── ProductCard.jsx   # Tarjeta individual de producto
│   ├── ProductForm.jsx   # Formulario crear/editar producto
│   └── ProductList.jsx   # Listado de productos
├── context/
│   ├── AuthContext.jsx    # Provider de autenticacion
│   └── AuthContextDef.js # Definicion del contexto
├── hooks/
│   └── useAuth.js        # Hook personalizado de autenticacion
├── pages/
│   ├── Login.jsx         # Pagina de inicio de sesion
│   ├── Register.jsx      # Pagina de registro
│   ├── Dashboard.jsx     # Panel principal con CRUD
│   └── About.jsx         # Pagina informativa
├── services/
│   ├── firebase.js       # Configuracion de Firebase
│   └── productService.js # Operaciones CRUD con Firestore
├── styles/               # Archivos CSS modulares
│   ├── Auth.css
│   ├── Navbar.css
│   ├── Dashboard.css
│   └── About.css
├── App.jsx               # Componente raiz con Router
├── App.css
├── main.jsx              # Punto de entrada con AuthProvider
└── index.css             # Estilos globales y reset
```

## Consideraciones de Desarrollo

- **AuthContext** se separo en tres archivos (AuthContextDef.js, AuthContext.jsx, useAuth.js) para resolver el warning de Fast Refresh de Vite que requiere que cada archivo exporte exclusivamente componentes o funciones.
- **Rutas protegidas**: el componente PrivateRoute verifica la autenticacion mediante useAuth() y redirige a /login si no hay sesion activa.
- **Persistencia de sesion**: onAuthStateChanged de Firebase mantiene la sesion activa al recargar la pagina.
- **Credenciales seguras**: las claves de Firebase se almacenan en variables de entorno (.env) excluidas del repositorio.
- **Responsive**: CSS nativo con Flexbox y enfoque mobile-first, incluyendo menu hamburguesa en el navbar para pantallas pequenas.
- **Commits progresivos**: el historial de commits refleja el desarrollo gradual del proyecto.
