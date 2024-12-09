<script lang="ts">
    import Box from '$lib/components/Box.svelte';
</script>

<svelte:head>
    <title>Russell Jones | Web Developer</title>
</svelte:head>

<Box width={60} title="Welcome">
    <div class="welcome">
        <h1>Russell Jones</h1>
        <p>Web Developer & Open Source Enthusiast</p>
    </div>
</Box>

<style>
    .welcome {
        text-align: center;
        line-height: 1.2;
    }

    h1 {
        margin: 0 0 var(--ch2) 0;
    }

    p {
        margin: 0;
        color: var(--text-muted);
    }
</style>