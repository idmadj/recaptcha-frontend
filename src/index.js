import EventEmitter from 'eventemitter3';

const scriptId = 'recaptcha-frontend';
const badgeStyleId = 'recaptcha-frontend-badge';

let cachedSiteKey = null;

const readyEmitter = new EventEmitter();
window.handleRecaptchaLoad = () => {
    readyEmitter.emit('ready');
    readyEmitter.removeAllListeners('ready');
};

export const showBadge = () => {
    const badgeStyle = document.getElementById(badgeStyleId);

    if (badgeStyle) {
        document.head.removeChild(badgeStyle);
    }
};

export const hideBadge = () => {
    if (!document.getElementById(badgeStyleId)) {
        const badgeStyle = document.createElement('style');

        badgeStyle.id = badgeStyleId;
        badgeStyle.innerHTML = '.grecaptcha-badge { visibility: hidden; }';

        document.head.appendChild(badgeStyle);
    }
};

export const load = (siteKey, recaptchaNet = false) => {
    return new Promise((resolve, reject) => {
        const { grecaptcha } = window;

        if (grecaptcha) {
            resolve();
        } else if (document.getElementById(scriptId)) {
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

            script.id = scriptId;
            script.type = 'text/javascript';
            script.src = `https://${(recaptchaNet ? 'www.recaptcha.net' : 'www.google.com')}/recaptcha/api.js?onload=handleRecaptchaLoad&render=${siteKey}`;
            script.async = true;
            script.defer = true;
            script.addEventListener('error', handleScriptError);

            document.head.appendChild(script);
        }
    });
};

export const execute = (action, siteKey, recaptchaNet = false) => {
    return new Promise((resolve, reject) => {
        siteKey = siteKey || cachedSiteKey;

        load(siteKey, recaptchaNet)
        .then(() => {
            window.grecaptcha.execute(siteKey, { action })
            .then(resolve);
        })
        .catch(reject);
    });
};

export default execute;