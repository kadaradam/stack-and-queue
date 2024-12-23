import {
  IBrowserHistory,
  TPageVisit,
  TDomainVisitCounts,
} from "./BrowserHistory.types";

class PageVisitStack {
  constructor(
    public payload: TPageVisit,
    public nextStack: PageVisitStack | null = null
  ) {}

  traverse({
    onItem,
    shouldContinue,
  }: {
    onItem: (payload: TPageVisit) => void;
    shouldContinue?: () => boolean;
  }): void {
    let currentStack = this as PageVisitStack | null;

    while (currentStack && (!shouldContinue || shouldContinue())) {
      onItem(currentStack.payload);
      currentStack = currentStack.nextStack;
    }
  }
}

/*
  !!!
  
  This is a practice to implement a stack without using arrays, or objects
  in a challenging way. Some parts of the code are not the cleanest and it's not built in the
  most optimized way. For example, getVisitsPerDomain could easily be tracked in an object.
 */

export class BrowserHistory implements IBrowserHistory {
  private backCount: number = 0;
  private forwardCount: number = 0;
  private backStack: PageVisitStack | null = null; // Stack for back history
  private forwardStack: PageVisitStack | null = null; // Stack for forward history
  private historySize: number | null = null;

  constructor(historySize: number | null = null) {
    if (typeof historySize === "number" && historySize <= 0) {
      throw new Error("History size must be greater than 0");
    }

    this.historySize = historySize;
  }

  visit(url: string): void {
    if (!this.isValidUrl(url)) {
      throw new Error("Invalid URL");
    }

    const now = new Date();
    const payload: TPageVisit = {
      url,
      fistVisitedAt: now,
      lastVisitedAt: now,
    };

    const newStack = new PageVisitStack(payload, this.backStack);

    this.backStack = newStack;
    this.backCount++;

    this.clearForwardStack();

    this.trimHistory();
  }

  back(): string | null {
    if (!this.backStack) {
      return null;
    }

    const payload = this.backStack.payload;
    const newStack = new PageVisitStack(payload, this.forwardStack);

    this.forwardStack = newStack;
    this.backStack = this.backStack.nextStack;

    if (this.backStack) {
      this.backStack.payload.lastVisitedAt = new Date();
    }

    this.forwardCount++;
    this.backCount--;

    return this.getCurrentPage();
  }

  forward(): string | null {
    if (!this.forwardStack) {
      return null;
    }

    const payload = this.forwardStack.payload;
    payload.lastVisitedAt = new Date();

    this.backStack = new PageVisitStack(payload, this.backStack);
    this.forwardStack = this.forwardStack.nextStack;

    this.forwardCount--;
    this.backCount++;

    return this.getCurrentPage();
  }

  getCurrentPage(): string | null {
    return this.backStack ? this.backStack.payload.url : null;
  }

  getCurrentStack(): TPageVisit | null {
    return this.backStack ? this.backStack.payload : null;
  }

  getBackCount(): number {
    return this.backCount;
  }

  getForwardCount(): number {
    return this.forwardCount;
  }

  clear(): void {
    this.backStack = null;
    this.forwardStack = null;
    this.forwardCount = 0;
    this.backCount = 0;
  }

  getLastVisitedPages(count: number | null = null): TPageVisit[] {
    const totalVisits = this.backCount + this.forwardCount;
    let pagesToRetrieve =
      count && count > 0 && count <= totalVisits ? count : totalVisits;

    const result: TPageVisit[] = [];

    function addPageToResult(
      payload: TPageVisit,
      fromForwardStack?: boolean
    ): void {
      /* Items in forwards stack should be added to the beginning of the result */
      fromForwardStack ? result.unshift(payload) : result.push(payload);
      pagesToRetrieve--;
    }

    function shouldRetrieveMorePages(): boolean {
      return pagesToRetrieve > 0;
    }

    /*
      Items in the forwards stacks still count as a visit.
      Handle them with priority.
    */
    this.forwardStack?.traverse({
      onItem: (payload) => addPageToResult(payload, true),
      shouldContinue: shouldRetrieveMorePages,
    });

    if (shouldRetrieveMorePages()) {
      this.backStack?.traverse({
        onItem: (payload) => addPageToResult(payload),
        shouldContinue: shouldRetrieveMorePages,
      });
    }

    return result;
  }

  getVisitsPerDomain(): TDomainVisitCounts {
    const domainVisitCounts: TDomainVisitCounts = {};

    function trackVisit(url: string) {
      const domain = new URL(url).hostname;

      if (domainVisitCounts[domain]) {
        domainVisitCounts[domain]++;
      } else {
        domainVisitCounts[domain] = 1;
      }
    }

    this.forwardStack?.traverse({
      onItem: ({ url }) => trackVisit(url),
    });
    this.backStack?.traverse({
      onItem: ({ url }) => trackVisit(url),
    });

    return domainVisitCounts;
  }

  private clearForwardStack(): void {
    this.forwardStack = null;
    this.forwardCount = 0;
  }

  private trimHistory(): void {
    let currentStack = this.backStack;
    let count = 1;

    if (
      !currentStack ||
      !this.historySize ||
      this.backCount <= this.historySize
    ) {
      return;
    }

    // Traverse the stack to find the node at historySize
    while (currentStack.nextStack && count < this.historySize) {
      currentStack = currentStack.nextStack;
      count++;
    }

    if (currentStack && currentStack.nextStack) {
      currentStack.nextStack = null;
      this.backCount = this.historySize!;
    }
  }

  /* Helper util(s) */

  private isValidUrl(string: string): boolean {
    try {
      new URL(string);
      return true;
    } catch (err) {
      return false;
    }
  }
}
