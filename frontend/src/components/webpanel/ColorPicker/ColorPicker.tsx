import React, { useEffect, useState } from "react";
import reactCSS from "reactcss";
import { SketchPicker } from "react-color";

const ColorPicker = ({ setState, state, keyProp }: any) => {
  const [displayColorPicker, setDisplayColorPicker] = useState(false);
  const [color, setColor] = useState({
    r: "241",
    g: "112",
    b: "19",
    a: "1",
  });

  const handleClick = () => {
    setDisplayColorPicker(!displayColorPicker);
  };

  const handleClose = () => {
    setDisplayColorPicker(false);
  };

  const handleChange = (newColor: any) => {
    setColor(newColor.rgb);
  };

  const styles = reactCSS({
    default: {
      colorSwatch: {
        width: "250px",
        height: "14px",
        borderRadius: "2px",
        background: `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`,
      },
      swatch: {
        padding: "5px",
        background: "#fff",
        borderRadius: "1px",
        boxShadow: "0 0 0 1px rgba(0,0,0,.1)",
        display: "inline-block",
        cursor: "pointer",
      },
      popover: {
        position: "absolute",
        zIndex: "2",
      },
      cover: {
        position: "fixed",
        top: "0px",
        right: "0px",
        bottom: "0px",
        left: "0px",
      },
    },
  });

  useEffect(() => {
    setState(color, keyProp);
  }, [color]);

  useEffect(() => {
    setColor({
      r: state?.r,
      g: state?.g,
      b: state?.b,
      a: state?.a,
    });
  }, []);

  return (
    <div>
      <div style={styles.swatch} onClick={handleClick}>
        <div style={styles.colorSwatch} />
      </div>
      {displayColorPicker ? (
        // @ts-ignore
        <div style={styles.popover}>
          {/*     @ts-ignore */}
          <div style={styles.cover} onClick={handleClose} />
          {/*   @ts-ignore */}
          <SketchPicker color={color} onChange={handleChange} />
        </div>
      ) : null}
    </div>
  );
};

export default ColorPicker;
