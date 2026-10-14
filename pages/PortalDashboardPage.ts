import { expect, type Locator, type Page } from "@playwright/test";

export class PortalDashboardPage {
    readonly kumkaraApp: Locator;

    constructor(private readonly page: Page) {
        this.kumkaraApp = page.getByText('Kumkara Dev', {exact: true})
    }

    async expectLoaded(): Promise<void> {
        await expect(this.page).toHaveURL(/\/dashboard\/?$/);
        await expect(this.kumkaraApp).toBeVisible();
    }

    async openKumkara(): Promise<Page> {
        const newPagePromise = this.page.context().waitForEvent('page');

        await this.kumkaraApp.click();

        const kumkaraPage = await newPagePromise;

        await expect(kumkaraPage).toHaveURL(
            'https://kumkara-uat.brilife.co.id/index.php/home'
        );

        return kumkaraPage;
    }
}