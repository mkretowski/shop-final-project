import { IsNotEmpty } from 'class-validator';

import { ProductOnOrders } from '@prisma/client';

export class UpdateOrderDTO {
  @IsNotEmpty()
  products: ProductOnOrders[];
}
