# Browser History Implementation
Technical Exercise

## Overview
Create a simple browser history system that simulates the back and forward functionality of a web browser. The system should use two stacks to manage the history and provide navigation capabilities.

## Requirements

### Core Functionality
1. Visit new pages
2. Navigate back through history
3. Navigate forward if you've gone back
4. Show current page
5. View history

### Class Structure
```typescript
interface BrowserHistory {
  // Navigate to a new page
  visit(url: string): void;

  // Go back one page, return the URL or null if can't go back
  back(): string | null;

  // Go forward one page, return the URL or null if can't go forward
  forward(): string | null;

  // Get current page URL or null if no history
  getCurrentPage(): string | null;

  // Get number of pages in back history
  getBackCount(): number;

  // Get number of pages in forward history
  getForwardCount(): number;
}
```

### Example Usage
```typescript
  const browser = new BrowserHistory();

  browser.visit('google.com');
  browser.visit('github.com');
  browser.visit('stackoverflow.com');

  console.log(browser.getCurrentPage());  // stackoverflow.com
  console.log(browser.back());            // github.com
  console.log(browser.back());            // google.com
  console.log(browser.forward());         // github.com

  browser.visit('typescript.com');        // This should clear forward history
  console.log(browser.forward());         // null (no forward history)
```

### Implementation Hints
#### Use two stacks:

- backStack: stores history of visited pages
- forwardStack: stores pages you can go forward to

#### Key behaviors:

- When visiting a new page after going back, clear forward history
- Back/forward should return null if no history available
- Current page should be at the top of back stack

### Bonus Challenges

- Add method to view last N visited pages
- Add maximum history size
- Add timestamp to page visits
- Implement method to clear history
- Add domain filtering (e.g. `browser.getVisitsPerDomain()`)

### Evaluation Criteria

- Correct implementation of back/forward behavior
- Proper use of stack data structure
- Handling of edge cases
- Clean code and organization
- Test coverage
