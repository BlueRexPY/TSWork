import VacaniesService from '@/api/services/VacanciesService';
import React from 'react'
import { useEffect } from 'react';
import {useState} from 'react';
import { IVacancy } from '@/api/models/IVacancy';


type Props = {
  id:string
}

const VacancyInfo = ({id}: Props) => {
  const [vacancy, setVacancy] = useState<IVacancy>()

  useEffect(() => {
    if(id!=="serch"){
      //VacaniesService.getOneById(id).then((res)=>setVacancy(res.data.vacancy)).catch()
    }
  }, [id])
  
  return (
    <div className='vacancyInfo'>{vacancy?._id}</div>
  )
}

export default VacancyInfo