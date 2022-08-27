window.onbeforeunload = function () {
  window.scrollTo(0, 0);
}
  
  document.addEventListener('keyup', keyAnalysis);
  document.addEventListener('keyup', sliderPrecision);
  document.addEventListener('keydown', sliderPrecision);

  const sliders = document.getElementsByClassName('slider');

  function sliderPrecision(event) {
    if (event.shiftKey) {
      for (i = 0; i < sliders.length; i++) {
        sliders[i].step = 0.005;
      }
    } else {
      for (i = 0; i < sliders.length; i++) {
        sliders[i].step = 1;
      }
    }
  }
  function keyAnalysis(event) {
    if (event.ctrlKey) {
      if (event.code == 'KeyR') {
        resetParagraph();
      } else if (event.code == 'KeyL') {
        setLat1();
      } else if (event.code == 'KeyJ') {
        toggleLeftRight();
      } else if (event.code == 'KeyX') {
        toggleInverse();
      } else if (event.code == 'KeyC') {
        toggleCenter();
      } else if (event.code == 'KeyM') {
        toggleMenu();
      }
    }
  }
  function setLanguage(lang) {
    document.body.setAttribute('lang',lang);
  }
  function updateFeatures() {
    // update features based on user input:
    var testtext = getTestText();
    var codeLine = "";
    var checkboxes = document.getElementsByClassName("otFeature")
    for (i = 0; i < checkboxes.length; i++) {
      var checkbox = checkboxes[i];
      if (i!=0) { codeLine += ", " };
      codeLine += '"'+checkbox.name+'" ';
      codeLine += checkbox.checked ? '1' : '0';
      if (checkbox.name=="kern") {
        testtext.style.setProperty("font-kerning", checkbox.checked ? 'normal' : 'none');
      } else if (checkbox.name=="liga") {
        testtext.style.setProperty("font-variant-ligatures", checkbox.checked ? 'common-ligatures contextual' : 'no-common-ligatures no-contextual');
      } else if (checkbox.name=="dlig") {
        testtext.style.setProperty("font-variant-ligatures", checkbox.checked ? 'discretionary-ligatures' : 'no-discretionary-ligatures');
      } else if (checkbox.name=="hlig") {
        testtext.style.setProperty("font-variant-ligatures", checkbox.checked ? 'historical-ligatures' : 'no-historical-ligatures');
      }
    }
    testtext.style.setProperty("font-feature-settings", codeLine);
  }
  function resetParagraph() {
    const defaulttext = "I walked down the hallway. Who thought that such a small building could have such long aisles. Strolling my way past the tiny portraits, placed on the walls, my memories startet crashing onto me. It started off as such a beautiful evening. I feel like it was one of the happiest moments of my last three years. Cheerful faces with red cheeks from the wine, that was served, the candles glowing in the dark, putting a spark in the eyes. The night felt endless, also because it was so warm, that you did not even need a jacket. But only until I saw the look in his eyes. It felt like it was getting twenty degrees colder at least. Shivers were running down my spine, while his eyes focussed me and would not let go of me. The longer he was staring, the more anxious I became. I knew those situations. They are the first step before something is about to happen. It could be anything but for sure something he would regret by tomorrow morning.  He slowly approached me. Seconds felt like ages. I could almost feel his  breath on my face. He raised his hand and with all his power he threw the wineglass against the wall of the house. The rattling noises of breaking glass and spalshing liquids were accompanied by a wild scream of anger, that almost felt animalistic. One more glance at my shocked face, he ran off into the darkness, transfering his anger through his shoes into the moist grass...";
    const testtext = getTestText();
    testtext.innerHTML = defaulttext;
  }
  function setLat1() {
    const lat1 = "ABCDEFGHIJKLMNOPQRSTUVWXYZ abcdefghijklmnopqrstuvwxyz &Agrave;&Aacute;&Acirc;&Atilde;&Auml;&Aring;&AElig;&Ccedil;&Egrave;&Eacute;&Ecirc;&Euml;&Igrave;&Iacute;&Icirc;&Iuml;&ETH;&Ntilde;&Ograve;&Oacute;&Ocirc;&Otilde;&Ouml;&Oslash;&OElig;&THORN;&Ugrave;&Uacute;&Ucirc;&Uuml;&Yacute;&Yuml; &agrave;&aacute;&acirc;&atilde;&auml;&aring;&aelig;&ccedil;&egrave;&eacute;&ecirc;&euml;&igrave;&iacute;&icirc;&iuml;&eth;&ntilde;&ograve;&oacute;&ocirc;&otilde;&ouml;&oslash;&oelig;&thorn;&szlig;&ugrave;&uacute;&ucirc;&uuml;&yacute;&yuml; .,:;&middot;&hellip;&iquest;?&iexcl;!&laquo;&raquo;&lsaquo;&rsaquo; /|&brvbar;\()[]{}_-&ndash;&mdash;&sbquo;&bdquo;&lsquo;&rsquo;&ldquo;&rdquo;&quot;&#x27; #&amp;&sect;@&bull;&shy;*&dagger;&Dagger;&para; +&times;&divide;&plusmn;=&lt;&gt;&not;&mu; ^~&acute;`&circ;&macr;&tilde;&uml;&cedil; &yen;&euro;&pound;$&cent;&curren;&fnof; &trade;&reg;&copy; 1234567890 &ordf;&ordm;&deg;%&permil; &sup1;&sup2;&sup3;&frac14;&frac12;&frac34;";
    const testtext = getTestText();
    testtext.innerHTML = lat1;
  }
  function getTestText() {
    return document.getElementById("textarea");
  }
  function updateSlider() {
    var body = getTestText();
    var sliders = document.getElementsByClassName("slider");
    var settingtext = "";
    for (var i = 0; i < sliders.length; i++) {
      var sliderID = sliders[i].id;
      var sliderValue = sliders[i].value;
      var label = document.getElementById("label_"+sliderID);
      var labelName = label.getAttribute("name");

      label.textContent = ""+labelName+" _ "+sliderValue;

      if (sliderID == "fontsize") {
        // Text Size Slider
        body.style.setProperty("font-size", ""+sliderValue+"px");
        label.textContent += "px";
      } else if (sliderID == "lineheight") {
        // Line Height Slider
        body.style.setProperty("line-height", ""+sliderValue/100.0+"em");
        label.textContent += "%";
      } else {
        // OTVar Slider: collect settings
        if (settingtext != "") { settingtext += ", " };
        settingtext += '"' + sliderID + '" ' + sliderValue;
      }
    }
    // apply OTVar slider settings:
    body.style.setProperty("font-variation-settings", settingtext);
  }
  function vanish(item) {
    item.style.setProperty("display", "none");
  }
  function toggleLeftRight() {
    const waterfall = document.getElementById("textarea");
    if (waterfall.dir != "rtl") {
      waterfall.dir = "rtl";
      waterfall.align = "right";
    } else {
      waterfall.dir = "";
      waterfall.align = "";
    }
  }
  function toggleCenter() {
    const waterfall = document.getElementById("textarea");
    if (waterfall.align != "center") {
      waterfall.align = "center";
    } else {
      if (waterfall.dir == "rtl") {
        waterfall.align = "right";
      } else {
        waterfall.align = "left";
      }
    }
  }
  function toggleInverse() {
    const testText = document.getElementById("textarea");
    if (testText) {
      const link = document.getElementById("invert");
      if (testText.className == "●") {
        testText.className = "○";
        link.textContent = "🔳";
      } else {
        testText.className = "●";
        link.textContent = "🔲";
      }
    }
  }
  function toggleMenu() {
    const menu = document.getElementById("featureControls");
    menu.hidden = !menu.hidden;
  }


  var btn = document.getElementById("btn")
