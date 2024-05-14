import Gallery from "./gallery";
import RenderProps from "./RenderProps";
import FileAttachmentSectionV2 from "./FileAttachmentSectionV2";

const FinalFileAttachmentSection = () => {
  return (
    <div>
      <FileAttachmentSectionV2 />
      <Gallery />
      <FileAttachmentSectionV2 />
    </div>
  );
};

export default FinalFileAttachmentSection;
