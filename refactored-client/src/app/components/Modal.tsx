import { Dispatch, SetStateAction } from "react";


function Modal ({
  children, 
  setIsModalOpen,
  isModalOpen,
}:{
  children : React.ReactNode, 
  setIsModalOpen: Dispatch<SetStateAction<boolean>>,
  isModalOpen: boolean,
}) {
    return (
        <div 
        className="inset-0 transision-opacity fixed flex items-center jusify-center"
        onClick={() => setIsModalOpen(!isModalOpen)}
        >
          {children}
        </div>
    )
}
export default Modal