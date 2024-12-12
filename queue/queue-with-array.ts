import { IQueue } from './queue.interface';

export class Queue implements IQueue {
  private items: number[] = [];

  enqueue(item: number): void {
    this.items.push(item);
  }

  dequeue(): number | undefined {
    return this.items.shift();
  }

  peek(): number | undefined {
    return this.items[0];
  }

  isEmpty(): boolean {
    return this.items.length === 0;
  }

  size(): number {
    return this.items.length;
  }
 }