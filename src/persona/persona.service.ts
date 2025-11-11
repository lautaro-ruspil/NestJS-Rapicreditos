import { HttpException, Injectable } from '@nestjs/common';
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
  // Poner el tipo de dato que va a retornar la funcion
  async create(createPersonaDto: CreatePersonaDto) {
    try {
      console.log(createPersonaDto);
      const newPerson = this.personaRepository.create(createPersonaDto);
      const savedPerson = await this.personaRepository.save(newPerson);

      return {
        statusCode: 201,
        msg: 'Persona registrada correctamente',
        data: savedPerson,
      };
    } catch (error) {
      console.error(error);
      throw new HttpException(`Error al registrar persona`, 500);
    }
  }

  async findAll() {
    try {
      // Busqueda condicional ver filtrado
      const personas: Persona[] = await this.personaRepository.find();

      console.log(personas);
      return {
        statusCode: 200,
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

  async findOne(id: number) {
    try {
      // Busqueda de una persona sola por ID
      const persona = await this.personaRepository.findOne({
        where: { id_persona: id },
      });

      if (!persona) {
        throw new HttpException(
          `No se puedo encontrar a la persona con el id: ${id}`,
          404,
        );
      }
      return {
        statusCode: 200,
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

  update(id: number, updatePersonaDto: UpdatePersonaDto) {
    return `This action updates a #${id} persona`;
  }

  async remove(id: number) {
    try {
      const persona = await this.findOne(id);
      this.personaRepository.delete(id);
      return {
        statusCode: 200,
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
