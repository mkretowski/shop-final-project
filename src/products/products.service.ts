import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Product, Stock } from '@prisma/client';

@Injectable()
export class ProductsService {
  constructor(private prismaService: PrismaService) {}
  public getAll(): Promise<Product[]> {
    return this.prismaService.product.findMany({
      include: {
        stock: true,
      },
    });
  }
  public getById(id: Product['id']): Promise<Product | null> {
    return this.prismaService.product.findUnique({
      where: { id },
      include: {
        stock: true,
      },
    });
  }
  public deleteById(id: Product['id']): Promise<Product> {
    return this.prismaService.product.delete({
      where: { id },
    });
  }
  public async create(
    productData: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<Product> {
    try {
      return await this.prismaService.product.create({
        data: productData,
      });
    } catch (error) {
      if (error.code === 'P2002') {
        throw new ConflictException('Product already exists in database.');
      } else {
        throw new InternalServerErrorException('An unexpected error occurred.');
      }
    }
  }
  public async updateById(
    id: Product['id'],
    productData: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<Product> {
    try {
      return await this.prismaService.product.update({
        where: { id },
        data: productData,
      });
    } catch (error) {
      if (error.code === 'P2002') {
        throw new ConflictException('Product name already exists in database.');
      } else {
        throw new InternalServerErrorException('An unexpected error occurred.');
      }
    }
  }
  public async updateStock(
    id: Product['id'],
    productData: Omit<Stock, 'id' | 'createdAt' | 'updatedAt'>,
  ) {
    try {
      const existingStock = await this.prismaService.stock.findFirst({
        where: {
          productId: id,
          size: productData.size,
        },
      });

      if (existingStock) {
        return await this.prismaService.stock.update({
          where: { id: existingStock.id },
          data: { quantity: productData.quantity },
        });
      } else {
        return await this.prismaService.product.update({
          where: { id: id },
          data: {
            stock: {
              create: productData,
            },
          },
        });
      }
    } catch (error) {
      if (error.code === 'P2025') {
        throw new BadRequestException("Product doesn't exist");
      } else {
        throw new InternalServerErrorException('An unexpected error occurred.');
      }
    }
  }
}
