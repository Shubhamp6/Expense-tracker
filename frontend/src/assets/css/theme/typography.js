
const applyCustomTypoGraphy = (theme) => {

    theme.typography.display1 = {
        fontSize: "54px",
        [theme.breakpoints.down('lg')]: {
            fontSize: '48px',
        },
        [theme.breakpoints.down('md')]: {
            fontSize: '30px',
        }
    }
    theme.typography.h1 = {
        fontSize: "40px",
        [theme.breakpoints.down('lg')]: {
            fontSize: '30px',
        },
        [theme.breakpoints.down('md')]: {
            fontSize: '20px',
        }
    }
    theme.typography.h2 = {
        fontSize: "32px",
        [theme.breakpoints.down('lg')]: {
            fontSize: '28px',
        },
        [theme.breakpoints.down('md')]: {
            fontSize: '18px',
        }
    }
    theme.typography.h3 = {
        fontSize: "24px",
        [theme.breakpoints.down('lg')]: {
            fontSize: '20px',
        },
        [theme.breakpoints.down('md')]: {
            fontSize: '14px',
        }
    }
    theme.typography.h4 = {
        fontSize: "20px",

        [theme.breakpoints.down('lg')]: {
            fontSize: '18px',
        },
        [theme.breakpoints.down('md')]: {
            fontSize: '14px',
        }
    }
    theme.typography.h5 = {
        fontSize: "18px",

        [theme.breakpoints.down('lg')]: {
            fontSize: '16px',
        },
        [theme.breakpoints.down('md')]: {
            fontSize: '14px',
        }
    }
    theme.typography.h6 = {
        fontSize: "16px",
        fontWeight: "normal",
        [theme.breakpoints.down('lg')]: {
            fontSize: '10px',
        },
        [theme.breakpoints.down('md')]: {
            fontSize: '10px',
        }
    }
    theme.typography.button = {
        fontSize: "16px",
        fontWeight: "normal",
        [theme.breakpoints.down('lg')]: {
            fontSize: '16px',
        },
        [theme.breakpoints.down('md')]: {
            fontSize: '14px',
        }
    }
    theme.typography.subtitle1 = {
        fontSize: "14px",
        fontWeight: "normal",
        [theme.breakpoints.down('lg')]: {
            fontSize: '10px',
        },
        [theme.breakpoints.down('md')]: {
            fontSize: '10px',
        }
    }
    theme.typography.subtitle2 = {
        fontSize: "12px",
        fontWeight: "normal",
        [theme.breakpoints.down('lg')]: {
            fontSize: '10px',
        },
        [theme.breakpoints.down('md')]: {
            fontSize: '10px',
        }
    }
    theme.typography.pdfh1 = {
        fontSize: "16px",
        [theme.breakpoints.down('lg')]: {
            fontSize: '16px',
        },
        [theme.breakpoints.down('md')]: {
            fontSize: '16px',
        }
    }
    theme.typography.pdfh2 = {
        fontSize: "14px",
        fontWeight: 400,
        [theme.breakpoints.down('lg')]: {
            fontSize: '14px',
        },
        [theme.breakpoints.down('md')]: {
            fontSize: '14px',
        }
    }
    theme.typography.pdfh3 = {
        fontSize: "12px",
        fontWeight: 400,
        [theme.breakpoints.down('lg')]: {
            fontSize: '12px',
        },
        [theme.breakpoints.down('md')]: {
            fontSize: '12px',
        }
    }
    theme.typography.mobileNav = {
        fontSize: "16px",
        fontWeight: "normal",
        [theme.breakpoints.down('lg')]: {
            fontSize: '10px',
        },
        '@media (max-width:625px)': {
            fontSize: '10px',
        }
    }
return theme

}
export default applyCustomTypoGraphy