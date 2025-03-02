import { DataSource } from 'typeorm'
import { User } from './src/entities/user.entity'
import { Product } from './src/entities/product.entity'

const dataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: '2323',
  database: 'backend_labs',
  entities: [User, Product],
  synchronize: true,
})

async function seedDatabase () {
  await dataSource.initialize()

  const userRepository = dataSource.getRepository(User)
  const productRepository = dataSource.getRepository(Product)

  await userRepository.insert([
    { email: 'user1@example.com', password: 'password1' },
    { email: 'user2@example.com', password: 'password2' },
  ])

  await productRepository.insert([
    { name: 'Product A', price: 100 },
    { name: 'Product B', price: 200 },
  ])

  console.log('✅ Test data inserted successfully!')
  await dataSource.destroy()
}

seedDatabase().catch(error => console.error(error))
