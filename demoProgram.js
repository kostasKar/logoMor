
LM.demoPrograms = (function(){

	var programmsArray = [];
	var previousIndex = -1;

	return {

		pushDemo: function(demo){
			programmsArray.push(demo);
		},

		loadRandomDemo: function(){
			previousIndex = (previousIndex + 1) % programmsArray.length;
			let demo = programmsArray[previousIndex];
			document.getElementById("projectNameInputField").value = demo.title;
			LM.codeMirror.setValue(demo.codeText);
		},

		populateExamples: function(el){
			el = el.nextElementSibling;
			if (!el.firstChild){
				for(let i = 0; i < programmsArray.length; i++){
					let d = document.createElement("div");
					d.innerText = programmsArray[i].title;
					d.onclick = function () {
						document.getElementById("projectNameInputField").value = programmsArray[i].title;
						LM.codeMirror.setValue(programmsArray[i].codeText);
						LM.interpreter.setup();
					}
					el.appendChild(d);
				}
			}
		}

	}

})();


LM.demoPrograms.pushDemo({
title: "Random Curve",
codeText:
`;-----------Demo Random curve---------

;------Function-----------------------
TO drawRandomCurve :n
  repeat :n [ 
    right rand :maxangle 
    up rand :maxangle
    roll_right rand :maxangle
    forward rand :maxsize 
  ]
END

;------Global Variables---------------
;-Check auto generated sliders below--
make "maxsize 20
make "maxangle  36

;--Actual Drawing---------------------
setpensize 3
drawRandomCurve 3000`});

LM.demoPrograms.pushDemo({
title: "Bracelet",
codeText:
`;----------Demo Bracelet--------------   
  
;------Functions----------------------  
TO centeredCircle :r :n   
 make "segment 2*pi*:r/:n   
 penup   
 rt 90   
 fd :r   
 dn 90   
 bk :segment/2   
 pendown   
 repeat :n [   
  fd :segment    
  dn 360 / :n   
 ]   
 penup   
 fd :segment/2   
 dn 90   
 fd :r   
 lt 90  
 rr 180  
 pendown    
END   
   
TO mysphere :r :n   
 repeat :n/2 [   
  centeredCircle :r :n   
  rt 360/:n   
 ]   
 rt 180  
END   
   
to fdWithSphere :d :n  
 penup  
 fd :d/2  
 pendown  
 mysphere :d/2 :n  
 penup   
 fd :d/2  
 pendown  
end  
  
;-----Global Variables-------------  
;-see auto generated sliders below-  
make "radius 100  
make "segs 5  
make "segs 2*:segs  
make "jewels 6  
  
;----drawing-----------------------  
repeat :jewels [  
 fdWithSphere 2*pi*:radius/:jewels :segs  
 rt 360/:jewels   
] `});

LM.demoPrograms.pushDemo({
title: "Sierpinski Triangle",
codeText:
`;----Demo Sierpinski Fractal-------  
  
;------Recursive Function----------  
to SierpinskiFractal :l :n  
ifelse :n=0 [repeat 3[fd :l rt 120]]  
[SierpinskiFractal :l/2 :n-1 fd :l/2  
 SierpinskiFractal :l/2 :n-1 rt 120 fd :l/2 lt 120  
 SierpinskiFractal :l/2 :n-1 lt 120 fd :l/2 rt 120]  
end  
  
;-----Global Variables-------------   
;-see auto generated sliders below-  
make "length 250 
make "depth 7 
  
;----drawing-----------------------  
SierpinskiFractal :length :depth 
penup 
setxyz :length*(sqrt 3)/6 :length/2 0 
label :depth 
home 
pendown`});

