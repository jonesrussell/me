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

<Box title="Newsletter Signup" width={32}>
    <div class="newsletter-content">
        Stay updated with latest
        posts and projects.
        
        <div class="form-line">
            ┌────────────────────────┐
            │<input type="email" 
                   bind:value={email}
                   placeholder="Enter email"/>│
            └────────────────────────┘
            
            <button on:click={handleSubmit} disabled={submitting}>
                [{submitting ? '...' : 'Subscribe'}]
            </button>
        </div>

        {#if success}
            <div class="message success">✓ Thanks for subscribing!</div>
        {/if}

        {#if error}
            <div class="message error">✗ {error}</div>
        {/if}
    </div>
</Box>

<style>
    .newsletter-content {
        text-align: center;
        line-height: 1.5;
    }

    .form-line {
        margin-top: 2ch;
        white-space: pre;
    }

    input {
        font-family: inherit;
        padding: 0;
        border: none;
        background: transparent;
        color: var(--text-color);
        width: 20ch;
    }

    button {
        font-family: inherit;
        background: transparent;
        color: var(--text-color);
        border: none;
        cursor: pointer;
        padding: 1ch 0;
    }

    button:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }

    .message {
        margin-top: 2ch;
        white-space: pre;
    }

    .success { color: #22c55e; }
    .error { color: #ef4444; }
</style> 