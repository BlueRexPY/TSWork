import Layout from 'layouts/MainLayout'
import type { NextPage } from 'next'
import { useAppSelector, useAppDispatch } from '../app/hooks/redux';


const Home: NextPage = () => {
  const {vacancies} = useAppSelector(state => state.vacancyReducer)
  const {} = useAppSelector(state => state.vacancyReducer)
  const dispatch = useAppDispatch()

  return (
    <Layout col={2} full={true}>

    </Layout>
  )
}

export default Home
