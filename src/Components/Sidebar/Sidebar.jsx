import React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import { Link, useNavigate } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import LogoutIcon from '@mui/icons-material/Logout';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { Links } from './Links';
import MuiAppBar from '@mui/material/AppBar';
import useMediaQuery from '@mui/material/useMediaQuery';

const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: prop => prop !== 'open' })(({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    marginRight: -drawerWidth,
    ...(open && {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginRight: 0,
    }),
    position: 'relative',
}));

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: prop => prop !== 'open',
})(({ theme, open }) => ({
    transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginRight: drawerWidth,
    }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: 'flex-start',
}));

export default function Sidebar() {
    const [openReports, setOpenReports] = React.useState(false);
    const navigate = useNavigate();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const [open, setOpen] = React.useState(!isMobile);

    React.useEffect(() => {
        setOpen(!isMobile);
    }, [isMobile]);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const handleLogout = () => {
        localStorage.clear();
        navigate('/', { replace: true });
    };

    const handleReportsClick = () => {
        setOpenReports(!openReports);
    };

    return (
        <Box>
            <CssBaseline />
            <AppBar sx={{ backgroundColor: '#fcf7f7' }} position="fixed" open={open}>
                <Toolbar sx={{ direction: 'ltr' }}>
                    <Typography
                        variant="h6"
                        noWrap
                        sx={{ flexGrow: 1, textAlign: 'left' }}
                        component="div"
                        color={'#275a88'}
                    ></Typography>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="end"
                        onClick={handleDrawerOpen}
                        sx={{ ...(open && { display: 'none' }), color: '#275a88' }}
                    >
                        <MenuIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>

            <Main open={open}>
                <DrawerHeader />
            </Main>
            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        '&::-webkit-scrollbar': {
                            width: '3px',
                        },
                        '&::-webkit-scrollbar-track': {
                            background: '#f1f1f1',
                        },
                        '&::-webkit-scrollbar-thumb': {
                            background: '#003366',
                            borderRadius: '6px',
                        },
                        '&::-webkit-scrollbar-thumb:hover': {
                            background: '#555',
                        },
                    },
                }}
                variant="persistent"
                anchor="right"
                open={open}
            >
                <DrawerHeader
                    sx={{ backgroundColor: '#fcf7f7' }}
                    className="d-flex justify-content-between align-items-center px-4"
                >
                    <Link className="text-decoration-none text-dark" to="/home">
                        <h4 className="fw-semibold">الانتخابات</h4>
                    </Link>
                    <IconButton sx={{ color: '#003366' }} onClick={handleDrawerClose}>
                        {theme.direction === 'rtl' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                    </IconButton>
                </DrawerHeader>
                <Divider />
                <List sx={{ backgroundColor: '#fcf7f7', height: '100%' }}>
                    {Links.map((link, index) => (
                        <React.Fragment key={index}>
                            <ListItem disablePadding>
                                <ListItemButton
                                    onClick={() => {
                                        if (link.subLinks) {
                                            handleReportsClick();
                                        } else {
                                            navigate(link.path);
                                            if (isMobile) {
                                                handleDrawerClose();
                                            }
                                        }
                                    }}
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                    }}
                                >
                                    <ListItemIcon>{link.icon}</ListItemIcon>
                                    <ListItemText
                                        sx={{ textAlign: 'right' }}
                                        primary={<span className="link-edit">{link.label}</span>}
                                    />
                                    {link.subLinks &&
                                        (openReports ? <ExpandLess /> : <ExpandMore />)}
                                </ListItemButton>
                            </ListItem>
                            {link.subLinks && (
                                <Collapse in={openReports} timeout="auto" unmountOnExit>
                                    <List component="div" disablePadding>
                                        {link.subLinks.map((subLink, subIndex) => (
                                            <ListItemButton
                                                key={subIndex}
                                                sx={{ pl: 4 }}
                                                onClick={() => {
                                                    navigate(subLink.path);
                                                    if (isMobile) {
                                                        handleDrawerClose();
                                                    }
                                                }}
                                            >
                                                <ListItemText
                                                    primary={
                                                        <span className="link-edit">
                                                            {subLink.label}
                                                        </span>
                                                    }
                                                />
                                            </ListItemButton>
                                        ))}
                                    </List>
                                </Collapse>
                            )}
                        </React.Fragment>
                    ))}

                    <ListItem key="logout" disablePadding>
                        <ListItemButton
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                            }}
                            onClick={handleLogout}
                        >
                            <ListItemIcon>
                                <LogoutIcon className="icon-edit" />
                            </ListItemIcon>
                            <span className="link-edit">تسجيل الخروج</span>
                        </ListItemButton>
                    </ListItem>
                </List>
            </Drawer>
        </Box>
    );
}
