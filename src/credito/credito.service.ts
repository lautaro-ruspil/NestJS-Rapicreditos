import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCreditoDto } from './dto/create-credito.dto';
import { UpdateCreditoDto } from './dto/update-credito.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Credito } from './entities/credito.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CreditoService {
  constructor(
    @InjectRepository(Credito)
    private readonly creditoRepository: Repository<Credito>,
  ) {}

  async create(createCreditoDto: CreateCreditoDto): Promise<{
    statusCode: number;
    msg: string;
    data: Credito;
  }> {
    try {
      const newCredit = this.creditoRepository.create(createCreditoDto);
      const savedCredit = await this.creditoRepository.save(newCredit);

      return {
        statusCode: HttpStatus.OK,
        msg: 'Crédito creado correctamente',
        data: savedCredit,
      };
    } catch (error) {
      console.error(`Error: ${error}`);
      throw new HttpException(`Error al crear el crédito`, 500);
    }
  }

  async findAll(): Promise<{
    statusCode: number;
    msg: string;
    data: Credito[];
  }> {
    try {
      const creditos: Credito[] = await this.creditoRepository.find();

      if (!creditos || creditos.length === 0) {
        throw new HttpException(
          `No hay créditos disponibles para mostrar`,
          404,
        );
      }
      return {
        statusCode: HttpStatus.OK,
        msg: 'Busqueda de créditos realizada correctamente',
        data: creditos,
      };
    } catch (error) {
      console.error(`Error: ${error}`);
      throw new HttpException(`Error al obtener los créditos`, 500);
    }
  }

  async findOne(id: number): Promise<{
    statusCode: number;
    msg: string;
    data: Credito;
  }> {
    try {
      const credito = await this.creditoRepository.findOne({
        where: { id_credito: id },
      });

      if (!credito) {
        throw new HttpException(
          `No se pudo encontrar el crédito con el id ${id}`,
          404,
        );
      }
      return {
        statusCode: HttpStatus.OK,
        msg: `Busqueda de crédito con el id ${id} realizada correctamente`,
        data: credito,
      };
    } catch (error) {
      console.error(`Error: ${error}`);
      throw new HttpException(`Error al obtener el crédito`, 500);
    }
  }

  async update(
    id: number,
    updateCreditoDto: UpdateCreditoDto,
  ): Promise<{
    statusCode: number;
    msg: string;
    data: Credito;
  }> {
    try {
      const credito = await this.creditoRepository.preload({
        id_credito: id,
        ...updateCreditoDto,
      });

      if (!credito) {
        throw new HttpException(
          `No se encontró el crédito con el id ${id}`,
          404,
        );
      }

      const savedCredit = await this.creditoRepository.save(credito);

      return {
        statusCode: HttpStatus.OK,
        msg: `Crédito con el id ${id} actualizado correctamente`,
        data: savedCredit,
      };
    } catch (error) {
      console.error(`Error: ${error}`);
      throw new HttpException(
        `Hubo un error al actualizar el crédito con el id ${id}`,
        500,
      );
    }
  }

  async remove(id: number): Promise<{
    statusCode: number;
    msg: string;
    data: Credito;
  }> {
    try {
      const { data: credito } = await this.findOne(id);
      await this.creditoRepository.delete(id);

      return {
        statusCode: HttpStatus.OK,
        msg: `Crédito con el id ${id} eliminado correctamente`,
        data: credito,
      };
    } catch (error) {
      console.error(`Error: ${error}`);
      throw new HttpException(`Ocurrió un error al eliminar el crédito`, 500);
    }
  }
}
