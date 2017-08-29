## JQuery plugin for input text field filtering

This is simple JQuery plugin for filtering text input field by using regexp. Only allowed characters will be inserted into input field, others will be silently dropped.

### Usage example

```js
// only lowercase alphabets are allowed
$('#text_input').filter_input({regex:'[a-z]'}); 

// only numbers are allowed
$('#text_input').filter_input({regex:'[0-9]'}); 

// only URL safe characters are allowed
$('#text_input').filter_input({regex:'[a-zA-Z0-9_]'}); 

// use live() for binding to elements - from version 1.1.0
$('.input').filter_input({regex:'[a-z]', live:true}); 

// use callback function "feedback" when key test is negative - from version 1.3.0
$('.input').filter_input({
  regex:'[a-z]', 
  feedback: function(char) {
  // "this" contains a reference to the inputfield
    alert('character ' + char + ' is not allowed in input ' + $(this).attr('id'));
  }
}); 

// filter now supports also "paste" event, enabled by default - from version 1.4.2
$('.input').filter_input({
  regex:'[a-z]', 
  events:'keypress paste'
});
```
 
[Download](https://github.com/frodik/jquery.filter.input/archive/master.zip)

## Changelog

March 16, 2013 - released 1.4.2 - "paste" event is now supported and enabled by default with "keypress" as well. 

March 10, 2013 - released 1.4.0 - updated to be compatible with jQuery 1.7+ .on() function. Added extension from Don Myers to allow using of predefined filter masks. 

January 28, 2012 - released 1.3.0 - new feature - added callback function "feedback" called when test of key input fails - thanks to Remy Blom from the Netherlands. 

November 20, 2010 - released 1.2.0 - bug fix - characters # $ % ' . were always allowed. Now this is fixed - thanks to Niko Halink from ARGH!media. 

June 20, 2010 - released 1.1.0 - new feature - added support for choice between using bind() or live(). Default stays bind. But you can specify using live() function as follows: $('#id').filter_input({regex:'[a-z]', live:true}); 

June 10, 2010 - released 1.0.1 - bugfix - added support for general keys to be allowed in input (e.g. cursor keys, backspace, etc..)

April 2010 - released 1.0

[http://www.thimbleopensource.com/tutorials-snippets/jquery-plugin-filter-text-input](http://www.thimbleopensource.com/tutorials-snippets/jquery-plugin-filter-text-input)
