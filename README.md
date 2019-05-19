# hton
**HyperText Object Notation**
HTON is licensed under the _MIT License_ as specified in this repository's LICENSE file, so feel free to distribute, use, and modify HTON as you see fit.

This project was born out of my frustration with how unnecessarily verbose HTML is and inspired by the relative simplicity of JSON.

In most use cases HTML is nested in the same non-overlapping way that JSON is. 
So why not eliminate the redundant and unnecessary end tags and replace the tags themselves with the much cleaner and more concise curly brackets like in JSON?
Using a simple combination of curly brackets and colons, the hton.js script will convert HTON into the HTML necessary for the browser.

HTON:
<pre><code>{:class="row":
    {:class="col-xs-12": 
        {h1::Hello World!}
    }
}</code></pre>

## Implementation
Implementation is as simple as including the hton.js script in a script tag somewhere in your HTML file and placing your HTON into an html tag with the class="HTON".

For a description of the HTON syntax, as well as a more substantial example, view the sample.html file in both the browser and a text editor.

**Note:**
Like wine and cheese, HTON pairs best with the Bootstrap frameworks as a result of the selection of the div tag as the default tag when no others are specified.