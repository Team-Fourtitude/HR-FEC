import React, { useState, useEffect, useContext } from 'react';
import StyleContext from '../context/StyleContext.jsx';
import Image from './Image.jsx';
import { FaAngleUp, FaAngleDown } from 'react-icons/fa';
import { ThumbnailsContainer, ThumbnailsImageWrapper, ThumbnailImage, ThumbnailsButtonUp, ThumbnailsButtonDown } from './StyleHelpers.js';

const thumbnailContainerStyles = {"width":"75px", "maxHeight": "475px","height":"max-content", "position":"absolute", "top":"10%", "left":"1%", "display":"block", "backgroundColor":"rgba(0, 0, 0, 0.5)", "padding":"2.5em 1em", "borderRadius":"10px", "zIndex":"1000"};

const Thumbnails = () => {
  const curStyle = useContext(StyleContext);
  const [currentPic, setCurrentPic] = useState({url: undefined, name: undefined});
  const [index, setIndex] = useState(0);
  useEffect( () => {
    if (currentPic.url === undefined && curStyle.style) {
      if (curStyle.style.photos) {
        setCurrentPic({url:curStyle.style.photos[0].url, name:`0`, style:curStyle.style.style_id});
      }
    } else if (currentPic.style && curStyle.style) {
      let photoMax = curStyle.style.photos.length - 1;
      if (currentPic.style !== curStyle.style.style_id) {
        if (curStyle.style.photos[index]) {
          setCurrentPic({url:curStyle.style.photos[index].url, name:`${index}`, style:curStyle.style.style_id});
        } else {
          setCurrentPic({url:curStyle.style.photos[photoMax].url, name:`${photoMax}`, style:curStyle.style.style_id});
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
    <div style={{"position":"relative", "overflow":"hidden"}}>
    {(() => {
      if (curStyle.style) {
        if (curStyle.style.photos) {
          console.log('1', curStyle.style.photos);
          return (
            <>
            <div style={{"position":"relative"}}>
              <Image current={currentPic ? currentPic : {url: '#', name: 'alt-name'}} context={curStyle} index={{index, setIndex}} currentPicture={{currentPic, setCurrentPic}}/>
              <div style={thumbnailContainerStyles}>
                <ThumbnailsContainer id="thumbnailScroll">
                  {/* maps out individual thumbnails into Thumbnails container */}
                  {curStyle.style ? curStyle.style.photos.map( (photo, index) => {
                    if (currentPic.name == index) {
                      return (
                        <ThumbnailsImageWrapper id="selected" key={index} onClick={ () => {
                          setCurrentPic({url:photo.url, name:`${index}`, style:curStyle.style.style_id});
                          setIndex(index);
                        }}>
                          <ThumbnailImage src={photo.thumbnail_url} alt={`${index || 'picture'}`} faded noClick/>
                        </ThumbnailsImageWrapper>
                      );
                    } else {
                      return (
                        <ThumbnailsImageWrapper key={index} onClick={ () => {
                          setCurrentPic({url:photo.url, name:`${index}`, style:curStyle.style.style_id});
                          setIndex(index);
                        }}>
                          <ThumbnailImage src={photo.thumbnail_url} alt={`${index || 'picture'}`} />
                        </ThumbnailsImageWrapper>
                      );
                    }
                  }) : null}

                  {/* returns 2 buttons with different states */}
                  {(() => {
                    if (index === 0) {
                      if (curStyle.style) {
                        if (curStyle.style.photos.length === 1) {
                          return (
                            <>
                              <ThumbnailsButtonUp type='button' name='button-up' disabled><FaAngleUp /></ThumbnailsButtonUp>
                              <ThumbnailsButtonDown type='button' name='button-down' disabled><FaAngleDown /></ThumbnailsButtonDown>
                            </>
                          );
                        } else {
                          return (
                            <>
                              <ThumbnailsButtonUp type='button' name='button-up' disabled><FaAngleUp /></ThumbnailsButtonUp>
                              <ThumbnailsButtonDown type='button' name='button-down'
                              onClick={() => {
                                setCurrentPic({url:curStyle.style.photos[index + 1].url, name:`${index + 1}`, style:curStyle.style.style_id});
                                setIndex(index + 1);
                              }}><FaAngleDown /></ThumbnailsButtonDown>
                            </>
                          );
                        }
                      }
                    } else if (curStyle.style) {
                      let photoMax = curStyle.style.photos.length - 1;
                      if (index === photoMax) {
                        return (
                          <>
                            <ThumbnailsButtonUp type='button' name='button-up'
                            onClick={() => {
                              setCurrentPic({url:curStyle.style.photos[index - 1].url, name:`${index - 1}`, style:curStyle.style.style_id});
                              setIndex(index - 1);
                            }}><FaAngleUp /></ThumbnailsButtonUp>
                            <ThumbnailsButtonDown type='button' name='button-down' disabled><FaAngleDown /></ThumbnailsButtonDown>
                          </>
                        );
                      } else {
                        return (
                          <>
                            <ThumbnailsButtonUp type='button' name='button-up'
                            onClick={() => {
                              setCurrentPic({url:curStyle.style.photos[index - 1].url, name:`${index - 1}`, style:curStyle.style.style_id});
                              setIndex(index - 1);
                            }}><FaAngleUp /></ThumbnailsButtonUp>
                            <ThumbnailsButtonDown type='button' name='button-down'
                            onClick={() => {
                              setCurrentPic({url:curStyle.style.photos[index + 1].url, name:`${index + 1}`, style:curStyle.style.style_id});
                              setIndex(index + 1);
                          }}><FaAngleDown /></ThumbnailsButtonDown>
                          </>
                        );
                      }
                    }
                  })()}
                </ThumbnailsContainer>
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