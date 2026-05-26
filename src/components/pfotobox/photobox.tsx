import React from 'react';
import styles from './photobox.module.scss'
import classNames from 'classnames'


import close from './assets/close.svg'
import { useEffect, useLayoutEffect, useRef, useState } from 'react'

import { Map, View } from "ol";
import TileLayer from "ol/layer/Tile"
import OSM from "ol/source/OSM";
import {fromLonLat} from 'ol/proj';
import VectorLayer from 'ol/layer/Vector.js';
import Feature from 'ol/Feature.js';
import Point from 'ol/geom/Point.js';
import Style from 'ol/style/Style.js';
import Icon from 'ol/style/Icon';
import VectorSource from 'ol/source/Vector.js';
import Overlay from 'ol/Overlay.js';

export interface PhotoboxProps {
    
    imageArray: {
        url: string,
        title: string,
        center: number[],
        coordinateForFactories: {
            cordinate: number[],
            degrees: number
        }[]
    }[]
}

export const Photobox = (props: PhotoboxProps): React.ReactElement => {

    const [сoordinatesForPopup, setCoordinatesForPopup] = useState('')
    const [imageArray, setImageArray] = useState(props.imageArray)
    const [activePhoto, setActivePhoto] = useState(0)
    const [isFullScreen, setIsFullScreen] = useState(false)
    const [transform, setTransform] = useState(0)
    const [transform_1, setTransform_1] = useState(0)
    const refImg = useRef(null)
    const refFullImg = useRef(null)
    const mapEl = useRef(null)
    const сoordinatesRef = useRef(null)
    // когда будут созданы объекты слоя флаг примет значение true
    const [layersRendered, setLayersRendered] = useState(false)

    const renderSliderPhoto = imageArray.map((photo, index)=>{
        return (
            <div className={classNames(styles.itemPhoto, activePhoto == index && styles.itemPhotoActive)}
                onClick={()=>clickToItemPhoto(index)}
            >
                <img src={photo.url} />
                
            </div>
        )
    })
    const renderSliderPhoto_1 = imageArray.map((photo, index)=>{
        return (
            <div className={classNames(styles.itemPhoto_1, activePhoto == index && styles.itemPhotoActive)}
                onClick={()=>clickToItemPhoto(index)}
            >
                <img src={photo.url} />
                
            </div>
        )
    })

    const container = useRef(null)
    const content = useRef(null)
    const closer = useRef(null)

    function clickToFullScreen(){
        setIsFullScreen(true)
    }
    function clickToFullScreen_1(){
        setIsFullScreen(false)
    }

    function clickToFullImg(){
        //setIsFullScreen(false)
    }

    function clickTobtnLeftRound(){
        setTransform(transform-90)
        //@ts-ignore
        refImg.current.style.transform = `rotate(${transform-90}deg)`
    } 
    function clickTobtnLeftRound_1(){
        setTransform_1(transform_1-90)
        //@ts-ignore
        refFullImg.current.style.transform = `rotate(${transform_1-90}deg)`
    }
    function clickTobtnRightRound(){
        setTransform(transform+90)
        //@ts-ignore
        refImg.current.style.transform = `rotate(${transform+90}deg)`
    }  
    function clickTobtnRightRound_1(){
        setTransform_1(transform_1+90)
        //@ts-ignore
        refFullImg.current.style.transform = `rotate(${transform_1+90}deg)`
    } 

    function clickToSliderLeft(){
        let index = -1
        if (activePhoto-1<0){
            setActivePhoto(imageArray.length-1)
            //@ts-ignore
            mapEl.current.current.getView().animate({
                 center: [fromLonLat(imageArray[imageArray.length-1].center)[1], fromLonLat(imageArray[imageArray.length-1].center)[0]]
            })
            index = 0
        } else {
            setActivePhoto(activePhoto-1)
            //@ts-ignore
            mapEl.current.current.getView().animate({
                 center: [fromLonLat(imageArray[activePhoto-1].center)[1], fromLonLat(imageArray[activePhoto-1].center)[0]]
            })
            index = activePhoto-1
        }
        drowVector(index)
    }
    function clickToSliderRight(){
        let index = -1
        if (activePhoto+1 == imageArray.length){
            setActivePhoto(0)
            //@ts-ignore
            mapEl.current.current.getView().animate({
                 center: [fromLonLat(imageArray[0].center)[1], fromLonLat(imageArray[0].center)[0]] 
            })        
            index = 0    
        } else {
            setActivePhoto(activePhoto+1)
            //@ts-ignore
            mapEl.current.current.getView().animate({
                 center: [fromLonLat(imageArray[activePhoto+1].center)[1], fromLonLat(imageArray[activePhoto+1].center)[0]]
            })
            index = activePhoto+1
        }  
        drowVector(index)
    }
    function clickToItemPhoto(index: number){
        //@ts-ignore
        mapEl.current.current.getView().animate({
                center: [fromLonLat(imageArray[index].center)[1], fromLonLat(imageArray[index].center)[0]] 
        })
        setActivePhoto(index)

        drowVector(index)
    }

    function drowVector(index: number){
        //@ts-ignore
        let layersArray = map.current.getLayers().getArray();
        //@ts-ignore
        layersArray.forEach((item, index)=>{
            if (index !== 0){
                //@ts-ignore
                mapEl.current.current.removeLayer(item);
            }
        })
        let arrayMarkerLayer: VectorLayer[] = createVector(index)
        arrayMarkerLayer.forEach(layer => {
            console.log(layer)
            //@ts-ignore
            map.current.addLayer(layer)
        })
    } 
    function createVector(index: number){
        let arrayMarkerLayer: VectorLayer[] = []
        imageArray[index].coordinateForFactories.forEach((item)=>{
            console.log([fromLonLat(item.cordinate)[1], fromLonLat(item.cordinate)[0]])
            let marker = new Feature({
                geometry: new Point([fromLonLat(item.cordinate)[1], fromLonLat(item.cordinate)[0]])
            });
            marker.setStyle(new Style({
                image: new Icon({
                    anchor: [0.5, 46], // Центрирование (по горизонтали, от низа)
                    anchorXUnits: 'fraction',
                    anchorYUnits: 'pixels',
                    rotation: item.degrees,
                    src: '/vector.svg' // Путь к картинке (поменять при упаковке в библиотеку)
                })
            }));
            let vectorSource = new VectorSource({
                features: [marker]
            });
            let markerLayer = new VectorLayer({
                source: vectorSource,
                zIndex: 1000,
                properties: {
                    сoordinates: `${fromLonLat(item.cordinate)[1]}, ${fromLonLat(item.cordinate)[0]}`
                },
            });
            arrayMarkerLayer.push(markerLayer)
        })
        return arrayMarkerLayer
    }

    function createPopup(layer: any, overlay: Overlay, coordinate: any) {
        setCoordinatesForPopup(layer.get('сoordinates'))
        overlay.setPosition(coordinate);  
    }
    function clickToCopy(){
        //@ts-ignore
        navigator.clipboard.writeText(сoordinatesRef.current.innerText)
    }

    useLayoutEffect(()=>{
        setLayersRendered(true)
    }, [])    
    
    useEffect(() => {
        const handleKeyDown = (event: { key: string }) => {
        if (event.key === 'Escape') {
            setIsFullScreen(false)
        }
        };
        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, []); 

    useEffect(() => {
        //@ts-ignore
        if (layersRendered && !map.current){
            let layers = []
            // Создадим тайловый слой. Источником тайлов будет OpenStreetMap
            layers.push(new TileLayer({ source: new OSM() }))

            // Создаем элементы для попавов элементов карты
            // overlay для попапа по клику по полю
            const overlay = new Overlay({
                //@ts-ignore
                element: container.current,
                autoPan: {
                    animation: {
                        duration: 250,
                    },
                },
            });

            //@ts-ignore
            map.current = new Map({
                    // HTML-элемент, в который будет инициализирована карта
                    //@ts-ignore
                    target: mapEl.current,
                    
                    // Список слоёв на карте
                    //@ts-ignore
                    layers: layers,
                    overlays: [overlay],
                    // Параметры отображения карты по умолчанию: координата центра и зум
                    view: new View({
                        center: [fromLonLat(imageArray[activePhoto].center)[1], fromLonLat(imageArray[activePhoto].center)[0]],
                        zoom: 13
                    }),
                    controls: [],
            });    
            drowVector(0)

            //@ts-ignore
            map.current.on("click", function (event) {
                //@ts-ignore
                const layer = map.current.forEachFeatureAtPixel(event.pixel,
                    //@ts-ignore
                    function(feature, layer) {
                        return layer; 
                    });  
                if (layer) {
                    createPopup(layer, overlay, event.coordinate)
                } else {
                    //закрыть попап
                    overlay.setPosition(undefined);
                }  
            });
        }
    }, [layersRendered])

    return (
        <>
            <div className={styles.wrapper}>
                <div className={classNames(styles.header, styles.flexRow)}>
                    <div>Просмотр фото</div>
                    <div className={styles.close}>
                        <img src={close} alt="close" />
                    </div>
                </div>
                <div className={styles.content}>
                    <div className={styles.wrapperImg}>
                        <div className={classNames(styles.flexRow)}>
                            <div className={styles.btnFullScreen} onClick={()=>clickToFullScreen()}></div>
                            <div className={classNames(styles.flexRow)}>
                                <div onClick={()=>{clickTobtnLeftRound()}} className={styles.btnleftRound}></div>
                                <div onClick={()=>{clickTobtnRightRound()}} className={styles.btnRightRound}></div>
                            </div>
                        </div>

                        <div className={styles.activeImg}>
                            <img src={imageArray[activePhoto].url} ref={refImg} />
                        </div>
                        <div className={styles.titleImg}>{imageArray[activePhoto].title}</div>
                        <div className={styles.menyImg}>
                            <div onClick={()=>{clickToSliderLeft()}} className={styles.sliderLeft}></div>
                            <div className={styles.imgWrapper}>
                                {renderSliderPhoto}
                            </div>
                            <div onClick={()=>{clickToSliderRight()}} className={styles.sliderRight}></div>
                        </div>
                    </div>
                </div>
                <div className={styles.currentMap}>
                    <div ref={mapEl} className={styles.map} id="map"></div>
                </div>
            </div>

            <div ref={container} className={styles.containerWrapper}>
                <div ref={closer}></div>    
                <div className={styles.nameField}>{'Координаты'}</div> 
                <div className={styles.contentPopup} ref={content}>
                    <div className={styles.сoordinatesForPopup} ref={сoordinatesRef}>{сoordinatesForPopup}</div>
                    <div className={styles.copyBtn} onClick={()=>clickToCopy()}><img src='/copy.png' alt="copy" height={15} width={15} /></div>
                </div>
            </div>   

            {isFullScreen && <div className={styles.imgFullScreen} onClick={()=>clickToFullImg()} >
                    <img className={styles.imgFullScreen} ref={refFullImg} src={imageArray[activePhoto].url} alt="" onClick={()=>clickToFullImg()}/>         

                    <div className={classNames(styles.flexRow_1)}>
                        <div className={styles.btnFullScreen_1} onClick={()=>clickToFullScreen_1()}></div>
                        <div className={classNames(styles.flexRow)}>
                            <div onClick={()=>{clickTobtnLeftRound_1()}} className={styles.btnleftRound}></div>
                            <div onClick={()=>{clickTobtnRightRound_1()}} className={styles.btnRightRound}></div>
                        </div>
                    </div>
                    <div className={styles.titleImg_1}>{imageArray[activePhoto].title}</div>     
                    <div className={styles.menyImg_1}>
                        <div onClick={()=>{clickToSliderLeft()}} className={styles.sliderLeft}></div>
                        <div className={styles.imgWrapper}>
                            {renderSliderPhoto_1}
                        </div>
                        <div onClick={()=>{clickToSliderRight()}} className={styles.sliderRight}></div>
                    </div>
            </div>}    
        
        </>
    )
}
