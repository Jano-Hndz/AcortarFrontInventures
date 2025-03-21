# URL Shortener - Frontend

Este es el frontend de un servicio de acortamiento de URLs, diseñado para permitir a los usuarios generar URLs cortas y hacer seguimiento de su uso.

## 🌍 URL del Proyecto
El proyecto está desplegado en Vercel y puede ser accedido en el siguiente enlace:

🔗 [URL Shortener - Frontend](https://acortar-front-inventures.vercel.app/)

## 📌 Funcionalidades

- **Acortamiento de URLs**: Permite ingresar una URL larga y obtener una versión corta.
- **Uso sin sesión**: Los usuarios pueden acortar URLs sin necesidad de iniciar sesión, pero no podrán monitorearlas.
- **Panel de control para usuarios registrados**:
  - Monitoreo de URLs acortadas (cantidad de vistas, fecha de expiración, etc.).
  - Opción para renovar el período de expiración de una URL.
  - Posibilidad de eliminar URLs antes de su expiración.
- **Gestión de URLs**: Cada URL tiene una expiración de 3 días por defecto, pero los usuarios pueden renovarla.

## 🛠️ Tecnologías Utilizadas

- **Frontend**: React con Material UI.
- **Despliegue**: Vercel.

## 🚀 Instalación y Configuración

### 🔧 Requisitos Previos
- Node.js y npm instalados en el sistema.

### 📥 Instalación
Clona el repositorio y accede a la carpeta del proyecto:

```sh
  git clone <URL_DEL_REPO>
  cd nombre-del-proyecto
  npm install
```
### ▶️ Ejecución en Desarrollo
Para iniciar el proyecto en modo desarrollo:

```sh
npm run dev
```

### 🏗️ Construcción para Producción

```sh
npm run build
```

## 🔑 Credenciales de Prueba
Si deseas probar el panel de control de usuarios registrados, puedes usar las siguientes credenciales:

**Correo**: alejandro@correo.com  
**Contraseña**: 123456

## ❗ Notas Importantes
- No hubo tiempo suficiente para ocultar las variables de entorno en el código fuente, por lo que fueron configuradas directamente en producción.
- Los usuarios no autenticados pueden acortar URLs pero no tendrán acceso al monitoreo ni gestión de sus URLs.
- Los usuarios registrados pueden gestionar sus URLs, renovarlas y eliminarlas antes de la expiración.


