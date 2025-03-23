import * as React from "react";
const Billboard = ({ children, height, width, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 579 450"
    width={width || "auto"}
    height={height || "90%"}
    {...props}>

    <path fill="#2D3850" d="M19 0h558v2h2v263h-2v5h-64v15h-2v7h2v2h17v3h3v7h5v2h-8v3h-4v2H236v5h-5v-2h-2v7h-8v2h-12v3h3v5h-10v7h-5v-2h-5v114h-51V336h-5v-5h-9v-5h-3v-3h-10v-4h-7v-3h-7v-5H75v5H61v-5H0v-17h10v-5h2v-4h3v-8h2v-7H7v-5H0V87h7v-7h3v5h2v-5h5V2h2V0Zm8 5v255h2v3h543V5H27ZM7 109v5h5v3h3v2h2v-7h-7v-3H7Zm0 27v5h5v2h3v3h2v-7h-7v-3H7Zm0 27v5h5v2h3v3h2v-8h-7v-2H7Zm0 27v5h5v2h3v2h2v-7h-7v-2H7Zm0 26v5h5v3h3v2h2v-7h-7v-3H7Zm0 27v12h10v-9h-7v-3H7Zm39 22v3h12v-3H46Zm27 0v3h10v-3H73Zm92 0v3h22v-3h-22Zm71 0v3h49v-3h-49Zm97 0v3h13v-3h-13Zm27 0v3h44v-3h-44Zm93 0v3h21v-3h-21Zm85 0v3h34v-3h-34Zm-511 5v2h2v3h5v2h5v3h2v-3h3v-2h5v-3h5v-2H27Zm34 0v2h2v13h-2v4h-3v3h3v2h27v-5h2v-4h5v-8h2v-7H61Zm46 0v2h2v3h5v2h5v3h3v-3h2v-2h5v-3h5v-2h-27Zm34 0v2h3v5h-3v12h-2v3h2v2h22v-7h2v-10h3v-7h-27Zm37 0v2h2v3h5v2h5v3h2v-3h3v-2h5v-3h4v-2h-26Zm34 0v15h-3v7h3v2h26v-7h3v-10h2v-7h-31Zm41 0v2h2v3h5v2h5v3h3v-3h2v-2h5v-3h5v-2h-27Zm34 0v2h3v5h-3v3h-2v7h-5v2h5v3h2v2h24v-5h3v-4h2v-8h3v-7h-32Zm41 0v2h3v3h5v2h5v3h2v-3h3v-2h4v-3h5v-2h-27Zm35 0v2h2v13h-2v4h-3v3h3v2h26v-5h3v-4h5v-8h2v-7h-36Zm46 0v2h2v3h5v2h5v3h2v-3h3v-2h5v-3h5v-2h-27Zm34 0v2h2v5h-2v12h-3v3h3v2h22v-7h2v-10h3v-7h-27Zm36 0v2h3v3h5v2h5v3h2v-3h2v-2h5v-3h5v-2h-27Zm-457 5v2h5v-2h-5Zm32 0v2h-5v3h9v-5h-4Zm48 0v5h7v-3h-2v-2h-5Zm32 0v2h2v-2h-2Zm39 0v5h7v-3h-2v-2h-5Zm75 0v2h5v-2h-5Zm32 0v2h2v-2h-2Zm44 0v2h4v-2h-4Zm31 0v2h-5v3h10v-5h-5Zm49 0v5h7v-3h-2v-2h-5Zm32 0v2h2v-2h-2Zm38 0v5h8v-3h-3v-2h-5Zm-447 2v3h2v-3h-2Zm173 0v3h4v-3h-4Zm75 0v3h5v-3h-5Zm53 0v3h3v-3h-3Zm173 0v3h5v-3h-5Zm-482 5v5h-2v5h5v-3h5v-2h2v-2h-5v-3h-5Zm81 0v5h-3v5h5v-3h5v-2h2v-2h-7v-3h-2Zm31 0v3h-2v2h5v2h2v-4h-2v-3h-3Zm117 0v3h-2v4h-3v3h5v-3h5v-2h2v-2h-2v-3h-5Zm73 0v5h-2v5h5v-3h4v-2h3v-2h-5v-3h-5Zm80 0v5h-2v5h5v-3h5v-2h2v-2h-7v-3h-3Zm32 0v3h-2v2h5v2h2v-4h-2v-3h-3Zm-384 3v2h5v2h2v-4h-7Zm70 0v2h-5v2h-5v3h-2v2h27v-2h-5v-3h-5v-2h-2v-2h-3Zm51 0v4h-2v3h5v-3h5v-2h2v-2h-10Zm30 0v2h4v-2h-4Zm65 0v2h-5v2h-5v3h-2v2h17v-7h-2v-2h-3Zm10 0v2h2v-2h-2Zm75 0v2h5v2h3v-4h-8Zm122 0v4h-2v3h4v-3h5v-2h3v-2h-10Zm29 0v2h5v-2h-5Zm-462 0v2h-5v2h-5v3h-2v2h27v-2h-5v-3h-5v-2h-3v-2h-2Zm151 0v2h-5v2h-5v3h-2v2h17v-7h-3v-2h-2Zm151 0v2h-5v2h-5v3h-3v2h27v-2h-5v-3h-4v-2h-3v-2h-2Zm80 0v2h-5v2h-5v3h-2v2h27v-2h-5v-3h-5v-2h-3v-2h-2Zm71 0v2h-5v2h-5v3h-3v2h17v-7h-2v-2h-2Zm-397 7v2h2v-2h-2Zm105 0v2h4v-2h-4Zm75 0v2h5v-2h-5Zm122 0v2h2v-2h-2Zm104 0v2h5v-2h-5Zm-482 5v7h5v-2h-2v-3h2v-2h-5Zm47 0v2h2v3h-2v2h12v-2h-3v-3h3v-2H66Zm80 0v2h2v3h-2v2h15v-2h-3v-3h3v-2h-15Zm92 0v2h3v3h-3v2h10v-2h-2v-3h2v-2h-10Zm95 0v2h3v3h-3v2h10v-2h-2v-3h2v-2h-10Zm71 0v2h2v3h-2v2h10v-2h-3v-3h3v-2h-10Zm53 0v2h3v3h-3v2h17v-2h-2v-3h2v-2h-17Zm71 5v2h2v-2h-2Zm-421 9v3h10v5h12v4h5v3h7v-10h-7v-5h-27Zm68 0v5h-14v7h26v-12h-12Zm22 0v12h7v-4h13v-5h12v-3h-32Z"></path>
    <path fill="#353A59" d="M173 331h14v119h-46v-56h15v-29h5v-10h7v-12h5v-12Z"></path>
    <path fill="#2A2E4D" d="M7 80h3v5h7v2h-2v8h2v10h-2v2h-3v5h-2v-3H7v5h5v3h3v5h2v9h-2v3h-3v5h-2v-3H7v5h5v2h3v5h2v10h-2v2h-3v5h-2v-2H7v5h5v2h3v5h2v10h-2v2h-3v5h-2v-2H7v5h5v2h3v5h2v10h-2v2h-3v5h-2v-3H7v5h5v3h3v5h2v9h-2v3h-3v5h-2v-3H7v12h10v5H0V87h7v-7Z"></path>
    <path fill="#2B304F" d="M100 309h7v5h10v5h12v4h5v3h7v2h46v3h-14v12h-5v12h-7v10h-5v29h-15v-58h-5v-5h-9v-5h-3v-3h-10v-4h-7v-3h-7v-7Z"></path>
    <path fill="#1D1E36" d="M187 309h10v14h7v-4h13v-5h12v7h-8v2h-12v3h3v5h-10v7h-5v-2h-5v114h-5V328h-46v-12h20v7h26v-14Z"></path>
    <path fill="#303140" d="M17 5h2v263h39v7h-4v2h-8v3h-5v-3h3v-2h5v-3h5v-2H7v-5H0v-5h17v-14h-5v-5h3v-3h2v-9h-2v-3h2v-7h-5v-5h3v-2h2v-10h-2v-3h2v-7h-5v-5h3v-2h2v-10h-2v-2h2v-8h-5v-5h3v-2h2v-10h-2v-2h2v-7h-5v-5h3v-3h2v-9h-2v-3h2v-7h-5v-5h3v-2h2V95h-2v-8h2v-2h-5v-5h5V5Z"></path>
    <path fill="#4C5275" d="M182 377h5v73h-31v-17h5v5h2v-15h5v15h5v-3h2v-2h-2v-19h5v-8h4v-29Z"></path>
    <path fill="#3E4466" d="M175 377h7v29h-4v8h-5v19h2v2h-2v3h-5v-15h-5v15h-2v-5h-5v-27h5v-19h4v-8h5v8h5v-10Z"></path>
    <path fill="#000B23" d="M248 297h85v2h3v3h-3v2h-85v-2h-2v-3h2v-2ZM161 297h77v2h3v3h-3v2h-77v-2h-3v-3h3v-2ZM78 297h68v2h2v3h-2v2H78v-2h-3v-3h3v-2ZM343 297h61v2h2v3h-2v2h-61v-2h-2v-3h2v-2ZM474 297h54v2h2v3h-2v2h-54v-2h-2v-3h2v-2ZM414 297h43v2h3v3h-3v2h-43v-2h-3v-3h3v-2ZM24 297h42v2h2v3h-2v2H24v-2h-2v-3h2v-2Z"></path>
    <path fill="#1E1F38" d="M58 265h15v5H61v2h2v13h-2v4h-5v-4h-7v2h-3v-2h-7v-5h7v-3h3v3h9v-15Z"></path>
    <path fill="#393F60" d="M324 272h7v3h5v2h5v3h2v-3h3v-2h4v-3h5v5h-7v10h7v5h-5v-3h-4v-2h-3v-2h-2v2h-5v2h-5v3h-7v-3h4v-2h3v-2h5v-5h-5v-3h-3v-2h-4v-3Z"></path>
    <path fill="#383E5F" d="M97 270h10v2h2v3h5v2h5v3h3v-3h2v-2h5v2h-2v3h-3v5h3v2h7v5h-5v-3h-5v-2h-2v-2h-3v2h-5v2h-5v3h-7v-3h5v-2h2v-2h5v-5h-5v-3h-2v-2h-5v-3h-5v-2Z"></path>
    <path fill="#2B304F" d="M217 314h12v7h-8v2h-12v3h3v5h-10v-3h-5v-5h7v-4h13v-5Z"></path>
    <path fill="#373C5D" d="M404 272h7v3h5v2h5v3h2v-3h3v-2h5v2h-3v3h-2v5h2v2h8v5h-5v-3h-5v-2h-3v-2h-2v2h-5v2h-5v3h-7v-3h5v-2h2v-2h5v-5h-5v-3h-2v-2h-5v-3Z"></path>
    <path fill="#373D5D" d="M168 270h10v2h2v3h5v2h5v3h2v-3h3v-2h5v2h-3v3h-2v5h2v2h3v2h-5v-2h-3v-2h-2v2h-5v2h-5v3h-7v-3h5v-2h2v-2h5v-5h-5v-3h-2v-2h-5v-3h-5v-2Z"></path>
    <path fill="#1D1E36" d="M399 272h5v8h12v5h-12v-3h-3v5h-2v5h-2v2h-8v-5h3v-4h5v-8h2v-5ZM319 272h5v5h4v3h8v5h-10v-3h-5v5h-2v7h-8v-5h3v-4h2v-8h3v-5ZM97 272h5v8h12v5h-12v-3h-2v5h-3v5h-2v2h-7v-5h2v-4h5v-8h2v-5ZM17 272h5v5h5v3h7v5H24v-3h-5v5h-2v7h-7v-5h2v-4h3v-8h2v-5ZM243 272h5v5h7v3h5v5h-7v-3h-5v3h-2v4h-3v5h-5v-7h3v-10h2v-5ZM168 272h5v8h12v5h-15v4h-2v5h-5v-7h2v-10h3v-5ZM470 272h4v8h13v5h-15v4h-2v5h-5v-7h2v-10h3v-5Z"></path>
    <path fill="#1E2039" d="M440 272h5v5h-2v12h-5v-4h-2v-3h-3v3h-2v2h-3v-2h-2v-5h2v-3h3v-2h5v2h2v-2h2v-3Z"></path>
    <path fill="#1E1F38" d="M139 272h5v5h-3v12h-5v-4h-2v-3h-3v3h-2v2h-2v-2h-3v-5h3v-3h2v-2h5v2h2v-2h3v-3Z"></path>
    <path fill="#3C4163" d="M470 270h9v2h3v3h5v2h5v10h-5v2h-5v3h-8v-3h5v-2h3v-2h5v-5h-5v-3h-3v-2h-5v-3h-4v-2Z"></path>
    <path fill="#3B4062" d="M243 270h10v2h2v3h5v2h5v10h-5v2h-5v3h-7v-3h5v-2h2v-2h5v-5h-5v-3h-2v-2h-5v-3h-5v-2Z"></path>
    <path fill="#3A4061" d="M17 270h10v2h2v3h5v2h5v10h-5v2h-5v3h-7v-3h5v-2h2v-2h5v-5h-5v-3h-2v-2h-5v-3h-5v-2Z"></path>
    <path fill="#1D1F37" d="M360 272h5v13h-2v4h-5v-4h-8v2h-2v-10h2v3h10v-8Z"></path>
    <path fill="#1E2039" d="M285 272h5v5h-3v3h-2v7h-5v2h-5v-2h-2v-10h2v3h5v-3h2v-2h3v-3Zm-10 13v2h2v-2h-2Z"></path>
    <path fill="#1D1E36" d="M100 309h7v5h10v5h12v2h-15v-2h-7v-3h-7v-7Z"></path>
    <path fill="#3E4466" d="M151 433h5v17h-10v-7h5v-10Z"></path>
    <path fill="#1D1E36" d="M10 226h2v5h3v2h2v5h-2v3h-3v5h-2v-5H7v-10h3v-5ZM10 199h2v5h3v3h2v5h-2v2h-3v5h-2v-5H7v-10h3v-5ZM10 119h2v5h3v2h2v5h-2v3h-3v5h-2v-5H7v-10h3v-5ZM10 92h2v5h3v3h2v5h-2v2h-3v5h-2v-5H7V97h3v-5ZM217 314h12v7h-8v2h-7v-4h3v-5ZM10 173h2v5h3v2h2v5h-2v2h-3v5h-2v-5H7v-9h3v-5ZM10 146h2v5h3v2h2v5h-2v2h-3v5h-2v-5H7v-9h3v-5ZM63 309h12v7H61v-5h2v-2Z"></path>
    <path fill="#373C5D" d="M280 270h5v5h-5v2h-7v3h-5v-3h2v-2h5v-3h5v-2Z"></path>
    <path fill="#373D5E" d="M54 270h4v5h-4v2h-8v3h-5v-3h3v-2h5v-3h5v-2Z"></path>
    <path fill="#2B304F" d="M265 280h8v7h2v2h-5v-2h-2v-2h-3v-5Z"></path>
    <path fill="#404668" d="M350 272h5v5h-7v3h-5v-3h3v-2h4v-3Z"></path>
    <path fill="#1D1E36" d="M229 309h7v7h-5v-2h-2v-5Z"></path>
    <path fill="#393F60" d="M423 285h5v2h8v5h-5v-3h-5v-2h-3v-2ZM122 285h5v2h7v5h-5v-3h-5v-2h-2v-2ZM41 285h5v2h8v5h-5v-3h-5v-2h-3v-2Z"></path>
    <path fill="#1D1E36" d="M474 265h15v3h-15v-3ZM187 265h15v3h-15v-3Z"></path>
    <path fill="#3F4567" d="M343 285h5v2h7v5h-5v-3h-4v-2h-3v-2Z"></path>
    <path fill="#1D1E36" d="M346 265h14v3h-14v-3Z"></path>
    <path fill="#3A4061" d="M134 270h5v5h-10v-3h5v-2Z"></path>
    <path fill="#404567" d="M324 272h7v3h2v5h-2v-3h-3v-2h-4v-3Z"></path>
    <path fill="#2B304F" d="M341 280h7v5h-7v-5ZM39 280h7v5h-7v-5Z"></path>
    <path fill="#3B4162" d="M436 270h4v5h-9v-3h5v-2Z"></path>
    <path fill="#2B304F" d="M61 311h2v3h12v2H61v-5Z"></path>
    <path fill="#383E5F" d="M501 289h10v3h-10v-3Z"></path>
    <path fill="#373C5D" d="M275 289h10v3h-10v-3Z"></path>
    <path fill="#303655" d="M484 275h3v2h5v3h-8v-5ZM333 275h3v2h5v3h-8v-5Z"></path>
    <path fill="#2B304F" d="M7 265h10v3H7v-3Z"></path>
    <path fill="#363C5C" d="M200 289h9v3h-9v-3Z"></path>
    <path fill="#34395A" d="M180 285h10v2h-5v2h-3v-2h-2v-2Z"></path>
    <path fill="#1D1E36" d="M496 289h5v5h-5v-5ZM270 289h5v5h-5v-5ZM195 289h5v5h-5v-5Z"></path>
    <path fill="#43496C" d="M487 280h5v5h-5v-5Z"></path>
    <path fill="#464C6F" d="M416 280h5v5h-5v-5Z"></path>
    <path fill="#43496C" d="M336 280h5v5h-5v-5Z"></path>
    <path fill="#464C6F" d="M260 280h5v5h-5v-5Z"></path>
    <path fill="#43496C" d="M185 280h5v5h-5v-5Z"></path>
    <path fill="#464C6F" d="M114 280h5v5h-5v-5Z"></path>
    <path fill="#43496C" d="M34 280h5v5h-5v-5Z"></path>
    <path fill="#444A6D" d="M496 275h5v2h-2v3h-5v-3h2v-2Z"></path>
    <path fill="#2F3454" d="M414 275h2v2h5v3h-7v-5Z"></path>
    <path fill="#444A6D" d="M270 275h5v2h-2v3h-5v-3h2v-2ZM124 275h5v2h-2v3h-5v-3h2v-2Z"></path>
    <path fill="#2F3454" d="M32 275h2v2h5v3h-7v-5Z"></path>
    <path fill="#454B6D" d="M426 275h5v2h-3v3h-5v-3h3v-2ZM195 275h5v2h-3v3h-5v-3h3v-2ZM44 275h5v2h-3v3h-5v-3h3v-2Z"></path>
    <path fill="#2B304F" d="M15 238h2v5h-2v3h-3v-5h3v-3ZM15 185h2v5h-2v2h-3v-5h3v-2ZM15 158h2v5h-2v2h-3v-5h3v-2ZM15 131h2v5h-2v3h-3v-5h3v-3Z"></path>
    <path fill="#1D1E36" d="M12 80h5v5h-5v-5ZM7 80h3v5h2v2H7v-7Z"></path>
    <path fill="#2B304F" d="M15 212h2v4h-2v3h-3v-5h3v-2ZM15 105h2v4h-2v3h-3v-5h3v-2Z"></path>
    <path fill="#454B6D" d="M494 285h5v2h2v2h-5v-2h-2v-2ZM268 285h5v2h2v2h-5v-2h-2v-2ZM122 285h5v2h2v2h-5v-2h-2v-2ZM423 285h5v2h3v2h-5v-2h-3v-2ZM192 285h5v2h3v2h-5v-2h-3v-2ZM41 285h5v2h3v2h-5v-2h-3v-2Z"></path>
    <path fill="#2B304F" d="M492 280h4v5h-4v-5Z"></path>
    <path fill="#474D70" d="M409 275h5v5h-3v-3h-2v-2ZM27 275h5v5h-3v-3h-2v-2Z"></path>
    <foreignObject
      x="25.000"
      y="5.000"
      width="547.000"
      height="258.000"
      style={{
        fill: 'rgb(216, 216, 216)',
        stroke: 'rgb(0, 0, 0)',
      }}
      id="content"
    >
      {children || "prueba"}
    </foreignObject>
  </svg>
);
export default Billboard;
