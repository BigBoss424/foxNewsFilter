function requestCount()
{
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
		var tab = tabs[0];
		chrome.tabs.sendMessage(
			tab.id,
			{greeting: 'yo'},
		handler
		);
	});

}

function handler(response)
{
	document.getElementById('count').innerHTML = response.count;
}

window.onload = function()
{
	document.getElementById("button").onclick = requestCount;
	setTimeout(requestCount, 200);
	setInterval(requestCount, 5000);
}