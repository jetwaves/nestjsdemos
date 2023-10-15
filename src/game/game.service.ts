import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { Game } from './entities/game.entity';
import { GameRun } from './entities/game-run.entity';

@Injectable()
export class GameService {
  constructor(
    @InjectRepository(Game)
    private readonly gameRepository: Repository<Game>,
    @InjectRepository(GameRun)
    private readonly gameRunRepository: Repository<GameRun>,
    private dataSource: DataSource,
  ) {}

  async create() {
    const refArr = [];
    for (let i = 0; i < 4; i++) {
      refArr.push(Math.floor(Math.random() * 6 + 1));
    }
    console.log(refArr);
    const ref: number = parseInt(refArr.join(''));
    const game = await this.gameRepository.create({
      ref: ref,
      tries_count: 0,
      latest_feedback: null,
    });
    const saveGame = await this.gameRepository.save(game);
    return saveGame;
  }

  async findAll() {
    const games = await this.gameRepository.find();
    return games;
  }

  async findOne(id: number) {
    return await this.gameRunRepository.find({
      where: { game_ref: id },
    });
  }

  async remove(id: number) {
    return `This action removes a #${id} game`;
  }

  async proposeSolution(id: number, solution: number) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.startTransaction();
    try {
      // check game lost
      const game = await this.gameRepository.findOne({ where: { ref: id } });
      if (game.tries_count >= 10) {
        throw new Error(
          "Game is finished after 10 tries, can't take any more proposal",
        );
      }
      // check game won
      if (game.latest_feedback == 'BBBB') {
        throw new Error("Game is won, can't take any more proposal");
      }

      // calculate feedback
      const feedback = this.calculateFeedback(id, solution);

      // save updates
      game.tries_count++;
      game.latest_feedback = feedback;
      const gameRun = await this.gameRunRepository.create({
        created_at: new Date(),
        game_ref: id,
        proposal: solution,
        feedback: feedback,
      });

      await this.gameRepository.save(game);
      await this.gameRunRepository.save(gameRun);
      await queryRunner.commitTransaction();
      // API result will be the history of proposals and their feedbacks
      const proposalHistories = await this.gameRunRepository.find({
        where: { game_ref: id },
      });
      return proposalHistories;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      if (error.message) {
        return error.message;
      } else {
        return error.toString();
      }
    } finally {
      await queryRunner.release();
    }
  }

  calculateFeedback(ref: number, solution: number): string {
    const refArr = ref.toString().split('');
    const solutionArr = solution.toString().split('');
    const feedbackArr = [];
    // same value at right position test
    for (let i = 0; i < 4; i++) {
      if (solutionArr[i] === refArr[i]) {
        feedbackArr.push('B');
      }
    }
    // same value at wrong position test
    for (let i = 0; i < 4; i++) {
      if (solutionArr[i] !== refArr[i] && refArr.includes(solutionArr[i])) {
        feedbackArr.push('W');
      }
    }
    return feedbackArr.join('');
  }
}
