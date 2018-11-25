import $ from 'jquery';
import { API_URL } from '../constants';

class BackendServices {

    SignUp(gender, dob, street, email, password, firstName, lastName, contact, isd, address, city, province,  zip, country, adhaar) {
        return $.ajax({
            //contentType: 'application/x-www-form-urlencoded',
            data: {
                first_name: firstName,
                last_name: lastName,
                phone: contact,
                email: email,
                isd_code: isd,
                password: password,
                gender: gender,
                date_of_birth: dob,
                street: street,
                address: address,
                city: city,
                state: province,
                country: country,
                zip: zip,
                aadhaar: adhaar,
            },
            dataType: 'json',
            processData: true,
            type: 'POST',
            url: API_URL + '/registerUser'
        });
    }

    vendorSignUp(vendorName, vendorEmail, vendorPhone, isd_code, vendorPassword, vendorRegId, vendorAddress) {
        return $.ajax({
            //contentType: 'application/x-www-form-urlencoded',
            data: {
                vendorName: vendorName,
                vendorEmail: vendorEmail,
                vendorPhone: vendorPhone,
                isd_code: isd_code,
                vendorPassword: vendorPassword,
                vendorRegId: vendorRegId,
                vendorAddress: vendorAddress
            },
            dataType: 'json',
            processData: true,
            type: 'POST',
            url: API_URL + '/registerVendor'
        });
    }

    orgSignUp(orgName, orgEmail, orgPhone, isd_code, orgPassword, orgRegId, orgAddress, orgOwnerName) {
        return $.ajax({
            //contentType: 'application/x-www-form-urlencoded',
            data: {
                orgName: orgName,
                orgEmail: orgEmail,
                orgPhone: orgPhone,
                isd_code: isd_code,
                orgPassword: orgPassword,
                orgRegId:  orgRegId,
                orgAddress: orgAddress ,
                orgOwnerName: orgOwnerName,
            },
            dataType: 'json',
            processData: true,
            type: 'POST',
            url: API_URL + '/registerOrganisation'
        });
    }

    createCampaign( token, campaignName, campaignCause, campaignDiscription, amount_required, campaignRequirement, quantity, campaignAddress ) {
        return $.ajax({
            //contentType: 'application/x-www-form-urlencoded',
            data: {
                campaignName: campaignName,
                campaignCause:campaignCause,
                campaignDiscription: campaignDiscription,
                amount_required: amount_required,
                campaignRequirement: campaignRequirement,
                quantity: quantity,
                campaignAddress: campaignAddress,
            },
            dataType: 'json',
            processData: true,
            type: 'POST',
            url: API_URL + '/createCampaign',
            headers: { 'x-access-token': token },
        });
    }

    updateInventory(clothesQuantity, clothesPrice, booksQuantity, booksPrice, foodQuantity, foodPrice, token) {
        return $.ajax({
            //contentType: 'application/x-www-form-urlencoded',
            data:{
                clothesQuantity: clothesQuantity,
                clothesPrice: clothesPrice,
                booksQuantity: booksQuantity,
                booksPrice: booksPrice,
                foodQuantity: foodQuantity,
                foodPrice: foodPrice
                },
            dataType: 'json',
            processData: true,
            type: 'POST',
            url: API_URL + '/updateInventory',
            headers: { 'x-access-token': token },
        });
    }

    itemDelivered( id, token ) {
        return $.ajax({
            //contentType: 'application/x-www-form-urlencoded',
            data:{
                campaign_id : id
                },
            dataType: 'json',
            processData: true,
            type: 'POST',
            url: API_URL + '/itemDelivered',
            headers: { 'x-access-token': token },
        });
    }

    donateToCampaign(id, amount, token) {
        return $.ajax({
            //contentType: 'application/x-www-form-urlencoded',
            data: {
                campaign_id: id, 
                donation_amount: amount,
            },
            dataType: 'json',
            processData: true,
            type: 'POST',
            url: API_URL + '/donateToCampaign',
            headers: { 'x-access-token': token },
        });
    }

    getInventory(token) {
        return $.ajax({
            //contentType: 'application/x-www-form-urlencoded',
            processData: true,
            type: 'GET',
            url: API_URL + '/getInventory',
            headers: { 'x-access-token': token },
        });
    }

    getAllCampaign(token) {
        return $.ajax({
            //contentType: 'application/x-www-form-urlencoded',
            processData: true,
            type: 'GET',
            url: API_URL + '/getAllCampaign',
            headers: { 'x-access-token': token },
        });
    }

