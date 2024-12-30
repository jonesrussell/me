<script lang="ts">
	import Profile from '../components/Profile.svelte';

	const specialties = [
		'Full Stack Engineer',
		'AI Integration',
		'Cloud Architecture',
		'DevOps'
	];
</script>

<Profile name="Russell Jones" {specialties} />
