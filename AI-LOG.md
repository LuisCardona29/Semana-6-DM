# 🤖 AI-LOG — Semana 6

Bitácora del trabajo realizado en **RouteGo** con apoyo de herramientas de IA: qué se hizo, qué se verificó y qué quedó pendiente.

---

## 🎯 Objetivo

Implementar **permisos nativos funcionales** en Expo SDK 54 (ubicación y cámara) y el uso del **acelerómetro**, encapsulados en *custom hooks* tipados, con manejo claro de los tres estados de permiso: **concedido**, **rechazado** y **bloqueado**.

---

## 🧰 Uso de IA

| Aspecto | Detalle |
|---|---|
| Rol de la IA | Asistente para revisar la documentación de Expo SDK 54, proponer la estructura de los hooks, corregir la pestaña Rutas y redactar la documentación. |
| Rol propio | Decidir el flujo de permisos, probar en dispositivo físico, capturar la evidencia y validar el resultado. |
| Verificación | Todo lo propuesto se compiló, se pasó por lint y se probó en un dispositivo Android real antes de darlo por válido. |

---

## 🛠️ Trabajo realizado

### Hooks personalizados (`hooks/`)

- `useGeoLocation.ts`: permiso de ubicación, coordenadas, errores y *watcher* GPS.
- `useCamera.ts`: permiso de cámara, estados y acceso a Ajustes.
- `useShake.ts`: detección de sacudidas con el acelerómetro.
- Los tres están **tipados (sin `any`)** y exponen los errores como **estado** para la UI.

### Permisos

- La solicitud ocurre **por acción del usuario** (botones *Activar GPS* y *Solicitar permisos*), nunca al abrir la app.
- Los flujos de **ubicación y cámara están separados**: rechazar uno no afecta al otro.
- Se agregó el botón **Abrir Ajustes** cuando el permiso queda bloqueado.
- Se documentaron los estados concedido, rechazado y bloqueado con capturas y diagramas SVG.

### Pantalla Rutas

- Ahora permite **buscar** corredores y abrir **Ver detalles** (navega a `student/[id]`).
- Incluye mapa nativo con calles, paradas y recorrido destacado.
- Muestra pedidos en curso con estados `En camino`, `Listo` y `Demorado`.
- Los datos de demostración están ubicados en **Riohacha, La Guajira**.

### Limpieza de recursos

- GPS y acelerómetro **eliminan sus suscripciones al desmontar** el componente.

---

## ✅ Validación

### Verificaciones automáticas

| Comando | Resultado |
|---|---|
| `npm run lint` | ✅ Finaliza correctamente |
| `npx tsc --noEmit` | ✅ Finaliza correctamente |
| `npx expo start` | ✅ Metro inicia y genera el bundle |

### Pruebas en dispositivo físico (Android + Expo Go, SDK 54)

| Escenario | Resultado esperado | Resultado obtenido |
|---|---|---|
| Abrir la app | No se pide ningún permiso | ✅ Se cumple |
| Tocar **Activar GPS** | Aparece el diálogo nativo | ✅ Se cumple |
| Conceder ubicación | Se muestran coordenadas (`Lat 11.5373 / Lon -72.8991`) | ✅ Se cumple |
| Rechazar ubicación | La cámara sigue concedida y la app lo comunica | ✅ Se cumple |
| Bloquear ubicación | Aparece **Abrir Ajustes** | ✅ Se cumple |
| Sacudir el dispositivo | El contador de sacudidas aumenta | ✅ Se cumple |

La evidencia está en `assets/screenshots/` y se muestra en el `README.md`.

---

## ⚠️ Observaciones y pendientes

- En algunas capturas (`8.png`, `10.png`) la vista previa de la cámara aparece en negro aunque el permiso está concedido. Conviene reemplazarlas por capturas donde la imagen se vea correctamente.
- GPS, cámara y acelerómetro solo se pueden probar de forma fiable en **dispositivo físico**.
- Los datos de pedidos y rutas son **de demostración** (no provienen de un servidor real).

---

## 📌 Resultado

La app queda lista para demostrar navegación, GPS contextual, permisos nativos con sus tres estados y manejo de errores desde la interfaz, con hooks reutilizables y sin fugas de suscripciones.
