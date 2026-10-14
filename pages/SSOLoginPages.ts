import { expect, type Locator, type Page } from "@playwright/test";

export class SSOLoginPages {
    readonly usernameInput: Locator;
    readonly passwordInput: Locator;
    readonly signInButton: Locator;

    constructor(private readonly page: Page) {
        this.usernameInput = page.getByRole('textbox', {name: 'Username', exact: true})
        this.passwordInput = page.getByRole('textbox', {name: 'Password', exact: true})
        this.signInButton = page.getByRole('button', {name: 'Sign In', exact: true})
}
    async goto(): Promise<void> {
        const ssoBaseURL = process.env.SSO_BASE_URL;

        if (!ssoBaseURL) {
            throw new Error('Missing required environment variable: SSO_BASE_URL')
        }

        await this.page.goto(ssoBaseURL);

        await expect(this.usernameInput).toBeVisible();
        await expect(this.passwordInput).toBeVisible();
        await expect(this.signInButton).toBeVisible();
    }

    async login(username: string, password: string): Promise<void> {
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.signInButton.click()
    }
    
}