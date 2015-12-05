/*
* A very simple filter to remove any reference to Donald Trump
*/

chrome.runtime.onMessage.addListener(function(message, sender, sendRequest)
{		sendRequest({count: deletedCount});

});

var deletedCount = 0;

var xpathPatterns = [ ];

var badWords = [
	'Fox News', 'fox news', 'fox'
	];

	for(var i = 0; i < badWords.length; i++)
	{
		//push can append multiple elements!
		var word = badWords[i];
		xpathPatterns.push(

		//text nodes
		"//text()[contains(translate(., 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdeghijklmnopqrstuvwxyz'), '" + word + "')]",

		// hrefs and imgs
		"//a[contains(translate(@href, 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'),'" + word + "')]",
	    "//img[contains(translate(@src, 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'),'" + word + "')]",
	    "//img[contains(translate(@alt, 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'),'" + word + "')]"
                );
	}

	if (true)
		window.addEventListener("load", function()
		{
			var array = new Array();
			for(i = 0; i < xpathPatterns.length; i++)
			{
				var xpathResults = 
					document.evaluate(xpathPatterns[i],
							document, null,
							XPathResult.UNORDERED_NODE_ITERATOR_TYPE, null);
				var thisNode = xpathResults.iterateNext();
				while (thisNode)
				{
					array.push(thisNode);
					thisNode = xpathResults.iterateNext();
				}
			}
			deletedCount = array.length;

			for(var i = 0; i < array.length; i++)
			{
				var p = array[i].parentNode;
				if(p !==null) p.removeChild(array[i]);
			}
		});