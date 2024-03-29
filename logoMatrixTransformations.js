
LM.matrix = (function(){

  const unitMatrix = [1, 0, 0, 0,
                    0, 1, 0, 0,
                    0, 0, 1, 0,
                    0, 0, 0, 1];
                    
  let lm = [...unitMatrix];

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

  function invertMatrix(m) {
    let r = [];

    r[0] = m[5]*m[10]*m[15] - m[5]*m[14]*m[11] - m[6]*m[9]*m[15] + m[6]*m[13]*m[11] + m[7]*m[9]*m[14] - m[7]*m[13]*m[10];
    r[1] = -m[1]*m[10]*m[15] + m[1]*m[14]*m[11] + m[2]*m[9]*m[15] - m[2]*m[13]*m[11] - m[3]*m[9]*m[14] + m[3]*m[13]*m[10];
    r[2] = m[1]*m[6]*m[15] - m[1]*m[14]*m[7] - m[2]*m[5]*m[15] + m[2]*m[13]*m[7] + m[3]*m[5]*m[14] - m[3]*m[13]*m[6];
    r[3] = -m[1]*m[6]*m[11] + m[1]*m[10]*m[7] + m[2]*m[5]*m[11] - m[2]*m[9]*m[7] - m[3]*m[5]*m[10] + m[3]*m[9]*m[6];

    r[4] = -m[4]*m[10]*m[15] + m[4]*m[14]*m[11] + m[6]*m[8]*m[15] - m[6]*m[12]*m[11] - m[7]*m[8]*m[14] + m[7]*m[12]*m[10];
    r[5] = m[0]*m[10]*m[15] - m[0]*m[14]*m[11] - m[2]*m[8]*m[15] + m[2]*m[12]*m[11] + m[3]*m[8]*m[14] - m[3]*m[12]*m[10];
    r[6] = -m[0]*m[6]*m[15] + m[0]*m[14]*m[7] + m[2]*m[4]*m[15] - m[2]*m[12]*m[7] - m[3]*m[4]*m[14] + m[3]*m[12]*m[6];
    r[7] = m[0]*m[6]*m[11] - m[0]*m[10]*m[7] - m[2]*m[4]*m[11] + m[2]*m[8]*m[7] + m[3]*m[4]*m[10] - m[3]*m[8]*m[6];

    r[8] = m[4]*m[9]*m[15] - m[4]*m[13]*m[11] - m[5]*m[8]*m[15] + m[5]*m[12]*m[11] + m[7]*m[8]*m[13] - m[7]*m[12]*m[9];
    r[9] = -m[0]*m[9]*m[15] + m[0]*m[13]*m[11] + m[1]*m[8]*m[15] - m[1]*m[12]*m[11] - m[3]*m[8]*m[13] + m[3]*m[12]*m[9];
    r[10] = m[0]*m[5]*m[15] - m[0]*m[13]*m[7] - m[1]*m[4]*m[15] + m[1]*m[12]*m[7] + m[3]*m[4]*m[13] - m[3]*m[12]*m[5];
    r[11] = -m[0]*m[5]*m[11] + m[0]*m[9]*m[7] + m[1]*m[4]*m[11] - m[1]*m[8]*m[7] - m[3]*m[4]*m[9] + m[3]*m[8]*m[5];

    r[12] = -m[4]*m[9]*m[14] + m[4]*m[13]*m[10] + m[5]*m[8]*m[14] - m[5]*m[12]*m[10] - m[6]*m[8]*m[13] + m[6]*m[12]*m[9];
    r[13] = m[0]*m[9]*m[14] - m[0]*m[13]*m[10] - m[1]*m[8]*m[14] + m[1]*m[12]*m[10] + m[2]*m[8]*m[13] - m[2]*m[12]*m[9];
    r[14] = -m[0]*m[5]*m[14] + m[0]*m[13]*m[6] + m[1]*m[4]*m[14] - m[1]*m[12]*m[6] - m[2]*m[4]*m[13] + m[2]*m[12]*m[5];
    r[15] = m[0]*m[5]*m[10] - m[0]*m[9]*m[6] - m[1]*m[4]*m[10] + m[1]*m[8]*m[6] + m[2]*m[4]*m[9] - m[2]*m[8]*m[5];

    let det = m[0]*r[0] + m[1]*r[4] + m[2]*r[8] + m[3]*r[12];
    for (let i = 0; i < 16; i++) r[i] /= det;
    return r;
  }

  function multiplyToLogoMatrix(m){
    lm = multiply4x4Matrices(lm, m);
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
    let c = Math.cos(rad);
    let s = Math.sin(rad);

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
    let c = Math.cos(rad);
    let s = Math.sin(rad);

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
    let c = Math.cos(rad);
    let s = Math.sin(rad);

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



  return {

    translateY: function(y){
      //anyway we are only tranlating on y axis, so just using that
      translateYLogoMatrix(y);
      /*
      multiplyToLogoMatrix( [1, 0, 0, 0,
                             0, 1, 0, 0,
                             0, 0, 1, 0,
                             x, y, z, 1] );
      */
    },

    rotateX: function(rad){
      rotateXLogoMatrix(rad);
      /*
      let c = cos(rad);
      let s = sin(rad);
      multiplyToLogoMatrix( [1, 0, 0, 0,
                             0, c, s, 0,
                             0,-s, c, 0,
                             0, 0, 0, 1] );
      */
    },

    rotateY: function(rad){
      rotateYLogoMatrix(rad);
      /*
      let c = cos(rad);
      let s = sin(rad);
      multiplyToLogoMatrix( [c, 0,-s, 0,
                             0, 1, 0, 0,
                             s, 0, c, 0,
                             0, 0, 0, 1] );
      */
    },

    rotateZ: function(rad){
      rotateZLogoMatrix(rad);
      /*
      let c = cos(rad);
      let s = sin(rad);
      multiplyToLogoMatrix( [ c, s, 0, 0,
                             -s, c, 0, 0,
                              0, 0, 1, 0,
                              0, 0, 0, 1] );
      */
    },

    reset: function(){
      lm = [...unitMatrix];
    },

    apply: function(){
      LM.p5Renderer.applyMatrix(...lm);
    },

    applyInverse: function(){
      let lmi = invertMatrix(lm);
      LM.p5Renderer.applyMatrix(...lmi);
    },

    getMatrix: function(){
      return [...lm];
    },

    getX: function(){
      return lm[12];
    },

    getY: function(){
      return lm[13];
    },

    getZ: function(){
      return lm[14];
    },

    setX: function(newx){
      lm[12] = newx;
    },

    setY: function(newy){
      lm[13] = newy;
    },

    setZ: function(newz){
      lm[14] = newz;
    }
  }


})();



























