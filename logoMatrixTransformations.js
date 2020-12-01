var lm;


function resetLogoTransformationMatrix(){
  lm = [
    1, 0, 0, 0,
    0, 1, 0, 0,
    0, 0, 1, 0,
    0, 0, 0, 1
  ];
}


function logoTranslate(x, y, z){
  multiplyToLogoMatrix( [1, 0, 0, 0,
                         0, 1, 0, 0,
                         0, 0, 1, 0,
                         x, y, z, 1] );
  }

function logoRotateX(rad){
  let c = cos(rad);
  let s = sin(rad);
  multiplyToLogoMatrix( [1, 0, 0, 0,
                         0, c, s, 0,
                         0,-s, c, 0,
                         0, 0, 0, 1] );
}

function logoRotateY(rad){
  let c = cos(rad);
  let s = sin(rad);
  multiplyToLogoMatrix( [c, 0,-s, 0,
                         0, 1, 0, 0,
                         s, 0, c, 0,
                         0, 0, 0, 1] );
}

function logoRotateZ(rad){
  let c = cos(rad);
  let s = sin(rad);
  multiplyToLogoMatrix( [ c, s, 0, 0,
                         -s, c, 0, 0,
                          0, 0, 1, 0,
                          0, 0, 0, 1] );
}



function multiplyToLogoMatrix(m){
  lm = multiply4x4Matrices(lm, m);
}

function applyLogoTransformationMatrix(){
  applyMatrix(lm[0],lm[1],lm[2],lm[3],lm[4],lm[5],lm[6],lm[7],lm[8],lm[9],lm[10],lm[11],lm[12],lm[13],lm[14],lm[15]);
}

function getlmX(){
  return lm[12];
}

function getlmY(){
  return lm[13];
}

function getlmZ(){
  return lm[14];
}

function setlmX(newx){
  lm[12] = newx;
}

function setlmY(newy){
  lm[13] = newy;
}

function setlmZ(newz){
  lm[14] = newz;
}


function multiply4x4Matrices(a, b){
  return [
    b[0]*a[0]+b[1]*a[4]+b[2]*a[8]+ b[3]*a[12], 
    b[0]*a[1]+b[1]*a[5]+b[2]*a[9]+ b[3]*a[13], 
    b[0]*a[2]+b[1]*a[6]+b[2]*a[10]+b[3]*a[14], 
    b[0]*a[3]+b[1]*a[7]+b[2]*a[11]+b[3]*a[15],

    b[4]*a[0]+b[5]*a[4]+b[6]*a[8]+ b[7]*a[12], 
    b[4]*a[1]+b[5]*a[5]+b[6]*a[9]+ b[7]*a[13], 
    b[4]*a[2]+b[5]*a[6]+b[6]*a[10]+b[7]*a[14], 
    b[4]*a[3]+b[5]*a[7]+b[6]*a[11]+b[7]*a[15],

    b[8]*a[0]+b[9]*a[4]+b[10]*a[8]+ b[11]*a[12], 
    b[8]*a[1]+b[9]*a[5]+b[10]*a[9]+ b[11]*a[13], 
    b[8]*a[2]+b[9]*a[6]+b[10]*a[10]+b[11]*a[14], 
    b[8]*a[3]+b[9]*a[7]+b[10]*a[11]+b[11]*a[15],

    b[12]*a[0]+b[13]*a[4]+b[14]*a[8]+ b[15]*a[12], 
    b[12]*a[1]+b[13]*a[5]+b[14]*a[9]+ b[15]*a[13], 
    b[12]*a[2]+b[13]*a[6]+b[14]*a[10]+b[15]*a[14], 
    b[12]*a[3]+b[13]*a[7]+b[14]*a[11]+b[15]*a[15]
  ]
}