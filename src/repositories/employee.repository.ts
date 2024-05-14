import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Employee, EmployeeRelations} from '../models';

export class EmployeeRepository extends DefaultCrudRepository<
  Employee,
  typeof Employee.prototype.id,
  EmployeeRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(Employee, dataSource);
  }
}
