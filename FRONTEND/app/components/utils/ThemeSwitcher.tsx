import React, { useState, useEffect } from 'react'
import {
    enable as enableMode,
    disable as disableMode,
    exportGeneratedCSS as collectCSS,
    isEnabled as isDarkReaderEnabled,
    auto as followSystemColorScheme,
} from 'darkreader';
import { Switch } from 'antd';
import styles from '../../../styles/Utils.module.css'

const ThemeSwitcher = () => {
    const [loading, setLoading] = useState<boolean>(false)
    const [isEnabled, setIsEnabled] = useState<boolean>(isDarkReaderEnabled())
    
    const handleSwitch = async()=>{
        setLoading(loading => !loading)
        if(isEnabled){
            disableMode();
            
        }else{
            enableMode({
                mode: 0
            });
        }
        //followSystemColorScheme();
        // const CSS = await collectCSS();
        // setLoading(loading => !loading)
        setIsEnabled(isDarkReaderEnabled())
        setLoading(loading => !loading)
    }
    
  return (
    <div className={styles.themeSwitchContainer}>
        <Switch checked={isEnabled} onChange={handleSwitch} loading={loading}/>
        <p>Switch to {`${isEnabled?"dark":"light"}`} theme</p>
    </div>
  )
}

export default ThemeSwitcher