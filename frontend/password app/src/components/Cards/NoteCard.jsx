import React from "react";
import { MdOutlinePushPin, MdCreate, MdDelete } from "react-icons/md";
import moment from "moment";

const NoteCard = ({
  title,
  date,
  content,
  tags,
  isPinned,
  onEdit,
  onDelete,
  onPinNote,
}) => {
  return (
    <div className="border rounded p-5 ml-4 mr-4 mb-3 bg-white hover:shadow-xl transition-all ease-in-out">
      <div className="flex items-center justify-between">
        <div>
          <h6 className="text-sm font-me/dium">{title}</h6>
          <span className="text-xs text-slate-500">{moment(date).format("Do MMMM YYYY")}</span>
        </div>
        <MdOutlinePushPin
          className={`icon-btn ${isPinned ? "text-slate-600" : "text-slate-300"}`}
          onClick={onPinNote}
        />
      </div>
      <p className="text-xs text-slate-600 mt-3">{content?.slice(0, 60)}</p>

      <div className="flex items-center justify-between mt-3">
        <div className="text-xs text-slate-500">{tags.map((item)=>`#${item}`)}</div>

        <div className="flex items-center gap-3">
          <MdCreate
            className="icon-btn hover:text-green-600 cursor-pointer"
            onClick={onEdit}
          />
          <MdDelete
            className="icon-btn hover:text-red-500 cursor-pointer"
            onClick={onDelete}
          />
        </div>
      </div>
    </div>
  );
};

export default NoteCard;
