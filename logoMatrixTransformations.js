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
  multiplyToLogoMatrix(  [1.0, 0.0, 0.0, 0.0,
                         0.0, 1.0, 0.0, 0.0,
                         0.0, 0.0, 1.0, 0.0,
                         x, y, z,  1.0]);
}

function logoRotateX(rad){
  let ct = cos(rad);
  let st = sin(rad);
  multiplyToLogoMatrix( [ 1.0, 0.0, 0.0,  0.0,
                         0.0, ct, st,  0.0,
                         0.0, -st, ct,  0.0,
                         0.0, 0.0, 0.0,  1.0]);
}

function logoRotateY(rad){
  let ct = cos(rad);
  let st = sin(rad);
  multiplyToLogoMatrix( [ct, 0.0,  -st,  0.0,
                         0.0, 1.0, 0.0,  0.0,
                         st, 0.0,  ct,  0.0,
                         0.0, 0.0, 0.0,  1.0]);
}

function logoRotateZ(rad){
  let ct = cos(rad);
  let st = sin(rad);
  multiplyToLogoMatrix( [ ct, st, 0.0,  0.0,
                         -st, ct, 0.0,  0.0,
                         0.0, 0.0, 1.0,  0.0,
                         0.0, 0.0, 0.0,  1.0]);
}



function multiplyToLogoMatrix(m){
  
  lm = multiplyMatrices(lm, m);
  
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

// point • matrix
function multiplyMatrixAndPoint(matrix, point) {
  // Give a simple variable name to each part of the matrix, a column and row number
  let c0r0 = matrix[ 0], c1r0 = matrix[ 1], c2r0 = matrix[ 2], c3r0 = matrix[ 3];
  let c0r1 = matrix[ 4], c1r1 = matrix[ 5], c2r1 = matrix[ 6], c3r1 = matrix[ 7];
  let c0r2 = matrix[ 8], c1r2 = matrix[ 9], c2r2 = matrix[10], c3r2 = matrix[11];
  let c0r3 = matrix[12], c1r3 = matrix[13], c2r3 = matrix[14], c3r3 = matrix[15];
  
  // Now set some simple names for the point
  let x = point[0];
  let y = point[1];
  let z = point[2];
  let w = point[3];
  
  // Multiply the point against each part of the 1st column, then add together
  let resultX = (x * c0r0) + (y * c0r1) + (z * c0r2) + (w * c0r3);
  
  // Multiply the point against each part of the 2nd column, then add together
  let resultY = (x * c1r0) + (y * c1r1) + (z * c1r2) + (w * c1r3);
  
  // Multiply the point against each part of the 3rd column, then add together
  let resultZ = (x * c2r0) + (y * c2r1) + (z * c2r2) + (w * c2r3);
  
  // Multiply the point against each part of the 4th column, then add together
  let resultW = (x * c3r0) + (y * c3r1) + (z * c3r2) + (w * c3r3);
  
  return [resultX, resultY, resultZ, resultW];
}

//matrixB • matrixA
function multiplyMatrices(matrixA, matrixB) {
  // Slice the second matrix up into rows
  let row0 = [matrixB[ 0], matrixB[ 1], matrixB[ 2], matrixB[ 3]];
  let row1 = [matrixB[ 4], matrixB[ 5], matrixB[ 6], matrixB[ 7]];
  let row2 = [matrixB[ 8], matrixB[ 9], matrixB[10], matrixB[11]];
  let row3 = [matrixB[12], matrixB[13], matrixB[14], matrixB[15]];

  // Multiply each row by matrixA
  let result0 = multiplyMatrixAndPoint(matrixA, row0);
  let result1 = multiplyMatrixAndPoint(matrixA, row1);
  let result2 = multiplyMatrixAndPoint(matrixA, row2);
  let result3 = multiplyMatrixAndPoint(matrixA, row3);

  // Turn the result rows back into a single matrix
  return [
    result0[0], result0[1], result0[2], result0[3],
    result1[0], result1[1], result1[2], result1[3],
    result2[0], result2[1], result2[2], result2[3],
    result3[0], result3[1], result3[2], result3[3]
  ];
}



