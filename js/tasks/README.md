## LogoMor interpreter tasks

The Logomor interpreter creates and handles the lifetime of 'tasks'  
Tasks are the basic structure of anything that can be executed within the Logomor environment  
Instances of the various task prototypes are created by the interpreter using the taskFactory  
and are pushed to the tasksStack where they remain until they get resolved  

All tasks must implement the following interface:

- **tryToTakeInput()**:
    This function accepts a code token as an argument. It must decide if it is in position to accept it as a task argument  
    It is the tasks responsibility to know if it accepts arguments, how many and of what kind  
    This function returns a boolean value:  
    True if it managed to successfully consume the argument. The interpreter will then consider that token consumed and move to the next one.  
    False if it did not manage to consume the argument. Either because the task didn't need one or because the specific token did not fit  

- **canBeResolved**:
    This is a boolean attribute of each task.  
    True: It means that the interpreter can go ahead and resolve the task  
    False: The task is not in position to be resolved because it needs to be fed with (more) arguments  

- **resolve()**
    This function resolves a task and returs a task return value, or "" if the specific task does not return anything  
    After resolving, the interpreter considers the task complete and pops it out of the tasksStack  
