/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!******************************!*\
  !*** ./src/main/scriChat.js ***!
  \******************************/
// import jquery from 'jquery';

// console.log("YEEEEEEEEEEEET", document.getElementById("altChatDiv"));

// document.addEventListener("DOMContentLoaded", function() {
//     document.head.prepend("<link rel=\"stylesheet\" href=\"./assets/exstyle.css\">");
// }, false);

setInterval(function () { if (document.getElementById("altChatDiv") === null) { loaded() } }, 5000);

// fix the event so it calls when switching to another channel and not just on reload or first page load.

// adds easier identification and creates dupe target.
function loaded() {
    console.log("LOADED CALLLED ----> ", document.readyState);
    if (document.getElementById("altChatDiv") === null) {
        // sets up id for copying chat to filter
        document.querySelectorAll('[role="log"]').forEach(function (x) {
            x.setAttribute("id", "chatLogDefault");
        });

        // creates filtered chat box
        locate = document.getElementsByClassName("chat-room__content");
        altChatDiv = document.createElement("div");
        altChatDiv.setAttribute("id", "altChatDiv");
        altChatDiv.setAttribute("class", "scrollbar-style-1");
        altChatDiv.setAttribute(
            "style",
            "height: 30%; position: relative; overflow-y: auto; overflow-x: hidden; border-bottom: solid; border-color: gray;"
        );

        Array.prototype.forEach.call(locate, function (x) {
            x.prepend(altChatDiv);
        });

        // makes the alt chat visible and forces main chat to only take so much of the screen.
        // ADD: user defined height
        Array.prototype.forEach.call(
            document.getElementsByClassName("chat-list--default"),
            function (x) {
                x.setAttribute("id", "blockhidden");
                x.setAttribute("style", "height: 40% !important");
            }
        );

        // welcome message
        welcome1 = document.createElement("span");
        welcome1.setAttribute("class", "CoreText-sc-cpl358-0 Layout-sc-nxg1ff-0 chat-line__status");
        if (document.getElementById("seventv") == null) {
            welcome1.innerHTML = "Install <a href=\"https://chrome.google.com/webstore/detail/7tv/ammjkodgmmoknidbanneddgankgfejfh\">7TV chrome extension</a> for this to work\n";
        }
        else {
            welcome1.innerHTML = "Welcome to the filter!";
            console.log("YEEEEEEEEEEEET", document.getElementById("altChatDiv"));
            setupListener();
        }
        altChatDiv.appendChild(welcome1);

        // makes the leaderboard not be inbetween the chatboxes
        let swapPos = setInterval(function () {
            // console.log("next sibling to altChat", document.getElementById("altChatDiv").nextElementSibling.children[0].children[0].classList.contains("channel-leaderboard"));
            leaderboard = document.getElementById("altChatDiv").nextElementSibling;
            // console.log("swdfåpoakswedfo",leaderboard.children);
            if (leaderboard.children.length != 0 && leaderboard.children[0].children[0].classList.contains("channel-leaderboard")) {
                console.log("Swapped Leaderboard Position");
                document.getElementById("altChatDiv").parentNode.insertBefore(leaderboard, document.getElementById("altChatDiv"));
                clearInterval(swapPos)
            }
        }, 5000);
    }
}

// add variable here after inserting it in options.html
// var must have same name as id
// temp variables

// shows/hides the extension
enabled = true;
// checks for badges
broadcaster = true;
vip = true;
mod = true;
verified = true;
prime = true;
// currently always true - prevents duplicate messages within the same timeframe.
antiSpam = true;
// not implemented
subbed = true;
minsub = 999999999;
minSubGift = true;
minSubGiftAmount = 999999999;
// working on - 
minCheerMsg = true;
minCheerMsgAmount = 999999999;
// not implemented
minCheerBadge = true;
minCheerBadgeAmount = 999999999;

// updates local variables to match client settings on startup
chrome.storage.sync.get(null, function (itemsOBJ) {
    for (var storKey in itemsOBJ) {
        if (itemsOBJ.hasOwnProperty(storKey)) {
            // console.log(storKey, itemsOBJ[storKey]);
            window[storKey] = itemsOBJ[storKey];
        }
    }
    altChatVisibility(enabled);
});

// updates local variables when they are changed
chrome.storage.onChanged.addListener(function (storag) {
    console.log("=============????????", storag);
    window[Object.keys(storag)[0]] = Object.values(Object.values(storag)[0])[0];
    console.log(Object.keys(storag)[0], "updated to", Object.values(Object.values(storag)[0])[0]);
    if (Object.keys(storag)[0] == "enabled") {
        altChatVisibility(Object.values(Object.values(storag)[0])[0]);
    }
});

function altChatVisibility(bool) {
    if (document.getElementById("altChatDiv") != "undefined" && document.getElementById("altChatDiv") != null) {
        console.log("Visibility Toggled")
        if (bool) {
            //document.getElementById("blockhidden").style.height = "40% !important";
            document.getElementById("blockhidden").setAttribute("style", "height: 40% !important");
            document.getElementById("altChatDiv").setAttribute("style", "height: 30%; position: relative; overflow-y: auto; overflow-x: hidden;");
        }
        else {
            // document.getElementById("blockhidden").style.height = "";
            document.getElementById("blockhidden").setAttribute("style", "height: 100% !important");
            document.getElementById("altChatDiv").setAttribute("style", "height: 0%; position: relative; overflow-y: auto; overflow-x: hidden;");
        }
    }
}

