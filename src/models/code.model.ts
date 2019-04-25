import {Entity, model, property} from '@loopback/repository';

@model({settings: {strictObjectIDCoercion: true}})
export class Code extends Entity {
  @property({
    type: 'string',
    id: true,
    defaultFn:"uuid"
  })
  id?: string;

  @property({
    type: 'string',
  })
  formId?: string;

  @property({
    type: 'string',
  })
  userid?: string;

  @property({
    type: 'string',
  })
  doc_id?: string;

  @property({
    type: 'string',
  })
  code?: string;

  @property({
    type: 'date',
  })
  exp?: string;

  @property({
    type: 'date',
  })
  date_created?: string;

  @property({
    type: 'date',
  })
  signed_date?: string;

  @property({
    type: 'string',
  })
  email?: string;

  @property({
    type: 'string',
  })
  phone?: string;

  @property({
    type: 'string',
  })
  status?: string;

  @property({
    type: 'string',
  })
  ip?: string | string[];

  @property({
    type: 'object',
  })
  meta?: object;

  @property({
    type: 'string',
  })
  url?: string | string[];


  constructor(data?: Partial<Code>) {
    super(data);
  }
}
