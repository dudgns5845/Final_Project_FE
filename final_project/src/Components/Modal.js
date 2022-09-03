import styled from "styled-components";

const Modal = ({ visible, close, children }) => {
  return (
    <>
      <ModalWrap visible={visible} onClick={close}></ModalWrap>
      <ModalBody visible={visible}>{children}</ModalBody>
    </>
  );
};
export default Modal;

const ModalWrap = styled.div`
width:100%;
height:100%;
display: $((props))=>(props.visible ? 'block' :'none')};
position: fixed;
background-color:gray;
`;
const ModalBody = styled.div`
  display: ${(props) => (props.visible ? "block" : "none")};
  position: fixed;
  top: 50%;
  left: 50%;
  background-color: white;
  width: 500px;
  height: 500px;
`;
