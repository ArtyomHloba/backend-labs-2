import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { User } from '../entities/user.entity'
import { CreateUserDto } from './create-user.dto'
import { paginate, PaginateQuery } from 'nestjs-paginate'

@Injectable()
export class UsersService {
  constructor (
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findAll (query: PaginateQuery) {
    return paginate(query, this.userRepository, {
      sortableColumns: ['id', 'email'],
      defaultSortBy: [['id', 'ASC']],
      searchableColumns: ['email'],
    })
  }

  async create (createUserDto: CreateUserDto): Promise<User> {
    const newUser = this.userRepository.create(createUserDto)
    return this.userRepository.save(newUser)
  }
}
