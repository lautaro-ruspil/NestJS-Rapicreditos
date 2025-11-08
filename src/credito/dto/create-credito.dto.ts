import {
  IsInt,
  IsNotEmpty,
  IsPositive,
  IsNumber,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateCreditoDto {
  @IsNotEmpty()
  @IsInt()
  @IsPositive({ message: 'El número de cuotas debe ser positivo' })
  cantidad_cuotas: number;

  @IsNotEmpty()
  @IsNumber(
    { maxDecimalPlaces: 2 },
    {
      message:
        'El monto debe ser un número valido mayor a 1000 con hasta 2 decimales',
    },
  )
  @IsPositive({ message: 'El monto solicitado debe ser positivo' })
  monto_solicitado: number;

  @IsNotEmpty()
  @IsString()
  @MaxLength(100, {
    message: 'El tipo de crédito no debe exceder los 100 caracteres',
  })
  tipo_credito: string;
}
