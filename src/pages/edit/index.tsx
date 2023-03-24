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

  const handleCancel = () => {
    setTitle(product.name);
    setDescription(product.description);
  };

  const handleSave = () => {
    const newProduct = {
      ...product,
      name: title,
      description: description,
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
      </MainSection>
    </div>
  );
};

export default Edit;
