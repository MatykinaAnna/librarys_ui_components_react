import { useEffect, useRef, useState, type RefObject } from 'react'
import styles from './calendarInterval.module.scss'

import calendar from './icons/calendar.svg'
import arrowTop from './icons/arrowTop.svg'

import classNames from 'classnames'
import React from 'react'

const arrayMonth = [
    {label: 'Январь'},
    {label: 'Февраль'},
    {label: 'Март'},
    {label: 'Апрель'},
    {label: 'Май'},
    {label: 'Июнь'},
    {label: 'Июль'},
    {label: 'Август'},
    {label: 'Сентябрь'},
    {label: 'Октябрь'},
    {label: 'Ноябрь'},
    {label: 'Декабрь'}
]

interface SimpleChoiceProps {
  array: {label: string}[]  
  onClick: (selected: {
        label: string;
    }) => void;
}


const SimpleChoice = (props: SimpleChoiceProps) => {

    const renderArray = function(array: {label: string}[]){
        return array.map((item)=>{
            return (
                <>
                    <div className={styles.SimpleChoice_itemLabel} onClick={()=>props.onClick(item)}>{item.label}</div>
                </>
            )
        })
    }

    return (
        <>
            <div className={styles.SimpleChoice_wrapper}>
                {renderArray(props.array)}
            </div>
        </>
    )
}

export interface CalendarIntervalProps {
    selectedDateStart: Date,
    selectedDateEnd: Date,
    year: number,
    toSelectDateStart: (date: Date) => void
    toSelectDateEnd: (date: Date) => void
}

