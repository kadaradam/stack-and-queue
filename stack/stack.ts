import { IStack } from './stack.interface';

class StackNode {
  constructor(
    public value: number,
    public next: StackNode | null = null
  ) {}
}

export class Stack implements IStack {
  private top: StackNode | null = null;
  private count: number = 0;

  push(item: number): void {
    // Create new node
    const newNode = new StackNode(item);

    // Set its next pointer to current top
    newNode.next = this.top;

    // Make it the new top
    this.top = newNode;

    // Increment count
    this.count++;
  }

  pop(): number | undefined {
    // If stack is empty
    if (!this.top) {
      return undefined;
    }

    // Get value of current top
    const value = this.top.value;

    // Move top to next node
    this.top = this.top.next;

    // Decrement count
    this.count--;

    return value;
  }

  peek(): number | undefined {
    // If stack is empty
    if (!this.top) {
      return undefined;
    }

    // Return value of top node
    return this.top.value;
  }

  isEmpty(): boolean {
    return this.count === 0;
  }

  size(): number {
    return this.count;
  }
}
