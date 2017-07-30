document.addEventListener('deviceready', function onDeviceReady() {

  var ANDROID_KEY = '5d969e95';
  var IOS_KEY = '5d969e95';
  var eventLog = document.getElementById('eventLog');
  var interstitialBtn = document.getElementById('interstitial');
  var offerwallBtn = document.getElementById('offerWall');
  var rewardedVideoBtn = document.getElementById('rewarded');
  var rvAvailable = false;
  var IronSourceAdsHelper = {
    "ANDROID_KEY": '5d969e95',
    "IOS_KEY": '5d969e95',
    "rvAvailable": false,
    "interstitialAvailable": false,
    "adsLoadFailedInterstitial": 0,
  };
  var ssAds = new IronSourceAds(cordova.platformId === 'ios' ? IOS_KEY : ANDROID_KEY, 'demo_' + Date.now(), function() {

    ssAds.loadInterstitial();

    window.addEventListener("onInterstitialAdReady", function() {
      log("onIntersitialAdReady: ", arguments);
      IronSourceAdsHelper.interstitialAvailable = true;
      IronSourceAdsHelper.adsLoadFailedInterstitial = 0;
      interstitialBtn.classList.remove('disabled');
    }, false);

    window.addEventListener("onInterstitialAdLoadFailed", function(e) {
      log("onInterstitialAdLoadFailed", e);
      interstitialBtn.classList.add('disabled');
      if (IronSourceAdsHelper.adsLoadFailedInterstitial <= 5) {
        IronSourceAdsHelper.adsLoadFailedInterstitial++;
        var timer = (IronSourceAdsHelper.adsLoadFailedInterstitial + 1) * 1500;
        setTimeout(ssAds.loadInterstitial, timer);
      }
    }, false);

    window.addEventListener("onInterstitialAdOpened", function() {
      log("onInterstitialAdOpened")
      interstitialAvailable = false;
      interstitialBtn.classList.add('disabled');
    }, false);

    window.addEventListener("onInterstitialAdClicked", function() {
      log("onInterstitialAdClicked");
      IronSourceAdsHelper.interstitialAvailable = false;
      interstitialBtn.classList.add('disabled');
    }, false);

    window.addEventListener("onInterstitialAdClosed", function() {
      log("onInterstitialAdClosed")
      IronSourceAdsHelper.interstitialAvailable = false;
      interstitialBtn.classList.add('disabled');
      ssAds.loadInterstitial();
    }, false);

    window.addEventListener("onInterstitialAdShowSucceeded", function() {
      log("onInterstitialAdShowSucceeded")
    }, false);


    window.addEventListener("onInterstitialAdShowFailed", function(e) {
      log("onInterstitialAdShowFailed", e)
      IronSourceAdsHelper.interstitialAvailable = false;
    }, false);

    window.addEventListener("onOfferwallOpened", function() {
      log("onOfferwallOpened");
    }, false);

    window.addEventListener("onOfferwallClosed", function() {
      log("onOfferwallClosed")
    }, false);

    window.addEventListener("onOfferwallAdCredited", function(e) {
      log("onOfferwallAdCredited", e)
    }, false);

    window.addEventListener("onGetOfferwallCreditsFailed", function(e) {
      log("onGetOfferwallCreditsFailed", e);
    }, false);

    window.addEventListener("onOfferwallShowFailed", function(e) {
      log("onOfferwallShowFailed", e);
    }, false);

    window.addEventListener("onOfferwallAvailable", function(e) {
      log("onOfferwallAvailable", e);
      IronSourceAdsHelper.owAvailable = e.offerAvailable;
      if (IronSourceAdsHelper.owAvailable) {
        offerwallBtn.classList.remove('disabled');
      } else {
        offerwallBtn.classList.add('disabled');
      }
    }, false);

    window.addEventListener("onRewardedVideoAdRewarded", function(e) {
      log("onRewardedVideoAdRewarded", e);
    }, false);

    window.addEventListener("onRewardedVideoAdEnded", function() {
      log("onRewardedVideoAdEnded");
    }, false);

    window.addEventListener("onRewardedVideoAdStarted", function() {
      log("onRewardedVideoAdStarted")
    }, false);

    window.addEventListener("onRewardedVideoAvailabilityChanged", function(e) {
      log("rewardedVideoAvailabilityChanged", e);
      IronSourceAdsHelper.rvAvailable = e.videoAvailable;
      if (IronSourceAdsHelper.rvAvailable) {
        rewardedVideoBtn.classList.remove('disabled');
      } else {
        rewardedVideoBtn.classList.add('disabled');
      }
    }, false);

    window.addEventListener("onRewardedVideoAdClosed", function() {
      log("onRewardedVideoAdClosed");
    }, false);
    window.addEventListener("onRewardedVideoAdOpened", function() {
      log("onRewardedVideoAdOpened");
    }, false);

    window.addEventListener("onRewardedVideoAdShowFailed", function(e) {
      log("onRewardedVideoAdShowFailed", e);
      IronSourceAdsHelper.rvAvailable = false;
    }, false);

    rewardedVideoBtn.addEventListener('click', function reward() {
      if (IronSourceAdsHelper.rvAvailable) {
        ssAds.showRewardedVideo();
      } else {
        alert('No rewarded videos are available.')
      }
    }, false);

    offerwallBtn.addEventListener('click', function offerWall() {
      if (IronSourceAdsHelper.owAvailable) {
        ssAds.showOfferwall();
      } else {
        alert('No Offerwall ads available.')
      }
    }, false);

    interstitialBtn.addEventListener('click', function interstitial() {
      if (IronSourceAdsHelper.interstitialAvailable) {
        ssAds.showInterstitial();
      } else {
        alert('No interstitial ads available.')
      }
    }, false);

    function log(event, data) {
      eventLog.value += [event, data !== undefined ? (': ' + JSON.stringify(data)) : '', '\n'].join('');
    }
  });
}, false);