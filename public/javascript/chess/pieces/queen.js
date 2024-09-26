var Queen = function(config) {
    this.type = 'queen';
    this.constructor(config);
};

Queen.prototype = new Piece({});

// Check if the position is valid for a queen move
Queen.prototype.isValidPosition = function(targetPosition) {


    let currentCol = this.position.charAt(0);
    let currentRow = parseInt(this.position.charAt(1));

    let targetCol = targetPosition.col;
    let targetRow = parseInt(targetPosition.row);

    // Check if the move is diagonal, horizontal, or vertical
    let isDiagonalMove = Math.abs(targetCol.charCodeAt(0) - currentCol.charCodeAt(0)) === Math.abs(targetRow - currentRow);

    let isVerticalMove = currentCol === targetCol;

    let isHorizontalMove = currentRow === targetRow;

    if (isDiagonalMove || isVerticalMove || isHorizontalMove) {

        let colDirection = (targetCol.charCodeAt(0) > currentCol.charCodeAt(0)) ? 1 : (targetCol.charCodeAt(0) < currentCol.charCodeAt(0)) ? -1 : 0;
        let rowDirection = (targetRow > currentRow) ? 1 : (targetRow < currentRow) ? -1 : 0;

        // Traverse the path (diagonal, horizontal, or vertical) and check for any pieces blocking the way
        let currentColCode = currentCol.charCodeAt(0) + colDirection;
        let currentRowIter = currentRow + rowDirection;

        while ((colDirection !== 0 && currentColCode !== targetCol.charCodeAt(0)) || (rowDirection !== 0 && currentRowIter !== targetRow)) {
            let checkCol = String.fromCharCode(currentColCode);
            let checkRow = currentRowIter;

            if (this.board.getPieceAt({ col: checkCol, row: checkRow })) {
                return false; // A piece is blocking the way
            }

            currentColCode += colDirection;
            currentRowIter += rowDirection;
        }

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

    console.warn("Invalid move for Queen");
    return false;
};

Queen.prototype.moveTo = function(targetPosition) {

    if (this.isValidPosition(targetPosition) && this.board.turn === this.color) {
        this.position = targetPosition.col + targetPosition.row;
        this.render();
        this.board.switchPlayer()
    }

};