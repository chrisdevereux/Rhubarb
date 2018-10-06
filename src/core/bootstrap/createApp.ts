import { Application, Module } from '../types';

interface CreateApplicationProps {
  modules: Module[]
}

export function createApplication(props: CreateApplicationProps): Application {
  return props
}