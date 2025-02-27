import React, { useEffect, useState } from 'react'
import Navbar from '../../components/Navbar/Navbar'
import NoteCard from '../../components/Cards/NoteCard'
import { useNavigate } from 'react-router-dom'
import {MdAdd} from "react-icons/md"
import AddEditNotes from "../Home/AddEditNotes"
import Modal from "react-modal";
import axiosInstance from '../../utils/axiosInstance'
import Toast from '../../components/ToastMessage/Toast'
import EmptyCard from '../../components/EmptyCard/EmptyCard'
// images import

import OopsNotesImg from '../../assets/images/OopsNotesImg.svg'

import bwclipboard from '../../assets/images/bwclipboard.svg'
import bwpencil from '../../assets/images/bwpencil.svg'

const Home = () => {
    const[openAddEditModal,setOpenAddEditModal]=useState({
      isShown:false,
      type:"add",
      data:null,
    });

    // 
    const [allNotes,setAllNotes]=useState([]);
    const [userInfo, setUserInfo] = useState({
      fullName:"dd"
    });

    const[isSearch,setIsSearch]=useState(false);
    // 
    const[showToastMsg,setShowToastMsg]=useState({
      isShown:false,
      message:"",
      type:"add"
    });


    const navigate = useNavigate();

    const handleEdit=(noteDetails)=>{
      setOpenAddEditModal({isShown:true,data:noteDetails,type:"edit"});
    };

    
    const showToastMessage=(message,type)=>{
      setShowToastMsg({
        isShown:true,
        message,
        type,
      });
    }

    const handleCloseToast=()=>{
      setShowToastMsg({
        isShown:false,
        message:"",
      })
    }

    // Get User Info
    const getUserInfo = async () => {
        try {
            const response = await axiosInstance.get("/get-user");
            if (response.data && response.data.user) {
                console.log(response.data.user);
                
                setUserInfo(response.data.user);
            }
        } catch (error) {
            if (error.response.status === 401) {
                localStorage.clear();
                navigate("/login");
            }
        }
    };
    // get all notes
    const getAllNotes=async ()=>
      {
        try{
          const response=await axiosInstance.get("/get-all-notes");

          console.log("printing all notes");
          console.log(response.data.notes);

          if(response.data && response.data.notes){
            setAllNotes(response.data.notes);
          }
        }catch(error){
          console.log("An unexpected error occured please try again...");
        };
      }

      // delete note
      const deleteNote=async (data)=>{
        const noteId=data._id;
        try{
          
          const response=await axiosInstance.delete("/delete-note/"+noteId);
          // response aala means successful execution
          // now get all nodes
          if(response.data && !response.data.error){
              showToastMessage("Note Deleted Successfully...",'delete')
              getAllNotes();
          }
      }catch(error){
          if(error.response && 
              error.response.data &&
              error.response.data.message
          ){
            console.log("An unexpected error occured please try again...");
          }
      }
      };
      // search for a note
      const onSearchNote=async (query)=>{
        try{
          const response=await axiosInstance.get("/search-notes/",{
            params:{query},
          });
          if(response.data && response.data.notes){
              setIsSearch(true);
              setAllNotes(response.data.notes);
          }
      }catch(error){
          console.log(error);
      }
      };
      // 
      const updateIsPinned=async(noteData)=>{
        const noteId=noteData._id;
        try{
            const response=await axiosInstance.put("/update-note-pinned/"+noteId,{
                isPinned:!noteData.isPinned,
            });
            if(response.data && response.data.note){
                showToastMessage("Note updated Successfully...")
                getAllNotes();
            }
        }catch(error){
          console.log(error);
        }
      }
      // 
      const handleClearSearch=()=>{
        setIsSearch(false);
        getAllNotes();
      }

    useEffect(()=>{
      getAllNotes();
      getUserInfo();//for that currently login user part
      return ()=>{
      }
    },[]);

  return (
    <>
      <Navbar userInfo={userInfo} onSearchNote={onSearchNote} handleClearSearch={handleClearSearch}></Navbar>
      <div className="container mx-auto">
      {allNotes.length > 0 ? 
        <div className='grid grid-cols-3 gap-4 mt-8'>
          {
            allNotes.map((item,index)=>(
            <NoteCard
              key={item._id}
              title={item.title}
              date={item.createdOn}
              content={item.content}
              tags={item.tags}
              isPinned={item.isPinned}
              onEdit={()=>handleEdit(item)}
              onDelete={()=>deleteNote(item)}
              onPinNote={()=>{updateIsPinned(item)}}
            ></NoteCard>
          ))
        }
      </div>:
          <EmptyCard imgSrc={isSearch?OopsNotesImg:bwpencil} message={isSearch? `Oops! No secrets found matching your search.`: `Start adding securly, your secrets ,passwords ,environment variables and secret tokens...
          `}></EmptyCard>
      }
      </div>
      <button className="w-16 h-16 flex items-center justify-center rounded-2xl bg-blue-500 hover:bg-blue-600 absolute right-10 bottom-10" 
      onClick={()=>{
        setOpenAddEditModal({isShown:true,type:"add",data:null});
      }}>
        <MdAdd className="text-[32px] text-white"></MdAdd>
      </button>

      <Modal
        isOpen={openAddEditModal.isShown}
        onRequestClose={() => {}}
        style={{
          overlay: {
            backgroundColor: "rgba(0,0,0,0.2)",
          },
        }}
        contentLabel=""
        className="w-[40%] max-h-3/4 bg-white rounded-md mx-auto mt-14 p-5 overflow-scroll"
      >
        <AddEditNotes
          type={openAddEditModal.type}
          noteData={openAddEditModal.data}
          onclose={()=>{
            setOpenAddEditModal({
              isShown:false,type:"add",data:null
            });
          }}
          getAllNotes={getAllNotes}
          showToastMessage={showToastMessage}
        ></AddEditNotes>
      </Modal>

      <Toast
        isShown={showToastMsg.isShown}
        message={showToastMsg.message}
        type={showToastMsg.type}
        onclose={handleCloseToast}
      ></Toast>

    </>
  )
}

export default Home
