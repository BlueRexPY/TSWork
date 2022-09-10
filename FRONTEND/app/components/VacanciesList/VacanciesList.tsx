import { IVacancy } from '@/api/models/IVacancy';
import React from 'react'
import VacancyItem from './VacancyItem';

type Props = {
  vacancies:IVacancy[]
}

function VacanciesList({vacancies}: Props) {
  return (
    <div className="vacancyList">
      {vacancies.map((item, index)=>{
      return (<VacancyItem key={index} vacancy={item}/>)
    })}
    </div>
  )
}

export default VacanciesList