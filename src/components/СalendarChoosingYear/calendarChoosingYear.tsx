import React from 'react';
import { useState } from 'react'
import styles from './calendar.module.scss'

import calendar from './assets/calendar.svg'
import arrowTop from './assets/arrowTop.svg'

import classNames from 'classnames'

const arrayYear = [
    {label: '2032'},
    {label: '2031'},
    {label: '2030'},
    {label: '2029'},
    {label: '2027'},
    {label: '2026'},
    {label: '2025'},
    {label: '2024'},
    {label: '2023'},
    {label: '2022'},
    {label: '2021'},
    {label: '2020'},
]    

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

export interface CalendarChoosingYearProps {
    selectedDate: Date,
    year: number,
    toSelectDate: (date: Date) => void
}

export const CalendarChoosingYear = (props: CalendarChoosingYearProps): React.ReactElement => {

    const dataToString = function(date: Date){
        let dd = date.getDate()
        let mm = date.getMonth()+1
        let yy = date.getFullYear()

        let ddStr = dd < 10 ? `0${dd}` : `${dd}`
        let mmStr = mm < 10 ? `0${mm}` : `${mm}`

        return `${ddStr}.${mmStr}.${yy}`
    }

    const [isOpenCalendar, setIsOpenCalendar] = useState(false)

    const clickToCalendar = function(){
        setIsOpenCalendar(!isOpenCalendar)
    }

    const clickToMonth = function(data: any){
        setDateString(data.label)
        setIsChoiceMonth(false)
    }
    const clickToYear = function(data: any){
        console.log('clickToYear')
        setDateStringYear(data.label)
        setIsChoiceYear(false)
    }
    const [isChoiceMonth, setIsChoiceMonth] = useState(false)
    const [isChoiceYear, setIsChoiceYear] = useState(false)
    const [simpleChoiceProps, setSimpleChoiceProps] = useState(
        {
            array: arrayMonth,
            onClick: clickToMonth
        }
    )
    const [simpleChoiceYearProps, setSimpleChoiceYearProps] = useState(
        {
            array: arrayYear,
            onClick: clickToYear
        }
    )
    const [dateString, setDateString] = useState(getMonthString(props.selectedDate))
    const [dateStringYear, setDateStringYear] = useState(getYearString(props.selectedDate))

    function getYearString(date: Date){
        let yy = date.getFullYear()
        return yy
    }

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
            return 4
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
        week[day] = {date: date.getDate(), isMM: true, 
                today: Boolean( today.getFullYear() == date.getFullYear() && 
                                today.getMonth() == date.getMonth() && 
                                today.getDate() == date.getDate()),
                selectDate: Boolean (props.selectedDate.getFullYear() == date.getFullYear() &&
                                     props.selectedDate.getMonth() == date.getMonth() && 
                                     props.selectedDate.getDate() == date.getDate())}  

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
            week[i] = {date: date.getDate(), isMM: true, 
                today: Boolean( today.getFullYear() == date.getFullYear() && 
                                today.getMonth() == date.getMonth() && 
                                today.getDate() == date.getDate()),
                selectDate: Boolean (props.selectedDate.getFullYear() == date.getFullYear() &&
                                     props.selectedDate.getMonth() == date.getMonth() && 
                                     props.selectedDate.getDate() == date.getDate())} 
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
            week[weekInd] = {date: date.getDate(), isMM: isMM, 
                today: Boolean( today.getFullYear() == date.getFullYear() && 
                                today.getMonth() == date.getMonth() && 
                                today.getDate() == date.getDate()),
                selectDate: Boolean (props.selectedDate.getFullYear() == date.getFullYear() &&
                                     props.selectedDate.getMonth() == date.getMonth() && 
                                     props.selectedDate.getDate() == date.getDate())}
            weekInd=weekInd+1
        }
        resultArray.push(week)
        return (resultArray)
    }

    const clickToWrapperMonth = function(){
        setIsChoiceMonth(!isChoiceMonth)
    }

    const clickToWrapperYear = function(){
        setIsChoiceYear(!isChoiceYear)
    }

    const toClickDate = function(isMM: boolean, dd: number, mm: number, yy: number){
        if (isMM){
            let result = new Date()
            result.setFullYear(yy)
            result.setMonth(mm)
            result.setDate(dd)
            props.toSelectDate(result)
            setIsOpenCalendar(!isOpenCalendar)
        }
    }

    const toClickToDay = function(){
        let date = new Date()
        if (props.year == date.getFullYear()){
            toClickDate(true, date.getDate(), date.getMonth(), date.getFullYear())
        }
        
    }

    const renderOpenCalendar = function(){

        return(
            <div className={styles.wrapper}>

                <div className={styles.calendarMenu}>
                    <div className={styles.flexRow}>
                        <div className={classNames(styles.flexRow, styles.month)} onClick={clickToWrapperMonth}>
                            <div>{dateString}</div>
                            <div className={!isChoiceMonth ? styles.rotate : ''}><img src={arrowTop} alt="arrowTop" /></div>
                        </div>
                        <div className={classNames(styles.flexRow, styles.year)} onClick={clickToWrapperYear}>
                            <div>{dateStringYear}</div>
                            <div className={!isChoiceYear ? styles.rotate : ''}><img src={arrowTop} alt="arrowTop" /></div>
                        </div>
                    </div>

                    <div onClick={toClickToDay} className={props.year !== (new Date()).getFullYear() ? styles.disabled : styles.crsPointer}>
                        Сегодня
                    </div>
                </div>

                <div className={styles.relative}>
                    {isChoiceMonth && <SimpleChoice {...simpleChoiceProps} /> }
                </div>

                <div className={styles.relativeYear}>
                    {isChoiceYear && <SimpleChoice {...simpleChoiceYearProps} /> }
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
                    {getDatesForMonth(getMonthNum(dateString), props.year).map((item: any)=>{
                        return (
                            <div className={styles.days}>
                                {
                                    item.map((item1: any)=>{
                                        return (
                                            <div className={classNames(!item1.isMM ? styles.disabled : '',
                                                                        styles.day,
                                                                        item1.today ? styles.today : '',
                                                                        item1.selectDate ? styles.selectDate : '')}
                                                onClick={()=>{toClickDate(item1.isMM, item1.date, getMonthNum(dateString), props.year)}
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
        )

    }

    return (
        <div className={styles.wrapperCalendar}>           
            <div className={styles.calendar} onClick={clickToCalendar}>
                <div className={styles.strDate}>
                    {dataToString(props.selectedDate)}
                </div>
                <div>
                    <img src={calendar} alt="calendar" height={23} />
                </div>
            </div>
            {isOpenCalendar && renderOpenCalendar()}
        </div>
    )
}