LM.demoPrograms.pushDemo({
title: "Crazy Cubes",
codeText:
`;---------Demo Crazy Cubes-------------  
;Rand produces random numbers for each run  
;Randcrazy does the same but for each frame!  
  
To square  :x  
  repeat 4 [  
  forward :x  
  right 90]  
END  
  
TO cube :x  
  setpensize randcrazy 10  
  color randcrazy 255 randcrazy 255 randcrazy 255  
  repeat 4[  
    square :x  
  forward :x  
  down 90 ]  
end   
  
rl 15   
up 15  
  
repeat 4 [  
 repeat 4 [  
  cube 50 + rand 50  
  penup  
  setx getx -150   
  pendown  
 ]   
 penup  
 setx 0  
 sety gety - 150  
 pendown  
]  
  
print rand 500  
print randcrazy 500`});

LM.demoPrograms.pushDemo({
title: "Accelerating Sphere",
codeText:
`;-----Demo Accelerating Sphere--------   
;Using timing commands a sketch can be  
;animated!  
  
;-----Global Variables-------------   
;-see auto generated sliders below-  
make "radius 15  
  
;----drawing----------------------- 
;frame returns current frame number 
pu  
sety 100 * sin frame*frame*0.002  
setx 100 * cos frame*frame*0.002  
ht  
pd 
sphere :radius  
print gety  
print getx `});

LM.demoPrograms.pushDemo({
title: "Flying Avatars",
codeText:
`;----Demo Flying Avatars-----------  
rr frame  
rt frame  
up frame  
pu  
  
make "speed 1  
fd mod :speed*frame 300 `});

LM.demoPrograms.pushDemo({
title: "Colorful Starfish",
codeText:
`;----Demo Colorful Starfish---------  
;Using beginface endface we can create solids  
  
;-----Function to dray one leg-------  
to leg :s :d  
 up 90  
 fd :d/2  
 dn 90  
 make "a arctan :d/(2*:s)  
 make "l sqrt (pow :d/2 2)+(pow :s 2)  
 dn :a  
 beginface  
 fd :l  
 up :a  
 lt :a  
 bk :l  
 endface  
 rt :a  
 rr 90  
 dn 90  
 fd :d/2  
 up 90  
end  
  
  
;Variables.play with size, number of legs  
;and color. Check variables manipulators  
make "diameter 30  
make "length 100  
make "legs 5  
make "hue 36 
  
;---Actual drawing-----------------  
colorhsb :hue 100 100 
repeat :legs [  
 repeat 4 [  
  leg :length :diameter  
 ]  
 rt 360/:legs  
] `});

LM.demoPrograms.pushDemo({
title: "Bouncing Ball",
codeText:
`;---Demo Bouncing Ball---------------     
;---using static variables we can make     
;---any kind of animation!-----------     
     
make "width 300    
make "height 200    
make "radius 30    
    
static "locationX 0     
static "locationY :height     
static "velocityX 1.5     
static "velocityY 0     
static "gravity 0.2    
     
make "locationX :locationX + :velocityX     
make "locationY :locationY + :velocityY     
make "velocityY :velocityY - :gravity     
     
if (:locationX<0)[     
  make "velocityX -:velocityX  
  make "locationX 0     
]     
  
if (:locationX>:width) [     
  make "velocityX -:velocityX       
  make "locationX :width     
]   
     
if (:locationY<0)[     
 make "velocityY :velocityY*-0.95    
 make "locationY 0    
]     
   
if (:locationY>:height)[     
 make "velocityY :velocityY*-0.95     
 make "locationY :height    
]     
     
to circle :r      
  setx getx + :r  
  arc 360 :r  
  setx getx - :r  
end    
     
penup     
setxyz :locationX :locationY 0     
circle :radius    
home     
pendown    
fd :height+:radius rt 90    
fd :width+(:radius*2) rt 90    
fd :height+(:radius*2) rt 90    
fd :width+(:radius*2) rt 90    
fd :radius   `});

