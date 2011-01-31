// Copyright: (c) 2007 The Open University, Milton Keynes, UK
// License: GPL version 2 or (at your option) any later version.
// Author: Jonathan Fine <jfine@pytex.org>, <J.Fine@open.ac.uk>

// Javascript that uses MathTran to add images to your web page.

/* Typical use:
   ...
   <script type="text/javascript" src="/js/mathtran_img.js"></script>
   ...
   <p id="mathtran_img.error">Hidden unless init() fails.</p>
   ...

   <p>The equation of the unit circle <img alt="tex:x^2+y^2=1" /> and
   a related trignometric identity <img alt="tex:\sin^2\theta +
   \cos^2\theta = 1" />.  </p>

   ...  */

// $Source: /cvsroot/mathtran/client/www/js/mathtran_img.js,v $ 
// $Revision: 1.1 $

// Create a namespace, to hold variables and functions.
mathtran = new Object();

// Change this use a different MathTran server.
mathtran.imgSrc = "http://chart.apis.google.com/chart?cht=tx&chl=";

// Function to transform the whole document.  Add SRC to each IMG with
// ALT text starting with "tex:".  However, skip if element already
// has a SRC.
mathtran.init = function () {
    if (! document.getElementsByTagName) {
         return;
    }

    var objs = document.getElementsByTagName("img");
    var len = objs.length;

    for (i=0; i<len; i++)
    {
        var img = objs[i];
        if (img.alt.substring(0,2) == '$$') {
                var tex_src = img.alt.substring(2);
                // See http://xkr.us/articles/javascript/encode-compare/
                img.src = mathtran.imgSrc + encodeURIComponent(tex_src);

                // Append TEX to the class of the IMG.
                img.className +=' tex';
        }else if(img.alt.substring(0,1) == '$') {
                var tex_src = img.alt.substring(1);
                // See http://xkr.us/articles/javascript/encode-compare/
                img.src = mathtran.imgSrc + encodeURIComponent('\\displaystyle '+tex_src);

                // Append TEX to the class of the IMG.
                img.className +=' tex';
        }
    }
    mathtran.hideElementById("mathtran.error")
}

// Utility function.
mathtran.hideElementById = function (id) {
    var obj = document.getElementById(id);
    if (obj) {
        obj.style.display = 'none';
    }
}

// Thanks to Scott Andrew, we resolve a cross-browser issue.
// http://scottandrew.com/weblog/articles/cbs-events
mathtran.addEvent = function (obj, evType, fn, useCapture) {
    if (obj.addEventListener) { //For Mozilla.
        obj.addEventListener(evType, fn, useCapture);
        return true;
    } else if (obj.attachEvent) { //For Internet Explorer.
        var r = obj.attachEvent("on"+evType, fn);
        return r;
    }
}

// Initialise once the whole document is loaded.
mathtran.addEvent(window, 'load', mathtran.init, false);

