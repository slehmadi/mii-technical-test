import { datadogRum } from '@datadog/browser-rum';

datadogRum.init({
    applicationId: import.meta.env.VITE_DD_APP_ID,
    clientToken: import.meta.env.VITE_DD_CLIENT_TOKEN,
    site: import.meta.env.VITE_DD_SITE,
    service: 'frontend',
    env: 'dev',				// e.g. 'prod', 'staging-1', 'dev'
    version: '1.0.0',	// e.g. '1.0.0'
    sessionSampleRate: 100,			// capture 100% of sessions
    sessionReplaySampleRate: 20,	// capture 20% of sessions with replay
    trackResources: true,			// Enable Resource tracking
    trackUserInteractions: true,	// Enable Action tracking
    trackLongTasks: true,			// Enable Long Tasks tracking

    // ----- Recommended Options -----
    // allowedTracingUrls: '<BACKEND_URL>',		// Enable distributed tracing
    defaultPrivacyLevel: 'mask-user-input',	// 'mask-user-input' | 'allow' | 'mask'
});