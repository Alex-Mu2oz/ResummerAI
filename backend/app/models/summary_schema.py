from pydantic import BaseModel

class SummaryResponse(BaseModel):
    summary_text: str
    pdf_download_url: str
    message: str = "Resumen generado exitosamente."
