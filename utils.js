// var root_url = 'http://testing.berkeley-pbl.com/'
var root_url = 'http://localhost:5000/'

// Navigating to a URL
function navigate(url) {
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
		chrome.tabs.update(tabs[0].id, {url: url});
	});
}

// Create the XHR object.
function createCORSRequest(method, url) {
	var xhr = new XMLHttpRequest();
	if ("withCredentials" in xhr) {
		// XHR for Chrome/Firefox/Opera/Safari.
		xhr.open(method, url, true);
	} else if (typeof XDomainRequest != "undefined") {
		// XDomainRequest for IE.
		xhr = new XDomainRequest();
		xhr.open(method, url);
	} else {
		// CORS not supported.
		xhr = null;
	}
	return xhr;
}

// HTTP POST request
function generate_post_request(key, tab_url, visuals) {
	// set to true by default unless specified
	if (typeof visuals === "undefined" || visuals === null) { 
		visuals = true; 
	}

	url = root_url + 'create_golink'
	var xhr = createCORSRequest('POST', url);

	// POST request header and parameters
	xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	params = "key=" + key + "&url=" + tab_url;

	if (visuals) {
		that = $(this);
		showSpinner();
	}
	
	xhr.onload = function() {
		if (visuals) {
			hideSpinner();
			var text = xhr.responseText;
			constructLookupList(JSON.parse(text));
		}

		console.log('success');
		alert('Success!');
	};

	xhr.onerror = function() {
		console.log('failed');
		alert('Failure...');
	};

	xhr.send(params);
}