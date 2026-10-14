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
    await participantPage.choosePolicyHolder();

    const policyHolderName = 'Cozy Quality Assurance';

    // await expect(participantPage.resultSearch.getByRole('row').first()).toBeVisible({ timeout: 15_000 });

    await expect(
        participantPage.resultSearch.getByRole('row').first()).toBeVisible({ timeout: 15_000 }
    );
    
    await participantPage.searchByPolicyHolder(policyHolderName);

    await expect(participantPage.resultSearch).toContainText(
        policyHolderName,
        { timeout: 15_000}
    )
})
