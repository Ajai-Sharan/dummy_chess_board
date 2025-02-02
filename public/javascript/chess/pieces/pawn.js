var Pawn = function(config){
    this.type = 'pawn';
    this.constructor(config);
};

Pawn.prototype = new Piece({});

Pawn.prototype.isValidPosition = function(targetPosition){
    // Convert current position to row and column
    let currentCol = this.position.charAt(0);
    let currentRow = parseInt(this.position.charAt(1));

    // Calculate the allowed move distance based on pawn color
    let moveDistance = this.color === 'white' ? 1 : -1;
    let initialRow = this.color === 'white' ? 2 : 7;

    // Check if the move is valid
    if (targetPosition.col === currentCol) {
        // Moving straight
        if (targetPosition.row === (currentRow + moveDistance).toString() || (currentRow === initialRow && targetPosition.row === (currentRow + 2 * moveDistance).toString())) {
            // Regular one-square move
            return true;
        }
    } else if (Math.abs(targetPosition.col.charCodeAt(0) - currentCol.charCodeAt(0)) === 1 &&
            targetPosition.row === (currentRow + moveDistance).toString() && this.board.getPieceAt(targetPosition)!== false ) {
            // Diagonal capture (assuming there's an enemy piece, which should be checked in the main game logic)

            const targetPiece = this.board.getPieceAt(targetPosition);
            if(targetPiece && targetPiece.color !== this.color){
                this.kill(targetPiece);
                return true;
            }
            else if(targetPiece && targetPiece.color === this.color){
                console.warn("Invalid move for Pawn");
                return false;
            }
            else{
                return true;
            }

    }

    // If none of the above conditions are met, the move is invalid
    console.warn("Invalid move for pawn");
    return false;
}

Pawn.prototype.moveTo = function(targetPosition){
    if (this.isValidPosition(targetPosition) && this.board.turn === this.color) {
        this.position = targetPosition.col + targetPosition.row;
        this.render();
        this.board.switchPlayer()
    }
}