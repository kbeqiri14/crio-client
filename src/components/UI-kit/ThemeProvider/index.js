import React from 'react';
import themes from '../Theme';
import { ThemeProvider } from 'styled-components';

const Provider = ({ children }) => <ThemeProvider theme={themes}>{children}</ThemeProvider>;

export default Provider;
