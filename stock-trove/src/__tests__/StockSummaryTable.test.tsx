import React from 'react'
//import {rest} from 'msw'
//import {setupServer} from 'msw/node'
import {render, fireEvent, screen} from '@testing-library/react'
import { describe,expect, test } from '@jest/globals';
import '@testing-library/jest-dom'
import StockSummaryTable from '../components/StockSummaryTable'
import { BrowserRouter } from 'react-router-dom';

test('Searchbar Renders', async () => {
  render(
    <BrowserRouter><StockSummaryTable/></BrowserRouter>)


})
