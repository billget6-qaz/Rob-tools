import { test, expect } from "@playwright/test";

const LEVELS = ["大吉", "中吉", "小吉", "吉", "末吉", "凶", "大凶"];

test("按下抽籤後顯示其中一種籤", async ({ page }) => {
  await page.goto("/fortune");
  await expect(page.getByTestId("fortune-result")).toHaveCount(0);

  await page.getByRole("button", { name: "開始抽籤" }).click();
  await expect(page.getByRole("button", { name: "抽籤中…" })).toBeDisabled();

  const result = page.getByTestId("fortune-result");
  await expect(result).toBeVisible();
  const level = (await result.locator("span").first().textContent())?.trim();
  expect(LEVELS).toContain(level);
  await expect(result).toContainText("宜");
  await expect(result).toContainText("忌");
  await expect(page.getByRole("button", { name: "再抽一次" })).toBeEnabled();
});

test("多次抽籤會出現不同結果", async ({ page }) => {
  await page.goto("/fortune");
  const seen = new Set<string>();
  for (let i = 0; i < 12; i++) {
    await page.getByRole("button", { name: /開始抽籤|再抽一次/ }).click();
    const result = page.getByTestId("fortune-result");
    await expect(result).toBeVisible();
    seen.add((await result.locator("span").first().textContent())!.trim());
  }
  expect(seen.size).toBeGreaterThan(1);
});
