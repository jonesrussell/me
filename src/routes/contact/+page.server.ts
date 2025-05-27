import type { Actions, PageServerLoad } from './$types';
import { fail } from '@sveltejs/kit';
import { z } from 'zod';

const contactSchema = z.object({
	name: z.string().min(2, 'Name must be at least 2 characters'),
	email: z.string().email('Please enter a valid email address'),
	message: z.string().min(10, 'Message must be at least 10 characters')
});

export const load: PageServerLoad = async () => {
	return {
		title: 'Contact Me',
		description: 'Get in touch with me for collaboration, questions, or just to say hello!'
	};
};

export const actions: Actions = {
	default: async ({ request }) => {
		const formData = await request.formData();
		const data = {
			name: formData.get('name'),
			email: formData.get('email'),
			message: formData.get('message')
		};

		try {
			const validatedData = contactSchema.parse(data);

			// TODO: Implement email sending logic here
			// For now, just simulate a delay and log the validated data
			console.log('Sending email with data:', validatedData);
			await new Promise(resolve => setTimeout(resolve, 1000));

			return {
				success: true,
				message: 'Thank you for your message! I will get back to you soon.'
			};
		} catch (error) {
			if (error instanceof z.ZodError) {
				return fail(400, {
					error: true,
					message: 'Please check your input and try again.',
					errors: error.errors.reduce((acc, err) => {
						acc[err.path[0]] = err.message;
						return acc;
					}, {} as Record<string, string>)
				});
			}

			return fail(500, {
				error: true,
				message: 'Something went wrong. Please try again later.'
			});
		}
	}
};
