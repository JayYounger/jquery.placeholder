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
	})();
	function getOffset(elem){
		var parObj=elem;
		var top=elem.offsetTop;
		var left = elem.offsetLeft;
		if(isIE7){
			top -= parseInt(elem.offsetParent.style['borderTopWidth'],10);
			left -= parseInt(elem.offsetParent.style['borderLeftWidth'],10);
		}
		return {
			top: top,
			left: left
		}
	}
	$.placeholder = function(elem){
		var $elem = $(elem);
		var info = {};
		info.width = $elem.outerWidth();
		info.height = $elem.outerHeight();
		info.lineHeight = Math.max((parseInt($elem.css("lineHeight"),10)||0),info.height)+"px";
		info.fontSize = $elem.css("fontSize");
		info.textIndent = $elem.css("textIndent");
		var offset = getOffset(elem);
		info.left = offset.left;
		info.top = offset.top;
		info.position = "absolute";
		info.fontFamily = "arial,simsun,sans-serif";
		info.color="#A9A9A9";
		info.backgroundColor = $elem.css("backgroundColor") || "transparent";
		info.zIndex = $elem.css("zIndex");

		if(isIE7){
			if(elem.offsetParent == document.body || elem.offsetParent==document.documentElement){
				info.marginLeft = parseInt($(elem).css("marginLeft"),10);
			}
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