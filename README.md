# @webmuds/text #

This is the official component used by WebMUDs to convert MUD color tags to colored and padded text.

Use color tags in your room descriptions, MOTDs, equipment name, etc as follows:

```
It is {gray}pitch black{/}.
You see {lime}green {olive}leaves{/} resting on the floor.
You sure are {9}bleeding{/}!
```

Those special tags will then be replaced by proper colored text as you play the game. Using the normal client, colors are applied using HTML tags.

## Color Names ##

### Basic Colors and Codes ###

You can also use numeric codes for the fifteen basic colors. E.g., `{9}` instead of `{red}`.

* `{1}` - `{maroon}` - 800000
* `{2}` - `{green}` - 008000
* `{3}` - `{olive}` - 808000
* `{4}` - `{navy}` - 000080
* `{5}` - `{purple}` - 800080
* `{6}` - `{teal}` - 008080
* `{7}` - `{gray}` - 808080
* `{8}` - `{silver}` - C0C0C0
* `{9}` - `{red}` - FF0000
* `{10}` - `{lime}` - 00FF00
* `{11}` - `{yellow}` - FFFF00
* `{12}` - `{blue}` - 0000FF
* `{13}` - `{magenta}` - FF00FF
* `{14}` - `{cyan}` - 00FFFF
* `{15}` - `{white}` - FFFFFF

### Advanced Colors ###

These special colors are available by name only.

* `{gold}` - FFD700
* `{orange}` - FFA500
* `{darkorange}` - FF8C00
* `{orangered}` - FF4500
* `{brown}` - A52A2A
* `{dimgray}` - 696969

If you omit the reset tag (`{/}`), it will be inserted automatically at the end of the text to avoid color bleeding.

### Examples ###

```javascript
WebmudsText.html("{yellow}Yellow{/} Text")
// => "<span class="wmyellow">Yellow</span> Text"

WebmudsText.html("{yellow}Yellow{/} and {red}Red{/} Text")
// => "<span class="wmyellow">Yellow</span> and <span class="wmred">Red</span> Text"

WebmudsText.html("{yellow}Yellow{red}Red{/} Text")
// => "<span class="wmyellow">Yellow</span><span class="wmred">Red</span> Text"
```

This library provides CSS classes with all necessary colors. They're prefixed with `wm` to avoid collision.

## Padding and Alignment ##

Padding is done through the use of `{%...}` tags. It can be mixed with color tags. It _requires_ the usage of a closing `{%}` tag.

Opening tag format is `{%XYZ}`, where:

* `X` - a number with at most two digits;
* `Y` - optional (see note below), a character that represents alignment: `l` for left, `r` for right, `c` for center. Default is `l`.
* `Z` - optional, a string of at most four characters that will be used as a filler. Default is space. Characters must not include `{` or `}`.

Note: If you want to use the `"l"`/`"r"`/`"c"` letters as fillers, you must specify the alignment.

If string size is larger than padding size, it will overflow. Color tags are not supported in the filler value.

### Examples ###

```javascript
WebmudsText.pad("This is {%20}padded{%} text")
// => "This is padded               text"

WebmudsText.pad("This is {%20r}right-padded{%} text")
// => "This is         right-padded text"

WebmudsText.pad("This is {%20=}right-padded{%} text with different filler")
// => "This is ========right-padded text with different filler"

WebmudsText.pad("This is {%20c}centered{%} text")
// => "This is       centered       text"

WebmudsText.pad("This is {%20c}cen{white}te{/}red{%} text with colors")
// => "This is       cen{white}te{/}red       text with colors"
// (Color tags remain unchanged - apply html() to convert after padding)

WebmudsText.pad("This is {%3}overflowing{%} text")
// => "This is ove text"

WebmudsText.pad("+{%40c-} Fancy Title {%}+")
// => "+-------------- Fancy Title -------------+"
```


### TODO ###

* Benchmark padding code and improve where needed.
* Implement background colors.
