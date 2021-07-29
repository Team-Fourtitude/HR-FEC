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
    <div style={{"position":"relative", "border":"1px solid pink"}}>
    {(() => {
      if (curStyle.style) {
        if (curStyle.style.photos) {
          console.log('1', curStyle.style.photos);
          return (
            <>
            <Image current={currentPic ? currentPic : {url: '#', name: 'alt-name'}} context={curStyle} index={{index, setIndex}} currentPicture={{currentPic, setCurrentPic}}/>
            <div id="thumbnailScroll" style={{"width":"100px", "maxHeight":"700px", "overflowY":"auto", "overflowX":"hidden", "position":"absolute", "top":"0", "left":"0"}}>
              {curStyle.style ? curStyle.style.photos.map( (photo, index) => {
                if (currentPic.name == index) {
                  return (
                    <div id="selected" style={{"border":"1px solid red","width":"100%","height":"100px","overflow":"hidden"}} key={index} onClick={ () => {
                      setCurrentPic({url:photo.thumbnail_url, name:`${index}`, style:curStyle.style.style_id});
                      setIndex(index);
                      console.log('index reset');
                    }}>
                      <img style={{"width":"150%"}} src={photo.thumbnail_url} alt={`${index}`} />
                    </div>
                  );
                } else {
                  return (
                    <div style={{"width":"100%","height":"100px","overflow":"hidden"}} key={index} onClick={ () => {
                      setCurrentPic({url:photo.thumbnail_url, name:`${index}`, style:curStyle.style.style_id});
                      setIndex(index);
                    }}>
                      <img style={{"width":"150%"}} src={photo.thumbnail_url} alt={`${index}`} />
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
                          <button type='button' style={{"position":"absolute", "left":"30%", "top": "0"}} disabled>up</button>
                          <button type='button' style={{"position":"absolute", "left":"30%", "bottom": "0"}} disabled>down</button>
                        </>
                      );
                    } else {
                      return (
                        <>
                          <button type='button' style={{"position":"absolute", "left":"30%", "top": "0"}} disabled>up</button>
                          <button type='button' style={{"position":"absolute", "left":"30%", "bottom": "0"}} onClick={() => {
                            setCurrentPic({url:curStyle.style.photos[index + 1].thumbnail_url, name:`${index + 1}`, style:curStyle.style.style_id});
                            setIndex(index + 1);
                          }}>down</button>
                        </>
                      );
                    }
                  }
                } else if (curStyle.style) {
                  let photoMax = curStyle.style.photos.length - 1;
                  if (index === photoMax) {
                    return (
                      <>
                        <button type='button' style={{"position":"absolute", "left":"30%", "top": "0"}} onClick={() => {
                          setCurrentPic({url:curStyle.style.photos[index - 1].thumbnail_url, name:`${index - 1}`, style:curStyle.style.style_id});
                          setIndex(index - 1);
                        }}>up</button>
                        <button type='button' style={{"position":"absolute", "left":"30%", "bottom": "0"}} disabled>down</button>
                      </>
                    );
                  } else {
                    return (
                      <>
                        <button type='button' style={{"position":"absolute", "left":"30%", "top": "0"}} onClick={() => {
                          setCurrentPic({url:curStyle.style.photos[index - 1].thumbnail_url, name:`${index - 1}`, style:curStyle.style.style_id});
                          setIndex(index - 1);
                        }}>up</button>
                        <button type='button' style={{"position":"absolute", "left":"30%", "bottom": "0"}} onClick={() => {
                          setCurrentPic({url:curStyle.style.photos[index + 1].thumbnail_url, name:`${index + 1}`, style:curStyle.style.style_id});
                          setIndex(index + 1);
                      }}>down</button>
                      </>
                    );
                  }
                }
              })()}
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