import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDTO } from './dtos/create-product.dto';
import { ParseUUIDPipe } from '@nestjs/common';
import { UpdateProductDTO } from './dtos/update-product.dto';
import { AdminAuthGuard } from 'src/auth/admin-auth.guard';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}
  @Get('/')
  getAll(): any {
    return this.productsService.getAll();
  }
  @Get('/:id')
  async getById(@Param('id', new ParseUUIDPipe()) id: string) {
    const prod = await this.productsService.getById(id);
    if (!prod) throw new NotFoundException('Product not found.');
    return prod;
  }
  @Delete('/:id')
  @UseGuards(AdminAuthGuard)
  @UseGuards(JwtAuthGuard)
  async deleteById(@Param('id', new ParseUUIDPipe()) id: string) {
    if (!(await this.productsService.getById(id)))
      throw new NotFoundException('Product not found.');
    await this.productsService.deleteById(id);
    return { success: true };
  }
  @Post('/')
  @UseGuards(AdminAuthGuard)
  @UseGuards(JwtAuthGuard)
  create(@Body() productData: CreateProductDTO) {
    return this.productsService.create(productData);
  }
  @Put('/:id')
  @UseGuards(AdminAuthGuard)
  @UseGuards(JwtAuthGuard)
  async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() productData: UpdateProductDTO,
  ) {
    if (!(await this.productsService.getById(id)))
      throw new NotFoundException('Product not found.');

    await this.productsService.updateById(id, productData);
    return { success: true };
  }
  @Put('/stock/:id')
  @UseGuards(AdminAuthGuard)
  @UseGuards(JwtAuthGuard)
  updateStock(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() productData: { productId: string; size: string; quantity: number },
  ) {
    return this.productsService.updateStock(id, productData);
  }
}
