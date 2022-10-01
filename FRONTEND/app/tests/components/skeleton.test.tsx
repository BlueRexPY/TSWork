/**
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react'
import SkeltonItem from '@/components/VacanciesList/SkeltonItem';
import SkeletonVacanciesList from '@/components/VacanciesList/SkeletonVacanciesList';
import SkeletonVacancyInfo from '@/components/VacanciesList/SkeletonVacancyInfo';
import { Provider } from 'react-redux';
import { setupStore } from '@/store/store';

const store = setupStore();
 describe('Skelton Items', () => {
  it('SkeltonItem', () => {
		render(<SkeltonItem />);
		expect(screen.getByRole('skeleton')).toBeInTheDocument();
	});
	it('SkeletonVacanciesList', () => {
		render(<Provider store={store}><SkeletonVacanciesList /></Provider>);
		expect(screen.getAllByRole('skeleton')[0]).toBeInTheDocument();
	});
	it('SkeletonVacancyInfo', () => {
		render( <Provider store={store}><SkeletonVacancyInfo /></Provider>);
		expect(screen.getByRole('skeleton')).toBeInTheDocument();
	});
});