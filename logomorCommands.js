
//accepted values for "type" field: {"builtin", "move", "keyword"}
const logomorCommands =
{
  "(": {
    taskConstructor: ParenthesisTask,
    hint: null,
    type: null
  },
  "make": {
    taskConstructor: VariableMakerTask,
    hint: "make \"varname :value\nCreate a variable in local or global scope ",
    type: "builtin"
  },
  "static": {
    taskConstructor: StaticVariableMakerTask,
    hint: "static \"varname :value\nCreate a variable with static lifetime ",
    type: "builtin"
  },
  "if": {
    taskConstructor: IfTask,
    hint: "if :condition [code] \nConditional execution ",
    type: "builtin"
  },
  "ifelse": {
    taskConstructor: IfElseTask,
    hint: "ifelse :condition [code if true][code if false]\nConditional execution",
    type: "builtin"
  },
  "repeat": {
    taskConstructor: RepeatTask,
    hint: "repeat :times [code]\nLoop execution ",
    type: "builtin"
  },
  "repcount": {
    taskConstructor: RepCountTask,
    hint: "Number of current execution of innermost repeat block (starts from 1). 0 if no loop is being executed ",
    type: "builtin"
  },
  "while": {
    taskConstructor: WhileTask,
    hint: "while :condition [code]\nLoop execution",
    type: "builtin"
  },
  "until": {
    taskConstructor: UntilTask,
    hint: "until :condition [code]\nLoop execution",
    type: "builtin"
  },
  "forward": {
    taskConstructor: FdTask,
    hint: "forward :steps \nMove forward",
    type: "move"
  },
  "fd": {
    taskConstructor: FdTask,
    hint: "fd :steps \nMove forward ",
    type: "move"
  },
  "back": {
    taskConstructor: BkTask,
    hint: "back :steps \nMove backwards ",
    type: "move"
  },
  "bk": {
    taskConstructor: BkTask,
    hint: "bk :steps \nMove backwards ",
    type: "move"
  },
  "right": {
    taskConstructor: RtTask,
    hint: "right :degrees\nTurn right ",
    type: "move"
  },
  "rt": {
    taskConstructor: RtTask,
    hint: "rt :degrees \nTurn right ",
    type: "move"
  },
  "left": {
    taskConstructor: LtTask,
    hint: "left :degrees\nTurn left ",
    type: "move"
  },
  "lt": {
    taskConstructor: LtTask,
    hint: "lt :degrees\nTurn left ",
    type: "move"
  },
  "up": {
    taskConstructor: UpTask,
    hint: "up :degrees \nTurn upwards (pitch) ",
    type: "move"
  },
  "down": {
    taskConstructor: DnTask,
    hint: "down :degrees\nTurn downwards (pitch) ",
    type: "move"
  },
  "dn": {
    taskConstructor: DnTask,
    hint: "dn :degrees\nTurn downwards (pitch) ",
    type: "move"
  },
  "roll_right": {
    taskConstructor: RrTask,
    hint: "roll_right :degrees ",
    type: "move"
  },
  "rr": {
    taskConstructor: RrTask,
    hint: "rr :degrees\nRoll right",
    type: "move"
  },
  "roll_left": {
    taskConstructor: RlTask,
    hint: "roll_left :degrees ",
    type: "move"
  },
  "rl": {
    taskConstructor: RlTask,
    hint: "rl :degrees \nRoll left ",
    type: "move"
  },
  "penup": {
    taskConstructor: PuTask,
    hint: "Stop leaving trail ",
    type: "keyword"
  },
  "pu": {
    taskConstructor: PuTask,
    hint: "Stop leaving trail ",
    type: "keyword"
  },
  "pendown": {
    taskConstructor: PdTask,
    hint: "Start leaving trail ",
    type: "keyword"
  },
  "pd": {
    taskConstructor: PdTask,
    hint: "Start leaving trail ",
    type: "keyword"
  },
  "showturtle": {
    taskConstructor: ShowTurtleTask,
    hint: "Show the avatar ",
    type: "keyword"
  },
  "st": {
    taskConstructor: ShowTurtleTask,
    hint: "Show the avatar ",
    type: "keyword"
  },
  "hideturtle": {
    taskConstructor: HideTurtleTask,
    hint: "Hide the avatar ",
    type: "keyword"
  },
  "ht": {
    taskConstructor: HideTurtleTask,
    hint: "Hide the avatar ",
    type: "keyword"
  },
  "setpensize": {
    taskConstructor: SpsTask,
    hint: "setpensize :pixels \nSet the width of the trail",
    type: "keyword"
  },
  "sps": {
    taskConstructor: SpsTask,
    hint: "sps :pixels \nSet the width of the trail",
    type: "keyword"
  },
  "settextsize": {
    taskConstructor: StsTask,
    hint: "settextsize :pixels \nSet the heigth of the text labels ",
    type: "keyword"
  },
  "sts": {
    taskConstructor: StsTask,
    hint: "sts :pixels \nSet the heigth of the text labels ",
    type: "keyword"
  },
  "color": {
    taskConstructor: ColorTask,
    hint: "color :r :g :b (0-255)\nSet the drawing color in RGB space ",
    type: "keyword"
  },
  "colorhsb": {
    taskConstructor: ColorHSBTask,
    hint: "colorhsb :h(0-360) :s(0-100) :b(0-100)\nSet the drawing color in HSB space  ",
    type: "keyword"
  },
  "coloralpha": {
    taskConstructor: ColorAlphaTask,
    hint: "coloralpha :alpha(0-255)\nSet the opacity of the drawing ",
    type: "keyword"
  },
  "home": {
    taskConstructor: HomeTask,
    hint: "Move to initial position",
    type: "move"
  },
  "getx": {
    taskConstructor: GetXTask,
    hint: "Returns the x coordinate of the avatar ",
    type: "keyword"
  },
  "gety": {
    taskConstructor: GetYTask,
    hint: "Returns the y coordinate of the avatar  ",
    type: "keyword"
  },
  "getz": {
    taskConstructor: GetZTask,
    hint: "Returns the z coordinate of the avatar  ",
    type: "keyword"
  },
  "setx": {
    taskConstructor: SetXTask,
    hint: "setx :x \nMove to a specific x coordinate ",
    type: "move"
  },
  "sety": {
    taskConstructor: SetYTask,
    hint: "setx :y \nMove to a specific y coordinate ",
    type: "move"
  },
  "setz": {
    taskConstructor: SetZTask,
    hint: "setx :z \nMove to a specific z coordinate ",
    type: "move"
  },
  "setxyz": {
    taskConstructor: SetXYZTask,
    hint: "setxyz :x :y :z \nMove to a specific point in space",
    type: "move"
  },
  "print": {
    taskConstructor: PrintTask,
    hint: "print :val\nPrints a value to the console ",
    type: "keyword"
  },
  "label": {
    taskConstructor: LabelTask,
    hint: "label :val\nDraws text on the drawing  ",
    type: "keyword"
  },
  "and": {
    taskConstructor: AndTask,
    hint: "and :a :b \nLogical AND operator ",
    type: "keyword"
  },
  "or": {
    taskConstructor: OrTask,
    hint: "or :a :b \nLogical OR operator  ",
    type: "keyword"
  },
  "not": {
    taskConstructor: NotTask,
    hint: "not :a\nLogical inversion ",
    type: "keyword"
  },
  "rand": {
    taskConstructor: RandTask,
    hint: "rand :maxvalue\nReturns a random number in range [0-maxvalue). Same number series for each execution frame",
    type: "keyword"
  },
  "random": {
    taskConstructor: RandTask,
    hint: "random :maxvalue\nReturns a random number in range [0-maxvalue). Same number series for each execution frame",
    type: "keyword"
  },
  "randcrazy": {
    taskConstructor: RandCrazyTask,
    hint: "randcrazy :maxvalue\nReturns a random number in range [0-maxvalue), different for each frame  ",
    type: "keyword"
  },
  "randomcrazy": {
    taskConstructor: RandCrazyTask,
    hint: "randomcrazy :maxvalue\nReturns a random number in range [0-maxvalue), different for each frame   ",
    type: "keyword"
  },
  "sqrt": {
    taskConstructor: SqrtTask,
    hint: "sqrt :value \nSquare root ",
    type: "keyword"
  },
  "power": {
    taskConstructor: PowTask,
    hint: "power :base :exponent\nRaise to power ",
    type: "keyword"
  },
  "pow": {
    taskConstructor: PowTask,
    hint: "pow :base :exponent\nRaise to power ",
    type: "keyword"
  },
  "modulo": {
    taskConstructor: ModTask,
    hint: "modulo :D :d\nRemainder of D/d division",
    type: "keyword"
  },
  "mod": {
    taskConstructor: ModTask,
    hint: "mod :D :d\nRemainder of D/d division ",
    type: "keyword"
  },
  "cos": {
    taskConstructor: CosTask,
    hint: "cos :degrees\nCosine ",
    type: "keyword"
  },
  "sin": {
    taskConstructor: SinTask,
    hint: "sin :degrees\nSine  ",
    type: "keyword"
  },
  "tan": {
    taskConstructor: TanTask,
    hint: "tan :degrees\nTangent   ",
    type: "keyword"
  },
  "arccos": {
    taskConstructor: ArcCosTask,
    hint: "arccos :val\nInverse cosine, Returns degrees",
    type: "keyword"
  },
  "arcsin": {
    taskConstructor: ArcSinTask,
    hint: "arcsin :val\nInverse sine, Returns degrees    ",
    type: "keyword"
  },
  "arctan": {
    taskConstructor: ArcTanTask,
    hint: "arctan :val\nInverse tangent, Returns degrees ",
    type: "keyword"
  },
  "ln": {
    taskConstructor: LnTask,
    hint: "ln :val\nNatural logarithm ",
    type: "keyword"
  },
  "log": {
    taskConstructor: LogTask,
    hint: "log :val\nBase 10 logarithm ",
    type: "keyword"
  },
  "exp": {
    taskConstructor: ExpTask,
    hint: "exp :n\nReturns the constant e raised to n ",
    type: "keyword"
  },
  "pi": {
    taskConstructor: PiTask,
    hint: "The pi constant ",
    type: "keyword"
  },
  "time": {
    taskConstructor: TimeTask,
    hint: "The current execution time in seconds, since Run was pressed ",
    type: "keyword"
  },
  "frame": {
    taskConstructor: FrameTask,
    hint: "The current number of frames drawn since Run was pressed ",
    type: "keyword"
  },
  "int": {
    taskConstructor: RoundTask,
    hint: "int :val\nConvert to nearest int ",
    type: "keyword"
  },
  "round": {
    taskConstructor: RoundTask,
    hint: "round :val\nConvert to nearest int  ",
    type: "keyword"
  },
  "trunc": {
    taskConstructor: TruncTask,
    hint: "trunc :val\nTruncate integer part",
    type: "keyword"
  },
  "abs": {
    taskConstructor: AbsTask,
    hint: "abs :val\nAbsolute value ",
    type: "keyword"
  },
  "min": {
    taskConstructor: MinTask,
    hint: "min :a :b\nSelects the min of two values ",
    type: "keyword"
  },
  "max": {
    taskConstructor: MaxTask,
    hint: "max :a :b\nSelects the max of two values  ",
    type: "keyword"
  },
  "radtodeg": {
    taskConstructor: RadToDegTask,
    hint: "radtodeg :rads\nConvert rads to degrees ",
    type: "keyword"
  },
  "degtorad": {
    taskConstructor: DegToRadTask,
    hint: "degtorad :degs\nConvert degrees to rads ",
    type: "keyword"
  },
  "beginface": {
    taskConstructor: BeginShapeTask,
    hint: "Starts drawing a face edge ",
    type: "keyword"
  },
  "endface": {
    taskConstructor: EndShapeTask,
    hint: "Complete the drawing of a solid object face ",
    type: "keyword"
  },
  "mousex": {
    taskConstructor: MouseXTask,
    hint: "The X coordinate of the mouse position  ",
    type: "keyword"
  },
  "mousey": {
    taskConstructor: MouseYTask,
    hint: "The Y coordinate of the mouse position   ",
    type: "keyword"
  },
  "mousepressed": {
    taskConstructor: MousePressedTask,
    hint: "Returns the mouse button state. 0: not pressed, 1: left button, 2: right button, 3: middle button ",
    type: "keyword"
  },
  "thing": {
    taskConstructor: ThingTask,
    hint: "thing \"varname\nThe value of a variable ",
    type: "keyword"
  },
  "valueof": {
    taskConstructor: ThingTask,
    hint: "valueof \"varname\nThe value of a variable  ",
    type: "keyword"
  },
  "increment": {
    taskConstructor: IncrementTask,
    hint: "increment \"varname\nIncrements a variable by 1 ",
    type: "keyword"
  },
  "decrement": {
    taskConstructor: DecrementTask,
    hint: "decrement \"varname\nDecrements a variable by 1 ",
    type: "keyword"
  },
  "point": {
    taskConstructor: PointTask,
    hint: "Draws a point at the current avatar position ",
    type: "keyword"
  },
  "dist": {
    taskConstructor: DistTask,
    hint: "dist :x :y :z \nReturns the distance between the avatar and a specified point in space ",
    type: "keyword"
  },
  "word": {
    taskConstructor: WordTask,
    hint: "word \"a \"b\nConcatenates two values as a literal",
    type: "keyword"
  },
  "arc": {
    taskConstructor: ArcTask,
    hint: "arc :angle :radius\nDraws an arc with center the avatar position. The angle of the arc starts at the y axis of the avatar and is drawn clockwise. Avatar does not move ",
    type: "keyword"
  },
  "box": {
    taskConstructor: BoxTask,
    hint: "box :sidelength\nDraws a solid box ",
    type: "keyword"
  },
  "sphere": {
    taskConstructor: SphereTask,
    hint: "sphere :radius \nDraws a solid sphere",
    type: "keyword"
  },
  "cylinder": {
    taskConstructor: CylinderTask,
    hint: "cylinder :radius :height\nDraws a solid cylinder ",
    type: "keyword"
  },
  "cone": {
    taskConstructor: ConeTask,
    hint: "cone :baseradius :height\nDraws a solid cone ",
    type: "keyword"
  },
  "torus": {
    taskConstructor: TorusTask,
    hint: "torus :radius :tubeRadius\nDraws a solid torus ",
    type: "keyword"
  },
  "ellipsoid": {
    taskConstructor: EllipsoidTask,
    hint: "ellipsoid :radiusX :radiusY :radiusZ\nDraws a solid ellipsoid ",
    type: "keyword"
  },
  "model": {
    taskConstructor: ModelTask,
    hint: "model \"name :size\nDraws an imported 3D object object, sized to fit inside a cube of side length :size",
    type: "keyword"
  },
  "image": {
    taskConstructor: ImageTask,
    hint: "image \"name :height\nDraws an imported image ",
    type: "keyword"
  },
  "sound_play": {
    taskConstructor: PlaySoundTask,
    hint: "sound_play \"name\nStarts/Resumes a sound clip",
    type: "keyword"
  },
  "sound_stop": {
    taskConstructor: StopSoundTask,
    hint: "sound_stop \"name\nStops a sound clip ",
    type: "keyword"
  },
  "sound_pause": {
    taskConstructor: PauseSoundTask,
    hint: "sound_pause \"name\nPauses a sound clip ",
    type: "keyword"
  },
  "sound_isplaying": {
    taskConstructor: IsPLayingSoundTask,
    hint: "sound_isplaying \"name\nReturns 1 if sound clip is currently playing",
    type: "keyword"
  },
  "sound_settime": {
    taskConstructor: SetTimeSoundTask,
    hint: "sound_settime \"name :sec\nSets the current playing time to a specified second ",
    type: "keyword"
  },
  "sound_setvolume": {
    taskConstructor: SetVolumeSoundTask,
    hint: "sound_setvolume \"name :vol(0-100)\nSets the volume level of sound clip ",
    type: "keyword"
  },
  "sound_gettime": {
    taskConstructor: GetTimeSoundTask,
    hint: "sound_gettime \"name\nGets the current playing second of sound clip ",
    type: "keyword"
  },
  "sound_getvolume": {
    taskConstructor: GetVolumeSoundTask,
    hint: "sound_getvolume \"name\nGets the volume setting (0-100) of sound clip ",
    type: "keyword"
  },
  "keypressed": {
    taskConstructor: KeyPressedTask,
    hint: "Returns the keycode of currently keyboard key pressed or 0 if none ",
    type: "keyword"
  },
  "equals": {
    taskConstructor: EqualsTask,
    hint: "equals :a :b\nCompares values of numbers or literals or both",
    type: "keyword"
  },
  "randseed": {
    taskConstructor: RandSeedTask,
    hint: "randseed :s\nSeed the random generator with a value",
    type: "keyword"
  },
  "to": {
    taskConstructor: null,
    hint: "function definition ",
    type: "builtin"
  },
  "end": {
    taskConstructor: null,
    hint: "end of function ",
    type: "builtin"
  },
  "return": {
    taskConstructor: null,
    hint: "return :val\nReturns a value from a function or stops main program execution (if used outside of a function and without any argument)",
    type: "builtin"
  },
  "break": {
    taskConstructor: null,
    hint: "Stops the execution of a loop",
    type: "builtin"
  }
}

//Shortcuts:
const logomorMoves = Object.keys(logomorCommands).filter(name => logomorCommands[name].type === "move");
const logomorBuiltins = Object.keys(logomorCommands).filter(name => logomorCommands[name].type === "builtin");
const logomorKeywords = Object.keys(logomorCommands).filter(name => logomorCommands[name].type === "keyword");
const hintableCommands = Object.keys(logomorCommands).filter(name => logomorCommands[name].hint != null);