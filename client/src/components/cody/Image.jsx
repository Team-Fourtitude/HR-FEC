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
          }}>
            <img id="imgRatio" src={props.current.url} style={{
              "position": "absolute",
              "visibility": "hidden",
            }} />
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
            }}
            // src={props.current.url} alt={props.current.name}
            />
            <button type='button' style={{"color":"#444", "fontSize":"2em", "backgroundColor":"rgba(0, 0, 0, 0.5)", "border": "1px solid transparent", "borderRadius":"5px", "position":"absolute", "top":"0", "right":"0"}}
            onMouseOver={(ev) => ev.target.style.color = "#888"} onMouseOut={(ev) => ev.target.style.color = "#444"}
            onClick={ () => {
              if (size) {
                setZoom(false);
                setSize(false);
              } else {
                setSize(true);
              }
            }}>{size ? '⛶' : '⛶'}</button>
            {(() => {
              if (index === 0) {
                if (curStyle.style) {
                  if (curStyle.style.photos.length === 1) {
                    return (
                      <>
                <button type='button' style={{"color":"#444", "fontSize":"2em", "backgroundColor":"rgba(0, 0, 0, 0.5)", "border": "1px solid transparent", "borderRadius":"5px", "position":"absolute", "left":"17%", "top": "50%"}} disabled>🞀</button>
                <button type='button' style={{"color":"#444", "fontSize":"2em", "backgroundColor":"rgba(0, 0, 0, 0.5)", "border": "1px solid transparent", "borderRadius":"5px", "position":"absolute", "right":"0", "top": "50%"}} disabled>🞂</button>
              </>
            );
          } else {
            return (
              <>
                <button type='button' style={{"color":"#444", "fontSize":"2em", "backgroundColor":"rgba(0, 0, 0, 0.5)", "border": "1px solid transparent", "borderRadius":"5px", "position":"absolute", "left":"17%", "top": "50%"}} disabled>🞀</button>
                <button type='button' style={{"color":"#444", "fontSize":"2em", "backgroundColor":"rgba(0, 0, 0, 0.5)", "border": "1px solid transparent", "borderRadius":"5px", "position":"absolute", "right":"0", "top": "50%"}}
                onMouseOver={(ev) => ev.target.style.color = "#888"} onMouseOut={(ev) => ev.target.style.color = "#444"}
                onClick={() => {
                  setCurrentPic({url:curStyle.style.photos[index + 1].thumbnail_url, name:`${index + 1}`, style:curStyle.style.style_id});
                  setIndex(index + 1);
                }}>🞂</button>
              </>
            );
          }
        }
      } else if (curStyle.style) {
        let photoMax = curStyle.style.photos.length - 1;
        if (index === photoMax) {
          return (
            <>
              <button type='button' style={{"color":"#444", "fontSize":"2em", "backgroundColor":"rgba(0, 0, 0, 0.5)", "border": "1px solid transparent", "borderRadius":"5px", "position":"absolute", "left":"17%", "top": "50%"}}
              onMouseOver={(ev) => ev.target.style.color = "#888"} onMouseOut={(ev) => ev.target.style.color = "#444"}
              onClick={() => {
                setCurrentPic({url:curStyle.style.photos[index - 1].thumbnail_url, name:`${index - 1}`, style:curStyle.style.style_id});
                setIndex(index - 1);
              }}>🞀</button>
              <button type='button' style={{"color":"#444", "fontSize":"2em", "backgroundColor":"rgba(0, 0, 0, 0.5)", "border": "1px solid transparent", "borderRadius":"5px", "position":"absolute", "right":"0", "top": "50%"}} disabled>🞂</button>
            </>
          );
        } else {
          return (
            <>
              <button type='button' style={{"color":"#444", "fontSize":"2em", "backgroundColor":"rgba(0, 0, 0, 0.5)", "border": "1px solid transparent", "borderRadius":"5px", "position":"absolute", "left":"17%", "top": "50%"}}
              onMouseOver={(ev) => ev.target.style.color = "#888"} onMouseOut={(ev) => ev.target.style.color = "#444"}
              onClick={() => {
                setCurrentPic({url:curStyle.style.photos[index - 1].thumbnail_url, name:`${index - 1}`, style:curStyle.style.style_id});
                setIndex(index - 1);
                let selected = document.getElementById('selected');
                console.log(selected.offsetTop, 'offset top of selected');
                let scrollbar = document.getElementById('thumbnailScroll');
                console.log(scrollbar.scrollTop, 'top scroll');
                scrollbar.scrollTop -= 100;
              }}>🞀</button>
              <button type='button' style={{"color":"#444", "fontSize":"2em", "backgroundColor":"rgba(0, 0, 0, 0.5)", "border": "1px solid transparent", "borderRadius":"5px", "position":"absolute", "right":"0", "top": "50%"}}
              onMouseOver={(ev) => ev.target.style.color = "#888"} onMouseOut={(ev) => ev.target.style.color = "#444"}
              onClick={() => {
                setCurrentPic({url:curStyle.style.photos[index + 1].thumbnail_url, name:`${index + 1}`, style:curStyle.style.style_id});
                setIndex(index + 1);
                let selected = document.getElementById('selected');
                console.log(selected.offsetTop, 'offset top of selected');
                let scrollbar = document.getElementById('thumbnailScroll');
                console.log(scrollbar.scrollTop, 'top scroll');
                scrollbar.scrollTop += 100;
            }}>🞂</button>
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
            <button type='button' style={{"color":"#444", "fontSize":"2em", "backgroundColor":"rgba(0, 0, 0, 0.5)", "border": "1px solid transparent", "borderRadius":"5px", "position":"absolute", "top":"0", "right":"0"}}
            onMouseOver={(ev) => ev.target.style.color = "#888"} onMouseOut={(ev) => ev.target.style.color = "#444"}
            onClick={ () => {
              if (size) {
                setZoom(false);
                setSize(false);
              } else {
                setSize(true);
              }
            }}>{size ? '⛶' : '⛶'}</button>
            {(() => {
      if (index === 0) {
        if (curStyle.style) {
          if (curStyle.style.photos.length === 1) {
            return (
              <>
                <button type='button' style={{"color":"#444", "fontSize":"2em", "backgroundColor":"rgba(0, 0, 0, 0.5)", "border": "1px solid transparent", "borderRadius":"5px", "position":"absolute", "left":"17%", "top": "50%"}} disabled>🞀</button>
                <button type='button' style={{"color":"#444", "fontSize":"2em", "backgroundColor":"rgba(0, 0, 0, 0.5)", "border": "1px solid transparent", "borderRadius":"5px", "position":"absolute", "right":"0", "top": "50%"}} disabled>🞂</button>
              </>
            );
          } else {
            return (
              <>
                <button type='button' style={{"color":"#444", "fontSize":"2em", "backgroundColor":"rgba(0, 0, 0, 0.5)", "border": "1px solid transparent", "borderRadius":"5px", "position":"absolute", "left":"17%", "top": "50%"}} disabled>🞀</button>
                <button type='button' style={{"color":"#444", "fontSize":"2em", "backgroundColor":"rgba(0, 0, 0, 0.5)", "border": "1px solid transparent", "borderRadius":"5px", "position":"absolute", "right":"0", "top": "50%"}}
                onMouseOver={(ev) => ev.target.style.color = "#888"} onMouseOut={(ev) => ev.target.style.color = "#444"}
                onClick={() => {
                  setCurrentPic({url:curStyle.style.photos[index + 1].thumbnail_url, name:`${index + 1}`, style:curStyle.style.style_id});
                  setIndex(index + 1);
                }}>🞂</button>
              </>
            );
          }
        }
      } else if (curStyle.style) {
        let photoMax = curStyle.style.photos.length - 1;
        if (index === photoMax) {
          return (
            <>
              <button type='button' style={{"color":"#444", "fontSize":"2em", "backgroundColor":"rgba(0, 0, 0, 0.5)", "border": "1px solid transparent", "borderRadius":"5px", "position":"absolute", "left":"17%", "top": "50%"}}
              onMouseOver={(ev) => ev.target.style.color = "#888"} onMouseOut={(ev) => ev.target.style.color = "#444"}
              onClick={() => {
                setCurrentPic({url:curStyle.style.photos[index - 1].thumbnail_url, name:`${index - 1}`, style:curStyle.style.style_id});
                setIndex(index - 1);
              }}>🞀</button>
              <button type='button' style={{"color":"#444", "fontSize":"2em", "backgroundColor":"rgba(0, 0, 0, 0.5)", "border": "1px solid transparent", "borderRadius":"5px", "position":"absolute", "right":"0", "top": "50%"}} disabled>🞂</button>
            </>
          );
        } else {
          return (
            <>
              <button type='button' style={{"color":"#444", "fontSize":"2em", "backgroundColor":"rgba(0, 0, 0, 0.5)", "border": "1px solid transparent", "borderRadius":"5px", "position":"absolute", "left":"17%", "top": "50%"}}
              onMouseOver={(ev) => ev.target.style.color = "#888"} onMouseOut={(ev) => ev.target.style.color = "#444"}
              onClick={() => {
                setCurrentPic({url:curStyle.style.photos[index - 1].thumbnail_url, name:`${index - 1}`, style:curStyle.style.style_id});
                setIndex(index - 1);
                let selected = document.getElementById('selected');
                console.log(selected.offsetTop, 'offset top of selected');
                let scrollbar = document.getElementById('thumbnailScroll');
                console.log(scrollbar.scrollTop, 'top scroll');
                scrollbar.scrollTop -= 100;
              }}>🞀</button>
              <button type='button' style={{"color":"#444", "fontSize":"2em", "backgroundColor":"rgba(0, 0, 0, 0.5)", "border": "1px solid transparent", "borderRadius":"5px", "position":"absolute", "right":"0", "top": "50%"}}
              onMouseOver={(ev) => ev.target.style.color = "#888"} onMouseOut={(ev) => ev.target.style.color = "#444"}
              onClick={() => {
                setCurrentPic({url:curStyle.style.photos[index + 1].thumbnail_url, name:`${index + 1}`, style:curStyle.style.style_id});
                setIndex(index + 1);
                let selected = document.getElementById('selected');
                console.log(selected.offsetTop, 'offset top of selected');
                let scrollbar = document.getElementById('thumbnailScroll');
                console.log(scrollbar.scrollTop, 'top scroll');
                scrollbar.scrollTop += 100;
            }}>🞂</button>
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