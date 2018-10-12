import { defaultTheme } from '../frontend/defaultTheme';
import { Application, Module, Page } from '../types';

interface CreateApplicationProps {
  modules: Module[]
}

export function createApplication(props: CreateApplicationProps): Application {
  return {
    ...props,
    theme: defaultTheme
  }
}

export function createPage<T>(props: Page<T>): Page<T> {
  return props
}
