import { createJsonDatasource } from "./createJsonDatasource";
import { Datasource } from './Datasource';

interface EnvironmentDatasourceConfig<T> {
  property: string
  default?: T
}

export function createEnvironmentDatasource<T>(config: EnvironmentDatasourceConfig<T>): Datasource<T> {
  const variable = process.env[config.property] 
  if (!variable && typeof config.default === 'undefined') {
    throw Error(`Missing required config ${config.property}`)
  }

  return createJsonDatasource(
    typeof variable === 'undefined'
    ? config.default
    : JSON.parse(variable)
  )
}
