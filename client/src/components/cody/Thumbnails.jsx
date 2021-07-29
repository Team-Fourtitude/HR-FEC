import React, { useState, useEffect, useContext } from 'react';
import StyleContext from '../context/StyleContext.jsx';
import Image from './Image.jsx';

const Thumbnails = () => {
  const curStyle = useContext(StyleContext);
  const [currentPic, setCurrentPic] = useState({url: undefined, name: undefined});
  const [index, setIndex] = useState(0);
  useEffect( () => {
    if (currentPic.url === undefined && curStyle.style) {
      if (curStyle.style.photos) {
        setCurrentPic({url:curStyle.style.photos[0].thumbnail_url, name:`0`, style:curStyle.style.style_id});
      }
    } else if (currentPic.style && curStyle.style) {
      let photoMax = curStyle.style.photos.length - 1;
      if (currentPic.style !== curStyle.style.style_id) {
        if (curStyle.style.photos[index]) {
          setCurrentPic({url:curStyle.style.photos[index].thumbnail_url, name:`${index}`, style:curStyle.style.style_id});
        } else {
          setCurrentPic({url:curStyle.style.photos[photoMax].thumbnail_url, name:`${photoMax}`, style:curStyle.style.style_id});
          setIndex(photoMax);
        }
      } else {
        console.log('same style id');
      }
    } else {
      console.log('currentPic set');
    }
  });

  return (
    <div style={{"position":"relative", "border":"1px solid pink", "overflow":"hidden"}}>
    {(() => {
      if (curStyle.style) {
        if (curStyle.style.photos) {
          console.log('1', curStyle.style.photos);
          return (
            <>
            <div style={{"position":"relative"}}>
            <Image current={currentPic ? currentPic : {url: '#', name: 'alt-name'}} context={curStyle} index={{index, setIndex}} currentPicture={{currentPic, setCurrentPic}}/>
            <div style={{"width":"75px", "maxHeight": "475px","height":"max-content", "position":"absolute", "top":"10%", "left":"1%", "display":"block", "backgroundColor":"rgba(0, 0, 0, 0.5)", "padding":"2.5em 1em", "borderRadius":"10px", "zIndex":"1000"}}>
              <div id="thumbnailScroll" style={{"width":"75px", "maxHeight": "400px","height":"80%", "overflowY":"auto", "overflowX":"hidden"}}>
                {curStyle.style ? curStyle.style.photos.map( (photo, index) => {
                  if (currentPic.name == index) {
                    return (
                      <div id="selected" style={{"width":"100%","height":"55px","overflow":"hidden", "backgroundColor":"#222", "marginBottom":"1em"}} key={index} onClick={ () => {
                        setCurrentPic({url:photo.thumbnail_url, name:`${index}`, style:curStyle.style.style_id});
                        setIndex(index);
                      }}>
                        <img style={{"width":"100%", "height":"100%", "objectFit":"cover", "opacity":"0.5"}} src={photo.thumbnail_url} alt={`${index}`} />
                      </div>
                    );
                  } else {
                    return (
                      <div style={{"width":"100%","height":"55px","overflow":"hidden", "backgroundColor":"#222", "marginBottom":"1em"}} key={index} onClick={ () => {
                        setCurrentPic({url:photo.thumbnail_url, name:`${index}`, style:curStyle.style.style_id});
                        setIndex(index);
                      }}>
                        <img style={{"width":"100%", "height":"100%", "objectFit":"cover"}} src={photo.thumbnail_url} alt={`${index}`} />
                      </div>
                    );
                  }
                }) : null}
                {(() => {
                  if (index === 0) {
                    if (curStyle.style) {
                      if (curStyle.style.photos.length === 1) {
                        return (
                          <>
                            <button type='button' style={{"fontSize":"2em", "padding":"0", "backgroundColor":"transparent", "border":"1px solid transparent", "color":"#444", "position":"absolute","left":"30%", "top": "1%"}} disabled>🞁</button>
                            <button type='button' style={{"fontSize":"2em", "padding":"0", "backgroundColor":"transparent", "border":"1px solid transparent", "color":"#444", "position":"absolute","left":"30%", "bottom": "1%"}} disabled>🞃</button>
                          </>
                        );
                      } else {
                        return (
                          <>
                            <button type='button' style={{"fontSize":"2em", "padding":"0", "backgroundColor":"transparent", "border":"1px solid transparent", "color":"#444", "position":"absolute","left":"30%", "top": "1%"}} disabled>🞁</button>
                            <button type='button' style={{"fontSize":"2em", "padding":"0", "backgroundColor":"transparent", "border":"1px solid transparent", "color":"#444", "position":"absolute","left":"30%", "bottom": "1%"}} onMouseOver={(ev) => ev.target.style.color = "#888"} onMouseOut={(ev) => ev.target.style.color = "#444"}
                            onClick={() => {
                              setCurrentPic({url:curStyle.style.photos[index + 1].thumbnail_url, name:`${index + 1}`, style:curStyle.style.style_id});
                              setIndex(index + 1);
                            }}>🞃</button>
                          </>
                        );
                      }
                    }
                  } else if (curStyle.style) {
                    let photoMax = curStyle.style.photos.length - 1;
                    if (index === photoMax) {
                      return (
                        <>
                          <button type='button' style={{"fontSize":"2em", "padding":"0", "backgroundColor":"transparent", "border":"1px solid transparent", "color":"#444", "position":"absolute","left":"30%", "top": "1%"}} onMouseOver={(ev) => ev.target.style.color = "#888"} onMouseOut={(ev) => ev.target.style.color = "#444"}
                          onClick={() => {
                            setCurrentPic({url:curStyle.style.photos[index - 1].thumbnail_url, name:`${index - 1}`, style:curStyle.style.style_id});
                            setIndex(index - 1);
                          }}>🞁</button>
                          <button type='button' style={{"fontSize":"2em", "padding":"0", "backgroundColor":"transparent", "border":"1px solid transparent", "color":"#444", "position":"absolute","left":"30%", "bottom": "1%"}} disabled>🞃</button>
                        </>
                      );
                    } else {
                      return (
                        <>
                          <button type='button' style={{"fontSize":"2em", "padding":"0", "backgroundColor":"transparent", "border":"1px solid transparent", "color":"#444", "position":"absolute","left":"30%", "top": "1%"}} onMouseOver={(ev) => ev.target.style.color = "#888"} onMouseOut={(ev) => ev.target.style.color = "#444"}
                          onClick={() => {
                            setCurrentPic({url:curStyle.style.photos[index - 1].thumbnail_url, name:`${index - 1}`, style:curStyle.style.style_id});
                            setIndex(index - 1);
                          }}>🞁</button>
                          <button type='button' style={{"fontSize":"2em", "padding":"0", "backgroundColor":"transparent", "border":"1px solid transparent", "color":"#444", "position":"absolute","left":"30%", "bottom": "1%"}} onMouseOver={(ev) => ev.target.style.color = "#888"} onMouseOut={(ev) => ev.target.style.color = "#444"}
                          onClick={() => {
                            setCurrentPic({url:curStyle.style.photos[index + 1].thumbnail_url, name:`${index + 1}`, style:curStyle.style.style_id});
                            setIndex(index + 1);
                        }}>🞃</button>
                        </>
                      );
                    }
                  }
                })()}
              </div>
            </div>
            </div>
            </>
          );
        } else {
          console.log('2', curStyle.style);
          return 'fail 2';
        }
      } else {
        console.log('3', 'houston we\'ve failed');
        return 'fail 3';
      }
    })()}
  </div>
  );
};

export default Thumbnails;