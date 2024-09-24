# 2.0.0
## New features and improvements
 - Added `render`, `reset`, `ready` and `getResponse` functions;
 - `execute` can now also be used with checkbox site keys;
 - Added `render` and `lang` optional arguments to `load`;
 - `load` now appends resource hints to improve loading performance.

## Breaking changes
 - Now using reCAPTCHA Enterprise. See [Migrate from reCAPTCHA Classic](https://cloud.google.com/recaptcha/docs/migrate-recaptcha) to update your keys and migrate your code;
 - The signature of the `load` function went from  
   `load(siteKey, [recaptchaNet = false])`  
   ... to ...  
   `load(siteKey, [{lang, recaptchaNet = false, render}])`
 - Removed default export for `execute`. Use the named import instead.
 - `execute` no longer auto-loads the API. `load` needs to be called beforehand.
 - `execute`'s `recaptchaNet` argument was removed. 
