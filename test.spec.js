
const {performLogin, createIssue, assertActionResult} = require('./e2e-helper.js');

describe('End to End tests', () => {
    beforeAll(async () => {
        await performLogin();
    })

    it('create issue', async () => {
        await createIssue('test-1.yml', 'test', {
            '#issue_form_contact': 'test@test.org',
            'textarea[name="issue_form[what-happened]"]': 'something',
            'input[type="checkbox"][value="I agree"]': true,
            'input[type=radio][value="1.0.2 (Default)"]': true
        })

        await assertActionResult();
    });

    it('create issue text only', async () => {
        await createIssue('test-1.yml', 'test', {
            '#issue_form_contact': 'test@test.org',
            'textarea[name="issue_form[what-happened]"]': 'something',
        })

        await assertActionResult();
    });
});

// describe('End to End tests', () => {
//     async function performLogin() {
//         if (!process.env.E2E_USER_NAME || !process.env.E2E_USER_PASSWORD) {
//             process.exit(1);
//             return;
//         }
        
//         console.log('Perform login ...');
        
//         await page.goto('https://github.com/login');
//         await expect(page).toFill('#login_field', process.env.E2E_USER_NAME);
//         await expect(page).toFill('#password', process.env.E2E_USER_PASSWORD);
     
//         await Promise.all([
//              page.waitForNavigation(),
//              expect(page).toClick('input[type=submit]', { value: 'Sign in' })
//         ]); 
        
//         try {
//             const authError = await page.$eval('#login .flash-error', (el) =>
//             el.textContent.trim(),
//             );
//             throw new Error(authError);
//         } catch (error) {
//             if (!error.message.includes('failed to find element matching selector')) {
//                 await expect(error).toBeUndefined();
//             }
//         }
        
//         console.log('Run E2E tests with authenticated user');
//     };

//     beforeAll(async () => {
//         await performLogin();
//     })
  
//       async function fillForm(data) {
//         for(const [selector, value] of Object.entries(data)) {
//             await page.$eval(selector, (el, formValue) => {
//                 if (['text', 'textarea'].includes(el.type)) {
//                     el.value = formValue
//                 } else if (['radio', 'checkbox'].includes(el.type)) {
//                     el.click();
//                 }
//             }, value);            
//         }      
//       }
//       async function createIssue(template, title, data) {
//         await page.goto(`https://github.com/stefanbuck/template/issues/new?template=${template}&title=${title}`);
//         await fillForm(data);
//       }

//      async function assertActionResult() {
//         await expect(page).toClick('button', { text: 'Submit new issue' })
//         await page.waitForSelector('.State.State--closed', {timeout:0});
        
//         await page.waitForSelector('.js-comment-body pre')

//         const tweetHandle = await page.$('.js-comment-body pre');
//         expect(await tweetHandle.evaluate(node => node.innerText)).toMatchSnapshot();
//       }

//     it('create issue', async () => {
//         await createIssue('test-1.yml', 'test', {
//             '#issue_form_contact': 'test@test.org',
//             'textarea[name="issue_form[what-happened]"]': 'something',
//             'input[type="checkbox"][value="I agree"]': true,
//             'input[type=radio][value="1.0.2 (Default)"]': true
//         })

//         await assertActionResult();
//     });
  
//     it('creat issue with text only', async () => {
//         await createIssue('test-1.yml', 'test', {
//             '#issue_form_contact': 'test@test.org',
//             'textarea[name="issue_form[what-happened]"]': 'something',
//         })

//         await assertActionResult();
//     });
//   });