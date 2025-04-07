/* eslint-disable prettier/prettier */
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { AddressService } from './address.service';
import { Address } from './entities/address.entity';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { BasicAuthGuard } from '../auth/basic-auth.guard';
import { LoggerService } from '../logger/logger.service';

@Controller('addresses')
export class AddressController {
  constructor(
    private readonly addressService: AddressService,
    private readonly logger: LoggerService,
  ) {}

  @Post()
  @UseGuards(BasicAuthGuard)
  create(@Body() createAddressDto: CreateAddressDto): Promise<Address> {
    this.logger.log('POST /addresses request received', 'AddressController');
    return this.addressService.create(createAddressDto);
  }

  @Get()
  @UseGuards(BasicAuthGuard)
  findAll(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 100,
  ): Promise<Address[]> {
    this.logger.log(
      `GET /addresses request received with page=${page}, limit=${limit}`,
      'AddressController',
    );
    return this.addressService.findAll(page, limit);
  }

  // Move these endpoints BEFORE the :id endpoint
  @Get('count')
  @UseGuards(BasicAuthGuard)
  count(): Promise<number> {
    this.logger.log(
      'GET /addresses/count request received',
      'AddressController',
    );
    return this.addressService.count();
  }

  @Get('random')
  @UseGuards(BasicAuthGuard)
  getRandomAddress(): Address {
    this.logger.log(
      'GET /addresses/random request received',
      'AddressController',
    );
    return this.addressService.generateRandomAddress();
  }

  // This should come AFTER the specific routes
  @Get(':id')
  @UseGuards(BasicAuthGuard)
  findOne(@Param('id') id: string): Promise<Address> {
    this.logger.log(
      `GET /addresses/${id} request received`,
      'AddressController',
    );
    return this.addressService.findOne(id);
  }

  @Put(':id')
  @UseGuards(BasicAuthGuard)
  update(
    @Param('id') id: string,
    @Body() updateAddressDto: UpdateAddressDto,
  ): Promise<Address> {
    this.logger.log(
      `PUT /addresses/${id} request received`,
      'AddressController',
    );
    return this.addressService.update(id, updateAddressDto);
  }

  @Delete(':id')
  @UseGuards(BasicAuthGuard)
  remove(@Param('id') id: string): Promise<void> {
    this.logger.log(
      `DELETE /addresses/${id} request received`,
      'AddressController',
    );
    return this.addressService.remove(id);
  }

  @Get('profile/:profileId')
  @UseGuards(BasicAuthGuard)
  findByProfileId(
    @Param('profileId') profileId: string,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 100,
  ): Promise<Address[]> {
    this.logger.log(
      `GET /addresses/profile/${profileId} request received`,
      'AddressController',
    );
    return this.addressService.findByProfileId(profileId, page, limit);
  }

  @Get('profile/:profileId/single')
  @UseGuards(BasicAuthGuard)
  findOneByProfileId(@Param('profileId') profileId: string): Promise<Address> {
    this.logger.log(
      `GET /addresses/profile/${profileId}/single request received`,
      'AddressController',
    );
    return this.addressService.findOneByProfileId(profileId);
  }
}
