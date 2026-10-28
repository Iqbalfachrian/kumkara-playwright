import { expect, test } from "@playwright/test";
import { ClaimSubmission } from "../../../../pages/group-life/claim/claim-submission/ClaimSubmission";
import { claimSubmissionTestData as testData } from "../../../../test-data/group-life/claim-submission/claimSubmission";


test('Add Claim Submission - Cozy My Motion Products', async ({ page }) => {
    const claimSubmission = new ClaimSubmission(page);

    await claimSubmission.openFromHome();

    await expect(page).toHaveURL(/grouplife\/claim\/submission/);
    await expect(
        page.getByRole('heading', {
            name: 'Claim Submission',
            exact: true,
        })
    ).toBeVisible();

    await expect(page.getByText('ADD Claim Submission', {exact: true})).toBeVisible({timeout: 15_000})
    await expect(claimSubmission.policySearchButton).toBeVisible({ timeout: 15_000})

    const policyButton = page.locator("#btn-show-modal-policy");

    console.log("Policy button debug:", {
    allForms: await page.locator("form").count(),
    visibleForms: await page.locator("form:visible").count(),
    buttonInDom: await policyButton.count(),
    buttonVisible: await page.locator("#btn-show-modal-policy:visible").count(),
    });

    await expect(claimSubmission.policySearchButton).toHaveCount(1, {
    timeout: 5_000,
    });

    await claimSubmission.searchAndSelectPolicy(testData.policyNo);

        await expect(claimSubmission.policyNoInput).toHaveValue(testData.policyNo);
        await expect(claimSubmission.policyHolderInput).toHaveValue(testData.policyHolder);
        await expect(claimSubmission.productInput).toHaveValue(testData.product);
        await expect(claimSubmission.policyStartDateInput).toHaveValue(testData.policyStartDate);
        await expect(claimSubmission.policyEndDateInput).toHaveValue(testData.policyEndDate);

    await claimSubmission.searchAndSelectParticipant(testData.participantSearch);
        await expect(claimSubmission.participantNoInput).toHaveValue(testData.participantNo);
        await expect(claimSubmission.participantNameInput).toHaveValue(testData.participantName);

    await claimSubmission.selectRelationship(testData.relationship);
    await claimSubmission.applicantAddress(testData.applicantAddress);
    await claimSubmission.fillClaimDates(
        testData.submissionDate,
        testData.incidentDate
    );

        await expect(claimSubmission.relationshipDropdown.locator('option:checked'))
        .toHaveText(testData.relationship);

        await expect(claimSubmission.addressInput).toHaveValue(testData.applicantAddress.address);
        await expect(claimSubmission.rtInput).toHaveValue(testData.applicantAddress.rt);
        await expect(claimSubmission.rwInput).toHaveValue(testData.applicantAddress.rw);
        await expect(claimSubmission.provinceInput).toHaveValue(testData.applicantAddress.province);
        await expect(claimSubmission.cityInput).toHaveValue(testData.applicantAddress.city);
        await expect(claimSubmission.subDistrictInput).toHaveValue(testData.applicantAddress.subdistrict);
        await expect(claimSubmission.villageInput).toHaveValue(testData.applicantAddress.village);
        await expect(claimSubmission.emailInput).toHaveValue(testData.applicantAddress.email);

        await claimSubmission.selectClaimType(testData.claimType);
        await expect(claimSubmission.claimTypeSelectedText).toHaveText(testData.claimType);

        //Fill Beneficiary Participant
        await claimSubmission.fillClaimAmounts(testData.claimAmounts);
        await expect(claimSubmission.adjustmentNilaiTunaiInput).toHaveValue(testData.claimAmounts.adjustmentNilaiTunai);

        await claimSubmission.fillBeneficiaryBankDetails(testData.beneficiaryBank);

        await expect(claimSubmission.adjustmentNilaiTunaiInput).toHaveValue(testData.claimAmounts.adjustmentNilaiTunai);
        await expect(claimSubmission.claimFeeInput).toHaveValue(testData.claimAmounts.claimFee);
        await expect(claimSubmission.bankSelectedText).toHaveText(testData.beneficiaryBank.bankName);
        await expect(claimSubmission.bankBranchInput).toHaveValue(testData.beneficiaryBank.branch);
        await expect(claimSubmission.bankAccountInput).toHaveValue(testData.beneficiaryBank.accountNumber);
        await expect(claimSubmission.bankAccountNameInput).toHaveValue(testData.beneficiaryBank.accountName);

        //Fill submission date claim
        await expect(
            claimSubmission.submissionDateInput).toHaveValue(testData.submissionDate
        );

        //Fill incident date claim
        await expect(
            claimSubmission.incidentDateInput).toHaveValue(testData.incidentDate
        );
})