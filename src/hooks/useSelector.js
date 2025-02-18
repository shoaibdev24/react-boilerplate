import { useSelector as useReduxSelector } from 'react-redux';

export const useSelector = (selector) => useReduxSelector(selector);