LM.demoPrograms.pushDemo({
title: "Pinball",
codeText:
`;---Demo pinball game---------------     
     
make "width 300    
make "height 500 
make "radius 30    
make "barpos mousex 
    
static "locationX rand :width     
static "locationY 0     
static "velocityX 2   
static "velocityY 8 
static "lose 0 
static "score 0 
static "previousmousex mousex

     
make "locationX :locationX + :velocityX     
make "locationY :locationY + :velocityY     
 
if :lose [pu  setxyz :width/2 :height/2 0 label "you\\slost home return] 
     
 
if (:locationX<0)[     
  make "velocityX -:velocityX  
  make "locationX 0     
]     
  
if (:locationX>:width) [     
  make "velocityX -:velocityX       
  make "locationX :width     
]   
     
if (:locationY<0)[     
 make "velocityY :velocityY*-1   
 make "locationY 0   
 make "velocityX :velocityX + 0.1* (mousex - :previousmousex) 
 ifelse (abs (:locationx+:radius-(:barpos+25)))> 50  
  [ make "lose 1]  
  [ make "score :score+1] 
]     
   
if (:locationY>:height)[     
 make "velocityY -:velocityY     
 make "locationY :height    
]     
     
to circle :r  
  setx getx + :r  
  arc 360 :r  
  setx getx - :r  
end  
     
penup     
setxyz :locationX :locationY 0     
circle :radius    
home     
pendown    
fd :height+:radius rt 90    
fd :width+(:radius*2) rt 90    
fd :height+(:radius*2) rt 90   
pu fd :width+(:radius*2) rt 90    pd 
fd :radius bk :radius 
rt 90 pu fd :barpos pd fd 50  
print "score 
print :score 
make "previousmousex mousex`});

LM.demoPrograms.pushDemo({
title: "Fibonacci Spiral",
codeText:
`;--------Demo Fibonacci spiral---------  
  
;Recursive fibonacci just for reference  
;Very heavy, observe fps as :n grows  
;print :functioncalls to check num of calls  
;Maybe there is another fibonacci sequence there :) 
static "functioncalls 0  
make "functioncalls 0  
  
to fibonaccirec :n  
  increment "functioncalls  
  if :n=0 [return 0]  
  if :n=1 [return 1]  
  return (fibonaccirec :n-1) + (fibonaccirec :n-2)  
end  
  
;Iterative fibonacci, more practical  
to fibonacci :n  
  make "a 0  
  make "b 1  
  repeat :n-1 [  
    make "b :a+:b  
    make "a :b-:a  
  ]  
  ifelse :n=0 [return :a] [return :b]  
end  
  
;Global variables. Check variables manipulators 
make "n 15  
make "angle 50  
  
;Actual drawing code 
repeat :n [  
  fd fibonacci repcount  
  rt :angle  
]  
;print :functioncalls `});

