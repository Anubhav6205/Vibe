import { useContext, useEffect, useState } from 'react';
import { AccountContext } from '../../context/AccountProvider';
import { styled } from '@mui/system';
import { Box, Typography, Avatar, IconButton, InputBase } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { addAboutUser, getAboutUser } from '../../api/api';

const ProfileContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 24px;
`;

const ProfileCard = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 24px;
  width: 400px;
  max-width: 90%;
  background-color: #fff;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
`;

const ProfileAvatar = styled(Avatar)`
  width: 150px;
  height: 150px;
  margin-bottom: 20px;
`;

const ProfileName = styled(Typography)`
  font-size: 28px;
  font-weight: bold;
  margin-bottom: 10px;
  font-family: 'Quicksand', sans-serif;
`;

const AboutContainer = styled(Box)`
  margin-top: 20px;
  text-align: center;
  
`;

const AboutHeading = styled(Typography)`
  font-size: 15px;
  font-weight: bold;
  margin-bottom: 10px;
  font-family: 'Dosis', sans-serif;
`;

const AboutText = styled(Typography)`
  font-size: 18px;
  font-family: 'Dosis', sans-serif;
  display: flex;
  align-items: center;
  
`;

const EditButton = styled(IconButton)`
  margin-left: 10px;
  padding: 6px;
  cursor: pointer;
  color: #1976d2;
`;

const StyledInputBase = styled(InputBase)`
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: .1rem .5rem;
  width: 100%;
  font-size: 16px;
  font-family: 'Dosis', sans-serif;

  &:focus {
    outline: none;
    border-color: #1976d2;
    box-shadow: 0 0 0 2px rgba(25, 118, 210, 0.2);
  }
`;

export default function ProfileMain() {
  const { account } = useContext(AccountContext);
  const [input, setInput] = useState('');
  const [about, setAbout] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const getAbout = async () => {
      const sub = account.sub;
      if (sub) {
        const response = await getAboutUser(sub);
        setAbout(response[0].about);
      }
    };
    getAbout();
  }, [account.sub]);

  const handleAboutChange = async (event) => {
    let code = event.keyCode || event.which;
    if (code === 13) {
      const data = {
        sub: account.sub,
        about: input,
      };
      await addAboutUser(data);
      setAbout(input);
      setInput('');
      setIsEditing(false);
    }
  };

  const handleEditClick = () => {
    setInput(about);
    setIsEditing(true);
  };

  return (
    <ProfileContainer>
      <ProfileCard>
        <ProfileAvatar alt="Profile Picture" src={account.picture} />
        <ProfileName variant="h2">{account.name}</ProfileName>
        <AboutContainer>
          <AboutHeading variant="h3">About Me</AboutHeading>
          {!isEditing ? (
            <AboutText variant="body1">
              {about}
              <EditButton onClick={handleEditClick}>
                <EditIcon fontSize="small" />
              </EditButton>
            </AboutText>
          ) : (
            <AboutText variant="body1">
              <StyledInputBase
                value={input}
                onChange={(event) => setInput(event.target.value)}
                onKeyDown={handleAboutChange}
                autoFocus
              />
            </AboutText>
          )}
        </AboutContainer>
      </ProfileCard>
    </ProfileContainer>
  );
}
