
async function performLogin() {
    if (!process.env.E2E_USER_NAME || !process.env.E2E_USER_PASSWORD) {
        process.exit(1);
        return;
    }
    
    console.log('Perform login ...');
    
    await page.goto('https://github.com/login');
    await expect(page).toFill('#login_field', process.env.E2E_USER_NAME);
    await expect(page).toFill('#password', process.env.E2E_USER_PASSWORD);
    
    await Promise.all([
            page.waitForNavigation(),
            expect(page).toClick('input[type=submit]', { value: 'Sign in' })
    ]); 
    
    try {
        const authError = await page.$eval('#login .flash-error', (el) =>
        el.textContent.trim(),
        );
        throw new Error(authError);
    } catch (error) {
        if (!error.message.includes('failed to find element matching selector')) {
            await expect(error).toBeUndefined();
        }
    }


    const currentUrl = await page.url();
    if (currentUrl.includes('/sessions/two-factor')) {
      if (!process.env.E2E_USER_2FA) {
        // Account has 2fa enabled but E2E_USER_2FA is not set
        process.exit(1);
      }

      await expect(page).toFill('#otp', process.env.E2E_USER_2FA);

      await Promise.all([
        page.waitForNavigation(),
        expect(page).toClick('input[type=submit]', { value: 'Verify' }),
      ]);
    }
    
    console.log('Run E2E tests with authenticated user');
};


async function fillForm(data) {
    for(const [selector, value] of Object.entries(data)) {
        await page.$eval(selector, (el, formValue) => {
            if (['text', 'textarea'].includes(el.type)) {
                el.value = formValue
            } else if (['radio', 'checkbox'].includes(el.type)) {
                el.click();
            }
        }, value);            
    }      
}

async function createIssue(template, title, data) {
    await page.goto(`https://github.com/stefanbuck/template/issues/new?template=${template}&title=${title}`);
    await fillForm(data);
}

async function assertActionResult() {
    await expect(page).toClick('button', { text: 'Submit new issue' })
    await page.waitForSelector('.State.State--closed', {timeout:0});
    
    await page.waitForSelector('.js-comment-body pre')

    const tweetHandle = await page.$('.js-comment-body pre');
    expect(await tweetHandle.evaluate(node => node.innerText)).toMatchSnapshot();
}

module.exports = {
    createIssue,
    performLogin,
    assertActionResult
}