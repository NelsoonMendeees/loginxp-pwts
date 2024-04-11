import { expect, Locator, type Page } from '@playwright/test'

export interface Account {
  username: string
  password: string
}

export class Login {
  page: Page

  constructor(page: Page) {
    this.page = page
  }

  async submit(account: Account) {
    await this.page.goto('/')

    await this.page.getByPlaceholder('nome de usuário').fill(account.username)
    await this.page.getByPlaceholder('senha secreta').fill(account.password)
    await this.page.getByRole('button', { name: 'Entrar' }).click()
  }

  async getPopUpContent(): Promise<Locator> {
    return this.page.locator('#swal2-html-container')
  }

  async asserToast(text: string) {
    const toastContent = this.page.getByRole('status')
    await expect(toastContent).toContainText(text)
    await toastContent.screenshot()
  }
}
