import { GraphQLObjectType, GraphQLString } from 'graphql';

export default new GraphQLObjectType({
    name: "movie",
    fields: () => ({
        Title: { type: GraphQLString },
        Year: { type: GraphQLString },
        imdbID: { type: GraphQLString },
        Type: { type: GraphQLString },
        Poster: { type: GraphQLString }
    })
});