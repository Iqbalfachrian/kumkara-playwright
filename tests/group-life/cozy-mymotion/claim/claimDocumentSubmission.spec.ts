import { expect, test } from '@playwright/test';

import { ClaimDocumentSubmission } from '../../../../pages/group-life/claim/claim-submission/ClaimDocumentSubmission';
import { claimSubmissionDocumentData as testData } from '../../../../test-data/group-life/claim-submission/claimDocument'


test('Upload Claim Submission Document', async ({ page }) => {
    const claimDocuments = new ClaimDocumentSubmission(page);


    await claimDocuments.openFromHome();
    await claimDocuments.selectClaim(testData.target);
    await claimDocuments.openDocumentUpdate();

    //Header add 8 documents
    await expect(
        claimDocuments.documentTable.getByRole('row')).toHaveCount(testData.documents.length+1);

    await claimDocuments.uploadDocuments(
        testData.documents,
        testData.remarks
    )

    for(const document of testData.documents) {
        await expect(claimDocuments.documentFileInput(document.documentName)).toHaveValue(/\.pdf$/i);

        await expect(claimDocuments.documentRemarksInput(document.documentName)).toHaveValue(testData.remarks)
    }

    await claimDocuments.saveDocumentChanges();

    //Make sure record with claim submission number
    const savedClaimRow = claimDocuments.claimRowBySubmissionNo(
        testData.target.submissionNo
    );

    await expect(savedClaimRow).toHaveCount(1, {
        timeout: 15_000
    })

    await expect(savedClaimRow.getByRole('gridcell', {
        name: testData.target.submissionNo,
        exact: true
    })).toHaveText(testData.target.submissionNo)

    //Pick same policy record after back to dashboard
    await claimDocuments.selectClaim(testData.target);
    await claimDocuments.openDocumentUpdate();

    //Make sure save before next action
    for (const document of testData.documents) {
        await expect(
            claimDocuments.documentRemarksInput(document.documentName)
        ).toHaveValue(testData.remarks)
    }

    //Mark as complete
    //await claimDocuments.markAsComplete()
})