# 📘 ResummerAI - Manual de Usuario

Bienvenido a **ResummerAI**, tu asistente inteligente para la generación de resúmenes académicos. Esta herramienta te permite procesar documentos PDF o texto plano y obtener resúmenes estructurados, profesionales y listos para descargar.

---

## 🚀 Características Principales

*   **Subida de Archivos PDF:** Arrastra y suelta tus documentos académicos para un análisis instantáneo.
*   **Entrada de Texto Manual:** Pega cualquier texto directamente en la aplicación; nosotros lo convertimos y procesamos automáticamente.
*   **Resúmenes Estructurados:** Obtén resultados con Título, Introducción, Puntos Clave y Conclusión.
*   **Descarga de PDF:** Genera y descarga un archivo PDF con el resumen formateado.
*   **Interfaz Moderna:** Diseño limpio, intuitivo y responsivo.

---

## 🛠️ Requisitos Previos

Antes de comenzar, asegúrate de tener instalado:
*   **Python 3.9+**
*   **Node.js 18+**
*   **Una API Key de Google Gemini** (Gratuita o de pago)

---

## ⚙️ Instalación y Configuración

Sigue estos pasos para poner en marcha el sistema en tu máquina local.

### 1. Configuración del Backend (Servidor)

El backend es el cerebro de la aplicación, encargado de procesar los archivos y conectar con la IA.

1.  Navega a la carpeta del backend:
    ```bash
    cd backend
    ```
2.  (Opcional) Crea un entorno virtual:
    ```bash
    python -m venv venv
    # En Windows:
    venv\Scripts\activate
    # En Mac/Linux:
    source venv/bin/activate
    ```
3.  Instala las dependencias:
    ```bash
    pip install -r requirements.txt
    ```
4.  Configura tu API Key:
    *   Crea un archivo llamado `.env` en la carpeta `backend/`.
    *   Añade tu clave de la siguiente manera:
        ```env
        GEMINI_API_KEY=tu_clave_secreta_aqui
        ```
5.  Inicia el servidor:
    ```bash
    python main.py
    ```
    *El servidor iniciará en `http://localhost:8000`*

### 2. Configuración del Frontend (Interfaz)

La interfaz visual donde interactuarás con la herramienta.

1.  Abre una nueva terminal y navega a la carpeta del frontend:
    ```bash
    cd frontend
    ```
2.  Instala las dependencias:
    ```bash
    npm install
    ```
3.  Inicia la aplicación:
    ```bash
    npm run dev
    ```
    *La aplicación estará disponible en `http://localhost:5173` (o el puerto que indique la terminal)*

---

## 📖 Guía de Uso

### Opción A: Resumir un Archivo PDF

1.  Abre la aplicación en tu navegador.
2.  Asegúrate de estar en la pestaña **"Subir PDF"**.
3.  Arrastra tu archivo al recuadro punteado o haz clic en él para buscarlo en tu computador.
4.  Haz clic en el botón **"Generar Resumen"**.
5.  Espera unos segundos mientras la IA procesa tu documento.
6.  ¡Listo! Lee el resumen en pantalla o haz clic en **"Descargar PDF"** para guardarlo.

### Opción B: Resumir Texto Manual

1.  Haz clic en la pestaña **"Pegar Texto"**.
2.  Escribe o pega el contenido que deseas resumir en el área de texto.
3.  Haz clic en **"Generar Resumen"**.
    *   *Nota: El sistema convertirá internamente tu texto a un documento PDF temporal para procesarlo con la misma calidad.*
4.  Visualiza y descarga tu resultado.

---

## 🧩 Arquitectura del Sistema

ResummerAI está construido siguiendo principios de software robustos:

*   **Backend (FastAPI):** Estructura MVC (Modelo-Vista-Controlador) con principios SOLID.
    *   **Controladores:** Manejan las peticiones web.
    *   **Servicios:** Lógica de negocio separada (Extracción PDF, Conexión LLM, Generación PDF).
    *   **Modelos:** Definición estricta de datos.
*   **Frontend (React + Vite):** Componentes funcionales modernos estilizados con Tailwind CSS.

---

## 🆘 Solución de Problemas

*   **Error "404 Not Found" en el backend:**
    *   Verifica que tu API Key sea correcta.
    *   Asegúrate de que el modelo configurado en `backend/app/services/llm_service.py` esté disponible para tu cuenta (por defecto usa `gemini-3-pro-preview` o `gemini-1.5-pro`).
*   **Error de conexión en el frontend:**
    *   Asegúrate de que el backend esté ejecutándose en el puerto 8000.

---

*Desarrollado con ❤️ por ResummerAI Team*
