import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('Authentication system', () => {
    let app: INestApplication;

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    it('handles a signup request', () => {
        const email = 'hello1@hello.com'
        const name = 'hello'
        return request(app.getHttpServer())
            .post('/signup')
            .send({ name, password: 'hello12345', email: email })
            .expect(201)
            .then((res) => {
                const { id, name, email } = res.body
                expect(id).toBeDefined()
                expect(email).toEqual(email)
                expect(name).toEqual(name)
            })
    });
});
