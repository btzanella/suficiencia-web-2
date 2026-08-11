import { IsInt, IsPositive } from 'class-validator';

export class TipoIdDto {
  @IsInt()
  @IsPositive()
  id!: number;
}
