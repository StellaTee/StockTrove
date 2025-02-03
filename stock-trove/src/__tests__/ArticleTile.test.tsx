//import React from 'react'
//import {rest} from 'msw'
//import {setupServer} from 'msw/node'
//import {render, fireEvent, screen} from '@testing-library/react'
import { render } from "@testing-library/react";
//import { describe,expect, test } from '@jest/globals';
import { test } from "@jest/globals";
import { BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import ArticleTile from "../components/ArticleTile";
import { Article } from "../entities/Article";

const mockArticle: Article = {
  title: "Test Title",
  description: "Test Description",
  url: "http://testurl.com",
  imageUrl: "http://testimageurl.com",
  content: "Test Content",
  sentiment: {
    positive: 1,
    negative: 1,
    neutral: 1,
  },
  summary: "summary",
  keywords: [],
};

test("ArticleTile Renders", async () => {
  render(
    <BrowserRouter>
      <ArticleTile article={mockArticle} />
    </BrowserRouter>,
  );
});
