import { expect, test } from '@playwright/test';
import { ParticipantInformationPage } from '../../../pages/ParticipantInformation';

test('Open Participant Information Group Life Menu', async ({ page }) => {
  await page.goto('/index.php/home');

  const participantInformationPage = new ParticipantInformationPage(page);

  await participantInformationPage.openFromHome();

  await expect(page).toHaveURL(/participant_information/);
});

test('Search My Motion Policy Holder', async ({ page }) => {
    await page.goto('/index.php/home');

    const participantPage = new ParticipantInformationPage(page);

    await participantPage.openFromHome();

    await expect(
        participantPage.resultSearch.getByRole('row').first()).toBeVisible({ timeout: 15_0000 })
    
    await participantPage.choosePolicyHolder();

    const policyHolderName = 'Cozy Quality Assurance';
    const productName = 'Asuransi Corporate Eazy (COZY)';


    await participantPage.searchByPolicyHolder(policyHolderName);

    const matchingPolicyRows = 
        participantPage.policyHolderRows(policyHolderName);

    await expect(matchingPolicyRows).toHaveCount(0, {
        timeout: 5_000
    })
    
    await expect(
        matchingPolicyRows.filter({
            has: page.getByRole('cell', {
                name: productName,
                exact: true
            }),
        })
    ).toHaveCount(0, {
        timeout: 5_000
    })
})

test('Search Participant Name and Product Name', async ({ page }) => {
    await page.goto('/index.php/home');

    const participantPage = new ParticipantInformationPage(page)

    await participantPage.openFromHome();

    await expect(
        participantPage.resultSearch.getByRole('row').first()).toBeVisible({ timeout: 5_000 })

        const searchData = {
            participantName: 'Rachel Alon',
            productName: 'Asuransi Corporate Eazy (COZY)'
        }

    await participantPage.chooseParticipantName();

    await participantPage.searchByParticipantName(searchData.participantName);

    const matchingRows = participantPage.participantAndProductRows(
        searchData.participantName,
        searchData.productName
    )

    await expect(matchingRows).toHaveCount(0, { timeout: 5_000 })
});


