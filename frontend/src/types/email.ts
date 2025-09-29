export interface ClassificationResult {
    id: number;
    classification: "Produtivo" | "Improdutivo";
    suggested_response: string;
    confidence: "Alta" | "Média" | "Baixa";
    processed_at: string; 
}

export interface EmailFormData {
    file?: File;
    text?: string;
}