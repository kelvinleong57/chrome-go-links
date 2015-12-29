// var root_url = 'http://testing.berkeley-pbl.com/'
var root_url = 'http://localhost:5000/'

function resetDefaultSuggestion() {
	chrome.omnibox.setDefaultSuggestion({
		description: 'go: Search Go Links for %s'
	});
}
resetDefaultSuggestion();

function navigate(url) {
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
		chrome.tabs.update(tabs[0].id, {url: url});
	});
}

chrome.omnibox.onInputEntered.addListener(function(text) {
	if(text.indexOf('add:') != -1){
		key = text.split('add:')[1].trim();
		chrome.tabs.getSelected(null,function(tab) {
					url = tab.url;
					if(key == ""){
						key = tab.title;
					}
					navigate(root_url + "/go/add_landing_page?key="+encodeURIComponent(key)+"&url="+encodeURIComponent(url));
					
		});

	} else {
		// navigate("http://pbl.link/" + text);
		navigate(root_url + 'go/' + text);
	}
});