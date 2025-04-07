import { AddressService } from './address.service';
import { Address } from './entities/address.entity';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { LoggerService } from '../logger/logger.service';
export declare class AddressController {
    private readonly addressService;
    private readonly logger;
    constructor(addressService: AddressService, logger: LoggerService);
    create(createAddressDto: CreateAddressDto): Promise<Address>;
    findAll(page?: number, limit?: number): Promise<Address[]>;
    count(): Promise<number>;
    getRandomAddress(): Address;
    findOne(id: string): Promise<Address>;
    update(id: string, updateAddressDto: UpdateAddressDto): Promise<Address>;
    remove(id: string): Promise<void>;
}
