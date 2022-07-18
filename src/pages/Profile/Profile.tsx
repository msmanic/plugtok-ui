import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import EditIcon from '@mui/icons-material/Edit';
import { selectDiscordUser } from 'redux/modules/common';
import { useAppSelector } from 'redux/hooks';

const Profile = () => {
  const user = useAppSelector(selectDiscordUser);

  return (
    <>
      <Box
        sx={{
          height: '200px',
          background: 'no-repeat url(assets/wallpaper.jpg)',
          backgroundSize: 'cover',
        }}
      />
      <Box sx={{ pl: 30, pr: 10, py: 2 }}>
        <Container maxWidth="lg">
          <Box
            sx={{
              position: 'relative',
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <Avatar
              variant="square"
              sx={{
                position: 'absolute',
                width: '150px',
                height: '150px',
                left: '-180px',
                top: '-75px',
              }}
              src={
                user?.avatar
                  ? `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`
                  : ''
              }
            />
            <Stack>
              <Typography variant="h5">{user?.username}</Typography>
              <Typography variant="body1" color="gray.800">
                Communication
              </Typography>
              <Stack direction="row">
                <Link href="#">
                  <i className="fa-brands fa-discord"></i>
                </Link>
              </Stack>
            </Stack>
            <Typography
              sx={{
                display: 'flex',
                alignItems: 'center',
                color: 'info.main',
                '&:hover': { cursor: 'pointer', color: 'info.light' },
              }}
            >
              <EditIcon sx={{ width: '20px', height: '20px', mr: 1 }} />
              Edit Profile
            </Typography>
          </Box>
          <Typography variant="body1" sx={{ mt: 2 }}>
            Fusce commodo velit leo, a pharetra erat rhoncus quis. Curabitur eu
            blandit ipsum, a tincidunt leo. Mauris vestibulum, arcu eu dictum
            imperdiet, nulla tellus volutpat dui, ut egestas sem velit sed diam.
            Vivamus et ullamcorper ipsum. Nam nec quam varius, cursus lectus ut,
            sagittis neque. Morbi nec sagittis leo, tempor suscipit tortor. Cras
            vitae pellentesque nisl. Fusce ac gravida lacus, ut cursus libero.
            Nulla non pharetra nunc. Cras vitae massa nisi. Integer eu pretium
            libero, id efficitur nisi. Vivamus commodo nisi eu massa elementum,
            eu finibus tortor fringilla. Quisque interdum euismod leo sed
            fringilla. Pellentesque convallis, arcu sed mollis malesuada, sapien
            justo aliquet magna, quis vestibulum erat sapien condimentum elit.
            Morbi iaculis interdum tellus sed ornare.
          </Typography>
        </Container>
      </Box>
    </>
  );
};

export default Profile;
