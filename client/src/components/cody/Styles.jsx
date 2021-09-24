import React, { useContext } from 'react';
import StylesContext from '../context/StylesContext.jsx';
import StyleContext from '../context/StyleContext.jsx';
import DarkModeContext from '../context/DarkModeContext.jsx';
import { StylesImageWrapper, ThumbnailImage, StylesGrid } from './StyleHelpers.js';

const Styles = () => {
  const allStyles = useContext(StylesContext);
  const oneStyle = useContext(StyleContext);
  const { darkMode } = useContext(DarkModeContext);
  return (
  <StylesGrid>
    {(oneStyle.style && allStyles.styles.results) ? allStyles.styles.results.map( (style) => {
      if (style.style_id === oneStyle.style.style_id) {
        return (
          <StylesImageWrapper key={style.style_id} dark={darkMode}
          >
            <ThumbnailImage src={style.photos[0].thumbnail_url} alt={style.name} noClick />
          </StylesImageWrapper>
        );
      } else {
        return (<StylesImageWrapper onClick={
          () => oneStyle.setStyle(style)
          } key={style.style_id} dark={darkMode}
          >
            <ThumbnailImage src={style.photos[0].thumbnail_url} alt={style.name} faded />
          </StylesImageWrapper>);
      }
    }) : null}
  </StylesGrid>
  );
};

export default Styles;