import React from 'react';
import logo from './logo.svg';
import './App.css';
import Index from './components/Index';
import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import axios from 'axios';
import {
  ApolloProvider,
} from "@apollo/client";


const httpLink = createHttpLink({
  uri: 'https://cors-proxy-rofl.herokuapp.com/152.228.215.94:81/api',
});


const authLink = setContext(async (_, { headers }) => {
  let token;
  if (localStorage.getItem('token')) {
    token = localStorage.getItem('token');
  }
  else { 
    token = await axios({
    method: 'POST',
    url: 'https://cors-proxy-rofl.herokuapp.com/152.228.215.94:81/auth/login',
    headers: {
      "x-requested-with": 'localhost'
    },
    data: {
      email: 'test@test.com',
      password: '1234567Qa'
    }
  }).then(r => {
    if (r.data?.access_token) {
      localStorage.setItem('token', r.data.access_token)
      return r.data?.access_token
    }
    else return ''
  })
}

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  }
});


const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: authLink.concat(httpLink)
})



const App: React.FC = () => {
  return (
  <ApolloProvider client={client}>
  <Index/>
  </ApolloProvider>
  );
}

export default App;
