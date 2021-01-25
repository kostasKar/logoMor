
var previousi = -1

function getRandomDemoProgram(){
	var demoPrograms = [demoProgram1, demoProgram2, demoProgram3, demoProgram4, demoProgram5, demoProgram6, demoProgram7, demoProgram8, demoProgram9, demoProgram10, demoProgram11];
	var i;
	do {i = Math.floor(Math.random()*demoPrograms.length);}
	while(i == previousi);
	previousi = i;
	return demoPrograms[i];
}


var demoProgram1 =  
';-----------Demo Random curve---------\n'+
'\n'+
';------Function-----------------------\n'+
'TO drawRandomCurve :n\n'+
'  repeat :n [ \n'+
'    right rand :maxangle \n'+
'    up rand :maxangle\n'+
'    roll_right rand :maxangle\n'+
'    forward rand :maxsize \n'+
'  ]\n'+
'END\n'+
'\n'+
';------Global Variables---------------\n'+
';-Check auto generated sliders below--\n'+
'make "maxsize 20\n'+
'make "maxangle  36\n'+
'\n'+
';--Actual Drawing---------------------\n'+
'setpensize 3\n'+
'drawRandomCurve 150\n';

var demoProgram2 = 
';----------Demo Spheres--------------- \n' + 
'\n'+
';------Functions----------------------\n'+
'TO centeredCircle :r :n \n' + 
' make "segment 2*pi*:r/:n \n' + 
' penup \n' + 
' dn 90 \n' + 
' fd :r \n' + 
' up 90 \n' + 
' bk :segment/2 \n' + 
' pendown \n' + 
' repeat :n [ \n' + 
'  fd :segment  \n' + 
'  up 360 / :n \n' + 
' ] \n' + 
' penup \n' + 
' fd :segment/2 \n' + 
' up 90 \n' + 
' fd :r \n' + 
' dn 90 \n' + 
' pendown  \n' + 
'END \n' + 
' \n' + 
'TO sphere :r :n \n' + 
' repeat :n/2 [ \n' + 
'  centeredCircle :r :n \n' + 
'  rr 360/:n \n' + 
' ] \n' + 
'END \n' + 
' \n' + 
';-----Global Variables---------------- \n' + 
';-Check auto generated sliders below-- \n' + 
'make "radius 50 \n' + 
'make "segs 10 \n' + 
' \n' + 
';--Actual Drawing---------------------\n'+
'sphere :radius :segs \n' + 
'penup \n' + 
'setxyz 200 150 40 \n' + 
'pendown \n' + 
'sphere :radius/2 :segs \n' + 
'penup \n' + 
'setxyz 300 200 150 \n' + 
'pendown \n' + 
'sphere :radius/4 :segs \n';

var demoProgram3 = 
';----------Demo Bracelet--------------  \n' + 
' \n' + 
';------Functions---------------------- \n' + 
'TO centeredCircle :r :n  \n' + 
' make "segment 2*pi*:r/:n  \n' + 
' penup  \n' + 
' rt 90  \n' + 
' fd :r  \n' + 
' dn 90  \n' + 
' bk :segment/2  \n' + 
' pendown  \n' + 
' repeat :n [  \n' + 
'  fd :segment   \n' + 
'  dn 360 / :n  \n' + 
' ]  \n' + 
' penup  \n' + 
' fd :segment/2  \n' + 
' dn 90  \n' + 
' fd :r  \n' + 
' lt 90 \n' + 
' rr 180 \n' + 
' pendown   \n' + 
'END  \n' + 
'  \n' + 
'TO sphere :r :n  \n' + 
' repeat :n/2 [  \n' + 
'  centeredCircle :r :n  \n' + 
'  rt 360/:n  \n' + 
' ]  \n' + 
' rt 180 \n' + 
'END  \n' + 
'  \n' + 
'to fdWithSphere :d :n \n' + 
' penup \n' + 
' fd :d/2 \n' + 
' pendown \n' + 
' sphere :d/2 :n \n' + 
' penup  \n' + 
' fd :d/2 \n' + 
' pendown \n' + 
'end \n' + 
' \n' + 
';-----Global Variables------------- \n' + 
';-see auto generated sliders below- \n' + 
'make "radius 100 \n' + 
'make "segs 5 \n' + 
'make "segs 2*:segs \n' + 
'make "jewels 6 \n' + 
' \n' + 
';----drawing----------------------- \n' + 
'repeat :jewels [ \n' + 
' fdWithSphere 2*pi*:radius/:jewels :segs \n' + 
' rt 360/:jewels  \n' + 
'] \n';

