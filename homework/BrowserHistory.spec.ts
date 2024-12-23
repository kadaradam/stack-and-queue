import { BrowserHistory } from "./BrowserHistory";

jest.useFakeTimers();

describe("BrowserHistory", () => {
  let browserHistory: BrowserHistory;

  beforeEach(() => {
    browserHistory = new BrowserHistory();
  });

  describe("visit", () => {
    test("should add new page to backStack", () => {
      browserHistory.visit("https://google.com");
      expect(browserHistory.getCurrentPage()).toBe("https://google.com");
    });

    test("should clear forwardStack", () => {
      browserHistory.visit("https://google.com");
      browserHistory.back();
      browserHistory.visit("https://facebook.com");
      expect(browserHistory.forward()).toBeNull();
    });

    test("should trim history", () => {
      browserHistory.visit("https://google.com");
      browserHistory.visit("https://facebook.com");
      browserHistory.visit("https://instagram.com");
      browserHistory.visit("https://twitter.com");
      expect(browserHistory.getCurrentPage()).toBe("https://twitter.com");
    });

    test("should validate URL", () => {
      expect(() => {
        browserHistory.visit("google.com");
      }).toThrow("Invalid URL");
    });
  });

  describe("back", () => {
    test("should return null when backStack is empty", () => {
      expect(browserHistory.back()).toBeNull();
    });

    test("should move current page to forwardStack", () => {
      browserHistory.visit("https://google.com");
      browserHistory.back();
      expect(browserHistory.forward()).toBe("https://google.com");
    });

    test("should update lastVisitedAt of current page", async () => {
      browserHistory.visit("https://google.com");
      browserHistory.visit("https://facebook.com");
      jest.advanceTimersByTime(100); // Simulate a 100ms delay
      browserHistory.back();
      const google = browserHistory.getCurrentStack()!;
      expect(google.lastVisitedAt).not.toEqual(google.fistVisitedAt);
    });
  });

  describe("forward", () => {
    test("should return null when forwardStack is empty", () => {
      expect(browserHistory.forward()).toBeNull();
    });

    test("should move current page to backStack", () => {
      browserHistory.visit("https://google.com");
      browserHistory.back();
      browserHistory.forward();
      expect(browserHistory.getCurrentPage()).toBe("https://google.com");
    });

    test("should update lastVisitedAt of current page", () => {
      browserHistory.visit("https://google.com");
      browserHistory.back();
      jest.advanceTimersByTime(100); // Simulate a 100ms delay
      browserHistory.forward();
      const google = browserHistory.getCurrentStack()!;
      expect(google.lastVisitedAt).not.toEqual(google.fistVisitedAt);
    });
  });

  describe("getCurrentPage", () => {
    test("should return null when backStack is empty", () => {
      expect(browserHistory.getCurrentPage()).toBeNull();
    });

    test("should return current page", () => {
      browserHistory.visit("https://google.com");
      expect(browserHistory.getCurrentPage()).toBe("https://google.com");
    });
  });

  describe("getBackCount", () => {
    test("should return 0 when backStack is empty", () => {
      expect(browserHistory.getBackCount()).toBe(0);
    });

    test("should return count of pages in backStack", () => {
      browserHistory.visit("https://google.com");
      browserHistory.visit("https://facebook.com");
      expect(browserHistory.getBackCount()).toBe(2);
    });
  });

  describe("getForwardCount", () => {
    test("should return 0 when forwardStack is empty", () => {
      expect(browserHistory.getForwardCount()).toBe(0);
    });

    test("should return count of pages in forwardStack", () => {
      browserHistory.visit("https://google.com");
      browserHistory.back();
      expect(browserHistory.getForwardCount()).toBe(1);
    });
  });

  describe("clear", () => {
    test("should clear backStack and forwardStack", () => {
      browserHistory.visit("https://google.com");
      browserHistory.clear();
      expect(browserHistory.getCurrentPage()).toBeNull();
      expect(browserHistory.getBackCount()).toBe(0);
      expect(browserHistory.getForwardCount()).toBe(0);
    });
  });

  describe("getLastVisitedPages", () => {
    test("should return the 2 last visited pages", () => {
      browserHistory.visit("https://google.com");
      browserHistory.visit("https://facebook.com");
      browserHistory.visit("https://instagram.com");
      browserHistory.visit("https://twitter.com");
      expect(browserHistory.getLastVisitedPages(2)).toEqual([
        {
          url: "https://twitter.com",
          fistVisitedAt: expect.any(Date),
          lastVisitedAt: expect.any(Date),
        },
        {
          url: "https://instagram.com",
          fistVisitedAt: expect.any(Date),
          lastVisitedAt: expect.any(Date),
        },
      ]);
    });

    test("should return all last visited pages", () => {
      browserHistory.visit("https://google.com");
      browserHistory.visit("https://facebook.com");
      browserHistory.visit("https://instagram.com");
      browserHistory.visit("https://twitter.com");
      expect(browserHistory.getLastVisitedPages()).toEqual([
        {
          url: "https://twitter.com",
          fistVisitedAt: expect.any(Date),
          lastVisitedAt: expect.any(Date),
        },
        {
          url: "https://instagram.com",
          fistVisitedAt: expect.any(Date),
          lastVisitedAt: expect.any(Date),
        },
        {
          url: "https://facebook.com",
          fistVisitedAt: expect.any(Date),
          lastVisitedAt: expect.any(Date),
        },
        {
          url: "https://google.com",
          fistVisitedAt: expect.any(Date),
          lastVisitedAt: expect.any(Date),
        },
      ]);
    });

    test("should return all last visited pages if arg is out of bounds +", () => {
      browserHistory.visit("https://google.com");
      browserHistory.visit("https://facebook.com");
      expect(browserHistory.getLastVisitedPages(100)).toEqual([
        {
          url: "https://facebook.com",
          fistVisitedAt: expect.any(Date),
          lastVisitedAt: expect.any(Date),
        },
        {
          url: "https://google.com",
          fistVisitedAt: expect.any(Date),
          lastVisitedAt: expect.any(Date),
        },
      ]);
    });

    test("should return all last visited pages if arg is out of bounds -", () => {
      browserHistory.visit("https://google.com");
      browserHistory.visit("https://facebook.com");
      expect(browserHistory.getLastVisitedPages(-2)).toEqual([
        {
          url: "https://facebook.com",
          fistVisitedAt: expect.any(Date),
          lastVisitedAt: expect.any(Date),
        },
        {
          url: "https://google.com",
          fistVisitedAt: expect.any(Date),
          lastVisitedAt: expect.any(Date),
        },
      ]);
    });

    test("should include forward stack in the visit result", () => {
      browserHistory.visit("https://google.com");
      browserHistory.visit("https://facebook.com");
      browserHistory.visit("https://instagram.com");
      browserHistory.visit("https://twitter.com");
      browserHistory.back();
      browserHistory.back();
      expect(browserHistory.getLastVisitedPages()).toEqual([
        {
          url: "https://twitter.com",
          fistVisitedAt: expect.any(Date),
          lastVisitedAt: expect.any(Date),
        },
        {
          url: "https://instagram.com",
          fistVisitedAt: expect.any(Date),
          lastVisitedAt: expect.any(Date),
        },
        {
          url: "https://facebook.com",
          fistVisitedAt: expect.any(Date),
          lastVisitedAt: expect.any(Date),
        },
        {
          url: "https://google.com",
          fistVisitedAt: expect.any(Date),
          lastVisitedAt: expect.any(Date),
        },
      ]);
    });
  });

  test("should return all last visited pages", () => {
    browserHistory.visit("https://google.com");
    browserHistory.visit("https://facebook.com");
    browserHistory.visit("https://instagram.com");
    browserHistory.visit("https://twitter.com");
    expect(browserHistory.getLastVisitedPages()).toEqual([
      {
        url: "https://twitter.com",
        fistVisitedAt: expect.any(Date),
        lastVisitedAt: expect.any(Date),
      },
      {
        url: "https://instagram.com",
        fistVisitedAt: expect.any(Date),
        lastVisitedAt: expect.any(Date),
      },
      {
        url: "https://facebook.com",
        fistVisitedAt: expect.any(Date),
        lastVisitedAt: expect.any(Date),
      },
      {
        url: "https://google.com",
        fistVisitedAt: expect.any(Date),
        lastVisitedAt: expect.any(Date),
      },
    ]);
  });

  describe("getVisitsPerDomain", () => {
    test("should return visits per domain", () => {
      browserHistory.visit("https://google.com");
      browserHistory.visit("https://facebook.com");
      browserHistory.visit("https://instagram.com");
      browserHistory.visit("https://twitter.com");
      browserHistory.visit("https://google.com");
      browserHistory.visit("https://facebook.com");
      browserHistory.visit("https://google.com");
      browserHistory.visit("https://facebook.com");
      expect(browserHistory.getVisitsPerDomain()).toEqual({
        "google.com": 3,
        "facebook.com": 3,
        "instagram.com": 1,
        "twitter.com": 1,
      });
    });
  });
});

