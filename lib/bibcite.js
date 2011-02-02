
bibcite = new Object();

// Function to transform the whole document.  Add SRC to each IMG with
// ALT text starting with "tex:".  However, skip if element already
// has a SRC.
bibcite.init = function () {
    if (! document.getElementsByTagName) {
         return;
    }

    var objs = document.getElementsByTagName("a");
    var len = objs.length;

    for (i=0; i<len; i++)
    {
        var cite = objs[i];
        if (cite.text.substring(0,5) == 'cite:') {
                var cite_href = ""+cite.text.substring(5);
                cite.href="#"+cite_href;

                // Append TEX to the class of the IMG.
                cite.className +=' bibcite';
                for (var j=0;j<len;j++)
                {
                   var ref = objs[j];
                   if (ref.name == cite_href) {
                      var num = ref.text;
                      cite.innerHTML=num;
                      break;
                   }
                }
        }
    }
    mathtran.hideElementById("mathtran.error")
}

// Thanks to Scott Andrew, we resolve a cross-browser issue.
// http://scottandrew.com/weblog/articles/cbs-events
bibcite.addEvent = function (obj, evType, fn, useCapture) {
    if (obj.addEventListener) { //For Mozilla.
        obj.addEventListener(evType, fn, useCapture);
        return true;
    } else if (obj.attachEvent) { //For Internet Explorer.
        var r = obj.attachEvent("on"+evType, fn);
        return r;
    }
}

// Initialise once the whole document is loaded.
bibcite.addEvent(window, 'load', bibcite.init, false);