var demoProgram4 = 
';---------Demo Fractal---------------- \n' + 
' \n' + 
';------Recursive Function------------- \n' + 
'to SierpinskiFractal :l :n \n' + 
'ifelse :n=0 [repeat 3[fd :l rt 120]] \n' + 
'[SierpinskiFractal :l/2 :n-1 fd :l/2 \n' + 
' SierpinskiFractal :l/2 :n-1 rt 120 fd :l/2 lt 120 \n' + 
' SierpinskiFractal :l/2 :n-1 lt 120 fd :l/2 rt 120] \n' + 
'end \n' + 
' \n' + 
';-----Global Variables-------------  \n' + 
';-see auto generated sliders below- \n' + 
'make "length 100 \n' + 
'make "depth 4 \n' + 
' \n' + 
';----drawing----------------------- \n' + 
'SierpinskiFractal :length :depth \n' +
'penup \n' +
'setxyz :length*(sqrt 3)/6 :length/2 0 \n' +
'label :depth \n' +
'home \n' +
'pendown';

var demoProgram5 = 
';---------Demo Crazy Cubes------------- \n' + 
';Rand produces random numbers for each run \n' + 
';Randcrazy does the same but for each frame! \n' + 
' \n' + 
'To square  :x \n' + 
'  repeat 4 [ \n' + 
'  forward :x \n' + 
'  right 90] \n' + 
'END \n' + 
' \n' + 
'TO cube :x \n' + 
'  setpensize randcrazy 10 \n' + 
'  color randcrazy 255 randcrazy 255 randcrazy 255 \n' + 
'  repeat 4[ \n' + 
'    square :x \n' + 
'  forward :x \n' + 
'  down 90 ] \n' + 
'end  \n' + 
' \n' + 
'rl 15  \n' + 
'up 15 \n' + 
' \n' + 
'repeat 4 [ \n' + 
' repeat 4 [ \n' + 
'  cube 50 + rand 50 \n' + 
'  penup \n' + 
'  setx getx -150  \n' + 
'  pendown \n' + 
' ]  \n' + 
' penup \n' + 
' setx 0 \n' + 
' sety gety - 150 \n' + 
' pendown \n' + 
'] \n' + 
' \n' + 
'print rand 500 \n' + 
'print randcrazy 500';

var demoProgram6 = 
';-----Demo Accelerating Sphere--------  \n' + 
';Using timing commands a sketch can be \n' + 
';animated! \n' + 
' \n' + 
';------Functions---------------------- \n' + 
'TO centeredCircle :r :n  \n' + 
' make "segment 2*pi*:r/:n  \n' + 
' penup  \n' + 
' dn 90  \n' + 
' fd :r  \n' + 
' up 90  \n' + 
' bk :segment/2  \n' + 
' pendown  \n' + 
' repeat :n [  \n' + 
'  fd :segment   \n' + 
'  up 360 / :n  \n' + 
' ]  \n' + 
' penup  \n' + 
' fd :segment/2  \n' + 
' up 90  \n' + 
' fd :r  \n' + 
' dn 90  \n' + 
' pendown   \n' + 
'END  \n' + 
'  \n' + 
'TO sphere :r :n  \n' + 
' repeat :n/2 [  \n' + 
'  centeredCircle :r :n  \n' + 
'  rr 360/:n  \n' + 
' ]  \n' + 
'END  \n' + 
' \n' + 
';-----Global Variables-------------  \n' + 
';-see auto generated sliders below- \n' + 
'make "radius 10 \n' + 
'make "segs 10 \n' + 
' \n' + 
';----drawing----------------------- \n' +
';frame returns current frame number \n' +
'pu \n' + 
'sety 100 * sin frame*frame*0.002 \n' + 
'setx 100 * cos frame*frame*0.002 \n' + 
'pd \n' + 
'sphere :radius :segs \n' + 
'print gety \n' + 
'print getx \n';

