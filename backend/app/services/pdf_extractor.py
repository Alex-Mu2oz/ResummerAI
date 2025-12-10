import io
from pypdf import PdfReader
from fastapi import UploadFile

class PDFExtractor:
    @staticmethod
    async def extract_text(file: UploadFile) -> str:
        content = await file.read()
        pdf_file = io.BytesIO(content)
        reader = PdfReader(pdf_file)
        text = ""
        for page in reader.pages:
            extracted = page.extract_text()
            if extracted:
                text += extracted + "\n"
        return text