    getSelfCampaign(token) {
        return $.ajax({
            //contentType: 'application/x-www-form-urlencoded',
            processData: true,
            type: 'GET',
            url: API_URL + '/getSelfCampaign',
            headers: { 'x-access-token': token },
        });
    }

    getUserDetails(token) {
        return $.ajax({
            //contentType: 'application/x-www-form-urlencoded',
            processData: true,
            type: 'GET',
            url: API_URL + '/getUserDetails',
            headers: { 'x-access-token': token },
        });
    }

    getUserWallet(token) {
        return $.ajax({
            //contentType: 'application/x-www-form-urlencoded',
            processData: true,
            type: 'GET',
            url: API_URL + '/getUserWallet',
            headers: { 'x-access-token': token },
        });
    }

    getOrganisationWallet(token) {
        return $.ajax({
            //contentType: 'application/x-www-form-urlencoded',
            processData: true,
            type: 'GET',
            url: API_URL + '/getOrganisationWallet',
            headers: { 'x-access-token': token },
        });
    }

    getVendorWallet(token) {
        return $.ajax({
            //contentType: 'application/x-www-form-urlencoded',
            processData: true,
            type: 'GET',
            url: API_URL + '/getVendorWallet',
            headers: { 'x-access-token': token },
        });
    }

    getOrganisationDetails(token) {
        return $.ajax({
            //contentType: 'application/x-www-form-urlencoded',
            processData: true,
            type: 'GET',
            url: API_URL + '/getOrganisationDetails',
            headers: { 'x-access-token': token },
        });
    }

    getVendorDetails(token) {
        return $.ajax({
            //contentType: 'application/x-www-form-urlencoded',
            processData: true,
            type: 'GET',
            url: API_URL + '/getVendorDetails',
            headers: { 'x-access-token': token },
        });
    }

    getUserPackage(token) {
        return $.ajax({
            //contentType: 'application/x-www-form-urlencoded',
            processData: true,
            type: 'GET',
            url: API_URL + '/getUserPackage',
            headers: { 'x-access-token': token },
        });
    }

    gettAllPackages(token) {
        return $.ajax({
            //contentType: 'application/x-www-form-urlencoded',
            processData: true,
            type: 'GET',
            url: API_URL + '/packages',
            headers: { 'x-access-token': token },
        });
    }

    putUpdatePackage(token, packageId) {
        return $.ajax({
            //contentType: 'application/x-www-form-urlencoded',
            data: {
                packageId: packageId,
            },
            processData: true,
            type: 'PUT',
            url: API_URL + '/updatePackage',
            headers: { 'x-access-token': token },
        });
    }

    changePassword(token, oldPassword, newPassword) {
        return $.ajax({
            //contentType: 'application/x-www-form-urlencoded',
            data: {
                oldPassword: oldPassword,
                newPassword: newPassword,
            },
            processData: true,
            type: 'POST',
            url: API_URL + '/updatePassword',
            headers: { 'x-access-token': token },
        });
    }

    resetPassword(email, password) {
        return $.ajax({
            //contentType: 'application/x-www-form-urlencoded',
            data: {
                email: email,
                password: password,
            },
            processData: true,
            type: 'POST',
            url: API_URL + '/resetPassword',
        });
    }

    ForgotPassword(email) {
        return $.ajax({
            //contentType: 'application/x-www-form-urlencoded',
            data: {
                email: email
            },
            processData: true,
            type: 'POST',
            url: API_URL + '/forgotPassword',
        });
    }

    UserLogIn(phone, isd, password) {
        return $.ajax({
            //contentType: 'application/x-www-form-urlencoded',
            data: {
                phone: phone,
                password: password,
                isd_code: isd,
            },
            dataType: 'json',
            processData: true,
            type: 'POST',
            url: API_URL + '/userLogin',
            headers: { "Content-Type" : "application/x-www-form-urlencoded" },
        });
    }

    OrgLogIn(phone, isd, password) {
        return $.ajax({
            //contentType: 'application/x-www-form-urlencoded',
            data: {
                orgPhone: phone,
                orgPassword: password,
                isd_code: isd,
            },
            dataType: 'json',
            processData: true,
            type: 'POST',
            url: API_URL + '/organisationLogin',
            headers: { "Content-Type" : "application/x-www-form-urlencoded" },
        });
    }

    vendorLogIn(phone, isd, password) {
        return $.ajax({
            //contentType: 'application/x-www-form-urlencoded',
            data: {
                vendorPhone: phone,
                vendorPassword: password,
                isd_code: isd,
            },
            dataType: 'json',
            processData: true,
            type: 'POST',
            url: API_URL + '/vendorLogin',
            headers: { "Content-Type" : "application/x-www-form-urlencoded" },
        });
    }

}

export default new BackendServices();

