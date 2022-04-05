console.log("YEEEEEEEEEEEET", document.getElementById("altChatDiv"));
document.addEventListener("DOMContentLoaded", loaded(), false);
window.addEventListener("popstate", function () {
    console.log("popstate called! ==========================================");
}, false);
window.addEventListener("locationchange", function () {
    console.log("locationchange called! ==========================================");
}, false);
// fix the event so it calls when switching to another channel and not just on reload or first page load.

// adds easier identification and creates dupe target.
function loaded() {
    console.log("LOADED CALLLED ----> ", document.readyState);
    if (document.readyState === "interactive") {
        if (document.getElementById("altChatDiv") === null) {
            console.log("YEEEEEEEEEEEEEE IT WOOOORSSSSSSSSSSSKKKK");

            // sets up id for copying chat to filter
            document.querySelectorAll('[role="log"]').forEach(function (x) {
                x.setAttribute("id", "chatLogDefault");
            });
            // creates filtered chat box
            locate = document.getElementsByClassName("gzJAxw");
            altChatDiv = document.createElement("div");
            altChatDiv.setAttribute("id", "altChatDiv");
            altChatDiv.setAttribute(
                "style",
                "height: 30%; position: relative; overflow-y: auto; overflow-x: hidden;"
            );
            Array.prototype.forEach.call(locate, function (x) {
                x.prepend(altChatDiv);
            });
            welcome1 = document.createElement("span");
            welcome1.setAttribute("class", "CoreText-sc-cpl358-0 Layout-sc-nxg1ff-0 chat-line__status");
            welcome1.innerHTML = "Welcome to the filter!";
            altChatDiv.appendChild(welcome1);
            Array.prototype.forEach.call(
                document.getElementsByClassName("ejGzhU"),
                function (x) {
                    x.setAttribute("style", "height: 40% !important");
                }
            );
            console.log("YEEEEEEEEEEEET", document.getElementById("altChatDiv"));
            setupListener();
        }
    }
}

// add variable here after inserting it in options.html
// var must have same name as id
// temp variables
vip = true;
mod = true;
verified = true;
prime = true;
antiSpam = true;
subbed = true;
minsub = 999999999;
minSubGift = true;
minSubGiftAmount = 999999999;
minCheerMsg = true;
minCheerMsgAmount = 999999999;
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
});

// updates local variables when they are changed
chrome.storage.onChanged.addListener(function (storag) {
    window[Object.keys(storag)[0]] = Object.values(Object.values(storag)[0])[0];
    console.log(Object.keys(storag)[0], "updated to", Object.values(Object.values(storag)[0])[0]);
});

// REWORKED NODE INSERTER
function setupListener() {
    // easier use
    altChatDivId = document.getElementById("altChatDiv");
    chatLogDefault = document.getElementById("chatLogDefault");
    // checks for new messages in chat
    chatLogDefault.addEventListener("DOMNodeInserted", function () {
        // Gets all information about message

        if (chatLogDefault.lastChild.lastChild != "undefined" && chatLogDefault.lastChild.lastChild != null) {
            var child = chatLogDefault.lastChild.lastChild;
            // ADD: user defined chat filter <--------------
            // this does not work properly
            // if ( Array.prototype.forEach.call(child.getElementsByClassName("chat-badge"), function (x) {
            //     at = x.getAttribute("alt");
            //     console.log(vip, mod, ["VIP", "Moderator"].includes(at));
            //     if (vip || mod) if ( (at == "VIP" && vip) || ( at == "Moderator" && mod)) { return false } else return true
            // })) {return}
            if (vip || mod || verified) {
                checkBadge = [];
                for (let i = 0, arr = child.getElementsByClassName("chat-badge"); i < arr.length; i++){
                    // console.log(arr[i]);
                    arrTib = arr[i].getAttribute("alt");
                    if ( arrTib == "VIP" && vip){
                        checkBadge.push(true);
                    }
                    else if (arrTib == "Moderator" && mod){
                        checkBadge.push(true);
                    }
                    else if (arrTib == "Verified" && verified){
                        checkBadge.push(true);
                    }
                    else if (arrTib == "Prime Gaming" && prime){
                        checkBadge.push(true);
                    }   
                    else checkBadge.push(false);
                }
                if (checkBadge.includes(true)) {} else return;
            }
            // ADD: user defined chat filter <--------------
            // check if object is from a client. 
            if (child.getElementsByClassName("chat-author__display-name")[0] != "undefined" && child.getElementsByClassName("chat-author__display-name")[0] != null) {
                var childName = child.getElementsByClassName("chat-author__display-name")[0].textContent;
                // class: seventv-message-context
                // gets all message content
                var childContent = "";
                if (child.getElementsByClassName("seventv-message-context") != "undefined" && child.getElementsByClassName("seventv-message-context") != null) {
                    for (let y of child.getElementsByClassName("seventv-message-context")) {
                        for (let x of y.children) {
                            if (x.classList.contains("seventv-emote")) {
                                childContent += x.children[0].children[0].getAttribute("alt");
                            }
                            else if (x.children[0] && x.children[0].nodeName == "IMG") {
                                //console.log("IMG", x)
                                childContent += x.children[0].getAttribute("alt");
                            }
                            else if (x.textContent) {
                                childContent += x.textContent;
                            }
                            else {
                                childContent += "--";
                            }
                        }
                    }
                }
                if (child.getElementsByClassName("chat-line__timestamp")[0].textContent != null) {
                    var childTStamp = child.getElementsByClassName("chat-line__timestamp")[0].textContent;
                }
                else {
                    var childTStamp = "-NO-TIMESTAMP-";
                }
            }
        }
        else return;
        // Ensures that these variables actually exist
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

// jCgbLy
// gzJAxw
// ejGzhU <- user message
