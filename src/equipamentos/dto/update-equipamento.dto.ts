import { PartialType } from '@nestjs/mapped-types';
import { CreateEquipamentoDto } from './create-equipamento.dto';

// Transforma todos os campos do create como opcionais
export class UpdateEquipamentoDto extends PartialType(CreateEquipamentoDto) {}
