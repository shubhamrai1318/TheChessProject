
export default {
    handlePieceMouseleave({ pieceBoxElement, pieceBoxPosition }) {
        //alert("Mouse leave")
        if ( checkMate.gameOver ) {
            return
        }
        
        if (this.isNotOnPieceSelected( pieceBoxPosition ) ) {// A PIECE IS ALREADY SELECTED
            //alert("Mouse left piece selected")
            this.removeSelected( pieceBoxElement )
            this.removeNotAllowed( pieceBoxElement )
            this.removePointer( pieceBoxElement )
        }
    },
}
