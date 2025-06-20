LM.positionInfo = {

  update: function(){
    if (document.getElementById("positionInfoCheckbox").checked){
      document.getElementById("positionInfoWidget").style.display = "block";

      let m = LM.matrix.getMatrix();
      let x = m[12];
      let y = -m[13];
      let z = m[14];
      let theta = (180/Math.PI) * Math.atan2(y, x);
      let phi = (180/Math.PI) * Math.atan2(Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2)), z);
      let r = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2) + Math.pow(z, 2));

      let table = document.getElementById("positionInfoTable");
      table.rows[0].cells[1].innerText = x.toFixed(3);
      table.rows[1].cells[1].innerText = y.toFixed(3);
      table.rows[2].cells[1].innerText = z.toFixed(3);
      table.rows[3].cells[1].innerText = theta.toFixed(3) + "°";
      table.rows[4].cells[1].innerText = phi.toFixed(3) + "°";
      table.rows[5].cells[1].innerText = r.toFixed(3);
    } else {
      document.getElementById("positionInfoWidget").style.display = "none";
    }
  }

}