/*---------------------*/
/*---- Insert CSS -----*/
console.log("ÄÄ scrambler.js");

var head = document.getElementsByTagName("head")[0];
var link = document.createElement("link");
link.rel = "stylesheet";
link.type = "text/css";
link.href = browser.runtime.getURL("scrambler.css");
link.media = "all";
head.appendChild(link);

// Inject p5.js library
var p5Script = document.createElement("script");
p5Script.src = "https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.9.0/p5.min.js";
p5Script.onload = function () {
  // Once p5 is loaded, inject your sketch
  var sketchScript = document.createElement("script");
  sketchScript.src = browser.runtime.getURL("sketch.js");
  document.body.appendChild(sketchScript);
};
document.body.appendChild(p5Script);
