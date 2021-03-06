// ==UserScript==
// @copyright    Copyright IBM Corp. 2017
//
// @name         LimitUsermenu
// @version      0.1
// @description  Removes Menu-Items from user Menu
//
// @include      *://apps.collabservintegration.com/*
//
// @exclude
//
// @run-at       document-end
//
// ==/UserScript==

function sleep(milliseconds) {
  const date = Date.now();
  let currentDate = null;
  do {
    currentDate = Date.now();
  } while (currentDate - date < milliseconds);
}
sleep(10000);

console.log('typeof(dojo) = ' + typeof(dojo));
if(typeof(dojo) != "undefined") {
	require(["dojo/query", "dojo/dom-construct", "dojo/domReady!"], function(query, domConstruct){
	console.log('LimitUsermenu.js is being run !');
        try {
	    
            // utility function to let us wait for a specific element of the page to load...
            var waitFor = function(callback, elXpath, elXpathRoot, maxInter, waitTime) {
                if(!elXpathRoot) var elXpathRoot = dojo.body();
                if(!maxInter) var maxInter = 20000;  // number of intervals before expiring
                if(!waitTime) var waitTime = 1;  // 1000=1 second
                if(!elXpath) return;
		console.log('Waiting for '+ elXpath + ' in ' + elXpathRoot);
                var waitInter = 0;  // current interval
                var intId = setInterval( function(){
		    console.log('Query length = ' + dojo.query(elXpath,elXpathRoot).length);
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
	    console.log('About to call waitFor function');
            waitFor( function(){
			// wait until the "loading..." node has been hidden
			// indicating that we have loaded content.
   		       // dojo.query("#bss-usersMenu li.userreports").forEach(domConstruct.destroy);
			   dojo.query("#bss-usersMenu li.downloads").forEach(domConstruct.destroy);
			   dojo.query("#bss-usersMenu li.invite").forEach(domConstruct.destroy);			   		   
           },
		  "#bss-usersMenu");
      } catch(e) {
	  console.log("Exception occurred in global/LimitUsermenu Customizer Extension" + e);
          alert("Exception occurred in global/LimitUsermenu Customizer Extension" + e);
      }
   });
} 
