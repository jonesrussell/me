import { config } from '$lib/config/env';

interface FormSchema {
  display: string;
  components: Array<{
    type: string;
    label: string;
    key: string;
    [key: string]: string | number | boolean | undefined;
  }>;
}

interface FormData {
  email?: string;
  [key: string]: string | number | boolean | undefined;
}

interface FormSubmissionResponse {
  success: boolean;
  message?: string;
  submission_id?: string;
  errors?: Record<string, string>;
}

export class FormService {
  private static instance: FormService;
  private baseUrl: string;
  private apiKey: string;

  private constructor() {
    this.baseUrl = config.goformsApiUrl;
    this.apiKey = config.goformsApiKey;
  }

  public static getInstance(): FormService {
    if (!FormService.instance) {
      FormService.instance = new FormService();
    }
    return FormService.instance;
  }

  private getHeaders(): HeadersInit {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    };

    if (this.apiKey) {
      headers['X-API-Key'] = this.apiKey;
    }

    return headers;
  }

  async getSchema(formId: string): Promise<FormSchema> {
    const response = await fetch(`${this.baseUrl}/forms/${formId}/schema`, {
      headers: this.getHeaders()
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Failed to load form schema' }));
      throw new Error(error.message || 'Failed to load form schema');
    }

    return response.json();
  }

  async submitForm(formId: string, data: FormData): Promise<FormSubmissionResponse> {
    const response = await fetch(`${this.baseUrl}/forms/${formId}/submit`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Failed to submit form' }));
      throw new Error(error.message || 'Failed to submit form');
    }

    return response.json();
  }
}
