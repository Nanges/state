/**
 * Utils
 */
if(!Array.prototype.diff)
    Array.prototype.diff = function(a){ return this.filter(b => a.indexOf(b) < 0) };