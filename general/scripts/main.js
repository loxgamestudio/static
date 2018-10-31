var isMobile = {
    Android: function() {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function() {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function() {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function() {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function() {
        return navigator.userAgent.match(/IEMobile/i) || navigator.userAgent.match(/WPDesktop/i);
    },
    any: function() {
        return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
    }
};

function disabledEventPropagation(event)
{
   if (event.stopPropagation){
       event.stopPropagation();
   }
   else if(window.event){
      window.event.cancelBubble=true;
   }
}

function activeTab(tab){
    $('.nav-tabs a[href="#' + tab + '"]').tab('show');
};

$( document ).ready(function() 
{
    // Change all localizable texts in the HTML
    changeAllTexts();
    var site_container = document.getElementById("isite-container");
    var loader = document.getElementById("lxloader");
    // Hide the loader div to show the site.
    loader.style.display = "none";
    // Make the animation
    site_container.style.display = "block";
    site_container.style.animation = "fadeInAnimation linear 1s 1";
    site_container.style.transformOrigin = "50% 50%";
    site_container.style.webkitanimation = "fadeInAnimation linear 1s 1";
    site_container.style.webkitTransformOrigin = "50% 50%";
});
