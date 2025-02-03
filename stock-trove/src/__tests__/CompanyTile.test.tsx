import React from 'react'
//import {rest} from 'msw'
//import {setupServer} from 'msw/node'
import {render, fireEvent, screen} from '@testing-library/react'
import { describe,expect, test } from '@jest/globals';
import '@testing-library/jest-dom'
import CompanyTile from '../components/CompanyTile'
import { Company } from '../entities/Company';
import { BrowserRouter } from 'react-router-dom';

test('Searchbar Renders', async () => {
    const myCompany : Company = {
        slug: "test",
        id: "1", 
        name: "string;", 
        domains: ["a","n"], // An array of the company's domains
        globalRank: 1, // The company's global rank
        description: "a", // A description of the company
        ceo: "string;", // The company's CEO
        industry: "string;", // The industry the company operates in
        logo: "string", // The URL of the company's logo
        favicon: "string;", // The URL of the company's favicon
        fullTimeEmployees: 1, // The number of full-time employees at the company
        symbols: { // An array of the company's stock symbols
            symbol: "string;" // The stock symbol
            exchange: "string;" // The exchange the stock is traded on
            exchangeShortName: "string;" // The short name of the exchange
    }}
  render(
    <BrowserRouter><CompanyTile {myCompany,index}={myCompany,1}/></BrowserRouter>)


})
