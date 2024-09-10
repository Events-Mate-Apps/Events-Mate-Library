interface Window {
  AppleID: any;
  gtag: any;
}

interface CustomError {
  errorCode: number;
  message?: string;
  raw?: {
    code: string;
    error: string;
    message: string;
    statusCode: number;
  }
}