function useHover() {
  const ref = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  useEffect(() => {
    const refCopy = ref;
    if (refCopy.current !== null){
        //@ts-ignore
        refCopy.current.addEventListener('mouseenter', handleMouseEnter);
        //@ts-ignore
        refCopy.current.addEventListener('mouseleave', handleMouseLeave);
    }

    return () => {
      if (refCopy.current !== null){
        //@ts-ignore
        refCopy.current.removeEventListener('mouseenter', handleMouseEnter);
        //@ts-ignore
        refCopy.current.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  },); 

  return {ref: ref, isHovered: isHovered};
}

const СalendarInterval = (props: CalendarIntervalProps) => {

    const hoverRef = useHover().ref;
    const isHovered = useHover().isHovered;

    const dataToString = function(date: Date){
        let dd = date.getDate()
        let mm = date.getMonth()+1
        let yy = date.getFullYear()

        let ddStr = dd < 10 ? `0${dd}` : `${dd}`
        let mmStr = mm < 10 ? `0${mm}` : `${mm}`

        return `${ddStr}.${mmStr}.${yy}`
    }

    const [numberClick, setNumberClick] = useState(0)
    const [selectedDateStart, setSelectedDateStart] = useState(props.selectedDateStart)
    const [selectedDateEnd, setSelectedDateEnd] = useState(props.selectedDateEnd)

    const [isOpenCalendar, setIsOpenCalendar] = useState(false)

    const clickToCalendar = function(){
        setIsOpenCalendar(!isOpenCalendar)
    }

    const clickToMonthStart = function(data: any){
        setDateStringStart(data.label)
        setIsChoiceMonthStart(false)
    }
    const clickToMonthEnd = function(data: any){
        setDateStringEnd(data.label)
        setIsChoiceMonthEnd(false)
    }
    const [isChoiceMonthStart, setIsChoiceMonthStart] = useState(false)
    const [isChoiceMonthEnd, setIsChoiceMonthEnd] = useState(false)
    const [simpleChoicePropsStart, setSimpleChoicePropsStart] = useState(
        {
            array: arrayMonth,
            onClick: clickToMonthStart
        }
    )
    const [simpleChoicePropsEnd, setSimpleChoicePropsEnd] = useState(
        {
            array: arrayMonth,
            onClick: clickToMonthEnd
        }
    )
    const [dateStringStart, setDateStringStart] = useState(getMonthString(props.selectedDateStart))
    const [dateStringEnd, setDateStringEnd] = useState(getMonthString(props.selectedDateEnd))

    function getMonthString(date: Date){
        let mm = date.getMonth()
        if (mm == 0){
            return 'Январь'
        } else if (mm == 1){
            return 'Февраль'
        } else if (mm == 2){
            return 'Март'
        } else if (mm == 3){
            return 'Апрель'
        } else if (mm == 4){
            return 'Май'
        } else if (mm == 5){
            return 'Июнь'
        } else if (mm == 6){
            return 'Июль'
        } else if (mm == 7){
            return 'Август'
        } else if (mm == 8){
            return 'Сентябрь'
        } else if (mm == 9){
            return 'Октябрь'
        } else if (mm == 10){
            return 'Ноябрь'
        } else if (mm == 11){
            return 'Декабрь'
        }
        return ''
    }

    function getMonthNum(mm: String){
        if (mm == 'Январь'){
            return 0
        } else if (mm == 'Февраль'){
            return 1
        } else if (mm == 'Март'){
            return 2
        } else if (mm == 'Апрель'){
            return 3
        } else if (mm == 'Май'){
            return 4
        } else if (mm == 'Июнь'){
            return 5
        } else if (mm == 'Июль'){
            return 6
        } else if (mm == 'Август'){
            return 7
        } else if (mm == 'Сентябрь'){
            return 8
        } else if (mm == 'Октябрь'){
            return 9
        } else if (mm == 'Ноябрь'){
            return 10
        } else if (mm == 'Декабрь'){
            return 11
        }
        return -1
    }

    function toClickDateForInterval(date: Date | undefined){
        console.log('toClickDateForInterval', date)
        setNumberClick(numberClick + 1)
        // если пользователь нажал один раз на даты
        if (date && numberClick == 0) {
            setSelectedDateStart(date)
        }
        // если пользователь нажал два раза на даты
        if (date && numberClick == 1) {
            if (date >= selectedDateStart){
                setSelectedDateEnd(date)

                props.toSelectDateStart(selectedDateStart)
                props.toSelectDateEnd(date)

                setIsOpenCalendar(false)
                setNumberClick(0)
            } else {
                let dateEnd = selectedDateStart
                setSelectedDateStart(date)
                setSelectedDateEnd(dateEnd)

                props.toSelectDateStart(date)
                props.toSelectDateEnd(dateEnd)

                setIsOpenCalendar(false)
                setNumberClick(0)  
            }
        }
    }  

    function getDatesForMonth(mm: number, yy : number){

        let date = new Date()
        let today = new Date()
        date.setFullYear(yy)
        date.setMonth(mm)
        date.setDate(1)

        let resultArray = []

        let week: Number[] | {date:Date, isMM: boolean, today: boolean}[] 
        week = [-1, -1, -1, -1, -1, -1, -1]
        let day = date.getDay() - 1
        if (day==-1){
            day = 6
        }
        //@ts-ignore
        week[day] = {date: date.getDate(), isMM: true, fullDate: date.toDateString(),
                today: Boolean( today.getFullYear() == date.getFullYear() && 
                                today.getMonth() == date.getMonth() && 
                                today.getDate() == date.getDate()),
                selectDateStart: Boolean (selectedDateStart.getFullYear() == date.getFullYear() &&
                                     selectedDateStart.getMonth() == date.getMonth() && 
                                     selectedDateStart.getDate() == date.getDate()),
                isRange: Boolean (selectedDateStart <= date && date <= selectedDateEnd),
                selectDateEnd: Boolean (selectedDateEnd.getFullYear() == date.getFullYear() &&
                                     selectedDateEnd.getMonth() == date.getMonth() && 
                                     selectedDateEnd.getDate() == date.getDate()),                     
            }  

        let date1 = new Date(date)
        date1.setDate(date1.getDate()-1)

        for (let i=day-1; i>=0; i-- ){
            //@ts-ignore
            week[i] = {date: date1.getDate(), isMM: false}
            date1.setDate(date1.getDate() - 1)
        }

        for (let i=day+1; i<=6; i++ ){
            date.setDate(date.getDate() + 1)
            //@ts-ignore
            week[i] = {date: date.getDate(), isMM: true, fullDate: date.toDateString(),
                today: Boolean( today.getFullYear() == date.getFullYear() && 
                                today.getMonth() == date.getMonth() && 
                                today.getDate() == date.getDate()),
                selectDateStart: Boolean (selectedDateStart.getFullYear() == date.getFullYear() &&
                                     selectedDateStart.getMonth() == date.getMonth() && 
                                     selectedDateStart.getDate() == date.getDate()),
                isRange: Boolean (selectedDateStart <= date && date <= selectedDateEnd),
                selectDateEnd: Boolean (selectedDateEnd.getFullYear() == date.getFullYear() &&
                                     selectedDateEnd.getMonth() == date.getMonth() && 
                                     selectedDateEnd.getDate() == date.getDate()),
                                     
            } 
        }

        resultArray.push(week)

        week = [-1, -1, -1, -1, -1, -1, -1]
        let weekInd = 0
        while (date.getMonth() == mm){
            date.setDate(date.getDate() + 1)
            if (weekInd == 7) {
                resultArray.push(week)
                weekInd = 0
                week = [-1, -1, -1, -1, -1, -1, -1]
            }
            let isMM = Boolean(date.getMonth() == mm)
            //@ts-ignore
            week[weekInd] = {date: date.getDate(), isMM: isMM, fullDate: date.toDateString(),
                today: Boolean( today.getFullYear() == date.getFullYear() && 
                                today.getMonth() == date.getMonth() && 
                                today.getDate() == date.getDate()),
                selectDateStart: Boolean (selectedDateStart.getFullYear() == date.getFullYear() &&
                                     selectedDateStart.getMonth() == date.getMonth() && 
                                     selectedDateStart.getDate() == date.getDate()),
                selectDateEnd: Boolean (selectedDateEnd.getFullYear() == date.getFullYear() &&
                                     selectedDateEnd.getMonth() == date.getMonth() && 
                                     selectedDateEnd.getDate() == date.getDate()),
                isRange: Boolean (selectedDateStart <= date && date <= selectedDateEnd),
                }
            weekInd=weekInd+1
        }
        resultArray.push(week)
        return (resultArray)
    }

    const clickToWrapperMonthStart = function(){
        setIsChoiceMonthStart(!isChoiceMonthStart)
    }

    const clickToWrapperMonthEnd = function(){
        setIsChoiceMonthEnd(!isChoiceMonthEnd)
    }    

    const toClickDate = function(isMM: boolean, dd: number, mm: number, yy: number){
        if (isMM){
            let result = new Date()
            result.setFullYear(yy)
            result.setMonth(mm)
            result.setDate(dd)
            return result
            //props.toSelectDate(result)
            //setIsOpenCalendar(!isOpenCalendar)
        }
    }

    const toClickToDay = function(){
        let date = new Date()
        if (props.year == date.getFullYear()){
            console.log(toClickDate(true, date.getDate(), date.getMonth(), date.getFullYear()))
        }
        
    }

    const getShoosenRange = function(item1: { fullDate: Date }){
        //console.log('selectedDateStart', selectedDateStart)
        //console.log('selectedDateEnd', selectedDateEnd)
        //console.log('------------------------')
        return numberClick!==0 && selectedDateStart <= new Date(item1.fullDate) && new Date(item1.fullDate) <= selectedDateEnd 
    }

    const renderOpenCalendar = function(){

        return(
            <div className={styles.wrapper}>

                <div style={{height: '300px'}}>
                    <div className={styles.calendarMenu}>
                        <div className={classNames(styles.flexRow, styles.month)} onClick={clickToWrapperMonthStart}>
                            <div>{dateStringStart}</div>
                            <div className={!isChoiceMonthStart ? styles.rotate : ''}><img src={arrowTop} alt="arrowTop" /></div>
                        </div>
                        <div onClick={toClickToDay} className={props.year !== (new Date()).getFullYear() ? styles.disabled : styles.crsPointer}>
                            Сегодня
                        </div>
                    </div>

                    <div className={styles.relative}>
                        {isChoiceMonthStart && <SimpleChoice {...simpleChoicePropsStart} /> }
                    </div>
                    
                    <div className={styles.days}>
                        <div>Пн</div>
                        <div>Вт</div>
                        <div>Ср</div>
                        <div>Чт</div>
                        <div>Пт</div>
                        <div>Сб</div>
                        <div>Вс</div>
                    </div>

                    <div className={styles.wrapperDays}>
                        {getDatesForMonth(getMonthNum(dateStringStart), props.year).map((item: any)=>{
                            return (
                                <div className={styles.days}>
                                    {
                                        item.map((item1: any, ind: number)=>{
                                            return (
                                                <div className={classNames(!item1.isMM ? styles.disabled : '',
                                                                            styles.day,
                                                                            item1.today ? styles.today : '',
                                                                            item1.selectDateStart ? styles.selectDate : '',
                                                                            item1.selectDateEnd ? styles.selectDate : '',
                                                                            item1.isRange && item1.isMM? styles.isRange : '',
                                                                            getShoosenRange(item1) ? styles.shoosenRange : ''
                                                                        )}
                                                    onClick={()=>{
                                                        toClickDateForInterval(toClickDate(item1.isMM, item1.date, getMonthNum(dateStringStart), props.year))
                                                    }}
                                                    
                                                    ref={hoverRef}
                                                >
                                                        {item1.date}
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            )
                        })}
                    </div>
                </div>

                <div style={{borderLeft: "1px solid rgb(172, 176, 214)", height: '300px'}}>
                    <div className={styles.calendarMenu}>
                        <div className={classNames(styles.flexRow, styles.month)} onClick={clickToWrapperMonthEnd}>
                            <div>{dateStringEnd}</div>
                            <div className={!isChoiceMonthEnd ? styles.rotate : ''}><img src={arrowTop} alt="arrowTop" /></div>
                        </div>
                        <div onClick={toClickToDay} className={props.year !== (new Date()).getFullYear() ? styles.disabled : styles.crsPointer}>
                            Сегодня
                        </div>
                    </div>

                    <div className={styles.relative}>
                        {isChoiceMonthEnd && <SimpleChoice {...simpleChoicePropsEnd} /> }
                    </div>
                    
                    <div className={styles.days}>
                        <div>Пн</div>
                        <div>Вт</div>
                        <div>Ср</div>
                        <div>Чт</div>
                        <div>Пт</div>
                        <div>Сб</div>
                        <div>Вс</div>
                    </div>

                    <div className={styles.wrapperDays}>
                        {getDatesForMonth(getMonthNum(dateStringEnd), props.year).map((item: any)=>{
                            return (
                                <div className={styles.days}>
                                    {
                                        item.map((item1: any)=>{
                                            return (
                                                <div className={classNames(!item1.isMM ? styles.disabled : '',
                                                                            styles.day,
                                                                            item1.today ? styles.today : '',
                                                                            item1.selectDateStart ? styles.selectDate : '',
                                                                            item1.selectDateEnd ? styles.selectDate : '',
                                                                            item1.isRange && item1.isMM? styles.isRange : '',
                                                                            getShoosenRange(item1) ? styles.shoosenRange : ''
                                                                        )}
                                                    onClick={()=>{
                                                        toClickDateForInterval(toClickDate(item1.isMM, item1.date, getMonthNum(dateStringEnd), props.year))
                                                    }
                                                }>
                                                        {item1.date}
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            )
                        })}
                    </div>
                </div>

            </div>
        )

    }

    return (
        <div className={styles.wrapperCalendar}>
            
            <div className={styles.calendar} onClick={clickToCalendar}>
                <div className={styles.strDate}>
                    {dataToString(selectedDateStart)} - {dataToString(selectedDateEnd)}
                </div>
                <div>
                    <img src={calendar} alt="calendar" height={23} />
                </div>
            </div>

            {isOpenCalendar && renderOpenCalendar()}

        </div>
    )
}

export default СalendarInterval