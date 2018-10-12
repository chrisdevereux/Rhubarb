import { configure, addDecorator } from '@storybook/react';
import { ThemeProvider } from 'emotion-theming';
import React from 'react'
import { defaultTheme } from '../src/core/frontend/Theme';

const req = require.context('../src', true, /.stories.tsx$/);
function loadStories() {
  req.keys().forEach(filename => req(filename));
}

addDecorator(children => <ThemeProvider theme={defaultTheme}>{children()}</ThemeProvider>)
configure(loadStories, module);
