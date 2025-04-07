import { Repository } from 'typeorm';
import { Address } from './entities/address.entity';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { LoggerService } from '../logger/logger.service';
export declare class AddressService {
    private addressRepository;
    private logger;
    constructor(addressRepository: Repository<Address>, logger: LoggerService);
    create(createAddressDto: CreateAddressDto): Promise<Address>;
    findAll(page?: number, limit?: number): Promise<Address[]>;
    count(): Promise<number>;
    findOne(id: string): Promise<Address>;
    update(id: string, updateAddressDto: UpdateAddressDto): Promise<Address>;
    remove(id: string): Promise<void>;
    findByProfileId(profileId: string, page?: number, limit?: number): Promise<Address[]>;
    findOneByProfileId(profileId: string): Promise<Address>;
    generateRandomAddress(): Address;
}
