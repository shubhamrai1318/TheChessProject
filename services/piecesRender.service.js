import { piecesImages } from '../config/piecesImages.config.js'
import { initialGame } from '../config/initialGame.config.js'
import { potentialGame } from '../config/potentialGame.config.js'
import { chessConfig } from '../config/chessConfig.config.js'
import { piecesHandle } from '../services/piecesHandle.service.js'
import { piecesDetermine } from '../services/piecesDetermine.service.js'
import { $, $$, $$$ } from '../utils/utils.js'

export const piecesRender = {
    piecesEventListeners: {},

    renderPieces() {
        const gameSetup = chessConfig.useInitialGame ? initialGame : potentialGame//Get the initial pieces placement from the arrays
        //alert("Render Pieces called")
        this.placePieceBoxNumbers()//Place piece box numbers in every piecebox div

        //this.placeWhiteDownOrUp()
        this.placePiecesInPosition( gameSetup )//Get the pieces position from the gamesetup array and use it
        this.addPiecesBoxListeners()
        this.piecesDetermine()
    },
    placePieceBoxNumbers() {
        $$( chessConfig.chessPieceBoxSelector ).map( pieceBoxElement => {
          
            const spanElement = document.createElement( 'span' )
            spanElement.classList.add( 'piece-box-text' )
            spanElement.innerHTML = pieceBoxElement.getAttribute( 'id' )
            //Place the id of the position in every box
//            alert(pieceBoxElement.innerHTML)
            pieceBoxElement.append( spanElement )
        })
    },
    placeWhiteDownOrUp() {
        const flexWrap = chessConfig.whitePlaysDown ? 'wrap' : 'wrap-reverse'
        $( chessConfig.chessTableSelector ).style.flexWrap = flexWrap
    },
    placePiecesInPosition( gameSetup ) {
        for ( const piecePosition in gameSetup )/*Get a8,b8 style positions from gamesetup array*/  {
            //alert(piecePosition)
            const pieceType = gameSetup[ piecePosition ]//Get piece to be placed at the postions
            //alert(pieceType)
            const pieceImageLocation = piecesImages[ pieceType ]//Get the url for the image to be placed

            const imgElement = document.createElement( 'img' )
            imgElement.classList.add( 'piece' )
            imgElement.setAttribute( 'piece-type', pieceType )//Creat an attribute in the image with the piecetype Blackpawn, WhiteRook aetc
            imgElement.src = `${ pieceImageLocation }`
            //alert(imgElement.src);
            //Create an image and place it
            $( `#${ piecePosition }` ).append( imgElement )
        }
    },
    addPiecesBoxListeners() {
        //Handle mouse enter, mouse leave and mouse clicks
        $$( chessConfig.chessPieceBoxSelector ).forEach( pieceBoxElement => {
           // pieceBoxElement is div which rwepresents square in the chess board
           //<div id="a1" class="piece-box black-box"></div>
            //alert(pieceBoxElement.id)
            const pieceBoxPosition = pieceBoxElement.getAttribute( 'id' )
            //Get the id of every piecebox element
            //alert(pieceBoxPosition)
            const pieceElement = $$$( pieceBoxElement, chessConfig.chessPieceSelector )
            const pieceType = pieceElement?.getAttribute( 'piece-type' ) ?? null
            //Get piece type if it is there. Get null otherwise

            const handleParams = {
                pieceBoxElement,
                pieceBoxPosition,
                pieceElement,
                pieceType
            }

            this.piecesEventListeners[ pieceBoxPosition ] = {
                'mouseenter': _ => {
                   // alert("Mouse Enter")
                   //alert(piecesHandle)
                    piecesHandle.handlePieceMouseenter( handleParams )
                    //Mouse enter. Highlight the position in yellow is done by css
                },
                'mouseleave': _ => {
                    piecesHandle.handlePieceMouseleave( handleParams )
                    //Remove highlighting
                },
                'click': _ => {
                    piecesHandle.handlePieceClick( handleParams )
                    //Highlight possible move positions
                },
            }

            pieceBoxElement.addEventListener( 'mouseenter', this.piecesEventListeners[ pieceBoxPosition ][ 'mouseenter' ])
            pieceBoxElement.addEventListener( 'mouseleave', this.piecesEventListeners[ pieceBoxPosition ][ 'mouseleave' ])
            pieceBoxElement.addEventListener( 'click', this.piecesEventListeners[ pieceBoxPosition ][ 'click' ])
        })
    },
    resetPiecesBoxListeners() {
        $$( chessConfig.chessPieceBoxSelector ).forEach( pieceBoxElement => {
            const pieceBoxPosition = pieceBoxElement.getAttribute( 'id' )

            pieceBoxElement.removeEventListener( 'mouseenter', this.piecesEventListeners[ pieceBoxPosition ][ 'mouseenter' ])
            pieceBoxElement.removeEventListener( 'mouseleave', this.piecesEventListeners[ pieceBoxPosition ][ 'mouseleave' ])
            pieceBoxElement.removeEventListener( 'click', this.piecesEventListeners[ pieceBoxPosition ][ 'click' ])
        })
    },
    piecesDetermine() {
        piecesDetermine.generateDeterminations()
    },

    /////////////////////

    getCurrentGameSetup() {
        return $$( chessConfig.chessPieceSelector ).
            map( pieceElement => ({
                pieceType: pieceElement.getAttribute( 'piece-type' ),
                piecePosition: pieceElement.closest( chessConfig.chessPieceBoxSelector ).getAttribute( 'id' )
            })).
            reduce( (obj, { pieceType, piecePosition } ) => {
                obj[ piecePosition ] = pieceType
                return obj
            }, {})
    }
}

window.piecesRender = piecesRender
