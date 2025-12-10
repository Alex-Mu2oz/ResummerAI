from fpdf import FPDF
import uuid
import os
import re

class PDFGenerator:
    OUTPUT_DIR = "generated_pdfs"

    @staticmethod
    def generate_pdf(summary_text: str) -> str:
        pdf = FPDF()
        pdf.add_page()
        pdf.set_font("Helvetica", size=12)
        
        # Title
        pdf.set_font("Helvetica", style="B", size=16)
        pdf.cell(0, 10, "Resumen Académico Generado por ResummerAI", new_x="LMARGIN", new_y="NEXT", align="C")
        pdf.ln(10)
        
        # Body
        pdf.set_font("Helvetica", size=12)
        # Limpiar Markdown manualmente para asegurar que no se vean asteriscos si el parser falla
        # 1. Eliminar negritas (**Texto**) dejando solo Texto
        clean_text = re.sub(r'\*\*(.*?)\*\*', r'\1', summary_text)
        # 2. Reemplazar bullets (* Elemento) por guiones (- Elemento) para mejor lectura en PDF
        clean_text = re.sub(r'^\* ', r'- ', clean_text, flags=re.MULTILINE)
        
        # Encode to latin-1 to handle spanish characters compatible with core fonts
        text_normalized = clean_text.encode('latin-1', 'replace').decode('latin-1')
        
        # Usamos multi_cell estándar con el texto limpio
        pdf.multi_cell(0, 10, text_normalized)
        
        filename = f"{uuid.uuid4()}.pdf"
        filepath = os.path.join(PDFGenerator.OUTPUT_DIR, filename)
        
        # Ensure directory exists (redundant if created, but safe)
        os.makedirs(PDFGenerator.OUTPUT_DIR, exist_ok=True)
        
        pdf.output(filepath)
        return filename
