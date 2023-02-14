import {
  Controller,
  Get,
  ParseIntPipe,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import {
  Body,
  Delete,
  Param,
  Patch,
  UsePipes,
} from '@nestjs/common/decorators';
import { Board, BoardStatus } from './boards.model';
import { BoardsService } from './boards.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardStatusVaildationPipe } from './pipes/board-status-validation';

@Controller('boards')
export class BoardsController {
  constructor(private boardsService: BoardsService) {}

  @Get()
  getAllBoards(): Board[] {
    return this.boardsService.getAllBoards();
  }

  @Post()
  @UsePipes(ValidationPipe)
  createBoard(@Body() createBoardDto: CreateBoardDto): Board {
    return this.boardsService.createBoards(createBoardDto);
  }

  @Get('/:id')
  getBoardById(@Param('id', ParseIntPipe) id: number): Board {
    return this.boardsService.getBoardById(id);
  }

  @Delete('/:id')
  deleteBoard(@Param('id', ParseIntPipe) id: number): string {
    return this.boardsService.deleteBoard(id);
  }

  @Patch('/:id/status')
  updateBoardStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body('status', BoardStatusVaildationPipe) status: BoardStatus,
  ): Board {
    return this.boardsService.updateBoardStatus(id, status);
  }
}
