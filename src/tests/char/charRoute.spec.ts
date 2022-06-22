import supertest from 'supertest'
import { connection, generateChar, generateNotAdmin, generateToken } from '..'
import app from '../../app'
import { spriteRepository, userRepository } from '../../repositories'

describe('Test all character related routes', () => {
  beforeAll(async () => {
    await connection.connect()
  })
  afterAll(async () => {
    await connection.disconnect()
  })
  // beforeEach(async () => {
  //   await connection.clear()
  // })

  describe('Character creation', () => {
    it('Should create a new character successfully | Status Code: 201', async () => {
      const user = await userRepository.save({ ...generateNotAdmin() })
      const token = generateToken({ ...user })
      const char = generateChar()
      const sprite = await spriteRepository.save({
        url: char.spriteId,
        name: 'Char Sprite',
      })
      char.spriteId = sprite.id
      const { statusCode, body } = await supertest(app)
        .post('/api/chars/admin')
        .send({ ...char })
        .set('Authorization', 'token: ' + token)

      expect(statusCode).toBe(201)
      expect(body).toHaveProperty('name', char.name)
      expect(body).toHaveProperty('status', expect.any(Object))
      expect(body).toHaveProperty('sprite', expect.any(Object))
      expect(body).toHaveProperty('attacks', expect.any(Array))
      expect(body).toHaveProperty('id', expect.any(String))
      expect(body).toHaveProperty('token', null)
      expect(body.attacks).toHaveLength(0)
    })

    it('Should fail to create new character | Status Code: 404', async () => {
      const char = generateChar()
      const sprite = await spriteRepository.save({
        url: char.spriteId,
        name: 'Char Sprites',
      })
      char.spriteId = sprite.id

      const { statusCode, body } = await supertest(app)
        .post('/api/chars')
        .send({ ...char })

      expect(statusCode).toBe(404)
      expect(body).toHaveProperty('error', 'Missing authorization token.')
    })
  })
})
