export interface IQueue {
  // Add an item to the end of the queue
  enqueue(item: number): void;

  // Remove and return the item from the front of the queue
  dequeue(): number | undefined;

  // Return the item at the front of the queue without removing it
  peek(): number | undefined;

  // Check if the queue is empty
  isEmpty(): boolean;

  // Return the number of items in the queue
  size(): number;
}
