import { State } from 'store';
import { SelectPiecePayload } from 'actions/interface';
import { Board } from 'model/Board';

export function hoverPieceReducer(state: State, payload: SelectPiecePayload): State {
    const board = new Board(state.board);
    const selectedPiece = board.getPiece(payload.row, payload.column);
    // TODO
    return state;
}
