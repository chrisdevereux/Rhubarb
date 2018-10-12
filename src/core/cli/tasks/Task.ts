import { join } from "path";
import { Application } from '../../types';

export class Task {
  development = process.env.NODE_ENV !== 'production'
  app: Application = require(join(process.cwd(), 'app')).default
}