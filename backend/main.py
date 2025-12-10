from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
from app.controllers import summary_controller
from app.config import settings
import os

app = FastAPI(title=settings.PROJECT_NAME, version=settings.VERSION)

# Configurar CORS (Permitir todo por ahora para facilitar desarrollo)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Crear directorio de PDFs si no existe (seguridad extra)
os.makedirs("generated_pdfs", exist_ok=True)

# Montar directorio para descargas
app.mount("/downloads", StaticFiles(directory="generated_pdfs"), name="downloads")

# Incluir rutas
app.include_router(summary_controller.router, prefix="/api/v1", tags=["summary"])

@app.get("/")
def read_root():
    return {"message": f"Welcome to {settings.PROJECT_NAME}"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
