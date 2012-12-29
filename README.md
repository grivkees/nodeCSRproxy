nodeCSRproxy
============

A simple ready-to-deploy node.js proxy server app for making cross domain HTTP requests.

How does it work
----------------

The nodeCSRproxy server makes a HTTP request to the given URL and returns it with the a `Access-Control-Allow-Origin:*` header added. This disables the same origin policy in [modern browsers](https://developer.mozilla.org/en-US/docs/HTTP/Access_control_CORS#Browser_compatibility), which allows any page or script to access the result (e.g. in an AJAX request). 

For older browser support add `format=json`, which wraps the result into JSONP (e.g. for use with jQuery).

Demo
----

Request Format: /?url=[URL]&format=[http(default)/json]

* HTTP example: http://nodecsrproxy.herokuapp.com/?url=http://www.google.com
* JSON example: http://nodecsrproxy.herokuapp.com/?url=https://github.com/blog.atom&format=json
* Manual JSONP: http://nodecsrproxy.herokuapp.com/?url=https://github.com/blog.atom&format=json&callback=random_jsonp_callback

Setting up a Server
-------------------

Make a Heroku app, push this app to Heroku, and that's it.

You may also use the above demo site. The demo is provided "AS IS", WITHOUT WARRANTY OF ANY KIND, AND WITHOUT UPTIME OR FUTURE AVAILABILITY GUARANTEES. See included license for more details.
