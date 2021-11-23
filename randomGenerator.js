var logoRandomGenerator = (function(){

  var seed;
  var seedableRNG; 

  return{

  	initForNewRun: function(){
  		seed = Math.random().toString(36).substring(7);
  	},

  	initForNewFrame: function(){
  		seedableRNG = new Math.seedrandom(seed);
  	},

  	getSeed: function(){
  		return seed;
  	},

  	setSeed: function(newSeed){
  		seed = newSeed;
  		seedableRNG = new Math.seedrandom(seed);
  	},

  	getConsistentOutput: function(){
  		return seedableRNG();
  	},

  	getInconsistentOutput: function(){
  		return Math.random();
  	}
  }

})();