<script lang="ts">
    import Box from './Box.svelte';
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
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email })
            });

            if (!response.ok) throw new Error('Failed to subscribe');
            success = true;
            email = '';
        } catch (err) {
            error = 'Failed to subscribe. Please try again later.';
        } finally {
            submitting = false;
        }
    }
</script>

<section class="newsletter">
    <div class="newsletter-container">
        <Box title="Newsletter Signup" width={32}>
            <div class="newsletter-content">
                Stay updated with latest posts
                and projects.
                
                <form on:submit|preventDefault={handleSubmit}>
                    <div class="form-grid">
                        <input
                            type="email"
                            bind:value={email}
                            placeholder="Enter your email"
                            required
                            disabled={submitting}
                        />
                        <button type="submit" disabled={submitting}>
                            [{submitting ? '...' : 'Subscribe'}]
                        </button>
                    </div>
                </form>

                {#if success}
                    <pre class="message success">✓ Thanks for subscribing!</pre>
                {/if}

                {#if error}
                    <pre class="message error">✗ {error}</pre>
                {/if}
            </div>
        </Box>
    </div>
</section>

<style>
    .newsletter {
        font-family: var(--font-mono);
        padding: 2ch;
        margin: 2ch 0;
    }

    .newsletter-container {
        max-width: 40ch;
        margin: 0 auto;
        text-align: center;
    }

    .newsletter-content {
        text-align: center;
        line-height: 1.5;
    }

    .form-grid {
        display: grid;
        grid-template-columns: 1fr auto;
        gap: 1ch;
        margin-top: 2ch;
    }

    input {
        font-family: inherit;
        padding: 1ch;
        border: 1px solid var(--border-color);
        background: transparent;
        color: var(--text-color);
    }

    button {
        font-family: inherit;
        padding: 1ch;
        background: transparent;
        color: var(--text-color);
        border: none;
        cursor: pointer;
    }

    .message {
        margin-top: 2ch;
    }

    .success { color: #22c55e; }
    .error { color: #ef4444; }

    @media (max-width: 40ch) {
        .form-grid {
            grid-template-columns: 1fr;
        }
    }
</style> 