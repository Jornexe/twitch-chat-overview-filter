import IMask from 'imask';


// import IMask from 'https://unpkg.com/imask';


// (async () => {
//     const src = chrom.runtime.getURL('./node_modules/imask');
//     const contentMain = await import(src);
// })

Array.prototype.forEach.call(
    document.getElementsByClassName("number"),
    function (x) {
        var numberMask = IMask(
            x,
            {
                mask: Number,
                min: 0,
                thousandsSeparator: ' '
            });
    }
);
document.addEventListener('DOMContentLoaded', function () {
    console.log("================================= LOADED ==================================")
    let isvip = document.getElementById("isVIP")
    chrome.storage.sync.get("vip", ({ vip }) => {
        isvip.setAttribute("value", vip);
    });
    let ismod = document.getElementById("isMOD")
    chrome.storage.sync.get("mod", ({ mod }) => {
        ismod.setAttribute("value", mod);
    });
    let isVerified = document.getElementById("isVerified")
    chrome.storage.sync.get("verified", ({ verified }) => {
        isVerified.setAttribute("value", verified);
    });
    let antispam = document.getElementById("antispam")
    chrome.storage.sync.get("antiSpam", ({ antiSpam }) => {
        antispam.setAttribute("value", antiSpam);
    });
    let isSUB = document.getElementById("isSUB")
    chrome.storage.sync.get("subbed", ({ subbed }) => {
        isSUB.setAttribute("value", subbed);
    });
    let minSubLen = document.getElementById("minSubLen")
    chrome.storage.sync.get("minsub", ({ minsub }) => {
        minSubLen.setAttribute("value", minsub);
    });
    let minGiftB = document.getElementById("minGiftB")
    chrome.storage.sync.get("minSubGift", ({ minSubGift }) => {
        minGiftB.setAttribute("value", minSubGift);
    });
    let minGiftN = document.getElementById("minGiftN")
    chrome.storage.sync.get("minSubGiftAmount", ({ minSubGiftAmount }) => {
        minGiftN.setAttribute("value", minSubGiftAmount);
    });
    let minCheerB = document.getElementById("minCheerB")
    chrome.storage.sync.get("minCheerMsg", ({ minCheerMsg }) => {
        minCheerB.setAttribute("value", minCheerMsg);
    });
    let minCheerN = document.getElementById("minCheerN")
    chrome.storage.sync.get("minCheerMsgAmount", ({ minCheerMsgAmount }) => {
        minCheerN.setAttribute("value", minCheerMsgAmount);
    });
    let minCheerClientB = document.getElementById("minCheerClientB")
    chrome.storage.sync.get("minCheerBadge", ({ minCheerBadge }) => {
        minCheerClientB.setAttribute("value", minCheerBadge);
    });
    let minCheerClientN = document.getElementById("minCheerClientN")
    chrome.storage.sync.get("minCheerBadgeAmount", ({ minCheerBadgeAmount }) => {
        minCheerClientN.setAttribute("value", minCheerBadgeAmount);
    });
}, false);
