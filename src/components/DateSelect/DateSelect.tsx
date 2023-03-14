import { Menu, Button, Text,Stack,Switch } from '@mantine/core';
import React ,{useState,useEffect }from 'react'
import { DatePicker, Month } from '@mantine/dates';
import {Todo} from '../../model/model'
import { TodoList } from '../TodoList/TodoList';

interface IProps {
    title?:string, 
  
}

export const DateSelect=({ }: IProps)=> {
  const [checked, setChecked] = useState(true);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [opened, setOpened] = useState(false);
  const [sDay, setSDay] = useState({d:0,m:0});
  const [eDay, setEDay] = useState({d:0,m:0})
 useEffect(()=>{
  if(startDate){
    setSDay({ d: startDate.getDate(), m:startDate.getMonth()+1});
  }
  if(endDate){
    setEDay({ d: endDate.getDate(), m:endDate.getMonth()+1});
  }
 },[sDay.d,eDay.d])

  return (
    <Menu shadow="md" width={280} position="bottom" zIndex={999}
    opened={opened} onChange={setOpened}
    >
    <Menu.Target>
      <Button>
        {<>
         {
        //  !(startDate && endDate)?
        //    <img src='' alt='asda'></img>
        //   :(!startDate && endDate)?<span>before {eDay.m} 月 {eDay.d}
        //   </span>:startDate?<span>{sDay.m} 月 {sDay.d}</span>:endDate?
        //   <span>{eDay.m} 月 {eDay.d}</span>:<span></span>

        !(startDate || endDate)?
        <img src='' alt='asda'></img>
       : !endDate?<span>{sDay.m} 月 {sDay.d}</span>:<span>{eDay.m} 月 {eDay.d}</span>
       
          }
           </>
        }
        
        
     
      </Button>
    </Menu.Target>

    <Menu.Dropdown>
    <Menu.Label>
 
 <Switch onLabel="开始于" offLabel="结束于"
 size="lg"
  checked={checked}
  onChange={(event) => setChecked(event.currentTarget.checked)}
 />
 {
   checked?<DatePicker value={startDate} 
   onChange={setStartDate} />
   :
   <div>
    <span>fan</span>
<DatePicker value={endDate} onChange={setEndDate} />
   </div>
   
 }

    </Menu.Label>

    </Menu.Dropdown>
  </Menu>
  )
}

