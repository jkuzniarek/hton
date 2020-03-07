# hton
## Disclaimer: this project is a work in progress

**HyperText Object Notation (HTON)**

This project was born out of my frustration with how unnecessarily verbose HTML is. 
In almost all use cases HTML is nested in the same non-overlapping way that JSON is. 
So why not eliminate the redundant and unnecessary end tags and replace them with something much cleaner and more concise?
Using a simpler combination of angle and square brackets, the hton.js script will convert HTON into HTML for the browser.

HTON is a subset of EON, an Executable Object Notation that I have been designing, but not yet built a parser for.
Consequently, this project will be a stepping stone in the development of that project. 

HTON:
<pre><code><div class: "row"
    <div class: "col-xs-12" [
        <h1 "Hello World!">
        <p "Hello Sam!">
    ]>
></code></pre>

## Implementation
Implementation is as simple as including the hton.js script in a script tag at the end of your HTML file.

For a more precise description of the HTON syntax, as well as a more substantial example, view the sample.hton.html file written in HTON.

**License:**
HTON is licensed under the _MIT License_ as specified in this repository's LICENSE file, so feel free to distribute, use, and modify HTON as you see fit.