LM.demoPrograms.pushDemo({
title: "Sorting Algorithms",
codeText:
`;-------Demo Sorting algorithms---------- 
 
;---------------------------------------- 
;----array implementation functions------ 
to makearray :name :size  
  repeat :size [  
    static word :name repcount 0  
    make word :name repcount 0  
  ]  
end  
  
to getitem :name :index  
  return thing word :name :index  
end  
  
to setitem :name :index :value  
  make word :name :index :value  
end  
 
 
;---------------------------------------- 
;----------sorting functions------------- 
to insertionsort :arrayname :size  
  repeat :size [ 
    make "j repcount 
    while :j > 1 [ 
      if (getitem :arrayname :j) < (getitem :arrayname :j-1) [ 
        swap :arrayname :j :j-1 
        if :steps > :maxsteps [return 0] 
      ] 
      decrement "j 
    ] 
  ] 
end 
   
to bubblesort :arrayname :size 
  make "swapped 1 
	while :swapped [ 
    make "swapped 0 
    repeat :size - 1 [ 
      if (getitem :arrayname repcount) > (getitem :arrayname repcount+1) [ 
        swap :arrayname repcount repcount+1 
        make "swapped 1 
        if :steps > :maxsteps [return 0] 
      ] 
    ] 
  ] 
end 
 
to quicksort :arrayname :start :end 
  if :steps > :maxsteps [return 0] 
  if :start < :end [ 
    make "p qspartition :arrayname :start :end 
    quicksort :arrayname :start :p-1 
    quicksort :arrayname :p+1 :end 
  ] 
end 
 
to qspartition :arrayname :start :end  
  make "pivot getitem :arrayname :end 
  make "i :start 
  make "j :start 
  while :j <= :end [ 
    if (getitem :arrayname :j) < :pivot [ 
      swap :arrayname :j :i 
      increment "i 
      if :steps > :maxsteps [swap :arrayname :i :end return 0] 
    ] 
    increment "j 
  ] 
  swap :arrayname :i :end 
  return :i  
end 
 
;helpful swap function  
to swap :arrayname :i1 :i2 
  make "tmp getitem :arrayname :i1 
  setitem :arrayname :i1 getitem :arrayname :i2 
  setitem :arrayname :i2 :tmp 
  increment "steps 
end 
 
;---------------------------------------- 
;---------demo help functions------------ 
to makerandomarray :name :size :maxn 
  makearray :name :size 
  repeat :size [ 
    setitem :name repcount rand :maxn 
  ] 
end 
 
to drawarraypoints :name :size 
  pu 
  repeat :size [ 
    setxyz repcount * 10 getitem :name repcount 0 
    colorhsb (getitem :name repcount) * (250 / :maxnum) 100 100 
    box 10
  ] 
end 
 
;---------------------------------------- 
;-------------drawing-------------------- 
make "size 50 
make "maxnum 200 
make "delaysecs 0.05 
 
make "maxsteps trunc time / :delaysecs 
make "steps 0 
 
ht 
makerandomarray "ar :size :maxnum 
 
;insertionsort "ar :size  
;bubblesort "ar :size  
quicksort "ar 1 :size   
 
drawarraypoints "ar :size 
print word "steps\\s :steps 
`});

