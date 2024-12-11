export interface IStack {
  // Add an item to the top of the stack
  push(item: number): void;

  // Remove and return the item from the top of the stack
  pop(): number | undefined;

  // Return the item at the top of the stack without removing it
  peek(): number | undefined;

  // Check if the stack is empty
  isEmpty(): boolean;

  // Return the number of items in the stack
  size(): number;
}
