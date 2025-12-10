import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { BrandsService } from './brands.service';

@Controller('brands')
export class BrandsController {
  constructor(private service: BrandsService) {}

  @Post()
  create(@Body('name') name: string) {
    return this.service.create(name);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(+id);
  }
}
