test('dbl returns first arg times 2', () => {
return dbl(2).then(val => {
        expect(val).toBe(4);
    });
});


//////
//if we have a callback:

test('callback gets passed true when first arguments is a directory', done => {
    isDir(__dirname, function(err, bool) {
        expect(bool).toBe(true);
        done();
    })
});

//////writing test for twitter api
const headlines = require('./headlines');
const twApi = require('./twApi');


jest.mock('./twApi');

test('headlines formats and filteres tweets correctly', () => {
    twApi.getTweets.mockResolvedValue([
        {
            full_text: 'This is a tweet',
            entities: {
                urls: []
            }
        },
        {
            full_text: 'This is another tweet',
            entities: {
                urls: [{
                    url: "https://www.spiced-academy.com"
                }]
        }
    ])
    return headlines().then(function(tweets) {
        expect(tweets.length).toBe(1);
    })
});

git cherry-pick 9188cb8
in testing folder we should type npm install



/////
test confirm
if no matches - empty array,
starts with letter -
