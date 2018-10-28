/* 
* Copyright (c) 2018 - Lox Game Studio. All rights reserved.
* Purpose: Handles the localization system without any server function (only javascript).
* Developed by: LordOf Xen
*/
var defaultLanguage = english; // Select a language as a default language when can't find the language the user searched by adding as a parameter on the URL.

// To make language names short, we're using a dictionary.
var languageDictionary = {
    "en": english,
    "tr": turkish
  };

// Gets the specified language from the dictionary if exists.
function getLanguage(lang)
{
    for(var key in languageDictionary) 
    {
       if (key == lang)
        return languageDictionary[key];
    }
    return "none";
}

var currentLanguage = null;
function loadLanguage(langname) 
{
    var lang = getLanguage(langname);
    if (lang != "none")
        currentLanguage = lang;
    else
        currentLanguage = defaultLanguage; // Use the default language when can't find the specified language.

    var lpicker = document.getElementById("loxlanguagesystem-picker");
    var pickeritems = document.getElementsByClassName("loxlanguagesystem-pickeritem");
    if (pickeritems.length > 0 && lpicker != null)
    {
        for (var i = 0; i < pickeritems.length; i++) 
        {
            var loxlang = "#invalid";
            if (pickeritems[i].hasAttribute("loxlang"))
                loxlang = pickeritems[i].getAttribute("loxlang");

            if (loxlang != "#invalid" && loxlang == langname)
            {
                lpicker.selectedIndex = i;
                break;
            }
        }
    }
}

$("#loxlanguagesystem-picker").on('change', function()
{ 
    var langname = this.options[this.selectedIndex].getAttribute("loxlang");
    setCookie("lox_lastlanguage", langname, 7);
    location.href = "?lang="+langname; //Change the language when the client changes the selected option.
});

function getToken(tokenName)
{
    return currentLanguage[tokenName];
}

function changeAllTexts()
{
    var classes = document.getElementsByClassName("loxtokens");

    if (classes.length > 0)
    {
        for (var i = 0; i < classes.length; i++) 
        {
            var keyname = "#invalid";
            if (classes[i].hasAttribute("ltoken"))
                keyname = classes[i].getAttribute("ltoken");
            
            if (currentLanguage.hasOwnProperty(keyname))
                classes[i].innerHTML = currentLanguage[keyname].replace("%loxnewline%","</br>");
        }
    }
}

var langName = getUrlParam('lang','lnoneparam');
if (langName == "lnoneparam")
{
    var cookie_l = getCookie("lox_lastlanguage");
    if (cookie_l != null && cookie_l != "")
        langName = cookie_l;
}
loadLanguage(langName);

document.title = getToken("title");