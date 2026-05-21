import React from 'react';
import styles from './simpleButton.module.scss'
import classNames from "classnames";

export interface SimpleButtonProps {
  size?: 'small' | 'medium' | 'large';
  label: string;
  disabled: boolean;
  onClick: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

const SimpleButton = (props: SimpleButtonProps) => {

    function toClick(e: React.MouseEvent<HTMLDivElement, MouseEvent>){
        if (!props.disabled){
            props.onClick(e)
        }
    }

    return <>
            <div className={classNames(styles.wrapper, props.disabled ? styles.disabled : styles.active,
                            props.size=='small'||props.size==undefined ? styles.small : (props.size=='medium' ? styles.medium : styles.large))}
                            onClick={(e)=>{toClick(e)}}
                            >
                {props.label}
            </div>    
    </>
}

export default SimpleButton