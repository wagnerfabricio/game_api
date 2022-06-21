import supertest from 'supertest'
import { validate } from 'uuid'
import {
  connection,
  generateAdmin,
  generateAttack,
  generateNotAdmin,
  generateToken,
} from '..'
import app from '../../app'
import { attackRepository, userRepository } from '../../repositories'

describe('All attacks related routes', () => {
  beforeAll(async () => {
    await connection.connect()
  })
  afterAll(async () => {
    await connection.disconnect()
  })
  beforeEach(async () => {
    await connection.clear()
  })

  describe('Attack creation', () => {
    it('Should create a new attack successfully | Status Code: 201', async () => {
      const adm = generateAdmin()
      await userRepository.save({ ...adm })
      const token = generateToken(adm)
      const newAttack = generateAttack()
      const { statusCode, body } = await supertest(app)
        .post('/api/attacks/admin')
        .send({ ...newAttack })
        .set('Authorization', 'Bearer ' + token)

      expect(statusCode).toBe(201)
      expect(body).toHaveProperty('name', newAttack.name)
      expect(body).toHaveProperty('power', newAttack.power)
      expect(body).toHaveProperty('accuracy', newAttack.accuracy)
      expect(body).toHaveProperty('hits', newAttack.hits)
      expect(body).toHaveProperty('type', newAttack.type)
      expect(body).toHaveProperty('id')
      expect(validate(body.id)).toBe(true)
    })
    it('Should fail without token | Status Code: 401', async () => {
      const newAttack = generateAttack()
      const { statusCode, body } = await supertest(app)
        .post('/api/attacks/admin')
        .send({ ...newAttack })

      expect(statusCode).toBe(401)
      expect(body).toHaveProperty('error', 'Missing authorization token.')
    })

    it('Should fail without administrative privileges | Status Code: 401', async () => {
      const user = generateNotAdmin()
      await userRepository.save({ ...user })
      const token = generateToken(user)
      const newAttack = generateAttack()
      const { statusCode, body } = await supertest(app)
        .post('/api/attacks/admin')
        .send({ ...newAttack })
        .set('Authorization', 'Bearer ' + token)
      expect(statusCode).toBe(401)
      expect(body).toHaveProperty('error', 'Need admin permission.')
    })
  })
  describe('Attack listing', () => {
    it('Should list all attacks successfully | Status Code: 200', async () => {
      const user = generateNotAdmin()
      await userRepository.save({ ...user })
      const token = generateToken(user)
      const newAttack = generateAttack()
      await attackRepository.save({ ...newAttack })
      const { statusCode, body } = await supertest(app)
        .get('/api/attacks')
        .set('Authorization', 'Bearer ' + token)

      expect(statusCode).toBe(200)
      expect(body).toBeInstanceOf(Array)
      expect(body[0]).toHaveProperty('id')
      expect(body[0]).toHaveProperty('name')
      expect(body[0]).toHaveProperty('power')
      expect(body[0]).toHaveProperty('accuracy')
      expect(body[0]).toHaveProperty('hits')
      expect(body[0]).toHaveProperty('type')
    })
    it('Should fail without token | Status Code: 401', async () => {
      const newAttack = generateAttack()
      await attackRepository.save({ ...newAttack })
      const { statusCode, body } = await supertest(app).get('/api/attacks')

      expect(statusCode).toBe(401)
      expect(body).toHaveProperty('error', 'Missing authorization token.')
    })
  })
})
