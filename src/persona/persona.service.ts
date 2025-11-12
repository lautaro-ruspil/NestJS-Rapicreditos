import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreatePersonaDto } from './dto/create-persona.dto';
import { UpdatePersonaDto } from './dto/update-persona.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Persona } from './entities/persona.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PersonaService {
  constructor(
    @InjectRepository(Persona)
    private readonly personaRepository: Repository<Persona>,
  ) {}

  // Manejar la subida de archivos y manejar la encriptación de la password
  async create(createPersonaDto: CreatePersonaDto): Promise<{
    statusCode: number;
    msg: string;
    data: Persona;
  }> {
    try {
      const newPerson = this.personaRepository.create(createPersonaDto);
      const savedPerson = await this.personaRepository.save(newPerson);

      return {
        statusCode: HttpStatus.OK,
        msg: 'Persona registrada correctamente',
        data: savedPerson,
      };
    } catch (error) {
      console.error(error);
      throw new HttpException(`Error al registrar persona`, 500);
    }
  }

  async findAll(): Promise<{
    statusCode: number;
    msg: string;
    data: Persona[];
  }> {
    try {
      // Busqueda condicional ver filtrado
      const personas: Persona[] = await this.personaRepository.find();

      return {
        statusCode: HttpStatus.OK,
        msg: 'Busqueda realizada correctamente',
        data: personas,
      };
    } catch (error) {
      console.error(`Error: ${error}`);
      throw new HttpException(
        `Ocurrio un error en la búsqueda de personas`,
        404,
      );
    }
  }

  async findOne(id: number): Promise<{
    statusCode: number;
    msg: string;
    data: Persona;
  }> {
    try {
      // Busqueda de una persona sola por ID
      const persona = await this.personaRepository.findOne({
        where: { id_persona: id },
        relations: ['persona', 'pago'],
      });

      if (!persona) {
        throw new HttpException(
          `No se puedo encontrar a la persona con el id: ${id}`,
          404,
        );
      }
      return {
        statusCode: HttpStatus.OK,
        msg: `Búsqueda realizada con éxito`,
        data: persona,
      };
    } catch (error) {
      console.error(`Error: ${error}`);
      throw new HttpException(
        `Ocurrio un error en la búsqueda de personas`,
        404,
      );
    }
  }

  async update(
    id: number,
    updatePersonaDto: UpdatePersonaDto,
  ): Promise<{
    statusCode: number;
    msg: string;
    data: Persona;
  }> {
    try {
      const persona = await this.personaRepository.preload({
        id_persona: id,
        ...updatePersonaDto,
      });

      if (!persona) {
        throw new HttpException(
          `No se encontró la persona con el id: ${id}`,
          HttpStatus.NOT_FOUND,
        );
      }

      const savedPersona = await this.personaRepository.save(persona);

      return {
        statusCode: HttpStatus.OK,
        msg: `Persona con el ID ${id} actualizada correctamente`,
        data: savedPersona,
      };
    } catch (error) {
      console.error(`Error: ${error}`);
      throw new HttpException(
        `Error al actualizar a la persona con el id ${id}`,
        500,
      );
    }
  }

  async remove(id: number): Promise<{
    statusCode: number;
    msg: string;
    data: Persona;
  }> {
    try {
      const { data: persona } = await this.findOne(id);
      await this.personaRepository.delete(id);
      return {
        statusCode: HttpStatus.OK,
        msg: 'Persona eliminada correctamente',
        data: persona,
      };
    } catch (error) {
      console.error(error);
      throw new HttpException(
        `No se pudo eliminar la persona con el id: ${id}`,
        500,
      );
    }
  }
}
