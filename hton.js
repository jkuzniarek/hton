// hton.js


// tag object constructor
function tag(){
  this.type = ''
  this.head = []
  this.body = []
}

// determines whether a char is a valid html attribute character
function isAttrChar(char){
  if(
    (char >= 'a' && char <= 'z') ||
    (char >= 'A' && char <= 'Z') ||
    char == '-'
  ){ return true} else{ return false}
}

function isWS(char){
  let out = false
  switch(char){
    case ' ': case '\n': case '\t': case '\r':
        out = true
  }
  return out
}

// gets the index of the next occurrence of the input string from the input start
// str.indexOf(searchValue [, fromIndex])
// gets the string from start index up to but not including end index
// str.slice(startIncluded, endExcluded)


function lex(src){
  
  function lexString(sChar){
    endI = src.indexOf(sChar, i+1)
    if(endI == -1){
      lexeme += src.slice(i+1)
      lexemes.push(lexeme)
      lexeme = ''
      i = src_len
    }
    else if(src[endI+1] == sChar){
      lexeme += src.slice(i+1, endI+1)
      i = endI+1
      lexString(sChar)
    }
    else{
      lexeme += src.slice(i+1, endI)
      lexemes.push(lexeme)
      lexeme = ''
      i = endI+1
    }
    endI = null
  }

  let lexemes = []
  let lexeme = ''
  let endI

  const src_len = src.length
  let i = 0

  while (0 <= i && i < src_len){
    switch(src[i]){

      // whitespace
      case ' ': case '\n': case '\t': case '\r':
        if(lexeme != ''){
          lexemes.push(lexeme)
          lexeme = ''
        }
        i++
        break
    
      // comment
      case '/':
        if(src[i+1] == '/'){
          endI = src.indexOf('\n', i)
          if(endI == -1){
            lexemes.push(src.slice(i))
            i = src_len
          }else{
            lexemes.push(src.slice(i, endI))
            i = endI
          }
          endI = null
          break
        }
        if(src[i+1] == '*'){
          endI = src.indexOf('*/', i+2)
          if(endI == -1){
            lexemes.push(src.slice(i))
            i = src_len
          }else{
            lexemes.push(src.slice(i, endI+2))
            i = endI+2
          }
          endI = null
          break
        }
    
      // string
      case '"':
        endI = ''
        lexString('"')
        endI = null
        break
      
      case "'":
        endI = ''
        lexString("'")
        endI = null
        break
        
      case '`':
        endI = ''
        lexString('`')
        endI = null
        break
        
      case '<':
        lexemes.push('<')
        i++
        break
        
      case '>':
        lexemes.push('>')
        i++
        break
        
      case '[':
        lexemes.push('[')
        i++
        break
        
      case ']':
        lexemes.push(']')
        i++
        break
        
      case ':':
        lexemes.push(':')
        i++
        break

      default:
        // type
        if(i !== 0 && src[i-1] == '<'){
          let indices = {}
          indices[' '] = src.indexOf(' ', i)
          indices['>'] = src.indexOf('>', i)
          indices['\n'] = src.indexOf('\n', i)
          indices['\t'] = src.indexOf('\t', i)
          indices['\r'] = src.indexOf('\r', i)
          endI = indices[' ']
          let index
          for(index in indices){
            if(indices[index] != -1 && indices[index] < endI){
              endI = indices[index]
            }
          }
          lexeme += src.slice(i, endI)
          for(var c of lexeme){
            if(!isAttrChar(c)){
              console.log("Unexpected character: '"+src[i]+"' @ index: "+i+", in: <"+lexeme)
              i = src_len
              break
            }
          }
          if(i !== src_len){
            lexemes.push(lexeme)
            lexeme = ''
            i = endI
          }
          endI = null
          break
        }

        // attr
        if(i !== 0 && src[i-1] == ' ' && isAttrChar(src[i])){
          let indices = {}
          indices[' '] = src.indexOf(' ', i)
          indices[':'] = src.indexOf(':', i)
          indices['\n'] = src.indexOf('\n', i)
          indices['\t'] = src.indexOf('\t', i)
          indices['\r'] = src.indexOf('\r', i)
          endI = indices[' ']
          let index
          for(index in indices){
            if(indices[index] != -1 && indices[index] < endI){
              endI = indices[index]
            }
          }
          lexeme += src.slice(i, endI)
          for(var c of lexeme){
            if(!isAttrChar(c)){
              console.log("Unexpected character: '"+src[i]+"' @ index: "+i+", in: <"+lexeme)
              i = src_len
              break
            }
          }
          if(i !== src_len){
            lexemes.push(lexeme)
            lexeme = ''
            i = endI
          }
          endI = null
          break
        }

      // END SWITCH CASES
    } // END SWITCH
    // alert(lexemes)
  } // END WHILE
  return lexemes;
}


/*
// test
<
html
lang
:
en
[
<
head
>
<
body
Hello World
>
]
>
*/

function parse(src, i, j){
  let node

  while(i < j){
    switch(src[i]){
      case '<':
        node = {}

    }

  }
}

function toHTML(page){
  let output = "<!DOCTYPE html>";
  let typeStack = []
  const tokens = lex(page)
  const token_len = tokens.length
  output = parse(tokens, 0, token_len-1)
  return output;
}


/*
// SAVE FOR LATER
// get source and remove hton.js script tag
var source = document.documentElement.outerHTML
const sIndex1 = source.lastIndexOf('<script src="hton.js">')
const sIndex2 = source.lastIndexOf("<script src='hton.js'>") 
if(sIndex1 == -1 && sIndex2 == -1){
  do_nothing = true
}
else if( sIndex1 > sIndex2 ){
  const source = slice(0, sIndex1)
}
else if( sIndex1 < sIndex2 ){
  const source = slice(0, sIndex2)
}

// convert HTON to HTML
document.documentElement.outerHTML = toHTML(source)
*/

// TEST DATA
let source = `// test
<html lang:"en" [
  <head><body "Hello World">
]>`
var i
var out = ''
for(i of lex(source)){
  out += "\n"+i
}
alert(out)
