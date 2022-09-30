import styled from "styled-components";

export default function Modal({ visible, children }) {
  return (
    <div className="Modal">
      <ModalWrap visible={visible}></ModalWrap>
      <ModalBody visible={visible}>{children}</ModalBody>
    </div>
  );
}

const ModalWrap = styled.div`
  width: 100vw;
  height: 100vh;
  display: ${(props) => (props.visible ? "block" : "none")};
  position: fixed;
  top: 0;
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 99;
  cursor: pointer;
`;
const ModalBody = styled.div`
  display: ${(props) => (props.visible ? "block" : "none")};
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.5);
  background-color: white;
  border-radius: 10px;
  width: 100vw;
  height: 100vh;
  padding-left: 10px;
  z-index: 100;
`;
