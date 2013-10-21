var PuzzleGame = (function() {
	var N;
	var M;
	var K;
	
	var maxScore;
	var defaultTemp = 0.1;
	
	var genIndexes = function(tamperAmount) {
		var arr = new Array();
		var val;
		while (arr.length < tamperAmount) {
			val = Math.floor(Math.random()*(N*M));
			if (arr.indexOf(val) === -1) {
				arr.push(val);
			}
		}
		return arr;
	}

	return{
		start: function(rows, columns, eggs){
			N=rows;
			M=columns;
			K=eggs;
			maxScore=Math.min(N, M)*K;
		},
		F: function(board){
			var score=maxScore;

			//CHECKS ROWS
			for(var i=0; i<board.length; i++){
				var countXdir=0;
				for(var y=0; y<board[i].length; y++){
					if(board[i][y]==1)
						countXdir++;
				}
				if(countXdir>K){
					score-=(countXdir-K);
				}
			}

			//CHECKS COLUMNS
			for(var i=0; i<board[0].length; i++){
				var countYdir=0;
				for(var y=0; y<board.length; y++){
					if(board[y][i]){
						countYdir++;
					}
				}
				if(countYdir>K){
					score-=(countYdir-K);
				}
			}
			
			//CHECKS DIAGONALS top-left --> bottom right
			for(var x=0; x<N; x++){
				var countD=0;
				for(var y=0; y<M-x; y++){
					if(board[x+y][y]==1)
						countD++;
				}
				if(countD>K)
					score-=(countD-K);
			}
			
			for(var x=1; x<M; x++){
				var countD=0; 
				for(var y0; y<N-x; y++){
					if(board[x+y][y]==1)
						countD++;
				}
				if(countD>K)
					score-=(countD-K);
			}



			//CHECKS DIAGONALS top-right --> bottom left
			for(var x=0; x<N; x++){
				var countD=0;
				

			}
			//TODO CHECK MORE SHIT
					
			return score/maxScore;
		},
		
		generateNeighbors: function(P, nNodes, t){
			// Find out how much to tamper with the eggs
			var tamperPercentage = defaultTemp * t;
			var tamperAmount = Math.floor((M*N) * tamperPercentage);
			
			// Generate "nNodes"-many nodes
			var nodes = {};
			var curNode;
			for (var i = 0; i < nNodes; i++) {
				curNode = deepCopy(P);
				
				// Generates a list of random values
				var indexes = genIndexes(tamperAmount);
				
				console.log(indexes);
				
				// Change these indexes in the current node
				var val, x, y;
				for (var j = 0; j < indexes[0].length; j++) {
					// Find the integer value and divide into x and y
					val = indexes[j];
					x = val%N;
					y = Math.floor(val/M);
					
					// Change the value at the given index
					val = curNode[y][x];
					curNode[y][x] = Math.abs(val-1);
					
				}
				
				// Store it in the nodes list
				nodes[i] = curNode;
			}
			
			return nodes;
		},
		
		generateRandom: function(){
			var board = new Array();
			for(var i=0; i<M; i++){
				board[i] = new Array();
				for(var j=0; j<N; j++){
					board[i][j]=0;
				}	
			}

			for(var i=0; i<N; i++){
				for(var j=0; j<K; j++){
					var x=Math.floor(Math.random()*M);
					if(board[i][x]==1){
						j--;	
					}else{
						board[i][x]=1;
					}
				}
			}
			return board;
		}
	};
}(PuzzleGame || {}));


// Copies an array, while preserving the data in the old array
function deepCopy(arr) {
    var newArr = new Array();
    for (var i = 0; i < arr.length; i++) {
		newArr[i] = new Array();
        for (var j = 0; j < arr[0].length; j++) {
            newArr[i][j] = arr[i][j];
        }
    }
    return newArr;
}