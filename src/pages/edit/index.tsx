import React from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { saveProductAsync } from "../../features/product/productSlice";
import { MainSection } from "../view";

const Edit: React.FC = () => {
  const product = useAppSelector((state) => state.product.value);
  const dispatch = useAppDispatch();

  const [title, setTitle] = React.useState<string>(product.name);
  const [description, setDescription] = React.useState<string>(
    product.description
  );

  const [video, setVideo] = React.useState<string>(product.video);
  const handleCancel = () => {
    setTitle(product.name);
    setDescription(product.description);
    setVideo(product.video);
    window.history.back();
  };

  const handleSave = () => {
    const newProduct = {
      ...product,
      name: title,
      description: description,
      video: video,
    };
    dispatch(saveProductAsync(newProduct));
  };

  return (
    <div>
      <MainSection>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          type="text"
          className=" w-full input input-bordered input-accent "
        />
        <textarea
          className="textarea textarea-primary"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
        <div className="flex justify-end gap-1 mx-2s">
          <button className="btn btn-primary" onClick={handleSave}>
            Save
          </button>
          <button className="btn btn-active btn-ghost" onClick={handleCancel}>
            Cancel
          </button>
        </div>
        <div></div>
      </MainSection>
      <div className="card  bg-base-100 shadow-xl justify-center w-max-fit rounded-md border border-gray-300 m-6">
        <div className="card-body">
          <h2 className="card-title">Video</h2>
          <input
            type={"text"}
            value={video}
            onChange={(e) => setVideo(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default Edit;
