// ==UserScript==
// @description  Removes Navigation-Items and manipulate Main-Navigation behavior
//
//
//
// @include      *://apps.collabservintegration.com/*
//
// @exclude
//
// @run-at       document-end
//
// ==/UserScript==

console.log('LimitMainNavigation loaded');
if(typeof(dojo) != "undefined") {
	require(["dojo/query", "dojo/dom-construct", "dojo/dom-attr", "dojo/domReady!"], function(query, domConstruct,domAttr){
        try {
            // utility function to let us wait for a specific element of the page to load...
            var waitFor = function(callback, elXpath, elXpathRoot, maxInter, waitTime) {
                if(!elXpathRoot) var elXpathRoot = dojo.body();
                if(!maxInter) var maxInter = 10000;  // number of intervals before expiring
                if(!waitTime) var waitTime = 1;  // 1000=1 second
                if(!elXpath) return;
                var waitInter = 0;  // current interval
                var intId = setInterval( function(){
                    if( ++waitInter<maxInter && !dojo.query(elXpath,elXpathRoot).length) return;

                    clearInterval(intId);
                    if( waitInter >= maxInter) { 
                        console.log("**** WAITFOR ["+elXpath+"] WATCH EXPIRED!!! interval "+waitInter+" (max:"+maxInter+")");
                    } else {
                        console.log("**** WAITFOR ["+elXpath+"] WATCH TRIPPED AT interval "+waitInter+" (max:"+maxInter+")");
                        callback();
                    }
                }, waitTime);
            };

            // here we use waitFor to wait on the mainContentDiv element
            // before we proceed to customize the page...
            waitFor( function(){
			// wait until the "loading..." node has been hidden
			// indicating that we have loaded content.
            //
            console.log('Waiting on dojo elements....');
            //Removes the Company Name and the corresponding link
            dojo.query("#nav_bar_include .org._myorg").forEach(domConstruct.destroy);
            //Removes the Nav-Items regarding meetings
            dojo.query("#nav_bar_include .stmeetings").forEach(domConstruct.destroy);
            //Changes the link of the Homepage <a> Tag
            dojo.query("#ics-scbanner-home").forEach(function(node){domAttr.set(node,"href","https://apps.ce.collabserv.com/xcc/cloud?page=start");});
            console.log('Finished with on dojo elements....');
           },
		  "#ics-scbanner-home");
      } catch(e) {
          alert("Exception occurred in global/LimitMainNavigation Customizer Extension" + e);
      }
   });
} 
