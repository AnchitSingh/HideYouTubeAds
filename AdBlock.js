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
        video.currentTime = video.duration;
        video.volume = 0;
        console.log('Ad skipped!');
    }
};

// Set up the interval to check conditions and run code every 100 ms
const intervalId = setInterval(checkConditionsAndRunCode, 100);

// Optionally, you can clear the interval when needed, for example, when the page unloads
// clearInterval(intervalId);

// Function to set elements with the pattern "*-ad-*" to display: none
const hideElementsWithAdPattern = () => {
    const elementsWithAdPattern = document.querySelectorAll('[id*="-ad-"], [class*="-ad-"]');

    elementsWithAdPattern.forEach(element => {
        element.style.display = 'none';
    });
};

// Function to be called when mutations are observed
const handleMutations = (mutationsList, observer) => {
    for (const mutation of mutationsList) {
        if (mutation.type === 'childList') {
            // New elements might have been added, so hide elements with the pattern again
            hideElementsWithAdPattern();
        }
    }
};

// Set initial elements to display: none
hideElementsWithAdPattern();

// Create a Mutation Observer to watch for changes in the DOM
const observer = new MutationObserver(handleMutations);

// Configure and start the observer
const observerConfig = { childList: true, subtree: true };
observer.observe(document.body, observerConfig);

// Optionally, you can disconnect the observer when needed, for example, when the page unloads
// observer.disconnect();
