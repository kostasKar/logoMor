
var demoPrograms = [];
var previousi = -1;

function getRandomDemoProgram(){
	previousi = (previousi + 1) % demoPrograms.length;
	return demoPrograms[previousi];
}

function pushDemo(demo){
	demoPrograms.splice(Math.floor(Math.random()*demoPrograms.length), 0, demo);
}


pushDemo(  
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
'drawRandomCurve 150\n');

pushDemo( 
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
'TO mysphere :r :n \n' + 
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
'mysphere :radius :segs \n' + 
'penup \n' + 
'setxyz 200 150 40 \n' + 
'pendown \n' + 
'mysphere :radius/2 :segs \n' + 
'penup \n' + 
'setxyz 300 200 150 \n' + 
'pendown \n' + 
'mysphere :radius/4 :segs \n');

pushDemo(
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
'TO mysphere :r :n  \n' + 
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
' mysphere :d/2 :n \n' + 
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
'] \n');

pushDemo( 
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
'pendown');

pushDemo( 
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
'print randcrazy 500');

pushDemo( 
';-----Demo Accelerating Sphere--------  \n' + 
';Using timing commands a sketch can be \n' + 
';animated! \n' + 
' \n' + 
';-----Global Variables-------------  \n' + 
';-see auto generated sliders below- \n' + 
'make "radius 15 \n' + 
' \n' + 
';----drawing----------------------- \n' +
';frame returns current frame number \n' +
'pu \n' + 
'sety 100 * sin frame*frame*0.002 \n' + 
'setx 100 * cos frame*frame*0.002 \n' + 
'ht \n' + 
'pd \n' +
'sphere :radius \n' + 
'print gety \n' + 
'print getx \n');

pushDemo( 
';----Demo Flying Avatars----------- \n' + 
'rr frame \n' + 
'rt frame \n' + 
'up frame \n' + 
'pu \n' + 
' \n' + 
'make "speed 1 \n' + 
'fd mod :speed*frame 300 \n');

pushDemo( 
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
'] \n');

pushDemo( 
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
'fd :radius   \n');

pushDemo( 
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
'if :lose [pu  setxyz :width/2 :height/2 0 label "you\\slost home return] \n' + 
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
'print :score \n');

pushDemo(
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
';print :functioncalls \n');

pushDemo( 
';---------Demo Data structures-------------- \n' + 
';The commands "word" and "thing" and the ability \n' + 
';of variables to hold literals as values, enable \n' + 
';us to create variables dynamically! \n' + 
';In this example we provide functions to create  \n' + 
';data structures as arrays, stacks and queues \n' + 
';We also make trivial demonstration of a static \n' + 
';array that can be filled interactively \n' + 
' \n' + 
' \n' + 
';----------Array implementation------------- \n' + 
'to makearray :name :size \n' + 
'  repeat :size [ \n' + 
'    static word :name repcount 0 \n' + 
'    make word :name repcount 0 \n' + 
'  ] \n' + 
'end \n' + 
' \n' + 
'to staticarray :name :size \n' + 
'  repeat :size [ \n' + 
'    static word :name repcount 0 \n' + 
'  ] \n' + 
'end \n' + 
' \n' + 
'to getitem :name :index \n' + 
'  return thing word :name :index \n' + 
'end \n' + 
' \n' + 
'to setitem :name :index :value \n' + 
'  make word :name :index :value \n' + 
'end \n' + 
' \n' + 
' \n' + 
';----------Stack implementation------------- \n' + 
'to makestack :name \n' + 
'  static word :name "index 0 \n' + 
'  make word :name "index 0 \n' + 
'end \n' + 
' \n' + 
'to staticstack :name \n' + 
'  static word :name "index 0 \n' + 
'end \n' + 
' \n' + 
'to push :name :value \n' + 
'  increment word :name "index \n' + 
'  static word :name thing word :name "index :value \n' + 
'  make word :name thing word :name "index :value \n' + 
'end \n' + 
' \n' + 
'to pop :name \n' + 
'  make "ret thing word :name thing word :name "index \n' + 
'  decrement word :name "index \n' + 
'  return :ret \n' + 
'end \n' + 
' \n' + 
'to stackpeek :name \n' + 
'  return thing word :name thing word :name "index \n' + 
'end \n' + 
' \n' + 
'to stacklength :name \n' + 
'  return thing word :name "index \n' + 
'end \n' + 
' \n' + 
' \n' + 
';----------Queue implementation------------- \n' + 
'to makequeue :name \n' + 
'  static word :name "front 0 \n' + 
'  make word :name "front 0 \n' + 
'  static word :name "rear 0 \n' + 
'  make word :name "rear 0 \n' + 
'end \n' + 
' \n' + 
'to staticqueue :name \n' + 
'  static word :name "front 0 \n' + 
'  static word :name "rear 0 \n' + 
'end \n' + 
' \n' + 
'to enqueue :name :value \n' + 
'  static word :name thing word :name "rear :value \n' + 
'  make word :name thing word :name "rear :value \n' + 
'  increment word :name "rear \n' + 
'end \n' + 
' \n' + 
'to dequeue :name  \n' + 
'  make "ret thing word :name thing word :name "front \n' + 
'  increment word :name "front \n' + 
'  return :ret \n' + 
'end \n' + 
' \n' + 
'to queuepeek :name  \n' + 
'  return thing word :name thing word :name "front \n' + 
'end \n' + 
' \n' + 
'to queuelength :name \n' + 
'  return thing word :name "rear - thing word :name "front  \n' + 
'end \n' + 
' \n' + 
' \n' + 
' \n' + 
' \n' + 
';------Interactive static array demo-------- \n' + 
'hideturtle \n' + 
'penup \n' + 
'label "click\\sanywhere \n' + 
' \n' + 
'static "index 0 \n' + 
'staticarray "x 500 \n' + 
'staticarray "y 500 \n' + 
' \n' + 
'if mousepressed[ \n' + 
'  increment "index \n' + 
'  setitem "x :index mousex \n' + 
'  setitem "y :index mousey \n' + 
'] \n' + 
' \n' + 
'repeat :index [ \n' + 
'  setxyz getitem "x repcount getitem "y repcount getz \n' + 
'  label  word word getitem "x repcount "\\s getitem "y repcount \n' + 
'  point \n' + 
'] \n');

