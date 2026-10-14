import { expect, test as setup } from '@playwright/test'
import { SSOLoginPages } from '../../pages/SSOLoginPages'
import { PortalDashboardPage } from '../../pages/PortalDashboardPage'

const authFile = 'playwright/.auth/user.json'

setup('authenticate through SSO to Kumkara', async({ page, context }) => {
    const username = process.env.SSO_USERNAME;
    const password = process.env.SSO_PASSWORD;

    if(!username || !password) {
        throw new Error(
            'Missing required environment variables: SSO_USERNAME and/or SSO_PASSWORD.',
        );
    }

    const ssoLoginPages = new SSOLoginPages(page);
    await ssoLoginPages.goto();
    await ssoLoginPages.login(username, password);

    const portalDashboardPage = new PortalDashboardPage(page)
    await portalDashboardPage.expectLoaded()

    const kumkaraPage = await portalDashboardPage.openKumkara()

    const setupSessionEntries = await kumkaraPage.evaluate(
        () => window.sessionStorage.length
    );
    
    console.log(`SETUP sessionStorage entries : ${setupSessionEntries}`)

    await expect(
        kumkaraPage.getByText('Participant', {exact: true})
    ).toBeVisible();

    await context.storageState({ path: authFile})
});