import React, { useEffect } from "react";
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import {ThemeProvider } from '@mui/material/styles';
import FacebookIcon from '@mui/icons-material/Facebook';
import GoogleIcon from '@mui/icons-material/Google';
import Stack from '@mui/material/Stack';
import { useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';


import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';

import { useState } from "react";
import MetaData from '../../shared/metaData';

import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'

import { register, clearErrors } from "../../../actions/userActions";
import './signup.scss';


const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};


const countries = [
    "Afghanistan",
	"Albania",
	"Algeria",
	"American Samoa",
	"Andorra",
	"Angola",
	"Anguilla",
	"Antarctica",
	"Antigua and Barbuda",
	"Argentina",
	"Armenia",
	"Aruba",
	"Australia",
	"Austria",
	"Azerbaijan",
	"Bahamas (the)",
    "Bahrain",
	"Bangladesh",
	"Barbados",
	"Belarus",
	"Belgium",
	"Belize",
	"Benin",
	"Bermuda",
	"Bhutan",
	"Bolivia (Plurinational State of)",
	"Bonaire, Sint Eustatius and Saba",
	"Bosnia and Herzegovina",
	"Botswana",
	"Bouvet Island",
	"Brazil",
	"British Indian Ocean Territory (the)",
	"Brunei Darussalam",
	"Bulgaria",
	"Burkina Faso",
	"Burundi",
	"Cabo Verde",
	"Cambodia",
	"Cameroon",
	"Canada",
	"Cayman Islands (the)",
	"Central African Republic (the)",
	"Chad",
	"Chile",
	"China",
	"Christmas Island",
	"Cocos (Keeling) Islands (the)",
	"Colombia",
	"Comoros (the)",
	"Congo (the Democratic Republic of the)",
	"Congo (the)",
	"Cook Islands (the)",
	"Costa Rica",
	"Croatia",
	"Cuba",
	"Curaçao",
	"Cyprus",
	"Czechia",
	"Côte d'Ivoire",
	"Denmark",
	"Djibouti",
	"Dominica",
	"Dominican Republic (the)",
	"Ecuador",
	"Egypt",
	"El Salvador",
	"Equatorial Guinea",
	"Eritrea",
	"Estonia",
	"Eswatini",
	"Ethiopia",
	"Falkland Islands (the) [Malvinas]",
	"Faroe Islands (the)",
	"Fiji",
	"Finland",
	"France",
	"French Guiana",
	"French Polynesia",
	"French Southern Territories (the)",
	"Gabon",
	"Gambia (the)",
	"Georgia",
	"Germany",
	"Ghana",
	"Gibraltar",
	"Greece",
	"Greenland",
	"Grenada",
	"Guadeloupe",
	"Guam",
	"Guatemala",
	"Guernsey",
	"Guinea",
	"Guinea-Bissau",
	"Guyana",
	"Haiti",
	"Heard Island and McDonald Islands",
	"Holy See (the)",
	"Honduras",
	"Hong Kong",
	"Hungary",
	"Iceland",
	"India",
	"Indonesia",
	"Iran (Islamic Republic of)",
	"Iraq",
	"Ireland",
	"Isle of Man",
	"Israel",
	"Italy",
	"Jamaica",
	"Japan",
	"Jersey",
	"Jordan",
	"Kazakhstan",
	"Kenya",
	"Kiribati",
	"Korea (the Democratic People's Republic of)",
	"Korea (the Republic of)",
	"Kuwait",
	"Kyrgyzstan",
	"Lao People's Democratic Republic (the)",
	"Latvia",
	"Lebanon",
	"Lesotho",
	"Liberia",
	"Libya",
	"Liechtenstein",
	"Lithuania",
	"Luxembourg",
	"Macao",
	"Madagascar",
	"Malawi",
	"Malaysia",
	"Maldives",
	"Mali",
	"Malta",
	"Marshall Islands (the)",
	"Martinique",
	"Mauritania",
	"Mauritius",
	"Mayotte",
	"Mexico",
	"Micronesia (Federated States of)",
	"Moldova (the Republic of)",
	"Monaco",
	"Mongolia",
	"Montenegro",
	"Montserrat",
	"Morocco",
	"Mozambique",
	"Myanmar",
	"Namibia",
	"Nauru",
	"Nepal",
	"Netherlands (the)",
	"New Caledonia",
	"New Zealand",
	"Nicaragua",
	"Niger (the)",
	"Nigeria",
	"Niue",
	"Norfolk Island",
	"Northern Mariana Islands (the)",
	"Norway",
	"Oman",
	"Pakistan",
	"Palau",
	"Palestine, State of",
	"Panama",
	"Papua New Guinea",
	"Paraguay",
	"Peru",
	"Philippines (the)",
	"Pitcairn",
	"Poland",
	"Portugal",
	"Puerto Rico",
	"Qatar",
	"Republic of North Macedonia",
	"Romania",
	"Russian Federation (the)",
	"Rwanda",
	"Réunion",
	"Saint Barthélemy",
	"Saint Helena, Ascension and Tristan da Cunha",
	"Saint Kitts and Nevis",
	"Saint Lucia",
	"Saint Martin (French part)",
	"Saint Pierre and Miquelon",
	"Saint Vincent and the Grenadines",
	"Samoa",
	"San Marino",
	"Sao Tome and Principe",
	"Saudi Arabia",
	"Senegal",
	"Serbia",
	"Seychelles",
	"Sierra Leone",
	"Singapore",
	"Sint Maarten (Dutch part)",
	"Slovakia",
	"Slovenia",
	"Solomon Islands",
	"Somalia",
	"South Africa",
	"South Georgia and the South Sandwich Islands",
	"South Sudan",
	"Spain",
	"Sri Lanka",
	"Sudan (the)",
	"Suriname",
	"Svalbard and Jan Mayen",
	"Sweden",
	"Switzerland",
	"Syrian Arab Republic",
	"Taiwan",
	"Tajikistan",
	"Tanzania, United Republic of",
	"Thailand",
	"Timor-Leste",
	"Togo",
	"Tokelau",
	"Tonga",
	"Trinidad and Tobago",
	"Tunisia",
	"Turkey",
	"Turkmenistan",
	"Turks and Caicos Islands (the)",
	"Tuvalu",
	"Uganda",
	"Ukraine",
	"United Arab Emirates (the)",
	"United Kingdom of Great Britain and Northern Ireland (the)",
	"United States Minor Outlying Islands (the)",
	"United States of America (the)",
	"Uruguay",
	"Uzbekistan",
	"Vanuatu",
	"Venezuela (Bolivarian Republic of)",
	"Viet Nam",
	"Virgin Islands (British)",
	"Virgin Islands (U.S.)",
	"Wallis and Futuna",
	"Western Sahara",
	"Yemen",
	"Zambia",
	"Zimbabwe",
	"Åland Islands"
];

