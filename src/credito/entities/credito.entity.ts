import { Persona } from 'src/persona/entities/persona.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
@Entity('credito')
export class Credito {
  // Agregar transaccion

  @PrimaryGeneratedColumn()
  id_credito: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  fecha_solicitud: Date;

  @Column({ type: 'int' })
  cantidad_cuotas: number;

  @Column({ type: 'decimal', scale: 2 })
  monto_solicitado: number;

  @Column({ type: 'varchar', length: 100 })
  tipo_credito: string;

  @Column({ type: 'varchar', length: 50 })
  estado_credito: string;

  @ManyToOne(
    () => Persona,
    (persona) => {
      persona.creditos_activos;
    },
  )
  @JoinColumn({ name: 'id_persona' })
  persona: Persona;
}
