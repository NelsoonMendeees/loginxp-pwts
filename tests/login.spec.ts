import { test, expect } from '@playwright/test'
import { Account, Login } from './support/actions/login'

let login: Login

test.beforeEach(({ page }) => {
  login = new Login(page)
})

test('deve logar com sucesso', async ({ page }) => {
  const account: Account = {
    username: 'qa',
    password: 'xperience'
  }
  await login.submit(account)

  await expect(await login.getPopUpContent()).toContainText(
    'Suas credenciais são válidas :)'
  )
})

test('não deve logar com senha inválida', async ({ page }) => {
  const account: Account = {
    username: 'qa',
    password: 'pwd1234'
  }

  await login.submit(account)
  await login.asserToast('Oops! Credenciais inválidas :(')
})

test('não deve logar quando não preencho o login e senha', async ({ page }) => {
  const account: Account = {
    username: '',
    password: ''
  }

  await login.submit(account)
  await login.asserToast('Informe o seu nome de usuário!')
})

test('não deve logar quando não preencho a senha', async ({ page }) => {
  const account: Account = {
    username: 'qa',
    password: ''
  }

  await login.submit(account)
  await login.asserToast('Informe a sua senha secreta!')
})

test('não deve logar quando não preencho o usuário', async ({ page }) => {
  const account: Account = {
    username: '',
    password: 'xperience'
  }

  await login.submit(account)
  await login.asserToast('Informe o seu nome de usuário!')
})
