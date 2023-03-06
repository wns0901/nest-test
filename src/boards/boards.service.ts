import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { use } from 'passport';
import { NotFoundError } from 'rxjs';
import { User } from 'src/auth/user.entity';
import { BoardStatus } from './board-status.enum';
import { Board } from './board.entity';
import { BoardRepository } from './board.repository';
import { CreateBoardDto } from './dto/create-board.dto';

@Injectable()
export class BoardsService {
  constructor(
    @InjectRepository(BoardRepository)
    private boardRepository: BoardRepository,
  ) {}
  async createBoards(
    createBoardDto: CreateBoardDto,
    user: User,
  ): Promise<Board> {
    return this.boardRepository.createBoard(createBoardDto, user);
  }

  async getAllBoard(user: User): Promise<Board[]> {
    const query = this.boardRepository.createQueryBuilder('board');

    query.where('board.userId = :userId', { userId: user.id });

    const boards = await query.getMany();

    return boards;
  }

  async getBoardById(id: number): Promise<Board> {
    const found = await this.boardRepository.findOne(id);

    if (!found) {
      throw new NotFoundException(`Can't find Board with id ${id}`);
    }

    return found;
  }

  async updateBoard(
    id: number,
    createBoardDto: CreateBoardDto,
  ): Promise<Board> {
    const { title, description } = createBoardDto;
    const board = await this.boardRepository.findOne(id);

    (board.title = title), (board.description = description);

    return await this.boardRepository.save(board);
  }

  async deleteBoard(id: number, user: User): Promise<string> {
    const result = await this.boardRepository.delete({ id, user });

    if (!result.affected) {
      throw new NotFoundException('삭제할 게시글이 없음');
    }

    return '삭제 완료';
  }

  async updateBoardStatus(id: number, status: BoardStatus): Promise<Board> {
    const board = await this.boardRepository.findOne(id);

    board.status = status;

    return await this.boardRepository.save(board);
  }
}
