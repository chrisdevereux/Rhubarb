import { join } from "path";

export class Task {
  development = process.env.NODE_ENV !== 'production'
  app = require(join(process.cwd(), 'app')).default
}