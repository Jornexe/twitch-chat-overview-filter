// works ↓
let enabled = true; // enable program
let broadcaster = true; // is the user a broadcaster
let vip = true; // is the user a VIP
let mod = true; // is the user a Moderator
let verified = false; // is the user Verified
let prime = false; // is the user Prime
let antiSpam = true; // ← this one is always on atm. Prevents duplicate messages within the same timeframe
let subbed = false; // does not work ↓
let minsub = 1;
let minSubGift = false;
let minSubGiftAmount = 1;
let minCheerMsg = false; // working on this
let minCheerMsgAmount = 1; // working on this
let minCheerBadge = false;
let minCheerBadgeAmount = 1;


chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.sync.set({ enabled });
    chrome.storage.sync.set({ broadcaster });
    chrome.storage.sync.set({ vip });
    chrome.storage.sync.set({ mod });
    chrome.storage.sync.set({ verified });
    chrome.storage.sync.set({ prime });
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