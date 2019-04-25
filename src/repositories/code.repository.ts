import {DefaultCrudRepository, juggler} from '@loopback/repository';
import {Code} from '../models';
import {MongoDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class CodeRepository extends DefaultCrudRepository<
  Code,
  typeof Code.prototype.id
> {
  constructor(
    @inject('datasources.mongo') dataSource: MongoDataSource,
  ) {
    super(Code, dataSource);
  }
}
