import { afterEach, beforeEach, expect, test } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import 'mutationobserver-shim';
import fs from 'fs';
import path from 'path';
import App from '../App.jsx';

const isDarkModeFileExists = fs.existsSync(
  path.resolve(__dirname, '../hooks/useDarkMode.jsx'),
  'utf8'
);
const isLocalStorageFileExists = fs.existsSync(
  path.resolve(__dirname, '../hooks/useLocalStorage.jsx'),
  'utf8'
);

const darkModeHook = isDarkModeFileExists
  ? fs
      .readFileSync(path.resolve(__dirname, '../hooks/useDarkMode.jsx'), 'utf8')
      .replaceAll(/(?:\r\n|\r|\n| )/g, '')
  : '';
const localStorageHook = isLocalStorageFileExists
  ? fs
      .readFileSync(
        path.resolve(__dirname, '../hooks/useLocalStorage.jsx'),
        'utf8'
      )
      .replaceAll(/(?:\r\n|\r|\n| )/g, '')
  : '';
let dom, container;

beforeEach(() => {
  dom = render(<App />);
  container = dom.container;
});

afterEach(() => {
  localStorage.clear();
});

test('darkMode hooku için dosya ismi readmede istendiği gibi doğru ayarlanmış', () => {
  expect(isDarkModeFileExists).toBe(true);
});

test('localStorage hooku için dosya ismi readmede istendiği gibi doğru ayarlanmış', () => {
  expect(isLocalStorageFileExists).toBe(true);
});

test('darkMode hooku react hookları gibi named export olarak tanımlanmış. (default export değil)', () => {
  expect(isDarkModeFileExists).toBe(true);
  expect(darkModeHook).not.toContain('exportdefault');
});

test('localStorage hooku named export olarak tanımlanmış. (default export değil)', () => {
  expect(isLocalStorageFileExists).toBe(true);
  expect(darkModeHook).not.toContain('exportdefault');
});

test('Navbar.jsx deki darkMode butonu App.jsx dosyasında en üstteki div e dark-mode classını ekliyor.', async () => {
  const user = userEvent.setup();
  const toggle = screen.getByTestId('toggle-darkMode');
  await user.click(toggle);
  expect(container.querySelector('.App')).toHaveClass('dark-mode');
});

test('darkMode uygulamanın ilk renderında localStoragea false başlangıç değeri ile kaydediliyor.', async () => {
  expect(localStorage.getItem('geceModu')).toBe('false');
});

test('darkMode localStorage a her değiştiğinde kaydediliyor.', async () => {
  const user = userEvent.setup();
  const toggle = screen.getByTestId('toggle-darkMode');
  await user.click(toggle);
  expect(localStorage.getItem('geceModu')).toBe('true');
  await user.click(toggle);
  expect(localStorage.getItem('geceModu')).toBe('false');
});
