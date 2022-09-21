import styled from "styled-components";

export default function ChatForm({ item }) {
  return (
    <>
      {item.nickname === "asdf" ? (
        <div style={{ textAlign: "right", padding: "5px" }}>
          <span
            style={{
              backgroundColor: "blue",
              color: "white",
              borderRadius: "5px",
              fontSize: "30px",
            }}
          >
            {item.message}
          </span>
        </div>
      ) : (
        <div style={{ textAlign: "left", padding: "5px" }}>
          <span
            style={{
              backgroundColor: "orange",
              color: "white",
              borderRadius: "5px",
              fontSize: "30px",
            }}
          >
            {item.message}
          </span>
        </div>
      )}
    </>
  );
}
const Mychat = styled.div``;
