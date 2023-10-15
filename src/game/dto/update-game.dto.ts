import { PartialType } from '@nestjs/mapped-types';
import { CreateGameDto } from './create-game.dto';

export class UpdateGameDto extends PartialType(CreateGameDto) {
  tries_count: number;
  latest_feedback: number;
}
