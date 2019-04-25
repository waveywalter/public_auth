import {DefaultCrudRepository, juggler} from '@loopback/repository';
import {BadSubmission} from '../models';
import {MongoDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class BadSubmissionRepository extends DefaultCrudRepository<
  BadSubmission,
  typeof BadSubmission.prototype.id
> {
  constructor(
    @inject('datasources.mongo') dataSource: MongoDataSource,
  ) {
    super(BadSubmission, dataSource);
  }
}
