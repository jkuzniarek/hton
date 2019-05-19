// hton.js
window.onload = function() {
  function toHTML(input){
    let output = "";
    let inContents = true;
    let inTagName = false;
    let tagName = "";
    let inAttributes = false;
    let inQuote = false;
    let quoteType = 0;
    let currentChar = "";
    let doubleBracket = false;
    let tagHeap = [];

    for (let i = 0; i < input.length; i++){
      if(doubleBracket == true){
        doubleBracket = false;
      }else{
        switch(input[i]){

          case "{":
            if(inContents == true && input[i+1] == "{"){
              currentChar = "{";
              doubleBracket = true;
            }else{
              currentChar = "<";
              inTagName = true;
              inContents = false;
            }
            break;

          case "}":
            if(inContents == true && input[i+1] == "}"){
              currentChar = "}";
              doubleBracket = true;
            }else{
              output += "</"+tagHeap.pop();
              currentChar = ">";
            }
            break;

          case ":":
            if(inTagName == true){
              if(tagName == ""){
                tagName = "div";
              }
              output += tagName;
              tagHeap.push(tagName);
              tagName = "";
              inTagName = false;
              inAttributes = true;
              currentChar = " ";
            }
            else if(inAttributes == true && inQuote == false){
              currentChar = ">";
              inContents = true;
              inAttributes = false;
            }
            else if(inContents == true || inQuote == true){
              currentChar = input[i];
            }
            break;

          case "'": // quoteType 1
            if(inAttributes == true){
              if(inQuote == false){
                inQuote = true;
                quoteType = 1;
              }
              else if(inQuote == true && quoteType == 1){
                inQuote = false;
                quoteType = 0;
              }
            }
            currentChar = "'";
            break;
            
          case '"': // quoteType 2
            if(inAttributes == true){
              if(inQuote == false){
                inQuote = true;
                quoteType = 2;
              }
              else if(inQuote == true && quoteType == 2){
                inQuote = false;
                quoteType = 0;
              }
            }
            currentChar = '"';
            break; 

          default:
            if(inTagName == true && input[i] != " "){
              tagName += input[i];
            }
            else if(inTagName == true && input[i] == " "){
              currentChar = "";
            }else{
              currentChar = input[i];
            }
            break;
        }
        output += currentChar;
        currentChar = "";
      }
    }
    return output;
  }
  let list = document.getElementsByClassName("HTON");
  for (let element of list){
    let raw = String(element.innerHTML);
    element.innerHTML = toHTML(raw);
  }
};