LM.demoPrograms.pushDemo({
title: "TETRIS",
codeText:
`;--------TETRIS---------------- 
; play with the keyboard arrows 
;------------------------------ 
 
;returns the relative coordinate of a specific box of a tetromino 
;shape: 1-7 the different tetrominos 
;orient: 0-3 the different orientations 
;boxnum: 1-4 selects a specific box of the shape - all shapes consist of 4 boxes 
;xory: 1 for the X coordinate, 0 for the Y 
to getboxcoordinate :shape :orient :boxnum :xory   
   
  if :shape = 1[ ;square tetromino 
    if :boxnum = 1 [make "x 0 make "y 0] 
    if :boxnum = 2 [make "x 0 make "y 1] 
    if :boxnum = 3 [make "x 1 make "y 1] 
    if :boxnum = 4 [make "x 1 make "y 0] 
    ifelse :xory [return :x][return :y] ;do not rotate the square 
  ] 
  if :shape = 2[ ;straight tetromino 
    if :boxnum = 1 [make "x 0 make "y -1] 
    if :boxnum = 2 [make "x 0 make "y 0] 
    if :boxnum = 3 [make "x 0 make "y 1] 
    if :boxnum = 4 [make "x 0 make "y 2] 
  ] 
  if :shape = 3[ ;T-teromino 
    if :boxnum = 1 [make "x 0 make "y -1] 
    if :boxnum = 2 [make "x 0 make "y 0] 
    if :boxnum = 3 [make "x 0 make "y 1] 
    if :boxnum = 4 [make "x 1 make "y 0] 
  ] 
  if :shape = 4[ ;L-tetromino 
    if :boxnum = 1 [make "x 0 make "y -1] 
    if :boxnum = 2 [make "x 0 make "y 0] 
    if :boxnum = 3 [make "x 0 make "y 1] 
    if :boxnum = 4 [make "x 1 make "y -1] 
  ] 
  if :shape = 5[ ;mirrored L-tetromino 
    if :boxnum = 1 [make "x 0 make "y -1] 
    if :boxnum = 2 [make "x 0 make "y 0] 
    if :boxnum = 3 [make "x 0 make "y 1] 
    if :boxnum = 4 [make "x -1 make "y -1] 
  ] 
  if :shape = 6[ ;S-tetromino 
    if :boxnum = 1 [make "x 0 make "y -1] 
    if :boxnum = 2 [make "x 0 make "y 0] 
    if :boxnum = 3 [make "x -1 make "y 0] 
    if :boxnum = 4 [make "x -1 make "y 1] 
  ] 
  if :shape = 7[ ;mirrored S-tetromino 
    if :boxnum = 1 [make "x 0 make "y -1] 
    if :boxnum = 2 [make "x 0 make "y 0] 
    if :boxnum = 3 [make "x 1 make "y 0] 
    if :boxnum = 4 [make "x 1 make "y 1] 
  ] 
  return rotatecoordinate :x :y :orient :xory  
end 
 
;applies the rotation to the shape 
to rotatecoordinate :x :y :orient :xory 
  if :orient = 0 [ifelse :xory [return :x][return :y]] 
  if :orient = 1 [ifelse :xory [return :y][return -:x]] 
  if :orient = 2 [ifelse :xory [return -:x][return -:y]] 
  if :orient = 3 [ifelse :xory [return -:y][return :x]] 
end 
 
to shapegenerator :s :o 
  setcolor :s 
  make "x0 getx 
  make "y0 gety 
  repeat 4 [ 
    pu setxyz :x0 + :d * getboxcoordinate :s :o repcount 1 :y0 + :d * getboxcoordinate :s :o repcount 0 0 pd box :d  
  ] 
end 
 
to setcolor :s 
  colorhsb (mod :s 7)*(360/7) :colorsaturation 100 
end 
 
to getrandomshape  
  return (randcrazy 7)  + 1 
end 
 
to getrandomentrypoint  
  return (randcrazy :width - 2) + 2 
end 
 
to checkpositiony 
  static "previoustime time 
  if time - :previoustime > :dt [ 
    decrement "ypos 
    make "previoustime time 
  ] 
end 
 
to checkkeyboard 
  static "upkeyalreadypressed 0 
  static "sidekeyalreadypressed 0 
  static "previouskeytime 0
  static "delay 0
  
  ifelse not keypressed [
    make "upkeyalreadypressed 0
    make "sidekeyalreadypressed 0
    make "delay 0
  ][
    ;up separate pressings
    if and keypressed = 38 not :upkeyalreadypressed[  
      make "currentorientation  mod (:currentorientation + 1) 4 
      if shapeinterferes [ 
        trywallkick
      ] 
      make "upkeyalreadypressed 1
      stop
    ]
    ;right continuous with delay. Larger delay for initial press 
    if and keypressed = 39 time - :previouskeytime >= :delay [ 
      make "xpos min :xpos + 1 :width 
      if shapeinterferes [ 
        decrement "xpos 
        stop
      ] 
      make "previouskeytime time
      ifelse :sidekeyalreadypressed [make "delay :keydelay][make "delay :keyfirstdelay]
      make "sidekeyalreadypressed 1 
      stop
    ] 
    ;left continuous with delay. Larger delay for initial press
    if and keypressed = 37 time - :previouskeytime >= :delay [
      make "xpos max :xpos - 1 0 
      if shapeinterferes [ 
        increment "xpos 
        stop
      ] 
      make "previouskeytime time
      ifelse :sidekeyalreadypressed [make "delay :keydelay][make "delay :keyfirstdelay]
      make "sidekeyalreadypressed 1
      stop
    ]
    ;down continuous without delay
    if keypressed = 40 [ 
      decrement "ypos 
      if shapeinterferes [ 
        increment "ypos 
      ] 
      stop
    ] 
    
  ]
  
end 

to trywallkick 
  if :wallkickright [
    repeat 2 [
      decrement "xpos
      if not shapeinterferes [stop]
    ]
    make "xpos :xpos + 2
  ]
  if :wallkickleft [
    repeat 2 [
      increment "xpos
      if not shapeinterferes [stop]
    ]
    make "xpos :xpos - 2
  ]
  make "currentorientation  mod (:currentorientation + 3) 4 
end
 
to drawcurrentshape 
  pu  
  setxyz :d * :xpos :d * :ypos 0 
  pd 
  shapegenerator :currentshape :currentorientation 
end 
 
to drawnextshape  
  pu 
  setxyz -:d*4 :height*:d 0 
  pd 
  shapegenerator :nextshape 0 
end 
 
to bringnew 
  make "xpos getrandomentrypoint 
  make "ypos :height 
  make "currentshape :nextshape 
  make "nextshape getrandomshape 
  make "currentorientation 0 
end 
 
to constructarray 
  repeat :width [ 
    make "w repcount 
    repeat :height + 5 [ 
      static boxvariable :w repcount 0 
    ] 
  ] 
end 
 
to boxvariable :x :y 
  return word word word "p :x "_ :y 
end 
 
to boxvalue :x :y 
  if :y < 1 [return 10] 
  if :x > :width [make "wallkickright 1 return 10] 
  if :x < 1 [make "wallkickleft 1 return 10]   
  return thing boxvariable :x :y 
end 
 
to shapetouched  
  repeat 4 [ 
    if boxvalue :xpos + getboxcoordinate :currentshape :currentorientation repcount 1 :ypos + (getboxcoordinate :currentshape :currentorientation repcount 0) - 1 [return 1] 
  ] 
  return 0 
end 
 
to place :x :y 
  if :y = :height [make "gameover 1] 
  make boxvariable :x :y :currentshape 
end 
 
to shapeplace 
  repeat 4 [ 
    place :xpos + getboxcoordinate :currentshape :currentorientation repcount 1 :ypos + getboxcoordinate :currentshape :currentorientation repcount 0 
  ] 
end 
 
to drawplacedshapes  
  repeat :width [ 
    make "x repcount 
    repeat :height [ 
      make "y repcount 
      if boxvalue :x :y [ 
        if not :gameover [setcolor boxvalue :x :y] 
        pu 
        setxyz :x*:d :y*:d 0 
        pd 
        box :d  
      ] 
    ] 
  ] 
end 
 
to shapeinterferes  
  repeat 4[ 
    if boxvalue :xpos + getboxcoordinate :currentshape :currentorientation repcount 1 :ypos + getboxcoordinate :currentshape :currentorientation repcount 0 [return 1] 
  ] 
  return 0 
end 
 
to clearrow :r 
  until :r > :height [ 
    repeat :width [ 
      make boxvariable repcount :r thing boxvariable repcount :r + 1
    ] 
  increment "r     
  ] 
end 
 
to checkforfullrows 
  make "r :ypos + 2 
  until :r < :ypos - 2 [ 
    make "foundempty 0 
    repeat :width [ 
      if not boxvalue repcount :r [ 
        make "foundempty 1 
        break
      ] 
    ]
    if not :foundempty [ 
      clearrow :r 
      increment "score 
    ] 
    decrement "r 
    if not :r [break]
  ] 
end 
 
 
 
to drawborders 
  color 255 255 255 
  pu  
  setxyz :d/2 :d/2 (0)  
  pd  
  fd :height*:d  
  bk :height*:d  
  rt 90  
  fd :width*:d  
  lt 90  
  fd :height*:d 
  pu 
end 
 
to drawscore 
  pu  
  setxyz -5*:d :d  0  
  pd 
  color 200 200 200 
  label word "score\\s :score 
end 
 
to dogameover  
  color 100 100 100 
  drawplacedshapes 
  drawscore 
  pu 
  settextsize 30 
  setxyz 0 :height*:d/2 2*:d 
  color 255 255 255 
  label "game\\sover 
end 
 
 
 
;global and static variables 
make "width 10 
make "height 25 
make "d 10 
make "dt 0.5 
make "keyfirstdelay 0.1
make "keydelay 0.04 
make "colorsaturation 50 
make "wallkickright 0
make "wallkickleft 0
 
static "score 0 
static "gameover 0 
static "xpos getrandomentrypoint 
static "ypos :height 
static "currentshape getrandomshape 
static "nextshape getrandomshape 
static "currentorientation 0 
 
 
;main game loop 
static "once 1
if :once [ 
  constructarray 
  make "once 0 
]
ht 
if :gameover [ dogameover return ] 
checkpositiony 
checkkeyboard 
if shapetouched [ shapeplace checkforfullrows bringnew] 
drawcurrentshape 
drawplacedshapes 
drawscore 
drawborders 
drawnextshape`});

