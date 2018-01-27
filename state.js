/**
 * Utils
 */
if(!Array.prototype.diff)
    Array.prototype.diff = function(a){ return this.filter(b => a.indexOf(b) < 0) };


class Command
{
    constructor(redo, undo){
        this.redo = redo;
        this.undo = undo;
    }
}

class StateManager
{
    constructor(){
        this._states = {};
    }

    register(){

    }
}