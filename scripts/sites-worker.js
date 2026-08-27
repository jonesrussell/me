export default {
	async fetch(request, env) {
		const url = new URL(request.url);

		if (url.pathname === '/') {
			return Response.redirect(`${url.origin}/me/`, 302);
		}

		if (url.pathname === '/me' || url.pathname.startsWith('/me/')) {
			url.pathname = url.pathname.slice(3) || '/';
			return env.ASSETS.fetch(new Request(url, request));
		}

		return env.ASSETS.fetch(request);
	}
};