function getStyles(name, country, theme) {
  return {
    fontWeight:
      country.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}


const Input = styled('input')({
    display: 'none',
   
  });

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="#">
        BAGNGO
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}






const SignUp = ({ history }) => {

	
	const [fname, setFname] = useState('');
	const [lname, setLname] = useState('');
	const [email, setEmail] = useState('');
	const [phoneNum, setPhonenum] = useState('');
	const [password, setPassword] = useState('');

	const [birthday, setBirthday] = React.useState(null);
	const [avatar, setAvatar] = useState('');
	const [avatarPreview, setAvatarPreview ] = useState('/images/default_avatar.jpg');
	

	const alert = useAlert();
    const dispatch = useDispatch();

    const { isAuthenticated, error } = useSelector(state => state.auth);


	useEffect(() => {

        if(isAuthenticated) {

			history.push('/login')
        }

        if(error) {
            alert.error(error);
            dispatch(clearErrors());
        }
    }, [dispatch, alert, isAuthenticated, error, history])


    const handleSubmit = (e) => { 
		
		e.preventDefault();
		

        const formData = new FormData();
        formData.set('fname', fname);
        formData.set('lname', lname);
        formData.set('birthday', birthday);
        formData.set('email', email);
        formData.set('country', country);
        formData.set('phoneNum', phoneNum);
        formData.set('password', password);
        formData.set('avatar', avatar);

        dispatch(register(formData))
	
	};

    const theme = useTheme();
  const [country, setCountry] = React.useState([]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setCountry(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  const onChange = e => {
    if (e.target.name === 'avatar') {

        const reader = new FileReader();

        reader.onload = () => {
            if (reader.readyState === 2) {
                setAvatarPreview(reader.result)
                setAvatar(reader.result)
            }
        }

        reader.readAsDataURL(e.target.files[0])

    } 
}


  return (
	  
    <ThemeProvider theme={theme}>
	<MetaData title={'BANGO | Sign Up'} />
    <Grid container component="main" sx={{ height: '100vh' }}>
      <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://images.pexels.com/photos/9789940/pexels-photo-9789940.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'left',
             
            }}
          >
           
            <Typography style={{marginBottom:'2rem'}} component="h1" variant="h5">
            Créer un compte :
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
            
            <TextField
                margin="normal"
                required
                fullWidth
                id="fname"
                label="Nom"
                name="fname"
                autoComplete="fname"
                autoFocus
                value={fname}
				onChange={(e) => setFname(e.target.value)}

              />
           
				<TextField
                margin="normal"
                required
                fullWidth
                id="lname"
                label="Prénom"
                name="lname"
                autoComplete="lname"
                autoFocus
                value={lname}
                onChange={(e) => setLname(e.target.value)}
              />
                
                
				<LocalizationProvider dateAdapter={AdapterDateFns}>
				<Stack spacing={3}>
							<DatePicker
					
					views={['day']}
					label="	Date de Naissance"
					value={birthday}
					onChange={(newValue) => {
						setBirthday(newValue);
					}}
					renderInput={(params) => <TextField {...params} helperText={null} />}
					/>
				</Stack>
				</LocalizationProvider>
                
                 <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email"
                name="email"
                autoComplete="email"
                autoFocus
                style={{marginTop:"1rem"}}
				value={email}
				onChange={(e) => setEmail(e.target.value)}

              />
             
              <div>
      <FormControl sx={{ width: "100%", marginTop: "1rem"}}>
        <InputLabel id="demo-multiple-name-label">Country</InputLabel>
        <Select
          labelId="demo-multiple-name-label"
          id="demo-multiple-name"
          value={country}
          onChange={handleChange}
          input={<OutlinedInput label="Country" />}
          MenuProps={MenuProps}
         
        >
          {countries.map((name) => (
            <MenuItem
              key={name}
              value={name}
              style={getStyles(name, country, theme)}
            >
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
           
				<TextField
                margin="normal"
                required
                fullWidth
				type="number"
                id="phoneNum"
                label="Téléphone"
                name="phoneNum"
                autoComplete="phoneNum"
                autoFocus
                value={phoneNum}
				onChange={(e) => setPhonenum(e.target.value)}

              />
        
                <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Mot de Passe"
                type="password"
                id="password"
                autoComplete="current-password"
				value={password}
				onChange={(e) => setPassword(e.target.value)}

                style={{marginTop:"1rem"}}
                              />

          
                      <div>
                      <figure className='avatar mr-3 item-rtl' style={{ marginTop:"2rem"}}>
                          
                          <img
                              src={avatarPreview}
                              className='rounded-circle'
                              alt='Avatar Preview'
                              
                          />
                          <Stack direction="row" alignItems="center" spacing={2}>
                      <label htmlFor="customFile">
                    <Input name='avatar' accept="image/*" id="customFile" multiple type="file"  onChange={onChange} />
                    <IconButton color="primary" aria-label="upload picture" component="span" style={{ }}>
                     <PhotoCamera />
                     </IconButton>
                        </label>
                    </Stack>
                      </figure>
                      
                  </div>
                          
            

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
               Créer Votre Compte
              </Button>
              <Grid container>
                <Grid item style={{marginTop: '2rem'}}>
                  <Link href="#" variant="body2">
                    {"Déja un membre? S’identifier"}
                  </Link>
                </Grid>
                
              </Grid>
              <Grid item xs style={{marginTop: '2rem'}}>
                <Typography>
                S’inscrire avec :
            </Typography>
               
            </Grid>
            <Grid item xs style={{marginLeft: '8rem'}}>
            <Button>
                <FacebookIcon sx={{ fontSize: 40 }} />
            </Button>
            <Button
            
            >
                <GoogleIcon sx={{ fontSize: 40 }} />
            </Button>
            </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
export default SignUp;