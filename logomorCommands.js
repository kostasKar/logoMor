
//accepted values for "type" field: {"builtin", "move", "keyword"}
LM.commands =
{
  "(": {
    taskConstructor: ParenthesisTask,
    hint: null,
    type: null,
    retainable: true
  },
  "make": {
    taskConstructor: VariableMakerTask,
    hint: "make \"varname :value\nCreate a variable in local or global scope ",
    type: "builtin",
    retainable: true
  },
  "static": {
    taskConstructor: StaticVariableMakerTask,
    hint: "static \"varname :value\nCreate a variable with static lifetime ",
    type: "builtin",
    retainable: false
  },
  "if": {
    taskConstructor: IfTask,
    hint: "if :condition [code] \nConditional execution ",
    type: "builtin",
    retainable: true
  },
  "ifelse": {
    taskConstructor: IfElseTask,
    hint: "ifelse :condition [code if true][code if false]\nConditional execution",
    type: "builtin",
    retainable: true
  },
  "repeat": {
    taskConstructor: RepeatTask,
    hint: "repeat :times [code]\nLoop execution ",
    type: "builtin",
    retainable: true
  },
  "repcount": {
    taskConstructor: RepCountTask,
    hint: "Number of current execution of innermost repeat block (starts from 1). 0 if no loop is being executed ",
    type: "builtin",
    retainable: true
  },
  "while": {
    taskConstructor: WhileTask,
    hint: "while :condition [code]\nLoop execution",
    type: "builtin",
    retainable: true
  },
  "until": {
    taskConstructor: UntilTask,
    hint: "until :condition [code]\nLoop execution",
    type: "builtin",
    retainable: true
  },
  "forward": {
    taskConstructor: FdTask,
    hint: "forward :steps \nMove forward",
    type: "move",
    retainable: true
  },
  "fd": {
    taskConstructor: FdTask,
    hint: "fd :steps \nMove forward ",
    type: "move",
    retainable: true
  },
  "back": {
    taskConstructor: BkTask,
    hint: "back :steps \nMove backwards ",
    type: "move",
    retainable: true
  },
  "bk": {
    taskConstructor: BkTask,
    hint: "bk :steps \nMove backwards ",
    type: "move",
    retainable: true
  },
  "right": {
    taskConstructor: RtTask,
    hint: "right :degrees\nTurn right ",
    type: "move",
    retainable: true
  },
  "rt": {
    taskConstructor: RtTask,
    hint: "rt :degrees \nTurn right ",
    type: "move",
    retainable: true
  },
  "left": {
    taskConstructor: LtTask,
    hint: "left :degrees\nTurn left ",
    type: "move",
    retainable: true
  },
  "lt": {
    taskConstructor: LtTask,
    hint: "lt :degrees\nTurn left ",
    type: "move",
    retainable: true
  },
  "up": {
    taskConstructor: UpTask,
    hint: "up :degrees \nTurn upwards (pitch) ",
    type: "move",
    retainable: true
  },
  "down": {
    taskConstructor: DnTask,
    hint: "down :degrees\nTurn downwards (pitch) ",
    type: "move",
    retainable: true
  },
  "dn": {
    taskConstructor: DnTask,
    hint: "dn :degrees\nTurn downwards (pitch) ",
    type: "move",
    retainable: true
  },
  "roll_right": {
    taskConstructor: RrTask,
    hint: "roll_right :degrees ",
    type: "move",
    retainable: true
  },
  "rr": {
    taskConstructor: RrTask,
    hint: "rr :degrees\nRoll right",
    type: "move",
    retainable: true
  },
  "roll_left": {
    taskConstructor: RlTask,
    hint: "roll_left :degrees ",
    type: "move",
    retainable: true
  },
  "rl": {
    taskConstructor: RlTask,
    hint: "rl :degrees \nRoll left ",
    type: "move",
    retainable: true
  },
  "penup": {
    taskConstructor: PuTask,
    hint: "Stop leaving trail ",
    type: "keyword",
    retainable: true
  },
  "pu": {
    taskConstructor: PuTask,
    hint: "Stop leaving trail ",
    type: "keyword",
    retainable: true
  },
  "pendown": {
    taskConstructor: PdTask,
    hint: "Start leaving trail ",
    type: "keyword",
    retainable: true
  },
  "pd": {
    taskConstructor: PdTask,
    hint: "Start leaving trail ",
    type: "keyword",
    retainable: true
  },
  "showturtle": {
    taskConstructor: ShowTurtleTask,
    hint: "Show the avatar ",
    type: "keyword",
    retainable: true
  },
  "st": {
    taskConstructor: ShowTurtleTask,
    hint: "Show the avatar ",
    type: "keyword",
    retainable: true
  },
  "hideturtle": {
    taskConstructor: HideTurtleTask,
    hint: "Hide the avatar ",
    type: "keyword",
    retainable: true
  },
  "ht": {
    taskConstructor: HideTurtleTask,
    hint: "Hide the avatar ",
    type: "keyword",
    retainable: true
  },
  "setpensize": {
    taskConstructor: SpsTask,
    hint: "setpensize :pixels \nSet the width of the trail",
    type: "keyword",
    retainable: true
  },
  "sps": {
    taskConstructor: SpsTask,
    hint: "sps :pixels \nSet the width of the trail",
    type: "keyword",
    retainable: true
  },
  "settextsize": {
    taskConstructor: StsTask,
    hint: "settextsize :pixels \nSet the heigth of the text labels ",
    type: "keyword",
    retainable: true
  },
  "sts": {
    taskConstructor: StsTask,
    hint: "sts :pixels \nSet the heigth of the text labels ",
    type: "keyword",
    retainable: true
  },
  "color": {
    taskConstructor: ColorTask,
    hint: "color :r :g :b (0-255)\nSet the drawing color in RGB space ",
    type: "keyword",
    retainable: true
  },
  "colorhsb": {
    taskConstructor: ColorHSBTask,
    hint: "colorhsb :h(0-360) :s(0-100) :b(0-100)\nSet the drawing color in HSB space  ",
    type: "keyword",
    retainable: true
  },
  "coloralpha": {
    taskConstructor: ColorAlphaTask,
    hint: "coloralpha :alpha(0-255)\nSet the opacity of the drawing ",
    type: "keyword",
    retainable: true
  },
  "home": {
    taskConstructor: HomeTask,
    hint: "Move to initial position",
    type: "move",
    retainable: true
  },
  "getx": {
    taskConstructor: GetXTask,
    hint: "Returns the x coordinate of the avatar ",
    type: "keyword",
    retainable: true
  },
  "gety": {
    taskConstructor: GetYTask,
    hint: "Returns the y coordinate of the avatar  ",
    type: "keyword",
    retainable: true
  },
  "getz": {
    taskConstructor: GetZTask,
    hint: "Returns the z coordinate of the avatar  ",
    type: "keyword",
    retainable: true
  },
  "setx": {
    taskConstructor: SetXTask,
    hint: "setx :x \nMove to a specific x coordinate ",
    type: "move",
    retainable: true
  },
  "sety": {
    taskConstructor: SetYTask,
    hint: "setx :y \nMove to a specific y coordinate ",
    type: "move",
    retainable: true
  },
  "setz": {
    taskConstructor: SetZTask,
    hint: "setx :z \nMove to a specific z coordinate ",
    type: "move",
    retainable: true
  },
  "setxyz": {
    taskConstructor: SetXYZTask,
    hint: "setxyz :x :y :z \nMove to a specific point in space",
    type: "move",
    retainable: true
  },
  "print": {
    taskConstructor: PrintTask,
    hint: "print :val\nPrints a value to the console ",
    type: "keyword",
    retainable: true
  },
  "label": {
    taskConstructor: LabelTask,
    hint: "label :val\nDraws text on the drawing  ",
    type: "keyword",
    retainable: false
  },
  "and": {
    taskConstructor: AndTask,
    hint: "and :a :b \nLogical AND operator ",
    type: "keyword",
    retainable: true
  },
  "or": {
    taskConstructor: OrTask,
    hint: "or :a :b \nLogical OR operator  ",
    type: "keyword",
    retainable: true
  },
  "not": {
    taskConstructor: NotTask,
    hint: "not :a\nLogical inversion ",
    type: "keyword",
    retainable: true
  },
  "rand": {
    taskConstructor: RandTask,
    hint: "rand :maxvalue\nReturns a random number in range [0-maxvalue). Same number series for each execution frame",
    type: "keyword",
    retainable: true
  },
  "random": {
    taskConstructor: RandTask,
    hint: "random :maxvalue\nReturns a random number in range [0-maxvalue). Same number series for each execution frame",
    type: "keyword",
    retainable: true
  },
  "randcrazy": {
    taskConstructor: RandCrazyTask,
    hint: "randcrazy :maxvalue\nReturns a random number in range [0-maxvalue), different for each frame  ",
    type: "keyword",
    retainable: false
  },
  "randomcrazy": {
    taskConstructor: RandCrazyTask,
    hint: "randomcrazy :maxvalue\nReturns a random number in range [0-maxvalue), different for each frame   ",
    type: "keyword",
    retainable: false
  },
  "sqrt": {
    taskConstructor: SqrtTask,
    hint: "sqrt :value \nSquare root ",
    type: "keyword",
    retainable: true
  },
  "power": {
    taskConstructor: PowTask,
    hint: "power :base :exponent\nRaise to power ",
    type: "keyword",
    retainable: true
  },
  "pow": {
    taskConstructor: PowTask,
    hint: "pow :base :exponent\nRaise to power ",
    type: "keyword",
    retainable: true
  },
  "modulo": {
    taskConstructor: ModTask,
    hint: "modulo :D :d\nRemainder of D/d division",
    type: "keyword",
    retainable: true
  },
  "mod": {
    taskConstructor: ModTask,
    hint: "mod :D :d\nRemainder of D/d division ",
    type: "keyword",
    retainable: true
  },
  "cos": {
    taskConstructor: CosTask,
    hint: "cos :degrees\nCosine ",
    type: "keyword",
    retainable: true
  },
  "sin": {
    taskConstructor: SinTask,
    hint: "sin :degrees\nSine  ",
    type: "keyword",
    retainable: true
  },
  "tan": {
    taskConstructor: TanTask,
    hint: "tan :degrees\nTangent   ",
    type: "keyword",
    retainable: true
  },
  "arccos": {
    taskConstructor: ArcCosTask,
    hint: "arccos :val\nInverse cosine, Returns degrees",
    type: "keyword",
    retainable: true
  },
  "arcsin": {
    taskConstructor: ArcSinTask,
    hint: "arcsin :val\nInverse sine, Returns degrees    ",
    type: "keyword",
    retainable: true
  },
  "arctan": {
    taskConstructor: ArcTanTask,
    hint: "arctan :val\nInverse tangent, Returns degrees ",
    type: "keyword",
    retainable: true
  },
  "ln": {
    taskConstructor: LnTask,
    hint: "ln :val\nNatural logarithm ",
    type: "keyword",
    retainable: true
  },
  "log": {
    taskConstructor: LogTask,
    hint: "log :val\nBase 10 logarithm ",
    type: "keyword",
    retainable: true
  },
  "exp": {
    taskConstructor: ExpTask,
    hint: "exp :n\nReturns the constant e raised to n ",
    type: "keyword",
    retainable: true
  },
  "pi": {
    taskConstructor: PiTask,
    hint: "The pi constant ",
    type: "keyword",
    retainable: true
  },
  "time": {
    taskConstructor: TimeTask,
    hint: "The current execution time in seconds, since Run was pressed ",
    type: "keyword",
    retainable: false
  },
  "frame": {
    taskConstructor: FrameTask,
    hint: "The current number of frames drawn since Run was pressed ",
    type: "keyword",
    retainable: false
  },
  "int": {
    taskConstructor: RoundTask,
    hint: "int :val\nConvert to nearest int ",
    type: "keyword",
    retainable: true
  },
  "round": {
    taskConstructor: RoundTask,
    hint: "round :val\nConvert to nearest int  ",
    type: "keyword",
    retainable: true
  },
  "trunc": {
    taskConstructor: TruncTask,
    hint: "trunc :val\nTruncate integer part",
    type: "keyword",
    retainable: true
  },
  "abs": {
    taskConstructor: AbsTask,
    hint: "abs :val\nAbsolute value ",
    type: "keyword",
    retainable: true
  },
  "min": {
    taskConstructor: MinTask,
    hint: "min :a :b\nSelects the min of two values ",
    type: "keyword",
    retainable: true
  },
  "max": {
    taskConstructor: MaxTask,
    hint: "max :a :b\nSelects the max of two values  ",
    type: "keyword",
    retainable: true
  },
  "radtodeg": {
    taskConstructor: RadToDegTask,
    hint: "radtodeg :rads\nConvert rads to degrees ",
    type: "keyword",
    retainable: true
  },
  "degtorad": {
    taskConstructor: DegToRadTask,
    hint: "degtorad :degs\nConvert degrees to rads ",
    type: "keyword",
    retainable: true
  },
  "beginface": {
    taskConstructor: BeginShapeTask,
    hint: "Starts drawing a face edge ",
    type: "keyword",
    retainable: true
  },
  "endface": {
    taskConstructor: EndShapeTask,
    hint: "Complete the drawing of a solid object face ",
    type: "keyword",
    retainable: true
  },
  "mousex": {
    taskConstructor: MouseXTask,
    hint: "The X coordinate of the mouse position  ",
    type: "keyword",
    retainable: false
  },
  "mousey": {
    taskConstructor: MouseYTask,
    hint: "The Y coordinate of the mouse position   ",
    type: "keyword",
    retainable: false
  },
  "mousepressed": {
    taskConstructor: MousePressedTask,
    hint: "Returns the mouse button state. 0: not pressed, 1: left button, 2: right button, 3: middle button ",
    type: "keyword",
    retainable: false
  },
  "thing": {
    taskConstructor: ThingTask,
    hint: "thing \"varname\nThe value of a variable ",
    type: "keyword",
    retainable: true
  },
  "valueof": {
    taskConstructor: ThingTask,
    hint: "valueof \"varname\nThe value of a variable  ",
    type: "keyword",
    retainable: true
  },
  "increment": {
    taskConstructor: IncrementTask,
    hint: "increment \"varname\nIncrements a variable by 1 ",
    type: "keyword",
    retainable: true
  },
  "decrement": {
    taskConstructor: DecrementTask,
    hint: "decrement \"varname\nDecrements a variable by 1 ",
    type: "keyword",
    retainable: true
  },
  "point": {
    taskConstructor: PointTask,
    hint: "Draws a point at the current avatar position ",
    type: "keyword",
    retainable: true
  },
  "dist": {
    taskConstructor: DistTask,
    hint: "dist :x :y :z \nReturns the distance between the avatar and a specified point in space ",
    type: "keyword",
    retainable: true
  },
  "word": {
    taskConstructor: WordTask,
    hint: "word \"a \"b\nConcatenates two values as a literal",
    type: "keyword",
    retainable: true
  },
  "arc": {
    taskConstructor: ArcTask,
    hint: "arc :angle :radius\nDraws an arc with center the avatar position. The angle of the arc starts at the y axis of the avatar and is drawn clockwise. Avatar does not move ",
    type: "keyword",
    retainable: false
  },
  "box": {
    taskConstructor: BoxTask,
    hint: "box :sidelength\nDraws a solid box ",
    type: "keyword",
    retainable: false
  },
  "sphere": {
    taskConstructor: SphereTask,
    hint: "sphere :radius \nDraws a solid sphere",
    type: "keyword",
    retainable: false
  },
  "cylinder": {
    taskConstructor: CylinderTask,
    hint: "cylinder :radius :height\nDraws a solid cylinder ",
    type: "keyword",
    retainable: false
  },
  "cone": {
    taskConstructor: ConeTask,
    hint: "cone :baseradius :height\nDraws a solid cone ",
    type: "keyword",
    retainable: false
  },
  "torus": {
    taskConstructor: TorusTask,
    hint: "torus :radius :tubeRadius\nDraws a solid torus ",
    type: "keyword",
    retainable: false
  },
  "ellipsoid": {
    taskConstructor: EllipsoidTask,
    hint: "ellipsoid :radiusX :radiusY :radiusZ\nDraws a solid ellipsoid ",
    type: "keyword",
    retainable: false
  },
  "model": {
    taskConstructor: ModelTask,
    hint: "model \"name :size\nDraws an imported 3D object object, sized to fit inside a cube of side length :size",
    type: "keyword",
    retainable: false
  },
  "image": {
    taskConstructor: ImageTask,
    hint: "image \"name :height\nDraws an imported image ",
    type: "keyword",
    retainable: false
  },
  "sound_play": {
    taskConstructor: PlaySoundTask,
    hint: "sound_play \"name\nStarts/Resumes a sound clip",
    type: "keyword",
    retainable: false
  },
  "sound_stop": {
    taskConstructor: StopSoundTask,
    hint: "sound_stop \"name\nStops a sound clip ",
    type: "keyword",
    retainable: false
  },
  "sound_pause": {
    taskConstructor: PauseSoundTask,
    hint: "sound_pause \"name\nPauses a sound clip ",
    type: "keyword",
    retainable: false
  },
  "sound_isplaying": {
    taskConstructor: IsPLayingSoundTask,
    hint: "sound_isplaying \"name\nReturns 1 if sound clip is currently playing",
    type: "keyword",
    retainable: false
  },
  "sound_settime": {
    taskConstructor: SetTimeSoundTask,
    hint: "sound_settime \"name :sec\nSets the current playing time to a specified second ",
    type: "keyword",
    retainable: false
  },
  "sound_setvolume": {
    taskConstructor: SetVolumeSoundTask,
    hint: "sound_setvolume \"name :vol(0-100)\nSets the volume level of sound clip ",
    type: "keyword",
    retainable: false
  },
  "sound_gettime": {
    taskConstructor: GetTimeSoundTask,
    hint: "sound_gettime \"name\nGets the current playing second of sound clip ",
    type: "keyword",
    retainable: false
  },
  "sound_getvolume": {
    taskConstructor: GetVolumeSoundTask,
    hint: "sound_getvolume \"name\nGets the volume setting (0-100) of sound clip ",
    type: "keyword",
    retainable: false
  },
  "keypressed": {
    taskConstructor: KeyPressedTask,
    hint: "Returns the keycode of currently keyboard key pressed or 0 if none ",
    type: "keyword",
    retainable: false
  },
  "equals": {
    taskConstructor: EqualsTask,
    hint: "equals :a :b\nCompares values of numbers or literals or both",
    type: "keyword",
    retainable: true
  },
  "randseed": {
    taskConstructor: RandSeedTask,
    hint: "randseed :s\nSeed the random generator with a value",
    type: "keyword",
    retainable: true
  },
  "to": {
    taskConstructor: null,
    hint: "function definition ",
    type: "builtin",
    retainable: true
  },
  "end": {
    taskConstructor: null,
    hint: "end of function ",
    type: "builtin",
    retainable: true
  },
  "return": {
    taskConstructor: null,
    hint: "return :val\nReturns a value from a function or stops main program execution (if used outside of a function and without any argument)",
    type: "builtin",
    retainable: true
  },
  "break": {
    taskConstructor: null,
    hint: "Stops the execution of a loop",
    type: "builtin",
    retainable: true
  },
  "exists": {
    taskConstructor: ExistsTask,
    hint: "exists \"name\nChecks for existence. Returns:\n0:not exist, 1:variable, 2:model, 3:image, 4:sound",
    type: "keyword",
    retainable: true
  }

}

//Shortcuts:
LM.commandsMoves = Object.keys(LM.commands).filter(name => LM.commands[name].type === "move");
LM.commandsBuiltins = Object.keys(LM.commands).filter(name => LM.commands[name].type === "builtin");
LM.commandsKeywords = Object.keys(LM.commands).filter(name => LM.commands[name].type === "keyword");
LM.commandsHintables = Object.keys(LM.commands).filter(name => LM.commands[name].hint != null);