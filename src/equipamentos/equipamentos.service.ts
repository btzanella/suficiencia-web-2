import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Equipamento } from './entities/equipamento.entity';
import { TiposService } from 'src/tipos/tipos.service';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class EquipamentosService {
  constructor(
    @InjectRepository(Equipamento)
    private readonly equipamentoRepository: Repository<Equipamento>,
    private readonly tipoService: TiposService,
  ) {}

  // Retorna todos os equipamentos
  findAll(): Promise<Equipamento[]> {
    return this.equipamentoRepository.find();
  }

  // Retorna um equipamento específico
  async findOne(id: number): Promise<Equipamento> {
    const equipamento = await this.equipamentoRepository.findOneBy({ id });

    // Retorna 404 se não achar; Nest devolve null por padrão
    if (!equipamento) {
      throw new NotFoundException(`Tipo com id ${id} nao encontrado`);
    }

    return equipamento;
  }

  // Cria um novo equipamento atrelando o tipo
  async create(dto: {
    nome: string;
    tipo: { id: number };
  }): Promise<Equipamento> {
    const tipo = await this.tipoService.findOne(dto.tipo.id);

    const novoEquipamento = this.equipamentoRepository.create({
      nome: dto.nome,
      tipo, // Busca diretamente do banco e não da requisição
    });

    return this.equipamentoRepository.save(novoEquipamento);
  }

  // Atualiza um equipamento e/ou seu tipo
  async update(
    id: number,
    dto: Partial<{ nome: string; tipo: { id: number } }>,
  ): Promise<Equipamento> {
    const equipamento = await this.findOne(id);

    if (dto.nome !== undefined) {
      equipamento.nome = dto.nome;
    }

    if (dto.tipo !== undefined) {
      const novoTipo = await this.tipoService.findOne(dto.tipo.id);
      equipamento.tipo = novoTipo;
    }

    return this.equipamentoRepository.save(equipamento);
  }

  // Remove um equipamento
  async remove(id: number): Promise<void> {
    const equipamento = await this.findOne(id);
    await this.equipamentoRepository.remove(equipamento);
  }
}
