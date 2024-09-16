"use client"
import {
  ModalContent,
  Modal, 
  ModalHeader, 
  ModalBody, 
  ModalFooter, 
  Button
} from "@nextui-org/react";

export default function ModalDialog({visible, closeHandler, title, select}:any) {
    const rows = [
      [{'col':'col-span-12','content':'text'}],
      [{'col':'col-span-4','content':'image'},{"col":"col-span-8","content":"text"}],
      [{'col':'col-span-4','content':'image'},{"col":"col-span-4","content":"image"},{"col":"col-span-4","content":"image"}],
      [{'col':'col-span-3','content':'image'},{"col":"col-span-3","content":"image"},{"col":"col-span-3","content":"image"},{"col":"col-span-3","content":"image"}],
      [{'col':'col-span-3','content':'image'},{"col":"col-span-3","content":"image"},{"col":"col-span-6","content":"text"}],
      [{'col':'col-span-8','content':'text'},{"col":"col-span-4","content":"image"}],
      [{'col':'col-span-6','content':'text'},{"col":"col-span-6","content":"image"}],
      [{'col':'col-span-6','content':'image'},{"col":"col-span-6","content":"text"}],
      [{'col':'col-span-12','content':'image'}],
  ];
  return (
    <>
      {/* <Button onPress={onOpen}>Open Modal</Button> */}
      <Modal 
          isOpen={visible} 
          onOpenChange={closeHandler} 
          backdrop="blur"
          className={`rounded-lg bg-white border border-slate-300`}
          style={{width:"600px",maxWidth:'100vw', zIndex:3000}}
          closeButton
        >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">{title}</ModalHeader>
              <ModalBody>
                <div className="bg-stripes-pink p-2" style={{
                  borderRadius: '10px',
                  backgroundColor: '#9772f41a',
                  backgroundImage: 'linear-gradient(135deg, #6148ec80 10%, #0000 0, #0000 50%, #6148ec80 0, #6148ec80 60%, #0000 0, #0000',
                  backgroundSize: '7.07px 7.07px'
                }}>
                  {Array.from(rows).map((v,k) => 
                    <div key={k} className={`grid grid-cols-1 md:grid-cols-12 gap-4 ${k>0?`mt-4`:``} transition-all cursor-pointer rounded-lg hover:ring hover:ring-indigo-500`} 
                      data-content={JSON.stringify(v)} 
                      onClick={select.handleSetSelect}>
                      {Array.from(v).map((v2, k2) =>
                         <span 
                            key={k2} 
                            className={`${v2.col} border-dashed bg-indigo-300 flex justify-center rounded-lg text-slate-600 font-bold p-2`} 
                            data-content={v2.content}
                          >{v2.content}</span>
                      )}
                    </div>
                  )}
                </div>
              </ModalBody>
              <ModalFooter>
                <Button 
                  data-id={select.EditorId}
                  onClick={select.createRow}
                  // onPress={onClose}
                  className={`${select.row?`bg-blue-500`:`bg-blue-200`} text-white font-bold hover:bg-blue-700 focus:ring focus:ring-blue-300 rounded-lg`}>
                  Append
                </Button>
                <Button 
                  variant="light" 
                  className="text-slate-400 font-bold rounded-lg hover:text-rose-500 hover:bg-rose-100 focus:ring focus:ring-rose-300" 
                  onPress={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
