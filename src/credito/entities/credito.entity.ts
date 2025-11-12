import { Pago } from 'src/pago/entities/pago.entity';
import { Persona } from 'src/persona/entities/persona.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
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

  @Column({ type: 'bool', default: false })
  estado_credito: boolean;

  @ManyToOne(
    () => Persona,
    (persona) => {
      persona.creditos_activos;
    },
  )
  @JoinColumn({ name: 'id_persona' })
  persona: Persona;

  @OneToMany(
    () => Pago,
    (pago) => {
      pago.credito;
    },
  )
  pagos: Pago[];
}
