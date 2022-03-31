import IMask from 'imask';

// makes input numbers look nice
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

// way better version that i made. myself.
Array.prototype.forEach.call(
    document.getElementsByClassName("check"),
    function (x) {
        x.addEventListener("change", function(z) {
            let zid = z.target.getAttribute("id");
            let zvalue = z.target.checked;
            console.log({[zid]: zvalue});
            chrome.storage.sync.set({[zid]: zvalue});
        },false);
    }
);

Array.prototype.forEach.call(
    document.getElementsByClassName("number"),
    function (x) {
        x.addEventListener("change", function(z) {
            let zid = z.target.getAttribute("id");
            let zvalue = z.target.getAttribute("value");
            console.log({[zid]: zvalue});
            chrome.storage.sync.set({[zid]: zvalue});
        },false);
    }
);
// could mb reduce the amount of these by just adding an if check
Array.prototype.forEach.call(
    document.getElementsByClassName("check"),
    function (x) {
        chrome.storage.sync.get(x.getAttribute("id"), (z) => {
            console.log(x.getAttribute("id"), Object.values(z)[0]);
            x.checked = Object.values(z)[0];
        });
    }
);

Array.prototype.forEach.call(
    document.getElementsByClassName("check"),
    function (x) {
        chrome.storage.sync.get(x.getAttribute("id"), (z) => {
            console.log(x.getAttribute("id"), Object.values(z)[0]);
            x.setAttribute("value", Object.values(z)[0]);
        });
    }
);

// set values to what they are supposed to be
// let isvip = document.getElementById("VIP");
// chrome.storage.sync.get("vip", ({ vip }) => {
//     // isvip.checked = vip;
//     console.log()
// });
// let ismod = document.getElementById("MOD");
// chrome.storage.sync.get("mod", ({ mod }) => {
//     ismod.checked = mod;
// });
// let isVerified = document.getElementById("verified");
// chrome.storage.sync.get("verified", ({ verified }) => {
//     console.log(verified);
//     isVerified.checked = verified;
// });
// let antispam = document.getElementById("antiSpam");
// chrome.storage.sync.get("antiSpam", ({ antiSpam }) => {
//     antispam.checked = antiSpam;
// });
// let isSUB = document.getElementById("subbed");
// chrome.storage.sync.get("subbed", ({ subbed }) => {
//     isSUB.checked = subbed;
// });
// let minSubLen = document.getElementById("minsub");
// chrome.storage.sync.get("minsub", ({ minsub }) => {
//     minSubLen.setAttribute("value", minsub);
// });
// let minGiftB = document.getElementById("minSubGift");
// chrome.storage.sync.get("minSubGift", ({ minSubGift }) => {
//     minGiftB.checked = minSubGift;
// });
// let minGiftN = document.getElementById("minSubGiftAmount");
// chrome.storage.sync.get("minSubGiftAmount", ({ minSubGiftAmount }) => {
//     minGiftN.setAttribute("value", minSubGiftAmount);
// });
// let minCheerB = document.getElementById("minCheerMsg");
// chrome.storage.sync.get("minCheerMsg", ({ minCheerMsg }) => {
//     minCheerB.checked = minCheerMsg;
// });
// let minCheerN = document.getElementById("minCheerMsgAmount");
// chrome.storage.sync.get("minCheerMsgAmount", ({ minCheerMsgAmount }) => {
//     minCheerN.setAttribute("value", minCheerMsgAmount);
// });
// let minCheerClientB = document.getElementById("minCheerBadge");
// chrome.storage.sync.get("minCheerBadge", ({ minCheerBadge }) => {
//     minCheerClientB.checked = minCheerBadge;
// });
// let minCheerClientN = document.getElementById("minCheerBadgeAmount");
// chrome.storage.sync.get("minCheerBadgeAmount", ({ minCheerBadgeAmount }) => {
//     minCheerClientN.setAttribute("value", minCheerBadgeAmount);
// });







// document.addEventListener('DOMContentLoaded', function () {
//     console.log("================================= LOADED ==================================")
//     let isvip = document.getElementById("isVIP")
//     chrome.storage.sync.get("vip", ({ vip }) => {
//         isvip.setAttribute("value", vip);
//     });
//     let ismod = document.getElementById("isMOD")
//     chrome.storage.sync.get("mod", ({ mod }) => {
//         ismod.setAttribute("value", mod);
//     });
//     let isVerified = document.getElementById("isVerified")
//     chrome.storage.sync.get("verified", ({ verified }) => {
//         isVerified.setAttribute("value", verified);
//     });
//     let antispam = document.getElementById("antispam")
//     chrome.storage.sync.get("antiSpam", ({ antiSpam }) => {
//         antispam.setAttribute("value", antiSpam);
//     });
//     let isSUB = document.getElementById("isSUB")
//     chrome.storage.sync.get("subbed", ({ subbed }) => {
//         isSUB.setAttribute("value", subbed);
//     });
//     let minSubLen = document.getElementById("minSubLen")
//     chrome.storage.sync.get("minsub", ({ minsub }) => {
//         minSubLen.setAttribute("value", minsub);
//     });
//     let minGiftB = document.getElementById("minGiftB")
//     chrome.storage.sync.get("minSubGift", ({ minSubGift }) => {
//         minGiftB.setAttribute("value", minSubGift);
//     });
//     let minGiftN = document.getElementById("minGiftN")
//     chrome.storage.sync.get("minSubGiftAmount", ({ minSubGiftAmount }) => {
//         minGiftN.setAttribute("value", minSubGiftAmount);
//     });
//     let minCheerB = document.getElementById("minCheerB")
//     chrome.storage.sync.get("minCheerMsg", ({ minCheerMsg }) => {
//         minCheerB.setAttribute("value", minCheerMsg);
//     });
//     let minCheerN = document.getElementById("minCheerN")
//     chrome.storage.sync.get("minCheerMsgAmount", ({ minCheerMsgAmount }) => {
//         minCheerN.setAttribute("value", minCheerMsgAmount);
//     });
//     let minCheerClientB = document.getElementById("minCheerClientB")
//     chrome.storage.sync.get("minCheerBadge", ({ minCheerBadge }) => {
//         minCheerClientB.setAttribute("value", minCheerBadge);
//     });
//     let minCheerClientN = document.getElementById("minCheerClientN")
//     chrome.storage.sync.get("minCheerBadgeAmount", ({ minCheerBadgeAmount }) => {
//         minCheerClientN.setAttribute("value", minCheerBadgeAmount);
//     });
// }, false);
