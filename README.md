# Google reCAPTCHA v3 - Frontend Integration
[![npm](https://img.shields.io/npm/v/recaptcha-frontend.svg)](https://www.npmjs.com/package/recaptcha-frontend)
![npm bundle size (minified)](https://img.shields.io/bundlephobia/min/recaptcha-frontend.svg)

ES module for the Google reCAPTCHA v3 frontend integration.

- Only supports reCAPTCHA Enterprise as Classic use is no longer recommended.
- Supports both score-based and checkbox site-keys;
- Supports language and render configuration;
- Supports both the user interaction and HTML button models;
- Exposes all methods of the API;
- Loads the script asynchronously and automatically appends resource hints for improved performance.

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
import { execute, load } from 'recaptcha-frontend';
```

... then:
```js
load('site-key').then(() => {
    // The API is loaded and ready.

    execute('homepage').then(token => {
        // Send `token` to your backend for verification.
    });
});

```

## API

### load(siteKey, [{lang, recaptchaNet = false, render}])
* `siteKey` _(string)_ Your reCAPTCHA site key.
* `options`
  * `lang` _(string)_ Which [reCAPTCHA language](https://cloud.google.com/recaptcha/docs/language) to use. Defaults to the browser language when not specified.
  * `recaptchaNet` _(boolean)_ Whether to use [the recaptcha.net alternate endpoint](https://developers.google.com/recaptcha/docs/faq#can-i-use-recaptcha-globally) to load the API.
  * `render`_(string)_ The value for the render parameter. Defaults to `siteKey`, which only works with score-based site keys. Use 'onload' or 'explicit' for checkbox site keys. See [this](https://cloud.google.com/recaptcha/docs/api-ref-checkbox-keys#resource_js) for more details.

**Returns:** _(Promise)_ The fulfillement handler (`then`) is called when the API is loaded and ready.

Loads the API.


### execute(action, [siteKey]) | execute([widget_id])
* `action` _(string)_ The action to execute.
* `siteKey` _(string)_ Your reCAPTCHA site key. Defaults to the site key provided to `load()`.

* `widget_id` _(number)_ The widget ID returned by `render()`. Defaults to the ID of the first widget that was created.

**Returns:** _(Promise)_ The fulfillment handler (`then`) receives a single `token` parameter that can be used for verification.

Executes an action.


### render(...), reset(...), ready(...) and getResponse(...)
All these methods mirror the signatures of [the reCAPTCHA methods](https://cloud.google.com/recaptcha/docs/api-ref-checkbox-keys) of the same names. Only `execute()` is different.


### showBadge()
Shows the reCAPTCHA badge.


### hideBadge()
Hides the reCAPTCHA badge. [This requires the reCAPTCHA branding to be included visibly in the user flow.](https://developers.google.com/recaptcha/docs/faq#id-like-to-hide-the-recaptcha-badge-what-is-allowed)