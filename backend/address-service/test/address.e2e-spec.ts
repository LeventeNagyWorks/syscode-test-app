/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Address } from '../src/address/entities/address.entity';
import { Repository } from 'typeorm';

describe('AddressController (e2e)', () => {
  let app: INestApplication;
  let addressRepository: Repository<Address>;
  let authHeader: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();

    addressRepository = moduleFixture.get<Repository<Address>>(
      getRepositoryToken(Address),
    );

    // Basic auth credentials
    authHeader = 'Basic ' + Buffer.from('admin:password').toString('base64');
  });

  beforeEach(async () => {
    // Clear the database before each test
    await addressRepository.clear();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('/addresses (POST)', () => {
    it('should create a new address', () => {
      return request(app.getHttpServer())
        .post('/addresses')
        .set('Authorization', authHeader)
        .send({ address: '123 Main St' })
        .expect(201)
        .then((response) => {
          expect(response.body).toHaveProperty('id');
          expect(response.body.address).toBe('123 Main St');
        });
    });

    it('should return 400 if address is missing', () => {
      return request(app.getHttpServer())
        .post('/addresses')
        .set('Authorization', authHeader)
        .send({})
        .expect(400);
    });

    it('should return 401 if not authenticated', () => {
      return request(app.getHttpServer())
        .post('/addresses')
        .send({ address: '123 Main St' })
        .expect(401);
    });
  });

  describe('/addresses (GET)', () => {
    it('should return an array of addresses', async () => {
      // Create some test addresses
      const address1 = addressRepository.create({ address: '123 Main St' });
      const address2 = addressRepository.create({ address: '456 Oak Ave' });
      await addressRepository.save([address1, address2]);

      return request(app.getHttpServer())
        .get('/addresses')
        .set('Authorization', authHeader)
        .expect(200)
        .then((response) => {
          expect(Array.isArray(response.body)).toBe(true);
          expect(response.body.length).toBe(2);
          expect(response.body[0].address).toBe('123 Main St');
          expect(response.body[1].address).toBe('456 Oak Ave');
        });
    });

    it('should return 401 if not authenticated', () => {
      return request(app.getHttpServer()).get('/addresses').expect(401);
    });
  });

  describe('/addresses/:id (GET)', () => {
    it('should return a single address', async () => {
      const address = addressRepository.create({ address: '123 Main St' });
      await addressRepository.save(address);

      return request(app.getHttpServer())
        .get(`/addresses/${address.id}`)
        .set('Authorization', authHeader)
        .expect(200)
        .then((response) => {
          expect(response.body.id).toBe(address.id);
          expect(response.body.address).toBe('123 Main St');
        });
    });

    it('should return 404 if address not found', () => {
      return request(app.getHttpServer())
        .get('/addresses/non-existent-id')
        .set('Authorization', authHeader)
        .expect(404);
    });

    it('should return 401 if not authenticated', async () => {
      const address = addressRepository.create({ address: '123 Main St' });
      await addressRepository.save(address);

      return request(app.getHttpServer())
        .get(`/addresses/${address.id}`)
        .expect(401);
    });
  });

  describe('/addresses/:id (PUT)', () => {
    it('should update an address', async () => {
      const address = addressRepository.create({ address: '123 Main St' });
      await addressRepository.save(address);

      return request(app.getHttpServer())
        .put(`/addresses/${address.id}`)
        .set('Authorization', authHeader)
        .send({ address: '456 Oak Ave' })
        .expect(200)
        .then((response) => {
          expect(response.body.id).toBe(address.id);
          expect(response.body.address).toBe('456 Oak Ave');
        });
    });

    it('should return 404 if address not found', () => {
      return request(app.getHttpServer())
        .put('/addresses/non-existent-id')
        .set('Authorization', authHeader)
        .send({ address: '456 Oak Ave' })
        .expect(404);
    });

    it('should return 401 if not authenticated', async () => {
      const address = addressRepository.create({ address: '123 Main St' });
      await addressRepository.save(address);

      return request(app.getHttpServer())
        .put(`/addresses/${address.id}`)
        .send({ address: '456 Oak Ave' })
        .expect(401);
    });
  });

  describe('/addresses/:id (DELETE)', () => {
    it('should delete an address', async () => {
      const address = addressRepository.create({ address: '123 Main St' });
      await addressRepository.save(address);

      return request(app.getHttpServer())
        .delete(`/addresses/${address.id}`)
        .set('Authorization', authHeader)
        .expect(200)
        .then(async () => {
          const found = await addressRepository.findOne({
            where: { id: address.id },
          });
          expect(found).toBeNull();
        });
    });

    it('should return 404 if address not found', () => {
      return request(app.getHttpServer())
        .delete('/addresses/non-existent-id')
        .set('Authorization', authHeader)
        .expect(404);
    });

    it('should return 401 if not authenticated', async () => {
      const address = addressRepository.create({ address: '123 Main St' });
      await addressRepository.save(address);

      return request(app.getHttpServer())
        .delete(`/addresses/${address.id}`)
        .expect(401);
    });
  });

  describe('/addresses/random (GET)', () => {
    it('should return a random address', () => {
      return request(app.getHttpServer())
        .get('/addresses/random')
        .set('Authorization', authHeader)
        .expect(200)
        .then((response) => {
          expect(response.body).toHaveProperty('id');
          expect(response.body).toHaveProperty('address');
          expect(typeof response.body.address).toBe('string');
        });
    });

    it('should return 401 if not authenticated', () => {
      return request(app.getHttpServer()).get('/addresses/random').expect(401);
    });
  });
});
