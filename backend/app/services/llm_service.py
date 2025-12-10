import google.generativeai as genai
from app.config import settings

class LLMService:
    def __init__(self):
        if not settings.GEMINI_API_KEY:
            raise ValueError("GEMINI_API_KEY no está configurada.")
        genai.configure(api_key=settings.GEMINI_API_KEY)
        
        # Modelos disponibles (listados previamente): gemini-3-pro-preview, gemini-2.5-flash, etc.
        self.model = genai.GenerativeModel('gemini-3-pro-preview')

    async def generate_summary(self, text: str) -> str:
        prompt = f"""
        Actúa como un experto académico e investigador experimentado. Tu tarea es generar un resumen altamente profesional, claro y estructurado del siguiente texto extraído de un documento PDF.

        El resumen debe estar en español y seguir estrictamente esta estructura:

        1. **Título del Documento** (Inferido o extraído)
        2. **Introducción:** Un párrafo conciso que explique el propósito y contexto del documento.
        3. **Puntos Clave:** Una lista con viñetas (bullet points) detallando los hallazgos, argumentos o temas más importantes.
        4. **Conclusión:** Un párrafo final que sintetice las implicaciones o resultados principales.

        El tono debe ser formal, objetivo y académico. Evita redundancias y asegúrate de que el contenido sea comprensible para una audiencia universitaria o profesional.
        
        Si el pdf sólo tiene imágenes, debes describir las imagenes del pdf en lugar de hacer un resumen.

        Texto a resumir:
        {text[:30000]}  # Limitamos caracteres para evitar exceder tokens si es muy largo, aunque Gemini maneja ventanas grandes.
        """
        
        response = self.model.generate_content(prompt)
        return response.text
