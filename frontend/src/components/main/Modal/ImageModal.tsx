"use client"
import {
  ModalContent,
  Modal, 
  ModalHeader, 
  ModalBody, 
  ModalFooter, 
  Button
} from "@nextui-org/react";

import { useEffect, useState } from "react";
import { MdCloudUpload, MdArrowBackIos, MdOutlineSearch, MdRefresh } from "react-icons/md";
 
export default function ImageModal({imgVisible, closeImgHandler, title, select, allImages, getAllImages}:any)
{
    const [selectedImage, setSelectedImage] = useState<any>('');
    // const [imgTitile, setImgTitle] = useState<Boolean>(true);
    // const [allImages, setAllImages] = useState<any>([]);

    // useEffect(() => {
    //   getAllImages();
    // }, [allImages]);

    const handleFileUpload = (e:any) => {
      if(e.target.files.length > 12){
        alert('You can only upload 12 images at a time');
        return;
      }
      if (e.target.files && e.target.files.length > 0) {
        let arr = [];
        for (const file of e.target.files) {
          arr.push({
            'src':URL.createObjectURL(file),
            'name':file.name,
            'size':file.size,
          });
        }
        setSelectedImage(arr);
      }
    }
    const resetSelectedImage = (e:any) => {
      setSelectedImage('');
      e.currentTarget.closest('.modal-content').querySelector('input[type="file"]').value = null;
    }

    // const getAllImages = async () => {
    //   const request = await fetch(`${process.env.NEXT_PUBLIC_BACK_END_URL}/api/v1/webpanel/media/${select.images.getPath}`,{
    //     headers: {
    //       authorization: `Bearer ${localStorage.getItem('accessToken')}`,
    //     },
    //   });
    //   const response = await request.json();
    //   if(response) setAllImages(response.data);
    // }

    const formatFileSize = function (bytes:any) {
        const sufixes = ['B', 'kB', 'MB', 'GB', 'TB'];
        const i = Math.floor(Math.log(bytes) / Math.log(1024));
        return `${(bytes / Math.pow(1024, i)).toFixed(2)} ${sufixes[i]}`;
    };



    return <>
      <Modal 
          id="imgModal"
          isOpen={imgVisible} 
          onOpenChange={closeImgHandler} 
          backdrop="blur"
          className={`rounded-lg bg-white border border-slate-300 items-start z-[2000]`}
          style={{width:"800px",maxWidth:'100vw'}}
          closeButton
        >
        <ModalContent className="modal-content">
          {(onClose) => 
            <>
              <ModalHeader className="flex flex-col gap-1 w-full py-3 text-center">{title}</ModalHeader>
              <ModalBody className="w-full">
                <div className="tabs">
                  {select.imgTab == 'current' && 
                    <>
                      <div className="image-tools pb-2">
                        <div className="grid grid-cols-4 gap-4">
                          <div>
                            <div className="rounded p-1 border border-slate-300">
                              {select.preview && <div className="h-30 w-full relative flex align-middle content-center items-center overflow-hidden w-full"><img className="preview w-full" alt="preview" src={select.preview}/></div> }
                              {!select.preview && <div className="h-30 w-full relative flex justify-center items-center">Prview</div>}
                            </div>
                          </div>
                          <div className="col-span-4">
                            <div className="flex">
                              <input
                                type="text"
                                name="url"
                                placeholder={"Image URL"}
                                onKeyUp={select.previewImg}
                                onChange={select.previewImg}
                                value={select.preview}
                                className="bg-white w-full rounded-s border-[1.5px] border-stroke bg-transparent p-1 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                              />
                              <Button 
                                  className="inline-flex items-center bg-transparent hover:bg-slate-200 border-[1.5px] border-l-0 border-stroke rounded-e-lg dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary" 
                                  onClick={()=>{select.setImgTab('select');getAllImages()}}><MdOutlineSearch />
                              </Button>
                            </div>
                          </div>
                        </div>
                        <div className="grid grid-cols-1 gap-4 mt-2">
                          <div>
                            <label className="font-medium text-slate-900 dark:text-slate-30" htmlFor="label">alt:</label>
                            <input
                              id="label"
                              type="text"
                              placeholder={"alt"}
                              onKeyUp={(e)=>select.setAlt(e.currentTarget.value)}
                              onChange={(e)=>select.setAlt(e.currentTarget.value)}
                              value={select.alt}
                              className="bg-white w-full rounded border-[1.5px] border-stroke bg-transparent p-1 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                            />
                          </div>
                        </div>
                        <div className="grid grid-cols-12 gap-4 mt-2">
                          <div className="col-span-8">
                          <label className="font-medium text-slate-900 dark:text-slate-30" htmlFor="className">class name:</label>
                            <input
                              id="className"
                              type="text"
                              placeholder={"class name"}
                              onKeyUp={(e)=>select.setClassName(e.currentTarget.value)}
                              onChange={(e)=>select.setClassName(e.currentTarget.value)}
                              value={select.className}
                              className="bg-white w-full rounded border-[1.5px] border-stroke bg-transparent p-1 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                            />
                          </div>
                          <div className="col-span-2">
                            <label className="font-medium text-slate-900 dark:text-slate-30" htmlFor="width">width:</label>
                            <input
                              id="width"
                              type="text"
                              placeholder={"width"}
                              onKeyUp={(e)=>select.setWidth(e.currentTarget.value)}
                              onChange={(e)=>select.setWidth(e.currentTarget.value)}
                              value={select.width}
                              className="bg-white w-full rounded border-[1.5px] border-stroke bg-transparent p-1 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                            />
                          </div>
                          <div className="col-span-2">
                            <label className="font-medium text-slate-900 dark:text-slate-30" htmlFor="height">height:</label>
                            <input
                              id="height"
                              type="text"
                              placeholder={"height"}
                              onKeyUp={(e)=>select.setHeight(e.currentTarget.value)}
                              onChange={(e)=>select.setHeight(e.currentTarget.value)}
                              value={select.height}
                              className="bg-white w-full rounded border-[1.5px] border-stroke bg-transparent p-1 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                            />
                          </div>
                        </div>
                        <div className="grid grid-cols-4 gap-4">
                          <div className="col-span-2 mt-2">
                          <label className="font-medium text-slate-900 dark:text-slate-30" htmlFor="height">Image label:</label>
                            <input
                              type="text"
                              placeholder={"Image label"}
                              onKeyUp={(e)=>select.setTitle(e.currentTarget.value)}
                              onChange={(e)=>select.setTitle(e.currentTarget.value)}
                              value={select.title ? select.title : ""}
                              className="bg-white w-full rounded-s border-[1.5px] border-stroke bg-transparent p-1 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                            />
                          </div>
                        </div>
                      </div>
                    </>
                  }
                  {select.imgTab == 'select' &&
                    <>
                      <div className="image-tools flex justify-between border-b border-slate-200 pb-2">
                        <div className="tabs justify-start ">
                          <Button 
                              className="bg-slate-50 hover:bg-slate-200 rounded-lg px-3 h-7" 
                              onClick={()=>select.setImgTab('upload')}><MdCloudUpload/>Upload
                          </Button>
                          <Button 
                            className="bg-slate-50 hover:bg-slate-200 rounded-lg px-3 h-7"
                            onClick={select.getAllImages}
                          ><MdRefresh className="text-lg"/> Refresh</Button>
                        </div>
                        <div className="actions justify-end">
                          <Button 
                            className={`${select.imgCount>0?`bg-slate-400 text-white hover:bg-slate-600`:`bg-slate-100`} rounded-lg px-3 h-7`} 
                            disabled={select.imgCount>0?false:true}
                            onClick={()=>{
                              select.imgUnselect();
                              select.setImgCount(0);
                            }}
                          >Unselect</Button>
                          <Button 
                            className={`${select.imgCount>0?`bg-rose-400 text-white hover:bg-red`:`bg-slate-100`} rounded-lg px-3 h-7 ml-2`} 
                            disabled={select.imgCount>0?false:true}
                            onClick={select.removeImage}
                          >
                            Delete
                          </Button>
                        </div>
                      </div>
                      <div className="images-gallery p-1" style={{height:'500px',maxHeight:'500px',overflowY:'auto'}}>
                        <div className="grid grid-cols-12 gap-4">
                          {Array.from(allImages).map((v:any, k:any) =>
                            <div 
                              key={k} 
                              className="col-span-2 rounded overflow-hidden bg-slate-100 cursor-pointer transition-all duration-300 ease-in-out"
                              onClick={(e)=>select.Select(e)}
                            >
                              <div className="h-full relative flex align-middle content-center items-center min-h-24">
                                <img src={`${v}`} style={{height:'min-content'}} />
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </>
                  }
                  {select.imgTab == 'upload' &&
                    <>
                      <div className="image-tools flex justify-between pb-2">
                        <Button className="bg-slate-50 hover:bg-slate-200 rounded-lg px-3 h-7" onClick={()=>select.setImgTab('select')}><MdArrowBackIos/> Back</Button>
                      </div>
                      <div className="images-upload">
                        <div className="input-group h-full border-2 border-dashed border-slate-200 rounded-lg" style={{height:'500px',maxHeight:'500px',overflowY:'auto'}}>
                          <label 
                            className={`w-full ${selectedImage.length < 1 ?`h-full `:`h-10 `}flex items-center justify-center font-bold`} 
                            htmlFor="file_input"
                          >Select File (Max. 12 files)</label>
                          <input 
                            onChange={handleFileUpload}
                            className="hidden" 
                            id="file_input" 
                            type="file"
                            accept="image/*"
                            multiple={true}
                          />
                          {selectedImage && 
                            <div className="grid grid-cols-12 gap-4 mx-2">
                              {Array.from(selectedImage).map((v:any,k:any) => <div className="relative col-span-6 p-1 bg-slate-100 border border-slate-200 rounded-lg img-selected" key={k}>
                                <div className="flex">
                                  <div className="min-w-28 w-28 minh-28 h-28 bg-white flex items-center justify-center rounded-lg overflow-hidden">
                                    <img
                                      src={v.src}
                                      className="h-auto object-cover"
                                      alt="Thumb"
                                      width="150"
                                    />
                                  </div>
                                  <div className="p-2 text-sm overflow-hidden">
                                    <div className="font-bold text-ellipsis overflow-hidden">{v.name}</div>
                                    <p className="mt-1">Size: {formatFileSize(v.size)}</p>
                                  </div>
                                </div>
                              </div>
                              )}
                            </div>
                          }
                        </div>
                      </div>
                    </>
                  }
                </div>
              </ModalBody>
              <ModalFooter className="w-full">
              {select.imgTab == 'current' &&
                  <>
                    <Button 
                      onClick={(e)=>select.insertImg(e)}
                      // onPress={onClose}
                      className={`bg-blue-200 text-white font-bold hover:bg-blue-700 focus:ring focus:ring-blue-300 rounded-lg`}>
                      Save
                    </Button>
                    <Button 
                      variant="light" 
                      className="text-slate-400 font-bold rounded-lg hover:text-rose-500 hover:bg-rose-100 focus:ring focus:ring-rose-300" 
                      onPress={onClose}>
                      Cancel
                    </Button>
                  </>
                }
                {select.imgTab == 'select' &&
                  <>
                    <Button 
                      onClick={(e)=>select.copyToSelect(e)}
                      // onPress={onClose}
                      className={`bg-blue-200 text-white font-bold hover:bg-blue-700 focus:ring focus:ring-blue-300 rounded-lg`}>
                      Select
                    </Button>
                    <Button 
                      variant="light" 
                      className="text-slate-400 font-bold rounded-lg hover:text-rose-500 hover:bg-rose-100 focus:ring focus:ring-rose-300" 
                      onClick={()=>{onClose; select.setImgTab('current')}}>
                      Cancel
                    </Button>
                  </>
                }
                {select.imgTab == 'upload' && <>
                    { selectedImage
                      ? <Button 
                          className="bg-rose-400 hover:bg-red text-white font-bold rounded-lg"
                          onClick={(e)=>resetSelectedImage(e)}
                        >
                          <MdRefresh className="text-lg"/>Reset
                        </Button>
                      : ''
                    }
                    <Button 
                      onClick={(e)=>select.upload(e)}
                      // onPress={onClose}
                      className={`${selectedImage?`bg-blue-500`:`bg-blue-200`} text-white font-bold hover:bg-blue-700 focus:ring focus:ring-blue-300 rounded-lg`}>
                     {selectedImage.length>0?`(${selectedImage.length})`:``} Upload
                    </Button>
                    <Button 
                      variant="light" 
                      className="text-slate-400 font-bold rounded-lg hover:text-rose-500 hover:bg-rose-100 focus:ring focus:ring-rose-300" 
                      onClick={()=>{onClose; select.setImgTab('current')}}>
                      Cancel
                    </Button>
                  </>
                }
              </ModalFooter>
            </>
          }
        </ModalContent>
      </Modal>
    </>
}