LM.demoPrograms.pushDemo({
title: "Conway's Game of Life",
codeText:
`;--------------------------------- 
;      Conway\'s Game of Life 
;--------------------------------- 
 
;Uncomment to see a glider! 
;randseed "wjqj8
 
make "height 15 
make "width 15 
make "d 10 
make "dt 0.1 
make "inverseprobability 8 
static "currentarray "a 
static "nextarray "b 
 
to checkgeneration 
  static "previoustime time 
  if time - :previoustime > :dt [ 
    nextgeneration 
    make "previoustime time 
  ] 
end 
 
to nextgeneration  
  repeat :width [ 
    make "x repcount 
    repeat :height [ 
      make "y repcount 
      make "cellalive thing cellname :currentarray :x :y 
      make "liveneighbors numofliveneighbors :currentarray :x :y 
      make cellname :nextarray :x :y :cellalive 
      if and :cellalive :liveneighbors < 2 [make cellname :nextarray :x :y 0] 
      if and :cellalive :liveneighbors > 3 [make cellname :nextarray :x :y 0] 
      if and not :cellalive :liveneighbors = 3 [make cellname :nextarray :x :y 1] 
    ] 
  ] 
  make "tmp :nextarray 
  make "nextarray :currentarray 
  make "currentarray :tmp 
end 
 
to numofliveneighbors :name :x :y 
  make "liveneighbors 0 
  make "i -1 
  while :i <= 1 [ 
    make "j -1 
    while :j <= 1 [ 
      if or :i :j [ 
        if getcellvaluePeriodic :name :x + :i :y + :j [ 
          increment "liveneighbors 
        ] 
      ] 
      increment "j 
    ] 
    increment "i 
  ] 
  return :liveneighbors 
end 
 
to constructarray :name :randominit 
  repeat :width [ 
    make "i repcount 
    repeat :height [ 
      make "j repcount 
      ifelse :randominit [ 
        static cellname :name :i :j not rand :inverseprobability  
      ][ 
        static cellname :name :i :j 0 
      ] 
    ] 
  ] 
end 
 
to cellname :name :x :y 
  return word word word :name :x "_ :y 
end 
 
to getcellvaluePeriodic :name :x :y 
  if :x > :width [make "x 1] 
  if :x < 1 [make "x :width] 
  if :y > :height [make "y 1] 
  if :y < 1 [make "y :height] 
  return thing cellname :name :x :y 
end 
 
to drawarray :name 
  repeat :width [ 
    make "x repcount 
    repeat :height [ 
      make "y repcount 
      if thing cellname :name :x :y [ 
        pu 
        setxyz :x*:d :y*:d 0 
        pd 
        box :d  
      ] 
    ] 
  ] 
end 
 
to drawborder 
  pu 
  setxyz :d/2 :d/2 0 
  pd 
  repeat 2 [fd :height*:d rt 90 fd :width*:d rt 90] 
end 
   
   
;initialization 
static "once 1 
if :once [ 
  constructarray :currentarray 1 
  constructarray :nextarray 0 
  make "once 0 
] 
 
;main loop 
ht 
drawborder 
coloralpha 50 
drawarray :nextarray 
coloralpha 255 
drawarray :currentarray 
checkgeneration`});

