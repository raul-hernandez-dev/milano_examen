# Gestión de Manifiestos

Este proyecto es parte de una prueba técnica para la vacante de Desarrollador Web Front End JR en la empresa **CEDIS MILANO**. Consiste en una aplicación web desarrollada en Angular para la gestión de manifiestos de transporte, consumiendo una API REST para realizar operaciones CRUD completas.

---

## Descripción

La aplicación permite visualizar, crear, editar y eliminar registros de manifiestos de transporte. Cada manifiesto contiene información sobre el transportista, chofer, tipo de vehículo, placas, destino y estatus del viaje. La interfaz presenta una tabla de registros y un modal para el alta y edición de datos.

---

## Tecnologías utilizadas

- Angular 19+ (Standalone Components)
- TypeScript
- HTML5 y CSS3
- HttpClient para consumo de API REST

---

## Funcionalidades

- Listado de todos los manifiestos al iniciar la aplicación
- Búsqueda de manifiesto por ID en tiempo real
- Filtrado por estatus (Pendiente, Autorizado, En Ruta, Completado, Cancelado)
- Filtrado por destino
- Combinación de filtros activos simultáneamente
- Limpiar todos los filtros con un solo clic
- Crear nuevo manifiesto mediante modal (botón o tecla F2)
- Editar manifiesto existente desde la tabla
- Eliminar manifiesto con confirmación
- Validación de campos obligatorios en el formulario
- Cierre de modal con tecla Escape o clic en el overlay
- Atajo de teclado F3 para enfocar la búsqueda por ID
- Badges de color por estatus

---

## Estructura del proyecto

```
src/
├── styles.css
└── app/
    ├── app.component.ts
    ├── models/
    │   └── manifiesto.model.ts
    ├── services/
    │   └── manifiestos.service.ts
    └── components/
        ├── manifiesto-form/
        │   ├── manifiesto-form.component.ts
        │   ├── manifiesto-form.component.html
        │   └── manifiesto-form.component.css
        └── manifiestos-tabla/
            ├── manifiestos-tabla.component.ts
            ├── manifiestos-tabla.component.html
            └── manifiestos-tabla.component.css
```

---

## Endpoints de la API

Base URL: `https://carlosjamaica.com/desarrollo/funnels/api-v2/prueba.php`

| Método | Acción | Descripción |
|--------|--------|-------------|
| GET | `/prueba.php` | Obtiene todos los manifiestos |
| GET | `/prueba.php?id={id}` | Obtiene un manifiesto por ID |
| GET | `/prueba.php?estatus` | Obtiene el catálogo de estatus |
| GET | `/prueba.php?destino` | Obtiene el catálogo de destinos |
| POST | `action: "create"` | Crea un nuevo manifiesto |
| POST | `action: "update"` | Actualiza un manifiesto existente |
| POST | `action: "delete"` | Elimina un manifiesto por ID |

---

## Instalación y uso

### Requisitos previos

- Node.js 18 o superior
- Angular CLI instalado globalmente

```bash
npm install -g @angular/cli
```

### Pasos para ejecutar el proyecto

1. Clona el repositorio:

```bash
git clone https://github.com/raul-hernandez-dev/milano_examen.git
cd tu-repositorio
```

2. Instala las dependencias:

```bash
npm install
```

3. Inicia el servidor de desarrollo:

```bash
ng serve
```

4. Abre el navegador en `http://localhost:4200`

---

## Atajos de teclado

| Tecla | Acción |
|-------|--------|
| F2 | Abre el modal para crear un nuevo manifiesto |
| F3 | Enfoca el campo de búsqueda por ID |
| Escape | Cierra el modal sin guardar cambios |

---

## Autor

Desarrollado como prueba técnica para la vacante de Desarrollador Front End en **CEDIS MILANO**.