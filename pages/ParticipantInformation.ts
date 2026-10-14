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
  readonly resultSearch: Locator;

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

    this.policyCombobox = 
    page.locator('#key');

    this.policyHolderSearchInput = 
    page.locator('#word');

    this.participantSearchCombobox =
    page.locator('#key2');

    this.participantNameSearchInput = 
    page.locator('#word2')

    this.searchButton = 
    page.locator('#btn-search');

    this.resultSearch = 
    page.locator('#table');

  }

    async openFromHome() {
    await this.participantMenu.click();
    await this.groupLifeMenu.waitFor({
        state: 'visible'
    });

    await this.groupLifeMenu.hover();

    await this.participantInformationLink.waitFor({
        state: 'visible'
    });

    await this.participantInformationLink.click();
    };

    async choosePolicyHolder() {
        await this.policyCombobox.selectOption({
            label: 'Policy Holder'
        });
    }

    async searchByPolicyHolder(policyHolder: string) {
        await this.policyHolderSearchInput.fill(policyHolder);
        // console.log('button count:', await this.searchButton.count())
        // console.log('visible:', await this.searchButton.isVisible())
        // console.log('enabled:', await this.searchButton.isEnabled())
        await this.searchButton.click();
    }

    async chooseParticipantName() {
        await this.participantSearchCombobox.selectOption({
            label: 'Participant Name',
        });
    }

    async searchByParticipantName(participantName: string) {
        await this.participantNameSearchInput.fill(participantName);
        await this.searchButton.click();
    }

   participantAndProductRows(participantName: string, productName: string): Locator {
        return this.resultSearch.getByRole('row').filter({
            has: this.page.getByRole('cell', {
                name: participantName
            }),
        })
        .filter({
            has: this.page.getByRole('cell', {
                name: productName,
                exact: true,
            }),
        })
   }

    policyHolderRows(policyHolder: string): Locator {
        return this.resultSearch.getByRole('row').filter({
            has: this.page.getByRole('cell', {
                name: policyHolder,
                exact: true
            })
        })
    }

}

