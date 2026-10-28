import { expect, Locator, Page } from '@playwright/test';
import { resolve } from 'node:path';

export type ClaimDocumentInput = {
    documentName: string,
    fileRelativePath: string
}

export type ClaimDocumentTarget = {
    submissionNo: string,
    policyNo: string,
    policyHolder: string,
    product: string,
    participantName: string;
};

export class ClaimDocumentSubmission {
    readonly page: Page;

    readonly claimReasMenu: Locator;
    readonly groupLifeMenu: Locator;
    readonly claimSubmissionMenu: Locator;

    readonly claimGrid: Locator;
    readonly updateDocumentButton: Locator;

    readonly documentTable: Locator;
    readonly documentForm: Locator;
    readonly saveButton: Locator;
    readonly uploadSuccessDialog: Locator;
    readonly uploadSuccessMessage: Locator;
    readonly uploadSuccessOkButton: Locator;
    //readonly markAsCompleteButton: Locator;

    constructor(page: Page) {
        this.page = page;

             this.claimReasMenu = page.getByRole("link", {
            name: /Claim & Reas/
         });

        this.groupLifeMenu = page.getByRole("link", {
            name: /Group Life/,
        });

        this.claimSubmissionMenu = page.getByRole("link", {
            name: "Claim Submission",
            exact: true,
        });

        this.claimGrid = page.locator('table#table');

        this.updateDocumentButton = page.getByRole('link', {
            name: /Update Document Claim/,
        });

        this.documentTable = page.locator('#table-document:visible');

        this.documentForm = page
            .locator('form:visible')
            .filter({has: this.documentTable });

        this.saveButton = this.documentForm.getByRole('button', {
            name: /Save/
        });

        this.uploadSuccessDialog = page.getByRole('dialog', {
            name: 'Success'
        })

        this.uploadSuccessMessage = this.uploadSuccessDialog.getByText('File uploaded successfully', {exact: true})

        this.uploadSuccessOkButton = this.uploadSuccessDialog.getByRole('button', {name: 'OK', exact: true})

        // this.markAsCompleteButton = this.documentForm.getByRole('button', {
        //     name: /Mark as Complete/
        // });
    }

    async openFromHome(): Promise<void> {
        await this.page.goto('index.php/home');
        await this.claimReasMenu.click();
        await this.groupLifeMenu.hover();
        await this.claimSubmissionMenu.click();

        await expect(this.claimGrid).toBeVisible({
            timeout: 10_000
        });
    }

    private claimRow(target: ClaimDocumentTarget): Locator {
        return this.claimGrid
            .getByRole('row')
            .filter({hasText: target.submissionNo})
            .filter({hasText: target.policyNo})
            .filter({hasText: target.product})
            .filter({hasText: target.participantName});
    }

    async selectClaim(target: ClaimDocumentTarget): Promise<void> {
        const row = this.claimRow(target);

        await expect(row).toHaveCount(1, {
            timeout: 10_000
        });

        //click participant name with row target
        await row.locator('td[aria-describedby="table_participant_name"]')
        .click();

        await expect(row).toHaveAttribute('aria-selected', 'true');
    }

    async openDocumentUpdate(): Promise<void> {
        await expect(this.updateDocumentButton).toHaveCount(1);
        await this.updateDocumentButton.click();

        await expect(this.documentTable).toBeVisible({
            timeout: 10_000,
        });
        
        //Wait document row success loading
        await this.documentTable
        .getByRole('row').nth(1).waitFor({ state: 'visible', timeout: 10_000})
    }

    private documentRow(documentName: string): Locator{
        return this.documentTable.getByRole('row').filter({ hasText: documentName })
    }

    documentFileInput(documentName: string): Locator {
        return this.documentRow(documentName).locator(
            'input[type="file"][name^="attachments["]'
        );
    }

    documentRemarksInput(documentName: string): Locator {
        return this.documentRow(documentName).locator(
            'textarea[name^="remarks["]'
        );
    }

    async uploadDocuments(
        documents: readonly ClaimDocumentInput[],
        remarks: string
    ): Promise<void> {
        for (const document of documents) {
            const row = this.documentRow(document.documentName);

            await expect(row).toHaveCount(1);

            const filePath = resolve(
                process.cwd(),
                document.fileRelativePath
            )

            await this.documentFileInput(
                document.documentName
            ).setInputFiles(filePath);

            await this.documentRemarksInput(
                document.documentName
            ).fill(remarks);
        }
    }

    async saveDocumentChanges(): Promise<void> {
        await this.saveButton.click();

        await expect(this.uploadSuccessDialog).toBeVisible({
            timeout: 10_000
        });

        await expect(this.uploadSuccessMessage).toHaveText('File uploaded successfully')
        
        await this.uploadSuccessOkButton.click()
        await expect(this.uploadSuccessDialog).toBeHidden({
            timeout: 10_000
        })

        //Kumkara back to Dashboard Claim Submission
        await expect(this.claimGrid).toBeVisible({timeout: 15_000})
    }

    claimRowBySubmissionNo(submissionNo: string): Locator {
        const submissionCell = this.page.getByRole('gridcell', {
            name: submissionNo,
            exact: true
        });

        return this.claimGrid.getByRole('row').filter({
            has: submissionCell
        })
    }

    // async markAsComplete(): Promise<void> {
    //     await expect(this.markAsCompleteButton).toBeVisible({
    //})    timeout: 10_000
    //     await this.markAsCompleteButton.click();

}
