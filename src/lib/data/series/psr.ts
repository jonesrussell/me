import type { ISeries } from '$lib/types/series';

export const psrSeries: ISeries = {
	id: 'psr',
	title: 'PHP-FIG Standards Guide',
	description:
		'A comprehensive guide to PHP-FIG standards (PSRs) with practical examples and companion code.',
	repoUrl: 'https://github.com/jonesrussell/php-fig-guide',
	groups: [
		{
			name: 'Foundation',
			entries: [
				{
					psrNumber: 1,
					slug: 'psr-1-basic-coding-standard-in-php',
					title: 'PSR-1: Basic Coding Standard',
					summary: 'Fundamental coding standards for PHP interoperability.',
					companionFiles: ['src/PSR1/UserManager.php'],
					testFiles: ['tests/PSR1/UserManagerTest.php'],
					prerequisites: []
				},
				{
					psrNumber: 12,
					slug: 'psr-12-extended-coding-style-guide-in-php',
					title: 'PSR-12: Extended Coding Style Guide',
					summary: 'Extended coding style guide building on PSR-1.',
					companionFiles: [
						'src/PSR12/ExampleClass.php',
						'src/PSR12/ExtendedCodingStyleGuide.php'
					],
					testFiles: ['tests/PSR12/ExtendedCodingStyleGuideTest.php'],
					prerequisites: [1]
				},
				{
					psrNumber: 4,
					slug: 'psr-4-autoloading-standard-in-php',
					title: 'PSR-4: Autoloading Standard',
					summary: 'Autoloading standard for PHP classes based on file paths.',
					companionFiles: [
						'src/PSR4/Core/Database/Connection.php',
						'src/PSR4/Post/PostController.php'
					],
					testFiles: [
						'tests/PSR4/Core/Database/ConnectionTest.php',
						'tests/PSR4/Post/PostControllerTest.php'
					],
					prerequisites: [1]
				}
			]
		},
		{
			name: 'Core Infrastructure',
			entries: [
				{
					psrNumber: 3,
					slug: 'psr-3-logger-interface-in-php',
					title: 'PSR-3: Logger Interface',
					summary: 'Common interface for logging libraries.',
					companionFiles: ['src/PSR3/SmartLogger.php'],
					testFiles: ['tests/PSR3/SmartLoggerTest.php'],
					prerequisites: [1, 4]
				},
				{
					psrNumber: 11,
					slug: 'psr-11-container-interface-in-php',
					title: 'PSR-11: Container Interface',
					summary: 'Common interface for dependency injection containers.',
					companionFiles: [
						'src/PSR11/ExampleContainer.php',
						'src/PSR11/DatabaseConnection.php',
						'src/PSR11/Logger.php'
					],
					testFiles: ['tests/PSR11/ExampleContainerTest.php'],
					prerequisites: [1, 4]
				},
				{
					psrNumber: 14,
					slug: 'psr-14-event-dispatcher-in-php',
					title: 'PSR-14: Event Dispatcher',
					summary: 'Standard interfaces for event handling and dispatching.',
					companionFiles: [
						'src/Event/PostCreatedEvent.php',
						'src/Event/SimpleEventDispatcher.php',
						'src/Event/SimpleListenerProvider.php'
					],
					testFiles: ['tests/Event/SimpleEventDispatcherTest.php'],
					prerequisites: [1, 4, 11]
				}
			]
		},
		{
			name: 'HTTP Stack',
			entries: [
				{
					psrNumber: 7,
					slug: 'psr-7-http-message-interfaces-in-php',
					title: 'PSR-7: HTTP Message Interfaces',
					summary: 'Common interfaces for representing HTTP messages.',
					companionFiles: [
						'src/PSR7/Request.php',
						'src/PSR7/Response.php',
						'src/PSR7/Stream.php',
						'src/PSR7/Uri.php'
					],
					testFiles: ['tests/PSR7/RequestTest.php', 'tests/PSR7/ResponseTest.php'],
					prerequisites: [1, 4]
				},
				{
					psrNumber: 17,
					slug: 'psr-17-http-factories-in-php',
					title: 'PSR-17: HTTP Factories',
					summary: 'Factory interfaces for creating PSR-7 HTTP objects.',
					companionFiles: [
						'src/Http/Factory/ResponseFactory.php',
						'src/Http/Factory/StreamFactory.php'
					],
					testFiles: ['tests/Http/Factory/ResponseFactoryTest.php'],
					prerequisites: [7]
				},
				{
					psrNumber: 15,
					slug: 'psr-15-http-handlers-and-middleware-in-php',
					title: 'PSR-15: HTTP Handlers and Middleware',
					summary: 'Interfaces for server request handlers and middleware.',
					companionFiles: [
						'src/Http/Middleware/AuthMiddleware.php',
						'src/Http/Middleware/LoggingMiddleware.php',
						'src/Http/Middleware/MiddlewarePipeline.php'
					],
					testFiles: ['tests/Http/Middleware/MiddlewarePipelineTest.php'],
					prerequisites: [7, 17]
				},
				{
					psrNumber: 18,
					slug: 'psr-18-http-client-in-php',
					title: 'PSR-18: HTTP Client',
					summary: 'Interface for sending HTTP requests.',
					companionFiles: [
						'src/Http/Client/SimpleHttpClient.php',
						'src/Http/Client/NetworkException.php'
					],
					testFiles: ['tests/Http/Client/SimpleHttpClientTest.php'],
					prerequisites: [7, 17]
				}
			]
		},
		{
			name: 'Data & Caching',
			entries: [
				{
					psrNumber: 6,
					slug: 'psr-6-caching-interface-in-php',
					title: 'PSR-6: Caching Interface',
					summary: 'Common interface for caching systems.',
					companionFiles: ['src/PSR6/CacheItem.php', 'src/PSR6/FileCachePool.php'],
					testFiles: ['tests/PSR6/CacheItemTest.php', 'tests/PSR6/FileCachePoolTest.php'],
					prerequisites: [1, 4]
				},
				{
					psrNumber: 16,
					slug: 'psr-16-simple-cache-in-php',
					title: 'PSR-16: Simple Cache',
					summary: 'Simplified caching interface for common use cases.',
					companionFiles: ['src/Cache/SimpleCache/FileCache.php'],
					testFiles: ['tests/Cache/SimpleCache/FileCacheTest.php'],
					prerequisites: [1, 4]
				}
			]
		},
		{
			name: 'Specialized',
			entries: [
				{
					psrNumber: 13,
					slug: 'psr-13-hypermedia-links-in-php',
					title: 'PSR-13: Hypermedia Links',
					summary: 'Interfaces for hypermedia links and link providers.',
					companionFiles: [
						'src/PSR13/HypermediaLink.php',
						'src/PSR13/HypermediaLinkProvider.php'
					],
					testFiles: [
						'tests/PSR13/HypermediaLinkTest.php',
						'tests/PSR13/HypermediaLinkProviderTest.php'
					],
					prerequisites: [1, 4, 7]
				},
				{
					psrNumber: 20,
					slug: 'psr-20-clock-interface-in-php',
					title: 'PSR-20: Clock Interface',
					summary: 'Interface for reading the current time.',
					companionFiles: ['src/Clock/SystemClock.php', 'src/Clock/FrozenClock.php'],
					testFiles: ['tests/Clock/FrozenClockTest.php'],
					prerequisites: [1, 4]
				}
			]
		}
	]
};

export function getAllEntries() {
	return psrSeries.groups.flatMap((g) => g.entries);
}

export function getTotalEntries() {
	return getAllEntries().length;
}
