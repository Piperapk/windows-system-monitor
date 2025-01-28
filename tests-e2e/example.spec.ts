import { test, expect, _electron } from "@playwright/test";

let electronApp: Awaited<ReturnType<typeof _electron.launch>>;
let mainPage: Awaited<ReturnType<typeof electronApp.firstWindow>>;

async function waitForPreloadScript() {
  return new Promise((resolve) => {
    const interval = setInterval(async () => {
      const electronBridge = await mainPage.evaluate(() => {
        return window as Window;
      });
      if (electronBridge) {
        clearInterval(interval);
        resolve(true);
      }
    }, 100);
  });
}

test.beforeEach(async () => {
  electronApp = await _electron.launch({
    args: ["."],
    env: { NODE_ENV: "development" },
  });

  mainPage = await electronApp.firstWindow();

  await waitForPreloadScript();
});

test.afterEach(async () => {
  await electronApp.close();
});

test("should open a window", async () => {
  await mainPage.waitForLoadState("domcontentloaded");
  console.log(await mainPage.title());
  expect(await mainPage.title()).toBe("Windows System Monitor");
});
