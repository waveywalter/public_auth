import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getFilterSchemaFor,
  getWhereSchemaFor,
  patch,
  put,
  del,
  requestBody,
} from '@loopback/rest';
import {BadSubmission} from '../models';
import {BadSubmissionRepository} from '../repositories';

export class BadSubmissionController {
  constructor(
    @repository(BadSubmissionRepository)
    public badSubmissionRepository : BadSubmissionRepository,
  ) {}

  @post('/bad-submissions', {
    responses: {
      '200': {
        description: 'BadSubmission model instance',
        content: {'application/json': {schema: {'x-ts-type': BadSubmission}}},
      },
    },
  })
  async create(@requestBody() badSubmission: BadSubmission): Promise<BadSubmission> {
    return await this.badSubmissionRepository.create(badSubmission);
  }

  @get('/bad-submissions/count', {
    responses: {
      '200': {
        description: 'BadSubmission model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(BadSubmission)) where?: Where,
  ): Promise<Count> {
    return await this.badSubmissionRepository.count(where);
  }

  @get('/bad-submissions', {
    responses: {
      '200': {
        description: 'Array of BadSubmission model instances',
        content: {
          'application/json': {
            schema: {type: 'array', items: {'x-ts-type': BadSubmission}},
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(BadSubmission)) filter?: Filter,
  ): Promise<BadSubmission[]> {
    return await this.badSubmissionRepository.find(filter);
  }

  @patch('/bad-submissions', {
    responses: {
      '200': {
        description: 'BadSubmission PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody() badSubmission: BadSubmission,
    @param.query.object('where', getWhereSchemaFor(BadSubmission)) where?: Where,
  ): Promise<Count> {
    return await this.badSubmissionRepository.updateAll(badSubmission, where);
  }

  @get('/bad-submissions/{id}', {
    responses: {
      '200': {
        description: 'BadSubmission model instance',
        content: {'application/json': {schema: {'x-ts-type': BadSubmission}}},
      },
    },
  })
  async findById(@param.path.string('id') id: string): Promise<BadSubmission> {
    return await this.badSubmissionRepository.findById(id);
  }

  @patch('/bad-submissions/{id}', {
    responses: {
      '204': {
        description: 'BadSubmission PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody() badSubmission: BadSubmission,
  ): Promise<void> {
    await this.badSubmissionRepository.updateById(id, badSubmission);
  }

  @put('/bad-submissions/{id}', {
    responses: {
      '204': {
        description: 'BadSubmission PUT success',
      },
    },
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() badSubmission: BadSubmission,
  ): Promise<void> {
    await this.badSubmissionRepository.replaceById(id, badSubmission);
  }

  @del('/bad-submissions/{id}', {
    responses: {
      '204': {
        description: 'BadSubmission DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.badSubmissionRepository.deleteById(id);
  }
}
