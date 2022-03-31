let vip = true;
let mod = true;
let verified = false;
let antiSpam = true;
let subbed = false;
let minsub = 1;
let minSubGift = false;
let minSubGiftAmount = 1;
let minCheerMsg = false;
let minCheerMsgAmount = 1;
let minCheerBadge = false;
let minCheerBadgeAmount = 1;


chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.sync.set({ vip });
    chrome.storage.sync.set({ mod });
    chrome.storage.sync.set({ verified });
    chrome.storage.sync.set({ antiSpam });
    chrome.storage.sync.set({ subbed });
    chrome.storage.sync.set({ minsub });
    chrome.storage.sync.set({ minSubGift });
    chrome.storage.sync.set({ minSubGiftAmount });
    chrome.storage.sync.set({ minCheerMsg });
    chrome.storage.sync.set({ minCheerMsgAmount });
    chrome.storage.sync.set({ minCheerBadge });
    chrome.storage.sync.set({ minCheerBadgeAmount });
});