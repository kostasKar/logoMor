
LM.memoryController = (function(){

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
                LM.throwError("Undefined variable: " + name);
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
                LM.throwError("Undefined variable: " + name);
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
            var traceText = "\nVariables info: ";
            traceText += "<table class='variablesTraceTable'>"
            if ((!this.noLocalScopeExists()) && ((Object.keys(headScope()).length))){
                traceText += "<tr><th colspan='2'>Local</th></tr>";
                for (const [key, value] of Object.entries(headScope())){
                    traceText += `<tr><td>${key}</td><td>${value}</td></tr>`;
                }
            }

            if(Object.keys(globalVariables).length) {
                traceText += "<tr><th colspan='2'>Global</th></tr>";
                for (const [key, value] of Object.entries(globalVariables)) {
                    traceText += `<tr><td>${key}</td><td>${value}</td></tr>`;
                }
            }

            if(Object.keys(staticVariables).length) {
                traceText += "<tr><th colspan='2'>Static</th></tr>";
                for (const [key, value] of Object.entries(staticVariables)) {
                    traceText += `<tr><td>${key}</td><td>${value}</td></tr>`;
                }
            }
            traceText += "</table>";
            return traceText;
        }

    }

})();