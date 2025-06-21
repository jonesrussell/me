export type SubmitStatus = 'idle' | 'loading' | 'success' | 'error';

export interface NewsletterFormData {
  email: string;
}

export interface NewsletterResponse {
  success: boolean;
  message: string;
}
