import axios, { AxiosResponse } from 'axios';

import movie from "./types/movie";
import search from "./types/search";

import {
	GraphQLSchema,
	GraphQLObjectType,
	GraphQLString,
	GraphQLList,
} from "graphql";
import { graphqlHTTP } from 'express-graphql';

import express from 'express';

const cors = require('cors');
require("dotenv").config();

const app = express();

app.use(cors());

const port: string = process.env.PORT || '8000';

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
        	.then((res : AxiosResponse<any>) => res.data.Search)
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
