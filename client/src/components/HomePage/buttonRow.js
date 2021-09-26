import React, {useEffect} from "react";
import ButtonBase from "@material-ui/core/ButtonBase";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from '@material-ui/core/styles';
import {Link} from "react-router-dom";
import axios from "axios";


const images = [
    {
        url: '/images/homepage/event.jpg',
        title: 'Upload',
        width: '50%',
        navigate: '/add'
    },
    {
        url: '/images/homepage/ev.jpg',
        title: 'Gallery',
        width: '50%',
        navigate: '/gallery'
    }
];

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        minWidth: 300,
        width: '100%',
    },
    image: {
        position: 'relative',
        height: 200,
        [theme.breakpoints.down('xs')]: {
            width: '100% !important', // Overrides inline-style
            height: 100,
        },
        '&:hover, &$focusVisible': {
            zIndex: 1,
            '& $imageBackdrop': {
                opacity: 0.15,
            },
            '& $imageMarked': {
                opacity: 0,
            },
            '& $imageTitle': {
                border: '4px solid currentColor',
            },
        },
    },
    focusVisible: {},
    imageButton: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: theme.palette.common.white,
    },
    imageSrc: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        backgroundSize: 'cover',
        backgroundPosition: 'center 40%',
    },
    imageBackdrop: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        backgroundColor: theme.palette.common.black,
        opacity: 0.4,
        transition: theme.transitions.create('opacity'),
    },
    imageTitle: {
        position: 'relative',
        padding: `${theme.spacing(2)}px ${theme.spacing(4)}px ${theme.spacing(1) + 6}px`,
    },
    imageMarked: {
        height: 3,
        width: 18,
        backgroundColor: theme.palette.common.white,
        position: 'absolute',
        bottom: -2,
        left: 'calc(50% - 9px)',
        transition: theme.transitions.create('opacity'),
    },
}));




function ButtonRow(props) {
    const classes = useStyles();

    useEffect( () => {
        const url = new URL(window.location.href);
        const code = url.searchParams.get('code');
        const body = {
            code: code
        }

        axios.post(`http://localhost:5000/googleDrive/getToken`, body)
            .then((data) => {
                if (data) {
                    localStorage.setItem('access_token', data.data.access_token);
                    localStorage.setItem('scope', data.data.scope);
                    localStorage.setItem('token_type', data.data.token_type);
                    localStorage.setItem('expiry_date', data.data.expiry_date);
                    localStorage.setItem('id_token', data.data.id_token);
                }
            })
            .catch((err) => {
                /*error*/
            });

    },[])

    return(
        <div>
            <div style={{height:"50px"}}/>

            <div className={classes.root}>
                {images.map((image) => (
                    <ButtonBase
                        focusRipple
                        key={image.title}
                        className={classes.image}
                        focusVisibleClassName={classes.focusVisible}
                        style={{
                            width: image.width,
                        }}
                    >
                        <span
                            className={classes.imageSrc}
                            style={{
                                backgroundImage: `url(${image.url})`,
                            }}
                        />
                        <span className={classes.imageBackdrop} />
                        <Link to ={image.navigate} >
                            <span className={classes.imageButton}>
                                <Typography
                                    component="span"
                                    variant="subtitle1"
                                    color="inherit"
                                    className={classes.imageTitle}
                                >
                                 {image.title}
                                    <span className={classes.imageMarked} />
                                </Typography>
                            </span>
                        </Link>
                    </ButtonBase>
                ))}
            </div>
        </div>
    );
}

export default ButtonRow;
