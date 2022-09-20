import styled from "styled-components";

export default function ChatForm({ item }) {
  return (
    <>
      {item.id === "my" ? (
        <div style={{ textAlign: "right", padding: "5px" }}>
          <span
            style={{
              backgroundColor: "blue",
              color: "white",
              borderRadius: "5px",
              fontSize: "30px",
            }}
          >
            {item.text}
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
            {item.text}
          </span>
        </div>
      )}
    </>
  );
}
const Mychat = styled.div``;
