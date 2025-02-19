import { expect, test } from '@playwright/test';
import { fieldSelector, enable, api_host, api_host_other } from '../data/fields';
import { settings } from '../data/routes';

test.describe('[Admin Settings] [Field] API Host Other', () => {
	test.beforeEach(async ( { page }) => {
		const baseURL = test.info().project.use.baseURL;
		const settingsPage = `${baseURL}/wp-admin/${settings}`;
		await page.goto(settingsPage);
		await page.waitForURL(settingsPage);
	});

	test('is not visible by default', async ({ page }) => {
		await expect(page.locator(fieldSelector + api_host_other)).not.toBeVisible();
	});

	test('is not visible when API rewriting is enabled', async ({ page }) => {
		await page.check(fieldSelector + enable);
		await expect(page.locator(fieldSelector + api_host_other)).not.toBeVisible();
	});

	test('is visible when API Host is set to Other', async ({ page }) => {
		await page.check(fieldSelector + enable);
		await page.selectOption(fieldSelector + api_host, 'other' );
		await expect(page.locator(fieldSelector + api_host_other)).toBeVisible();
	});

	test('is empty by default', async ({ page }) => {
		await page.check(fieldSelector + enable);
		await page.selectOption(fieldSelector + api_host, 'other' );
		await expect(page.locator(fieldSelector + api_host_other)).toBeVisible();
		await expect(page.locator(fieldSelector + api_host_other)).toHaveValue('');
	});

	test('strips an HTTPS protocol', async ({ page }) => {
		await page.check(fieldSelector + enable);
		await page.selectOption(fieldSelector + api_host, 'other' );
		await expect(page.locator(fieldSelector + api_host_other)).toBeVisible();
		await page.fill(fieldSelector + api_host_other, 'https://my.api.org');
		await page.locator(fieldSelector + api_host_other).evaluate(e => e.blur());
		await page.waitForTimeout(250);
		await expect(page.locator(fieldSelector + api_host_other)).toHaveValue('my.api.org');
	});

	test('strips an FTP protocol', async ({ page }) => {
		await page.check(fieldSelector + enable);
		await page.selectOption(fieldSelector + api_host, 'other' );
		await expect(page.locator(fieldSelector + api_host_other)).toBeVisible();
		await page.fill(fieldSelector + api_host_other, 'ftp://my.api.org');
		await page.locator(fieldSelector + api_host_other).evaluate(e => e.blur());
		await page.waitForTimeout(250);
		await expect(page.locator(fieldSelector + api_host_other)).toHaveValue('my.api.org');
	});

	test('strips an sFTP protocol', async ({ page }) => {
		await page.check(fieldSelector + enable);
		await page.selectOption(fieldSelector + api_host, 'other' );
		await expect(page.locator(fieldSelector + api_host_other)).toBeVisible();
		await page.fill(fieldSelector + api_host_other, 'sftp://my.api.org');
		await page.locator(fieldSelector + api_host_other).evaluate(e => e.blur());
		await page.waitForTimeout(250);
		await expect(page.locator(fieldSelector + api_host_other)).toHaveValue('my.api.org');
	});

	test('strips an FTPs protocol', async ({ page }) => {
		await page.check(fieldSelector + enable);
		await page.selectOption(fieldSelector + api_host, 'other' );
		await expect(page.locator(fieldSelector + api_host_other)).toBeVisible();
		await page.fill(fieldSelector + api_host_other, 'ftps://my.api.org');
		await page.locator(fieldSelector + api_host_other).evaluate(e => e.blur());
		await page.waitForTimeout(250);
		await expect(page.locator(fieldSelector + api_host_other)).toHaveValue('my.api.org');
	});

	test('strips an SMTP protocol', async ({ page }) => {
		await page.check(fieldSelector + enable);
		await page.selectOption(fieldSelector + api_host, 'other' );
		await expect(page.locator(fieldSelector + api_host_other)).toBeVisible();
		await page.fill(fieldSelector + api_host_other, 'smtp://my.api.org');
		await page.locator(fieldSelector + api_host_other).evaluate(e => e.blur());
		await page.waitForTimeout(250);
		await expect(page.locator(fieldSelector + api_host_other)).toHaveValue('my.api.org');
	});

	test('strips a file protocol', async ({ page }) => {
		await page.check(fieldSelector + enable);
		await page.selectOption(fieldSelector + api_host, 'other' );
		await expect(page.locator(fieldSelector + api_host_other)).toBeVisible();
		await page.fill(fieldSelector + api_host_other, 'file:///my.api.org');
		await page.locator(fieldSelector + api_host_other).evaluate(e => e.blur());
		await page.waitForTimeout(250);
		await expect(page.locator(fieldSelector + api_host_other)).toHaveValue('my.api.org');
	});

	test('strips a malformed HTTPS protocol', async ({ page }) => {
		await page.check(fieldSelector + enable);
		await page.selectOption(fieldSelector + api_host, 'other' );
		await expect(page.locator(fieldSelector + api_host_other)).toBeVisible();
		await page.fill(fieldSelector + api_host_other, 'httpa://my.api.org');
		await page.locator(fieldSelector + api_host_other).evaluate(e => e.blur());
		await page.waitForTimeout(250);
		await expect(page.locator(fieldSelector + api_host_other)).toHaveValue('my.api.org');
	});

	test('respects an HTTP protocol', async ({ page }) => {
		await page.check(fieldSelector + enable);
		await page.selectOption(fieldSelector + api_host, 'other' );
		await expect(page.locator(fieldSelector + api_host_other)).toBeVisible();
		await page.fill(fieldSelector + api_host_other, 'http://my.api.org');
		await page.locator(fieldSelector + api_host_other).evaluate(e => e.blur());
		await page.waitForTimeout(250);
		await expect(page.locator(fieldSelector + api_host_other)).toHaveValue('http://my.api.org');
	});
})
