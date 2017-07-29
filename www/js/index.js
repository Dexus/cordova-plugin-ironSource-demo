document.addEventListener('deviceready', function onDeviceReady() {

	var ANDROID_KEY = '3f09a0c9';
	var IOS_KEY = '3efd0b09';
	var ssAds = new IronSourceAds(cordova.platformId === 'ios' ? IOS_KEY : ANDROID_KEY, 'demo_' + Date.now());
	var eventLog = document.getElementById('eventLog');
	var interstitialBtn = document.getElementById('interstitial');
	var offerwallBtn = document.getElementById('offerWall');
	var rewardedVideoBtn = document.getElementById('rewarded');
	var rvAvailable = false;
	var interstitialAvailable = false;

	window.addEventListener("interstitialInitialized", function() {
		log("interstitialInitialized");
	}, false);

	window.addEventListener("interstitialInitizationFailed", function(e) {
		log("interstitialInitFailed", e.error);
	}, false);

	window.addEventListener("interstitialAvailabilityChanged", function(e) {
		log("interstitialAvailabilityChanged", e.available);
		interstitialAvailable = e.available;
		if(e.available) {
			interstitialBtn.classList.remove('disabled');
		} else {
			interstitialBtn.classList.add('disabled');
		}
	}, false);
	window.addEventListener("interstitialShown", function() {
		log("interstitialShown")
	}, false);
	window.addEventListener("interstitialShowFailed", function(e) {
		log("interstitialShowFailed", e.error);
	}, false);
	window.addEventListener("interstitialClicked", function() {
		log("interstitialClicked")
	}, false);
	window.addEventListener("interstitialClosed", function() {
		log("interstitialClosed")
	}, false);
	window.addEventListener("offerwallClosed", function() {
		log("offerwallClosed")
	}, false);
	window.addEventListener("offerwallCreditFailed", function(e) {
		log("offerwallCreditFailed", e.error);
	}, false);
	window.addEventListener("offerwallCreditReceived", function(e) {
		log("offerwallCreditReceived", e.credit)
	}, false);
	window.addEventListener("offerwallShowFailed", function(e) {
		log("offerwallShowFailed", e.error);
	}, false);
	window.addEventListener("offerwallOpened", function() {
		log("offerwallOpened");
	}, false);
	window.addEventListener("offerwallInitializationFailed", function(e) {
		log("offerwallInitializationFailed", e.error);
	}, false);
	window.addEventListener("offerwallInitialized", function() {
		log("offerwallInitialized");
	}, false);
	window.addEventListener("rewardedVideoRewardReceived", function(e) {
		log("rewardedVideoRewardReceived", e.placement);
	}, false);
	window.addEventListener("rewardedVideoEnded", function() {
		log("rewardedVideoEnded");
	}, false);
	window.addEventListener("rewardedVideoStarted", function() {
		log("rewardedVideoStarted")
	}, false);
	window.addEventListener("rewardedVideoAvailabilityChanged", function(e) {
		log("rewardedVideoAvailabilityChanged", e.available);
		rvAvailable = e.available;
		if(e.available) {
			rewardedVideoBtn.classList.remove('disabled');
		} else {
			rewardedVideoBtn.classList.add('disabled');
		}
	}, false);
	window.addEventListener("rewardedVideoClosed", function() {
		log("rewardedVideoClosed");
	}, false);
	window.addEventListener("rewardedVideoOpened", function() {
		log("rewardedVideoOpened");
	}, false);
	window.addEventListener("rewardedVideoInitializationFailed", function(e) {
		log("rewardedVideoInitializationFailed", e.error);
	}, false);
	window.addEventListener("rewardedVideoInitialized", function() {
		log("rewardedVideoInitialized");
	}, false);

	rewardedVideoBtn.addEventListener('click', function reward() {
		if(rvAvailable) {
			ssAds.showRewardedAd();
		} else {
			alert('No rewarded videos are available.')
		}
	}, false);

	offerwallBtn.addEventListener('click', function offerWall() {
		ssAds.showOfferwall();
	}, false);

	interstitialBtn.addEventListener('click', function interstitial() {
		if(interstitialAvailable) {
			ssAds.showInterstitial();
		} else {
			alert('No interstitial ads available.')
		}
	}, false);

	function log(event, data) {

		eventLog.value += [event, data !== undefined ? (': ' + JSON.stringify(data)) : '', '\n'].join('');
	}
}, false);