import { IsNotEmpty, IsUUID } from 'class-validator';
import { ProductOnOrders } from '@prisma/client';

export class CreateOrderDTO {
  @IsNotEmpty()
  products: ProductOnOrders[];

  @IsNotEmpty()
  @IsUUID(4)
  userId: string;
}
