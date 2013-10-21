
var SimulatedAnnealing = (function () {
	var tMax = 20;
	var fTarget = 0.8;
	var nNodes = 5;
	var dT = 2;
	var game = PuzzleGame;
	
	return {
		/*
		*	Configures the algorithm. This needs to be called before the search
		*	method. If not, default values will be used
		*/
		configure: function(maxTemp, tempDecline, target, neighbours, gameObject) {
			tMax = maxTemp;
			dT = tempDecline
			fTarget = target;
			nNodes = neighbours;
			game = gameObject;
		},
		
		/*
		*	The simulated annealing main function. It takes a start node,
		*	or generates one if it's not defined
		*/
		search: function(start) {
			// Decide for the first node
			var firstNode;
			if (start == undefined) {
				firstNode = game.generateRandom();
			} else {
				firstNode = start;
			}
			
			// Set the starting temperature
			var T = tMax;
			
			// Set the firstNode to the current node, p
			var P = firstNode;
			
			// Run through this loop as long a node doesn't reach the target
			var currentValue;
		    while (true) {
				// Calculate the value
				currentValue = game.F(P);
				
				// Check if we have a win condition
				if (currentValue >= fTarget) {
					// Success
					return P;
				}
			
				// Generate neighbouring nodes
				var nodes = game.generateNeighbours(P, nNodes, T);
				
				// Find the best neighbour
				var pMax = 0;
				var index = -1;
				var val;
				for(var n in nodes) {
					val = game.F(nodes[n]);
					if (currVal > pMax) {
						index = n;
						pMax = val;
					}
				}
				
				// Calculate q and p
				var q = (pMax - currentValue) / currentValue;
				var p = Math.min(1, Math.exp((-q)/t));
				
				// If a random numbers is bigger than p,
				// set best neighbour to be current P
				if (Math.random() > p) {
					P = nodes[index];
				} else {
					// Set a random neighbouring node as P if not
					P = nodes[Math.floor(Math.random() * nNodes)];
				}
				
				// Decrease the temperature
				T -= dt;
				
			}
			return P;
			
			
		}
	};
	
	
}(SimulatedAnnealing || {}));





