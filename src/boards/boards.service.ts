import { Injectable, NotFoundException } from '@nestjs/common';
import { BoardStatus } from './board-status.enum';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardRepository } from './board.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Board } from './board.entity';
import { User } from 'src/auth/user.entity';

// 라우팅 후 비즈니스 로직을 제공
// DB처리는 레포지토리 패턴으로 처리
@Injectable()
export class BoardsService {
  constructor(
    @InjectRepository(BoardRepository)
    private boardRepository: BoardRepository,
  ) {}

  //모든 게시글을 가져오는 메소드
  async getAllBoards(user: User): Promise<Board[]> {
    const query = this.boardRepository.createQueryBuilder('board');

    query.where('board.userId = :userId', { userId: user.id });

    const boards = await query.getMany();

    return boards;
  }

  //게시물 생성 메소드
  createBoard(createBoardDto: CreateBoardDto, user: User): Promise<Board> {
    return this.boardRepository.createBoard(createBoardDto, user);
  }

  //특정 게시물 찾는 메소드
  async getBoardById(id: number): Promise<Board> {
    const found = await this.boardRepository.findOne(id);

    if (!found) {
      throw new NotFoundException(`Can't find Board with id ${id}`);
    }

    return found;
  }

  //특정 게시물을 지우는 메소드
  async deleteBoatd(id: number, user: User): Promise<void> {
    const result = await this.boardRepository.delete({ id, user });

    if (result.affected === 0) {
      throw new NotFoundException(`Can't find Board with id ${id}`);
    }
  }

  // 게시글 상태 업데이트
  async updateBoardStatus(id: number, status: BoardStatus): Promise<Board> {
    const board = await this.getBoardById(id);

    board.status = status;

    await this.boardRepository.save(board);

    return board;
  }
}
