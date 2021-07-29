import React, { useState } from 'react';

const Image = (props) => {
  const [size, setSize] = useState(false);
  const [zoom, setZoom] = useState(false);
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const curStyle = props.context;
  const {index, setIndex} = props.index;
  const {currentPic, setCurrentPic} = props.currentPicture;

  return (
  <>
    {(() => {
      if (size) {
        return (
          <div style={{
            "display": "flex",
            "position": "relative",
            "justifyContent": "center",
            "width": "100%",
            "maxHeight": "600px",
            "backgroundColor": "black",
            "overflow": "hidden",
            "cursor": zoom ? "url(\"https://i.imgur.com/spnFx5r.png\"), auto" : 'crosshair',
            "zIndex": "100",
          }}
          onMouseMove={ (e) => {
            if (zoom) {
              console.log('x', e.nativeEvent.offsetX * 2.5);
              console.log('y', e.nativeEvent.offsetY * 2.5);
              setX(e.nativeEvent.offsetX * 2.5);
              setY(e.nativeEvent.offsetY * 2.5);
            }
          }} >
            <img style={{
              "width": "100%",
              "height": "600px",
              "objectFit": "contain",
              "backgroundColor": "grey",
              "transform": zoom ? "scale(2.5)" : "scale(1)",
            }}
            onClick={ (e) => {
              if (zoom) {
                setZoom(false);
              } else {
                setX(e.nativeEvent.offsetX);
                setY(e.nativeEvent.offsetY);
                setZoom(true);
              }
            }}
            src={props.current.url} alt={props.current.name}/>
            <button type='button' style={{"position":"absolute", "top":"0", "right":"0"}} onClick={ () => {
              if (size) {
                setZoom(false);
                setSize(false);
              } else {
                setSize(true);
              }
            }}>{size ? 'contract' : 'expand'}</button>
            {(() => {
              if (index === 0) {
                if (curStyle.style) {
                  if (curStyle.style.photos.length === 1) {
                    return (
                      <>
                <button type='button' style={{"position":"absolute", "left":"20%", "top": "50%"}} disabled>left</button>
                <button type='button' style={{"position":"absolute", "right":"0", "top": "50%"}} disabled>right</button>
              </>
            );
          } else {
            return (
              <>
                <button type='button' style={{"position":"absolute", "left":"20%", "top": "50%"}} disabled>left</button>
                <button type='button' style={{"position":"absolute", "right":"0", "top": "50%"}} onClick={() => {
                  setCurrentPic({url:curStyle.style.photos[index + 1].thumbnail_url, name:`${index + 1}`, style:curStyle.style.style_id});
                  setIndex(index + 1);
                }}>right</button>
              </>
            );
          }
        }
      } else if (curStyle.style) {
        let photoMax = curStyle.style.photos.length - 1;
        if (index === photoMax) {
          return (
            <>
              <button type='button' style={{"position":"absolute", "left":"20%", "top": "50%"}} onClick={() => {
                setCurrentPic({url:curStyle.style.photos[index - 1].thumbnail_url, name:`${index - 1}`, style:curStyle.style.style_id});
                setIndex(index - 1);
              }}>left</button>
              <button type='button' style={{"position":"absolute", "right":"0", "top": "50%"}} disabled>right</button>
            </>
          );
        } else {
          return (
            <>
              <button type='button' style={{"position":"absolute", "left":"20%", "top": "50%"}} onClick={() => {
                setCurrentPic({url:curStyle.style.photos[index - 1].thumbnail_url, name:`${index - 1}`, style:curStyle.style.style_id});
                setIndex(index - 1);
                let selected = document.getElementById('selected');
                console.log(selected.offsetTop, 'offset top of selected');
                let scrollbar = document.getElementById('thumbnailScroll');
                console.log(scrollbar.scrollTop, 'top scroll');
                scrollbar.scrollTop -= 100;
              }}>left</button>
              <button type='button' style={{"position":"absolute", "right":"0", "top": "50%"}} onClick={() => {
                setCurrentPic({url:curStyle.style.photos[index + 1].thumbnail_url, name:`${index + 1}`, style:curStyle.style.style_id});
                setIndex(index + 1);
                let selected = document.getElementById('selected');
                console.log(selected.offsetTop, 'offset top of selected');
                let scrollbar = document.getElementById('thumbnailScroll');
                console.log(scrollbar.scrollTop, 'top scroll');
                scrollbar.scrollTop += 100;
            }}>right</button>
            </>
          );
        }
      }
    })()}
          </div>
        );
      } else {
        return (
          <div style={{
            "width": "65%",
            "maxHeight": "600px",
            "cursor": "zoom-in",
            "position":"relative",
          }}>
            <img style={{
              "width": "100%",
              "height":"600px",
              "objectFit":"cover",
            }} src={props.current.url} alt={props.current.name} onClick={ () => {
              if (size) {
                setZoom(false);
                setSize(false);
              } else {
                setSize(true);
              }
            }}/>
            <button type='button' style={{"position":"absolute", "top":"0", "right":"0"}} onClick={ () => {
              if (size) {
                setZoom(false);
                setSize(false);
              } else {
                setSize(true);
              }
            }}>{size ? 'contract' : 'expand'}</button>
            {(() => {
      if (index === 0) {
        if (curStyle.style) {
          if (curStyle.style.photos.length === 1) {
            return (
              <>
                <button type='button' style={{"position":"absolute", "left":"20%", "top": "50%"}} disabled>left</button>
                <button type='button' style={{"position":"absolute", "right":"0", "top": "50%"}} disabled>right</button>
              </>
            );
          } else {
            return (
              <>
                <button type='button' style={{"position":"absolute", "left":"20%", "top": "50%"}} disabled>left</button>
                <button type='button' style={{"position":"absolute", "right":"0", "top": "50%"}} onClick={() => {
                  setCurrentPic({url:curStyle.style.photos[index + 1].thumbnail_url, name:`${index + 1}`, style:curStyle.style.style_id});
                  setIndex(index + 1);
                }}>right</button>
              </>
            );
          }
        }
      } else if (curStyle.style) {
        let photoMax = curStyle.style.photos.length - 1;
        if (index === photoMax) {
          return (
            <>
              <button type='button' style={{"position":"absolute", "left":"20%", "top": "50%"}} onClick={() => {
                setCurrentPic({url:curStyle.style.photos[index - 1].thumbnail_url, name:`${index - 1}`, style:curStyle.style.style_id});
                setIndex(index - 1);
              }}>left</button>
              <button type='button' style={{"position":"absolute", "right":"0", "top": "50%"}} disabled>right</button>
            </>
          );
        } else {
          return (
            <>
              <button type='button' style={{"position":"absolute", "left":"20%", "top": "50%"}} onClick={() => {
                setCurrentPic({url:curStyle.style.photos[index - 1].thumbnail_url, name:`${index - 1}`, style:curStyle.style.style_id});
                setIndex(index - 1);
                let selected = document.getElementById('selected');
                console.log(selected.offsetTop, 'offset top of selected');
                let scrollbar = document.getElementById('thumbnailScroll');
                console.log(scrollbar.scrollTop, 'top scroll');
                scrollbar.scrollTop -= 100;
              }}>left</button>
              <button type='button' style={{"position":"absolute", "right":"0", "top": "50%"}} onClick={() => {
                setCurrentPic({url:curStyle.style.photos[index + 1].thumbnail_url, name:`${index + 1}`, style:curStyle.style.style_id});
                setIndex(index + 1);
                let selected = document.getElementById('selected');
                console.log(selected.offsetTop, 'offset top of selected');
                let scrollbar = document.getElementById('thumbnailScroll');
                console.log(scrollbar.scrollTop, 'top scroll');
                scrollbar.scrollTop += 100;
            }}>right</button>
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