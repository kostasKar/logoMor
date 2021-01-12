

var keywords = ["forward","fd","back","bk","right","rt","left","lt","up","down","dn","roll_right","rr","roll_left","rl","penup","pu","pendown","pd","showturtle","st","hideturtle","ht","setpensize","sps","settextsize","sts","color","coloralpha","home","getx","gety","getz","setx","sety","setz","setxyz","print","label","and","or","not","rand","random","randcrazy","randomcrazy","sqrt","power","pow","modulo","mod","cos","sin","tan","arccos","arcsin","arctan","ln","log","exp","pi","time","frame","int","round","trunc","abs","min","max","beginface","endface","mousex","mousey","mousepressed","thing","valueof","increment","decrement","point","dist"];
var builtins = ["make","static","if","ifelse","repeat","repcount","while","until","to","end","return"];

CodeMirror.defineMode("logomorMode", function() {

  return {
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
        stream.eatWhile(/\w/);
        return "string";
      } else if (ch.match(/[-+\/*=<>]/)){
        stream.next();
        return "operator";
      }

      if (stream.match(/[0-9]+(\.[0-9]+)?/)){
        return "number";
      }


      stream.eatWhile(/\w/);

      if (keywords.includes(stream.current().toLowerCase())) {
        return "keyword";
      } else if (builtins.includes(stream.current().toLowerCase())){
        return "builtin";
      }


      stream.next();
    }
  };

});


