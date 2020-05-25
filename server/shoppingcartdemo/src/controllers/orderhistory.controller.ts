import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getFilterSchemaFor,
  getModelSchemaRef,
  getWhereSchemaFor,
  patch,
  put,
  del,
  requestBody,
} from '@loopback/rest';
import {Orderhistory} from '../models';
import {OrderhistoryRepository} from '../repositories';

export class OrderhistoryController {
  constructor(
    @repository(OrderhistoryRepository)
    public orderhistoryRepository : OrderhistoryRepository,
  ) {}

  @post('/orderhistories', {
    responses: {
      '200': {
        description: 'Orderhistory model instance',
        content: {'application/json': {schema: getModelSchemaRef(Orderhistory)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Orderhistory, {
            title: 'NewOrderhistory',
            exclude: ['id'],
          }),
        },
      },
    })
    orderhistory: Omit<Orderhistory, 'id'>,
  ): Promise<Orderhistory> {
    return this.orderhistoryRepository.create(orderhistory);
  }

  @get('/orderhistories/count', {
    responses: {
      '200': {
        description: 'Orderhistory model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(Orderhistory) where?: Where<Orderhistory>,
  ): Promise<Count> {
    return this.orderhistoryRepository.count(where);
  }

  @get('/orderhistories', {
    responses: {
      '200': {
        description: 'Array of Orderhistory model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Orderhistory, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(Orderhistory) filter?: Filter<Orderhistory>,
  ): Promise<Orderhistory[]> {
    return this.orderhistoryRepository.find(filter);
  }

  @patch('/orderhistories', {
    responses: {
      '200': {
        description: 'Orderhistory PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Orderhistory, {partial: true}),
        },
      },
    })
    orderhistory: Orderhistory,
    @param.where(Orderhistory) where?: Where<Orderhistory>,
  ): Promise<Count> {
    return this.orderhistoryRepository.updateAll(orderhistory, where);
  }

  @get('/orderhistories/{id}', {
    responses: {
      '200': {
        description: 'Orderhistory model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Orderhistory, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Orderhistory, {exclude: 'where'}) filter?: FilterExcludingWhere<Orderhistory>
  ): Promise<Orderhistory> {
    return this.orderhistoryRepository.findById(id, filter);
  }

  @patch('/orderhistories/{id}', {
    responses: {
      '204': {
        description: 'Orderhistory PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Orderhistory, {partial: true}),
        },
      },
    })
    orderhistory: Orderhistory,
  ): Promise<void> {
    await this.orderhistoryRepository.updateById(id, orderhistory);
  }

  @put('/orderhistories/{id}', {
    responses: {
      '204': {
        description: 'Orderhistory PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() orderhistory: Orderhistory,
  ): Promise<void> {
    await this.orderhistoryRepository.replaceById(id, orderhistory);
  }

  @del('/orderhistories/{id}', {
    responses: {
      '204': {
        description: 'Orderhistory DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.orderhistoryRepository.deleteById(id);
  }
}
