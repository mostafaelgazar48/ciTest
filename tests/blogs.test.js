const Page = require('./helpers/page');

beforeEach(async () => {
    page = await Page.build();
    await page.goto('http://localhost:3000')
});

afterEach(async () => {
    await page.close();
})



describe('when loggede in ', async () => {

    beforeEach(async () => {
        await page.login();
        await page.click('a.btn-floating')
    });

    test('show add blogs form', async () => {

        const labelText = await page.extractContentOf('form label')

        expect(labelText).toEqual('Blog Title');
    });

    describe(' and inputs are invalid', async () => {
        beforeEach(async () => {
            await page.click('form button');
        })
        test('red label should shows', async () => {
            const label = await page.extractContentOf('.red-text');
            expect(label).toEqual('You must provide a value')
        })
    })


    describe('inputs are valid', async () => {
        beforeEach(async () => {
            await page.type('.title input', 'This is my title');
            await page.type('.content input', 'This is my content');
            await page.click('form button');

        });

        test('when submited and waiting to preview', async () => {
            const text = await page.extractContentOf('h5')
            expect(text).toEqual('Please confirm your entries');
        })


        test('when submited and saving data', async () => {

            await page.click('.green')
            await page.goto('http://localhost:3000/blogs')
            page.waitFor('.card')
            const text = await page.extractContentOf('.card-title')
            const contentText = await page.extractContentOf('p')

            expect(text).toEqual('This is my title');
            expect(contentText).toEqual('This is my content');



        })
    })
});

describe('user is not logged in', async () => {
    test('user cannot create blog', async () => {
       const result= await page.evaluate( () => {
            return fetch('/api/blogs', {
                method: 'POST',
                 credentials: 'same-origin',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ title: 'THis is titlt', content: 'this is content' })

            }
            ).then(res =>res.json())


        })
        console.log(result);
    })
})