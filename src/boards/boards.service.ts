import { Injectable } from '@nestjs/common';
import { Board, BoardStatus } from './board.model';
import { v1 as uuid } from 'uuid';
import { CreateBoardDto } from './dto/create-board.dto';

@Injectable()
export class BoardsService {
  private boards: Board[] = [];

  //모든 게시글을 가져오는 메소드
  getAllBoards(): Board[] {
    return this.boards;
  }

  //게시물 생성 메소드
  createBoard(createBoardDto: CreateBoardDto) {
    const { title, description } = createBoardDto;
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

  //특정 게시물 찾는 메소드
  getBoardById(id: string): Board {
    return this.boards.find((board) => board.id === id);
  }

  //특정 게시물을 지우는 메소드
  deleteBoard(id: string): void {
    this.boards = this.boards.filter((board) => board.id !== id);
  }

  updateBoardStatus(id: string, status: BoardStatus): Board {
    const board = this.getBoardById(id);
    board.status = status;
    return board;
  }
}
