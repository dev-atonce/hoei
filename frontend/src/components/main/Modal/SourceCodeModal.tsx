"use client"
import {
  ModalContent,
  Modal, 
  ModalHeader, 
  ModalBody, 
  ModalFooter, 
  Button
} from "@nextui-org/react";

const SourceCodeModal = ({title,codeVisible,closeCodeHandler,sourceCode,saveSourceCode}:any) => {
    return <>
      <Modal 
          id="imgModal"
          isOpen={codeVisible} 
          onOpenChange={closeCodeHandler} 
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
                <textarea 
                    className="block p-2.5 w-full text-sm text-slate-900 bg-slate-50 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 ring-inset focus:ring-blue-500 focus:border-blue-500" 
                    rows={30}
                    placeholder="Write your thoughts here..."
                    defaultValue={sourceCode}
                ></textarea>
              </ModalBody>
              <ModalFooter className="w-full flex justify-end">
                <Button 
                      onClick={(e)=>{saveSourceCode(e.currentTarget)}}
                      // onPress={onClose}
                      className={`bg-blue-500 text-white font-bold hover:bg-blue-700 focus:ring focus:ring-blue-300 rounded-lg`}>
                      Save
                </Button>
                <Button 
                      variant="light" 
                      className="text-slate-400 font-bold rounded-lg hover:text-rose-500 hover:bg-rose-100 focus:ring focus:ring-rose-300" 
                      onPress={onClose}>
                      Cancel
                </Button>
              </ModalFooter>
            </>
            }
        </ModalContent>
    </Modal>
    </>
}
export default SourceCodeModal;