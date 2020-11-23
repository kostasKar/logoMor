

function getRandomDemoProgram(){
	var demoPrograms = [demoProgram1, demoProgram2, demoProgram3, demoProgram4, demoProgram5];
	var i = Math.floor(Math.random()*demoPrograms.length);
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
'SierpinskiFractal :length :depth \n';

var demoProgram5 = 
';---------Demo Crazy Cubes------------- \n' + 
';Rand produces random numbers for each run \n' + 
';Randcrazy does the same but for each frame! \n' + 
' \n' + 
'To square  :x \n' + 
'  repeat 4 [ \n' + 
'  setpensize randcrazy 10 \n' + 
'  color randcrazy 255 randcrazy 255 randcrazy 255 \n' + 
'  forward :x \n' + 
'  right 90] \n' + 
'END \n' + 
' \n' + 
'TO cube :x \n' + 
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