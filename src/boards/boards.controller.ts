import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';
import { BoardStatus } from './board-status.enum';
import { Board } from './board.entity';
import { BoardsService } from './boards.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardStatusValidationPipe } from './pipes/board-status-validation.pipe';

//비즈니스 로직 처리를 위함, 서비스에서 제공하는 메소드를 사용해서 응답
@Controller('boards')
@UseGuards(AuthGuard())
export class BoardsController {
  constructor(private boardsService: BoardsService) {}

  //모든 게시글을 가져오는 핸들러
  @Get()
  getAllBoard(@GetUser() user: User): Promise<Board[]> {
    return this.boardsService.getAllBoards(user);
  }

  //게시물을 생성하는 핸들러
  @Post()
  @UsePipes(ValidationPipe)
  createBoard(
    @Body() CreateBoardDto: CreateBoardDto,
    @GetUser() user: User,
  ): Promise<Board> {
    return this.boardsService.createBoard(CreateBoardDto, user);
  }

  // //특정 게시물을 가져오는 핸들러
  @Get('/:id')
  getBoardById(@Param('id') id: number): Promise<Board> {
    return this.boardsService.getBoardById(id);
  }

  @Delete('/:id')
  deleteBoard(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: User,
  ): Promise<void> {
    return this.boardsService.deleteBoatd(id, user);
  }

  @Patch('/:id/status')
  updateBoardStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body('status', BoardStatusValidationPipe) status: BoardStatus,
  ) {
    return this.boardsService.updateBoardStatus(id, status);
  }
}
