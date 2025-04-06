/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/unbound-method */
/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { AddressController } from './address.controller';
import { AddressService } from './address.service';
import { Address } from './entities/address.entity';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';

const mockAddressService = () => ({
  create: jest.fn(),
  findAll: jest.fn(),
  findOne: jest.fn(),
  update: jest.fn(),
  remove: jest.fn(),
  generateRandomAddress: jest.fn(),
});

describe('AddressController', () => {
  let controller: AddressController;
  let service: AddressService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AddressController],
      providers: [
        {
          provide: AddressService,
          useFactory: mockAddressService,
        },
      ],
    }).compile();

    controller = module.get<AddressController>(AddressController);
    service = module.get<AddressService>(AddressService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a new address', async () => {
      const createAddressDto: CreateAddressDto = { address: '123 Main St' };
      const address: Address = { id: 'uuid', address: '123 Main St' };

      jest.spyOn(service, 'create').mockResolvedValue(address);

      expect(await controller.create(createAddressDto)).toEqual(address);
      expect(service.create).toHaveBeenCalledWith(createAddressDto);
    });
  });

  describe('findAll', () => {
    it('should return an array of addresses', async () => {
      const addresses: Address[] = [
        { id: 'uuid1', address: '123 Main St' },
        { id: 'uuid2', address: '456 Oak Ave' },
      ];

      jest.spyOn(service, 'findAll').mockResolvedValue(addresses);

      expect(await controller.findAll()).toEqual(addresses);
      expect(service.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a single address', async () => {
      const id = 'uuid';
      const address: Address = { id, address: '123 Main St' };

      jest.spyOn(service, 'findOne').mockResolvedValue(address);

      expect(await controller.findOne(id)).toEqual(address);
      expect(service.findOne).toHaveBeenCalledWith(id);
    });
  });

  describe('update', () => {
    it('should update an address', async () => {
      const id = 'uuid';
      const updateAddressDto: UpdateAddressDto = { address: '456 Oak Ave' };
      const address: Address = { id, address: '456 Oak Ave' };

      jest.spyOn(service, 'update').mockResolvedValue(address);

      expect(await controller.update(id, updateAddressDto)).toEqual(address);
      expect(service.update).toHaveBeenCalledWith(id, updateAddressDto);
    });
  });

  describe('remove', () => {
    it('should remove an address', async () => {
      const id = 'uuid';

      jest.spyOn(service, 'remove').mockResolvedValue(undefined);

      await controller.remove(id);
      expect(service.remove).toHaveBeenCalledWith(id);
    });
  });

  describe('getRandomAddress', () => {
    it('should return a random address', () => {
      const address: Address = { id: 'uuid', address: '123 Main St' };

      jest.spyOn(service, 'generateRandomAddress').mockReturnValue(address);

      expect(controller.getRandomAddress()).toEqual(address);
      expect(service.generateRandomAddress).toHaveBeenCalled();
    });
  });
});
