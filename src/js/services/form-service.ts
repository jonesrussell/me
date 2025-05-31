export interface FormSchema {
  display: string;
  components: Array<{
    type: string;
    label: string;
    key: string;
    [key: string]: string | number | boolean | undefined;
  }>;
}

export interface FormData {
  email: string;
  [key: string]: string | number | boolean | undefined;
}

export class FormService {
  private static instance: FormService;
  private baseUrl: string;

  private constructor() {
    this.baseUrl = 'http://localhost:8090';
  }

  public static getInstance(): FormService {
    if (!FormService.instance) {
      FormService.instance = new FormService();
    }
    return FormService.instance;
  }

  async getSchema(formId: string): Promise<FormSchema> {
    const response = await fetch(`${this.baseUrl}/api/v1/forms/${formId}/schema`);
    if (!response.ok) {
      throw new Error("Failed to load form schema");
    }
    return response.json();
  }

  async submitForm(formId: string, data: FormData): Promise<Response> {
    const response = await fetch(`${this.baseUrl}/api/v1/forms/${formId}/submit`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Failed to submit form' }));
      throw new Error(error.message || 'Failed to submit form');
    }

    return response;
  }
}
