

function getRandomDemoProgram(){
	var demoPrograms = [demoProgram1, demoProgram2, demoProgram3];
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