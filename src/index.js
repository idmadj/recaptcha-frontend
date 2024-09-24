import EventEmitter from 'eventemitter3';

const SCRIPT_ID = 'recaptcha-frontend';
const BADGE_STYLE_ID = 'recaptcha-frontend-badge';

const EARLY_CALL_ERROR = new Error('reCAPTCHA method called before the API is ready. Call `load()` before any other method.');

let cachedSiteKey = null;

const readyEmitter = new EventEmitter();
window.handleRecaptchaLoad = () => {
    readyEmitter.emit('ready');
    readyEmitter.removeAllListeners('ready');
};

export const showBadge = () => {
    const badgeStyle = document.getElementById(BADGE_STYLE_ID);

    if (badgeStyle) {
        document.head.removeChild(badgeStyle);
    }
};

export const hideBadge = () => {
    if (!document.getElementById(BADGE_STYLE_ID)) {
        const badgeStyle = document.createElement('style');

        badgeStyle.id = BADGE_STYLE_ID;
        badgeStyle.innerHTML = '.grecaptcha-badge { visibility: hidden; }';

        document.head.appendChild(badgeStyle);
    }
};

export const load = (siteKey, {lang, recaptchaNet = false, render} = {}) => {
    return new Promise((resolve, reject) => {
        if (window.grecaptcha) {
            resolve();
        } else if (document.getElementById(SCRIPT_ID)) {
            readyEmitter.addListener('ready', () => {
                resolve();
            });
        } else {
            const script = document.createElement('script');

            readyEmitter.addListener('ready', () => {
                cachedSiteKey = siteKey;
                resolve();
            });

            const handleScriptError = () => {
                script.removeEventListener('error', handleScriptError);
                reject();
            };

            script.id = SCRIPT_ID;
            script.type = 'text/javascript';
            script.src = `https://${(recaptchaNet ? 'www.recaptcha.net' : 'www.google.com')}/recaptcha/enterprise.js?onload=handleRecaptchaLoad&render=${render ? render : siteKey}${lang ? `&hl=${lang}` : ''}`;
            script.async = true;
            script.defer = true;
            script.addEventListener('error', handleScriptError);

            document.head.appendChild(script);

            // Use resource hints to improve loading performance
            // https://developers.google.com/recaptcha/docs/loading#using_resource_hints
            ["https://www.google.com", "https://www.gstatic.com"].forEach(href => {
                const link = document.createElement('link');

                link.rel = 'preconnect';
                link.href = href;

                document.head.appendChild(link);
            });
        }
    });
};

export const render = (...args) => {
    const { grecaptcha } = window;

    if (!grecaptcha)
        throw EARLY_CALL_ERROR;

    return grecaptcha.enterprise.render(...args);
};

export const reset = (...args) => {
    const { grecaptcha } = window;

    if (!grecaptcha)
        throw EARLY_CALL_ERROR;

    return grecaptcha.enterprise.reset(...args);
};

export const execute = (...args) => {
    const { grecaptcha } = window;

    if (!grecaptcha)
        throw EARLY_CALL_ERROR;

    if (typeof args[0] === "string") {
        const [action, siteKey] = args;
        return grecaptcha.enterprise.execute(siteKey || cachedSiteKey, { action });
    } else {
        return grecaptcha.enterprise.execute(...args);
    }
};

export const ready = (...args) => {
    const { grecaptcha } = window;

    if (!grecaptcha)
        throw EARLY_CALL_ERROR;

    return grecaptcha.enterprise.ready(...args);
};

export const getResponse = (...args) => {
    const { grecaptcha } = window;

    if (!grecaptcha)
        throw EARLY_CALL_ERROR;

    return grecaptcha.enterprise.getResponse(...args);
};
