import { Avatar, Badge, Button, Typography } from "@mui/material";
import * as S from "./style";

interface ApplicantProps {
  id: number;
  name: string;
  image: string;
  temperature: number;
}

export const Applicant = ({ id, name, image, temperature }: ApplicantProps) => {
  return (
    <S.ApplicantContainer>
      <S.UserWrapper>
        <Badge badgeContent={temperature} color="primary">
          <Avatar src={image} />
        </Badge>
        <Typography>{name}</Typography>
      </S.UserWrapper>
      <S.ButtonWrapper>
        <Button variant="contained">수락</Button>
        <Button variant="contained">거절</Button>
      </S.ButtonWrapper>
    </S.ApplicantContainer>
  );
};
