import { Data } from "./Data";
import { Datasource } from './Datasource';

export function createJsonDatasource<T>(data: Record<string, T>): Datasource<T> {
  return {
    get(id) {
      return Data.of(data[id])
    }
  }
}
