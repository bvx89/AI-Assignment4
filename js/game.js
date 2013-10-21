var PuzzleGame = (function() {
	var N;
	var M;
	var K;


	return{
		start: function(rows, columns, eggs){
			N=rows;
			M=columns;
			K=eggs;
		},
		F: function(board){
			var maxScore=Math.min(N, M)*K;
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
				for(var y=0; ){
					
				}

			}
			//TODO CHECK MORE SHIT
					
			return score/maxScore;
		},
		generateNeighbors: function(currentNode, rNodes, t){

		},
		generateRandom: function(){
			var board=[[,],[,]];
			//var board=new Array();
			for(var int i=0; i<M; i++){
				for(var int j=0; j<N; j++){
					board[M,N]=0;
				}	
			}

			for(var i=0; i<N; i++){
				for(var j=0; j<K; j++){
					var x=Math.floor(Math.random()*M+1);
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
