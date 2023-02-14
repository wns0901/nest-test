import { Injectable, NotFoundException } from '@nestjs/common';
import { NotFoundError } from 'rxjs';
import { Board, BoardStatus } from './boards.model';
import { CreateBoardDto } from './dto/create-board.dto';

@Injectable()
export class BoardsService {
  private boards: Board[] = [];
  private id: number = 1;
  getAllBoards(): Board[] {
    return this.boards;
  }

  createBoards(createBoardDto: CreateBoardDto) {
    const { title, description } = createBoardDto;
    const id = this.id++;

    const board: Board = {
      id,
      title,
      description,
      status: BoardStatus.PUBLIC,
    };

    this.boards.push(board);
    return board;
  }

  getBoardById(id: number): Board {
    const found = this.boards.find((board) => board.id === id);
    if (!found) {
      throw new NotFoundException(`${id}를 찾을 수 없음`);
    }
    return found;
  }

  deleteBoard(id: number): string {
    const found = this.getBoardById(id);
    this.boards = this.boards.filter((board) => board.id !== found.id);
    return '삭제완료';
  }

  updateBoardStatus(id: number, status: BoardStatus): Board {
    const board = this.getBoardById(id);
    board.status = status;
    return board;
  }
}
