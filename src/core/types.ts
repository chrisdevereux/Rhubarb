export interface Application {
  modules: Module[]
}

export interface Module {
  id: string
  pages?: Page[]
}

export interface Page {
  id: string
  pattern: string
  source: string
  data?: (params: any) => void
}

export interface AppDescriptor {
  pages: PageDescriptor[]
}

export interface PageDescriptor {
  load: () => Promise<{ default: React.ComponentType }>
}
