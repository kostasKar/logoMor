
var memoryController = (function(){

    var globalVariables = {};
    var staticVariables =  {};
    var variablesScopeStack = [];

    //local variables or global if no other scope in stack
    function headScope(){
        return variablesScopeStack[variablesScopeStack.length-1];
    }

    function getVariableScope(name){
        if (name in headScope()){
            return headScope();
        } else if (name in globalVariables){
            return globalVariables;
        } else if (name in staticVariables){
            return staticVariables;
        } else {
            return null;
        }
    }

    return {

        pushScope: function(newScope){
            variablesScopeStack.push(newScope);
        },

        popScope: function (){
            variablesScopeStack.pop();
        },

        variableExists: function(name){
            return getVariableScope(name);
        },

        staticVariableExists: function(name){
          return (name in staticVariables);
        },

        //works for all local, global or statics
        setExistingVariable: function(name, value){
            if(this.variableExists(name)){
                getVariableScope(name)[name] = value;
            } else {
                throwError("Undefined variable: " + name);
            }
        },

        setNewNonStaticVariable: function(name, value){
            headScope()[name] = value;
        },

        setNewStaticVariable: function(name, value){
            staticVariables[name] = value;
        },

        getVariable: function(name){
            if(this.variableExists(name)){
                return getVariableScope(name)[name];
            } else {
                throwError("Undefined variable: " + name);
                return 0;
            }
        },

        noLocalScopeExists: function(){
            return variablesScopeStack.length === 1;
        },

        initNonStaticVariables: function(){
            globalVariables = {};
            variablesScopeStack = [];
            variablesScopeStack.push(globalVariables);
        },

        initStaticVariables: function (){
            staticVariables = {};
        },

        getMemoryTrace: function(){
            var traceText = "";
            traceText += "\nVariables info: ";
            if (!this.noLocalScopeExists()){
                traceText += "\nLocal variables:\n";
                for (const [key, value] of Object.entries(headScope())){
                    traceText += (key + " = " + value + "\n");
                }
            }
            traceText += "\nGlobal variables:\n";
            for (const [key, value] of Object.entries(globalVariables)){
                traceText += (key + " = " + value + "\n");
            }
            traceText += "\nStatic variables:\n";
            for (const [key, value] of Object.entries(staticVariables)){
                traceText += (key + " = " + value + "\n");
            }
            return traceText;
        }

    }

})();