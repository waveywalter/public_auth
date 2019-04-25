import {Entity, model, property} from '@loopback/repository';

@model()
export class BadSubmission extends Entity {
  @property({
    type: 'string',
    id: true,
  })
  id?: string;

  @property({
    type: 'string',
  })
  actual_code?: string;

  @property({
    type: 'string',
  })
  submitted_code?: string;

  @property({
    type: 'date',
    defaultFn: 'now',
  })
  time_stamp?: string;

  @property({
    type: 'string',
  })
  meta?: string;


  constructor(data?: Partial<BadSubmission>) {
    super(data);
  }
}
