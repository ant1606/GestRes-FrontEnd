# Nombre del Proyecto

Descripción corta del proyecto.

## Instalación

Asegúrate de tener Node.js y npm instalados en tu máquina.

# Arquitectura del Proyecto

## Estructura de Carpetas

La estructura de carpetas sigue las siguientes convenciones:

- `/src`: Contiene el código fuente de la aplicación.
  - `/assets`: Archivos estáticos como imágenes y estilos.
  - `/components`: Componentes reutilizables.
  - `/config`: Configuraciones globales.
  - `/hooks`: Ganchos personalizados.
  - `/pages`: Páginas principales de la aplicación.
  - `/redux`: Lógica de Redux y almacenamiento de estado.
  - `/routers`: Configuración de rutas.
  - `/services`: Llamadas a la API y servicios.
  - `/tests`: Pruebas de la aplicación.
  - `/types`: Tipos TypeScript.
  - `/utilities`: Funciones de utilidad.

## Arquitectura FrontEnd

- Uso de Redux para el estado global.
- Componentes funcionales y ganchos para la lógica de presentación.
- Separación clara entre componentes, páginas y servicios.
- Rutas gestionadas con React Router.

## Convenciones de Codificación

- Uso de TypeScript para una tipificación fuerte.
- Convenciones de nombres en formato camelCase.
- Estilo de código siguiendo las reglas de eslint.

## Tecnologías Utilizadas

- React
- TypeScript
- Redux
- React Router
- Eslint
- Tailwind CSS

# Instalando react-paginate

- docker run -it --rm --name myappnode -v "$PWD":/usr/src/app -w /usr/src/app node:16-alpine3.16 npm install react-paginate --save

# Instalando animate.css

- docker run -it --rm --name myappnode -v "$PWD":/usr/src/app -w /usr/src/app node:16-alpine3.16 npm install animate.css --save
