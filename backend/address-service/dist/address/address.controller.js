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
exports.AddressController = void 0;
const common_1 = require("@nestjs/common");
const address_service_1 = require("./address.service");
const address_entity_1 = require("./entities/address.entity");
const create_address_dto_1 = require("./dto/create-address.dto");
const update_address_dto_1 = require("./dto/update-address.dto");
const basic_auth_guard_1 = require("../auth/basic-auth.guard");
const logger_service_1 = require("../logger/logger.service");
let AddressController = class AddressController {
    constructor(addressService, logger) {
        this.addressService = addressService;
        this.logger = logger;
    }
    create(createAddressDto) {
        this.logger.log('POST /addresses request received', 'AddressController');
        return this.addressService.create(createAddressDto);
    }
    findAll(page = 1, limit = 100) {
        this.logger.log(`GET /addresses request received with page=${page}, limit=${limit}`, 'AddressController');
        return this.addressService.findAll(page, limit);
    }
    count() {
        this.logger.log('GET /addresses/count request received', 'AddressController');
        return this.addressService.count();
    }
    getRandomAddress() {
        this.logger.log('GET /addresses/random request received', 'AddressController');
        return this.addressService.generateRandomAddress();
    }
    findOne(id) {
        this.logger.log(`GET /addresses/${id} request received`, 'AddressController');
        return this.addressService.findOne(id);
    }
    update(id, updateAddressDto) {
        this.logger.log(`PUT /addresses/${id} request received`, 'AddressController');
        return this.addressService.update(id, updateAddressDto);
    }
    remove(id) {
        this.logger.log(`DELETE /addresses/${id} request received`, 'AddressController');
        return this.addressService.remove(id);
    }
    findByProfileId(profileId, page = 1, limit = 100) {
        this.logger.log(`GET /addresses/profile/${profileId} request received`, 'AddressController');
        return this.addressService.findByProfileId(profileId, page, limit);
    }
    findOneByProfileId(profileId) {
        this.logger.log(`GET /addresses/profile/${profileId}/single request received`, 'AddressController');
        return this.addressService.findOneByProfileId(profileId);
    }
};
exports.AddressController = AddressController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(basic_auth_guard_1.BasicAuthGuard),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_address_dto_1.CreateAddressDto]),
    __metadata("design:returntype", Promise)
], AddressController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, common_1.UseGuards)(basic_auth_guard_1.BasicAuthGuard),
    __param(0, (0, common_1.Query)('page')),
    __param(1, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], AddressController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('count'),
    (0, common_1.UseGuards)(basic_auth_guard_1.BasicAuthGuard),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AddressController.prototype, "count", null);
__decorate([
    (0, common_1.Get)('random'),
    (0, common_1.UseGuards)(basic_auth_guard_1.BasicAuthGuard),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", address_entity_1.Address)
], AddressController.prototype, "getRandomAddress", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, common_1.UseGuards)(basic_auth_guard_1.BasicAuthGuard),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AddressController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, common_1.UseGuards)(basic_auth_guard_1.BasicAuthGuard),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_address_dto_1.UpdateAddressDto]),
    __metadata("design:returntype", Promise)
], AddressController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.UseGuards)(basic_auth_guard_1.BasicAuthGuard),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AddressController.prototype, "remove", null);
__decorate([
    (0, common_1.Get)('profile/:profileId'),
    (0, common_1.UseGuards)(basic_auth_guard_1.BasicAuthGuard),
    __param(0, (0, common_1.Param)('profileId')),
    __param(1, (0, common_1.Query)('page')),
    __param(2, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number, Number]),
    __metadata("design:returntype", Promise)
], AddressController.prototype, "findByProfileId", null);
__decorate([
    (0, common_1.Get)('profile/:profileId/single'),
    (0, common_1.UseGuards)(basic_auth_guard_1.BasicAuthGuard),
    __param(0, (0, common_1.Param)('profileId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AddressController.prototype, "findOneByProfileId", null);
exports.AddressController = AddressController = __decorate([
    (0, common_1.Controller)('addresses'),
    __metadata("design:paramtypes", [address_service_1.AddressService,
        logger_service_1.LoggerService])
], AddressController);
//# sourceMappingURL=address.controller.js.map