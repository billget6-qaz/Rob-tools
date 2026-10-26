import { test, expect } from "@playwright/test";

const TOOLS = [
  { path: "/lottery", card: "抽獎轉盤" },
  { path: "/pomodoro", card: "蕃茄鐘" },
  { path: "/fortune", card: "今日運勢抽籤" },
];

for (const { path } of TOOLS) {
  test(`${path} 可以點「回首頁」回到首頁`, async ({ page }) => {
    await page.goto(path);
    await page.getByRole("link", { name: /回首頁/ }).click();
    await expect(page).toHaveURL(/\/$/);
    await expect(page.getByRole("heading", { level: 1 })).toContainText("小工具箱");
  });
}

test("首頁不會出現工具頁的「回首頁」導覽列", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("link", { name: /回首頁/ })).toHaveCount(0);
  await expect(page.locator("header")).toHaveCount(1);
});

for (const { path, card } of TOOLS) {
  test(`首頁卡片「${card}」可進入 ${path} 並能再回首頁`, async ({ page }) => {
    await page.goto("/");
    await page.getByRole("main").getByRole("link", { name: new RegExp(`前往${card}`) }).click();
    await expect(page).toHaveURL(new RegExp(`${path}$`));
    await page.getByRole("link", { name: /回首頁/ }).click();
    await expect(page).toHaveURL(/\/$/);
  });
}

test("工具頁導覽列捲動時固定在頂端", async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 400 });
  await page.goto("/pomodoro");
  await page.evaluate(() => document.body.style.minHeight = "2000px");
  await page.evaluate(() => window.scrollTo(0, 300));
  const top = await page.locator("header").evaluate((e) => Math.round(e.getBoundingClientRect().top));
  expect(top).toBe(0);
});
