import { IVacancy } from '@/api/models/IVacancy'
import Image from 'next/image'
import React from 'react'

type Props = {
    vacancy: IVacancy
}

const VacancyItem = ({vacancy}: Props) => {
  return (
    <div className='vacancyItem'>
        <div className='vacancyItemLeftSide'>
            <Image
            src={vacancy.logo}
            loader={() => vacancy.logo}
            width={50}
            height={50}
            alt="logo"
            draggable={false}
          />
          <div className='col vacancyItemSide'>
            <h2 className='VacancyTitle'>{vacancy.postionName}</h2>
            <h3 className='VacancyUtils'>{vacancy.companyName} - {vacancy.experienceLevel}</h3>
          </div>
        </div>

          <div className='col vacancyItemSide'>
            <h2 className='VacancyTitle'>{vacancy.maxSalary===vacancy.minSalary?`${vacancy.minSalary}-${vacancy.maxSalary}`:`${vacancy.maxSalary}`}$</h2>
            <h3 className='VacancyUtils'>{vacancy.mainTechnology}</h3>
          </div>
    </div>
  )
}

export default VacancyItem