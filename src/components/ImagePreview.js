import React from "react";
import styled from "styled-components";

const Image = styled.img`
  margin: 2em auto;
  width: 100%;
`;

const ImagePreview = ({ src }) => (src ? <Image src={src} /> : null);

export default ImagePreview;
