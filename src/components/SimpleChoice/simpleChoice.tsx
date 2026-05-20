import React from 'react';
import styles from './simpleChoice.module.scss'
import classNames from "classnames";

export interface SimpleChoiceProps {
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
                    <div className={styles.itemLabel} onClick={()=>props.onClick(item)}>{item.label}</div>
                </>
            )
        })
    }

    return (
        <>
            <div className={styles.wrapper}>
                {renderArray(props.array)}
            </div>
        </>
    )
}

export default SimpleChoice