pushDemo(
';-------Demo Sorting algorithms----------\n' + 
'\n' + 
';----------------------------------------\n' + 
';----array implementation functions------\n' + 
'to makearray :name :size \n' + 
'  repeat :size [ \n' + 
'    static word :name repcount 0 \n' + 
'    make word :name repcount 0 \n' + 
'  ] \n' + 
'end \n' + 
' \n' + 
'to getitem :name :index \n' + 
'  return thing word :name :index \n' + 
'end \n' + 
' \n' + 
'to setitem :name :index :value \n' + 
'  make word :name :index :value \n' + 
'end \n' + 
'\n' + 
'\n' + 
';----------------------------------------\n' + 
';----------sorting functions-------------\n' + 
'to insertionsort :arrayname :size \n' + 
'  repeat :size [\n' + 
'    make "j repcount\n' + 
'    while :j > 1 [\n' + 
'      if (getitem :arrayname :j) < (getitem :arrayname :j-1) [\n' + 
'        swap :arrayname :j :j-1\n' + 
'        if :steps > :maxsteps [return 0]\n' + 
'      ]\n' + 
'      decrement "j\n' + 
'    ]\n' + 
'  ]\n' + 
'end\n' + 
'  \n' + 
'to bubblesort :arrayname :size\n' + 
'  make "swapped 1\n' + 
'	while :swapped [\n' + 
'    make "swapped 0\n' + 
'    repeat :size - 1 [\n' + 
'      if (getitem :arrayname repcount) > (getitem :arrayname repcount+1) [\n' + 
'        swap :arrayname repcount repcount+1\n' + 
'        make "swapped 1\n' + 
'        if :steps > :maxsteps [return 0]\n' + 
'      ]\n' + 
'    ]\n' + 
'  ]\n' + 
'end\n' + 
'\n' + 
'to quicksort :arrayname :start :end\n' + 
'  if :steps > :maxsteps [return 0]\n' + 
'  if :start < :end [\n' + 
'    make "p qspartition :arrayname :start :end\n' + 
'    quicksort :arrayname :start :p-1\n' + 
'    quicksort :arrayname :p+1 :end\n' + 
'  ]\n' + 
'end\n' + 
'\n' + 
'to qspartition :arrayname :start :end \n' + 
'  make "pivot getitem :arrayname :end\n' + 
'  make "i :start\n' + 
'  make "j :start\n' + 
'  while :j <= :end [\n' + 
'    if (getitem :arrayname :j) < :pivot [\n' + 
'      swap :arrayname :j :i\n' + 
'      increment "i\n' + 
'      if :steps > :maxsteps [swap :arrayname :i :end return 0]\n' + 
'    ]\n' + 
'    increment "j\n' + 
'  ]\n' + 
'  swap :arrayname :i :end\n' + 
'  return :i \n' + 
'end\n' + 
'\n' + 
';helpful swap function \n' + 
'to swap :arrayname :i1 :i2\n' + 
'  make "tmp getitem :arrayname :i1\n' + 
'  setitem :arrayname :i1 getitem :arrayname :i2\n' + 
'  setitem :arrayname :i2 :tmp\n' + 
'  increment "steps\n' + 
'end\n' + 
'\n' + 
';----------------------------------------\n' + 
';---------demo help functions------------\n' + 
'to makerandomarray :name :size :maxn\n' + 
'  makearray :name :size\n' + 
'  repeat :size [\n' + 
'    setitem :name repcount rand :maxn\n' + 
'  ]\n' + 
'end\n' + 
'\n' + 
'to drawarraypoints :name :size\n' + 
'  pu\n' + 
'  repeat :size [\n' + 
'    setxyz repcount * 10 getitem :name repcount 0\n' + 
'    color 128 0 (getitem :name repcount) * 255 / :maxnum \n' + 
'    point\n' + 
'  ]\n' + 
'end\n' + 
'\n' + 
';----------------------------------------\n' + 
';-------------drawing--------------------\n' + 
'make "size 50\n' + 
'make "maxnum 200\n' + 
'make "delaysecs 0.05\n' + 
'\n' + 
'make "maxsteps trunc time / :delaysecs\n' + 
'make "steps 0\n' + 
'\n' + 
'ht\n' + 
'makerandomarray "ar :size :maxnum\n' + 
'\n' + 
';insertionsort "ar :size \n' + 
';bubblesort "ar :size \n' + 
'quicksort "ar 1 :size  \n' + 
'\n' + 
'drawarraypoints "ar :size\n' + 
'print word "steps\\s :steps\n' + 
'\n');