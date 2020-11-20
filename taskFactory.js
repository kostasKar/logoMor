

function checkTaskFactory(){

  var token = sourceTokens[currentIndex];
  
  if (token === "("){
      var pt = new ParenthesisTask();
      currentIndex++;
      return;
  } else if (token === "make"){
      var vmt = new VariableMakerTask();
      currentIndex++;
      return;
  } else if (token === "if"){
      var ift = new IfTask();
      currentIndex++;
      return;
  } else if (token === "ifelse"){
      var ifet = new IfElseTask();
      currentIndex++;
      return;
  } else if (token === "repeat"){
      var rept = new RepeatTask();
      currentIndex++;
      return;
  } else if (token === "while"){
      var whilet = new WhileTask();
      currentIndex++;
      return;
  } else if (token === "until"){
      var untilt = new UntilTask();
      currentIndex++;
      return;
  } else if (token === "to"){
      var proct = new ProcedureTask();
      currentIndex++;
      return;
  } else if (token in procedures){
      var proct = new ProcedureTask(procedures[token]);
      currentIndex++;
      return;
  } else if ((token === "forward") || (token === "fd")) {
      var fdt = new FdTask();
      currentIndex++;
      return;
  } else if ((token === "back") || (token === "bk")) {
      var bkt = new BkTask();
      currentIndex++;
      return;
  } else if ((token === "right") || (token === "rt")) {
      var rtt = new RtTask();
      currentIndex++;
      return;
  } else if ((token === "left") || (token === "lt")) {
      var ltt = new LtTask();
      currentIndex++;
      return;
  } else if (token === "up") {
      var upt = new UpTask();
      currentIndex++;
      return;
  } else if ((token === "down") || (token === "dn")) {
      var dnt = new DnTask();
      currentIndex++;
      return;
  } else if ((token === "roll_right") || (token === "rr")) {
      var rrt = new RrTask();
      currentIndex++;
      return;
  } else if ((token === "roll_left") || (token === "rl")) {
      var rlt = new RlTask();
      currentIndex++;
      return;
  } else if ((token === "penup") || (token === "pu")) {
      var putt = new PuTask();
      currentIndex++;
      return;
  } else if ((token === "pendown") || (token === "pd")) {
      var pdt = new PdTask();
      currentIndex++;
      return;
  } else if (token === "setpensize") {
      var spst = new SpsTask();
      currentIndex++;
      return;
  } else if (token === "color") {
      var clrt = new ColorTask();
      currentIndex++;
      return;
  } else if (token === "home") {
      var hmt = new HmTask();
      currentIndex++;
      return;
  } else if (token === "getx") {
      var getxt =  new GetXTask();
      currentIndex++;
      return;
  } else if (token === "gety") {
      var getyt = new GetYTask();
      currentIndex++;
      return;
  } else if (token === "getz") {
      var getzt = new GetZTask();
      currentIndex++;
      return;
  } else if (token === "setx") {
      var setxt = new SetXTask();
      currentIndex++;
      return;
  } else if (token === "sety") {
      var setyt = new SetYTask();
      currentIndex++;
      return;
  } else if (token === "setz") {
      var setzt = new SetZTask();
      currentIndex++;
      return;
  } else if (token === "setxyz") {
      var setxyzt = new SetXYZTask();
      currentIndex++;
      return;
  } else if (token === "print") {
      var printt = new PrintTask();
      currentIndex++;
      return;
  } else if (token === "label") {
      var labelt = new LabelTask();
      currentIndex++;
      return;
  } else if (token === "and") {
      var andt = new AndTask();
      currentIndex++;
      return;
  } else if (token === "or") {
      var ort = new OrTask();
      currentIndex++;
      return;
  } else if (token === "not") {
      var nott = new NotTask();
      currentIndex++;
      return;
  } else if ((token === "rand") || (token === "random")) {
      var randt = new RandTask();
      currentIndex++;
      return;
  } else if ((token === "randcrazy") || (token === "randomcrazy")) {
      var randct = new RandCrazyTask();
      currentIndex++;
      return;
  } else if (token === "sqrt") {
      var sqrtt = new SqrtTask();
      currentIndex++;
      return;
  } else if ((token === "power") || (token === "pow")) {
      var powt = new PowTask();
      currentIndex++;
      return;
  } else if ((token === "modulo") || (token === "mod")) {
      var modt = new ModTask();
      currentIndex++;
      return;
  } else if (token === "cos") {
      var cost = new CosTask();
      currentIndex++;
      return;
  } else if (token === "sin") {
      var sint = new SinTask();
      currentIndex++;
      return;
  } else if (token === "tan") {
      var tant = new TanTask();
      currentIndex++;
      return;
  } else if (token === "arccos") {
      var acost = new ArcCosTask();
      currentIndex++;
      return;
  } else if (token === "arcsin") {
      var asint = new ArcSinTask();
      currentIndex++;
      return;
  } else if (token === "arctan") {
      var atant = new ArcTanTask();
      currentIndex++;
      return;
  } else if (token === "ln") {
      var lnt = new LnTask();
      currentIndex++;
      return;
  } else if (token === "log") {
      var logt = new LogTask();
      currentIndex++;
      return;
  } else if (token === "exp") {
      var expt = new ExpTask();
      currentIndex++;
      return;
  }

  console.log("Invalid token: ");
  console.log(token);
  error = true;

}