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
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if(id!=="serch"){
      VacaniesService.getOneById(id).then((res)=>{setVacancy(res.data);setLoading(false)}).catch((e)=>console.log(e))
    }
  }, [id])
  
  if(loading){
    <div className='vacancyInfo'>

    </div>
  }
  return (
    <div className='vacancyInfo'>
      <div className='header'>
        <div>
          <h2>{vacancy?.postionName}</h2>
          <p>{vacancy?.companyName}</p>
          <p>{vacancy?.workLocation}</p>
        </div>
      </div>
      <div className='main'>

      </div>
    </div>
  )
}

export default VacancyInfo