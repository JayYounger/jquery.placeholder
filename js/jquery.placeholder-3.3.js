/*
	解决boxSing,paddingLeft问题
	将提示置于文本框上面,用过click,和focusout关联
*/
(function($){
    var isSupportPlaceholder = (function(){
        var attr = "placeholder";
        var input = document.createElement("input");
        return attr in input;
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
        info.width = $elem.css("width");
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
        info.zIndex = $elem.css("zIndex");
        info.paddingLeft = $elem.css("paddingLeft");
        info.boxSizing = $elem.css("boxSizing");
        info.backgroundColor = "transparent";
        if(isIE7){
            if(elem.offsetParent == document.body || elem.offsetParent==document.documentElement){
                info.marginLeft = parseInt($(elem).css("marginLeft"),10);
            }
            info.float = "left";
            info.display = "inline";
        }
        $elem.css({position:"relative"});
        var placeText = $elem.attr("placeholder");
        $elem.attr("placeholder","");
        var $holder = $('<div>'+placeText+'</div>');
        $holder.css(info);
        $elem.after($holder);
        function holderToggle(){
            if($elem.val()==''){
                $holder.show();
            }else{
                $holder.hide();
            }
        }
        $holder.click(function(){
            if($elem.val()!=''){
                $holder.hide();
            }
            $elem.focus();
        });
        $elem.focusout(holderToggle);
        holderToggle();
        if('oninput' in elem){
            $elem.bind('input',holderToggle);
        }else{
            $elem.bind('propertychange',holderToggle);
        }
    }
    $.fn.placeholder = function(){
        this.each(function(){
            if(!window.attachEvent){return;}
            $.placeholder(this);
        });
    }
})(jQuery);