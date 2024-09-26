var Bishop = function(config) {
    this.type = 'bishop';
    this.constructor(config);
};

Bishop.prototype = new Piece({});

// Check if the position is valid for a bishop move
Bishop.prototype.isValidPosition = function(targetPosition) {
    let currentCol = this.position.charAt(0);
    let currentRow = parseInt(this.position.charAt(1));

    let targetCol = targetPosition.col;
    let targetRow = parseInt(targetPosition.row);

    // Check if the move is diagonal
    if (Math.abs(targetCol.charCodeAt(0) - currentCol.charCodeAt(0)) === Math.abs(targetRow - currentRow)) {
        let colDirection = (targetCol.charCodeAt(0) > currentCol.charCodeAt(0)) ? 1 : -1;
        let rowDirection = (targetRow > currentRow) ? 1 : -1;

        // Traverse the diagonal and check for any pieces
        let currentColCode = currentCol.charCodeAt(0) + colDirection;
        let currentRowIter = currentRow + rowDirection;

        while (currentColCode !== targetCol.charCodeAt(0) || currentRowIter !== targetRow) {
            let checkCol = String.fromCharCode(currentColCode);
            let checkRow = currentRowIter;

            let currentPiece = this.board.getPieceAt({col: checkCol, row: checkRow.toString()});
            if (currentPiece && currentPiece.color === this.color) {
                console.warn("Invalid move for Bishop");
                return false;
            }

            currentColCode += colDirection;
            currentRowIter += rowDirection;
        }

        let targetPiece = this.board.getPieceAt(targetPosition);
        if(targetPiece) {
            if(targetPiece.color !== this.color) {
                this.kill(targetPiece);
                return true;
            } else {
                console.warn("Invalid move for Bishop");
                return false;
            }
        } else {
            return true;
        }
    }

    console.warn("Invalid move for Bishop");
    return false;
};


Bishop.prototype.moveTo = function(targetPosition) {
    if (this.isValidPosition(targetPosition) && this.board.turn === this.color) {
        this.position = targetPosition.col + targetPosition.row;
        this.render();
        this.board.switchPlayer()
    }
};
