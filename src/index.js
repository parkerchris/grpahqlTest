import { GraphQLServer } from 'graphql-yoga'
import { v4 as uuidv4 } from 'uuid';




//demo user data

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



// type definitions (schema)

const typeDefs = `

    type Query {
        users(query: String): [User]!
        me: User!
        post: Post!
        posts(query: String): [Post]!
        comments: [Comment]!
    }

    type Mutation {
        createUser(name: String!, email: String!, age: Int): User!
        createPost(title: String!, body: String!, published: Boolean!, author: ID!): Post!
        createComment(text: String!, author: ID!, post: ID!): Comment!
    }

    type User {
        id: ID!
        name: String!
        email: String!
        age: Int
        posts: [Post!]!
        comments: [Comment!]!
    }

    type Post {
        id: ID!
        title: String!
        body: String!
        published: Boolean!
        author: User!
        comments: [Comment!]!
    }

    type Comment {
        id: ID!
        text: String!
        author: User!
        post: Post!
    }

`


//resolvers

const resolvers = {
    Query: {
        
        posts(parent, args, ctx, info) {
            if(!args.query) {
                return posts
            }

            return posts.filter((post) => {
                const isTitleMatch = post.title.toLowerCase().includes(args.query.toLowerCase())
                const isBodyMatch = post.body.toLowerCase().includes(args.query.toLowerCase())
                return isTitleMatch || isBodyMatch
            })
        },

        users(parent, args, ctx, info) {
            if(!args.query) {
                return users
            }

            return users.filter((user) => {
                return user.name.toLowerCase().includes(args.query.toLowerCase())
            })
        },

        me() {
            return {
                id: '12341234',
                name: "mike",
                email: "mike@gmail.com",
                age: 23
            }
        },
        post() {
            return {
                id: "124123123",
                title: "this is the title to the post",
                body: "this is the body of a post post post",
                published: true
            }
        },
        comments(parent, args, ctx, info) {
            return comments
        }
       },


       Mutation: {
        createUser(parent, args, ctx, info) {
            const emailTaken = users.some((user) => {
                return user.email === args.email
            })

            if (emailTaken) {
                throw new Error('Email taken.')
            }

            const user = {
                id: uuidv4(),
                name: args.name,
                email: args.email,
                age: args.age
            }

            users.push(user)

            return user

        },

        createPost(parent, args, ctx, info) {
            const userExists = users.some((user) => {
                return user.id === args.author
            })

            if (!userExists) {
                throw new Error('User not found.')
            }

            const post = {
                id: uuidv4(),
                title: args.title,
                body: args.body,
                published: args.published,
                author: args.author
            }

            posts.push(post)

            return post

        },

        createComment(parent, args, ctx, info) {
            const userExists = users.some((user) => {
                return user.id === args.author
            })

            if (!userExists) {
                throw new Error('User not found!')
            }


            const postExists = posts.some((post) => {
                return post.id === args.post
            })

            if (!postExists) {
                throw new Error ('Post does not exist.')
            }

            //review the above Section 3 lesson 25

            const comment = {
                id: uuidv4(),
                text: args.text,
                author: args.author,
                post: args.author
            }

            comments.push(comment)

            return comment
        }

       },



       Post: {
        author(parent, args, ctx, info) {
            return users.find((user) => {
                return user.id === parent.author
            })
        },
        comments(parent, args, ctx, info) {
            return comments.filter((comment) => {
                return comment.post === parent.id
            })
        }
       },


       User: {
        posts(parent, args, ctx, info) {
            return posts.filter((post) => {
                return post.author === parent.id
            })
        },
        comments(parent, args, ctx, info) {
            return comments.filter((comment) => {
                return comment.author === parent.id
            })
        }
       },


       Comment: {
        author(parent, args, ctx, info) {
            return users.find((user) => {
                return user.id === parent.author //review this again. You got stuck. Section 2 lesson 21
            })
        },
        post(parent, args, ctx, info) {
            return posts.find((post) => {
                return post.id === parent.post
            })
        }
       }
        
    }




const server = new GraphQLServer({
    typeDefs,
    resolvers
})

server.start(() => {
    console.log('The server is up')
})

