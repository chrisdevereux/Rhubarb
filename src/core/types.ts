import { Data } from './datasource/Data';
import { Theme } from './frontend/Theme';

export interface Application {
  modules: Module[]
  theme: Theme
}

export interface Module {
  id: string
  pages?: Page[]
}

export interface Page<T = {}> {
  id: string
  pattern: string
  source: string
  data?: (params: Record<string, string>) => Data<T>
}

export interface AppDescriptor {
  pages: PageDescriptor[]
}

export interface PageDescriptor {
  load: () => Promise<{ default: React.ComponentType }>
}
