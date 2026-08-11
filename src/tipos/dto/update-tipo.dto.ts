import { PartialType } from '@nestjs/swagger';
import { CreateTipoDto } from './create-tipo.dto';

// Transforma todos os campos do create como opcionais
export class UpdateTipoDto extends PartialType(CreateTipoDto) {}
