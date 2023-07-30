import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Order } from '@prisma/client';
import { CreateOrderDTO } from './dtos/create-order.dto';
import { UpdateOrderDTO } from './dtos/update-order.dto';

@Injectable()
export class OrdersService {
  constructor(private prismaService: PrismaService) {}
  public getAll(): Promise<Order[]> {
    return this.prismaService.order.findMany({
      include: {
        products: true,
      },
    });
  }
  public getById(id: Order['id']): Promise<Order | null> {
    return this.prismaService.order.findUnique({
      where: { id },
      include: {
        products: true,
      },
    });
  }
  public deleteById(id: Order['id']): Promise<Order> {
    return this.prismaService.order.delete({
      where: { id },
    });
  }
  public async create(orderData: CreateOrderDTO): Promise<Order> {
    const { userId, products } = orderData;
    try {
      return await this.prismaService.order.create({
        data: {
          user: { connect: { id: userId } },
          products: {
            create: products.map((product) => ({
              product: { connect: { id: product.productId } },
              quantity: product.quantity,
            })),
          },
        },
      });
    } catch (error) {
      if (error.code === 'P2025') {
        throw new BadRequestException("Product doesn't exist.");
      } else {
        throw new InternalServerErrorException('An unexpected error occurred.');
      }
    }
  }
  public async updateById(
    id: Order['id'],
    orderData: UpdateOrderDTO,
  ): Promise<Order> {
    const { products } = orderData;
    try {
      await this.prismaService.productOnOrders.deleteMany({
        where: { orderId: id },
      });

      return await this.prismaService.order.update({
        where: { id: id },
        data: {
          products: {
            create: products.map((product) => ({
              product: { connect: { id: product.productId } },
              quantity: product.quantity,
            })),
          },
        },
      });
    } catch (error) {
      if (error.code === 'P2025') {
        throw new BadRequestException("Product doesn't exist.");
      } else {
        throw new InternalServerErrorException('An unexpected error occurred.');
      }
    }
  }
}
