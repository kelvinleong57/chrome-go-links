# Chrome Go-Links Extension

Accompanying Chrome extension application distributed to users to enable keyword-based bookmarking within the search bar. The description of the project is located in the repository of the Go-Links backend at https://github.com/kelvinleong57/go-links.

## Setting Up to Develop
1. Clone this repo
    - https://github.com/kelvinleong57/chrome-go-links
2. Open Google Chrome and visit `chrome://extensions/`
3. Check Developer Mode on the top right
4. Click "Load unpacked extension" and select the *chrome-go-links* folder that was just cloned
5. Ensure the extension is enabled

## Usage
- Click on the extension button to open up a popup.
- To bookmark that URL, simply type the desired keyword into the form and press *Enter* (or click the *Add* button).
    - Once the spinner finishes, the *(keyword, URL)* pair has been saved.
    - You can also type `add: keyword` in the search bar, and it will save the URL of the tab that is currently open.
- To revisit that website, type `go keyword` in the search bar. Chrome will automatically redirect to that website.
    - Other users who have this Chrome extension can also use the same keyword to visit the same website, making it easy to share sites.

## Dependencies
  - Google Chrome
  - Go-Links must have a server receiving routes and hence the calls to Parse
    - https://github.com/kelvinleong57/go-links

## Files
### utils.js
contains all the convenience methods for both background.js and popup.js:

```javascript
// URL that precedes every HTTP request
var root_url = 'http://localhost:5000/'

// Navigating to a URL
function navigate(url) {};

// Create the XHR object for HTTP requests
function createCORSRequest(method, url) {};

// creates HTTP POST request with given unencoded key and tab_url, visuals boolean (default true)
function generate_post_request(key, tab_url, visuals) {};
```

## Resources
  - [David Liu](https://github.com/davidbliu) and [Eric Quach](https://github.com/ericcquachh) - my Fall 2015 Web Development Committee Chairs for [Berkeley PBL](http://www.berkeleypbl.com/) 
    - https://github.com/davidbliu/flask-portal
    - https://github.com/davidbliu/pbl-link-extension
    - https://github.com/davidbliu/pbl-portal-new