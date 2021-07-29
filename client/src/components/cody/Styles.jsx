import React, { useContext } from 'react';
import StylesContext from '../context/StylesContext.jsx';
import StyleContext from '../context/StyleContext.jsx';

const Styles = () => {
  const allStyles = useContext(StylesContext);
  const oneStyle = useContext(StyleContext);
  return (
  <div style={{
    "display": "grid",
    "gridTemplateColumns": "repeat(4, 1fr)",
    "gap": "20px",
    "width": "60%",
  }}>
    {(oneStyle.style && allStyles.styles.results) ? allStyles.styles.results.map( (style) => {
      console.log('reached');
      if (style.style_id === oneStyle.style.style_id) {
        return (<div style={{
          "border": "1px solid red",
          "borderRadius": "50px",
          "width": "100px",
          "height": "100px",
          "overflow": "hidden",
        }} key={style.style_id}><img style={{"width":"150%"}} src={style.photos[0].thumbnail_url} alt={style.name}/></div>)
      } else {
        return (<div style={{
          "borderRadius": "50px",
          "width": "100px",
          "height": "100px",
          "overflow": "hidden",
        }} onClick={
          () => {
            console.log('clicked');
            oneStyle.setStyle(style);
          }
        } key={style.style_id}><img style={{"width":"150%"}} src={style.photos[0].thumbnail_url} alt={style.name}/></div>);
      }
    }) : null}
  </div>
  );
};

export default Styles;