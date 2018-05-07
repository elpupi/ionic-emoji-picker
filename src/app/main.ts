import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app.module';
import { rafFeature } from '@features-detection/features/js/requestAnimationFrame';

// platformBrowserDynamic().bootstrapModule(AppModule);


// https://philipwalton.com/articles/loading-polyfills-only-when-needed/

if (browserSupportsAllFeatures()) {
    // Browsers that support all features run `main()` immediately.
    main();
} else {
    // All other browsers loads polyfills and then run `main()`.
    // loadScript('../polyfills/polyfills.js', main);

    // webpack style :)
    import(/* webpackChunkName: "__polyfills__" */ '../polyfills/polyfills').then(() => main());
}

function main(err?: Error) {
    // Initiate all other code paths.
    // If there's an error loading the polyfills, handle that
    // case gracefully and track that the error occurred.
    if (err) console.log('Polyfills didn\'t load:', err);

    platformBrowserDynamic().bootstrapModule(AppModule);
}


function browserSupportsAllFeatures() {
    return rafFeature.isSupported();
    // window.requestAnimationFrame /*&& window.Promise && window.fetch && window.Symbol*/;
}

/* function loadScript(src, done) {
    const js = document.createElement('script');
    js.src = src;
    js.onload = function () {
        done();
    };
    js.onerror = function () {
        done(new Error('Failed to load script ' + src));
    };
    document.head.appendChild(js);
} */
