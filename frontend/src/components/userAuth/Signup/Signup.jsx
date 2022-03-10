import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import { useTheme } from '@mui/material/styles';
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import Loader from '../../shared/Loader/loader'

import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'

import { Register, clearErrors } from "../../../actions/userActions";

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



 



const Signup = () => {

	//signup

	const[user, setUser] = useState({
        fname: '',
		lname:'',
        email: '',
        password:''
    })

    const { fname, lname, email, password } = user;

	const onChange = e => {
	
		setUser({ ...user, [e.target.name]: e.target.value })
    }

	const alert = useAlert();
	const dispatch = useDispatch();
	const { isAuthenticated, error, loading } = useSelector(state => state.auth);
  
	useEffect(() => {

		if(isAuthenticated) {
	
			handleClose();
			alert.success('Inscription Réussie.');
		}
	  
  
	  if(error) {
		  alert.error(error);
		  dispatch(clearErrors());
		  
	  }
  }, [dispatch, alert, isAuthenticated, error])
  
  
  const HandleSubmit = (e) => { 
	  
  
	  const formData = new FormData();
	  formData.set('fname', fname);
	  formData.set('lname', lname);
	  formData.set('email', email);
	  formData.set('country', country);
	  formData.set('password', password);
  
  
	  dispatch(Register(formData));
    
  
  };
  
	 // validation

  const { register, handleSubmit, formState: {errors} } = useForm();



  const [country, setCountry] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();

function getStyles(name, country, theme) {
  return {
    fontWeight:
      country.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}


  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setCountry(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Button onClick={handleClickOpen}>
          Inscription
      </Button>
      <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Inscription</DialogTitle>
	  {loading ? <Loader /> :(
        <DialogContent>
        <Grid>         
        <Box component="form" onSubmit={handleSubmit(HandleSubmit)} noValidate  sx={{ mt: 1 }}>
        <TextField
                margin="normal"
                required
                fullWidth
                id="fname"
                label="Nom"
                name="fname"
                autoComplete="fname"
                autoFocus
				{...register("fname", {pattern: {
					value: /^[A-Za-z]/i,
					message: 'seulement des characters' 
				  }})}
				{...register("fname", {
					minLength: {
					  value: 3,
					  message: 'Minimum 3 caractères' 
					}
				  })}
				  {...register("fname", {
					maxLength: {
					  value: 15,
					  message: 'Maximum 15 caractères' 
					}
				  })}
				  {...register("fname", {required: "Champ requis"})}
				  
					error={!!errors?.fname}
					helperText={errors?.fname ? errors.fname.message : null}

					value={fname}
                    onChange={onChange} 

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
				{...register("lname", {pattern: {
					value: /^[A-Za-z]/i,
					message: 'seulement des characters' 
				  }})}
				{...register("lname", {
					minLength: {
					  value: 3,
					  message: 'Minimum 3 caractères' 
					}
				  })}
				  {...register("lname", {
					maxLength: {
					  value: 15,
					  message: 'Maximum 15 caractères' 
					}
				  })}
				  {...register("lname", {required: "Champ requis"})}
				  
					error={!!errors?.lname}
					helperText={errors?.lname ? errors.lname.message : null}
					value={lname}
                    onChange={onChange} 

              />
            <div>
      <FormControl sx={{ width: "100%", marginTop: "1rem"}}>
        <InputLabel id="demo-multiple-name-label">Country</InputLabel>
        <Select
		{...register("country", {required: "Champ requis"})}
				  
		error={!!errors?.country}
		helperText={errors?.country ? errors.country.message : null}
				
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
                fullWidth
                required
                id="email"
                label="Email"
                name="email"
                autoComplete="email"
                autoFocus
                style={{marginTop:"1rem"}}
				{...register("email", {pattern: {
					value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
					message: 'Information invalide' 
				  }})}
				  {...register("email", {required: 'Champ requis',
				   
				  })}
				  error={!!errors?.email}
				  helperText={errors?.email ? errors.email.message : null}
				  value={email}
                  onChange={onChange} 
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
				style={{marginTop:"1rem"}}
				
                {...register("password", {
					minLength: {
					  value: 7,
					  message: 'Minimum 7 caractères' 
					}
				  })}
				  {...register("password", {required: "Champ requis"})}
				  
					error={!!errors?.password}
					helperText={errors?.password ? errors.password.message : null}
					value={password}
                	onChange={onChange}

					
					              />
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
         
          <Button color="secondary" onClick={handleClose}>Annuler</Button>
          <Button color="secondary" type="submit"> Créer votre compte </Button>
		  </Box>   
		  </Grid>
		  </DialogContent>
	  )}
		  <DialogActions>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
export default Signup;
