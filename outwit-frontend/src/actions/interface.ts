export interface SelectPiecePayload {
  row: number,
  column: number,
};

export interface UpdateGameMetaPayload {
  userType: null | 'white' | 'black';
  ready: boolean;
  winner: null | 'white' | 'black';
  isWhiteTurn: boolean;
}
