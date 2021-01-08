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
  //anyway we are only tranlating on y axis, so just using that
  translateYLogoMatrix(y);
  /*
  multiplyToLogoMatrix( [1, 0, 0, 0,
                         0, 1, 0, 0,
                         0, 0, 1, 0,
                         x, y, z, 1] );
  */
  }

function logoRotateX(rad){
  rotateXLogoMatrix(rad);
  /*
  let c = cos(rad);
  let s = sin(rad);
  multiplyToLogoMatrix( [1, 0, 0, 0,
                         0, c, s, 0,
                         0,-s, c, 0,
                         0, 0, 0, 1] );
  */
}

function logoRotateY(rad){
  rotateYLogoMatrix(rad);
  /*
  let c = cos(rad);
  let s = sin(rad);
  multiplyToLogoMatrix( [c, 0,-s, 0,
                         0, 1, 0, 0,
                         s, 0, c, 0,
                         0, 0, 0, 1] );
  */
}

function logoRotateZ(rad){
  rotateZLogoMatrix(rad);
  /*
  let c = cos(rad);
  let s = sin(rad);
  multiplyToLogoMatrix( [ c, s, 0, 0,
                         -s, c, 0, 0,
                          0, 0, 1, 0,
                          0, 0, 0, 1] );
  */
}


/*
function multiplyToLogoMatrix(m){
  lm = multiply4x4Matrices(lm, m);
}
*/

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


//Faster shortcuts for specific tranformations
//Only calculates the affected cells of lm for a Y-translation
function translateYLogoMatrix(y){
  lm[12]=y*lm[4]+lm[12];
  lm[13]=y*lm[5]+lm[13];
  lm[14]=y*lm[6]+lm[14];
  lm[15]=y*lm[7]+lm[15];
}

//Only calculates the affected cells of lm for a X rotation
function rotateXLogoMatrix(rad){
  let c = cos(rad);
  let s = sin(rad);

  let lm4 = lm[4];
  let lm5 = lm[5];
  let lm6 = lm[6];
  let lm7 = lm[7];

  lm[4]=c*lm4+s*lm[8];
  lm[5]=c*lm5+s*lm[9];
  lm[6]=c*lm6+s*lm[10];
  lm[7]=c*lm7+s*lm[11];

  lm[8]=-s*lm4+c*lm[8];
  lm[9]=-s*lm5+c*lm[9];
  lm[10]=-s*lm6+c*lm[10];
  lm[11]=-s*lm7+c*lm[11];
}

//Only calculates the affected cells of lm for a Y rotation
function rotateYLogoMatrix(rad){
  let c = cos(rad);
  let s = sin(rad);

  let lm0 = lm[0];
  let lm1 = lm[1];
  let lm2 = lm[2];
  let lm3 = lm[3];

  lm[0]=c*lm0-s*lm[8];
  lm[1]=c*lm1-s*lm[9];
  lm[2]=c*lm2-s*lm[10];
  lm[3]=c*lm3-s*lm[11];

  lm[8]=s*lm0+c*lm[8];
  lm[9]=s*lm1+c*lm[9];
  lm[10]=s*lm2+c*lm[10];
  lm[11]=s*lm3+c*lm[11];
}

//Only calculates the affected cells of lm for a Z rotation
function rotateZLogoMatrix(rad){
  let c = cos(rad);
  let s = sin(rad);

  let lm0 = lm[0];
  let lm1 = lm[1];
  let lm2 = lm[2];
  let lm3 = lm[3];

  lm[0]=c*lm0+s*lm[4];
  lm[1]=c*lm1+s*lm[5];
  lm[2]=c*lm2+s*lm[6];
  lm[3]=c*lm3+s*lm[7];

  lm[4]=-s*lm0+c*lm[4];
  lm[5]=-s*lm1+c*lm[5];
  lm[6]=-s*lm2+c*lm[6];
  lm[7]=-s*lm3+c*lm[7];
}