import React, { useState } from 'react';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import { ImageButton, ImageButtonLeft, ImageButtonRight, MainImageWrapper, ImageContainerMin, ImageContainerMax } from './StyleHelpers.js';
import { imageZoomPosition } from './utilFunctions';

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
          <ImageContainerMax tabIndex='0'
           onKeyDown={ (e) => {
            if (e.which === 27) {
              setZoom(false);
              setSize(false);
            }
          }}>
            <img id="imgRatio" src={props.current.url} style={{
              "position": "absolute",
              "visibility": "hidden",
            }} alt="image for getting test ratio"/>
            <MainImageWrapper url={props.current.url} zoom={zoom}
            onClick={ (e) => {
              if (zoom) {
                e.target.style.backgroundPosition = "center";
                setZoom(false);
              } else {
                imageZoomPosition(e);
                setZoom(true);
              }
            }}
            onMouseMove={ (e) => {
              if (zoom) {
                imageZoomPosition(e);
              }
            }}/>
            <ImageButton type='button' name='button-image'
            onClick={ () => {
              if (size) {
                setZoom(false);
                setSize(false);
              } else {
                setSize(true);
              }
            }}><img src='assets/collapse.png' alt='collapse button' style={{"width":"25px"}}/></ImageButton>
            {(() => {
              if (index === 0) {
                if (curStyle.style) {
                  if (curStyle.style.photos.length === 1) {
                    return (
                      <>
                <ImageButtonLeft type='button' name='button-left' disabled><FaAngleLeft /></ImageButtonLeft>
                <ImageButtonRight type='button' name='button-right' disabled><FaAngleRight name='fangle-right' /></ImageButtonRight>
              </>
            );
          } else {
            return (
              <>
                <ImageButtonLeft type='button' name='button-left' disabled><FaAngleLeft /></ImageButtonLeft>
                <ImageButtonRight type='button' name='button-right'
                onClick={() => {
                  setCurrentPic({url:curStyle.style.photos[index + 1].url, name:`${index + 1}`, style:curStyle.style.style_id});
                  setIndex(index + 1);
                }}><FaAngleRight name='fangle-right' /></ImageButtonRight>
              </>
            );
          }
        }
      } else if (curStyle.style) {
        let photoMax = curStyle.style.photos.length - 1;
        if (index === photoMax) {
          return (
            <>
              <ImageButtonLeft type='button' name='button-left'
              onClick={() => {
                setCurrentPic({url:curStyle.style.photos[index - 1].url, name:`${index - 1}`, style:curStyle.style.style_id});
                setIndex(index - 1);
              }}><FaAngleLeft /></ImageButtonLeft>
              <ImageButtonRight type='button' name='button-right' disabled><FaAngleRight name='fangle-right' /></ImageButtonRight>
            </>
          );
        } else {
          return (
            <>
              <ImageButtonLeft type='button' name='button-left'
              onClick={() => {
                setCurrentPic({url:curStyle.style.photos[index - 1].url, name:`${index - 1}`, style:curStyle.style.style_id});
                setIndex(index - 1);
                let scrollbar = document.getElementById('thumbnailScroll');
                scrollbar.scrollTop -= 100;
              }}><FaAngleLeft /></ImageButtonLeft>
              <ImageButtonRight type='button' name='button-right'
              onClick={() => {
                setCurrentPic({url:curStyle.style.photos[index + 1].url, name:`${index + 1}`, style:curStyle.style.style_id});
                setIndex(index + 1);
                let scrollbar = document.getElementById('thumbnailScroll');
                scrollbar.scrollTop += 100;
            }}><FaAngleRight name='fangle-right' /></ImageButtonRight>
            </>
          );
        }
      }
    })()}
          </ImageContainerMax>
        );
      } else {
        return (
          <ImageContainerMin tabIndex='0'
          onKeyDown={ (e) => {
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
            <ImageButton type='button' name='button-image'
            onClick={ () => {
              if (size) {
                setZoom(false);
                setSize(false);
              } else {
                setSize(true);
              }
            }}><img src='assets/expand.png' alt='expand button' style={{"width":"25px"}}/></ImageButton>
            {(() => {
      if (index === 0) {
        if (curStyle.style) {
          if (curStyle.style.photos.length === 1) {
            return (
              <>
                <ImageButtonLeft type='button' name='button-left' disabled><FaAngleLeft /></ImageButtonLeft>
                <ImageButtonRight type='button' name='button-right' disabled><FaAngleRight name='fangle-right' /></ImageButtonRight>
              </>
            );
          } else {
            return (
              <>
                <ImageButtonLeft type='button' name='button-left' disabled><FaAngleLeft /></ImageButtonLeft>
                <ImageButtonRight type='button' name='button-right'
                onClick={() => {
                  setCurrentPic({url:curStyle.style.photos[index + 1].url, name:`${index + 1}`, style:curStyle.style.style_id});
                  setIndex(index + 1);
                }}><FaAngleRight name='fangle-right' /></ImageButtonRight>
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
name='button-left'               onClick={() => {
                setCurrentPic({url:curStyle.style.photos[index - 1].url, name:`${index - 1}`, style:curStyle.style.style_id});
                setIndex(index - 1);
              }}><FaAngleLeft name='fangle-left'/></ImageButtonLeft>
              <ImageButtonRight type='button' name='button-right' disabled><FaAngleRight name='fangle-right' /></ImageButtonRight>
            </>
          );
        } else {
          return (
            <>
              <ImageButtonLeft type='button' name='button-left'
              onClick={() => {
                setCurrentPic({url:curStyle.style.photos[index - 1].url, name:`${index - 1}`, style:curStyle.style.style_id});
                setIndex(index - 1);
                let scrollbar = document.getElementById('thumbnailScroll');
                scrollbar.scrollTop -= 100;
              }}><FaAngleLeft /></ImageButtonLeft>
              <ImageButtonRight type='button' name='button-right'
              onClick={() => {
                setCurrentPic({url:curStyle.style.photos[index + 1].url, name:`${index + 1}`, style:curStyle.style.style_id});
                setIndex(index + 1);
                let scrollbar = document.getElementById('thumbnailScroll');
                scrollbar.scrollTop += 100;
            }}><FaAngleRight name='fangle-right' /></ImageButtonRight>
            </>
          );
        }
      }
    })()}
          </ImageContainerMin>
        );
      }
    }) ()}
  </>
  );
};

export default Image;