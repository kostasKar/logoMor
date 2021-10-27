# LogoMor

LogoMor is a JavaScript interpreter and visualizer for the Logo programming language

[Check it online](https://logomor.com/)

[LogoMor Documentation](https://logomor.com/assets/Documentation.pdf)

## Screenshots

![123317157-58d16400-d536-11eb-87f0-98e5b21f84b0](https://user-images.githubusercontent.com/13304797/139117498-484fb769-0196-4097-83ac-e338a47b13c7.png)

![image](https://user-images.githubusercontent.com/13304797/106599557-ea2d4300-6561-11eb-87c5-66ad295d0782.png)

![123316919-1871e600-d536-11eb-8ad7-d7a3d408bb9b](https://user-images.githubusercontent.com/13304797/139117554-ea675249-ee08-41f5-84f9-247eef28f974.png)

![image](https://user-images.githubusercontent.com/13304797/106599718-22cd1c80-6562-11eb-9f80-c06113cd9779.png)

![123317495-c1b8dc00-d536-11eb-8a0d-79d4abf8427c](https://user-images.githubusercontent.com/13304797/139117586-d347d234-8f49-408b-980e-d7740bfc6a16.png)

![123317671-f2991100-d536-11eb-9fe2-e09da34d768c](https://user-images.githubusercontent.com/13304797/139117609-e73ece28-a2f9-46f4-9400-e3e59e5dcaf6.png)

![123317910-3f7ce780-d537-11eb-8c1b-aaced81ba5f7](https://user-images.githubusercontent.com/13304797/139117635-d8b02115-2a8e-498e-bc7d-30c64e40776a.png)

![123318191-9edaf780-d537-11eb-992c-a2e87195e55c](https://user-images.githubusercontent.com/13304797/139117658-9f94945b-063d-4de6-8a6d-fc6150de982e.png)

## Technologies

The interpreter is written in vanilla JavaScript  
UI in HTML5 and CSS3  
p5.js and WebGL are used for 3D rendering  
Code editor uses CodeMirror with custom mode for the Logo language

## Logo language

The interpreter accepts the basic UCBLogo commands with many additions:
- 3-Dimentional moves 
- Random number generator (per run and per frame modes available)
- Timing commands, returning current time and frame
- Static variables with not frame-limited lifetime
- Mouse and keyboard tracking commands
- 3D solids creation commands
- STL and OBJ models, images and sound files can be uploaded, manipulated programmatically and incorporated in the drawing

## Usage - Features

- The web interface provides tools for editing, running and debugging Logo code  
- The output 3D drawing is visualized on a canvas and can be manipulated with the mouse to rotate, pan or zoom. Active perspective and lighting  
- The whole Logo program is interpreted and produces a drawing for each display frame. Default frame rate is 60 fps, but this is affected by the program size. Fps indication on screen to help determining execution load. 
- Pause mode is available, that executes the code only once and produces a still image
- For each global variable of the program, a 'variable manipulator' is automatically generated. The user can enable it and use a slider to manipulate the variables initial value while watching its effect on the drawing in real time
- Using timing commands and static variables, the programmer can create any kind of animation
- Mouse tracking commands enable the creation of interactive sketches
- Solid objects can be created easily by drawing faces with the plain movement commands to indicate edges
- The user can check various pre-loaded demos by pressing the 'Demo' button  
- Complete documentation about all supported commands and Logo syntax is available by pressing the 'Help' button
- The programmer can run the program partially or step-by-step by using the 'Moves Limit' field
- If an execution error occurs, a verbose error message will be shown on the console, including error line number and a complete stack trace
- The user can capture snapshots or video of the drawing 
- The user can save the Logo code to plain text or load a file from the filesystem. Drag and drop is also supported
- The drawing can be viewed in auto-rotating mode
- The user can enable an orientation and turning assistant that is displayed on the drawing avatar to help during programming
- The editor has many IDE features as auto-completion, auto-indentation, keyword highlighting (also distinguishing plain commands from move commands), search highlighting, auto bracket closing etc
- With the 'Share' button you can create a shareable link that includes the source code in the editor 

## Contributing
I would love to receive any LogoMor sketches and include them to the Demos  
Also feel free to submit issues and enhancement requests.


## License
[GNU GPLv3](https://choosealicense.com/licenses/gpl-3.0/)