var demoProgram7 = 
';----Demo Flying Avatars----------- \n' + 
'rr frame \n' + 
'rt frame \n' + 
'up frame \n' + 
'pu \n' + 
' \n' + 
'make "speed 1 \n' + 
'fd mod :speed*frame 300 \n';

var demoProgram8 = 
';----Demo Colorful Starfish--------- \n' + 
';Using beginface endface we can create solids \n' + 
' \n' + 
';-----Function to dray one leg------- \n' + 
'to leg :s :d \n' + 
' up 90 \n' + 
' fd :d/2 \n' + 
' dn 90 \n' + 
' make "a arctan :d/(2*:s) \n' + 
' make "l sqrt (pow :d/2 2)+(pow :s 2) \n' + 
' dn :a \n' + 
' beginface \n' + 
' fd :l \n' + 
' up :a \n' + 
' lt :a \n' + 
' bk :l \n' + 
' endface \n' + 
' rt :a \n' + 
' rr 90 \n' + 
' dn 90 \n' + 
' fd :d/2 \n' + 
' up 90 \n' + 
'end \n' + 
' \n' + 
' \n' + 
';Variables.play with size, number of legs \n' + 
';and color. Check variables manipulators \n' + 
'make "diameter 30 \n' + 
'make "length 100 \n' + 
'make "legs 5 \n' + 
'make "r 26 \n' + 
'make "g 26 \n' + 
'make "b 26 \n' + 
' \n' + 
';---Actual drawing----------------- \n' + 
'color :r :g :b \n' + 
'repeat :legs [ \n' + 
' repeat 4 [ \n' + 
'  leg :length :diameter \n' + 
' ] \n' + 
' rt 360/:legs \n' + 
'] \n';

var demoProgram9 = 
';---Demo Bouncing Ball---------------    \n' + 
';---using static variables we can make    \n' + 
';---any kind of animation!-----------    \n' + 
'    \n' + 
'make "width 300   \n' + 
'make "height 200   \n' + 
'make "radius 30   \n' + 
'   \n' + 
'static "locationX 0    \n' + 
'static "locationY :height    \n' + 
'static "velocityX 1.5    \n' + 
'static "velocityY 0    \n' + 
'static "gravity 0.2   \n' + 
'    \n' + 
'make "locationX :locationX + :velocityX    \n' + 
'make "locationY :locationY + :velocityY    \n' + 
'make "velocityY :velocityY - :gravity    \n' + 
'    \n' + 
'if (:locationX<0)[    \n' + 
'  make "velocityX -:velocityX \n' + 
'  make "locationX 0    \n' + 
']    \n' + 
' \n' + 
'if (:locationX>:width) [    \n' + 
'  make "velocityX -:velocityX      \n' + 
'  make "locationX :width    \n' + 
']  \n' + 
'    \n' + 
'if (:locationY<0)[    \n' + 
' make "velocityY :velocityY*-0.95   \n' + 
' make "locationY 0   \n' + 
']    \n' + 
'  \n' + 
'if (:locationY>:height)[    \n' + 
' make "velocityY :velocityY*-0.95    \n' + 
' make "locationY :height   \n' + 
']    \n' + 
'    \n' + 
'to circle :r    \n' + 
'make "l 2*pi*:r/50   \n' + 
'bk :l/2   \n' + 
'repeat 50[fd :l rt 360/50]    \n' + 
'end    \n' + 
'    \n' + 
'penup    \n' + 
'setxyz :locationX :locationY 0    \n' + 
'pendown    \n' + 
'circle :radius   \n' + 
'penup   \n' + 
'home    \n' + 
'pendown   \n' + 
'fd :height+:radius rt 90   \n' + 
'fd :width+(:radius*2) rt 90   \n' + 
'fd :height+(:radius*2) rt 90   \n' + 
'fd :width+(:radius*2) rt 90   \n' + 
'fd :radius   \n';

