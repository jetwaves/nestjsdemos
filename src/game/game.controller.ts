import { Controller, Get, Post, Body, Param, Put } from '@nestjs/common';
import { GameService } from './game.service';

@Controller('game')
export class GameController {
  constructor(private readonly gameService: GameService) {}

  @Post()
  create() {
    return this.gameService.create();
  }

  @Get()
  findAll() {
    return this.gameService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.gameService.findOne(+id);
  }

  @Put(':id/:solution')
  proposeSolution(
    @Param('id') id: number,
    @Param('solution') solution: number,
  ) {
    return this.gameService.proposeSolution(+id, +solution);
  }
}
