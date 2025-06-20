## The LogoMor interpreter

The LogoMor interpreter is the main workhorse of the LogoMor programming environment.  
It is responsible for the following:  

- Parse and prepare the source code, converting it into meaningful tokens
- Initialize execution of each run and each frame within the run
- Interpret each code token
- Handle the creation and lifetime of each execution task
- Handle the program memory and the various variables scopes and lifetime
- Handle execution errors
- Handle the debugging functionality

The interpreter also consists of the taskFactory, which is aware of all available logomor commands and keywords:

Each logomor command is defined as an object with the following attributes:
- name
- taskConstructor: a pointer to a class prototype
- hint: human-friendly help text with info about the specific command (appears on the auto-complete tooltip and on hover in the code editor)
- type: that is one of the existing command types:
  - builtin: basic coding keywords, e.g. 'if', 'while', etc
  - move: a command that causes the avatar to perform any kind of movement, e.g. 'forward', etc
  - keyword: any command that performs a calculation with or without directly affecting the avatar appearance, e.g. 'sqrt', 'setpensize', etc
- retainable: a boolean value that hints the renderer about whether a specific command can exhibit different behaviour in subsequent frames of the drawing*

The retainability of a command is used by the renderer to save execution load and decide if it can maintain a drawing structure throughout lifetime of a run without having to execute the whole script for each display frame  

