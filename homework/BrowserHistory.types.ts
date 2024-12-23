export interface IBrowserHistory {
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

  // Clear history
  clear(): void;

  // Get last visited pages
  getLastVisitedPages(count: number | undefined): TPageVisit[];

  // Get current stack
  getCurrentStack(): TPageVisit | null;

  // Get visits per domain
  getVisitsPerDomain(): TDomainVisitCounts;
}

export type TPageVisit = {
  url: string;
  fistVisitedAt: Date;
  lastVisitedAt: Date;
};

export type TDomainVisitCounts = { [domain: string]: number };