// REWORKED NODE INSERTER
function setupListener() {
    // easier use
    altChatDivId = document.getElementById("altChatDiv");
    chatLogDefault = document.getElementById("chatLogDefault");
    // checks for new messages in chat
    chatLogDefault.addEventListener("DOMNodeInserted", function (insertedNode) {
        // Gets all information about message
        // console.log("--->", insertedNode, insertedNode.target.classList);
        // WHAT THE ACTUAL FUCK WAS I THINKING
        // imma need to rework whatever i did here.
        // if (insertedNode.target.classList[0] == "chat-line__message") {
        if (insertedNode.target.classList && insertedNode.target.classList.contains("chat-line__message")) {
            // console.log("Inserted Node Target", insertedNode.target);
            var child = insertedNode.target;
            // ADD: user defined chat filter <--------------
            var checkFilter = [];
            if (vip || mod || verified || prime || broadcaster) {
                for (let badges of child.getElementsByClassName("chat-badge")) {
                    arrTib = badges.getAttribute("alt");
                    if (arrTib == "VIP" && vip) {
                        checkFilter.push(true);
                    }
                    else if (arrTib == "Broadcaster" && broadcaster) {
                        checkFilter.push(true);
                    }
                    else if (arrTib == "Moderator" && mod) {
                        checkFilter.push(true);
                    }
                    else if (arrTib == "Verified" && verified) {
                        checkFilter.push(true);
                    }
                    else if (arrTib == "Prime Gaming" && prime) {
                        checkFilter.push(true);
                    }
                    else checkFilter.push(false);
                }
                if (checkFilter.includes(true) || minCheerMsg) { } else return;

                // // work out a method to filter these:
                // subbed = true;
                // minsub = 999999999;
                // minSubGift = true;
                // minSubGiftAmount = 999999999;
                // minCheerMsg = true;
                // minCheerMsgAmount = 999999999;
                // minCheerBadge = true;
                // minCheerBadgeAmount = 999999999;
            }
            // ADD: user defined chat filter <--------------

            // check if object is from a client.
            // console.log("zzxc", child.getElementsByClassName("chat-author__display-name")[0], "--->", child.getElementsByClassName("chat-author__display-name")[0]);

            var childName = child.getElementsByClassName("chat-author__display-name")[0].textContent;
            // class: seventv-message-context
            // gets all message content
            var childContent = "";
            // console.log("seven", child.getElementsByClassName("seventv-message-context"), child.getElementsByClassName("seventv-message-context")[0]);
            // console.log("ChildObj", child);
            var messageContent;
            if (child.children[0].children[1] != "undefined" && child.children[0].children[1] != null) {
                messageContent = child.children[0].children[1].children[0].children[0].lastChild
            }
            else {
                messageContent = child.children[0].children[0].children[0].children[0].lastChild
            }
            // console.log("msgCont",messageContent)
            for (let messageBit of messageContent.children) {
                if (messageBit.classList.contains("seventv-emote")) {
                    if (minCheerMsg && messageBit.children[0].children[0].getAttribute("alt") == "Cheer"
                    && messageBit.children[0].children[1].innerHTML >= minCheerMsgAmount) {
                        childContent += messageBit.children[0].children[0].getAttribute("alt");
                    }
                    else if (minCheerMsg){
                        return
                    }
                    else {
                        childContent += messageBit.children[0].children[0].getAttribute("alt");
                    }
                }
                else if (messageBit.children[0] && messageBit.children[0].nodeName == "IMG") {
                    //console.log("IMG", x)
                    childContent += messageBit.children[0].getAttribute("alt");
                }
                else if (messageBit.textContent) {
                    childContent += messageBit.textContent;
                }
                else {
                    childContent += "-EMPTY-";
                }
            }
            childContent = childContent.replace(" ","");
            // console.log("childContent -currently disabled to expected empty-",childContent);

            // for some reason twitch decided to mix chat messages with usernames and everything else unlike what 7tv does to the messages.
            // think imma just require 7tv to make all this easier.
            // else if (child.getElementsByClassName("chat-line__no-background") != "undefined" && child.getElementsByClassName("chat-line__no-background") != null){
            //     for (let y of child.getElementsByClassName("chat-line__no-background")){
            //         for (let x of y.lastChild.children){
            //             // duplicate the obove seventv function to work without 7tv
            //         }
            //     }
            // }
            if (child.getElementsByClassName("chat-line__timestamp")[0].textContent != null) {
                var childTStamp = child.getElementsByClassName("chat-line__timestamp")[0].textContent;
            }
            else {
                var childTStamp = "-NO-TIMESTAMP-";
            }

        }
        else return;
        // Ensures that these variables actually exist
        // console.log(childName, childContent, childTStamp);
        // console.log(childContent);
        if (childName && childContent && childTStamp) {
            // COPIES FROM MAIN CHAT TO FILTERED CHAT WINDOW
            if (!document.getElementById(childName + childContent + childTStamp)) {
                cchild = child.cloneNode(true);
                cchild.setAttribute("id", childName + childContent + childTStamp);
                altChatDivId.appendChild(cchild);
                updateScroll();
                // Removes elements from altchat
                if (altChatDivId.children.length >= 100) {
                    altChatDivId.removeChild(altChatDivId.children[0]);
                }
            }
        }
    },
        false
    );

}

// needs rework
function updateScroll() {
    if (altChatDivId.scrollHeight - altChatDivId.clientHeight <= altChatDivId.scrollTop + 500) {
        altChatDivId.scrollTop = altChatDivId.scrollHeight;
    }
}

// checks if exists
function doesExist(object) {
    if (object && object != "undefined" && object != null) {
        return true
    }
    else return false
}


/******/ })()
;
//# sourceMappingURL=chat.js.map