import { EntityRepository, Repository } from 'typeorm';
import { Board } from './board.entity';

//DB에 어떤 처리를 하는 비즈니스 로직은 여기에 처리
@EntityRepository(Board)
export class BoardRepository extends Repository<Board> {}
