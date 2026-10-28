import { Locator, Page } from "@playwright/test";

export type ApplicantAddress = {
    address: string;
    rt: string;
    rw: string;
    province: string;
    city: string;
    subdistrict: string;
    village: string;
    email: string;
};

export type ClaimAmounts = {
    adjustmentNilaiTunai: string;
    claimFee: string;
};

export type BeneficiaryBankDetails = {
    bankName: string;
    branch: string;
    accountNumber: string;
    accountName: string;
}

export class ClaimSubmission {
    readonly page: Page;
    readonly form: Locator;

    readonly claimReasMenu: Locator;
    readonly groupLifeMenu: Locator;
    readonly claimSubmissionMenu: Locator;
    readonly addClaimSubmissionLink: Locator;

    readonly policySearchButton: Locator;
    readonly participantSearchButton: Locator;

    readonly searchDialog: Locator;
    readonly searchKeywordInput: Locator;
    readonly searchButton: Locator;
    readonly searchResultList: Locator;
    readonly selectResultButton: Locator;

    readonly policyNoInput: Locator;
    readonly policyHolderInput: Locator;
    readonly productInput: Locator;
    readonly policyStartDateInput: Locator;
    readonly policyEndDateInput: Locator;

    readonly participantNoInput: Locator;
    readonly participantNameInput: Locator;

    readonly relationshipDropdown: Locator;
    readonly addressInput: Locator;
    readonly rtInput: Locator;
    readonly rwInput: Locator;
    readonly provinceInput: Locator;
    readonly cityInput: Locator;
    readonly subDistrictInput: Locator;
    readonly villageInput: Locator;
    readonly emailInput: Locator;

    readonly claimTypeDropdown: Locator;
    readonly claimTypeSelectedText: Locator;

    readonly adjustmentNilaiTunaiInput: Locator;
    readonly claimFeeInput: Locator;

    readonly bankDropdown: Locator;
    readonly bankSelectedText: Locator;
    readonly bankBranchInput: Locator;
    readonly bankAccountInput: Locator;
    readonly bankAccountNameInput: Locator;

    readonly submissionDateInput: Locator;
    readonly incidentDateInput: Locator;

    constructor(page: Page) {
        this.page = page;

        // Kumkara menyimpan markup form tersembunyi yang duplikat.
        // form:visible membatasi locator ke form yang sedang dipakai.
        this.form = page.locator("form:visible");

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

        this.addClaimSubmissionLink = page.locator('#btn-create');

        this.policySearchButton = page.locator('#btn-show-modal-policy')

        this.participantSearchButton = this.form.locator(
            "#btn-show-modal-participant"
        );

        this.searchDialog = page.getByRole("dialog");
        this.searchKeywordInput = this.searchDialog.getByPlaceholder(
            "Entry Keyword...",
            {exact: true}
        );

        this.searchButton = this.searchDialog.locator('#btn-search');
        this.searchResultList = this.searchDialog.getByRole('listbox');
        this.selectResultButton = this.searchDialog.getByRole('button', {
            name: "Select",
            exact: true
        });

        this.policyNoInput = this.form.locator('#policy_no');
        this.policyHolderInput = this.form.locator('#policy_holder');
        this.productInput = this.form.locator('#product');
        this.policyStartDateInput = this.form.locator(
            '#contract_start_date'
        );
        this.policyEndDateInput = this.form.locator('#contract_end_date');

        this.participantNoInput = this.form.locator('#participant_no');
        this.participantNameInput = this.form.locator('#participant_name');

        this.relationshipDropdown = this.form.getByRole('combobox', {name: 'Hubungan Dengan Peserta'})
        this.addressInput = this.form.locator('#applicant_address:visible');
        this.rtInput = this.form.locator('#applicant_address_rt:visible');
        this.rwInput = this.form.locator('#applicant_address_rw:visible');
        this.provinceInput = this.form.locator('#applicant_address_province:visible');
        this.cityInput = this.form.locator('#applicant_address_city:visible');
        this.subDistrictInput = this.form.locator('#applicant_address_subdistrict:visible');
        this.villageInput = this.form.locator('#applicant_address_village:visible');
        this.emailInput = this.form.locator('#applicant_email:visible');

        //Dropdown Claim
        this.claimTypeDropdown = this.form.locator(
            "#s2id_claim_type:visible .select2-choice"
        )

        this.claimTypeSelectedText = this.form.locator('#s2id_claim_type:visible .select2-chosen');


        this.adjustmentNilaiTunaiInput = this.form.locator('#posisi_dana:visible');
        this.claimFeeInput = this.form.locator('#claim_fee:visible');
        this.bankDropdown = this.form.locator('#s2id_applicant_bank_code:visible .select2-choice');
        this.bankSelectedText = this.form.locator('#s2id_applicant_bank_code:visible .select2-chosen');
        this.bankBranchInput = this.form.locator('#applicant_bank_branch:visible');
        this.bankAccountInput = this.form.locator('#applicant_bank_account:visible');
        this.bankAccountNameInput = this.form.locator('#applicant_bank_account_name:visible');

        this.submissionDateInput = this.page.getByRole('textbox', {name: 'Tanggal Pengajuan Klaim *'})
        this.incidentDateInput = this.page.getByRole('textbox', {name: 'Tanggal Peristiwa * Tanggal'})

    }

