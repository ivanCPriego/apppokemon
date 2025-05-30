# Buscador de Pokémon

Una aplicación web desarrollada en Angular que permite buscar información sobre Pokémon utilizando la [PokeAPI](https://pokeapi.co/).

## Requisitos Previos

- Node.js (v22.1.0 o superior)
- npm (v10.8.1 o superior)
- Angular CLI (v20.0.0)

## Tecnologías Principales

- Angular: 20.0.0
- RxJS: 7.8.2
- TypeScript: 5.8.3

## Instalación

1. Clonar el repositorio
```bash
git clone https://github.com/ivanCPriego/apppokemon
cd apppokemon
```

2. Instalar dependencias
```bash
npm install
```

3. Iniciar el servidor de desarrollo
```bash
ng serve
```

La aplicación estará disponible en `http://localhost:4200/`

## Características

- 🔍 Búsqueda en tiempo real de Pokémon
- ⏳ Debounce de 300ms en las búsquedas para optimizar las peticiones
- 💾 Caché de búsquedas recientes usando sessionStorage
- 🛡️ Validación y sanitización de entrada
- 🚦 Manejo de estados de carga y errores
- 📱 Diseño responsive

## Arquitectura

La aplicación está estructurada siguiendo las mejores prácticas de Angular:

### Componentes Principales

- `AppComponent`: Componente raíz que proporciona el layout principal
- `PokemonSearchComponent`: Maneja la interfaz de búsqueda y muestra resultados
- `StatusMessageComponent`: Componente reutilizable para mostrar mensajes de estado

### Servicios

- `PokemonService`: 
  - Gestiona las llamadas a la PokeAPI
  - Implementa la lógica de caché
  - Maneja la sanitización de datos
  - Gestiona el estado de la aplicación

### Características Técnicas

- Implementación de RxJS para manejo de flujos asíncronos
- Uso de operadores como debounceTime para optimizar búsquedas
- Implementación de interceptores HTTP para manejo de errores
- Sistema de caché para optimizar rendimiento
- Pruebas unitarias completas

## Pruebas

Para ejecutar las pruebas unitarias:

```bash
ng test --no-watch --browsers ChromeHeadless
```

Las pruebas cubren:
- Componentes principales

## Estructura de Directorios

```
src/
├── app/
│   ├── components/
│   │   ├── pokemon-search/
│   │   └── status-message/
│   ├── services/
│   │   └── pokemon.service.ts
│   ├── models/
│   │   └── pokemon.model.ts
│   ├── app.ts
│   └── app.config.ts
├── assets/
└── styles/
```
