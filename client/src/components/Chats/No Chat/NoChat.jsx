import styled from "@emotion/styled";
import { Box, Typography, IconButton } from "@mui/material";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";

export default function NoChat() {
  const NoChatContainer = styled(Box)`
    height: 100%;
    width: 99.9%;
    position: relative;
    border-left: 1px solid #cdcdcd;
    background-color: #efefef;
  `;

  const ImageArm = styled("img")`
    height: 220px;
    width: 170px;
    position: absolute;
    bottom: 0;
    right: 0;
    margin-top: auto;
    margin-left: auto;
    transition: 0.1s ease-in;
    &:hover {
      height: 240px;
      width: 190px;
      right: 10px;
    }
  `;

  const ImageHulk = styled("img")`
    height: 280px;
    width: 180px;
    position: absolute;
    position: absolute;
    bottom: 0;
    right: 15%;
    transition: 0.1s ease-in;
    &:hover {
      height: 300px;
      width: 190px;
      right: 12%;
    }
  `;

  const ArmContainer = styled(Box)`
    height: 100%;
  `;

  const TitleContainer = styled(Box)`
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -45%);
  `;

  const VibeImage = styled("img")`
    width: 450px;
    height: 280px;
  `;

  const Title = styled(Typography)`
    text-align: center;
    margin: 2rem 0 0 0;
    font-size: 4rem;
    font-family: "Shadows Into Light", cursive;
    color: #32349c;
  `;

  const AnnotationContainer = styled(Box)`
    position: absolute;
    bottom: 10px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    align-items: center;
    gap: 8px;
    color: #32349c;
    font-size: 0.9rem;
    font-weight: bold;
    transition: 0.2s ease-in;
  
  `;

  const TextContainer = styled(Box)`
    display: flex;
    align-items: center;
    gap: 4px;
  `;

  const ByText = styled(Typography)`
    font-size: 0.9rem;
    font-weight: bold;
    font-family: 'Quicksand', sans-serif;
  `;

  const NameText = styled(Typography)`
    font-size: 0.9rem;
    font-weight: bold;
    color: #32349c;
    cursor: pointer;
    transition: 0.2s ease-in;
    font-family: 'Quicksand', sans-serif;
   
  `;

  const LinkedInButton = styled(IconButton)`
    background-color: transparent;
    color: #32349c;
    &:hover {
      background-color: #c7d1ff;
    }
  `;

  const GitHubButton = styled(IconButton)`
    background-color: transparent;
    color: #32349c;
    &:hover {
      background-color: #c7d1ff;
    }
  `;

  const openLinkedInProfile = () => {
    window.open("https://www.linkedin.com/in/anubhav-gupta-92410a244/", "_blank");
  };

  const openGitHubProfile = () => {
    window.open("https://github.com/Anubhav6205", "_blank");
  };

  return (
    <NoChatContainer>
      <TitleContainer>
        <VibeImage src="../../public/vibe.png" alt="Vibe" />
        <Title>Vibe</Title>
      </TitleContainer>
      <ArmContainer>
        <ImageArm src="../../arm.png" alt="Arm" />
        <ImageHulk src="../../arm2.png" alt="Hulk" />
      </ArmContainer>
      <AnnotationContainer>
        <TextContainer>
          <ByText>By</ByText>
          <NameText onClick={openLinkedInProfile}>Anubhav Gupta</NameText>
        </TextContainer>
        <LinkedInButton onClick={openLinkedInProfile} size="small">
          <LinkedInIcon />
        </LinkedInButton>
        <GitHubButton onClick={openGitHubProfile} size="small">
          <GitHubIcon />
        </GitHubButton>
      </AnnotationContainer>
    </NoChatContainer>
  );
}
