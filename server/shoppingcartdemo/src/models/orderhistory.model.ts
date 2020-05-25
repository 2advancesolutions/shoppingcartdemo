import {Entity, model, property} from '@loopback/repository';

@model()
export class Orderhistory extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'number',
    required: true,
  })
  price: number;

  @property({
    type: 'string',
    required: true,
  })
  img: string;

  @property({
    type: 'number',
    required: true,
  })
  stock: number;

  @property({
    type: 'string',
    required: true,
  })
  drugcode: string;

  @property({
    type: 'date',
    required: true,
  })
  orderdate: string;


  constructor(data?: Partial<Orderhistory>) {
    super(data);
  }
}

export interface OrderhistoryRelations {
  // describe navigational properties here
}

export type OrderhistoryWithRelations = Orderhistory & OrderhistoryRelations;
