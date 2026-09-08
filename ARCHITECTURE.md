# Arquitectura de RouteGo

## 1. Estructura implementada

### Wireframe del mapa de navegación

```text
Stack raíz
│
├── Tabs
│   ├── Inicio ──────────────► Rutas
│   │      │                     │
│   │      └── Perfil ───────────┘
│   ├── Rutas
│   └── Mi pase
│
├── student/[id]  (detalle de estudiante)
└── modal         (estado del servicio)
```

```text
app/
├── _layout.tsx             # Stack raíz
├── modal.tsx               # Modal: estado del servicio
├── student/
│   └── [id].tsx            # Stack: detalle dinámico de estudiante
└── (tabs)/
    ├── _layout.tsx         # Navegación por pestañas
    ├── index.tsx           # Inicio / próximos shuttles
    ├── routes.tsx          # Consulta y búsqueda de rutas
    └── pass.tsx            # Pase digital
```

La navegación combina un `Stack` raíz con tres pestañas. Las pantallas que forman la navegación habitual (`Inicio`, `Rutas` y `Mi pase`) viven dentro del grupo `(tabs)`. El perfil del estudiante se abre fuera de las pestañas como detalle en el Stack y recibe su identificador mediante la ruta `/student/[id]`. La pantalla `modal.tsx` se presenta como modal para comunicar el estado global del servicio.

Esta estructura cumple con el objetivo del ejercicio: incluye tres pantallas principales conectadas, Tabs con más de dos pestañas, Stack/modal y una ruta dinámica que visualiza el parámetro `id`.

## 2. Alternativa recomendada: feature-first

Expo Router necesita conservar los archivos de `app/` para definir URLs y navegadores. Sin embargo, cuando la aplicación crezca, la lógica y los componentes no deberían concentrarse en esas rutas. Una organización feature-first podría ser:

```text
app/
├── _layout.tsx
├── modal.tsx
├── student/[id].tsx
└── (tabs)/
    ├── _layout.tsx
    ├── index.tsx
    ├── routes.tsx
    └── pass.tsx

features/
├── home/
│   ├── HomeScreen.tsx
│   ├── components/ShuttleCard.tsx
│   └── data/shuttles.ts
├── routes/
│   ├── RoutesScreen.tsx
│   ├── components/RouteCard.tsx
│   └── data/routes.ts
├── student/
│   ├── StudentDetailScreen.tsx
│   └── components/ProfileRow.tsx
└── pass/
    ├── PassScreen.tsx
    └── components/DigitalPass.tsx

components/
└── ui/                     # Componentes genéricos reutilizables
```

En esta alternativa, cada archivo dentro de `app/` sería pequeño: importaría y renderizaría la pantalla correspondiente desde `features/`. Los componentes, datos simulados, tipos, peticiones y pruebas de cada funcionalidad quedarían juntos.

## 3. Comparación

| Aspecto | Estructura actual (route-first) | Alternativa feature-first |
| --- | --- | --- |
| Comprensión inicial | Muy directa; cada archivo representa una pantalla/ruta. | Requiere conocer la capa `app/` y la carpeta de cada funcionalidad. |
| Adecuada para | Talleres, prototipos y aplicaciones pequeñas. | Productos con varias pantallas, servicios y equipos. |
| Reutilización | Puede terminar duplicando tarjetas, datos y estilos entre rutas. | Los componentes y la lógica viven junto a su funcionalidad y se reutilizan con facilidad. |
| Escalabilidad | Las rutas pueden volverse largas y con demasiada lógica visual. | Cada dominio crece de manera aislada y es más fácil de mantener. |
| Expo Router | Aprovecha completamente la convención de archivos. | Conserva Expo Router, separando rutas de la lógica de negocio. |

## 4. Decisión

Para el alcance actual, la estructura route-first es apropiada: hace visible el mapa de navegación y facilita comprobar los requisitos del ejercicio. Si RouteGo incorporara autenticación, geolocalización real, notificaciones, historial de viajes o una API, convendría migrar gradualmente a feature-first. La primera extracción recomendada sería crear `features/routes/` para separar las tarjetas de ruta y la fuente de datos de la pantalla `app/(tabs)/routes.tsx`.
