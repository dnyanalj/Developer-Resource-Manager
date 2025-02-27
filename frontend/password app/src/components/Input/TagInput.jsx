import React,{useState} from "react";
import { MdAdd, MdClose } from "react-icons/md";

const TagInput = ({ tags, setTags }) => {

  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const addNewTag = () => {
    if (inputValue.trim() !== "") { 
      setTags([...tags, inputValue.trim()]);
      setInputValue("");
    }
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      addNewTag();
    }
  };
  const handleRemoveTag = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };  

  return (
    <div>
     {tags?.length > 0 && 
        <div className="flex items-center gap-2 flex-wrap mt-2">
        {tags.map((tag, index) => (
          <span
            key={index}
            className="flex items-center gap-2 tet-sm text-slate-900 bg-slate-100 px-3 py-1 rounded"
          >
            #{tag}
            <button 
            onClick={() => handleRemoveTag(tag)}
            className="transition-transform transform hover:scale-110 active:scale-90"
            >
            <MdClose className="text-black-500 hover:text-grey-700 cursor-pointer transition-colors duration-200" />
            </button>
          </span>
        ))}
        </div>}

      <div className="flex items-center gap-4 mt-3">
        <input
          type="text"
          className="border p-2 rounded-md w-full
          text-sm bg-transparent px-3 py-2 online-none"
          placeholder="Add tags"
          value={inputValue} 
          onChange={handleInputChange} 
          onKeyDown={handleKeyDown}
        />
        <button
          className="bg-blue-500 p-2 rounded-md hover:bg-blue-600 text-white"
          onClick={() => addNewTag()}
        >
          <MdAdd className="text-2xl" />
        </button>
      </div>
    </div>
  );
};

export default TagInput;
