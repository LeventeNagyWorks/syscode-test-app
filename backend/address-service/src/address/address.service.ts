/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Address } from './entities/address.entity';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { v4 as uuidv4 } from 'uuid';
import { LoggerService } from '../logger/logger.service';

@Injectable()
export class AddressService {
  constructor(
    @InjectRepository(Address)
    private addressRepository: Repository<Address>,
    private logger: LoggerService,
  ) {}

  async create(createAddressDto: CreateAddressDto): Promise<Address> {
    this.logger.log(
      `Creating new address: ${JSON.stringify(createAddressDto)}`,
      'AddressService',
    );

    // Create a new address entity and explicitly set the UUID
    const address = this.addressRepository.create({
      ...createAddressDto,
      id: uuidv4(), // Explicitly set the UUID
    });

    const savedAddress = await this.addressRepository.save(address);
    this.logger.log(
      `Address created with ID: ${savedAddress.id}`,
      'AddressService',
    );
    return savedAddress;
  }

  async findAll(): Promise<Address[]> {
    this.logger.log('Fetching all addresses', 'AddressService');
    return this.addressRepository.find();
  }

  async findOne(id: string): Promise<Address> {
    this.logger.log(`Fetching address with ID: ${id}`, 'AddressService');
    const address = await this.addressRepository.findOne({ where: { id } });
    if (!address) {
      this.logger.error(
        `Address with ID ${id} not found`,
        '',
        'AddressService',
      );
      throw new NotFoundException(`Address with ID ${id} not found`);
    }
    return address;
  }

  async update(
    id: string,
    updateAddressDto: UpdateAddressDto,
  ): Promise<Address> {
    this.logger.log(`Updating address with ID: ${id}`, 'AddressService');
    const address = await this.findOne(id);
    this.addressRepository.merge(address, updateAddressDto);
    const updatedAddress = await this.addressRepository.save(address);
    this.logger.log(
      `Address with ID: ${id} updated successfully`,
      'AddressService',
    );
    return updatedAddress;
  }

  async remove(id: string): Promise<void> {
    this.logger.log(`Removing address with ID: ${id}`, 'AddressService');
    const address = await this.findOne(id);
    await this.addressRepository.remove(address);
    this.logger.log(
      `Address with ID: ${id} removed successfully`,
      'AddressService',
    );
  }

  // Opcionális: Random cím generálása
  generateRandomAddress(): Address {
    this.logger.log('Generating random address', 'AddressService');
    const streets = ['Main St', 'Broadway', 'Park Ave', 'Oak St', 'Maple Ave'];
    const cities = ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix'];
    const states = ['NY', 'CA', 'IL', 'TX', 'AZ'];
    const streetNumber = Math.floor(Math.random() * 1000) + 1;
    const street = streets[Math.floor(Math.random() * streets.length)];
    const city = cities[Math.floor(Math.random() * cities.length)];
    const state = states[Math.floor(Math.random() * states.length)];
    const zipCode = Math.floor(Math.random() * 90000) + 10000;
    const randomAddress = `${streetNumber} ${street}, ${city}, ${state} ${zipCode}`;
    const address = new Address();
    address.id = uuidv4();
    address.address = randomAddress;
    this.logger.log(
      `Random address generated: ${randomAddress}`,
      'AddressService',
    );
    return address;
  }
}
