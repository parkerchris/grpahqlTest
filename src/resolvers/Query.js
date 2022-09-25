const Query = {
        
    posts(parent, args, { db }, info) {
        if(!args.query) {
            return db.posts
        }

        return db.posts.filter((post) => {
            const isTitleMatch = post.title.toLowerCase().includes(args.query.toLowerCase())
            const isBodyMatch = post.body.toLowerCase().includes(args.query.toLowerCase())
            return isTitleMatch || isBodyMatch
        })
    },

    users(parent, args, { db }, info) {
        if(!args.query) {
            return db.users
        }

        return db.users.filter((user) => {
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
    comments(parent, args, { db }, info) {
        return db.comments
    }
   }

   export { Query as default }