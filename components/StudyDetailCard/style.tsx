import styled from "@emotion/styled";
import { Card } from "@mui/material";
import Button from "@mui/material/Button";

export const StudyDetailCard = styled(Card)`
  display: flex;
  padding: 1rem;
  flex-direction: row;
  position: relative;
  @media (max-width: 512px) {
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;

export const ImageWrapper = styled.div`
  flex-shrink: 0;
  & span {
    margin: 0;
    padding: 0;
    display: inline !important;
  }
  @media (max-width: 512px) {
    box-shadow: -12px 17px 16px 3px rgba(0, 0, 0, 0.1),
      13px 0px 15px 4px rgba(0, 0, 0, 0.1);
  }
`;

export const StudyInfoContainer = styled.div`
  width: 100%;
  padding: 1rem;
  overflow: hidden;
`;

interface ResponsiveTextProps {
  fontSize?: number;
}

export const ResponsiveText = styled.div<ResponsiveTextProps>`
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  padding: 0.5rem;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: ${({ fontSize }) => `${fontSize}rem`};
`;
