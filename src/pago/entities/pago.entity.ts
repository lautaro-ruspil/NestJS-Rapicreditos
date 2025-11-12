import { Credito } from 'src/credito/entities/credito.entity';
import { Persona } from 'src/persona/entities/persona.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  ManyToOne,
} from 'typeorm';

@Entity('pago')
export class Pago {
  @PrimaryGeneratedColumn()
  id_pago: number;

  @Column({ type: 'decimal', scale: 2 })
  monto_cuota: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  fecha_pago: Date;

  // RELACIONES

  @ManyToOne(() => Persona, (persona) => persona.pagos, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'id_persona' })
  persona: Persona;

  @ManyToOne(() => Credito, (credito) => credito.pagos, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'id_credito' })
  credito: Credito;
}
