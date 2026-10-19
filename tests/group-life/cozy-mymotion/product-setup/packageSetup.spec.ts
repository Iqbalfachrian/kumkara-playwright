import { expect, test } from "@playwright/test";
import { PackageSetup } from "../../../../pages/group-life/product-setup/PackageSetup";

test('Show 10 package code with Active Status', async ({ page }) => {
    const productSetup = new PackageSetup(page)

    await productSetup.openPackageSetup();

    await expect(page).toHaveURL(
        /\/index\.php\/grouplife\/productsetup_package(?:#.*)?$/
    )

    await expect(productSetup.packageTable).toBeVisible();

    const packageRows = productSetup.packageTable
    .getByRole('gridcell')
    .filter({
       hasText: /^COZY-/,
        })
    await expect(packageRows).toHaveCount(10);

    const packageCodes = [
        'COZY-ACTIVITY',
        'COZY-EVENT',
        'COZY-GAMING',
        'COZY-HEALTH',
        'COZY-RELIGI',
        'COZY-SAFETY',
        'COZY-SELFCARE',
        'COZY-SPORT',
        'COZY-TRAVEL',
        'COZY-WORK',
    ];

    for (const packageCode of packageCodes) {
        const packageRow = productSetup.packageRow(packageCode);

        await expect(packageRow).toHaveCount(1);

        await expect(
            packageRow.getByRole('gridcell', {
                name: 'Active',
                exact: true,
            })
        ).toBeVisible();
    }
})