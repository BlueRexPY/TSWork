/**
 * @jest-environment jsdom
 */

 import { render, screen } from '@testing-library/react'
 import { Provider } from 'react-redux';
 import { setupStore } from '@/store/store';
import NotFound from '@/pages/404';
 
 const store = setupStore();

 it('NotFound - page', () => {
     render( <Provider store={store}><NotFound /></Provider>);
     expect(screen.getByRole('wrapper')).toBeInTheDocument();
     expect(screen.getAllByRole('button')[0]).toBeInTheDocument();
     expect(screen.getByRole('image')).toBeInTheDocument();
 });