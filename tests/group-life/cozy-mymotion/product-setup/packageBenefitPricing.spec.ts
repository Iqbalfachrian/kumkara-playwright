import { expect, test } from "@playwright/test";
import { PackageBenefitPricing } from "../../../../pages/group-life/product-setup/PackageBenefitPricing";

const testData = {
    packageKeyword: 'COZY-TRAVEL',
    pricingCode: 'COZY-B2B-PA-A-20260915',
    benefitKeyword: 'PA-A',
    pricingName: 'COZY B2B PA-A rate'
};

test('Search Package and verify a Specific Pricing Row', async ({ page }) => {
    const packageBenefitPricing = new PackageBenefitPricing(page)

    await packageBenefitPricing.openFromHome();

    await expect(page).toHaveURL(/productsetup_package_benefit_pricing/)
    await expect(packageBenefitPricing.searchInput).toBeVisible()
    await expect(packageBenefitPricing.resultRows.first()).toBeVisible()

    const rowBeforeSearch = await packageBenefitPricing.resultRows.count();
    expect(rowBeforeSearch).toBeGreaterThan(2);

    await packageBenefitPricing.searchByPackageKeyword(
        testData.packageKeyword
    )

    await expect(packageBenefitPricing.searchInput).toHaveValue(
        testData.packageKeyword
    );
    
    const firstResultRow = packageBenefitPricing.resultRows.first();
    await expect(firstResultRow).toBeVisible({timeout: 15_000})
    await expect(firstResultRow).toContainText(testData.packageKeyword);
    await expect(firstResultRow).toContainText(testData.pricingCode)

})

//     const matchingRows = packageBenefitPricing.packageRows(
//         testData.packageKeyword
//     );

//     await expect(matchingRows).toHaveCount(2, {
//         timeout: 15_000
//     })

//     const targetRow = packageBenefitPricing.pricingRow(
//         'GT04',
//         testData.pricingCode
//     );

//     await expect(targetRow).toHaveCount(1, {
//         timeout: 15_000
//     })
    
//     await expect(targetRow).toBeVisible()
//     await expect(targetRow).toContainText(testData.benefitKeyword)
//     await expect(targetRow).toContainText(testData.pricingName)
// })