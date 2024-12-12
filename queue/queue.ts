import { IQueue } from './queue.interface';

class QueueNode {
  constructor(
    public value: number,
    public next: QueueNode | null = null
  ) {}
 }

 export class Queue implements IQueue {
  private front: QueueNode | null = null;  // Points to first item
  private back: QueueNode | null = null;   // Points to last item
  private count: number = 0;

  enqueue(item: number): void {
    const newNode = new QueueNode(item);

    // If we have a back node, link it to the new node
    if (this.back) {
        this.back.next = newNode;
    }

    // Update back pointer to new node
    this.back = newNode;

    // If front is null, this is the first node
    if (!this.front) {
        this.front = newNode;
    }

    this.count++;
}

  dequeue(): number | undefined {
    // If queue is empty
    if (this.isEmpty()) {
      return undefined;
    }

    // Get the first item
    const value = this.front!.value;

    // Move front pointer to next node
    this.front = this.front!.next;

    // If front becomes null, back should also be null
    if (!this.front) {
      this.back = null;
    }

    this.count--;
    return value;
  }

  peek(): number | undefined {
    // If queue is empty
    if (this.isEmpty()) {
      return undefined;
    }

    // Return value of front node
    return this.front!.value;
  }

  isEmpty(): boolean {
    return this.count === 0;
  }

  size(): number {
    return this.count;
  }
 }