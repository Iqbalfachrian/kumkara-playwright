import { Locator, Page } from "@playwright/test";

export class ProductSetup {
    readonly page: Page;
    readonly productSetupMenu: Locator;
    readonly groupLifeMenu: Locator;
    readonly packageSetup: Locator;
    readonly packageTable: Locator;

    constructor(page: Page) {
        this.page = page;

        this.productSetupMenu = page.getByRole('link', {
            name: /Product Setup$/, exact: true,
        })

        this.groupLifeMenu = page.getByRole('link', {
            name: /Group Life$/,
        })

        this.packageSetup = page.locator( 
            'a[href$="grouplife/productsetup_package"]'
        );

        this.packageTable = page.locator('#table');
    }

    async openPackageSetup(): Promise<void> {
        await this.page.goto('/index.php/home')
        await this.productSetupMenu.click();
        await this.groupLifeMenu.hover();
        await this.packageSetup.click()
    }

    packageRow(packageCode: string): Locator {
        return this.packageTable
        .getByRole('row')
        .filter({
             hasText: packageCode
            })
    }
}