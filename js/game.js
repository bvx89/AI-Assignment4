var PuzzleGame = (function() {
	var N;
	var M;
	var K;

	var switchIndexes = function(curNode, x1, x2, y1, y2) {
		var temp = curNode[y1][x1];
		curNode[y1][x1] = curNode[y2][x2];
		curNode[y2][x2] = temp;
	}
	
	return{
		start: function(rows, columns, eggs){
			N=rows;
			M=columns;
			K=eggs;
		},
		F: function(board){
			
			var errors=0;
			
			//CHECKS ROWS
			for(var i=0; i<board.length; i++){
				var countXdir=0;
				for(var y=0; y<board[i].length; y++){
					if(board[i][y]==1)
						countXdir++;
				}
				if(countXdir>K)
					errors+=(countXdir-K);
			}

			//CHECKS COLUMNS
			for(var i=0; i<board[0].length; i++){
				var countYdir=0;
				for(var y=0; y<board.length; y++){
					if(board[y][i]){
						countYdir++;
					}
				}
				if(countYdir>K)
					errors+=(countYdir-K);
			}
			
			//CHECKS DIAGONALS top-left --> bottom right
			for(var y=0; y<M; y++){
				var countD=0;
				for(var x=0; x<N-y; x++){
					// console.log('x: ' + (x+y) + ', y: ' + (x));
					if(board[x][x+y]==1)
						countD++;
				}
				if(countD>K)
					errors+=(countD-K);
			}
			
			for(var x=1; x<N; x++){
				var countD=0; 
				for(var y=0; y<M-x; y++){
					if(board[y+x][y]==1)
						countD++;
				}
				if(countD>K)
					errors+=(countD-K);
			}


			//CHECKS DIAGONALS top-right --> bottom left
			for(var x=0; x<N; x++){
				var countD=0;

				for(var y=0; y<=x; y++){
					if(board[y][x-y]==1)
						countD++;
				}
				if(countD>K)
					errors+=(countD-K);
			}
			
			
			for(var y=0; y<M; y++){
				var countD=0;
				
				for(var x=(N-1); x>y; x--){
					
					if(board[y+(N-x)][x]==1)
						countD++;
				}
				if(countD>K)
					errors+=(countD-K);
			}
			
			return (errors == 0 ? 1 : 1/(errors/2+1));
		},
		
		generateNeighbors: function(P, nNodes, t){
			// Find out how much to tamper with the eggs
			var tamperAmount = Math.floor(t * (M*N));
			
			// Be sure that we at least make one change
			if (tamperAmount < 1) tamperAmount = 1;
			
			// Generate "nNodes"-many nodes
			var nodes = {};
			var curNode;
			for (var i = 0; i < nNodes; i++) {
				curNode = deepCopy(P);
				
				// Find new indexes according to the tamperAmount
				var tamperedIndexes = 0, index, val, y, x1, x2;
				while(tamperedIndexes < tamperAmount) {
					// Selecting a random index
					index = Math.floor(Math.random()*(N*M));
					
					// Get the value for that index
					x1 = index%N;
					y = Math.floor(index/M);
					val = curNode[y][x1];
					
					// Loop through untill we find an index that's 
					// Not the same as the one found in index one
					do {
						x2 = Math.floor(Math.random() * N);
					} while (curNode[y][x2] === val);
					
					// Found two positions to switch, now switch them
					switchIndexes(curNode, x1, x2, y, y);
					
					// Increase the amount that has been tampered
					tamperedIndexes++;
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
