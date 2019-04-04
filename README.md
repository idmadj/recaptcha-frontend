# Google reCAPTCHA v3 - Frontend Integration
[![npm](https://img.shields.io/npm/v/recaptcha-frontend.svg)](https://www.npmjs.com/package/recaptcha-frontend)
![npm bundle size (minified)](https://img.shields.io/bundlephobia/min/recaptcha-frontend.svg)

ES module for the Google reCAPTCHA v3 frontend integration.

## Install
```sh
$ npm install --save recaptcha-frontend
```

## Usage
Pick your favorite:
```js
const { execute, load } = require("recaptcha-frontend");
```
```js
import execute, { load } from 'recaptcha-frontend';
```

... then all you need is:
```js
execute('homepage', 'site-key').then((token) => {
    // Send `token` to your backend for verification.
});
```

`execute()` will automatically load the reCAPTCHA v3 API and execute your request in a single step. 
You can also preload the API and call `execute()` later, without specifying your site key on every call:
```js
load('site-key').then(() => {
    // The API is loaded and ready.
});

// Do other things ...

execute('homepage').then(token => {
    // Send `token` to your backend for verification.
});
```

## API

### load(siteKey, [recaptchaNet = false])
* `siteKey` _(string)_ Your reCAPTCHA site key.
* `recaptchaNet` _(boolean)_ Whether to use [the recaptcha.net alternate URL](https://developers.google.com/recaptcha/docs/faq#can-i-use-recaptcha-globally) to load the API.

**Returns:** _(Promise)_ The fulfillement handler (`then`) is called when the API is loaded and ready.

Loads the API.

### execute(action, [siteKey], [recaptchaNet = false])
* `action` _(string)_ The action to execute.
* `siteKey` _(string)_ Your reCAPTCHA site key. If not specified, will use the last site key provided to `load()` or `execute()`.
* `recaptchaNet` _(boolean)_ Whether to use [the recaptcha.net alternate URL](https://developers.google.com/recaptcha/docs/faq#can-i-use-recaptcha-globally) to load the API.

**Returns:** _(Promise)_ The fulfillment handler (`then`) receives a single `token` parameter that can be used for verification.

Executes an action. Loads the API if needed.

### showBadge()
Shows the reCAPTCHA badge.

### hideBadge()
Hides the reCAPTCHA badge. [This requires the reCAPTCHA branding to be included visibly in the user flow.](https://developers.google.com/recaptcha/docs/faq#id-like-to-hide-the-recaptcha-badge-what-is-allowed)