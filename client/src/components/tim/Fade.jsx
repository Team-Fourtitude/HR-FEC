import React, { useEffect, useState } from "react";
import { Faded } from './StyleHelpers.jsx';

const Fade = ({ show, children }) => {
  const [shouldRender, setRender] = useState(show);

  useEffect(() => {
    if (show) setRender(true);
  }, [show]);

  const onAnimationEnd = () => {
    if (!show) setRender(false);
  };

  return (
    shouldRender && (
      <Faded
        show={show}
        onAnimationEnd={onAnimationEnd}
      >
        {children}
      </Faded>
    )
  );
};

export default Fade;