import React from 'react';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import styles from './multipleСhoice.module.scss'
import classNames from "classnames";

import danger from './icons/danger.svg'

interface ButtonProps {
  size?: 'small' | 'medium' | 'large';
  label: string;
  disabled: boolean;
  onClick: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}
const SimpleButton = (props: ButtonProps) => {

    function toClick(e: React.MouseEvent<HTMLDivElement, MouseEvent>){
        if (!props.disabled){
            props.onClick(e)
        }
    }

    return (
        <>
            <div className={classNames(styles.SimpleButton_wrapper, props.disabled ? styles.SimpleButton_disabled : styles.SimpleButton_active,
                            props.size=='small'||props.size==undefined ? styles.SimpleButton_small : (props.size=='medium' ? styles.SimpleButton_medium : styles.SimpleButton_large))}
                            onClick={(e)=>{toClick(e)}}
                            >
                {props.label}
            </div>
        </>
    )
}

export interface MultipleChoiceProps {
    placeholder: string,
    autoChosen: number[] | number,
    list: {               

    /* массив для отрисовки элементов выбора */

            id: number,
            name: string,
            parrentId?: number,        /* элемент может иметь id родителя в случае, если список иерархический 
                                       важно! list не представляет собой структуру дерево, т е в list нет элемента с id,
                                       равному parrentId, parentId не является ссылкой, это информация о родительском элементе
                                       важно! если у первого элемента не присутствует parrentId – считается, что список без иерархии,
                                       если у первого элемента присутствует parrentId: необходимо, чтобы у всех элементов присутствовал
                                       parrentId и parrentName */

            parrentName?: string,      /* наименование родительского элемента, если он присутствует */

            check: boolean             /* указание на выделение элемента */
        }[],
    isChoosingAll: boolean,        /* следует ли включать опцию «выделить все» или нет */
    isChoosingAllValue: boolean,   //указание на выделение элемента
    onChange: (value:              //событие для отправки выбранных данных
        {
            id: number,
            name: string,
            parrentId?: number,
            parrentName?: string,
            check: boolean
        }[]) => void
    open?: boolean                 //является ли по умолчанию dropdown открытым?  
    errorText?: string             //текст ошибки, если нажата кнопка применить при невыделенных объектах
}

