
// function hitLandingPage(){
// 	chrome.tabs.getSelected(null,function(tab) {
// 		url = tab.url
// 		navigate(root_url + 'go/landing_page?url=' + encodeURIComponent(url));
// 	});
// }

$('#landing-page-btn').click(function(){
	navigate(root_url + 'go/sharing_center');
});

$('#explore-page-btn').click(function(){
	navigate(root_url);
});

$('#add-page-btn').click(function(){
	if ($('#add-input').val() != '') {
		chrome.tabs.getSelected(null,function(tab) {
			key = $('#add-input').val();

			generate_post_request(key, tab.url);
		});
	} else {
		alert('no key entered');
	}
});

// CORS OBJECT

function showSpinner(){
	$('#loading-spinner').show();
}
function hideSpinner(){
	$('#loading-spinner').hide();
}

function lookupURL(url){
	params = 'url=' + url;
	url = root_url + 'lookup' + '?' + params
	var xhr = createCORSRequest('GET', url);
	that = $(this);
	showSpinner();
	xhr.onload = function() {
		hideSpinner();
		var text = xhr.responseText;
		constructLookupList(JSON.parse(text));
	};
	xhr.onerror = function() {
		console.log('failed');
	};
	xhr.send();
}

function constructLookupList(results){
	if(results.length == 0){
		$('#lookup-container').append('<p class = "text-muted smalltext">This URL has not been made into a Go-Link yet</p>');
	}
	results_list = document.createElement('ul');
	$(results_list).addClass('list-group');
	for(var i=0;i<results.length;i++){
		li = document.createElement('li');
		$(li).text(results[i]);
		$(li).addClass('list-group-item');
		$(li).addClass('lookup-match');
		$(results_list).append(li);
	}
	$('#lookup-container').append(results_list);
	activateCopyLinkToClipboard();
}

function copyToClipboard( text ){
	var copyDiv = document.createElement('div');

	copyDiv.contentEditable = true;
	$(copyDiv).insertBefore($('#lookup-container'));
	copyDiv.innerHTML = text;
	copyDiv.unselectable = "off";
	copyDiv.focus();
	document.execCommand('SelectAll');
	document.execCommand("Copy", false, null);
	$(copyDiv).remove();
}
function activateCopyLinkToClipboard(){
	$('.lookup-match').click(function(){
		$(this).fadeOut(100).fadeIn(100);
		copyToClipboard($(this).text());
	})
}

// function activateRegisterPushLink(){
// 	$('#register-push-link').click(function(){
// 		var bgPage = chrome.extension.getBackgroundPage();
// 		bgPage.registerForPush();
// 	});
// }
// activateRegisterPushLink();

chrome.tabs.getSelected(null,function(tab) {
	lookupURL(tab.url);
});


$('#add-input').keypress(function(e){
	if(e.which == 13) {
		key = $(this).val();

		chrome.tabs.getSelected(null,function(tab) {
			generate_post_request(key, tab.url);
		});
		
	}
});