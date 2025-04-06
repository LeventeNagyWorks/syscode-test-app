/// <reference types="jest" />

import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Student } from '../src/student/entities/student.entity';
import { Repository } from 'typeorm';

describe('StudentController (e2e)', () => {
  let app: INestApplication;
  let repository: Repository<Student>;
  let studentId: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();

    repository = moduleFixture.get<Repository<Student>>(getRepositoryToken(Student));
    await repository.clear(); // Tisztítjuk az adatbázist a tesztek előtt
  });

  afterAll(async () => {
    await repository.clear(); // Tisztítjuk az adatbázist a tesztek után
    await app.close();
  });

  describe('/students (POST)', () => {
    it('should create a new student', () => {
      return request(app.getHttpServer())
        .post('/students')
        .send({
          name: 'John Doe',
          email: 'john@example.com',
        })
        .expect(201)
        .expect((res) => {
          expect(res.body).toHaveProperty('id');
          expect(res.body.name).toBe('John Doe');
          expect(res.body.email).toBe('john@example.com');
          studentId = res.body.id; // Elmentjük az ID-t későbbi tesztekhez
        });
    });

    it('should validate email format', () => {
      return request(app.getHttpServer())
        .post('/students')
        .send({
          name: 'Invalid Email',
          email: 'invalid-email',
        })
        .expect(400);
    });

    it('should require name and email', () => {
      return request(app.getHttpServer())
        .post('/students')
        .send({})
        .expect(400);
    });
  });

  describe('/students (GET)', () => {
    it('should return all students', () => {
      return request(app.getHttpServer())
        .get('/students')
        .expect(200)
        .expect((res) => {
          expect(Array.isArray(res.body)).toBe(true);
          expect(res.body.length).toBeGreaterThan(0);
          expect(res.body[0]).toHaveProperty('id');
          expect(res.body[0]).toHaveProperty('name');
          expect(res.body[0]).toHaveProperty('email');
        });
    });
  });

  describe('/students/:id (GET)', () => {
    it('should return a student by id', () => {
      return request(app.getHttpServer())
        .get(`/students/${studentId}`)
        .expect(200)
        .expect((res) => {
          expect(res.body).toHaveProperty('id', studentId);
          expect(res.body).toHaveProperty('name', 'John Doe');
          expect(res.body).toHaveProperty('email', 'john@example.com');
        });
    });

    it('should return 404 for non-existent student', () => {
      return request(app.getHttpServer())
        .get('/students/00000000-0000-0000-0000-000000000000')
        .expect(404);
    });
  });

  describe('/students/:id (PUT)', () => {
    it('should update a student', () => {
      return request(app.getHttpServer())
        .put(`/students/${studentId}`)
        .send({
          name: 'John Updated',
        })
        .expect(200)
        .expect((res) => {
          expect(res.body).toHaveProperty('id', studentId);
          expect(res.body).toHaveProperty('name', 'John Updated');
          expect(res.body).toHaveProperty('email', 'john@example.com');
        });
    });

    it('should validate email format on update', () => {
      return request(app.getHttpServer())
        .put(`/students/${studentId}`)
        .send({
          email: 'invalid-email',
        })
        .expect(400);
    });

    it('should return 404 for non-existent student', () => {
      return request(app.getHttpServer())
        .put('/students/00000000-0000-0000-0000-000000000000')
        .send({
          name: 'Non-existent Student',
        })
        .expect(404);
    });
  });

  describe('/students/:id (DELETE)', () => {
    it('should delete a student', () => {
      return request(app.getHttpServer())
        .delete(`/students/${studentId}`)
        .expect(200);
    });

    it('should return 404 after deletion', () => {
      return request(app.getHttpServer())
        .get(`/students/${studentId}`)
        .expect(404);
    });
  });
});
