const checkConditionsAndRunCode = () => {
    const videoAdsDiv = document.querySelector('.video-ads.ytp-ad-module');

    // Check if the div with class "video-ads ytp-ad-module" has any child elements
    const hasChildElements = videoAdsDiv && videoAdsDiv.children.length > 0;
	var adSkipButton = document.querySelector('button[class*="-ad-skip-button-"]');
	if(adSkipButton){
		adSkipButton.click()
	}
	
    if (hasChildElements) {
        const video = document.querySelector('video');

        // Run the code to skip the ad
        if(video){
        	video.currentTime = video.duration;
        	video.volume = 0;
        	console.log('Ad skipped!');
        }
    }
};

// Set up the interval to check conditions and run code every 100 ms
const intervalId = setInterval(checkConditionsAndRunCode, 100);

// Optionally, you can clear the interval when needed, for example, when the page unloads
// clearInterval(intervalId);

const hideElementsWithAdPattern = () => {
    const elementsWithAdPattern = document.querySelectorAll('[id*="-ad-"], [class*="-ad-"]:not(#container [id*="-ad-"], #container [class*="-ad-"])');

    elementsWithAdPattern.forEach(element => {
        element.style.display = 'none';
    });
};

const handleMutations = (mutationsList, observer) => {
    for (const mutation of mutationsList) {
        if (mutation.type === 'childList') {
            hideElementsWithAdPattern();
        }
    }
};

hideElementsWithAdPattern();

const observer = new MutationObserver(handleMutations);
const observerConfig = { childList: true, subtree: true };
observer.observe(document.body, observerConfig);
