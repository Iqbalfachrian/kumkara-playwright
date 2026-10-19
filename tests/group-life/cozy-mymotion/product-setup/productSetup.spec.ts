import { expect, test } from "@playwright/test";
import { ProductSetup } from "../../../../pages/group-life/product-setup/ProductSetup";


const testData = {
    productName : 'Asuransi Corporate Eazy (COZY)',
    productCode : 'GT04'
}

test('Search by Product Name & Verify Product Code', async ({ page }) => {
    const productSetup = new ProductSetup(page);

    await productSetup.openFromHome();
    await expect(page).toHaveURL(/product_setup/)

    await expect(
        productSetup.resultTable).toBeVisible({ timeout: 5_000 }
    )
    await productSetup.searchByProductName(testData.productName);
        
    const matchingRows = productSetup.productNameAndProductCode(
        testData.productCode,
        testData.productName
    );
    await expect(matchingRows).toBeVisible({ timeout: 5_000 })
})

test('Show no matching row when product code does not exist', async ({ page }) => {
    const productSetup = new ProductSetup(page);

    await productSetup.openFromHome();

    await expect(productSetup.resultTable).toBeVisible({
        timeout: 5_000,
    });

    const existingProductRow = productSetup.productNameAndProductCode(
        testData.productName,
        testData.productCode,
    );

    //Check product is not exist on Kumkara
    const missingProdutName = 'My Activity';

    await productSetup.searchByProductName(missingProdutName);
    await expect(productSetup.productNameSearchInput).toHaveValue(
        missingProdutName, {timeout: 15_000}
    );

    //Assertions product name does not exist
    await expect(existingProductRow).toHaveCount(0, {
        timeout: 5_000,
    });
    await expect(
        productSetup.productSetupRows(missingProdutName)
    ).toHaveCount(0), {
        timeout: 5_000,
    }
})