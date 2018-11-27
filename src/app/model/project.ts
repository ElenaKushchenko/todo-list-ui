import {Task} from './task';

export class Project {
  constructor(public name: string,
              public order: number,
              public tasks?: Array<Task>,
              public id?: number) {
  }
}
