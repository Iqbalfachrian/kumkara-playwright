import { Locator, Page } from "@playwright/test";

export class ProductSetup {
    readonly page: Page;
    readonly productSetupMenu: Locator;
    readonly groupLifeMenu: Locator;
    readonly productSetup: Locator;
    readonly productCombobox: Locator;
    readonly productNameSearchInput: Locator;
    readonly searchButton: Locator;
    readonly resultTable: Locator;

    constructor(page: Page) {
        this.page = page;

        this.productSetupMenu = page.getByRole('link', {
            name: /Product Setup$/, exact: true,
        })

        this.groupLifeMenu = page.getByRole('link', {
            name: /Group Life$/,
        })

        this.productSetup = page.locator(
            'a[href$="grouplife/product_setup"]'
        );

        this.productCombobox = page.locator('#key');
        this.productNameSearchInput = page.locator('#word');
        this.searchButton = page.locator('#btn-search');
        this.resultTable = page.locator('#table');
    }

    async openFromHome(): Promise<void> {
        await this.page.goto('/index.php/home');
        await this.productSetupMenu.click();
        await this.groupLifeMenu.hover();
        await this.productSetup.click();
    }

    async searchByProductName(productName: string): Promise<void> {
        await this.productCombobox.selectOption({
            label: 'Product Name'
        });
        await this.productNameSearchInput.fill(productName);
        await this.searchButton.click();
    }

    productSetupRows(productSetup: string): Locator {
        return this.resultTable.getByRole('row').filter({
            hasText: productSetup
        });
    }
    productNameAndProductCode(
        productName: string,
        productCode: string
    ): Locator {
        return this.resultTable
        .getByRole('row')
        .filter({ hasText: productName })
        .filter({ hasText: productCode })
    }

}