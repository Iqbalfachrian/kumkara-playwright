import { Locator, Page } from '@playwright/test';

export class ParticipantInformationPage {
  readonly page: Page;
  readonly participantMenu: Locator;
  readonly groupLifeMenu: Locator;
  readonly participantInformationLink: Locator;
  readonly policyCombobox: Locator;
  readonly policyHolderSearchInput: Locator;
  readonly participantSearchCombobox: Locator;
  readonly participantNameSearchInput: Locator;
  readonly searchButton: Locator;
  readonly resultTable: Locator;

  constructor(page: Page) {
    this.page = page;

    this.participantMenu = page.getByText('Participant', {
      exact: true,
    });

    this.groupLifeMenu = page.getByRole('link', {
      name: /Group Life$/,
    });

    this.participantInformationLink = page.locator(
    'a[href$="/grouplife/new_business/participant_information"]'
    );

    this.policyCombobox = page.locator('#key');
    this.policyHolderSearchInput = page.locator('#word');
    this.participantSearchCombobox = page.locator('#key2');
    this.participantNameSearchInput = page.locator('#word2');
    this.searchButton = page.locator('#btn-search');
    this.resultTable = page.locator('#table');

  }

    async openFromHome(): Promise<void> {
    await this.page.goto('/index.php/home');
    await this.participantMenu.click()
    await this.groupLifeMenu.hover();
    await this.participantInformationLink.click();

    }

    async searchByPolicyHolder(policyHolder: string): Promise<void> {
        await this.policyCombobox.selectOption({
            label: 'Policy Holder'
        });
        await this.policyHolderSearchInput.fill(policyHolder);
        await this.searchButton.click();
    }

    async searchByParticipantName(participantName: string): Promise<void> {
        await this.participantSearchCombobox.selectOption({
            label: 'Participant Name'
        });
        await this.participantNameSearchInput.fill(participantName);

        // console.log('Search button count:', await this.searchButton.count());
        // console.log('Search button visible:', await this.searchButton.isVisible());
        // console.log('Search button enabled:', await this.searchButton.isEnabled());

        await this.searchButton.click();
    }


    policyHolderRows(policyHolder: string): Locator {
        return this.resultTable.getByRole('row').filter({
            hasText: policyHolder
        });
    }
    participantAndProductRows(
        participantName: string,
        productName: string
    ): Locator {
        return this.resultTable
            .getByRole('row')
            .filter({ hasText: participantName })
            .filter({ hasText: productName })
    }
}

