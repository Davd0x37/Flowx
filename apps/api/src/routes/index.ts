import auth from './auth';
import graphql from './graphql';
import user from './user';

// GraphQL yoga should be registered first
export default [graphql, auth, user];
