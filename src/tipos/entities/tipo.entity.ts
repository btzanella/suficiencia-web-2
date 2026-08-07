import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('tipos')
export class Tipo {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  nome!: string;
}
