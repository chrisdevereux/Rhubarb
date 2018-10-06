import { Command } from 'clime'
import { DevServerTask } from '../tasks/DevServerTask';

export default class StartCommand extends Command {
  execute() {
    const task = new DevServerTask()
    task.start()   
  }
}
