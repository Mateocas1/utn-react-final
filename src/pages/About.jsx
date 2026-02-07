import '../styles/About.css'

function About() {
  return (
    <div className="about-container">
      <h1 className="about-title">Acerca del Proyecto</h1>

      <section className="about-section">
        <h2>Descripción General</h2>
        <p>
          Esta aplicación web fue desarrollada como Trabajo Final Integrador
          del curso de React JS. Consiste en un sistema de gestión de productos
          que permite a los usuarios registrarse, iniciar sesión y administrar
          un catálogo de productos mediante operaciones CRUD (Crear, Leer,
          Actualizar y Eliminar).
        </p>
      </section>

      <section className="about-section">
        <h2>Tecnologías Utilizadas</h2>
        <ul className="about-tech-list">
          <li><strong>React JS 19</strong> — Biblioteca principal para la interfaz de usuario</li>
          <li><strong>Vite</strong> — Herramienta de build y servidor de desarrollo</li>
          <li><strong>React Router DOM v7</strong> — Navegación SPA con rutas protegidas (createBrowserRouter)</li>
          <li><strong>Firebase Authentication</strong> — Registro e inicio de sesión de usuarios</li>
          <li><strong>Firebase Firestore</strong> — Base de datos NoSQL para almacenar productos</li>
          <li><strong>CSS Nativo Modular</strong> — Estilos por componente, breakpoints unificados</li>
          <li><strong>Context API</strong> — Estado global de autenticación (AuthContext)</li>
        </ul>
      </section>

      <section className="about-section">
        <h2>Estructura del Proyecto</h2>
        <pre className="about-structure">
{`src/
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
└── index.css             # Estilos globales y reset`}
        </pre>
      </section>

      <section className="about-section">
        <h2>Implementación del AuthContext</h2>
        <p>
          El manejo de sesión se implementa mediante <strong>React Context API</strong>,
          separando la lógica en tres archivos para cumplir con Fast Refresh:
        </p>
        <ul>
          <li>
            <strong>AuthContextDef.js</strong> — Define el contexto con{' '}
            <code>createContext()</code>, separado para evitar conflictos con
            Fast Refresh de Vite.
          </li>
          <li>
            <strong>AuthContext.jsx</strong> — Contiene el componente{' '}
            <code>AuthProvider</code> que envuelve toda la aplicación. Gestiona
            el estado del usuario con <code>useState</code> y escucha cambios
            de sesión con <code>onAuthStateChanged</code> de Firebase en un{' '}
            <code>useEffect</code>. Expone funciones de <code>login</code>,{' '}
            <code>register</code> y <code>logout</code>.
          </li>
          <li>
            <strong>useAuth.js</strong> — Hook personalizado que consume el
            contexto con <code>useContext</code>, permitiendo acceder al
            usuario y las funciones de autenticación desde cualquier componente.
          </li>
        </ul>
        <p>
          El componente <code>PrivateRoute</code> utiliza <code>useAuth()</code>{' '}
          para verificar si existe un usuario autenticado. Si no lo hay,
          redirige automáticamente a <code>/login</code> usando{' '}
          <code>Navigate</code> de React Router.
        </p>
      </section>

      <section className="about-section">
        <h2>Decisiones Técnicas</h2>
        <ul>
          <li>
            <strong>Vite sobre CRA:</strong> Se eligió Vite por su velocidad de
            build y Hot Module Replacement (HMR) instantáneo durante el
            desarrollo.
          </li>
          <li>
            <strong>Firestore sobre Realtime Database:</strong> Firestore
            ofrece queries más flexibles, mejor estructura de datos y
            documentación más actualizada.
          </li>
          <li>
            <strong>Productos como entidad:</strong> Se eligieron productos por
            tener campos variados (texto, número, categoría) que demuestran
            distintos tipos de inputs y validaciones.
          </li>
          <li>
            <strong>CSS Nativo con Flexbox:</strong> Se optó por CSS puro con
            enfoque mobile-first para cumplir con los requisitos del trabajo y
            demostrar manejo de layouts responsive sin dependencias externas.
          </li>
          <li>
            <strong>Separación del AuthContext:</strong> Se dividió en tres
            archivos (definición, provider, hook) para resolver el warning de
            Fast Refresh de Vite, que requiere que cada archivo exporte
            exclusivamente componentes o exclusivamente funciones.
          </li>
          <li>
            <strong>Router moderno:</strong> Se implementó el router moderno de
            React Router v7 con <code>createBrowserRouter</code>, permitiendo una
            configuración más sencilla y un manejo óptimo de rutas anidadas y
            carga de datos.
          </li>
        </ul>
      </section>

      <section className="about-section">
        <h2>Dificultades y Soluciones</h2>
        <ul>
          <li>
            <strong>Fast Refresh Warning:</strong> Al exportar el contexto y el
            provider desde el mismo archivo, Vite mostraba un warning. Se
            solucionó separando <code>createContext()</code> en su propio
            archivo (<code>AuthContextDef.js</code>).
          </li>
          <li>
            <strong>Persistencia de sesión:</strong>{' '}
            <code>onAuthStateChanged</code> resuelve la persistencia
            automáticamente, manteniendo la sesión activa al recargar la
            página.
          </li>
          <li>
            <strong>Protección de credenciales:</strong> Las claves de Firebase
            se almacenan en variables de entorno (<code>.env</code>) y se
            excluyen del repositorio mediante <code>.gitignore</code>.
          </li>
          <li>
            <strong>Responsive del Navbar:</strong> Se implementó un menú
            hamburguesa con CSS puro y un estado de React para controlar su
            visibilidad en pantallas pequeñas.
          </li>
        </ul>
      </section>
    </div>
  )
}

export default About
