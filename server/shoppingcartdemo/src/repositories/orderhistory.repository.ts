import {DefaultCrudRepository} from '@loopback/repository';
import {Orderhistory, OrderhistoryRelations} from '../models';
import {MysqlDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class OrderhistoryRepository extends DefaultCrudRepository<
  Orderhistory,
  typeof Orderhistory.prototype.id,
  OrderhistoryRelations
> {
  constructor(
    @inject('datasources.Mysql') dataSource: MysqlDataSource,
  ) {
    super(Orderhistory, dataSource);
  }
}
