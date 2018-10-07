import { Data } from './Data';

export interface Datasource<T> {
  get(id: string): Data<T | undefined>
}
