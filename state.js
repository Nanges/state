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
        this._currentState = null;
        this._states = {};
    }

    register(name, commands){
        if(this._states.hasOwnProperty(name)) return;
        this._states[name] = commands;
    }

    setState(newState){
        if(this._currentState === newState || !this._states.hasOwnProperty(newState)) return;

        let osCommands = this._states[this._currentState] || [];
        let nsCommands = this._states[newState];

        this.dispatch(osCommands, nsCommands);
        this._currentState = newState;
    }

    dispatch(osCommands, nsCommands){
        
        //undo old state commands
        osCommands
        .diff(nsCommands)
        .forEach(c => c.undo());

        //redo new state commands
        nsCommands
        .diff(osCommands)
        .forEach(c => c.redo());

    }
}

var c1 = new Command(
    () => console.log('Open light'),
    () => console.log('Close light')
);

var c2 = new Command(
    () => console.log('Open door'),
    () => console.log('Close door')
);

var c3 = new Command(
    () => console.log('Open window'),
    () => console.log('Close window')
);

var sm = new StateManager();

sm.register("STATE 1", [c1,c2]);
sm.register("STATE 2", [c3,c2]);
sm.register("STATE 3", [c1,c3, c2]);
sm.register("STATE 4", []);

console.log("=== STATE 1 ===");
sm.setState("STATE 1");
console.log("=== STATE 3 ===");
sm.setState("STATE 3");
console.log("=== STATE 2 ===");
sm.setState("STATE 2");
console.log("=== STATE 4 ===");
sm.setState("STATE 4");