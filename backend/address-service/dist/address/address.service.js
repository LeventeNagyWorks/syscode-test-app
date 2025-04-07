"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddressService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const address_entity_1 = require("./entities/address.entity");
const uuid_1 = require("uuid");
const logger_service_1 = require("../logger/logger.service");
let AddressService = class AddressService {
    constructor(addressRepository, logger) {
        this.addressRepository = addressRepository;
        this.logger = logger;
    }
    async create(createAddressDto) {
        this.logger.log(`Creating new address: ${JSON.stringify(createAddressDto)}`, 'AddressService');
        const address = this.addressRepository.create({
            ...createAddressDto,
            id: (0, uuid_1.v4)(),
        });
        const savedAddress = await this.addressRepository.save(address);
        this.logger.log(`Address created with ID: ${savedAddress.id}`, 'AddressService');
        return savedAddress;
    }
    async findAll() {
        this.logger.log('Fetching all addresses', 'AddressService');
        return this.addressRepository.find();
    }
    async findOne(id) {
        this.logger.log(`Fetching address with ID: ${id}`, 'AddressService');
        const address = await this.addressRepository.findOne({ where: { id } });
        if (!address) {
            this.logger.error(`Address with ID ${id} not found`, '', 'AddressService');
            throw new common_1.NotFoundException(`Address with ID ${id} not found`);
        }
        return address;
    }
    async update(id, updateAddressDto) {
        this.logger.log(`Updating address with ID: ${id}`, 'AddressService');
        const address = await this.findOne(id);
        this.addressRepository.merge(address, updateAddressDto);
        const updatedAddress = await this.addressRepository.save(address);
        this.logger.log(`Address with ID: ${id} updated successfully`, 'AddressService');
        return updatedAddress;
    }
    async remove(id) {
        this.logger.log(`Removing address with ID: ${id}`, 'AddressService');
        const address = await this.findOne(id);
        await this.addressRepository.remove(address);
        this.logger.log(`Address with ID: ${id} removed successfully`, 'AddressService');
    }
    generateRandomAddress() {
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
        const address = new address_entity_1.Address();
        address.id = (0, uuid_1.v4)();
        address.address = randomAddress;
        this.logger.log(`Random address generated: ${randomAddress}`, 'AddressService');
        return address;
    }
};
exports.AddressService = AddressService;
exports.AddressService = AddressService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(address_entity_1.Address)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        logger_service_1.LoggerService])
], AddressService);
//# sourceMappingURL=address.service.js.map