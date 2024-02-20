export enum AppServiceType {
    CHAT_PDF = "chat_pdf",
}

export interface CheckChatPdfLimitResponse {
    currentPlan: any;
    hasRequest: boolean;
    currentLimit: any;

}
