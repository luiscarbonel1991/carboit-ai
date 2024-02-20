export type PDFChat = {
    userId: string;
    id: number;
    pdfName: string;
    pdfUrl: string;
    createdAt: Date;
    fileKey: string;
    nameSpace: string;
}

export type PDFChatMessage = {
    id: number;
    pdfChatId: number;
    message: string;
    createdAt: Date;
    role: string;
}