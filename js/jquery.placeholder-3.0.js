(function($){
	var isSupportPlaceholder = (function(){
		var attr = "placeholder";
		var input = document.createElement("input");
		return attr in input;
	})();
	var isIE = (function(){
		return window.attachEvent;
	})();
	var isIE7 = (function(){
		return (navigator.userAgent.indexOf("MSIE 7")!=-1);
	})()
	$.placeholder = function(elem){
		var $elem = $(elem);
		var info = {};
		info.width = $elem.outerWidth();
		info.height = $elem.outerHeight();
		info.lineHeight = Math.max((parseInt($elem.css("lineHeight"),10)||0),info.height)+"px";
		info.fontSize = $elem.css("fontSize");
		info.textIndent = $elem.css("textIndent");
		info.left = $elem.offset().left;
		info.top = $elem.offset().top;
		info.position = "absolute";
		info.fontFamily = "arial,simsun,sans-serif";
		info.color="#A9A9A9";
		info.backgroundColor = $elem.css("backgroundColor") || "transparent";
		info.zIndex = $elem.css("zIndex");
		if(isIE7){
			info.float = "left";
			info.display = "inline";
		}
		$elem.css({"backgroundColor":"transparent",position:"relative"});
		var placeText = $elem.attr("placeholder");
		$elem.attr("placeholder","");
		var $holder = $('<div>'+placeText+'</div>');
		$holder.css(info);
		$elem.before($holder);
		function holderToggle(){
			if($elem.val()==''){
				$elem.css({"backgroundColor":"transparent"});
				$holder.show();
			}else{
				$elem.css({"backgroundColor":info.backgroundColor});
				$holder.hide();
			}
		}
		holderToggle();
		if('oninput' in elem){
			$elem.bind('input',holderToggle);
		}else{
			$elem.bind('propertychange',holderToggle);
		}
	}
	$.fn.placeholder = function(){
		this.each(function(){
			if(!isIE){return;}
			$.placeholder(this);
		});
	}
})(jQuery);