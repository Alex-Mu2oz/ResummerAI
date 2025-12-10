from fastapi import APIRouter, UploadFile, File, HTTPException
from fastapi.responses import FileResponse
import os
from app.services.pdf_extractor import PDFExtractor
from app.services.llm_service import LLMService
from app.services.pdf_generator import PDFGenerator
from app.models.summary_schema import SummaryResponse

router = APIRouter()

@router.get("/download/{filename}")
async def download_pdf(filename: str):
    file_path = f"generated_pdfs/{filename}"
    if not os.path.exists(file_path):
        raise HTTPException(status_code=404, detail="Archivo no encontrado")
    return FileResponse(file_path, media_type='application/pdf', filename=filename)

@router.post("/summarize", response_model=SummaryResponse)
async def summarize_pdf(file: UploadFile = File(...)):
    if file.content_type != "application/pdf":
        raise HTTPException(status_code=400, detail="El archivo debe ser un PDF.")
    
    try:
        # 1. Extraer texto
        text_content = await PDFExtractor.extract_text(file)
        if not text_content.strip():
             raise HTTPException(status_code=400, detail="No se pudo extraer texto del PDF o el archivo está vacío.")

        # 2. Generar resumen con Gemini
        llm_service = LLMService()
        summary = await llm_service.generate_summary(text_content)

        # 3. Generar PDF con el resumen
        pdf_filename = PDFGenerator.generate_pdf(summary)
        
        # Construir URL de descarga (usando el nuevo endpoint de API para forzar descarga)
        download_url = f"/api/v1/download/{pdf_filename}"

        return SummaryResponse(
            summary_text=summary,
            pdf_download_url=download_url
        )

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error procesando el archivo: {str(e)}")
