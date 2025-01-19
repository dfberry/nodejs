https://frontendmasters.com/teachers/kyle-simpson/code-is-for-humans/
https://static.frontendmasters.com/resources/2019-03-07-deep-javascript-v2/deep-js-foundations-v2.pdf

https://262.ecma-international.org/9.0/index.html#Title

https://x.com/YDKJS/status/1099716798088400899

--Types
--Scopes
--Objects

https://github.com/getify/You-Dont-Know-JS/blob/2nd-ed/types-grammar/README.md

NaN - invalid number

-0 is usefully for trend direction

Infinity is a build in constant

https://runjs.app/

Fundamental  objects:

Use new:
Object()
Array()
Function()
Date()
RegExp()
Error()

Don't use new:
String()
Number()
Boolean()

falsy is a look up list - if it isn't on the falsy list then it is a truthy

https://github.com/getify?tab=repositories&q=eslint&type=&language=&sort=

## Equality

`==` only compares primitives, if you use something other than a primitive, it will coerce into a primitives

* if types are same, use ====

* Only use `==` when you know the types
* Don't use `==` with non-primitives
* Don't use `==` with `== true` or `==false`
* Prefer `==` in all places, get your items to compare to primitives explicity before using `==`
* If you don't know the types, you don't understand the code - so refactor to know the types and obvious to reader or use `===` to signal to the reader that you don't know the types. If you don't know the types, that is equivalent to assuming type conversion.

TBD: read more about `Object.is`
