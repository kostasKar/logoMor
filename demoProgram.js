
LM.demoPrograms = (function(){

	var programmsArray = [];
	var previousIndex = -1;

	return {

		pushDemo: function(demoString){
			programmsArray.splice(Math.floor(Math.random()*programmsArray.length), 0, demoString);
		},

		getRandomDemo: function(){
			previousIndex = (previousIndex + 1) % programmsArray.length;
			return programmsArray[previousIndex];
		}

	}

})();


LM.demoPrograms.pushDemo(
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

LM.demoPrograms.pushDemo(
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

LM.demoPrograms.pushDemo(
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

LM.demoPrograms.pushDemo(
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

LM.demoPrograms.pushDemo(
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

LM.demoPrograms.pushDemo(
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

LM.demoPrograms.pushDemo(
';----Demo Flying Avatars----------- \n' + 
'rr frame \n' + 
'rt frame \n' + 
'up frame \n' + 
'pu \n' + 
' \n' + 
'make "speed 1 \n' + 
'fd mod :speed*frame 300 \n');

LM.demoPrograms.pushDemo(
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
'make "hue 36 \n' +
' \n' + 
';---Actual drawing----------------- \n' + 
'colorhsb :hue 100 100 \n' +
'repeat :legs [ \n' + 
' repeat 4 [ \n' + 
'  leg :length :diameter \n' + 
' ] \n' + 
' rt 360/:legs \n' + 
'] \n');

LM.demoPrograms.pushDemo(
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
'to circle :r  \n' +    
'  setx getx + :r  \n' +
'  arc 360 :r  \n' +
'  setx getx - :r  \n' +
'end  \n' +  
'    \n' + 
'penup    \n' + 
'setxyz :locationX :locationY 0    \n' + 
'circle :radius   \n' + 
'home    \n' + 
'pendown   \n' + 
'fd :height+:radius rt 90   \n' + 
'fd :width+(:radius*2) rt 90   \n' + 
'fd :height+(:radius*2) rt 90   \n' + 
'fd :width+(:radius*2) rt 90   \n' + 
'fd :radius   \n');

LM.demoPrograms.pushDemo(
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
'to circle :r  \n' +    
'  setx getx + :r  \n' +
'  arc 360 :r  \n' +
'  setx getx - :r  \n' +
'end  \n' +  
'     \n' + 
'penup     \n' + 
'setxyz :locationX :locationY 0     \n' + 
'circle :radius    \n' + 
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

LM.demoPrograms.pushDemo(
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

LM.demoPrograms.pushDemo(
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
'    colorhsb (getitem :name repcount) * (250 / :maxnum) 100 100 \n' +
'    box 10\n' +
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

LM.demoPrograms.pushDemo (
';--------TETRIS----------------\n' + 
'; play with the keyboard arrows\n' + 
';------------------------------\n' + 
'\n' + 
';returns the relative coordinate of a specific box of a tetromino\n' + 
';shape: 1-7 the different tetrominos\n' + 
';orient: 0-3 the different orientations\n' + 
';boxnum: 1-4 selects a specific box of the shape - all shapes consist of 4 boxes\n' + 
';xory: 1 for the X coordinate, 0 for the Y\n' + 
'to getboxcoordinate :shape :orient :boxnum :xory  \n' + 
'  \n' + 
'	if :shape = 1[ ;square tetromino\n' + 
'    if :boxnum = 1 [make "x 0 make "y 0]\n' + 
'    if :boxnum = 2 [make "x 0 make "y 1]\n' + 
'    if :boxnum = 3 [make "x 1 make "y 1]\n' + 
'    if :boxnum = 4 [make "x 1 make "y 0]\n' + 
'    ifelse :xory [return :x][return :y] ;do not rotate the square\n' + 
'  ]\n' + 
'  if :shape = 2[ ;straight tetromino\n' + 
'    if :boxnum = 1 [make "x 0 make "y -1]\n' + 
'    if :boxnum = 2 [make "x 0 make "y 0]\n' + 
'    if :boxnum = 3 [make "x 0 make "y 1]\n' + 
'    if :boxnum = 4 [make "x 0 make "y 2]\n' + 
'  ]\n' + 
'  if :shape = 3[ ;T-teromino\n' + 
'    if :boxnum = 1 [make "x 0 make "y -1]\n' + 
'    if :boxnum = 2 [make "x 0 make "y 0]\n' + 
'    if :boxnum = 3 [make "x 0 make "y 1]\n' + 
'    if :boxnum = 4 [make "x 1 make "y 0]\n' + 
'  ]\n' + 
'  if :shape = 4[ ;L-tetromino\n' + 
'    if :boxnum = 1 [make "x 0 make "y -1]\n' + 
'    if :boxnum = 2 [make "x 0 make "y 0]\n' + 
'    if :boxnum = 3 [make "x 0 make "y 1]\n' + 
'    if :boxnum = 4 [make "x 1 make "y -1]\n' + 
'  ]\n' + 
'  if :shape = 5[ ;mirrored L-tetromino\n' + 
'    if :boxnum = 1 [make "x 0 make "y -1]\n' + 
'    if :boxnum = 2 [make "x 0 make "y 0]\n' + 
'    if :boxnum = 3 [make "x 0 make "y 1]\n' + 
'    if :boxnum = 4 [make "x -1 make "y -1]\n' + 
'  ]\n' + 
'  if :shape = 6[ ;S-tetromino\n' + 
'    if :boxnum = 1 [make "x 0 make "y -1]\n' + 
'    if :boxnum = 2 [make "x 0 make "y 0]\n' + 
'    if :boxnum = 3 [make "x -1 make "y 0]\n' + 
'    if :boxnum = 4 [make "x -1 make "y 1]\n' + 
'  ]\n' + 
'  if :shape = 7[ ;mirrored S-tetromino\n' + 
'    if :boxnum = 1 [make "x 0 make "y -1]\n' + 
'    if :boxnum = 2 [make "x 0 make "y 0]\n' + 
'    if :boxnum = 3 [make "x 1 make "y 0]\n' + 
'    if :boxnum = 4 [make "x 1 make "y 1]\n' + 
'  ]\n' + 
'  return rotatecoordinate :x :y :orient :xory \n' + 
'end\n' + 
'\n' + 
';applies the rotation to the shape\n' + 
'to rotatecoordinate :x :y :orient :xory\n' + 
'	if :orient = 0 [ifelse :xory [return :x][return :y]]\n' + 
'  if :orient = 1 [ifelse :xory [return :y][return -:x]]\n' + 
'  if :orient = 2 [ifelse :xory [return -:x][return -:y]]\n' + 
'  if :orient = 3 [ifelse :xory [return -:y][return :x]]\n' + 
'end\n' + 
'\n' + 
'to shapegenerator :s :o\n' + 
'  setcolor :s\n' + 
'  make "x0 getx\n' + 
'  make "y0 gety\n' + 
'  repeat 4 [\n' + 
'    pu setxyz :x0 + :d * getboxcoordinate :s :o repcount 1 :y0 + :d * getboxcoordinate :s :o repcount 0 0 pd box :d \n' + 
'  ]\n' + 
'end\n' + 
'\n' + 
'to setcolor :s\n' + 
'	colorhsb (mod :s 7)*(360/7) :colorsaturation 100\n' + 
'end\n' + 
'\n' + 
'to getrandomshape \n' + 
'  return (randcrazy 7)  + 1\n' + 
'end\n' + 
'\n' + 
'to getrandomentrypoint \n' + 
'  return (randcrazy :width) + 1\n' + 
'end\n' + 
'\n' + 
'to checkpositiony\n' + 
'  static "previoustime time\n' + 
'  if time - :previoustime > :dt [\n' + 
'    decrement "ypos\n' + 
'    make "previoustime time\n' + 
'  ]\n' + 
'end\n' + 
'\n' + 
'to checkkeyboard\n' + 
'  static "previouskeytime 0\n' + 
'  if and keypressed time - :previouskeytime > :debouncetime [\n' + 
'    make "previouskeytime time\n' + 
'    if keypressed = 38 [  ;up\n' + 
'      make "currentorientation  mod (:currentorientation + 1) 4\n' + 
'      if shapeinterferes [\n' + 
'        make "currentorientation  mod (:currentorientation - 1) 4\n' + 
'      ]\n' + 
'    ] \n' + 
'    if keypressed = 39 [ ;right\n' + 
'      make "xpos min :xpos + 1 :width\n' + 
'      if shapeinterferes [\n' + 
'        decrement "xpos\n' + 
'      ]\n' + 
'    ]	\n' + 
'    if keypressed = 37 [ ;left\n' + 
'      make "xpos max :xpos - 1 0\n' + 
'      if shapeinterferes [\n' + 
'        increment "xpos\n' + 
'      ]\n' + 
'    ]	\n' + 
'    if keypressed = 40 [ ;down\n' + 
'      decrement "ypos\n' + 
'    ] \n' + 
'  ]\n' + 
'end\n' + 
'\n' + 
'to drawcurrentshape\n' + 
'  pu \n' + 
'  setxyz :d * :xpos :d * :ypos 0\n' + 
'  pd\n' + 
'  shapegenerator :currentshape :currentorientation\n' + 
'end\n' + 
'\n' + 
'to drawnextshape \n' + 
'	pu\n' + 
'  setxyz -:d*4 :height*:d 0\n' + 
'  pd\n' + 
'  shapegenerator :nextshape 0\n' + 
'end\n' + 
'\n' + 
'to bringnew\n' + 
'  make "xpos getrandomentrypoint\n' + 
'  make "ypos :height\n' + 
'  make "currentshape :nextshape\n' + 
'  make "nextshape getrandomshape\n' + 
'  make "currentorientation 0\n' + 
'end\n' + 
'\n' + 
'to constructarray\n' + 
'  repeat :width [\n' + 
'    make "w repcount\n' + 
'    repeat :height + 5 [\n' + 
'      static boxvariable :w repcount 0\n' + 
'    ]\n' + 
'  ]\n' + 
'end\n' + 
'\n' + 
'to boxvariable :x :y\n' + 
'  return word word word "p :x "_ :y\n' + 
'end\n' + 
'\n' + 
'to boxvalue :x :y\n' + 
'  if :y < 1 [return 10]\n' + 
'  if :x > :width [decrement "xpos return 0]\n' + 
'  if :x < 1 [increment "xpos return 0]  \n' + 
'	return thing boxvariable :x :y\n' + 
'end\n' + 
'\n' + 
'to shapetouched \n' + 
'  repeat 4 [\n' + 
'    if boxvalue :xpos + getboxcoordinate :currentshape :currentorientation repcount 1 :ypos + (getboxcoordinate :currentshape :currentorientation repcount 0) - 1 [return 1]\n' + 
'	]\n' + 
'  return 0\n' + 
'end\n' + 
'\n' + 
'to place :x :y\n' + 
'  if :y = :height [make "gameover 1]\n' + 
'  make boxvariable :x :y :currentshape\n' + 
'end\n' + 
'\n' + 
'to shapeplace\n' + 
'  repeat 4 [\n' + 
'    place :xpos + getboxcoordinate :currentshape :currentorientation repcount 1 :ypos + getboxcoordinate :currentshape :currentorientation repcount 0\n' + 
'  ]\n' + 
'end\n' + 
'\n' + 
'to drawplacedshapes \n' + 
'  repeat :width [\n' + 
'    make "x repcount\n' + 
'    repeat :height [\n' + 
'      make "y repcount\n' + 
'      if boxvalue :x :y [\n' + 
'        if not :gameover [setcolor boxvalue :x :y]\n' + 
'        pu\n' + 
'        setxyz :x*:d :y*:d 0\n' + 
'        pd\n' + 
'        box :d \n' + 
'      ]\n' + 
'    ]\n' + 
'  ]\n' + 
'end\n' + 
'\n' + 
'to shapeinterferes \n' + 
'  repeat 4[\n' + 
'  	if boxvalue :xpos + getboxcoordinate :currentshape :currentorientation repcount 1 :ypos + getboxcoordinate :currentshape :currentorientation repcount 0 [return 1]\n' + 
'	]\n' + 
'  return 0\n' + 
'end\n' + 
'\n' + 
'to clearrow :r\n' + 
'  until :r > :height [\n' + 
'    repeat :width [\n' + 
'      make boxvariable repcount :r thing boxvariable repcount :r + 1	\n' + 
'    ]\n' + 
'		increment "r    \n' + 
'  ]\n' + 
'end\n' + 
'\n' + 
'to checkforfullrows\n' + 
'	make "r :height\n' + 
'  until :r = 0 [\n' + 
'    make "foundempty 0\n' + 
'    repeat :width [\n' + 
'      if not boxvalue repcount :r [\n' + 
'        make "foundempty 1\n' + 
'      ]\n' + 
'    ]\n' + 
'    if not :foundempty [\n' + 
'      clearrow :r\n' + 
'      increment "score\n' + 
'    ]\n' + 
'    decrement "r\n' + 
'  ]\n' + 
'end\n' + 
'\n' + 
'\n' + 
'\n' + 
'to drawborders\n' + 
'  color 255 255 255\n' + 
'	pu \n' + 
'  setxyz :d/2 :d/2 (0) \n' + 
'  pd \n' + 
'  fd :height*:d \n' + 
'  bk :height*:d \n' + 
'  rt 90 \n' + 
'  fd :width*:d \n' + 
'  lt 90 \n' + 
'  fd :height*:d\n' + 
'  pu\n' + 
'end\n' + 
'\n' + 
'to drawscore\n' + 
'  pu \n' + 
'  setxyz -5*:d :d  0 \n' + 
'  pd\n' + 
'  color 200 200 200\n' + 
'  label word "score\\s :score\n' + 
'end\n' + 
'\n' + 
'to dogameover \n' + 
'	color 100 100 100\n' + 
'  drawplacedshapes\n' + 
'  drawscore\n' + 
'  pu\n' + 
'  settextsize 30\n' + 
'  setxyz 0 :height*:d/2 2*:d\n' + 
'  color 255 255 255\n' + 
'  label "game\\sover\n' + 
'end\n' + 
'\n' + 
'\n' + 
'\n' + 
';global and static variables\n' + 
'make "width 10\n' + 
'make "height 25\n' + 
'make "d 10\n' + 
'make "dt 0.5\n' + 
'make "debouncetime 0.1\n' + 
'make "colorsaturation 50\n' + 
'\n' + 
'static "score 0\n' + 
'static "gameover 0\n' + 
'static "xpos getrandomentrypoint\n' + 
'static "ypos :height\n' + 
'static "currentshape getrandomshape\n' + 
'static "nextshape getrandomshape\n' + 
'static "currentorientation 0\n' + 
'\n' + 
'\n' + 
';main game loop\n' + 
'constructarray\n' + 
'ht\n' + 
'if :gameover [ dogameover return ]\n' + 
'checkpositiony\n' + 
'if not shapetouched [ checkkeyboard ]\n' + 
'if shapetouched [ shapeplace bringnew ]\n' + 
'drawcurrentshape\n' + 
'drawplacedshapes\n' + 
'checkforfullrows\n' + 
'drawscore\n' + 
'drawborders\n' + 
'drawnextshape\n');

LM.demoPrograms.pushDemo(
';---------------------------------\n' + 
';      Conway\'s Game of Life\n' + 
';---------------------------------\n' + 
'\n' + 
';Uncomment to see a glider!\n' + 
';randseed "wjqj8\n' +
'\n' + 
'make "height 15\n' + 
'make "width 15\n' + 
'make "d 10\n' + 
'make "dt 0.1\n' + 
'make "inverseprobability 8\n' + 
'static "currentarray "a\n' + 
'static "nextarray "b\n' + 
'\n' + 
'to checkgeneration\n' + 
'  static "previoustime time\n' + 
'  if time - :previoustime > :dt [\n' + 
'    nextgeneration\n' + 
'    make "previoustime time\n' + 
'  ]\n' + 
'end\n' + 
'\n' + 
'to nextgeneration \n' + 
'  repeat :width [\n' + 
'    make "x repcount\n' + 
'    repeat :height [\n' + 
'      make "y repcount\n' + 
'      make "cellalive thing cellname :currentarray :x :y\n' + 
'      make "liveneighbors numofliveneighbors :currentarray :x :y\n' + 
'      make cellname :nextarray :x :y :cellalive\n' + 
'      if and :cellalive :liveneighbors < 2 [make cellname :nextarray :x :y 0]\n' + 
'      if and :cellalive :liveneighbors > 3 [make cellname :nextarray :x :y 0]\n' + 
'      if and not :cellalive :liveneighbors = 3 [make cellname :nextarray :x :y 1]\n' + 
'    ]\n' + 
'  ]\n' + 
'  make "tmp :nextarray\n' + 
'  make "nextarray :currentarray\n' + 
'  make "currentarray :tmp\n' + 
'end\n' + 
'\n' + 
'to numofliveneighbors :name :x :y\n' + 
'  make "liveneighbors 0\n' + 
'  make "i -1\n' + 
'  while :i <= 1 [\n' + 
'    make "j -1\n' + 
'    while :j <= 1 [\n' + 
'      if or :i :j [\n' + 
'        if getcellvaluePeriodic :name :x + :i :y + :j [\n' + 
'          increment "liveneighbors\n' + 
'        ]\n' + 
'      ]\n' + 
'      increment "j\n' + 
'    ]\n' + 
'    increment "i\n' + 
'  ]\n' + 
'  return :liveneighbors\n' + 
'end\n' + 
'\n' + 
'to constructarray :name :randominit\n' + 
'  repeat :width [\n' + 
'    make "i repcount\n' + 
'    repeat :height [\n' + 
'      make "j repcount\n' + 
'      ifelse :randominit [\n' + 
'        static cellname :name :i :j not rand :inverseprobability \n' + 
'      ][\n' + 
'        static cellname :name :i :j 0\n' + 
'      ]\n' + 
'    ]\n' + 
'  ]\n' + 
'end\n' + 
'\n' + 
'to cellname :name :x :y\n' + 
'  return word word word :name :x "_ :y\n' + 
'end\n' + 
'\n' + 
'to getcellvaluePeriodic :name :x :y\n' + 
'  if :x > :width [make "x 1]\n' + 
'  if :x < 1 [make "x :width]\n' + 
'  if :y > :height [make "y 1]\n' + 
'  if :y < 1 [make "y :height]\n' + 
'  return thing cellname :name :x :y\n' + 
'end\n' + 
'\n' + 
'to drawarray :name\n' + 
'  repeat :width [\n' + 
'    make "x repcount\n' + 
'    repeat :height [\n' + 
'      make "y repcount\n' + 
'      if thing cellname :name :x :y [\n' + 
'        pu\n' + 
'        setxyz :x*:d :y*:d 0\n' + 
'        pd\n' + 
'        box :d \n' + 
'      ]\n' + 
'    ]\n' + 
'  ]\n' + 
'end\n' + 
'\n' + 
'to drawborder\n' + 
'  pu\n' + 
'  setxyz :d/2 :d/2 0\n' + 
'  pd\n' + 
'  repeat 2 [fd :height*:d rt 90 fd :width*:d rt 90]\n' + 
'end\n' + 
'  \n' + 
'  \n' + 
';initialization\n' + 
'static "once 1\n' + 
'if :once [\n' + 
'  constructarray :currentarray 1\n' + 
'  constructarray :nextarray 0\n' + 
'  make "once 0\n' + 
']\n' + 
'\n' + 
';main loop\n' + 
'ht\n' + 
'drawborder\n' + 
'coloralpha 50\n' + 
'drawarray :nextarray\n' + 
'coloralpha 255\n' + 
'drawarray :currentarray\n' + 
'checkgeneration\n');

LM.demoPrograms.pushDemo(
'; Demo Soccer Ball\n' +
'\n' +
'to pentagonLeft :l\n' +
'  repeat 5 [fd :l lt 360/5]\n' +
'end\n' +
'\n' +
'to exagonRight :l\n' +
'  repeat 6 [fd :l rt 360/6]\n' +
'end\n' +
'\n' +
'to pentagonLeftRecursive :l :n\n' +
'  ifelse :n = 0 [\n' +
'    pentagonLeft :l\n' +
'  ][\n' +
'    repeat 5 [\n' +
'      rl :angle \n' +
'      exagonRightRecursive :l :n - 1 \n' +
'      rr :angle fd :l lt 360/5\n' +
'    ]\n' +
'  ]\n' +
'end\n' +
'\n' +
'to exagonRightRecursive :l :n\n' +
'  ifelse :n = 0 [\n' +
'    exagonRight :l\n' +
'  ][\n' +
'    repeat 3 [\n' +
'      rr :angle \n' +
'      pentagonLeftRecursive :l :n - 1 \n' +
'      rl :angle fd :l rt 360/6 fd :l rt 360/6\n' +
'    ]\n' +
'  ]\n' +
'end\n' +
'\n' +
'make "size 50\n' +
'make "n 5\n' +
'make "angle 37.3775\n' +
'\n' +
';for :n = 5 it creates the full ball\n' +
';choose either starting point:\n' +
'\n' +
'exagonRightRecursive :size :n\n' +
'; pentagonLeftRecursive :size :n\n');