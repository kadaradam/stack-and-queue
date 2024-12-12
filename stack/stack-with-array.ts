import { IStack } from './stack.interface';

export class Stack implements IStack {
  private readonly items: number[] = [];

  push(item: number): void {
    this.items.push(item);
  }

  pop(): number | undefined {
    return this.items.pop();
  }

  peek(): number | undefined {
    return this.items[this.items.length - 1];
  }

  isEmpty(): boolean {
    return this.items.length === 0;
  }

  size(): number {
    return this.items.length;
  }
}