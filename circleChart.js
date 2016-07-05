(function ($) {

    window.addRule = function (selector, styles, sheet) {
        if (typeof styles !== "string") {
            var clone = "";
            for (var style in styles) {
                var val = styles[style];

                //style = style.replace(/([A-Z])/g, "-$1").toLowerCase(); // convert to dash-case
                clone += style + ":" + (style === "content" ? '"' + val + '"' : val) + "; ";
            }
            styles = clone;
        }

        sheet = sheet || document.styleSheets[0];
        if (sheet.insertRule) sheet.insertRule(selector + " {" + styles + "}", sheet.cssRules.length);
        else if (sheet.addRule) sheet.addRule(selector, styles);

        return this;
    };

    if ($) {
        $.fn.addRuleJQ = function (styles, sheet) {
            addRule(this.selector, styles, sheet);
            return this;
        };
    }

}(window.jQuery));

(function($){
    $.fn.extend({
        circleChart : function(options){
            var defaults = {
                degree : 55,
                circleThick : '2',
                circleColor : '#85C1FF',
                circleBorderColor : '#EFEFEF',
                insideBgColor : '#fff',
                insideTextColor : '#868686'
            };

            options = $.extend(defaults,options);
            
            var getSelector = function(classList){
                _strSelector = '';
                $.each(classList,function(i,val){
                    _strSelector += '.' + val;
                })
                return _strSelector;
            }

            var buildCircleChart = function(degree){
                var selector = getSelector(this.classList);
                console.log(selector);
                //style after
                $(selector + '::after').addRuleJQ({
                    top: "-" + options.circleThick + "px !important",
                    left : "-" + options.circleThick + "px !important",
                    width : "calc(100% + " + options.circleThick * 2 + "px) !important",
                    height : "calc(100% + " + options.circleThick * 2 + "px) !important"
                });

                if(degree <= 180){
                    var gradient_deg = 90 + parseInt(degree);
                    $(selector + '::after').addRuleJQ({
                        'background-image' : 'linear-gradient('+ gradient_deg  +'deg,transparent 50%, '+ options.circleBorderColor +' 50%), linear-gradient(90deg,'+ options.circleBorderColor +' 50%, ' + options.circleColor + ' 50%) !important'
                    });
                }else{
                    var gradient_deg = parseInt(degree) - 180 + 90;
                    $(selector + '::after').addRuleJQ({
                        'background-image' : 'linear-gradient('+ gradient_deg  +'deg,transparent 50%, '+ options.circleColor +' 50%), linear-gradient(90deg,'+ options.circleBorderColor +' 50%, ' + options.circleColor + ' 50%) !important'
                    });
                }
            //    style parent
                $self.css({background : options.insideBgColor, color : options.insideTextColor});
            }

            return this.each(function(){
                $self = $(this);
                var degree = $(this).attr('data-percent');
                buildCircleChart.call(this,degree);
            })
        }
    })
})(jQuery);