const MultipleChoice = (props: MultipleChoiceProps) => {

    const filteredListRef = useRef<{
        id: number; name: string;
        parrentId?: number | undefined;
        parrentName?: string | undefined;
        check: boolean;
    }[]>([]);

    const rootEl = useRef(null); //ссылка на элемент основной элемент Dropdown, для создания события клика по видимой части экрана

    const [hideList, setHideList] = useState(props.open)

    const [searchString, setSearchString] = useState<string>(''); //строка для фильтрации списка выбора

    const [isChoosingAllValue, setIsChoosingAllValue] = useState(props.isChoosingAllValue)

    const [isErrorMsg, setIsErrorMsg] = useState(false)

    function getFirstHiddenList(){
        let result = props.list.filter((item)=>{
            return item.parrentId
        }).map(item => item.parrentId)
        let unicResult: (number | undefined)[]= []
        result.forEach((item)=>{
            if (!unicResult.find(item1=>item1==item)){
                unicResult.push(item)
            }
        })
        return unicResult
    } 

    //Список родительских элементов, которые скрыты, при открытии dropdown для всех родительских элементов дочерние элементы скрыты
    const [hiddenList, setHiddenList] = useState(getFirstHiddenList())
    const [keyList, setKeyList] = useState(0)

    const isChoosen = function(filteredList: {
        id: number;
        name: string;
        parrentId?: number | undefined;
        parrentName?: string | undefined;
        check: boolean;
    }[]){
        return Boolean( filteredList.find((item)=>{
            return item.check
        }) )
    }
    
    const clickToBtnSend = function(){
        setIsErrorMsg(!isChoosen(filteredListRef.current))

        if (isChoosen(filteredListRef.current)){
            props.onChange(filteredListRef.current)
        }
    }

    const [itemButtonProps, setItemButtonProps] = useState<ButtonProps>({
        size: 'small',
        label: 'Применить',
        disabled: true,
        onClick: clickToBtnSend
    })

    const [filteredList, setFilteredList] = useState(props.list.sort((a, b)=>{ //отфильтрованный список выбора по включению строки из строки поиска
        if (a.parrentId && b.parrentId){                                       //сортирует список так, чтобы все элементы, имеющие одного родителя
            return (a.parrentId - b.parrentId || a.id - b.id)                  //стоят один за другим в порядке idParent и id 
        } else {
            return (a.id - b.id)
        }
    }))

    const isCheckedParent = function(itemParrent: {
        id: number;
        name: string;
        parrentId?: number;
        parrentName?: string;
        check: boolean;
    }){
        let resultInd = filteredList.find((item)=>{
            return (item.parrentId! == itemParrent.parrentId! && !item.check)
        })
        return !Boolean(resultInd)
    }

    const cliskToParrent = function(itemParrent: {
        id: number;
        name: string;
        parrentId?: number;
        parrentName?: string;
        check: boolean;
    }){
        let array
        array = filteredList.map((item)=>{
                if (itemParrent.parrentId! == item.parrentId!){
                    return {...item, check: !itemParrent.check}
                } else {
                    return item
                }
            })
        setFilteredList(array) 
        
        setIsErrorMsg(false)
        setItemButtonProps({...itemButtonProps, disabled: false})
    }

    const isCheckedPoint = function(id: number){
        let point = filteredList.find((item)=>{
            return item.id == id
        })
        return point?.check
    }

    const clickPoint = function(id: number){
        let ind = filteredList.findIndex((item)=>{
            return item.id == id
        })
        let array = filteredList.map((item, index)=>{
            if (index != ind){
                return item 
            } else {
                return {...item, check: !item.check}
            }
        })

        if (!array[ind].check){
            setIsChoosingAllValue(false)
        }

        setFilteredList(array)

        setIsErrorMsg(false)
        setItemButtonProps({...itemButtonProps, disabled: false})
    }

    const toFilterList = function(value: string){
        if (value == ''){
            setFilteredList(props.list)
        } else {
            let array = props.list.filter((item)=>{
                return item.name.toUpperCase().includes(value.toUpperCase())
            })
            setFilteredList(array)
        }
    }

    const handleSearchString = function(value: string){
        setSearchString(value)
    }

    //для каждого элемента из списка filteredList определяет, поставлена галочка у элемента или нет 
    const isAll = function(){
        let resultInd = filteredList.findIndex((item1)=>{
            return (!item1.check)
        })
        return Boolean(resultInd == -1)
    }

    const cliskToAll = function(){
        let array = filteredList.map((item)=>{
            return {...item, check: !isChoosingAllValue}
        })
        setFilteredList(array)
        
        setIsErrorMsg(false)
        setItemButtonProps({...itemButtonProps, disabled: false})
    }

    const isHiddenItem = function(point: {
        id: number;
        name: string;
        parrentId?: number | undefined;
        parrentName?: string | undefined;
        check: boolean;
    }){
        return Boolean(hiddenList.find(item => item == point.parrentId))
    }

    const clickHiddenArrow = function(point: {
        id: number;
        name: string;
        parrentId?: number | undefined;
        parrentName?: string | undefined;
        check: boolean;
    }){
        let isHiddenPoint = hiddenList.findIndex(item => item == point.parrentId)
        let newHiddenList = hiddenList
        if (isHiddenPoint !== -1){
            newHiddenList.splice(isHiddenPoint, 1)
        } else {
            newHiddenList.push(point.parrentId)
        }
        setHiddenList(newHiddenList)        
        setKeyList(keyList+1)
    }

    const isPartialSelection = function(parrentId: Number ){
        let checkPoint = filteredList.find((item)=>{
            return item.parrentId == parrentId && item.check
        })
        return Boolean(checkPoint)
    }

    const renderingList = function(list: {
        id: number,
        name: string,
        parrentId?: number,
        parrentName?: string,
        check: boolean
    }[]){
        let parrentId = -1
        if (list.length != 0){
            parrentId = list[0].parrentId ? list[0].parrentId : -1
        }
        let parrentIndex = 0
        return list.map((item, index) => {
            if (item.parrentId == parrentId && index == parrentIndex){
                return (
                        <div key={index}>
                            <div className={styles.container_checkbox}
                                id={String(item.id)}
                                ref={rootEl}
                            >
                                <div className={classNames(styles.arrow, !isHiddenItem(item) ? styles.openArrow : '' )}
                                    onClick={()=>{clickHiddenArrow(item)}}
                                ></div>

                                <input  
                                    type="checkbox"
                                    onChange={()=>{cliskToParrent(item)}}
                                    id={`parrentCheckbox${item.parrentName}`}
                                    checked={isCheckedParent(item)}
                                    className={isPartialSelection(parrentId) ? styles.partialSelection : ''}
                                />

                                <label htmlFor={`parrentCheckbox${item.parrentName}`}>{item.parrentName}</label>
                            </div>

                            { !isHiddenItem(item) && <div className={classNames(styles.container_checkbox, styles.childeNode)}
                                id={String(item.id)}
                                ref={rootEl}
                            >
                                <input  
                                        type="checkbox"
                                        onChange={()=>{clickPoint(item.id)}}
                                        id={`item${item.id}`}
                                        checked={isCheckedPoint(item.id)}
                                />
                                <label htmlFor={`item${item.id}`}>{item.name}</label>
                            </div> }
                        </div>
                )    
            } else if (item.parrentId == parrentId && index !== parrentIndex){   
                return (
                    <>
                        { !isHiddenItem(item) && <div className={classNames(styles.container_checkbox, styles.childeNode)}
                                key={index} id={String(item.id)}
                                style={{display: 'flex', alignItems: 'center'}}
                                ref={rootEl}
                            >
                                <input  
                                        type="checkbox"
                                        onChange={()=>{clickPoint(item.id)}}
                                        id={`item${item.id}`}
                                        checked={isCheckedPoint(item.id)}
                                />
                                <label htmlFor={`item${item.id}`}>{item.name}</label>
                            </div> }
                    </>
                    
                )
            } 
            else if (item.parrentId != parrentId) {
                parrentId = item.parrentId ? item.parrentId : -1
                parrentIndex = index

                return (
                    <div key={index}>
                        <div className={styles.container_checkbox}
                            key={1} id={String(item.id)}
                            style={{display: 'flex', alignItems: 'center'}}
                            ref={rootEl}
                            
                        >
                            <div className={classNames(styles.arrow, !isHiddenItem(item) ? styles.openArrow : '' )} 
                                onClick={()=>{clickHiddenArrow(item)}}></div>

                            <input  
                                type="checkbox"
                                onChange={()=>{cliskToParrent(item)}}
                                id={`parrentCheckbox${item.parrentName}`}
                                checked={isCheckedParent(item)}
                                className={isPartialSelection(parrentId) ? styles.partialSelection : ''}
                            />
                            <label htmlFor={`parrentCheckbox${item.parrentName}`}>{item.parrentName}</label>
                        </div>

                        { !isHiddenItem(item) && <div className={classNames(styles.container_checkbox, styles.childeNode)}
                            key={2} id={String(item.id)}
                            style={{display: 'flex', alignItems: 'center'}}
                            ref={rootEl}
                        >
                            <input  
                                    type="checkbox"
                                    onChange={()=>{clickPoint(item.id)}}
                                    id={`item${item.id}`}
                                    checked={isCheckedPoint(item.id)}
                            />
                            <label htmlFor={`item${item.id}`}>{item.name}</label>
                        </div> }
                    </div>  
                )
            }
        })
    }  
    
    const renderingListFerstLevel = function(list: {
        id: number,
        name: string,
        parrentId?: number,
        parrentName?: string,
        check: boolean
    }[]){
        return list.map((item, index) => {
            return (
                <div className={classNames(styles.container_checkbox, styles.childeNode)}
                    key={index} id={String(item.id)}
                    style={{display: 'flex', alignItems: 'center'}}
                    ref={rootEl}
                >
                    <input  
                            type="checkbox"
                            onChange={()=>{clickPoint(item.id)}}
                            id={`item${item.id}`}
                            checked={isCheckedPoint(item.id)}
                    />
                    <label htmlFor={`item${item.id}`}>{item.name}</label>
                </div>
            )
        })
    }  

    const clickToBtnCancel = function(){
        setFilteredList(props.list)
    }

    useEffect(()=>{
        setIsChoosingAllValue(isAll())

        filteredListRef.current = filteredList
    }, [filteredList])

    useEffect(()=>{ // при вводе символов в строку поиска фильтруется список для выбора с задержкой
        const delayDebounceFn = setTimeout(() => {
            toFilterList(searchString)
          }, 300)      
        return () => clearTimeout(delayDebounceFn)
    }, [searchString])

    useEffect(()=>{
        if (isErrorMsg){
            setItemButtonProps({...itemButtonProps, disabled: true})
        }
    }, [isErrorMsg])

    return <>
        <div className={styles.wrapper}>
            { hideList && 
                <>
                    <div className={styles.list}>
                        <div className={styles.container_list_input}>
                            <input className={styles.list_input} type="text" 
                                value={searchString} 
                                placeholder='Поиск'
                                onChange={(e)=>{handleSearchString(e.target.value)}}/>
                        </div>
                    </div>
                    { props.isChoosingAll && 
                        <div className={styles.checkAll}>
                            <div className={classNames(styles.choosenAll)} onClick={cliskToAll}>
                                {isChoosingAllValue ? 'Снять выбор' : 'Выбрать все'}
                            </div>
                            
                        </div>
                    }
                    {filteredList.length !== 0 && Boolean(props.list[0].parrentId) && 
                        <div className={styles.wrapperList} key={keyList}>{renderingList(filteredList)}</div>
                    }
                    {filteredList.length !== 0 && !Boolean(props.list[0].parrentId) &&
                        <div className={styles.wrapperList} key={keyList}>{renderingListFerstLevel(filteredList)}</div>
                    }
                    <div className={styles.wrapperError}>
                        { isErrorMsg &&
                            <>
                                <img src={danger} alt="danger" />
                                <div className={styles.textError}>
                                    {props.errorText}
                                </div>
                            </>
                        }  
                    </div>
                    <div className={styles.wrapperButton}>
                        <div onClick={()=>{clickToBtnCancel()}} className={styles.btnBack}>
                            <div>Отменить</div>
                        </div>
                        <div className={styles.btnSend}>
                            <SimpleButton {...itemButtonProps} />
                        </div>
                    </div>
                </>
            }
        </div>
    </>
}

export default MultipleChoice