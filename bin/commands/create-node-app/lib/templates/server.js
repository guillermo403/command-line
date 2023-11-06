import express from 'express'
import router from './routes/helloWorld%%ext'

export const start = () => {
  const app = express()

  app.use(express.json())

  app.use('/api/v1', router)

  app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000')
  })
}