btn.onclick = function()
{
var bcolor = document.body.style.backgroundColor
  if (bcolor == "black")
  {
    document.body.style.backgroundColor = "white";
    document.getElementById("controls").style.backgroundColor = "white";
    document.getElementById("fontsize").style.backgroundColor = "black";
    document.getElementById("lineheight").style.backgroundColor = "black";
    document.getElementById("ANGS").style.backgroundColor = "black";
    document.getElementById("FREU").style.backgroundColor = "black";
    document.getElementById("AERG").style.backgroundColor = "black";
    document.getElementById("headline").style.color = "black";
    document.getElementById("textarea").style.color = "black";
    document.getElementById("alphabet").style.color = "black";
    document.getElementById("alphabet2").style.color = "black";
    document.getElementById("alphabet3").style.color = "black";
    document.getElementById("alphabet4").style.color = "black";
    document.getElementsByClassName("textblock").style.color = "black";
    document.getElementById("btn").style.backgroundColor = "black";
    document.getElementById("emotions").style.color = "black";
    document.getElementById("glyphen").style.color = "black";
    document.getElementById("impressum").style.color = "black";
    document.getElementById("impressum-text").style.color = "black";
    document.getElementById("calltoaction").style.color = "black";
    document.getElementById("calltoaction-text").style.color = "black";
    document.getElementById("abouthead").style.color = "black";
    document.getElementById("abouttext").style.color = "black";
    document.getElementById("startpage").style.color = "black";


  } else {
    document.body.style.backgroundColor = "black";
    document.getElementById("controls").style.backgroundColor = "black";
    document.getElementById("fontsize").style.backgroundColor = "white";
    document.getElementById("lineheight").style.backgroundColor = "white";
    document.getElementById("ANGS").style.backgroundColor = "white";
    document.getElementById("FREU").style.backgroundColor = "white";
    document.getElementById("AERG").style.backgroundColor = "white";
    document.getElementById("headline").style.color = "white";
    document.getElementById("textarea").style.color = "white";
    document.getElementById("alphabet").style.color = "white";
    document.getElementById("alphabet2").style.color = "white";
    document.getElementById("alphabet3").style.color = "white";
    document.getElementById("alphabet4").style.color = "white";
    document.getElementsByClassName("textblock").style.color = "white";
    document.getElementById("btn").style.backgroundColor = "white";
    document.getElementById("emotions").style.color = "white";
    document.getElementById("glyphen").style.color = "white";
    document.getElementById("impressum").style.color = "white";
    document.getElementById("impressum-text").style.color = "white";
    document.getElementById("calltoaction").style.color = "white";
    document.getElementById("calltoaction-text").style.color = "white";
    document.getElementById("abouthead").style.color = "white";
    document.getElementById("abouttext").style.color = "white";

  }

}
