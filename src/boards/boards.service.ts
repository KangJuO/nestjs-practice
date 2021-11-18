import { Injectable } from '@nestjs/common';

@Injectable()
export class BoardsService {
  private boards = [];

  //모든 게시글을 가져오는 메소드
  getAllBoards() {
    return this.boards;
  }
}
