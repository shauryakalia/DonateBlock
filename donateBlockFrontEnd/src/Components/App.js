import React from 'react';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';
import { Header, Footer } from './Layouts';
import { OrganisationWallet, UserWallet, VendorWallet, CreateCampaign, Inventory, VendorDashboard, OrganisationDashboard, UserDashboard, UserSignUp, UserProfile, OrganisationSignUp, OrganisationProfile, VendorProfile, UserChangePassword, OrganisationChangePassword, VendorChangePassword, VendorSignUp, UserLogin, OrganisationLogin, VendorLogin, HomePage, OrganisationForgotPassword, OrganisationResetPassword, UserForgotPassword, UserResetPassword, VendorForgotPassword, VendorResetPassword } from './Pages';
import Image from './img/db.jpg';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import history from '../history';
import { Paper } from '@material-ui/core';

 const theme = createMuiTheme({
    palette: {
      secondary: {  
        main: '#FF5722',
        dark: '#BF360C',
        light: '#FFAB91',
        contrastText: '#000000'
      },
      primary: {
        main: '#03A9F4',
        dark: '#0277BD',
        light: '#B3E5FC',
        contrastText: '#ffffff'
        },
      default: {
        main: '#ffffff',
        contrastText: '#000000'
      },

    },
  });
  const styles= {
    paper:{
      backgroundImage:`url(${Image})`,
      backgroundRepeat: 'no-repeat',
      backgroundSize:'cover',
      backgroundPosition:'top',
      left: 0,
      bottom: 0,
      height: 'auto',
      width: 'auto',
    }
}

class App extends React.Component{
  constructor(props){
    super(props);
  }
  handleLogout = () => {
    sessionStorage.clear('isLoggedIn');
    sessionStorage.clear('token');
    sessionStorage.clear('dbId');
    sessionStorage.clear('firstName');
    sessionStorage.clear('lastName');
    sessionStorage.clear('orgId');
    sessionStorage.clear('vendorId');
    sessionStorage.clear('orgName');
    sessionStorage.clear('vendorName');
  };

  handleLogin = (data) => {
    console.log(data);
    sessionStorage.setItem('isLoggedIn' , data.auth);
    sessionStorage.setItem('token' , data.access_token);
    sessionStorage.setItem('dbId' , data.db_id);
    sessionStorage.setItem('vendorId' , data.vendor_id);
    sessionStorage.setItem('orgId' , data.organisation_id);
    sessionStorage.setItem('orgName' , data.orgName);
    sessionStorage.setItem('vendorName' , data.vendorName);
    sessionStorage.setItem('firstName' , data.first_name);
    sessionStorage.setItem('lastName' , data.last_name);
  };
    render(){
        return(     
          <MuiThemeProvider theme={theme}>
            <Paper style={styles.paper}>
              <Router history={history}>
                <React.Fragment>
                  <Header handleLogout={this.handleLogout}/>
                      <Switch>              
                        <Route exact path="/" component={HomePage}/>
                        {sessionStorage.getItem('isLoggedIn') && <Route path="/userprofile" component={UserProfile}/>}
                        {sessionStorage.getItem('isLoggedIn') && <Route path="/organisationprofile" component={OrganisationProfile}/>}
                        {sessionStorage.getItem('isLoggedIn') && <Route path="/vendorprofile" component={VendorProfile}/>}
                        {sessionStorage.getItem('isLoggedIn') && <Route path="/userdashboard" component={UserDashboard}/>}
                        {sessionStorage.getItem('isLoggedIn') && <Route path="/organisationdashboard" component={OrganisationDashboard}/>}
                        {sessionStorage.getItem('isLoggedIn') && <Route path="/vendordashboard" component={VendorDashboard}/>}
                        <Route path="/usersignup" component={UserSignUp}/>
                        <Route path="/userlogin" component={()=><UserLogin handleLogin={this.handleLogin}/>}/>
                        <Route path="/organisationsignup" component={OrganisationSignUp}/>
                        <Route path="/organisationlogin" component={()=><OrganisationLogin handleLogin={this.handleLogin}/>}/>
                        <Route path="/vendorsignup" component={VendorSignUp}/>
                        <Route path="/vendorlogin" component={()=><VendorLogin handleLogin={this.handleLogin}/>}/>
                        <Route path="/userresetpassword" component={UserResetPassword}/>
                        <Route path="/organisationresetpassword" component={OrganisationResetPassword}/>
                        <Route path="/vendorresetpassword" component={VendorResetPassword}/>
                        {sessionStorage.getItem('isLoggedIn') &&<Route path="/userchangepassword" component={UserChangePassword}/>}
                        {sessionStorage.getItem('isLoggedIn') &&<Route path="/organisationchangepassword" component={OrganisationChangePassword}/>}
                        {sessionStorage.getItem('isLoggedIn') &&<Route path="/vendorchangepassword" component={VendorChangePassword}/>}
                        {sessionStorage.getItem('isLoggedIn') &&<Route path="/userwallet" component={UserWallet}/>}
                        {sessionStorage.getItem('isLoggedIn') &&<Route path="/organisationwallet" component={OrganisationWallet}/>}
                        {sessionStorage.getItem('isLoggedIn') &&<Route path="/vendorwallet" component={VendorWallet}/>}
                        {sessionStorage.getItem('isLoggedIn') &&<Route path="/createcampaign" component={CreateCampaign}/>}
                        {sessionStorage.getItem('isLoggedIn') &&<Route path="/inventory" component={Inventory}/>}
                        <Route path="/userforgotpassword" component={UserForgotPassword}/>
                        <Route path="/organisationforgotpassword" component={OrganisationForgotPassword}/>
                        <Route path="/vendorforgotpassword" component={VendorForgotPassword}/>                     
                      </Switch>   
                    <Footer/> 
                  </React.Fragment>      
              </Router>
              </Paper> 
            </MuiThemeProvider>             
        );
    }
}

export default App;
