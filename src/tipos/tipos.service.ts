import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Tipo } from './entities/tipo.entity';
import { Repository } from 'typeorm';
import { CreateTipoDto } from './dto/create-tipo.dto';
import { UpdateTipoDto } from './dto/update-tipo.dto';

@Injectable()
export class TiposService {
  constructor(
    @InjectRepository(Tipo)
    private readonly tipoRepository: Repository<Tipo>,
  ) {}

  // Retorna todos os tipos
  findAll(): Promise<Tipo[]> {
    return this.tipoRepository.find();
  }

  // Retorna um tipo específico
  async findOne(id: number): Promise<Tipo> {
    const tipo = await this.tipoRepository.findOneBy({ id });

    // Retorna 404 se não achar; Nest devolve null por padrão
    if (!tipo) {
      throw new NotFoundException(`Tipo com id ${id} nao encontrado`);
    }

    return tipo;
  }

  // Cria um novo tipo
  create(dto: CreateTipoDto): Promise<Tipo> {
    const novoTipo = this.tipoRepository.create(dto);
    return this.tipoRepository.save(novoTipo);
  }

  // Atualiza o tipo global
  async update(id: number, dto: UpdateTipoDto): Promise<Tipo> {
    const tipo = await this.findOne(id);

    // Sobrescreve o que vem da DTO
    Object.assign(tipo, dto);

    return this.tipoRepository.save(tipo);
  }

  // Remove um tipo
  async remove(id: number): Promise<void> {
    const tipo = await this.findOne(id);
    await this.tipoRepository.remove(tipo);
  }
}
