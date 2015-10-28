

"use strict";

//This object makes the labels for text fields in a form to appear when the field is clicked
//while the value or the palceholder displayed in the filed disappears.
//
//Labels must be in the <label> html tag intitialised with a "nolabel" class.
//the <label> tag must be a previous sibling of the form field

function FormWithLabels(el) {
	var inputs = el.getElementsByTagName('input'),
		textareas= el.getElementsByTagName('textarea'),
		i;
		
	this.textFields = [];
	
	for (i=0; i<inputs.length; i++) {
		if (inputs[i].type == 'text') {
			this.textFields.push(inputs[i]);
		}
	}
	
	for (i=0; i<textareas.length; i++) {
		this.textFields.push(textareas[i]);
	}
	
	for (i=0; i<this.textFields.length; i++) {
		this.textFields[i].onclick = function() {
			var label = getLabel(this);
			label.className = label.className.replace(/nolabel/, '');
			if (this.value) {
				this.value = '';
			}
			if (this.placeholder) {
				this.placeholder='';
			}
		}
	}
	
	function getLabel(n)
	{
		var x = n.previousSibling;
		
		while (x && x.tagName!='LABEL')
		{
			x = x.previousSibling;
		}
		return x;
	}
}

function Portfolio(el,itemTag) {
	
	var i,
		children = el.getElementsByTagName(itemTag),
		items = [],
		classToDisplay,
		navLinks = el.getElementsByTagName('nav')[0].getElementsByTagName('a'),
		fired=false,
		transitionEvent = whichTransitionEvent();
	
	for (i=0; i<children.length; i++) {
		if (children[i].className.indexOf('portfolio-item') > 0) {
			children[i].style.height = children[i].offsetHeight;
			items.push(children[i]);
		}
	}
	
	for (i=0;i<navLinks.length; i++) {
		navLinks[i].onclick = function() {
			
			classToDisplay = this.innerHTML.toLowerCase();
			
			
			//if the selection is different form the current one
			if (this.className.indexOf('active') < 0) {
				removeActive();
				
				this.className = this.className+' active';
				
				for (i=0; i<items.length; i++) {
					if (items[i].className.indexOf('hide') < 0) {
							items[i].className = items[i].className+' hide';
					} 	
				}
				
				//triggers when CSS tranistions end
				if (transitionEvent) {
					document.body.addEventListener(transitionEvent,removeAndDisplay, false);
				} else {
					removeAndDisplay();
				}
				
				fired=false;
			} else {
				for (i=0; i<items.length; i++) {
					if (items[i].className.indexOf(classToDisplay) > 0) {
						items[i].className = items[i].className + ' selected';
						transitionEvent && document.body.addEventListener(transitionEvent,removeSelected, false);
						if (transitionEvent) {
							document.body.addEventListener(transitionEvent,removeSelected, false);
						} else {
							removeSelected();
						}
					}
				}
			}
		}
	}
	
	
	//remove "active" class from all the menu items
	function removeActive() {
		for (i=0; i<navLinks.length; i++) {
			navLinks[i].className = navLinks[i].className.replace(/\s*active/, '');
		}
	}
	
	/* From Modernizr */
	function whichTransitionEvent(){
		var t;
		var el = document.createElement('fakeelement');
		var transitions = {
		  'transition':'transitionend',
		  'OTransition':'oTransitionEnd',
		  'MozTransition':'transitionend',
		  'WebkitTransition':'webkitTransitionEnd'
		}
	
		for(t in transitions){
			if( el.style[t] !== undefined ){
				return transitions[t];
			}
		}
	}

	function removeAndDisplay() {		
		//if it has not alread beed done 
		if (!fired) {
			//remove hided elements
			for (i=0;i<items.length;i++) {
				if ((items[i].className.indexOf('hide') > 0) && (items[i].className.indexOf('remove') < 0)){
					items[i].className = items[i].className+' remove';
				}
			}
		
		//display the selected items only
			for (i=0; i<items.length; i++) {
				if (items[i].className.indexOf(classToDisplay) > 0) {
					items[i].className = items[i].className.replace(/\s*hide/,'');
					items[i].className = items[i].className.replace(/\s*remove/,'');
				}
			}
		}
		
		fired=true;
	}
	
	function removeSelected() {
			for (i=0; i<items.length; i++) {
				if (items[i].className.indexOf('selected') > 0) {
					items[i].className = items[i].className.replace(/\s*selected*/,'');
				}
			}
	}
}

new FormWithLabels(document.getElementsByTagName('form')[0]);

new Portfolio(document.getElementById('portfolio'),'div');