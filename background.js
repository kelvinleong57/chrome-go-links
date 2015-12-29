
function resetDefaultSuggestion() {
	chrome.omnibox.setDefaultSuggestion({
		description: 'go: Search Go Links for %s'
	});
}
resetDefaultSuggestion();

chrome.omnibox.onInputEntered.addListener(function(text) {
	if(text.indexOf('add:') != -1){
		key = text.split('add:')[1].trim();

		chrome.tabs.getSelected(null,function(tab) {
			if(key == ""){
				key = tab.title;
			}
			encoded_key = encodeURIComponent(key);
			encoded_url = encodeURIComponent(tab.url);

			generate_post_request(encoded_key, encoded_url, false);
		});

	} else {
		navigate(root_url + 'go/' + text);
	}
});