describe("BrowserHistory Max History", () => {
  let browserHistory: BrowserHistory;

  beforeEach(() => {
    browserHistory = new BrowserHistory(2);
  });

  describe("visit", () => {
    test("should trim history", () => {
      browserHistory.visit("https://google.com");
      browserHistory.visit("https://facebook.com");
      browserHistory.visit("https://instagram.com");
      browserHistory.visit("https://twitter.com");
      expect(browserHistory.getCurrentPage()).toBe("https://twitter.com");
      expect(browserHistory.getBackCount()).toBe(2);
    });
  });

  describe("getLastVisitedPages", () => {
    test("should return the 2 last visited pages", () => {
      browserHistory.visit("https://google.com");
      browserHistory.visit("https://facebook.com");
      browserHistory.visit("https://instagram.com");
      browserHistory.visit("https://twitter.com");
      expect(browserHistory.getLastVisitedPages(2)).toEqual([
        {
          url: "https://twitter.com",
          fistVisitedAt: expect.any(Date),
          lastVisitedAt: expect.any(Date),
        },
        {
          url: "https://instagram.com",
          fistVisitedAt: expect.any(Date),
          lastVisitedAt: expect.any(Date),
        },
      ]);
    });
  });
});

describe("BrowserHistory Invalid Max History", () => {
  test("should throw an error when historySize is less than 1", () => {
    expect(() => {
      new BrowserHistory(0);
    }).toThrow("History size must be greater than 0");
  });
});
