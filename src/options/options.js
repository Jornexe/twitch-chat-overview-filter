import IMask from 'imask';

// makes input numbers look nice
Array.prototype.forEach.call(
    document.getElementsByClassName("number"),
    function (x) {
        console.log(x);
        window[x.getAttribute("id")+"dyn"] = IMask(
            x,
            {
                mask: Number,
                min: 0,
                thousandsSeparator: ' '
            });
        // console.log(x.getAttribute("id")+"dyn", window[x.getAttribute("id")+"dyn"])
        // var numberMask32 = IMask(
        //     x,
        //     {
        //         mask: Number,
        //         min: 0,
        //         thousandsSeparator: ' '
        //     });
    }
);

// way better version that i made. myself.
// updates the values in storage
Array.prototype.forEach.call(
    document.getElementsByClassName("check"),
    function (x) {
        x.addEventListener("change", function(z) {
            let zid = z.target.getAttribute("id");
            let zvalue = z.target.checked;
            //console.log({[zid]: zvalue});
            chrome.storage.sync.set({[zid]: zvalue});
        },false);
    }
);

Array.prototype.forEach.call(
    document.getElementsByClassName("number"),
    function (x) {
        x.addEventListener("input", function(z) {
            let zid = z.target.getAttribute("id");
            // window[zid+"dyn"].updateValue();
            let zvalue = z.target.value;
            //window[zid+"dyn"].updateValue();
            chrome.storage.sync.set({[zid]: zvalue});
        },false);
    }
);

// gets the values from storage
Array.prototype.forEach.call(
    document.getElementsByClassName("check"),
    function (x) {
        chrome.storage.sync.get(x.getAttribute("id"), (z) => {
            x.checked = Object.values(z)[0];
        });
    }
);

Array.prototype.forEach.call(
    document.getElementsByClassName("number"),
    function (x) {
        chrome.storage.sync.get(x.getAttribute("id"), (z) => {
            x.setAttribute("value", Object.values(z)[0]);
            window[Object.keys(z)[0]+"dyn"].updateValue();
        });
    }
);