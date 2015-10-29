(function() {
    "use strict";
    
    function drawPie() {
        [].forEach.call(document.querySelectorAll('.pie'), function(el) {
            var value = el.dataset.value,
                less50 = el.getElementsByClassName('less-than-50')[0],
                more50 = el.getElementsByClassName('more-than-50')[0];
        
            var prefix = (function() {
              var docEl = document.documentElement, s;
              if (docEl && (s = docEl.style)) {
                  if (typeof s.MozRotate == "string") {
                    return "-moz-";
                  } else if (typeof s.WebkitRotate == "string") {
                    return "-webkit-";
                  } else if (typeof s.MsRotate == "string") {
                    return "-ms-";
                  }
                            return "";
              }
            })();
        
            //console.log(prefix);
        
        
            if (value <=50) {
              var d = -180 + (value * (180/50));
              more50.style.display = 'none';
              less50.style.transform = prefix+"rotate("+d+"deg)";
            }
        
            if (value >50) {
              var d = (value * (180/50));
              more50.style.display = 'block';
              less50.style.transform = prefix+"rotate(0deg)";
              more50.style.transform = prefix+"rotate("+d+"deg)";
        }
        });
    }
    
    function setup() {
        var init = false;
        
        if (document.scrollingElement === undefined) { //Firefox & IE
            document.scrollingElement = document.documentElement;
        }

        document.addEventListener('scroll', function(){
			
			if (!init && document.scrollingElement.scrollTop > document.getElementById('skills').offsetTop - 300) {
				drawPie();
                init = true;
			}
		})
    }
    window.ringGraph = setup;
})()