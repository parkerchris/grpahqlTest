import { v4 as uuidv4 } from 'uuid';


const Mutation = {
    createUser(parent, args, { db }, info) {
        const emailTaken = db.users.some((user) => {
            return user.email === args.data.email
        })

        if (emailTaken) {
            throw new Error('Email taken.')
        }

        const user = {
            id: uuidv4(),
            ...args.data
        }

        db.users.push(user)

        return user

    },

    deleteUser(parent, args, { db }, info) {
        const userIndex = db.users.findIndex((user) => user.id === args.id)

        if (userIndex === -1) {
            throw new Error('User not found')
        }

        const deletedUsers = db.users.splice(userIndex, 1)

        posts = db.posts.filter((post) => {
            const match = post.author === args.id

            if (match) {
                comments = db.comments.filter((comment) => {
                    return comment.post !== post.id
                })
            }

            return !match
        })
        comments = db.comments.filter((comment) => comment.author !== args.author)

        return deletedUsers[0]

    },

    updateUser(parent, args, { db }, info) {
        const { id, data } = args
        const user = db.users.find((user) => user.id === id)

        if (!user) {
            throw new Error('No user found.')
        }

        if (typeof data.email === 'string') {
            const emailTaken = db.users.some((user) => user.email === data.email)

            if (emailTaken) {
                throw new Error('Email taken')
            }

            user.email = data.email
        }

        if (typeof data.name === 'string') {
            user.name === data.name
        }

        if (typeof data.age !== 'undefined') {
            user.age === data.age
        }

        return user

    },

    createPost(parent, args, { db }, info) {
        const userExists = db.users.some((user) => {
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

        db.posts.push(post)

        return post

    },

    createComment(parent, args, { db }, info) {
        const userExists = db.users.some((user) => {
            return user.id === args.author
        })

        if (!userExists) {
            throw new Error('User not found!')
        }


        const postExists = db.posts.some((post) => {
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

        db.comments.push(comment)

        return comment
    }

   }

   export { Mutation as default }