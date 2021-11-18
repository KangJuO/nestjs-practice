import { Injectable } from '@nestjs/common';
import { Board, BoardStatus } from './board.model';
import { v1 as uuid } from 'uuid';

@Injectable()
export class BoardsService {
  private boards: Board[] = [];

  //모든 게시글을 가져오는 메소드
  getAllBoards(): Board[] {
    return this.boards;
  }

  createBoard(title: string, description: string) {
    const board: Board = {
      //원래는 디비가 자동 생성해주지만 지금은 로컬에서 테스트할거야 랜덤아이디 생성용 uuid임
      id: uuid(),
      title,
      description,
      status: BoardStatus.PUBLIC,
    };

    this.boards.push(board);
    return board;
  }
}
