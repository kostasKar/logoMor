# LogoMor

LogoMor is a javascript interpreter and visualizer for the Logo programming language

[Test it online](https://logomor.com/)

## Technologies

The whole interpreter is written in vanilla JavaScript  
P5.js and WebGl is used for 3D rendering  
Code editor uses CodeMirror with custom mode for the Logo language

## Logo language

The interpreter accepts the basic UCBLogo commands with many additions:
* 3-Dimentional moves
* Random generators (per run and per frame modes available)
* Timing commands, returning current time and frame
* Static variables with not frame-limited lifetime
* Mouse movements tracking commands
* Face creation commands for making surfaces as solid objects faces

## Usage - Features

- The web interface provides tools for editing, running and debugging Logo code  
- The output 3D drawing is visualized on a canvas and can be manipulated with the mouse  
- The whole Logo program is interpreted and produces a drawing for each frame.  
- Optionally, the interpreter can be run in a single-frame mode to produce a still image  
- For each global variable of the program, a 'variable manipulator' is automatically generated. The user can enable it and use a slider to manipulate the variables initial value while seeing its effect on the drawing in real time
- Using timing commands and static variables, the programmer can also create any kind of animation
- Mouse tracking commands enable the creation of interactive sketches  
- The user can check various pre-loaded demos by pressing the 'Demo' button  
- Complete documentation about all supported commands and Logo syntax is available by pressing the Help button
- The programmer can run the program partially or step-by-step by using the 'Moves Limit' field
- If an execution error occurs, a verbose error message will be shown on the console, including error line number and a complete stack trace
- The user can capture snapshots or video of the drawing 
- The user can save the Logo code to plain text or load a file from the filesystem. Drag and drop is also supported
- The drawing can be viewed in auto-rotating mode
- The user can enable an orientation and turning assistant that is displayed on the drawing avatar to help during programming
- The editor has many IDE features as keyword highlighting (also distinguishing plain commands from move commands), search highlighting, auto bracket closing etc

## License
[GNU GPLv3](https://choosealicense.com/licenses/gpl-3.0/)
