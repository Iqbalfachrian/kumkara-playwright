import { Locator, Page } from "@playwright/test";

export class PackageBenefitPricing {
    readonly page: Page;
    readonly productSetupMenu: Locator;
    readonly groupLifeMenu: Locator;
    readonly PackageBenefitPricingMenu: Locator;
    readonly searchInput: Locator;
    readonly resultTable: Locator;
    readonly resultRows: Locator;


constructor(page: Page) {
    this.page = page;

    this.productSetupMenu = page.getByRole('link', {
        name: /Product Setup$/, exact: true,
    });

    this.groupLifeMenu = page.getByRole('link', {
        name: /Group Life$/,
    });

    this.PackageBenefitPricingMenu = page.locator(
        'a[href$="grouplife/productsetup_package_benefit_pricing"]'
    );

    this.searchInput = page.getByRole('searchbox', {name: 'SEARCH'})
    this.resultTable = page.locator('#gbox_package-benefit-pricing-grid');
    this.resultRows = this.resultTable.locator('tr.jqgrow')
 }

 async openFromHome(): Promise<void> {
    await this.page.goto('index.php/home');
    await this.productSetupMenu.click();
    await this.groupLifeMenu.hover();
    await this.PackageBenefitPricingMenu.click();
 }

 async searchByPackageKeyword(keyword: string): Promise<void> {
    await this.searchInput.fill(keyword);
    await this.searchInput.press('Enter')
 }

 packageRows(keyword: string): Locator {
    return this.resultRows.filter({
        hasText: keyword
    })
 }
 pricingRow( productCode: string, pricingCode: string ): Locator {
    return this.resultRows
    .getByRole('row')
    .filter({ hasText: productCode})
    .filter({ hasText: pricingCode})
 } 
    
}
