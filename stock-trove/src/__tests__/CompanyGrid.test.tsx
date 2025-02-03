import React from 'react'
import {render, fireEvent, screen} from '@testing-library/react'
import { describe,expect, test } from '@jest/globals';
import '@testing-library/jest-dom'
import CompanyGrid from '../components/CompanyGrid'
import { BrowserRouter } from 'react-router-dom';

test('Searchbar Renders', async () => {
  render(
    <BrowserRouter><CompanyGrid data={''} /></BrowserRouter>)


})
