import { test, expect } from "@playwright/test";

test("首頁導覽列沒有「開始使用」按鈕", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("link", { name: "開始使用" })).toHaveCount(0);
  await expect(page.getByRole("button", { name: "開始使用" })).toHaveCount(0);
});

test("「為什麼好用」區塊位於工具卡片之後、頁尾之前", async ({ page }) => {
  await page.goto("/");
  const why = page.locator("#why");
  await expect(why.getByRole("heading", { name: "為什麼好用" })).toBeVisible();
  await expect(why.getByRole("heading", { level: 3 })).toHaveCount(4);

  const y = async (sel: string) =>
    page.locator(sel).evaluate((e) => e.getBoundingClientRect().top + window.scrollY);
  const tools = await y("#tools");
  const whyTop = await y("#why");
  const footer = await y("footer");
  expect(tools).toBeLessThan(whyTop);
  expect(whyTop).toBeLessThan(footer);
});

test("三個工具圖示都有動畫", async ({ page }) => {
  await page.goto("/");
  const names = await page
    .locator("#tools a span[aria-hidden]")
    .evaluateAll((els) => els.map((e) => getComputedStyle(e).animationName));
  expect(names).toHaveLength(3);
  expect(names[0]).toBe("spin");
  expect(names[1]).toBe("bounce");
  expect(names[2]).toBe("swing");
});

test("使用者偏好減少動態時，圖示不播放動畫", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  const names = await page
    .locator("#tools a span[aria-hidden]")
    .evaluateAll((els) => els.map((e) => getComputedStyle(e).animationName));
  expect(names).toEqual(["none", "none", "none"]);
});
