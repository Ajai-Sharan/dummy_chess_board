var Rook = function(config) {
    this.type = 'rook';
    this.constructor(config);
};

Rook.prototype = new Piece({});

Rook.prototype.isValidPosition = function(targetPosition) {
    
    let currentCol = this.position.charAt(0);
    let currentRow = parseInt(this.position.charAt(1));

    let targetCol = targetPosition.col;
    let targetRow = parseInt(targetPosition.row);

    if(currentRow === targetRow){

        let minCol = Math.min(currentCol.charCodeAt(0), targetCol.charCodeAt(0));
        let maxCol = Math.max(currentCol.charCodeAt(0), targetCol.charCodeAt(0));
        for (let col = minCol + 1; col < maxCol; col++) {
            let position = String.fromCharCode(col) + currentRow;
            let currentPiece = this.board.getPieceAt(position);
            if (currentPiece && currentPiece.color === this.board.turn) {
                console.warn("Invalid move for rook");
                return false;
            }
        }

        const targetPiece = this.board.getPieceAt(targetPosition);
        if(targetPiece && targetPiece.color !== this.color){
            this.kill(targetPiece);
            return true;
        }
        else if(targetPiece && targetPiece.color === this.color){
            console.warn("Invalid move for rook");
            return false;
        }
        else{
            return true;
        }

    }
    else if(currentRow === targetRow){

        let minRow = Math.min(currentRow, targetRow);
        let maxRow = Math.max(currentRow, targetRow);
        for (let row = minRow + 1; row < maxRow; row++) {
            let position = currentCol + row;
            let currentPiece = this.board.getPieceAt(position);
            if (currentPiece && currentPiece.color === this.board.turn) {
                console.warn("Invalid move for rook");
                return false;
            }
        }

        const targetPiece = this.board.getPieceAt(targetPosition);
        if(targetPiece && targetPiece.color !== this.color){
            this.kill(targetPiece);
            return true;
        }
        else if(targetPiece && targetPiece.color === this.color){
            console.warn("Invalid move for rook");
            return false;
        }
        else{
            return true;
        }

    }

    console.warn("Invalid move for rook");
    return false;
};

Rook.prototype.moveTo = function(targetPosition) {

    if (this.isValidPosition(targetPosition) && this.board.turn === this.color) {
        this.position = targetPosition.col + targetPosition.row;
        this.render();
        this.board.switchPlayer()
    }

}
