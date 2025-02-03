import React from 'react'
//import {rest} from 'msw'
//import {setupServer} from 'msw/node'
import {render, fireEvent, screen} from '@testing-library/react'
import { describe,expect, test } from '@jest/globals';
import '@testing-library/jest-dom'
import NavBar from '../components/NavBar'
import { BrowserRouter } from 'react-router-dom';

test('Searchbar Renders', async () => {
  render(
    <BrowserRouter><NavBar/></BrowserRouter>)


})
