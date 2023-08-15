import { playerTurn } from '../../../services/playerTurn.service.js'
import { piecesDetermine } from '../../piecesDetermine.service.js'

export default {
    handlePieceMouseenter({ pieceBoxElement, pieceBoxPosition, pieceElement, pieceType }) {
        if ( checkMate.gameOver ) {
            return
        }
        
        if ( 
            this.isPieceSelected() && 
            this.isNotOnPieceSelected( pieceBoxPosition )
        ) {
            //If another piece is is already selected
            const hasPiecePotential = piecesDetermine.hasPiecePotential( this.pieceSelectedPosition, pieceBoxPosition )
            if ( hasPiecePotential ) {
               // alert(pieceBoxElement.innerHTML)
                this.setPointer( pieceBoxElement )
            }
            return
        }

        if ( this.isPieceSelected() ) {//If this piece is is already selected
           // alert("Two")
            return
        }
        
        if ( !pieceElement ) {//If there vis no piece to move at the selected position
           //alert("Three")
            return
        }
        
        if ( playerTurn.isRightTurn( pieceType ) ) {//Checks if chosen piece is of the player whose turn is current
            //White player and white piece or black player and black piece
            //alert("Four")
           this.setSelected( pieceBoxElement )
        }
    },
}