import { FC, MouseEvent, ReactNode, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { styled, Theme, CSSObject } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import { blue } from '@mui/material/colors';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import {
  selectDiscordSession,
  selectDiscordUser,
  selectWalletKey,
  setDiscordSession,
  setDiscordUser,
  setWalletKey,
} from 'redux/modules/common';
import { connectWallet, disconnectWallet } from 'services/phantom/provider';
import { oauth as discordOAuth } from 'services/discord/auth';
import { discordAuthorizationLink, discordCredentials } from 'config';
import { EMPTY_DISCORD_SESSION } from 'config/constants';

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
  ...(!open && {
    marginLeft: `calc(${theme.spacing(7)} + 1px)`,
    width: `calc(100% - ${theme.spacing(7)} - 1px)`,
    [theme.breakpoints.up('sm')]: {
      marginLeft: `calc(${theme.spacing(8)} + 1px)`,
      width: `calc(100% - ${theme.spacing(8)} - 1px)`,
    },
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  ...(open && {
    ...openedMixin(theme),
    '& .MuiDrawer-paper': openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    '& .MuiDrawer-paper': closedMixin(theme),
  }),
}));

interface AppLayoutProps {
  children: ReactNode;
}

const NavItem = ({
  label,
  to,
  open,
  icon,
}: {
  label: string;
  to: string;
  open: boolean;
  icon: React.ReactNode;
}) => {
  const navigate = useNavigate();

  return (
    <ListItem
      disablePadding
      sx={{ display: 'block' }}
      onClick={() => navigate(to)}
    >
      <ListItemButton
        sx={{
          minHeight: 48,
          justifyContent: open ? 'initial' : 'center',
          px: 2.5,
        }}
      >
        <ListItemIcon
          sx={{
            minWidth: 0,
            mr: open ? 3 : 'auto',
            justifyContent: 'center',
          }}
        >
          {icon}
        </ListItemIcon>
        <ListItemText primary={label} sx={{ opacity: open ? 1 : 0 }} />
      </ListItemButton>
    </ListItem>
  );
};

const AppLayout: FC<AppLayoutProps> = ({ children }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useAppSelector(selectDiscordUser);
  const session = useAppSelector(selectDiscordSession);
  const walletKey = useAppSelector(selectWalletKey);
  const shortendWalletKey = useMemo(
    () =>
      walletKey
        ? `${walletKey.toString().slice(0, 4)}...${walletKey
            .toString()
            .slice(-4)}`
        : walletKey,
    [walletKey]
  );
  const [open, setOpen] = useState(false);
  const [userMenuEl, setUserMenuEl] = useState<null | HTMLElement>(null);
  const [walletMenuEl, setWalletMenuEl] = useState<null | HTMLElement>(null);

  const handleDrawerToggle = () => {
    if (open) {
      setOpen(false);
    } else {
      setOpen(true);
    }
  };

  const handleOpenUserMenu = (event: MouseEvent<HTMLElement>) => {
    setUserMenuEl(event.currentTarget);
  };

  const handleNavigateToProfile = () => {
    navigate('/profile');
  };

  const handleSignOut = () => {
    setUserMenuEl(null);

    discordOAuth
      .revokeToken(session.access_token, discordCredentials)
      .then(() => {
        dispatch(setDiscordSession(EMPTY_DISCORD_SESSION));
        dispatch(setDiscordUser(null));
      });
  };

  const handleOpenWalletMenu = (event: MouseEvent<HTMLElement>) => {
    setWalletMenuEl(event.currentTarget);
  };

  const handleConnectWallet = async () => {
    const walletKey = await connectWallet();
    dispatch(setWalletKey(walletKey));
  };

  const handleDisconnectWallet = async () => {
    setWalletMenuEl(null);
    if (walletKey) {
      const disconnected = await disconnectWallet();
      if (disconnected) dispatch(setWalletKey(undefined));
    }
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open} sx={{ backgroundColor: blue[500] }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerToggle}
            edge="start"
            sx={{
              marginRight: 3,
            }}
          >
            <MenuIcon />
          </IconButton>
          <Box
            sx={{
              flexGrow: 1,
              display: 'flex',
              justifyContent: 'flex-end',
              alignItems: 'center',
              gap: 2,
            }}
          >
            {walletKey ? (
              <Chip
                color="primary"
                component={Button}
                label={`Wallet (${shortendWalletKey})`}
                sx={{ borderRadius: 1 }}
                onClick={handleOpenWalletMenu}
              />
            ) : (
              <Button
                variant="contained"
                sx={{ fontWeight: 700 }}
                onClick={handleConnectWallet}
              >
                Connect Wallet
              </Button>
            )}
            {user ? (
              <Button
                aria-haspopup="true"
                onClick={handleOpenUserMenu}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  color: 'white',
                  textTransform: 'inherit',
                  '&:hover': {
                    backgroundColor: 'primary.main',
                  },
                }}
              >
                {user && user.avatar ? (
                  <Avatar
                    sx={{ width: 32, height: 32 }}
                    src={`https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`}
                  />
                ) : (
                  <Avatar sx={{ width: 32, height: 32 }}>
                    {user.username.slice(0, 1).toUpperCase()}
                  </Avatar>
                )}
                <Typography variant="body1" sx={{ ml: 1 }}>
                  {user.username}
                </Typography>
                <ArrowDropDownIcon />
              </Button>
            ) : (
              <Button
                variant="contained"
                href={discordAuthorizationLink}
                sx={{ fontWeight: 700 }}
              >
                Sign in with Discord
              </Button>
            )}
          </Box>
          <Menu
            anchorEl={userMenuEl}
            open={Boolean(userMenuEl)}
            onClose={() => setUserMenuEl(null)}
          >
            <MenuItem onClick={handleNavigateToProfile}>Profile</MenuItem>
            <MenuItem onClick={handleSignOut}>Sign out</MenuItem>
          </Menu>
          <Menu
            anchorEl={walletMenuEl}
            open={Boolean(walletMenuEl)}
            onClose={() => setWalletMenuEl(null)}
          >
            <MenuItem onClick={handleDisconnectWallet}>
              Disconnect wallet
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <Box sx={{ height: '64px' }}>
          <Typography
            variant="h4"
            align="center"
            sx={{ ...(!open && { display: 'none' }), lineHeight: '64px' }}
          >
            PlugTok
          </Typography>
        </Box>
        <Divider />
        <List>
          <NavItem label="Home" to="/" icon={<HomeIcon />} open={open} />
          <NavItem
            label="Profile"
            to="/profile"
            icon={<PersonIcon />}
            open={open}
          />
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1 }}>
        <DrawerHeader />
        {children}
      </Box>
    </Box>
  );
};

export default AppLayout;
