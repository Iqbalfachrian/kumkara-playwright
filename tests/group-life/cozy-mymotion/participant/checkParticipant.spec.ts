import { expect, test } from '@playwright/test';
import { ParticipantInformationPage } from '../../../../pages/group-life/participant/ParticipantInformation';

const testData = {
    policyHolder: 'Cozy Quality Assurance',
    participantName: 'Rachel Alon',
    productName: 'Asuransi Corporate Eazy (COZY)'
}

test('Show matching rows when searching by Policy Holder', async ({ page }) => {
    const participantPage = new ParticipantInformationPage(page)

    await participantPage.openFromHome();

    await expect(page).toHaveURL(/participant_information/);

    await expect(
        participantPage.resultTable.getByRole('row').first()).toBeVisible({ timeout: 15_000

    })

    await participantPage.searchByPolicyHolder(testData.policyHolder);

    await expect(participantPage.policyHolderRows(testData.policyHolder).first()).toBeVisible({ timeout: 15_000 })
});

test('show a matching Participant and Product row', async ({ page }) => {
    const participantPage = new ParticipantInformationPage(page);

    await participantPage.openFromHome();

    await expect(page).toHaveURL(/participant_information/);

    await expect(
        participantPage.resultTable.getByRole('row').first()).toBeVisible({ timeout: 15_000 
    })
    
    await participantPage.searchByParticipantName(testData.participantName);

    const matchingRows = participantPage.participantAndProductRows(
        testData.participantName,
        testData.productName
    );

    await expect(matchingRows.first()).toBeVisible({ timeout: 15_000 });
})