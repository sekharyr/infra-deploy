"use client";
import SlidingPane from "react-sliding-pane";
import "react-sliding-pane/dist/react-sliding-pane.css";
import { useState } from "react";
import "../css/SliderWindow.css";

const SliderWindow = (props) => {
  const [isPaneOpen, setIsPaneOpen] = useState(props.isPaneOpen);
  const onClickDetailsSlide = () => {
    props.closeDetailsSlide();
  };
  return (
    <SlidingPane
      className="sliderWindow"
      overlayClassName="sliderOverlay"
      isOpen={isPaneOpen}
      title="Title"
      subtitle="Optional subtitle."
      onRequestClose={() => {
        // triggered on "<" on left top click or on outside click
        setIsPaneOpen(!isPaneOpen);
        onClickDetailsSlide();
      }}
    >
      {props.content}
    </SlidingPane>
  );
};

export default SliderWindow;