LM.demoPrograms.pushDemo({
title: "Soccer Ball",
codeText:
`;----------Demo Soccer Ball------------
; Implemetation using Mutual Recursion
;--------------------------------------

to pentagonLeftRecursive :l :n
  ifelse :n = 0 [
    repeat 5 [fd :l lt 360/5]
  ][
    repeat 5 [
      rl :angle 
      exagonRightRecursive :l :n-1 
      rr :angle 
      fd :l lt 360/5
    ]
  ]
end

to exagonRightRecursive :l :n
  ifelse :n = 0 [
    repeat 6 [fd :l rt 360/6]
  ][
    repeat 3 [
      rr :angle 
      pentagonLeftRecursive :l :n-1 
      rl :angle fd :l rt 360/6 
      fd :l rt 360/6
    ]
  ]
end

make "size 50
make "n 5
make "angle 37.3775
sps 3

;for :n = 5 it creates the full ball
;choose either starting point:

exagonRightRecursive :size :n
; pentagonLeftRecursive :size :n`});

LM.demoPrograms.pushDemo({
title: "Solid Logomor Icon",
codeText:
`;-------Solid Logomor Icon ---------
; Parametric, check variables manipulators
; Can be exported to STl and 3D printed!

make "bigside 45
make "smallside 15

to bigface
  beginface
  fd :bigside rt 90 fd :smallside rt 90 fd :bigside rt 90 fd :smallside
  endface
  rt 90
end

to smallface
  beginface
  fd (:bigside - :smallside) rt 90 fd :smallside rt 90 fd (:bigside - :smallside) rt 90 fd :smallside
  endface
  rt 90
end

to filler
  beginface
  fd (:bigside-2*:smallside) rt 90 fd :smallside rt 90 fd (:bigside-2*:smallside) rt 90 fd :smallside
  endface
  rt 90
end

to cap
  beginface
  fd :smallside rt 90 fd :smallside rt 90 fd :smallside rt 90 fd :smallside
  endface
  rt 90
end

ht
colorhsb 180 100 100
rt 90 rr 90
cap
rl 90 lt 90
bigface
pu dn 90 fd :smallside up 90 rl 90 pd
smallface
pu dn 90 fd :smallside up 90 rl 90 pd
smallface
pu dn 90 fd :smallside up 90 rl 90 pd
bigface
pu rl 90 lt 90 fd :smallside rt 90 fd (:bigside - :smallside) lt 90 pd
smallface
pu dn 90 fd :smallside up 90 rl 90 pd
filler
pu dn 90 fd :smallside up 90 rl 90 bk :smallside pd
smallface
pu dn 90 fd :smallside up 90 rl 90 pd
colorhsb 0 100 100
bigface
pu fd :bigside dn 90 fd :smallside rt 90 pd
colorhsb 180 100 100
bigface
pu dn 90 fd :smallside up 90 rl 90 pd
smallface
pu dn 90 fd :smallside up 90 rl 90 fd :smallside pd
smallface
pu dn 90 fd :smallside up 90 rl 90 pd
colorhsb 0 100 100
smallface
pu fd (:bigside-2*:smallside) dn 90 rl 90  fd :smallside pd
colorhsb 180 100 100
smallface
pu dn 90 fd :smallside up 90 rl 90 pd
smallface
pu dn 90 fd :smallside up 90 rl 90 pd
smallface
pu dn 90 fd :smallside up 90 rl 90 bk :smallside pd
bigface
pu fd :bigside dn 90 pd
cap
`});
