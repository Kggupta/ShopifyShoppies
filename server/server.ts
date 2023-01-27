import axios from 'axios';

import movie from "./types/movie";
import search from "./types/search";

import {
	GraphQLSchema,
	GraphQLObjectType,
	GraphQLString,
	GraphQLList,
} from "graphql";

const cors = require('cors');

import dotenv from 'dotenv';
dotenv.config();

import express from 'express';

import { graphqlHTTP } from 'express-graphql';

const app = express();

app.use(cors());

const port: string = process.env.PORT || '5000';

const query = new GraphQLObjectType({
  name: "RootQuery",
  fields: {
    search: {
      type: new GraphQLList(movie),
      args: {
        title: { type: GraphQLString },
      },
      async resolve(parent, args) {
        const result: search[] = await axios.get(`http://www.omdbapi.com/?s=${args.title}&apikey=${process.env.KEY}`)
			.then((res) => res.data.Search)
			.catch(console.log);

        return result;
      }
    },
  },
});

app.use(
  "/graphql",
  graphqlHTTP({
    schema: new GraphQLSchema({ query }),
    graphiql: true,
  })
);

app.listen(port, () => {
  console.log(`Running on port ${port}`);
});
