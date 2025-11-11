import {
  IsString,
  IsNotEmpty,
  MaxLength,
  MinLength,
  IsNumberString,
  Matches,
  IsOptional,
  IsEmail,
  IsNumber,
} from 'class-validator';

export class CreatePersonaDto {
  // Nombre
  @IsNotEmpty({ message: 'El nombre no puede estar vacío' })
  @IsString({ message: 'El nombre debe ser un string' })
  @MinLength(2, { message: 'El nombre debe tener al menos 2 caracteres' })
  @MaxLength(100, {
    message: 'El nombre debe tener como máximo 100 caracteres',
  })
  nombres: string;

  // Apellido
  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  @MaxLength(100)
  apellidos: string;

  // Dni
  @IsNotEmpty()
  @IsNumberString()
  @Matches(/^\d{7,8}$/, {
    message: 'El DNI debe tener entre 7 y 8 dígitos numéricos',
  })
  dni: string;

  // Número de trámite
  @IsNotEmpty()
  @IsNumberString()
  @Matches(/^\d{11}$/, {
    message: 'El número de trámite debe tener 11 dígitos',
  })
  nro_de_tramite: string;

  // Teléfono
  @IsNotEmpty()
  @IsNumberString()
  @Matches(/^\d{10}$/, {
    message: 'El teléfono debe contener 10 dígitos numéricos',
  })
  telefono: string;

  // Dirección
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  direccion: string;

  // Número de dirección
  @IsNotEmpty()
  @IsNumberString()
  @MaxLength(10)
  nro_direccion: string;

  // Piso (opcional)
  @IsOptional()
  @IsString()
  @MaxLength(3)
  piso?: string;

  // Departamento (opcional)
  @IsOptional()
  @IsString()
  @MaxLength(50)
  dpto?: string;

  // Correo electrónico
  @IsNotEmpty()
  @IsEmail({}, { message: 'Debe ingresar un correo electrónico válido' })
  @MaxLength(100)
  correo_electronico: string;

  // Contraseña
  @IsNotEmpty()
  @IsString()
  @MinLength(8, { message: 'La contraseña debe tener al menos 8 caracteres' })
  @MaxLength(256)
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])[A-Za-z\d!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]{8,}$/,
    {
      message:
        'La contraseña debe tener al menos 8 caracteres, incluyendo mayúsculas, minúsculas, números y símbolos especiales.',
    },
  )
  contrasenia: string;

  // Foto DNI Frente
  @IsString()
  @MaxLength(256)
  foto_dni_frente: string;

  // Foto DNI Dorso
  @IsString()
  @MaxLength(256)
  foto_dni_dorso: string;

  // Foto Selfie Dni en mano
  @IsString()
  @MaxLength(256)
  foto_selfie_dni_en_mano: string;

  // Foto Recibo Sueldo
  @IsString()
  @MaxLength(256)
  foto_recibo_sueldo: string;

  @IsNumber()
  sueldo: number;
}
