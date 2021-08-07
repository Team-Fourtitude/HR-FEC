import React, { useState } from 'react';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import { ImageButton, ImageButtonLeft, ImageButtonRight} from './StyleHelpers.jsx';

const Image = (props) => {
  const [size, setSize] = useState(false);
  const [zoom, setZoom] = useState(false);
  const curStyle = props.context;
  const {index, setIndex} = props.index;
  const {currentPic, setCurrentPic} = props.currentPicture;

  return (
  <>
    {(() => {
      if (size) {
        return (
          <div tabIndex='0' style={{
            "display": "flex",
            "position": "relative",
            "justifyContent": "center",
            "width": "100%",
            "maxHeight": "600px",
            "backgroundColor": "black",
            "overflow": "hidden",
            "cursor": zoom ? "url(\"assets/minusCursor.png\"), auto" : 'crosshair',
            "zIndex": "100",
          }} onKeyDown={ (e) => {
            if (e.which === 27) {
              setZoom(false);
              setSize(false);
            }
          }}>
            <img id="imgRatio" src={props.current.url} style={{
              "position": "absolute",
              "visibility": "hidden",
            }} alt="image for getting test ratio"/>
            <div style={{
              "width": "100%",
              "height": "600px",
              "objectFit": "contain",
              "backgroundColor": "grey",
              "backgroundImage": `url(${props.current.url})`,
              "backgroundRepeat":"no-repeat",
              "backgroundSize": zoom ? "250%" : "100%",
              "backgroundPosition":"center",
            }}
            onClick={ (e) => {
              if (zoom) {
                e.target.style.backgroundPosition = "center";
                setZoom(false);
              } else {
                let img = document.getElementById("imgRatio");
                let imgRatio = img.clientHeight/img.clientWidth;
                console.log('img ratio', imgRatio);
                let scaleY = 3125 / 600 * imgRatio - 1;
                console.log('scale Y: ', scaleY);
                e.target.style.backgroundPositionX = (-e.nativeEvent.offsetX * 1.5) + "px";
                e.target.style.backgroundPositionY = (-e.nativeEvent.offsetY * scaleY) + "px";
                setZoom(true);
              }
            }}
            onMouseMove={ (e) => {
              if (zoom) {
                let img = document.getElementById("imgRatio");
                let imgRatio = img.clientHeight/img.clientWidth;
                let scaleY = 3125 / 600 * imgRatio - 1;
                e.target.style.backgroundPositionX = (-e.nativeEvent.offsetX * 1.5) + "px";
                e.target.style.backgroundPositionY = (-e.nativeEvent.offsetY * scaleY) + "px";
              }
            }}/>
            <ImageButton type='button'
            onClick={ () => {
              if (size) {
                setZoom(false);
                setSize(false);
              } else {
                setSize(true);
              }
            }}>{size ? '⛶' : '⛶'}</ImageButton>
            {(() => {
              if (index === 0) {
                if (curStyle.style) {
                  if (curStyle.style.photos.length === 1) {
                    return (
                      <>
                <ImageButtonLeft type='button' disabled><FaAngleLeft /></ImageButtonLeft>
                <ImageButtonRight type='button' disabled><FaAngleRight /></ImageButtonRight>
              </>
            );
          } else {
            return (
              <>
                <ImageButtonLeft type='button' disabled><FaAngleLeft /></ImageButtonLeft>
                <ImageButtonRight type='button'
                onClick={() => {
                  setCurrentPic({url:curStyle.style.photos[index + 1].url, name:`${index + 1}`, style:curStyle.style.style_id});
                  setIndex(index + 1);
                }}><FaAngleRight /></ImageButtonRight>
              </>
            );
          }
        }
      } else if (curStyle.style) {
        let photoMax = curStyle.style.photos.length - 1;
        if (index === photoMax) {
          return (
            <>
              <ImageButtonLeft type='button'
              onClick={() => {
                setCurrentPic({url:curStyle.style.photos[index - 1].url, name:`${index - 1}`, style:curStyle.style.style_id});
                setIndex(index - 1);
              }}><FaAngleLeft /></ImageButtonLeft>
              <ImageButtonRight type='button' disabled><FaAngleRight /></ImageButtonRight>
            </>
          );
        } else {
          return (
            <>
              <ImageButtonLeft type='button'
              onClick={() => {
                setCurrentPic({url:curStyle.style.photos[index - 1].url, name:`${index - 1}`, style:curStyle.style.style_id});
                setIndex(index - 1);
                let selected = document.getElementById('selected');
                let scrollbar = document.getElementById('thumbnailScroll');
                scrollbar.scrollTop -= 100;
              }}><FaAngleLeft /></ImageButtonLeft>
              <ImageButtonRight type='button'
              onClick={() => {
                setCurrentPic({url:curStyle.style.photos[index + 1].url, name:`${index + 1}`, style:curStyle.style.style_id});
                setIndex(index + 1);
                let selected = document.getElementById('selected');
                let scrollbar = document.getElementById('thumbnailScroll');
                scrollbar.scrollTop += 100;
            }}><FaAngleRight /></ImageButtonRight>
            </>
          );
        }
      }
    })()}
          </div>
        );
      } else {
        return (
          <div tabIndex='0' style={{
            "width": "65%",
            "maxHeight": "600px",
            "overflow":"hidden",
            "cursor": "zoom-in",
            "position":"relative",
          }} onKeyDown={ (e) => {
            if (e.which === 27) {
              setZoom(false);
              setSize(false);
            }
          }}>
            <img style={{
              "width": "100%",
              "height":"600px",
              "objectFit":"cover",
            }} src={props.current.url} alt={props.current.name || 'picture'} onClick={ () => {
              if (size) {
                setZoom(false);
                setSize(false);
              } else {
                setSize(true);
              }
            }}/>
            <ImageButton type='button'
            onClick={ () => {
              if (size) {
                setZoom(false);
                setSize(false);
              } else {
                setSize(true);
              }
            }}>{size ? '⛶' : '⛶'}</ImageButton>
            {(() => {
      if (index === 0) {
        if (curStyle.style) {
          if (curStyle.style.photos.length === 1) {
            return (
              <>
                <ImageButtonLeft type='button' disabled><FaAngleLeft /></ImageButtonLeft>
                <ImageButtonRight type='button' disabled><FaAngleRight /></ImageButtonRight>
              </>
            );
          } else {
            return (
              <>
                <ImageButtonLeft type='button' disabled><FaAngleLeft /></ImageButtonLeft>
                <ImageButtonRight type='button'
                onClick={() => {
                  setCurrentPic({url:curStyle.style.photos[index + 1].url, name:`${index + 1}`, style:curStyle.style.style_id});
                  setIndex(index + 1);
                }}><FaAngleRight /></ImageButtonRight>
              </>
            );
          }
        }
      } else if (curStyle.style) {
        let photoMax = curStyle.style.photos.length - 1;
        if (index === photoMax) {
          return (
            <>
              <ImageButtonLeft type='button'
              onClick={() => {
                setCurrentPic({url:curStyle.style.photos[index - 1].url, name:`${index - 1}`, style:curStyle.style.style_id});
                setIndex(index - 1);
              }}><FaAngleLeft /></ImageButtonLeft>
              <ImageButtonRight type='button' disabled><FaAngleRight /></ImageButtonRight>
            </>
          );
        } else {
          return (
            <>
              <ImageButtonLeft type='button'
              onClick={() => {
                setCurrentPic({url:curStyle.style.photos[index - 1].url, name:`${index - 1}`, style:curStyle.style.style_id});
                setIndex(index - 1);
                let selected = document.getElementById('selected');
                let scrollbar = document.getElementById('thumbnailScroll');
                scrollbar.scrollTop -= 100;
              }}><FaAngleLeft /></ImageButtonLeft>
              <ImageButtonRight type='button'
              onClick={() => {
                setCurrentPic({url:curStyle.style.photos[index + 1].url, name:`${index + 1}`, style:curStyle.style.style_id});
                setIndex(index + 1);
                let selected = document.getElementById('selected');
                let scrollbar = document.getElementById('thumbnailScroll');
                scrollbar.scrollTop += 100;
            }}><FaAngleRight /></ImageButtonRight>
            </>
          );
        }
      }
    })()}
          </div>
        );
      }
    }) ()}
  </>
  );
};

export default Image;