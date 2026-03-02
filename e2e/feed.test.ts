import { by, device, element, waitFor } from "detox";

const NETWORK_TIMEOUT = 10_000;
const DETAIL_LOAD_TIMEOUT = 8_000;
const ANIMATION_TIMEOUT = 5_000;

describe("Feed", () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  it("loads users on the home screen", async () => {
    await waitFor(element(by.id("user-item")).atIndex(0))
      .toBeVisible()
      .withTimeout(NETWORK_TIMEOUT);
  });

  it("opens the detail screen, validates animated sections, then returns home", async () => {
    await waitFor(element(by.id("user-item")).atIndex(0))
      .toBeVisible()
      .withTimeout(NETWORK_TIMEOUT);

    await element(by.id("user-item")).atIndex(0).tap();

    await waitFor(element(by.id("detail-name")))
      .toBeVisible()
      .withTimeout(DETAIL_LOAD_TIMEOUT);

    await waitFor(element(by.id("detail-company-section")))
      .toBeVisible()
      .withTimeout(ANIMATION_TIMEOUT);

    await element(by.id("detail-close")).tap();

    await waitFor(element(by.id("user-item")).atIndex(0))
      .toBeVisible()
      .withTimeout(ANIMATION_TIMEOUT);
  });

  it("filters the list when searching then clears", async () => {
    await waitFor(element(by.id("search-input")))
      .toBeVisible()
      .withTimeout(ANIMATION_TIMEOUT);

    await element(by.id("search-input")).typeText("Emily");

    await waitFor(element(by.id("user-item")).atIndex(0))
      .toBeVisible()
      .withTimeout(ANIMATION_TIMEOUT);

    await element(by.id("search-input")).replaceText("");

    await waitFor(element(by.id("user-item")).atIndex(0))
      .toBeVisible()
      .withTimeout(ANIMATION_TIMEOUT);
  });

  it("switches between list and grid view", async () => {
    await waitFor(element(by.id("user-item")).atIndex(0))
      .toBeVisible()
      .withTimeout(NETWORK_TIMEOUT);

    await element(by.id("view-toggle")).tap();

    await waitFor(element(by.id("user-item")).atIndex(0))
      .toBeVisible()
      .withTimeout(ANIMATION_TIMEOUT);

    await element(by.id("view-toggle")).tap();

    await waitFor(element(by.id("user-item")).atIndex(0))
      .toBeVisible()
      .withTimeout(ANIMATION_TIMEOUT);
  });
});
