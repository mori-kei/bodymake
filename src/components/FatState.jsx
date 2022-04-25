import React from "react";
import styled from "styled-components";
const DivTotalInner = styled.div`
@media (min-width:768px) {
  box-sizing: border-box;
  padding: 15px 25px;
  width: 230px;
  & div {
    & h2 {
      color: #333;
    }
    & div {
      & p {
        font-size: 32px;
        color: #333;
      }
    }
  }
}
@media (max-width: 768px) {
    & div{
      width:80%;
      margin: 0 auto;
      text-align: center;
      border-bottom: 1px solid #eee;
      & h2{
        font-size:16px;
        margin-bottom: 0;
       
      }
      &div{
        
        
      }
    }
  }
`;
const FatState = ({ fatTotal }) => {
  return (
    <>
      <DivTotalInner>
        <div className="">
          <h2>脂質</h2>
          <div className="">
            <p>{Number(fatTotal).toLocaleString()}g</p>
          </div>
        </div>
      </DivTotalInner>
    </>
  );
};

export default FatState;
