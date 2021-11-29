import { BaseEntity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { BoardStatus } from './board-status.enum';

//DB의 스키마 정의
export class Board extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  status: BoardStatus;
}
