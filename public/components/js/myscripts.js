/**
 * Created by James Singizi on 08-Nov-16.
 */

$(function(){

    //activate sign up tabs

    var hash = window.location.hash;
    hash && $('ul.nav a[href="'+hash+'"]').tab('show');

    //highlight current nav
    $("#home a:contains('Home')").parent().addClass('active');
    $("#login a:contains('Login/Register')").parent().addClass('active');
    $("#contact a:contains('Contact Us')").parent().addClass('active');
    $("#help a:contains('Help')").parent().addClass('active');
    $("#philosophy a:contains('Our Philosophy')").parent().addClass('active');
    $("#get_started a:contains('How to get started')").parent().addClass('active');
    $("#cookie_policy a:contains('Cookie Policy')").parent().addClass('active');
    $("#privacy_policy a:contains('Privacy Policy')").parent().addClass('active');

    //admin
    $("#add_category a:contains('Ad')").parent().addClass('active');
    $("#add_category a:contains('Add New Category')").parent().addClass('active');

    $("#view_categories a:contains('Ad Categories)").parent().addClass('active');
    $("#view_categories a:contains('View Categories)").parent().addClass('active');

    $("#view_merchants a:contains('Merchants')").parent().addClass('active');
    $("#view_merchants a:contains('View Merchants')").parent().addClass('active');

    $("#view_ads a:contains('View Ads')").parent().addClass('active');
    $("#view_ads a:contains('Ads')").parent().addClass('active');

    //make menus drop automatically
    $('ul.nav li.dropdown').hover(function(){
        $('.dropdown-menu',this).fadeIn();
    },function(){
        $('.dropdown-menu',this).fadeOut('fast');
    });

    //login ajax
    $('#login-submit').click(function(e){
        e.preventDefault();

        var loginEmail = $('#login-email').val();
        var loginPassword = $('#login-password').val();

        $.ajax({
            url: 'php/includes/controllers/login.php?email='+loginEmail+'&password='+loginPassword,
            beforeSend: function(){
                //show loading gif image here
                $('#login-loader-gif').removeClass('loader-gif');
                $('#login-submit').addClass('disabled');
                $('#login-submit').val('logging in...');
            },
            success: function(data){
                //remove loading gif image
                $('#login-loader-gif').addClass('loader-gif');
                $('#login-submit').removeClass('disabled');
                $('#login-submit').val('Login');

                var dataObj = jQuery.parseJSON(data);
                console.log(dataObj);

                if(dataObj.user === 'admin'){

                    window.location = 'admin/';

                }else if(dataObj.user === 'merchant'){

                    window.location = 'merchant/';

                }else if(dataObj.user === "user"){

                    window.location = 'account/';

                }else if(dataObj.message === 'invalid login'){

                    alert('invalid login');
                    $('#login-password').val('');

                }

            }
        })
    });

    //create account ajax
    $('#c-register').click(function(e){
        e.preventDefault();

        var cEmail = $('#c-email').val();
        var cPassword = $('#c-password').val();
        var cRepeatPassword = $('#c-repeat-password').val();
        var cCell = $('#c-cell').val();

        //validation code here
        if(cPassword!==cRepeatPassword){
            alert('Your passwords do not match');
            return false;
        }

        $.ajax({
            url: 'php/includes/controllers/create_user.php?email='+cEmail+'&password='+cPassword+'&cell='+cCell,
            beforeSend: function(){
                //show loading gif image here
                $('#c-loader-gif').removeClass('loader-gif');
                $('#c-register').addClass('disabled');
                $('#c-register').val('Registering account...');
            },
            success: function(data){
                //remove loading gif image
                $('#c-loader-gif').addClass('loader-gif');
                $('#c-register').removeClass('disabled');
                $('#c-register').val('Register');

                var dataObj = jQuery.parseJSON(data);
                console.log(dataObj);

                if(dataObj.message === 'success'){
                    $('#c-email').val('');
                    $('#c-password').val('');
                    $('#c-repeat-password').val('');
                    $('#c-cell').val('');
                    alert('Account created successfully, an email has been sent to you, click the link to verify your account');

                }else if(dataObj.message === 'invalid email'){

                    alert('Invalid email address');

                }else if(dataObj.message === 'invalid cell'){
                    alert('Invalid cell number');
                }else if(dataObj.message === 'invalid password'){
                    alert('Your password should be at least 5 characters');
                }else if(dataObj.message === 'account already exists'){
                    alert('Your email is already associated with an account');
                }else if(dataObj.message === 'error'){
                    alert('An application error has occurred. Contact us if the error persists');
                }

            }
        })
    });





    //create account ajax for merchant
    $('#m-register').click(function(e){
        e.preventDefault();

        var mEmail = $('#m-email').val();
        var mPassword = $('#m-password').val();
        var mRepeatPassword = $('#m-repeat-password').val();
        var mCell = $('#m-cell').val();
        var mFirstName = $('#m-first-name').val();
        var mSurname = $('#m-surname').val();

        //validation code here
        if(mPassword!==mRepeatPassword){
            alert('Your passwords do not match');
            return false;
        }
        if(mPassword.length<5){
            alert('Your password is too short, use at least 5 characters');
        }

        $.ajax({
            url: 'php/includes/controllers/create_merchant.php?email='+mEmail+'&password='+mPassword+'&firstname='+mFirstName+'&surname='+mSurname+'&cell='+mCell,
            beforeSend: function(){
                //show loading gif image here
                $('#m-loader-gif').removeClass('loader-gif');
                $('#m-register').addClass('disabled');
                $('#m-register').val('Registering account...');
            },
            success: function(data){
                //remove loading gif image
                $('#m-loader-gif').addClass('loader-gif');
                $('#m-register').removeClass('disabled');
                $('#m-register').val('Register');

                var dataObj = jQuery.parseJSON(data);
                console.log(dataObj);

                if(dataObj.message === 'success'){
                    $('#m-email').val('');
                    $('#m-password').val('');
                    $('#m-repeat-password').val('');
                    $('#m-cell').val('');
                    alert('Account created successfully, an email has been sent to you, click the link to verify your account');

                }else if(dataObj.message === 'invalid email'){

                    alert('Invalid email address');

                }else if(dataObj.message === 'invalid cell'){
                    alert('Invalid cell number');
                }else if(dataObj.message === 'invalid password'){
                    alert('Your password should be at least 5 characters');
                }else if(dataObj.message === 'account already exists'){
                    alert('Your email is already associated with an account');
                }else if(dataObj.message === 'error'){
                    alert('An application error has occurred. Contact us if the error persists');
                }else if(dataObj.message==='invalid name'){
                    alert('Invalid first name');
                }else if(dataObj.message==='invalid surname'){
                    alert('Invalid surname');
                }

            }
        })
    });


    //process search form routing
    $('#search-submit').click(function(e){
        e.preventDefault();
        var categoryId = $('#search-category').val();
        var searchTerm = $('#category-search-term').val();
        var Txy = $('#search-hash').val();
        var token = $('#search-timestamp').val();

        window.location='list.php?categoryid='+categoryId+'&token='+token+'&Txy='+Txy+'&search='+searchTerm;

    });


    //update likes handling code
    $('.like-badge').click(function(e){
        e.preventDefault();

        var likes =$(this).attr('data-likes');
        var id = $(this).attr('id');

        $.ajax({
            url: 'update_favs.php?likes='+likes+'&id='+id,

            beforeSend: function(){

            },

            success: function(data){
                var dataObj = jQuery.parseJSON(data);

                if(dataObj.message==='success'){
                    $('#'+id).children('span').html(dataObj.likes);
                }
            }
        });
    });

    //sent message to seller ajax
    $('#sm-send').click(function(e){
        e.preventDefault();

        var userToId = $('#sm-user-id').val();
        var adId = $('#sm-ad-id').val();
        var description = $('#sm-message').val();
        var cell = $('#sm-cell').val();

        if(description===null||description===''){
            alert('Please enter a message');

            return false;
        }

        $.ajax({
            url: 'sent_message.php?userToId='+userToId+'&adId='+adId+'&description='+description+'&cell='+cell,

            beforeSend: function(){

                $('#sm-send').val('Sending your message...');
                $('#sm-send').addClass('disabled');

            },

            success: function(data){
                var dataObj = jQuery.parseJSON(data);

                $('#sm-send').removeClass('disabled');

                if(dataObj.message==='success'){
                    $('#sm-send').val('Message sent successfully');
                    $('#sm-message').val('');
                    $('#sm-cell').val('');
                }else if(dataObj.message==='error'){
                    $('#sm-send').val('Error, try again');
                }else if(dataObj.validation==='fail'){
                    alert('Please enter a valid cell number');
                    $('#sm-send').val('Send');
                }
            }
        });
    });



    //delete ad confirmation handler
    $('.m-delete-ad').click(function(){
        var con = confirm('Are you sure you want to delete this ad');
        if(con===true){
            return true;
        }else{
            return false;
        }

    });


});