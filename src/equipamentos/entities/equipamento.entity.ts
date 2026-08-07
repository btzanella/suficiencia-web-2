import {
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Column,
} from 'typeorm';
import { Tipo } from 'src/tipos/entities/tipo.entity';

@Entity('equipamentos')
export class Equipamento {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  nome!: string;

  @ManyToOne(() => Tipo, { eager: true })
  @JoinColumn({ name: 'tipo_id' })
  tipo!: Tipo;
}
