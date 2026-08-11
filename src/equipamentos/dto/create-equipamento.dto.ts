import { IsNotEmpty, IsString, ValidateNested } from 'class-validator';
import { TipoIdDto } from './tipo-id.dto';
import { Type } from 'class-transformer';

export class CreateEquipamentoDto {
  @IsString()
  @IsNotEmpty()
  nome!: string;

  @ValidateNested()
  @Type(() => TipoIdDto)
  tipo!: TipoIdDto;
}