var demoProgram10 = 
';---Demo pinball game---------------     \n' + 
'     \n' + 
'make "width 300    \n' + 
'make "height 500 \n' + 
'make "radius 30    \n' + 
'make "barpos mousex \n' + 
'    \n' + 
'static "locationX rand :width     \n' + 
'static "locationY 0     \n' + 
'static "velocityX 2   \n' + 
'static "velocityY 8 \n' + 
'static "lose 0 \n' + 
'static "score 0 \n' + 
' \n' + 
'     \n' + 
'make "locationX :locationX + :velocityX     \n' + 
'make "locationY :locationY + :velocityY     \n' + 
' \n' + 
'if :lose [pu  setxyz :width/2 :height/2 0 label "youlost home return] \n' + 
'     \n' + 
' \n' + 
'if (:locationX<0)[     \n' + 
'  make "velocityX -:velocityX  \n' + 
'  make "locationX 0     \n' + 
']     \n' + 
'  \n' + 
'if (:locationX>:width) [     \n' + 
'  make "velocityX -:velocityX       \n' + 
'  make "locationX :width     \n' + 
']   \n' + 
'     \n' + 
'if (:locationY<0)[     \n' + 
' make "velocityY :velocityY*-1   \n' + 
' make "locationY 0   \n' + 
' ifelse (abs (:locationx+:radius-(:barpos+25)))> 50  \n' + 
'  [ make "lose 1]  \n' + 
'  [ make "score :score+1] \n' + 
']     \n' + 
'   \n' + 
'if (:locationY>:height)[     \n' + 
' make "velocityY -:velocityY     \n' + 
' make "locationY :height    \n' + 
']     \n' + 
'     \n' + 
'to circle :r     \n' + 
'make "l 2*pi*:r/50    \n' + 
'bk :l/2    \n' + 
'repeat 50[fd :l rt 360/50]     \n' + 
'end     \n' + 
'     \n' + 
'penup     \n' + 
'setxyz :locationX :locationY 0     \n' + 
'pendown     \n' + 
'circle :radius    \n' + 
'penup    \n' + 
'home     \n' + 
'pendown    \n' + 
'fd :height+:radius rt 90    \n' + 
'fd :width+(:radius*2) rt 90    \n' + 
'fd :height+(:radius*2) rt 90   \n' + 
'pu fd :width+(:radius*2) rt 90    pd \n' + 
'fd :radius bk :radius \n' + 
'rt 90 pu fd :barpos pd fd 50  \n' + 
'print "score \n' + 
'print :score \n';

var demoProgram11 = 
';--------Demo Fibonacci spiral--------- \n' + 
' \n' + 
';Recursive fibonacci just for reference \n' + 
';Very heavy, observe fps as :n grows \n' + 
';print :functioncalls to check num of calls \n' + 
';Maybe there is another fibonacci sequence there :) \n' +
'static "functioncalls 0 \n' + 
'make "functioncalls 0 \n' + 
' \n' + 
'to fibonaccirec :n \n' + 
'  increment "functioncalls \n' + 
'  if :n=0 [return 0] \n' + 
'  if :n=1 [return 1] \n' + 
'  return (fibonaccirec :n-1) + (fibonaccirec :n-2) \n' + 
'end \n' + 
' \n' + 
';Iterative fibonacci, more practical \n' + 
'to fibonacci :n \n' + 
'  make "a 0 \n' + 
'  make "b 1 \n' + 
'  repeat :n-1 [ \n' + 
'    make "b :a+:b \n' + 
'    make "a :b-:a \n' + 
'  ] \n' + 
'  ifelse :n=0 [return :a] [return :b] \n' + 
'end \n' + 
' \n' + 
';Global variables. Check variables manipulators \n' +
'make "n 15 \n' + 
'make "angle 50 \n' + 
' \n' + 
';Actual drawing code \n' +
'repeat :n [ \n' + 
'  fd fibonacci repcount \n' + 
'  rt :angle \n' + 
'] \n' + 
';print :functioncalls \n';