from sqlalchemy import Column, Integer, String, Boolean, Text, DateTime
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.sql import func

Base = declarative_base()

class EmailClassification(Base):
    __tablename__ = "email_classifications"

    id = Column(Integer, primary_key=True, index=True)
    original_text = Column(Text, nullable=False)
    classification = Column(String, nullable=False) # "Produtivo" ou "Improdutivo"
    suggested_respoonse = Column(Text, nullable=False)
    confidence_score = Column(String(10), nullable=True)
    processed_at = Column(DateTime(timezone=True), server_default=func.now())
    file_name = Column(String(255), nullable=True)
    is_from_file = Column(Boolean, default=False)

    def __repr__(self):
        return f"<EmailClassification(id={self.id}, classification='{self.classifcation}')>"
