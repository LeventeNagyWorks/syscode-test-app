"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const common_1 = require("@nestjs/common");
const request = require("supertest");
const app_module_1 = require("../src/app.module");
const typeorm_1 = require("@nestjs/typeorm");
const student_entity_1 = require("../src/student/entities/student.entity");
describe('StudentController (e2e)', () => {
    let app;
    let repository;
    let studentId;
    beforeAll(async () => {
        const moduleFixture = await testing_1.Test.createTestingModule({
            imports: [app_module_1.AppModule],
        }).compile();
        app = moduleFixture.createNestApplication();
        app.useGlobalPipes(new common_1.ValidationPipe());
        await app.init();
        repository = moduleFixture.get((0, typeorm_1.getRepositoryToken)(student_entity_1.Student));
        await repository.clear();
    });
    afterAll(async () => {
        await repository.clear();
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
                studentId = res.body.id;
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
//# sourceMappingURL=student.e2e-spec.js.map