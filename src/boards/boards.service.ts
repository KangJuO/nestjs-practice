import { Injectable } from '@nestjs/common';
import { Board } from './board.model';

@Injectable()
export class BoardsService {
  private boards: Board[] = [];

  //모든 게시글을 가져오는 메소드
  getAllBoards(): Board[] {
    return this.boards;
  }
}