        async openFromHome(): Promise<void> {
        await this.page.goto('index.php/home');
        await this.claimReasMenu.click();
        await this.groupLifeMenu.hover();
        await this.claimSubmissionMenu.click();
    

        //open claim submission
        await this.addClaimSubmissionLink.waitFor({
            state:'visible',
            timeout: 15_000
        });
        await this.addClaimSubmissionLink.click();
    }

        async searchAndSelectPolicy(policyNo: string): Promise<void> {
            await this.policySearchButton.click();
            await this.searchDialog.waitFor({
                state: "visible",
                timeout: 15_000
            });
            
            await this.searchKeywordInput.fill(policyNo);
            await this.searchButton.click();

            const matchingOption = this.searchResultList.getByRole('option').filter({ hasText: policyNo})

            await matchingOption.waitFor({
                state: 'visible',
                timeout: 15_000
            });
            await matchingOption.click();
            
            await this.selectResultButton.click();
        }

        async searchAndSelectParticipant(participantName: string): Promise<void> {
            await this.participantSearchButton.click();

            await this.searchDialog.waitFor({
                state: 'visible',
                timeout: 15_000
            });

            await this.searchKeywordInput.fill(participantName);
            await this.searchButton.click();

            const matchingOption = this.searchResultList
            .getByRole('option')
            .filter({ hasText: participantName});

            await matchingOption.waitFor({
                state: 'visible',
                timeout: 15_000,
            });
            await matchingOption.click();
            await this.selectResultButton.click();
        }

        async selectRelationship(relationship: string): Promise<void> {
            await this.relationshipDropdown.selectOption({
                label: relationship
            });
        };

        async applicantAddress(
            address: ApplicantAddress
        ): Promise<void> {
            await this.addressInput.fill(address.address);
            await this.rtInput.fill(address.rt);
            await this.rwInput.fill(address.rw);
            await this.provinceInput.fill(address.province);
            await this.cityInput.fill(address.city);
            await this.subDistrictInput.fill(address.subdistrict);
            await this.villageInput.fill(address.village);
            await this.emailInput.fill(address.email);
        };

        async selectClaimType(claimType: string): Promise<void> {
            await this.claimTypeDropdown.click();

            const matchingOption = this.page
            .getByRole('listbox')
            .getByRole('option', {
                name: claimType,
                exact: true,
            });

            await matchingOption.waitFor({
                state: 'visible',
                timeout: 10_000
            });
            await matchingOption.click();
        }

        async fillClaimAmounts(amounts: ClaimAmounts): Promise<void> {
            await this.adjustmentNilaiTunaiInput.fill(
                amounts.adjustmentNilaiTunai
            );
            await this.claimFeeInput.fill(amounts.claimFee);
        }

        async fillBeneficiaryBankDetails(details: BeneficiaryBankDetails): Promise<void> {
            await this.bankDropdown.click();

            const matchingBank = this.page
            .getByRole('listbox')
            .getByRole('option', {
                name: details.bankName,
                exact: true,
            });

            await matchingBank.waitFor({
                state: 'visible',
                timeout: 10_000
            })
            await matchingBank.click();

            await this.bankBranchInput.fill(details.branch);
            await this.bankAccountInput.fill(details.accountNumber);
            await this.bankAccountNameInput.fill(details.accountName);
        }

        async fillClaimDates(
            submissionDate: string,
            incidentDate: string
        ): Promise<void> {
          await this.replaceMaskedDate(
            this.submissionDateInput, submissionDate
          );

          await this.replaceMaskedDate(
            this.incidentDateInput, incidentDate
          )

          //Tutup datepicker setelah kedua field terisi
          await this.incidentDateInput.press('Escape');
          await this.page
            .locator('.datepicker.datepicker-dropdown:visible')
            .waitFor({ state: 'hidden', timeout: 5_000});
        }

        private async replaceMaskedDate(
            dateInput: Locator,
            date: string
        ): Promise<void> {
            await dateInput.click();
            await dateInput.press('ControlOrMeta+A');
            await dateInput.press('Backspace');
            await dateInput.pressSequentially(date);
            await dateInput.press('Tab')
        }
}
