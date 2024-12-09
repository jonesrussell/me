<script lang="ts">
    let email = '';
    let submitting = false;
    let error = '';
    let success = false;

    async function handleSubmit() {
        submitting = true;
        error = '';
        success = false;

        try {
            const response = await fetch('https://goforms.streetcode.net/api/subscriptions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email })
            });

            if (!response.ok) {
                throw new Error('Failed to subscribe');
            }

            success = true;
            email = '';
        } catch (err) {
            error = 'Failed to subscribe. Please try again later.';
        } finally {
            submitting = false;
        }
    }
</script>

<section class="my-8 max-w-xl mx-auto px-4">
    <div class="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg">
        <h2 class="text-xl font-bold mb-4 dark:text-white">Subscribe to my Newsletter</h2>
        <p class="mb-4 dark:text-gray-300">Stay updated with my latest posts and projects.</p>

        {#if success}
            <p class="text-green-600 dark:text-green-400 mb-4">Thanks for subscribing!</p>
        {/if}

        {#if error}
            <p class="text-red-600 dark:text-red-400 mb-4">{error}</p>
        {/if}

        <form on:submit|preventDefault={handleSubmit} class="flex gap-2">
            <input
                type="email"
                bind:value={email}
                placeholder="Enter your email"
                required
                class="flex-1 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white px-3 py-2 rounded focus:outline-none focus:border-blue-500 dark:focus:border-blue-400"
                disabled={submitting}
            />
            <button
                type="submit"
                class="bg-blue-600 px-4 py-2 text-white rounded hover:bg-blue-700 focus:outline-none disabled:opacity-50"
                disabled={submitting}
            >
                {submitting ? 'Signing up...' : 'Subscribe'}
            </button>
        </form>
    </div>
</section> 