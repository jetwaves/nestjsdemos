import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Game } from './entities/game.entity';
import { GameRun } from './entities/game-run.entity';
import { GameService } from './game.service';
import { GameController } from './game.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Game, GameRun])],
  controllers: [GameController],
  providers: [GameService],
})
export class GameModule {}
