const users = [
    {
        id: '1',
        name: 'Chris',
        email: 'chris@gmail.com',
        age: 33
    },
    {
        id: '2',
        name: 'Julie',
        email: 'julie@gmail.com',
        age: 40
    },
    {
        id: '3',
        name: 'Mike',
        email: 'mike@gmail.com',
        age: 34
    },
]

const posts = [
    {
        id: '1',
        title: 'ths is title 1',
        body: 'this is post 1',
        published: true,
        author: '1'
    },
    {
        id: '2',
        title: 'title 2',
        body: 'this is post 2',
        published: true,
        author: '1'
    },
    {
        id: '3',
        title: '3rd title',
        body: 'this is post 3',
        published: false,
        author: '2'
    },
]

const comments = [
    {
        id: '1',
        text: 'ths is text 1',
        author: '1',
        post: '1'
    },
    {
        id: '2',
        text: 'ths is text 2',
        author: '3',
        post: '2'
    },
    {
        id: '3',
        text: 'ths is text 3. One of the best love it. Glad you like it.',
        author: '3',
        post: '2'
    },
    {
        id: '4',
        text: 'ths is text 4. This is working so good.',
        author: '2',
        post: '1'
    }
]

const db = {
    users,
    posts,
    comments
}

export { db as default }