import React from "react";
import styled from "styled-components"
const DIV_Percent = styled.div`
@media (min-width:768px) {
  margin-bottom:80px;
  & h2 {
    text-align:center;
  }
}


@media (max-width:768px) {
  width:80%;
  margin: 0 auto;
  text-align: center
}
`
const DIV_Percent_Child = styled.div`
@media (min-width:768px) {
  width:60%;
  margin:0 auto;
  display:flex;
  align-items:center;
  justify-content: space-between;
  & div{
    width: 25%;
    text-align: center;
    vertical-align:baseline;
    border-bottom: 1px solid green;
    & p{
      font-size:24px;
    }
  }
}

@media (max-width:768px) {
  display:flex;
  align-items:center;
  justify-content: space-between;
  & div{
    width: 25%;
    text-align: center;
    vertical-align:baseline;
    border-bottom: 1px solid green;
  }
  & h2{
  
  }
  & h3 {
    font-size:12px;
  }
}
`

const PercentState = ({ proteinTotal, fatTotal, carbsTotal }) => {

  const amount = proteinTotal + fatTotal + carbsTotal;
  const percentProtein = Math.round((proteinTotal / amount) * 100);
  const percentFat = Math.round((proteinTotal / amount) * 100);
  const percentCarbs = Math.round((carbsTotal / amount) * 100);
  
  console.log(percentProtein)
  return (
    <DIV_Percent>
      <h2>PFCバランス</h2>
      <DIV_Percent_Child>
      <div className="">
        <h3>(P)</h3>
          <p>{percentProtein | 0}%</p>
      </div>
      <div className="">
        <h3>(F)</h3>
        <p>{percentFat | 0}%</p>
      </div>
      <div className="">
        <h3>(C)</h3>
        <p>{percentCarbs | 0}%</p>
      </div>
      </DIV_Percent_Child>
    </DIV_Percent>
  );
};

export default PercentState;
