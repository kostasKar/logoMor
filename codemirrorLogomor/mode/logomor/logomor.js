
var moves = ["forward","fd","back","bk","right","rt","left","lt","up","down","dn","roll_right","rr","roll_left","rl","home","setx","sety","setz","setxyz"];
var keywords = ["penup","pu","pendown","pd","showturtle","st","hideturtle","ht","setpensize","sps","settextsize","sts","color","coloralpha","getx","gety","getz","print","label","and","or","not","rand","random","randcrazy","randomcrazy","sqrt","power","pow","modulo","mod","cos","sin","tan","arccos","arcsin","arctan","ln","log","exp","pi","time","frame","int","round","trunc","abs","min","max","beginface","endface","mousex","mousey","mousepressed","thing","valueof","increment","decrement","point","dist"];
var builtins = ["make","static","if","ifelse","repeat","repcount","while","until","to","end","return"];












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


    startState: function() {
        return {
          indentation: 0,
        };
      },

    indent: function(state, textAfter){
      if ((textAfter) && (textAfter.charAt(0) === "]")){
        return state.indentation - indentUnit;
      } else {
        return state.indentation;
      }
      
    },

    token: function(stream, state) {

      state.indentation = stream.indentation();

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
        stream.eatWhile(/\w/);
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
        if (moves.includes(stream.current().toLowerCase())){
          return "move";
        } else if (keywords.includes(stream.current().toLowerCase())) {
          return "command";
        } else if (builtins.includes(stream.current().toLowerCase())){
          return "keyword";
        }
      } else {
        stream.next();
      }

      return null;

    }

  };

});

});
