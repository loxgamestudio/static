/* 
* Copyright (c) 2018 - Lox Game Studio. All rights reserved.
* Purpose: Custom Message Box
* Developed by: LordOf Xen
*/
var opened = false;
var loxnotifier_container = document.getElementById("ilnotifier-container");
var loxnotifier = document.getElementById("ilnotifier");
var loxokButton = document.getElementById("ilbtn-ok");
var loxcancelButton = document.getElementById("ilbtn-cancel");
var loxttitle = document.getElementById("lxititle");
var loxmmessage = document.getElementById("lximessage");
var style = undefined;

var default_lox_buttonCancelColor = "rgb(0, 200, 0)";
var default_lox_buttonOkColor = "rgb(230, 0, 0)";
var default_lox_buttonOkHoverColor = "red";
var default_lox_buttonCancelHoverColor = "rgb(0, 230, 0)";

//window.addEventListener("resize", lOnWindowResize);

/**
 * Initializes the Lox Message Box.
 * @param {string} cancelText Sets the Cancel button's text.
 * @param {string} okText Sets the OK button's text.
 */
function initLoxMessageBox(cancelText, okText)
{
    loxnotifier_container.addEventListener("animationend", onClosingAnimationEnd);
	loxokButton.innerHTML = okText;
	loxcancelButton.innerHTML = cancelText;
}

/**
 * Sets the Color of the Lox Message Box buttons.
 * @param {string} cancelColor Cancel Button's Color.
 * @param {string} okColor OK Button's Color.
 * @param {string} cancelHoverColor Cancel Button's Hover Color.
 * @param {string} okHoverColor OK Button's Hover Color.
 */
function setLoxMessageBoxColors(cancelColor, okColor, cancelHoverColor, okHoverColor)
{
    if (okColor != undefined)
        loxokButton.style.backgroundColor = okColor;

    if (cancelColor != undefined)
        loxcancelButton.style.backgroundColor = cancelColor;

    $(".lnotifier .lbtnCancel").hover(function(e) { 
        $(this).css("background-color", e.type === "mouseenter"?cancelHoverColor : cancelColor) 
    });
    $(".lnotifier .lbtnOk").hover(function(e) { 
        $(this).css("background-color", e.type === "mouseenter"?okHoverColor : okColor) 
    });
}

/**
 * Sets the text color of Title and Message.
 * @param {string} titleColor The color for the Title of the Message Box.
 * @param {string} messageColor The color for the Message of the Message Box.
 */
function setLoxMesageBoxTextColors(titleColor, messageColor)
{
    loxttitle.style.color = titleColor;
    loxmmessage.style.color = messageColor;
}

/**
 * Shows the message box with the specified title, message, color and/or event.
 * @param {string} title The Title of the Message Box.
 * @param {string} message The Message of the Message Box.
 * @param {string} level The warning level of the Message Box [1: information, 2: question, 3: warning, 4: error, 5: critical, 6: custom]
 * @param {string} onokclick The event for the callback which is triggered when the client clicks to the OK button.
 * @param {string} oncancelclick The event for the callback which is triggered when the client clicks to the Cancel button.
 */
function openLoxMessageBox(title, message, level, onokclick, oncancelclick, custombackColor)
{
    if (!opened)
    {
        if (onokclick != undefined)
            loxokButton.onclick = onokclick;
        if (oncancelclick != undefined)
            loxcancelButton.onclick = oncancelclick;
        else
            loxcancelButton.onclick = function(){closeLoxMessageBox();};

        if (loxnotifier != null && loxnotifier_container != null)
        {
            loxttitle.innerHTML = title;
            loxmmessage.innerHTML = message;
            switch (level)
            {
                case 1:
                    loxnotifier.style.backgroundColor = "rgb(25,25,25)";
                break;
                case 2:
                    loxnotifier.style.backgroundColor = "rgb(20,20,20)";
                break
                case 3:
                    loxnotifier.style.backgroundColor = "rgb(255,128,0)";
                break;
                case 4:
                    loxnotifier.style.backgroundColor = "red";
                break;
                case 5:
                    loxnotifier.style.backgroundColor = "red";
                break;
                case 6:
                    if (custombackColor != undefined)
                        loxnotifier.style.backgroundColor = custombackColor;
                break;
            }
            loxnotifier_container.style.animation = "fadeInAnimation ease 0.8s 1";
            loxnotifier_container.style.webkitanimation = "fadeInAnimation ease 0.8s 1";
            loxnotifier_container.style.display = "block";
            loxnotifier.style.display = "block";
            opened = true;
        }
    }
}

/**
 * Closes the Message Box if still open.
 */
function closeLoxMessageBox(closewithoutanim)
{
    if(opened)
    {
        if (!closewithoutanim)
        {
            loxnotifier_container.style.animation = "fadeOutAnimation ease 0.5s 1";
            loxnotifier_container.style.webkitanimation = "fadeOutAnimation ease 0.5s 1";
        }
        else
        {
            loxnotifier_container.style.display = "none";
            opened = false;
        }
    }
}

/**
 * The animation call back of the Fadeout animation when hiding the div.
 * @param {*} e 
 */
function onClosingAnimationEnd(e)
{
    if (e.animationName == "fadeOutAnimation")
    {
        loxnotifier_container.style.display = "none";
        loxnotifier.style.display = "none";
        opened = false;
    }
}