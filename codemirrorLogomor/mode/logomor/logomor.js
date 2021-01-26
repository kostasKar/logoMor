
var logomorMoves = ["forward","fd","back","bk","right","rt","left","lt","up","down","dn","roll_right","rr","roll_left","rl","home","setx","sety","setz","setxyz"];
var logomorKeywords = ["penup","pu","pendown","pd","showturtle","st","hideturtle","ht","setpensize","sps","settextsize","sts","color","coloralpha","getx","gety","getz","print","label","and","or","not","rand","random","randcrazy","randomcrazy","sqrt","power","pow","modulo","mod","cos","sin","tan","arccos","arcsin","arctan","ln","log","exp","pi","time","frame","int","round","trunc","abs","min","max","beginface","endface","mousex","mousey","mousepressed","thing","valueof","increment","decrement","point","dist","radtodeg","degtorad","word"];
var logomorBuiltins = ["make","static","if","ifelse","repeat","repcount","while","until","to","end","return"];



(function(mod) {
  if (typeof exports == "object" && typeof module == "object") // CommonJS
    mod(require("../../lib/codemirror"));
  else if (typeof define == "function" && define.amd) // AMD
    define(["../../lib/codemirror"], mod);
  else // Plain browser env
    mod(CodeMirror);
})(function(CodeMirror) {
  "use strict";




CodeMirror.defineMode("logomorMode", function(config) {
  var indentUnit = config.indentUnit;
  return {


    startState: function () {
      var state = {};
      state.indentation = 0;
      return state;
    },

    indent: function(state, textAfter){
      if ((textAfter) && ((textAfter.charAt(0) === "]") || (textAfter.match(/\s*end$/i)))){
        return state.indentation - indentUnit;
      } else {
        return state.indentation;
      }
      
    },

    token: function(stream, state) {


      var ch = stream.peek();
      if (ch == ";") {
        stream.skipToEnd();
        return "comment";
      } else if (ch == ":"){
        stream.next();
        stream.eatWhile(/\w/);
        return "variable";
      } else if (ch == "\""){
        stream.next();
        stream.eatWhile(/\w|\\/);
        return "string";
      } else if (ch.match(/[-+\/*=<>]/)){
        stream.next();
        return "operator";
      } else if (ch.match(/[\[\]\(\)]/)){
        if (ch === "["){
          state.indentation += indentUnit;
        } else if (ch === "]"){
          state.indentation -= indentUnit;
        }
        stream.next();
        return "enclosing";
      }

      if (stream.match(/[0-9]+(\.[0-9]+)?/)){
        return "number";
      }

      if (ch.match(/\w/)){
        stream.eatWhile(/\w/);
        if (logomorMoves.includes(stream.current().toLowerCase())){
          return "move";
        } else if (logomorKeywords.includes(stream.current().toLowerCase())) {
          return "command";
        } else if (logomorBuiltins.includes(stream.current().toLowerCase())){
          if (stream.current().toLowerCase() === "to"){
            state.indentation += indentUnit;
          } else if (stream.current().toLowerCase() === "end"){
            state.indentation -= indentUnit;
          }
          return "keyword";
        }
      } else {
        stream.next();
      }

      return null;

    },

    electricInput: /^\s*(?:end|end[^\s]|\])$/i

  };

});

});

