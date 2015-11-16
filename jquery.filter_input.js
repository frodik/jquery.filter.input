/*

  Author - Rudolf Naprstek
  Website - http://www.thimbleopensource.com/tutorials-snippets/jquery-plugin-filter-text-input
  Version - 1.4.2
  Release - 16th March 2013

  Thanks to Niko Halink from ARGH!media for bugfix!
 
  Remy Blom: Added a callback function when the filter surpresses a keypress in order to give user feedback

  Don Myers: added extension for using predefined filter masks
  

*/

(function($){  
  
    $.fn.extend({   

        filter_input: function(options) {  

          var defaults = {  
              regex:".",
              live:false,
              events:'keypress paste'
          }  
                
          var options =  $.extend(defaults, options);  
          var input = $(this);
//          var regex = new RegExp(options.regex);
          
          function filter_input_function(event) {

            if (event.type=='keypress') {

              var key = event.charCode ? event.charCode : event.keyCode ? event.keyCode : 0;

              // 8 = backspace, 9 = tab, 13 = enter, 35 = end, 36 = home, 37 = left, 39 = right, 46 = delete
              if (key == 8 || key == 9 || key == 13 || key == 35 || key == 36|| key == 37 || key == 39 || key == 46) {

                // if charCode = key & keyCode = 0
                // 35 = #, 36 = $, 37 = %, 39 = ', 46 = .
         
                if (event.charCode == 0 && event.keyCode == key) {
                  return true;                                             
                }
              }
              var string = String.fromCharCode(key);
              var regex = new RegExp(options.regex);
            } else if (event.type=='paste') {
              input.data('value_before_paste', event.target.value);
              setTimeout(function(){
                filter_input_function({type:'after_paste'});
              }, 1);
              return true;
            } else if (event.type=='after_paste') {
              var string = input.val();
              // If options.regex is a regular expression, grab the source. If it's a string use it as is
              var regexString = (typeof options.regex === 'string' ? options.regex : options.regex.source);
              var regex = new RegExp('^('+regexString+')+$');
            } else {
              return false;
            }

            if (regex.test(string)) {
              return true;
            } else if (typeof(options.feedback) == 'function') {
              options.feedback.call(this, string);
            }
            if (event.type=='after_paste') input.val(input.data('value_before_paste'));
            return false;
          }
          
          var jquery_version = parseFloat(jQuery.fn.jquery.split('.')[0]+'.'+jQuery.fn.jquery.split('.')[1]);
          if (options.live) {
            if (jquery_version >= 1.7) {
              $(this).on(options.events, $(this), filter_input_function); 
            } else {
              $(this).live(options.events, filter_input_function); 
            }
          } else {
            return this.each(function() {  
              var input = $(this);
              if (jquery_version >= 1.7) {
                input.off(options.events).on(options.events, filter_input_function);
              } else {
                input.unbind(options.events).bind(options.events, filter_input_function);
              }
            });  
          }
          
        }  
    });  
      
})(jQuery); 

/*
  Author - Don Myers
  Version - 0.1.0
  Release - March 1st 2013
*/
/*
  use any of these filters or regular expression in some cases the regular expression is shorter but for some people the "names" might be easier

  ie.
   <input type="text" name="first_name" value="" data-mask="[a-zA-Z ]" placeholder="eg. John"/>
   <input type="text" name="last_name" value="" data-mask="int" placeholder="eg. Smith"/>

*/

jQuery(document).ready(function() {

  var masks = {
    'int':     /[\d]/,
    'float':     /[\d\.]/,
    'money':    /[\d\.\s,]/,
    'num':      /[\d\-\.]/,
    'hex':      /[0-9a-f]/i,
    'email':    /[a-z0-9_\.\-@]/i,
    'alpha':    /[a-z_]/i,
    'alphanum': /[a-z0-9_]/i,
    'alphanumlower':/[a-z0-9_]/,
    'alphaspace':    /[a-z ]/i,
    'alphanumspace': /[a-z0-9_ ]/i,
    'alphanumspacelower':/[a-z0-9_ ]/
  };

  jQuery('input[data-mask]').each(function(idx) {
    var mask = jQuery(this).data('mask');
    var regex = (masks[mask]) ? masks[mask] : mask;

    jQuery(this).filter_input({ regex: regex, live: true }); 
  });
});

