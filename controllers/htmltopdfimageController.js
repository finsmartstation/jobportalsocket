const nodeHtmlToImage = require('node-html-to-image');
const PuppeteerHTMLPDF = require('puppeteer-html-pdf');
const pdf2img = require('pdf-img-convert');
const fs = require('fs').promises;
const fileSystem = require('fs');
const env = require('dotenv').config();
const baseURLProfilePic = process.env.PROFILEPICBASEURL;
const appURL = process.env.APPURL;
const queries = require('../models/queries/queries');
const utils = require('../utils/commonUtils');
async function generateImage(req, res) {
    console.log(req.body)
    console.log('hello world')
    var html = `<!doctype html>
    <html lang="en" data-bs-theme="auto">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="description" content="">
        <meta name="author" content="CV">
        <meta name="generator" content="CV">
        <title>CV Template</title>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet"
            integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous">
    
        <!-- Custom styles for this template -->
        <!-- <link href="custom.css" rel="stylesheet"> -->
        <style>
            @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap');
            body{font-size:14px}
    .sidePane{width: calc(188px * 1.4); background: #596977; color: #fff;}
      h2{font-size: 18px; font-weight: 700; }
      h3 { font-size: 16px;font-weight: 700;}
      h4{font-size: 14px;}
      h5{font-size: 12px;}
      .sidePane .details{ color: rgba(255, 255, 255, 0.7); font-weight: normal;}
    .avatar{
        width: 56px; height: 56px; display: inline-flex;border-radius: 100%;
        overflow: hidden;
    }
    .checked {
        color : #FFFFFF;
        font-size : 20px;
    }
    .unchecked {
        font-size : 20px;
        color: #768491;
    }
    section[role="content"]{
        color: rgba(0, 0, 0, 0.7);
    }
    section[role="content"] h2{color: rgba(0, 0, 0, 1);}
    .black{color: #000;}
    section[role="content"] .checked{color:#768491}
    section[role="content"] .unchecked {color:#DCDDDD}
    
    /* for print media */
    @media print {
        body{font-size:12px;}
        .shadow-lg.my-4{box-shadow: none; margin: 0 !important;}
    }
    @page {
        size:A4;
        margin-left: 0px;
        margin-right: 0px;
        margin-top: 0px;
        margin-bottom: 0px;
        margin: 0;
        -webkit-print-color-adjust: exact;
    }

    body {
        width: 21cm; /* A4 width */
        /*height: 29.7cm;*/ /* A4 height */
        margin: 0 auto;
        padding: 1cm; /* Padding to ensure content stays within A4 size */
        box-sizing: border-box;
    }
        </style>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">  
       
    </head>
    
    <body>
    
        <main>
    
            <div class="container shadow-lg my-4" style="max-width: 860px;">
                    <div class="row">
                        <div class="col-3 sidePane">
                            <div class="p-5 my-3">
                                <section>
                                    <div class="avatar mb-3">
                                        <img alt="profile" class="img-fluid" src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/1931674c-b4c7-4333-b2b7-7b4c4399ec48/dg2zdsz-82187bcb-2f96-4f40-889f-fbbdc5da899a.png/v1/fill/w_894,h_894,q_70,strp/beautiful_avatar_profilepicture_by_ventulart_dg2zdsz-pre.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzE5MzE2NzRjLWI0YzctNDMzMy1iMmI3LTdiNGM0Mzk5ZWM0OFwvZGcyemRzei04MjE4N2JjYi0yZjk2LTRmNDAtODg5Zi1mYmJkYzVkYTg5OWEucG5nIiwiaGVpZ2h0IjoiPD05MDAiLCJ3aWR0aCI6Ijw9OTAwIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmltYWdlLndhdGVybWFyayJdLCJ3bWsiOnsicGF0aCI6Ilwvd21cLzE5MzE2NzRjLWI0YzctNDMzMy1iMmI3LTdiNGM0Mzk5ZWM0OFwvdmVudHVsYXJ0LTQucG5nIiwib3BhY2l0eSI6OTUsInByb3BvcnRpb25zIjowLjQ1LCJncmF2aXR5IjoiY2VudGVyIn19.3H5X5AsiXo9dpk8_NnWcecMgv7qPFO1BzdPJ-mpO2VI">
                                    </div>
                                    <h2>Taylor Stimbert</h2>
                                    <p class="details mt-0">Product Designer</p>
                                </section>
                            <section role="main">
                                <section class="mt-5">
                                    <h2>Details</h2>
                                </section>
                                <section class="mt-3">
                                    <h4 class="title mt-3">Address</h4>
                                    <p class="details">San Francisco, California</p>
                                </section>
                                <section class="mt-3">
                                    <h4 class="title mt-3">Phone</h4>
                                    <p class="details">(315) 802-8179</p>
                                </section>
                                <section class="mt-3">
                                    <h4 class="title mt-3">Email</h4>
                                    <p class="details">tstimbert@gmail.com</p>
                                </section>
                            </section>
                            <section role="main">
                                    <section class="mt-5">
                                        <h2>Skills</h2>
                                    </section>
                                    <section class="mt-3">
                                        <h4 class="title mt-3 details p">Figma</h4>
                                        <p class=" rating">
                                            <span class = "fa fa-star checked"></span>
                                            <span class = "fa fa-star checked"></span>
                                            <span class = "fa fa-star checked"></span>
                                            <!-- To display unchecked star rating icons -->
                                            <span class = "fa fa-star unchecked"></span>
                                            <span class = "fa fa-star unchecked"></span>
                                        </p>
                                    </section>
                                    <section class="mt-3">
                                        <h4 class="title mt-3 details">Sketch</h4>
                                        <p class=" rating">
                                            <span class = "fa fa-star checked"></span>
                                            <span class = "fa fa-star checked"></span>
                                            <span class = "fa fa-star checked"></span>
                                            <!-- To display unchecked star rating icons -->
                                            <span class = "fa fa-star unchecked"></span>
                                            <span class = "fa fa-star unchecked"></span>
                                        </p>
                                    </section>
                                    <section class="mt-3">
                                        <h4 class="title mt-3 details">Adobe Photoshop</h4>
                                        <p class=" rating">
                                            <span class = "fa fa-star checked"></span>
                                            <span class = "fa fa-star checked"></span>
                                            <span class = "fa fa-star checked"></span>
                                            <!-- To display unchecked star rating icons -->
                                            <span class = "fa fa-star unchecked"></span>
                                            <span class = "fa fa-star unchecked"></span>
                                        </p>
                                    </section>
                                    <section class="mt-3">
                                        <h4 class="title mt-3 details">Adobe Illustrator</h4>
                                        <p class=" rating">
                                            <span class = "fa fa-star checked"></span>
                                            <span class = "fa fa-star checked"></span>
                                            <span class = "fa fa-star checked"></span>
                                            <!-- To display unchecked star rating icons -->
                                            <span class = "fa fa-star unchecked"></span>
                                            <span class = "fa fa-star unchecked"></span>
                                        </p>
                                    </section>
                                    <section class="mt-3">
                                        <h4 class="title mt-3 details">Principle</h4>
                                        <p class=" rating">
                                            <span class = "fa fa-star checked"></span>
                                            <span class = "fa fa-star checked"></span>
                                            <span class = "fa fa-star checked"></span>
                                            <!-- To display unchecked star rating icons -->
                                            <span class = "fa fa-star unchecked"></span>
                                            <span class = "fa fa-star unchecked"></span>
                                        </p>
                                    </section>
                                    <section class="mt-3">
                                        <h4 class="title mt-3 details">Adobe XD</h4>
                                        <p class=" rating">
                                            <span class = "fa fa-star checked"></span>
                                            <span class = "fa fa-star checked"></span>
                                            <span class = "fa fa-star checked"></span>
                                            <!-- To display unchecked star rating icons -->
                                            <span class = "fa fa-star unchecked"></span>
                                            <span class = "fa fa-star unchecked"></span>
                                        </p>
                                    </section>
                            </section>
    
                            <section role="main">
                                    <section class="mt-5">
                                        <h2>Certifications</h2>
                                    </section>
                                    <section class="mt-3">
                                        <p class="details">Google UX Design Certificate</p>
                                    </section>
                            
                            </section>
    
                            </div>
                        </div>
                        <div class="col">
                            <div class="p-5 my-3">
                               <section role="content">
                                    <section>
                                        <h2 class="mb-3">Objective</h2>
                                        <p>I'm a product designer focused on ensuring great user experience and meeting business needs of designed products.
                                            I’m also experienced in implementing marketing strategies and developing both on and offline campaigns. My
                                            philosophy is to make products understandable, useful and long-lasting at the same time recognizing they're
                                            never finished and constantly changing. I'm always excited to face new challenges and problems.</p>
                                    </section>
                                    <section>
                                        <h2 class="mb-3 mt-5">Experience</h2>
                                        <div>
                                            <h4 class="black">Uber</h4>
                                            <p class="black">Product Designer</p>
                                            <p>Mar 2015 - Present</p>
                                            <ul>
                                                <li> Designed safety-focused experiences for Riders and Drivers </li> 
                                                <li> Physical space problem solving and it’s interaction with the digital </li>
                                                <li>Navigated organization to achieve operational improvements </li>
                                            </ul>
                                        </div>
                                        <div class="mt-4">
                                            <h4 class="black">IFTTT </h4>
                                            <p class="black">Product Designer</p>
                                            <p>Dec 2013 - Mar 2015</p>
                                            <ul>
                                                <li> Designed safety-focused experiences for Riders and Drivers </li> 
                                                <li> Physical space problem solving and it’s interaction with the digital </li>
                                                <li>Navigated organization to achieve operational improvements </li>
                                            </ul>
                                        </div>
                                        <div class="mt-4">
                                            <h4 class="black">Google Maps </h4>
                                            <p class="black">Product Designer</p>
                                            <p>June 2012 - Sep 2013</p>
                                            <ul>
                                                <li> Designed safety-focused experiences for Riders and Drivers </li> 
                                                <li> Physical space problem solving and it’s interaction with the digital </li>
                                                <li>Navigated organization to achieve operational improvements </li>
                                            </ul>
                                        </div>
                                        
                                    </section>
                                    <section>
                                        <h2 class="mb-3 mt-5">Education</h2>
                                        <div>
                                            <h4 class="black">Brown University</h4>
                                            <p>Interdisciplinary studies, Sep 2010 - May 2013</p>
                                        </div>
                                        
                                    </section>
                                    <section>
                                        <h2 class="mb-3 mt-5">Language</h2>
                                        <div class="d-flex align-items-center">
                                                <h4 class="title details p m-0">English</h4>
                                                <p class=" rating m-0 ps-5 ms-4 position-absolute">
                                                    <span class = "fa fa-star checked"></span>
                                                    <span class = "fa fa-star checked"></span>
                                                    <span class = "fa fa-star checked"></span>
                                                    <!-- To display unchecked star rating icons -->
                                                    <span class = "fa fa-star checked"></span>
                                                    <span class = "fa fa-star unchecked"></span>
                                                </p>
                                        </div>
                                        <div class="d-flex align-items-center mt-3">
                                            <h4 class="title details p m-0">Italian</h4>
                                            <p class=" rating m-0 ps-5 ms-4 position-absolute">
                                                <span class = "fa fa-star checked"></span>
                                                <span class = "fa fa-star checked"></span>
                                                <span class = "fa fa-star checked"></span>
                                                <!-- To display unchecked star rating icons -->
                                                <span class = "fa fa-star checked"></span>
                                                <span class = "fa fa-star unchecked"></span>
                                            </p>
                                    </div>
                                    </section>
                                </section>
                            </div>
                            
                        </div>
                    </div>
            </div>
               
    
        </main>
    
    </body>
    
    </html>`;
    var arr = [];
    for (var i = 0; i <= 3; i++) {
        // await convertHtmlToImage('images/a4_'+i+'.png',html).then((result)=>{
        //     console.log('sucess',result)
        //     if(result){
        //         arr.push(i+'.png')
        //     }

        // })
        convertHtmlToPdf(i + '.pdf');

    }
    console.log(arr)
    res.json({
        status: true,
        messsage: 'success'
    })
}

async function generatePreviewPdfAndImage(req, res) {
    //{"user_id":"1","access_token":"1","template_id":"1","color_code":"#596977","file_name":"","first_name":"gokul","last_name":"pandei","dob":"1998","gender":"male","country":"india","state":"maharastra","city":"Bhokardan","pincode":"431114","address":"ran nivas,house num:2089,Bhokardan","email":"gokul.1998@gmail.com","other_contact":"9876543210","profile_pic":"uploads/job_seeker/6/profilepic/FILE_20231122145934.png","disabled":"0","disability_type":"none","objective":"To secure a challenging position in a reputable organization to expand my learnings, knowledge, and skills. I want to succeed in a stimulating and challenging environment that will provide me with advancement opportunities. I want to excel in this field with hard work, perseverance and dedication. I want a highly rewarding career where I can use my skills and knowledge for organizational and personal growth.","education":[{"qualification":"btech","course_name":"Computer science and engineering","institution":"IIT DELHI","country":"india","cgpa":"8.8","academic_year":"2018-2022"}],"experience":[{"position":"software developer","company_name":"carestack","country":"indian","start_date":"2019-04-11","end_date":"2021-04-11","responsilbilities":["Designed safety-focused experiences for Riders and Drivers", "Physical space problem solving and it’s interaction with the digital", "Navigated organization to achieve operational improvements"],"document":"img(1).img"},{"position":"Senior software developer","company_name":"carestack","country":"indian","start_date":"2021-05-11","end_date":"0000-00-00","responsilbilities":["Designed safety-focused experiences for Riders and Drivers", "Physical space problem solving and it’s interaction with the digital", "Navigated organization to achieve operational improvements"],"document":"img(1).img"}],"skill":[{"skill":"Python","rating":"5","rating_status":"1"},{"skill":"Angular","rating":"3","rating_status":"1"},{"skill":"Php","rating":"4","rating_status":"1"}],"certificate":[{"document_type":"google uc design certificate","document_path":"certificate(1).img","year":"2020"},{"document_type":"google uc design data","document_path":"certificate(1).img","year":"2020"}],"language":[{"language":"English","rating":"5","rating_status":"1"},{"language":"Tamil","rating":"4","rating_status":"1"},{"language":"Malayalam","rating":"4","rating_status":"1"}],"additional_feature":[{"type":"Hobbies","type_description":"hjsb","icon":"icon1","show_status":"1","status":"1"},{"type":"Achievement","type_description":"Rank holder in UG","icon":"icon1","show_status":"1","status":"1"}]}
    try {
        //set data to templates
        var body = req.body ? req.body : {};
        var response_data = [];
        console.log('body', body, typeof (body), Object.keys(body).length)
        if (typeof (body) == 'object' && Object.keys(body).length > 0) {
            var current_datetime = await utils.current_datetime();
            var user_id = body.user_id ? body.user_id : '';
            var access_token = body.access_token ? body.access_token : '';
            var profile_pic = body.profile_pic ? body.profile_pic : '';
            var first_name = body.first_name ? body.first_name : '';
            var last_name = body.last_name ? body.last_name : '';
            var address = body.address ? body.address : '';
            var username = first_name + ' ' + last_name;
            var email = body.email ? body.email : '';
            var skill = body.skills ? body.skills : [];
            var certificate = body.certificate ? body.certificate : [];
            var objective = body.objective ? body.objective : '';
            var experience = body.experience ? body.experience : [];
            var education = body.education ? body.education : [];
            var language = body.language ? body.language : [];
            var additional_feature = body.additional_feature ? body.additional_feature : [];
            //var other_contact = body.other_contact ? body.other_contact : '';
            var other_contact = body.phone ? body.phone : '';
            var template_id = body.template_id ? body.template_id : '';
            var color_code = body.color_code ? body.color_code : '';
            var disabled=body.disabled ? body.disabled : 0;
            var disability_type=body.disability_type ? body.disability_type : '';                                              
            var profile_flag_status = false;
            var skill_flag_status = false;
            var certificate_flag_status = false;
            var experience_flag_status = false;
            var education_flag_status = false;
            var language_flag_status = false;
            var additional_feature_flag_status = false;
            var objective_flag_status = false;
            console.log(skill)
            if (profile_pic != '') {
                profile_pic = baseURLProfilePic + profile_pic;
                profile_flag_status = true;
            }
            if (skill.length > 0) {
                skill_flag_status = true;
            }
            if (certificate.length > 0) {
                certificate_flag_status = true;
            }
            if (experience.length > 0) {
                experience_flag_status = true;
            }
            if (education.length > 0) {
                education_flag_status = true;
            }
            if (language.length > 0) {
                language_flag_status = true;
            }
            if (additional_feature.length > 0) {
                additional_feature_flag_status = true;
            }
            if (objective != '') {
                objective_flag_status = true;
            }
            if (template_id != '') {
                var check_user_data = await queries.checkUserData(user_id, access_token)
                if (check_user_data.length > 0) {
                    var contact_number = check_user_data[0].country_code + check_user_data[0].phone;
                    let html_code = '';
                    let template_available_flag = false;
                    if (template_id == 1) {
                        html_code = await template1(color_code, username, profile_flag_status, profile_pic, address, email, other_contact, skill_flag_status, skill, certificate_flag_status, certificate, objective_flag_status, objective, experience_flag_status, experience, education_flag_status, education, language_flag_status, language, additional_feature_flag_status, additional_feature,disabled,disability_type);
                        template_available_flag = true;
                    } else if (template_id == 2) {
                        html_code = await template2(color_code, username, profile_flag_status, profile_pic, address, email, other_contact, skill_flag_status, skill, certificate_flag_status, certificate, objective_flag_status, objective, experience_flag_status, experience, education_flag_status, education, language_flag_status, language, additional_feature_flag_status, additional_feature,disabled,disability_type);
                        template_available_flag = true;
                    } else if (template_id == 3) {
                        html_code = await template3(color_code, username, profile_flag_status, profile_pic, address, email, other_contact, skill_flag_status, skill, certificate_flag_status, certificate, objective_flag_status, objective, experience_flag_status, experience, education_flag_status, education, language_flag_status, language, additional_feature_flag_status, additional_feature,disabled,disability_type);
                        template_available_flag = true;
                    } else if (template_id == 4) {
                        html_code = await template4(color_code, username, profile_flag_status, profile_pic, address, email, other_contact, skill_flag_status, skill, certificate_flag_status, certificate, objective_flag_status, objective, experience_flag_status, experience, education_flag_status, education, language_flag_status, language, additional_feature_flag_status, additional_feature,disabled,disability_type);
                        template_available_flag = true;
                    } else if (template_id == 5) {
                        html_code = await template5(color_code, username, profile_flag_status, profile_pic, address, email, other_contact, skill_flag_status, skill, certificate_flag_status, certificate, objective_flag_status, objective, experience_flag_status, experience, education_flag_status, education, language_flag_status, language, additional_feature_flag_status, additional_feature,disabled,disability_type);
                        template_available_flag = true;
                    } else if (template_id == 6) {
                        html_code = await template6(color_code, username, profile_flag_status, profile_pic, address, email, other_contact, skill_flag_status, skill, certificate_flag_status, certificate, objective_flag_status, objective, experience_flag_status, experience, education_flag_status, education, language_flag_status, language, additional_feature_flag_status, additional_feature,disabled,disability_type);
                        template_available_flag = true;
                    } else if (template_id == 7) {
                        html_code = await template7(color_code, username, profile_flag_status, profile_pic, address, email, other_contact, skill_flag_status, skill, certificate_flag_status, certificate, objective_flag_status, objective, experience_flag_status, experience, education_flag_status, education, language_flag_status, language, additional_feature_flag_status, additional_feature,disabled,disability_type);
                        template_available_flag = true;
                    } else if (template_id == 8) {
                        html_code = await template8(color_code, username, profile_flag_status, profile_pic, address, email, other_contact, skill_flag_status, skill, certificate_flag_status, certificate, objective_flag_status, objective, experience_flag_status, experience, education_flag_status, education, language_flag_status, language, additional_feature_flag_status, additional_feature,disabled,disability_type);
                        template_available_flag = true;
                    } else if (template_id == 9) {
                        html_code = await template9(color_code, username, profile_flag_status, profile_pic, address, email, other_contact, skill_flag_status, skill, certificate_flag_status, certificate, objective_flag_status, objective, experience_flag_status, experience, education_flag_status, education, language_flag_status, language, additional_feature_flag_status, additional_feature,disabled,disability_type);
                        template_available_flag = true;
                    } else if (template_id == 10) {
                        //console.time("template10")
                        html_code = await template10(color_code, username, profile_flag_status, profile_pic, address, email, other_contact, skill_flag_status, skill, certificate_flag_status, certificate, objective_flag_status, objective, experience_flag_status, experience, education_flag_status, education, language_flag_status, language, additional_feature_flag_status, additional_feature,disabled,disability_type);
                        template_available_flag = true;
                        //console.timeEnd("template10");
                    } else if (template_id == 11) {
                        html_code = await template11(color_code, username, profile_flag_status, profile_pic, address, email, other_contact, skill_flag_status, skill, certificate_flag_status, certificate, objective_flag_status, objective, experience_flag_status, experience, education_flag_status, education, language_flag_status, language, additional_feature_flag_status, additional_feature,disabled,disability_type);
                        template_available_flag = true;
                    } else if (template_id == 12) {
                        html_code = await template12(color_code, username, profile_flag_status, profile_pic, address, email, other_contact, skill_flag_status, skill, certificate_flag_status, certificate, objective_flag_status, objective, experience_flag_status, experience, education_flag_status, education, language_flag_status, language, additional_feature_flag_status, additional_feature,disabled,disability_type);
                        template_available_flag = true;
                    } else if (template_id == 13) {
                        html_code = await template13(color_code, username, profile_flag_status, profile_pic, address, email, other_contact, skill_flag_status, skill, certificate_flag_status, certificate, objective_flag_status, objective, experience_flag_status, experience, education_flag_status, education, language_flag_status, language, additional_feature_flag_status, additional_feature,disabled,disability_type);
                        template_available_flag = true;
                    } else if (template_id == 14) {
                        html_code = await template14(color_code, first_name, last_name, username, profile_flag_status, profile_pic, address, email, other_contact, skill_flag_status, skill, certificate_flag_status, certificate, objective_flag_status, objective, experience_flag_status, experience, education_flag_status, education, language_flag_status, language, additional_feature_flag_status, additional_feature,disabled,disability_type);
                        template_available_flag = true;
                    } else if (template_id == 15) {
                        html_code = await template15(color_code, first_name, last_name, username, profile_flag_status, profile_pic, address, email, other_contact, skill_flag_status, skill, certificate_flag_status, certificate, objective_flag_status, objective, experience_flag_status, experience, education_flag_status, education, language_flag_status, language, additional_feature_flag_status, additional_feature,disabled,disability_type);
                        template_available_flag = true;
                    } else if (template_id == 16) {
                        html_code = await template16(color_code, first_name, last_name, username, profile_flag_status, profile_pic, address, email, other_contact, skill_flag_status, skill, certificate_flag_status, certificate, objective_flag_status, objective, experience_flag_status, experience, education_flag_status, education, language_flag_status, language, additional_feature_flag_status, additional_feature,disabled,disability_type);
                        template_available_flag = true;
                    } else if (template_id == 17) {
                        html_code = await template17(color_code, first_name, last_name, username, profile_flag_status, profile_pic, address, email, other_contact, skill_flag_status, skill, certificate_flag_status, certificate, objective_flag_status, objective, experience_flag_status, experience, education_flag_status, education, language_flag_status, language, additional_feature_flag_status, additional_feature,disabled,disability_type);
                        template_available_flag = true;
                    } else if (template_id == 18) {
                        html_code = await template18(color_code, first_name, last_name, username, profile_flag_status, profile_pic, address, email, other_contact, skill_flag_status, skill, certificate_flag_status, certificate, objective_flag_status, objective, experience_flag_status, experience, education_flag_status, education, language_flag_status, language, additional_feature_flag_status, additional_feature,disabled,disability_type);
                        template_available_flag = true;
                    } else if (template_id == 19) {
                        html_code = await template19(color_code, first_name, last_name, username, profile_flag_status, profile_pic, address, email, other_contact, skill_flag_status, skill, certificate_flag_status, certificate, objective_flag_status, objective, experience_flag_status, experience, education_flag_status, education, language_flag_status, language, additional_feature_flag_status, additional_feature,disabled,disability_type);
                        template_available_flag = true;
                    } else if (template_id == 20) {
                        html_code = await template20(color_code, first_name, last_name, username, profile_flag_status, profile_pic, address, email, other_contact, skill_flag_status, skill, certificate_flag_status, certificate, objective_flag_status, objective, experience_flag_status, experience, education_flag_status, education, language_flag_status, language, additional_feature_flag_status, additional_feature,disabled,disability_type);
                        template_available_flag = true;
                    }

                    if (template_available_flag) {
                        var random_code = await utils.getRandomUniqueFiveDigitCode();
                        var set_file_name = 'Docpreview' + user_id + random_code + '.pdf';
                        var file_path = 'uploads/' + set_file_name;
                        //console.time("htmltopdf");
                        var htmltopdf = await convertHtmlToPdf(file_path, html_code);
                        //console.timeEnd("htmltopdf");
                        if (htmltopdf) {
                            var preview_images = [];
                            var pdftoimage = await convertPdfToImage(user_id, file_path);
                            for (var image_i = 0; image_i < pdftoimage.length; image_i++) {
                                if (pdftoimage[image_i] != '') {
                                    preview_images.push(appURL + pdftoimage[image_i]);
                                }
                            }
                            console.log('pdf to image ', pdftoimage);
                            console.log(current_datetime)
                            //save to temporary files db
                            var save_preview_pdf_files_data = await queries.savePreviewData(current_datetime, user_id, file_path);
                            var preview_image_query = '';
                            for (var i = 0; i < pdftoimage.length; i++) {
                                preview_image_query = preview_image_query + "('" + current_datetime + "','" + user_id + "','" + pdftoimage[i] + "'),";
                            }
                            preview_image_query = preview_image_query.replace(/(^,)|(,$)/g, "");
                            let query = "INSERT INTO `temporary_preview_cv`(`created_datetime`, `user_id`, `path`) VALUES " + preview_image_query + ";";
                            console.log(query);
                            //save the preview data
                            let save_preview_data = await queries.executePreviewQuery(query);
                            // if(save_preview_data>0){

                            // }else{

                            // }
                            res.json({
                                status: true,
                                statuscode: 200,
                                message: 'success',
                                data: {
                                    file_path: appURL + file_path,
                                    image_path: preview_images
                                }
                            })
                        } else {
                            res.json({
                                status: false,
                                statuscode: 200,
                                messsage: 'Unable to create pdf file',
                                data: {}
                            });
                        }
                    } else {
                        res.json({
                            status: false,
                            statuscode: 200,
                            message: "Template id doesn't available",
                            data: {}
                        })
                    }
                } else {
                    res.json({
                        status: false,
                        statuscode: 200,
                        messsage: 'No user data found',
                        data: {}
                    });
                }
            } else {
                res.json({
                    status: false,
                    statuscode: 200,
                    messsage: 'No template id',
                    data: {}
                });
            }

        } else {
            res.json({
                status: false,
                statuscode: 400,
                message: 'Input data is missing',
                data: {}
            });
        }
    } catch (e) {
        console.log(`Error occurs in generate pdf and image function ${e}`)
        res.json({
            status: false,
            statuscode: 400,
            message: `Error occurs in generate pdf and image function ${e}`,
            data: {}
        })
    }
}

async function generatePreviewPdfAndImage_old(req, res) {
    //{"user_id":"1","access_token":"1","template_id":"1","color_code":"#596977","file_name":"","first_name":"gokul","last_name":"pandei","dob":"1998","gender":"male","country":"india","state":"maharastra","city":"Bhokardan","pincode":"431114","address":"ran nivas,house num:2089,Bhokardan","email":"gokul.1998@gmail.com","other_contact":"9876543210","profile_pic":"uploads/job_seeker/6/profilepic/FILE_20231122145934.png","disabled":"0","disability_type":"none","objective":"To secure a challenging position in a reputable organization to expand my learnings, knowledge, and skills. I want to succeed in a stimulating and challenging environment that will provide me with advancement opportunities. I want to excel in this field with hard work, perseverance and dedication. I want a highly rewarding career where I can use my skills and knowledge for organizational and personal growth.","education":[{"qualification":"btech","course_name":"Computer science and engineering","institution":"IIT DELHI","country":"india","cgpa":"8.8","academic_year":"2018-2022"}],"experience":[{"position":"software developer","company_name":"carestack","country":"indian","start_date":"2019-04-11","end_date":"2021-04-11","responsilbilities":["Designed safety-focused experiences for Riders and Drivers", "Physical space problem solving and it’s interaction with the digital", "Navigated organization to achieve operational improvements"],"document":"img(1).img"},{"position":"Senior software developer","company_name":"carestack","country":"indian","start_date":"2021-05-11","end_date":"0000-00-00","responsilbilities":["Designed safety-focused experiences for Riders and Drivers", "Physical space problem solving and it’s interaction with the digital", "Navigated organization to achieve operational improvements"],"document":"img(1).img"}],"skill":[{"skill":"Python","rating":"5","rating_status":"1"},{"skill":"Angular","rating":"3","rating_status":"1"},{"skill":"Php","rating":"4","rating_status":"1"}],"certificate":[{"document_type":"google uc design certificate","document_path":"certificate(1).img","year":"2020"},{"document_type":"google uc design data","document_path":"certificate(1).img","year":"2020"}],"language":[{"language":"English","rating":"5","rating_status":"1"},{"language":"Tamil","rating":"4","rating_status":"1"},{"language":"Malayalam","rating":"4","rating_status":"1"}],"additional_feature":[{"type":"Hobbies","type_description":"hjsb","icon":"icon1","show_status":"1","status":"1"},{"type":"Achievement","type_description":"Rank holder in UG","icon":"icon1","show_status":"1","status":"1"}]}
    try {
        //set data to templates
        var body = req.body ? req.body : {};
        var response_data = [];
        console.log('body', body, typeof (body), Object.keys(body).length)
        if (typeof (body) == 'object' && Object.keys(body).length > 0) {
            var user_id = body.user_id ? body.user_id : '';
            var access_token = body.access_token ? body.access_token : '';
            var profile_pic = body.profile_pic ? body.profile_pic : '';
            var first_name = body.first_name ? body.first_name : '';
            var last_name = body.last_name ? body.last_name : '';
            var address = body.address ? body.address : '';
            var username = first_name + ' ' + last_name;
            var email = body.email ? body.email : '';
            var skill = body.skill ? body.skill : [];
            var certificate = body.certificate ? body.certificate : [];
            var objective = body.objective ? body.objective : '';
            var experience = body.experience ? body.experience : [];
            var education = body.education ? body.education : [];
            var language = body.language ? body.language : [];
            var additional_feature = body.additional_feature ? body.additional_feature : [];
            var other_contact = body.other_contact ? body.other_contact : '';
            var profile_flag_status = false;
            var skill_flag_status = false;
            var certificate_flag_status = false;
            var experience_flag_status = false;
            var education_flag_status = false;
            var language_flag_status = false;
            var additional_feature_flag_status = false;
            var objective_flag_status = false;
            console.log(skill)
            if (profile_pic != '') {
                profile_pic = baseURLProfilePic + profile_pic;
                profile_flag_status = true;
            }
            if (skill.length > 0) {
                skill_flag_status = true;
            }
            if (certificate.length > 0) {
                certificate_flag_status = true;
            }
            if (experience.length > 0) {
                experience_flag_status = true;
            }
            if (education.length > 0) {
                education_flag_status = true;
            }
            if (language.length > 0) {
                language_flag_status = true;
            }
            if (additional_feature.length > 0) {
                additional_feature_flag_status = true;
            }
            if (objective != '') {
                objective_flag_status = true;
            }
            var check_user_data = await queries.checkUserData(user_id, access_token)
            if (check_user_data.length > 0) {
                var contact_number = check_user_data[0].country_code + check_user_data[0].phone;
                //background: #67D6E0;

                var color_code = ['#596977', '#03A9F4', '#67D6E0', '#5E6A75'];
                var color_variants = [];
                for (var i = 0; i < color_code.length; i++) {
                    console.log(color_code[i])
                    var template_1 = await template1(color_code[i], username, profile_flag_status, profile_pic, address, email, other_contact, skill_flag_status, skill, certificate_flag_status, certificate, objective_flag_status, objective, experience_flag_status, experience, education_flag_status, education, language_flag_status, language, additional_feature_flag_status, additional_feature);
                    console.log(template_1)
                    var code = await utils.getRandomUniqueFiveDigitCode();
                    var file_name = 'uploads/template1_' + user_id + code + '.pdf';
                    var htmltopdf = await convertHtmlToPdf(file_name, template_1);
                    if (htmltopdf) {
                        var pdftoimage = await convertPdfToImage(user_id, file_name);
                        console.log('pdf to image ', pdftoimage);
                        color_variants.push({
                            color: color_code[i],
                            peview_data: pdftoimage,
                            pdf: appURL + file_name
                        })
                    }
                }
                var template1_res = {
                    template_id: "1",
                    template_name: "one",
                    template_url: "https://creativeapplab.in/job_portal/api/uploads/job_seeker/2/resume/FILE_20231213103548.png",
                    color_variants: color_variants
                }
                response_data.push(template1_res);

                //template 2
                var template2_color_code = ['#272727'];
                var template2_color_variants = [];
                for (var j = 0; j < template2_color_code.length; j++) {
                    var template_2 = await template2(template2_color_code[j], username, profile_flag_status, profile_pic, address, email, other_contact, skill_flag_status, skill, certificate_flag_status, certificate, objective_flag_status, objective, experience_flag_status, experience, education_flag_status, education, language_flag_status, language, additional_feature_flag_status, additional_feature);
                    var template2_code = await utils.getRandomUniqueFiveDigitCode();
                    var template2_file_name = 'uploads/template2_' + user_id + template2_code + '.pdf';
                    var htmltopdf_template2 = await convertHtmlToPdf(template2_file_name, template_2);
                    if (htmltopdf_template2) {
                        var pdftoimage_template2 = await convertPdfToImage(user_id, template2_file_name);
                        template2_color_variants.push({
                            color: template2_color_code[j],
                            preview_data: pdftoimage_template2,
                            pdf: appURL + template2_file_name
                        })
                    }
                }

                var template2_res = {
                    template_id: "2",
                    template_name: "two",
                    template_url: "https://creativeapplab.in/job_portal/api/uploads/job_seeker/2/resume/FILE_20231213103548.png",
                    color_variants: template2_color_variants
                }
                response_data.push(template2_res);

                //template 3
                var template3_color_code = [''];
                var template3_color_variants = [];
                for (var k = 0; k < template3_color_code.length; k++) {
                    var template_3 = await template3(template3_color_code[j], username, profile_flag_status, profile_pic, address, email, other_contact, skill_flag_status, skill, certificate_flag_status, certificate, objective_flag_status, objective, experience_flag_status, experience, education_flag_status, education, language_flag_status, language, additional_feature_flag_status, additional_feature);
                    var template3_code = await utils.getRandomUniqueFiveDigitCode();
                    var template3_file_name = 'uploads/template2_' + user_id + template3_code + '.pdf';
                    var htmltopdf_template3 = await convertHtmlToPdf(template3_file_name, template_3);
                    if (htmltopdf_template3) {
                        var pdftoimage_template3 = await convertPdfToImage(user_id, template3_file_name);
                        template3_color_variants.push({
                            color: template3_color_code[j],
                            preview_data: pdftoimage_template3,
                            pdf: appURL + template3_file_name
                        })
                    }
                }

                var template3_res = {
                    template_id: "3",
                    template_name: "three",
                    template_url: "https://creativeapplab.in/job_portal/api/uploads/job_seeker/2/resume/FILE_20231213103548.png",
                    color_variants: template3_color_variants
                }
                response_data.push(template3_res);

                res.json({
                    status: true,
                    statuscode: 200,
                    messsage: 'success',
                    data: response_data
                });
            } else {
                res.json({
                    status: false,
                    statuscode: 200,
                    messsage: 'No user data found',
                    data: []
                });
            }
        } else {
            res.json({
                status: false,
                statuscode: 400,
                message: 'Input data is missing',
                data: []
            });
        }
    } catch (e) {
        console.log(`Error occurs in generate pdf and image function ${e}`)
        res.json({
            status: false,
            statuscode: 400,
            message: `Error occurs in generate pdf and image function ${e}`,
            data: []
        })
    }
}

async function template1(color_code, username, profile_flag_status, profile_pic, address, email, contact_number, skill_flag_status, skill, certificate_flag_status, certificate, objective_flag_status, objective, experience_flag_status, experience, education_flag_status, education, language_flag_status, language, additional_feature_flag_status, additional_feature,disabled,disability_type) {
    var skill_section = '';
    var certificate_section = '';
    var experience_section = '';
    var education_section = '';
    var language_section = '';
    var profile_pic_tag = '';
    var current_position = '';
    var additional_feature_section = '';
    var objective_section = '';
    var contact_section='';
    var disability_section='';
    if (color_code == '') {
        color_code = '#596977';
    }
    if (profile_flag_status) {
        profile_pic_tag = `<div class="avatar mb-3">
                            <img alt="profile" class="img-fluid" src="${profile_pic}"/>
                        </div>`;
    }

    if(address!='' || email!='' || contact_number!=''){
        contact_section=contact_section+`<section role="main">
                        <section class="mt-5">
                            <h2>Details</h2>
                        </section>`;
        if(address!=''){
            contact_section=contact_section+`
                <section class="mt-3">
                    <h4 class="title mt-3">Address</h4>
                    <p class="details">${address}</p>
                </section>
            `;
        }
        if(contact_number!=''){
            contact_section=contact_section+`
                <section class="mt-3">
                    <h4 class="title mt-3">Phone</h4>
                    <p class="details">${contact_number}</p>
                </section>
            `;
        }
        if(email!=''){
            contact_section=contact_section+`
                <section class="mt-3">
                    <h4 class="title mt-3">Email</h4>
                    <p class="details">${email}</p>
                </section>
            `;
        }
        contact_section=contact_section+`</section>`;
    }

    if (objective_flag_status) {
        objective_section = objective_section + '<section>';
        objective_section = objective_section + '<h2 class="mb-3">Objective</h2>';
        objective_section = objective_section + '<p>' + objective + '</p>';
        objective_section = objective_section + '</section>';
    }
    if (skill_flag_status) {
        console.log(skill.length)
        skill_section = skill_section + '<section role="main">'
        skill_section = skill_section + '<section class="mt-5">'
        skill_section = skill_section + '<h2>Skills</h2>'

        for (var skill_i = 0; skill_i < skill.length; skill_i++) {
            console.log(skill[skill_i])
            console.log(skill_i)
            skill_section = skill_section + '<section class="mt-3">';
            skill_section = skill_section + '<h4 class="title mt-4 details p">' + skill[skill_i].skill + '</h4>'
            if (skill[skill_i].rating_status == 1) {
                skill_section = skill_section + '<p class=" rating">'
                for (var rating_i = 1; rating_i <= 5; rating_i++) {
                    console.log('yes rating index ', rating_i)
                    if (rating_i <= skill[skill_i].rating) {
                        skill_section = skill_section + '<span class = "fa fa-star star-spacing checked"></span>'
                    } else {
                        skill_section = skill_section + '<span class = "fa fa-star star-spacing unchecked"></span>'
                    }
                }
                // skill_section=skill_section+'<span class = "fa fa-star checked"></span>'
                // skill_section=skill_section+'<span class = "fa fa-star checked"></span>'
                // skill_section=skill_section+'<span class = "fa fa-star checked"></span>'
                // skill_section=skill_section+'<span class = "fa fa-star unchecked"></span>'
                // skill_section=skill_section+'<span class = "fa fa-star unchecked"></span>'
                skill_section = skill_section + '</p>'

            }
            skill_section = skill_section + '</section>';

        }
        skill_section = skill_section + '</section>'
    }
    console.log(skill_section);
    if (certificate_flag_status) {
        certificate_section = certificate_section + '<section role="main">';
        certificate_section = certificate_section + '<section class="mt-5">';
        certificate_section = certificate_section + '<h2>Certifications</h2>';
        certificate_section = certificate_section + '</section>';
        for (var certificate_i = 0; certificate_i < certificate.length; certificate_i++) {
            certificate_section = certificate_section + '<section class="mt-3">';
            certificate_section = certificate_section + '<p class="details">' + certificate[certificate_i].document_type + '</p>';
            certificate_section = certificate_section + '</section>';
        }
        certificate_section = certificate_section + '</section>';
    }

    if (experience_flag_status) {
        experience_section = experience_section + '<section>';
        experience_section = experience_section + '<h2 class="mb-3 mt-5">Experience</h2>';
        experience = experience.reverse();
        for (var experience_i = 0; experience_i < experience.length; experience_i++) {
            var start_date = experience[experience_i].start_date ? experience[experience_i].start_date : '';
            var end_date = experience[experience_i].end_date ? experience[experience_i].end_date : '';
            var date_status = false;
            if (start_date != '0000-00-00' && start_date != '') {
                date_status = true;
                start_date = await utils.change_data_format(start_date);
                console.log('yes ', start_date);
            }
            if (date_status) {
                if (end_date != '0000-00-00' && end_date != '') {
                    end_date = await utils.change_data_format(end_date);
                    var sorted_experience=await utils.sortExperienceByDate(experience,'asc');
                    if(sorted_experience.length>0){
                        current_position=sorted_experience[sorted_experience.length-1].position;
                    }
                } else {
                    end_date = 'Present';
                    current_position = experience[experience_i].position;
                }
            }
            if (experience_i == 0) {
                experience_section = experience_section + '<div>';
            } else {
                experience_section = experience_section + '<div class="mt-4">';
            }

            experience_section = experience_section + '<h4 class="black no-margin" style="font-weight:700;">' + experience[experience_i].company_name + '</h4>';
            experience_section = experience_section + '<p class="black no-margin">' + experience[experience_i].position + '</p>';
            if (date_status) {
                experience_section = experience_section + '<p class="mb-2">' + start_date + ' - ' + end_date + '</p>';
            }
            //var responsibilities=experience[experience_i].responsilbilities ? experience[experience_i].responsilbilities : [];
            var responsibilities = experience[experience_i].responsilbilities ? experience[experience_i].responsilbilities.split(';') : '';
            console.log(responsibilities);
            if (responsibilities.length > 0) {
                experience_section = experience_section + '<ul class="list-margin">';
                for (var responsibility_i = 0; responsibility_i < responsibilities.length; responsibility_i++) {
                    experience_section = experience_section + '<li>' + responsibilities[responsibility_i] + '</li>';
                }
                experience_section = experience_section + '</ul>';
            }
            experience_section = experience_section + '</div>';
        }
        experience_section = experience_section + '</section>';
    }

    console.log(experience_section)
    //exit ()

    if (education_flag_status) {
        education_section = education_section + '<section>';
        education_section = education_section + '<h2 class="mb-3 mt-5">Education</h2>';
        for (var education_i = 0; education_i < education.length; education_i++) {
            education_section = education_section + '<div>';
            education_section = education_section + '<h4 class="black no-margin"  style="font-weight:700;">' + education[education_i].institution + '</h4>';
            education_section = education_section + '<p>' + education[education_i].course_name + ', ' + education[education_i].academic_year + '</p>';
            education_section = education_section + '</div>';
        }
        education_section = education_section + '</section>';
    }

    if (language_flag_status) {
        language_section = language_section + '<section>';
        language_section = language_section + '<h2 class="mb-3 mt-5">Languages</h2>';
        console.log(language)
        for (var language_i = 0; language_i < language.length; language_i++) {
            console.log(language_i)
            if (language_i == 0) {
                language_section = language_section + '<div class="d-flex align-items-center">';
            } else {
                language_section = language_section + '<div class="d-flex align-items-center mt-3">';
            }
            language_section = language_section + '<h4 class="title details p m-0">' + language[language_i].language + '</h4>';
            if (language[language_i].rating_status == 1) {
                language_section = language_section + '<p class=" rating m-0 ps-5 ms-4 position-absolute" style="right: 125px;">';
                for (var lang_rating_i = 1; lang_rating_i <= 5; lang_rating_i++) {
                    if (lang_rating_i <= language[language_i].rating) {
                        language_section = language_section + '<span class = "fa fa-star star-spacing checked"></span>';
                    } else {
                        language_section = language_section + '<span class = "fa fa-star star-spacing unchecked"></span>';
                    }
                }
                language_section = language_section + '</p>';
            }
            language_section = language_section + '</div>';
        }
        language_section = language_section + '</section>';
    }

    if (additional_feature_flag_status) {
        for (var additional_feature_i = 0; additional_feature_i < additional_feature.length; additional_feature_i++) {
            if(additional_feature[additional_feature_i].show_status==1 && additional_feature[additional_feature_i].type_description!=''){
                additional_feature_section = additional_feature_section + '<section class="mt-3">'
                additional_feature_section = additional_feature_section + '<h2 class="mb-3 mt-5">' + additional_feature[additional_feature_i].type + '</h2>'
                additional_feature_section = additional_feature_section + '<p class="details">' + additional_feature[additional_feature_i].type_description + '</p>'
                additional_feature_section = additional_feature_section + '</section>'
            }
        }
    }

    if(disabled==1){
        if(disability_type!=''){
            disability_section=disability_section+`<section class="mt-3"><h2 class="mb-3 mt-5">Physical Disability</h2><p class="details">${disability_type}</p></section>`;
        }
    }

    //exit ()
    var html_opening = `
        <!doctype html>
        <html lang="en" data-bs-theme="auto">
        <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <meta name="description" content="">
            <meta name="author" content="CV">
            <meta name="generator" content="CV">
            <title>CV Template</title>
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet"
                integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous">
            <style>
                @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap');
                body{font-size:14px}
                .sidePane{width: calc(188px * 1.4); background: ${color_code}; color: #fff;}
                h2{font-size: 18px; font-weight: 700; }
                h3 { font-size: 16px;font-weight: 700;}
                h4{font-size: 14px;}
                h5{font-size: 12px;}
                .sidePane .details{ color: rgba(255, 255, 255, 0.7); font-weight: normal; word-wrap: break-word;}
                .avatar{
                    width: 56px; height: 56px; display: inline-flex;border-radius: 100%;
                    overflow: hidden;
                }
                .checked {
                    color : #FFFFFF;
                    font-size : 20px;
                }
                .unchecked {
                    font-size : 20px;
                    color: #768491;
                }
                .star-spacing {
                    margin-right: 5px; /* Adjust the spacing as needed */
                }
                section[role="content"]{
                    color: rgba(0, 0, 0, 0.7);
                }
                section[role="content"] h2{color: rgba(0, 0, 0, 1);}
                .black{color: #000;}
                section[role="content"] .checked{color:#768491}
                section[role="content"] .unchecked {color:#DCDDDD}

                /* for print media */
                /* @media print {
                    body{font-size:12px;}
                    .shadow-lg.my-4{box-shadow: none; margin: 0 !important;}
                }
                @page {
                    size:A4;
                    /*margin-left: 0px;
                    margin-right: 0px;
                    margin-top: 0px;
                    margin-bottom: 0px;
                    margin: 0;*/
                    -webkit-print-color-adjust: exact;
                } */
               .no-margin{
                margin: 0;
               }
                .list-margin{
                    padding-left: 16px;
                }
            </style>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
            </head>
            <body>
                <main>
                <div class="container shadow-none my-0" style="max-width: 860px;">
                <div class="row">
                <div class="col-3 sidePane">
                    <div class="p-5 my-3">
                    <section>
                        
                            ${profile_pic_tag}
                        
                        <h2>${username}</h2>
                        <p class="details mt-0">${current_position}</p>
                    </section>
                    ${contact_section}
                    ${skill_section}
                    ${certificate_section}
                </div>
                </div>
                <div class="col">
                    <div class="p-5 my-3">
                        <section role="content">
                            ${objective_section}
                            ${experience_section}
                            ${education_section}
                            ${language_section}
                            ${additional_feature_section}
                            ${disability_section}
                        </section>
                    </div>
                </div>
    `;

    var html_closing = `</div></div></main></body></html>`

    return html_opening + html_closing;
}

async function template2(color_code, username, profile_flag_status, profile_pic, address, email, contact_number, skill_flag_status, skill, certificate_flag_status, certificate, objective_flag_status, objective, experience_flag_status, experience, education_flag_status, education, language_flag_status, language, additional_feature_flag_status, additional_feature,disabled,disability_type) {
    var skill_section = '';
    var certificate_section = '';
    var experience_section = '';
    var education_section = '';
    var language_section = '';
    var profile_pic_tag = '';
    var current_position = '';
    var additional_feature_section = '';
    var objective_section = '';
    var contact_section='';
    var disability_section='';
    if(address!='' || email!='' || contact_number!=''){
            contact_section=contact_section+`<div class="flex-container">`;
            if(address!=''){
                contact_section=contact_section+`
                    <p class="flex-item">
                        <i class="fa fa-map-marker icon"></i>
                        <span class="span-content">${address}</span>
                    </p>`;
            }
            if(email!=''){
                contact_section=contact_section+`
                    <p class="flex-item">
                        <i class="fa fa-envelope icon"></i>
                        <span class="span-content">${email}</span>
                    </p>
                `;
            }
            if(contact_number!=''){
                contact_section=contact_section+`
                    <p class="flex-item">
                        <i class="fa fa-phone icon"></i>
                        <span class="span-content">${contact_number}</span>
                    </p>
                `;
            }
          contact_section=contact_section+`</div>`;
    }
    console.log(profile_pic, profile_flag_status);
    if (color_code == '') {
        color_code = '#272727';
    }
    if (profile_flag_status) {
        profile_pic_tag = `<img alt="profile" class="avatar" src="${profile_pic}"/>`
    }

    if (objective_flag_status) {
        objective_section = objective_section + '<section class="mb-4">';
        objective_section = objective_section + '<h2 class="mb-4">OBJECTIVE</h2>';
        objective_section = objective_section + '<p style="color: black">' + objective + '</p>';
        objective_section = objective_section + '</section>';
    }

    if (experience_flag_status) {
        experience_section = experience_section + '<section>';
        experience_section = experience_section + '<h2 class="mb-4">EXPERIENCE</h2>';
        experience = experience.reverse();
        for (var experience_i = 0; experience_i < experience.length; experience_i++) {
            var start_date = experience[experience_i].start_date ? experience[experience_i].start_date : '';
            var end_date = experience[experience_i].end_date ? experience[experience_i].end_date : '';
            var date_status = false;
            if (start_date != '0000-00-00' && start_date != '') {
                date_status = true;
                start_date = await utils.change_data_format(start_date);
            }
            if (date_status) {
                if (end_date != '0000-00-00' && end_date != '') {
                    end_date = await utils.change_data_format(end_date);
                    var sorted_experience=await utils.sortExperienceByDate(experience,'asc');
                    if(sorted_experience.length>0){
                        current_position=sorted_experience[sorted_experience.length-1].position;
                    }
                } else {
                    end_date = 'Present';
                    current_position = experience[experience_i].position;
                }
            }
            if (experience_i == 0) {
                experience_section = experience_section + '<div style="color: black">';
            } else {
                experience_section = experience_section + '<div class="mt-4" style="color: black">';
            }
            //var responsibilities=experience[experience_i].responsilbilities ? experience[experience_i].responsilbilities : [];
            var responsibilities = experience[experience_i].responsilbilities ? experience[experience_i].responsilbilities.split(';') : '';

            experience_section = experience_section + '<h4 class="black no-margin">' + experience[experience_i].company_name + '</h4>';
            //experience_section = experience_section + '<p class="black mt-0" style="margin-bottom: 0.2rem !important">' + experience[experience_i].position + '</p>';
            experience_section = experience_section + '<p class="black no-margin">' + experience[experience_i].position + '</p>';
            experience_section = experience_section + '<p  class="mb-2">' + start_date + ' - ' + end_date + '</p>';

            if (responsibilities.length > 0) {
                experience_section = experience_section + '<ul class="list-margin">';
                for (var responsibility_i = 0; responsibility_i < responsibilities.length; responsibility_i++) {
                    experience_section = experience_section + '<li>' + responsibilities[responsibility_i] + '</li>';
                }
                experience_section = experience_section + '</ul>';
            }
        }
        experience_section = experience_section + '</section>';
    }

    if (education_flag_status) {
        education_section = education_section + '<section>';
        education_section = education_section + '<h2 class="mb-4 mt-4">EDUCATION</h2>';
        for (var education_i = 0; education_i < education.length; education_i++) {
            education_section = education_section + '<div><h4 class="black  no-margin">' + education[education_i].institution + '</h4><p style="color: black">' + education[education_i].course_name + ', ' + education[education_i].academic_year + '</p></div>';
        }
        education_section = education_section + '</section>';
    }

    if (certificate_flag_status) {
        certificate_section = certificate_section + '<section>';
        certificate_section = certificate_section + '<section class="mt-2"><h2 style="color: black">CERTIFICATIONS</h2></section>';
        for (var certificate_i = 0; certificate_i < certificate.length; certificate_i++) {
            certificate_section = certificate_section + '<section class="mt-3"><p class="details">' + certificate[certificate_i].document_type + '</p></section>';
        }
        certificate_section = certificate_section + '<section>';
    }

    if (skill_flag_status) {
        skill_section = skill_section + '<section class="mt-5"><h2 style="color: black">SKILLS</h2></section>';
        for (var skill_i = 0; skill_i < skill.length; skill_i++) {
            skill_section = skill_section + '<section class="mt-3">';
            skill_section = skill_section + '<h5 class="title mt-3 details p mb-1">' + skill[skill_i].skill + '</h5>';
            if (skill[skill_i].rating_status == 1) {
                skill_section = skill_section + '<div class="w3-light-grey w3-xxlarge" style="width: 100%;">';
                skill_section = skill_section + '<div class="w3-container w3-black" style="width: ' + skill[skill_i].rating * 20 + '%"></div>';
                skill_section = skill_section + '</div>';
            }
            skill_section = skill_section + '</section">';
        }
    }

    console.log(skill_section)

    if (language_flag_status) {
        language_section = language_section + '<section>';
        language_section = language_section + '<h2 class="mb-3 mt-5" style="color: black">LANGUAGES</h2>';
        language_section = language_section + '</section>';
        for (var language_i = 0; language_i < language.length; language_i++) {
            language_section = language_section + '<section class="mt-3">';
            language_section = language_section + '<h5 class="title mt-3 details  mb-1">' + language[language_i].language + '</h5>';
            if (language[language_i].rating_status == 1) {
                language_section = language_section + '<div class="w3-light-grey w3-tiny" style="width: 100%">';
                language_section = language_section + '<div class="w3-container w3-black" style="width: ' + language[language_i].rating * 20 + '%"></div>';
                language_section = language_section + '</div>';
            }
            language_section = language_section + '</section>';
        }
    }

    if (additional_feature_flag_status) {
        for (var additional_feature_i = 0; additional_feature_i < additional_feature.length; additional_feature_i++) {
            if(additional_feature[additional_feature_i].show_status==1 && additional_feature[additional_feature_i].type_description!=''){
                additional_feature_section = additional_feature_section + '<section class="mt-4">'
                additional_feature_section = additional_feature_section + '<section class="mt-2"><h2 style="color: black">' + additional_feature[additional_feature_i].type.toUpperCase() + '</h2></section>';
                additional_feature_section = additional_feature_section + '<section class="mt-3"><p class="details" style="color: black">' + additional_feature[additional_feature_i].type_description + '</p></section>'
                additional_feature_section = additional_feature_section + '</section>'
            }
        }
    }

    if(disabled==1){
        if(disability_type!=''){
            disability_section=disability_section+`<section class="mt-4"><section class="mt-2"><h2 style="color: black">Physical Disability</h2></section><section class="mt-3"><p class="details" style="color: black">${disability_type}</p></section></section>`;
        }
    }

    var html_opening = `<!DOCTYPE html>
    <html lang="en" data-bs-theme="auto">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="" />
        <meta name="author" content="CV" />
        <meta name="generator" content="CV" />
        <title>CV Template</title>
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css"
          rel="stylesheet"
          integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN"
          crossorigin="anonymous"
        />
        <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css" />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css"
          integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj"
          crossorigin="anonymous"
        />
    
        <!-- Custom styles for this template -->
        <!-- <link href="custom.css" rel="stylesheet" /> -->
    
        <style>
          @import url("https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap");
          body {
            font-size: 14px;
          }
          .sidePane {
            width: calc(188px * 1.4);
            color: black;
          }
          .name_sec {
            color: aliceblue;
            margin-top: 5%;
            text-align: center;
          }
          h2 {
            font-size: 23px;
            font-weight: 700;
            margin-top: 2%;
            color: rgb(255, 255, 255);
            text-decoration: underline;
          }
          h3 {
            font-size: 16px;
            font-weight: 700;
          }
          h4 {
            font-size: 14px;
            font-weight: 700;
          }
          h5 {
            font-size: 14px;
            font-weight: 400;
          }
          .ms-2 {
            font-size: larger;
            color: rgb(191 180 180);
          }
          .sidePane .details {
            color: rgb(0, 0, 0);
          }
          .avatar {
            width: 86px;
            height: 86px;
            border-radius: 100%;
            overflow: hidden;
            /*margin-left: 22%;*/
            text-align: center;
          }
          .w3-black {
            height: 3px;
          }
    
          .checked {
            color: black;
            font-size: 20px;
          }
          .unchecked {
            font-size: 20px;
            color: black;
          }
          section[role="content"] {
            color: rgba(0, 0, 0, 0.7);
          }
          section[role="content"] h2 {
            color: rgba(0, 0, 0, 1);
          }
          .black {
            color: #000;
          }
          section[role="content"] .checked {
            color: #000000;
          }
          section[role="content"] .unchecked {
            color: black;
          }
    
          .head_div {
            background-color: ${color_code};
            border-bottom-left-radius: 24px;
            border-bottom-right-radius: 24px;
          }
    
          /*@media print {
            body {
              font-size: 12px;
            }
            .shadow-lg.my-4 {
              box-shadow: none;
              margin: 0 !important;
            }
          }
          @page {
            size: A4;
            margin-left: 0px;
            margin-right: 0px;
            margin-top: 0px;
            margin-bottom: 0px;
            margin: 0;
            -webkit-print-color-adjust: exact;
          }*/

            .flex-container {
                display: flex;
                flex-wrap: wrap;
                color: white;
            }

            .flex-item {
                flex: 1;
                display: flex;
                align-items: flex-start;
                margin: 5px 10px;
                width: 33.33%;
            }

            .icon {
                margin-right: 5px;
                flex-shrink: 0;
                position: relative;
                top: 4px;
            }

            .span-content {
                white-space: normal;
                word-break: break-all;
            }
            .no-margin{
                margin: 0;
            }
            .list-margin{
                padding-left: 16px;
            }
        </style>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
        />
      </head>
      <body>
        <main>
          <div class="container shadow-none my-0" style="max-width: 860px">
            <div class="head_div">
              <div class="d-flex align-items-center justify-content-center">
                <section class="name_sec">
                  ${profile_pic_tag}
                  <div class="mt-2">
                    <h2 style="text-decoration: none">${username}</h2>
                    <p class="details ms-2">${current_position}</p>
                  </div>
                </section>
              </div>
              <hr style="color: aliceblue" />
              <section role="main" class="d-flex align-items-center justify-content-center mb-2">
          <!--<p class="details" style="color: rgb(170, 171, 172)">-->
          <!--<div class="flex-container">
            <p class="flex-item">
                <i class="fa fa-home icon"></i>
                <span class="span-content">${address}</span>
            </p>
            <p class="flex-item">
                <i class="fa fa-phone icon"></i>
                <span class="span-content">${contact_number}</span>
            </p>
            <p class="flex-item">
                <i class="fa fa-envelope icon"></i>
                <span class="span-content">${email}</span>
            </p>
          </div>-->

          ${contact_section}
            
            <!--<p class="details" style="color: white;">
            <i class="fa fa-home"></i>
            ${address}
            </p>
            &nbsp; &nbsp;
            <p class="details" style="color: white;">
            <i class="fa fa-phone"></i> ${contact_number}
            </p>
            &nbsp; &nbsp; 
            <p class="details" style="color: white;">
            <i class="fa fa-envelope"></i> ${email}
            </p>-->
            
          </section>
        </div>
        <div class="row">
            <div class="col">
                <div class="p-5 my-3">
                    <section role="content">
                        ${objective_section}
                        ${experience_section}
                        ${education_section}
                        ${additional_feature_section}
                        ${disability_section}
                    <section>
                    </div>
          </div>
          <div class="col-4 sidePane">
          <div class="p-5 my-3">
          <section role="main">
                ${certificate_section}
                ${skill_section}
                ${language_section}
              </section>
              
          </div></div>`;
    var html_closing = `</div></div></main>
                        </body>
                    </html>`;
    return html_opening + html_closing;
}


async function template3(color_code, username, profile_flag_status, profile_pic, address, email, contact_number, skill_flag_status, skill, certificate_flag_status, certificate, objective_flag_status, objective, experience_flag_status, experience, education_flag_status, education, language_flag_status, language, additional_feature_flag_status, additional_feature,disabled,disability_type) {
    var skill_section = '';
    var certificate_section = '';
    var experience_section = '';
    var education_section = '';
    var language_section = '';
    var profile_pic_tag = '';
    var current_position = '';
    var additional_feature_section = '';
    var objective_section = '';
    var contact_section='';
    var disability_section='';
    if(address!='' || contact_number!='' || email!=''){
        contact_section=contact_section+`
            <section role="main ">
                <section class="mt-5">
                    <h2>Details</h2>
                </section>
        `;
        if(address!=''){
            contact_section=contact_section+`
                <section class="mt-3">
                    <h4 class="title">Address</h4>
                    <p class="details">${address}</p>
                </section>
            `;
        }
        if(contact_number!=''){
            contact_section=contact_section+`
                <section >
                    <h4 class="title">Phone</h4>
                    <p class="details">${contact_number}</p>
                </section>
            `;
        }
        if(email!=''){
            contact_section=contact_section+`
                <section>
                    <h4 class="title ">Email</h4>
                    <span class="details">${email}</span>
                </section>
            `;
        }
        contact_section=contact_section+`</section>`;
    }

    if (profile_flag_status) {
        profile_pic_tag = profile_pic_tag + '<div class="avatar mb-3 mt-1">';
        profile_pic_tag = profile_pic_tag + '<img alt="profile" class="img-fluid" src="' + profile_pic + '">';
        profile_pic_tag = profile_pic_tag + '</div>';
    }

    if (objective_flag_status) {
        objective_section = objective_section + '<section><h2 style=" margin-top: 1% !important;">Objective</h2>';
        objective_section = objective_section + '<p>' + objective + '</p>';
        objective_section = objective_section + '</section>';
    }

    if (experience_flag_status) {
        experience_section = experience_section + '<section>';
        experience_section = experience_section + '<h2 class="mb-2 mt-4">Experience</h2>';
        for (var experience_i = 0; experience_i < experience.length; experience_i++) {
            var start_date = experience[experience_i].start_date ? experience[experience_i].start_date : '';
            var end_date = experience[experience_i].end_date ? experience[experience_i].end_date : '';
            var date_status = false;
            if (start_date != '0000-00-00' && start_date != '') {
                date_status = true;
                start_date = await utils.change_data_format(start_date);
            }
            if (date_status) {
                if (end_date != '0000-00-00' && end_date != '') {
                    end_date = await utils.change_data_format(end_date);
                    var sorted_experience=await utils.sortExperienceByDate(experience,'asc');
                    if(sorted_experience.length>0){
                        current_position=sorted_experience[sorted_experience.length-1].position;
                    }
                } else {
                    end_date = 'Present';
                    current_position = experience[experience_i].position;
                }
            }
            if (experience_i == 0) {
                experience_section = experience_section + '<div>';
            } else {
                experience_section = experience_section + '<div class="mt-3">';
            }
            //var responsibilities=experience[experience_i].responsilbilities ? experience[experience_i].responsilbilities : [];
            var responsibilities = experience[experience_i].responsilbilities ? experience[experience_i].responsilbilities.split(';') : '';
            experience_section = experience_section + '<div>';
            experience_section = experience_section + '<h4 class="black no-margin">' + experience[experience_i].company_name + '</h4>';
            experience_section = experience_section + '<span class="no-margin"> ' + experience[experience_i].position + '</span><br>';
            experience_section = experience_section + '<span class="date">' + start_date + ' - ' + end_date + '</span>';
            if (responsibilities.length > 0) {
                experience_section = experience_section + '<ul class="list-margin">';
                for (var responsibility_i = 0; responsibility_i < responsibilities.length; responsibility_i++) {
                    experience_section = experience_section + '<li>' + responsibilities[responsibility_i] + '</li>';
                }
                experience_section = experience_section + '</ul>';
            }
            experience_section = experience_section + '</div>';
        }
        experience_section = experience_section + '</section>';
    }

    if (education_flag_status) {
        education_section = education_section + '<section>';
        education_section = education_section + '<h2 class="mt-4 mb-2">Education</h2>';
        for (var education_i = 0; education_i < education.length; education_i++) {
            education_section = education_section + '<div>';
            education_section = education_section + '<h4 class="black no-margin">' + education[education_i].institution + '</h4>';
            education_section = education_section + '<p>' + education[education_i].course_name + ', ' + education[education_i].academic_year + '</p>';
            education_section = education_section + '</div>';
        }
        education_section = education_section + '</section>';
    }

    if (certificate_flag_status) {
        certificate_section = certificate_section + '<section role="main">';
        certificate_section = certificate_section + '<section class="mt-4">';
        certificate_section = certificate_section + '<h2>Certifications</h2>';
        certificate_section = certificate_section + '</section>';
        certificate_section = certificate_section + '<section class="mt-1">';
        for (var certificate_i = 0; certificate_i < certificate.length; certificate_i++) {
            //certificate_section = certificate_section + '<section class="mt-1">';
            certificate_section = certificate_section + '<p class="details no-margin">' + certificate[certificate_i].document_type + '</p>';
            //certificate_section = certificate_section + '</section>';
        }
        certificate_section = certificate_section + '</section>';
        certificate_section = certificate_section + '</section>';
    }


    if (skill_flag_status) {
        skill_section = skill_section + '<section role="main">';
        skill_section = skill_section + '<section class="mt-4">';
        skill_section = skill_section + '<h2>Skills</h2>';
        skill_section = skill_section + '</section>';
        for (var skill_i = 0; skill_i < skill.length; skill_i++) {
            skill_section = skill_section + '<section class="mt-3">';
            skill_section = skill_section + '<h4 class="title mt-3 details p mb-1">' + skill[skill_i].skill + '</h4>';
            if (skill[skill_i].rating_status == 1) {
                skill_section = skill_section + '<div class="w3-light-grey w3-large" style="width: 100%;">';
                skill_section = skill_section + '<div class="w3-container w3-black" style="width: ' + skill[skill_i].rating * 20 + '%; height: 3px;"></div>';
                skill_section = skill_section + '</div>';
            }
            skill_section = skill_section + '</section>';
        }
        skill_section = skill_section + '</section>';
    }

    if (language_flag_status) {
        language_section = language_section + '<section role="main">';
        language_section = language_section + '<h2 class="mb-3 mt-5">Languages</h2>';
        for (var language_i = 0; language_i < language.length; language_i++) {
            if (language_i == 0) {
                language_section = language_section + '<section class="mt-0">';
            } else {
                language_section = language_section + '<section class="mt-3">';
            }
            // <h4 class="title mt-3 details">Adobe XD</h4>
            // <div class="w3-light-grey w3-large " style="width: 100%;">
            //     <div class="w3-container w3-black" style="width: 50%; height: 5px;"></div>
            // </div>
            language_section = language_section + '<h4 class="title mt-3 details mb-1">' + language[language_i].language + '</h4>';
            if (language[language_i].rating_status == 1) {
                language_section = language_section + '<div class="w3-light-grey w3-large" style="width: 100%;">';
                language_section = language_section + '<div class="w3-container w3-black" style="width: ' + language[language_i].rating * 20 + '%; height: 3px;"></div>';
                language_section = language_section + '</div>';
            }
            language_section = language_section + '</section>';
        }
        language_section = language_section + '</section>';
    }

    if (additional_feature_flag_status) {
        additional_feature_section = additional_feature_section + '<section>';

        for (var additional_feature_i = 0; additional_feature_i < additional_feature.length; additional_feature_i++) {
            if(additional_feature[additional_feature_i].show_status==1 && additional_feature[additional_feature_i].type_description!=''){
                additional_feature_section = additional_feature_section + '<h2 class="mb-2 mt-4">' + additional_feature[additional_feature_i].type + '</h2>';
                additional_feature_section = additional_feature_section + '<p>' + additional_feature[additional_feature_i].type_description + '</p>';
            }

        }
        additional_feature_section = additional_feature_section + '</section>';
    }

    if(disabled==1){
        if(disability_type!=''){
            disability_section=disability_section+`<section><h2 class="mb-2 mt-4">Physical Disability</h2><p>${disability_type}</p></section>`;
        }
    }

    var html_opening = `<!doctype html>
                      <html lang="en" data-bs-theme="auto">
                        <head>
                        <meta charset="utf-8">
                        <meta name="viewport" content="width=device-width, initial-scale=1">
                        <meta name="description" content="">
                        <meta name="author" content="CV">
                        <meta name="generator" content="CV">
                        <title>CV Template</title>
                        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet"
                        integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous">
                        <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">
                        <style>
                            @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap');
                            body {
                                font-family: 'Roboto', sans-serif;
                                font-size: 14px;
                            }
                            .sidePane {
                                width: calc(188px * 1.4);
                                
                                /*background-image: url(${appURL}uploads/images/template/bg_3_1.png);*/
                                background-image: url(${appURL}uploads/images/template/bg_3_1.png), url(${appURL}uploads/images/template/bg_3_2.png);
                                background-size: 300px, 100%;
                                background-repeat: no-repeat, no-repeat;
                                background-position: top right, center 104%;
                                /*background: linear-gradient(
                                rgba(248, 252, 3, 0.5) -2%,
                                rgba(255, 255, 255, 0) 10%,
                                white 7%,
                                white 83%,
                                rgba(255, 255, 255, 0) 76%,
                                rgba(135, 206, 235, 0.5) 100%
                                );*/
                                color: black;
                            }
                            .name_sec {
                                display: flex;
                                align-items: center;
                            }
                            h2 {
                                font-size: 19px;
                                font-weight: 700;
                                margin-top: 5%;
                            }
                            h3 {
                                font-size: 16px;
                                font-weight: 700;
                            }
                            h4 {
                                font-size: 16px;
                                font-weight: 700;
                            }
                            h5 {
                                font-size: 12px;
                            }
                            span {
                                color: black;
                            }
                            .date {
                                font-size: 12px;
                                color: rgba(112, 112, 112, 0.87);
                            }
                            li {
                                color: rgba(112, 112, 112, 0.87);
                            }
                            .sidePane .details {
                                color: rgba(5, 5, 5, 0.7);
                                font-weight: normal;
                                word-wrap: break-word;
                            }
                            .avatar {
                                width: 86px;
                                height: 86px;
                                display: inline-flex;
                                border-radius: 100%;
                                overflow: hidden;
                            }
                            .checked {
                                color: black;
                                font-size: 20px;
                            }
                            .unchecked {
                                font-size: 20px;
                                color: black;
                            }
                            section[role="content"] {
                                color: rgba(0, 0, 0, 0.7);
                            }
                            section[role="content"] h2 {
                                color: rgba(0, 0, 0, 1);
                            }
                            .black {
                                color: #000;
                            }
                            section[role="content"] .checked {
                                color: #768491;
                            }
                            section[role="content"] .unchecked {
                                color: black;
                            }
                            
                            /*@media print {
                                body {
                                font-size: 12px;
                                }
                                .shadow-lg.my-4 {
                                box-shadow: none;
                                margin: 0 !important;
                                
                                }
                            }
                            @page {
                                size: A4;
                                margin-left: 0px;
                                margin-right: 0px;
                                margin-top: 0px;
                                margin-bottom: 0px;
                                margin: 0;
                                -webkit-print-color-adjust: exact;
                            }*/

                            .no-margin{
                                margin: 0;
                            }
                            .list-margin{
                                padding-left: 16px;
                                margin-top: 10px;
                            }
              
                        </style>
                        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">  
                    </head>
                    <body>
                        <main>
                    
                            <div class="container shadow-none my-0" style="max-width: 860px;">
                            <div class="row">
                            <div class="col">
                                <div class="p-5 my-3">
                                    <section class="name_sec">
                                        ${profile_pic_tag}
                                        <div class="ms-3">
                                            <h2 class="mb-1">${username}</h2>
                                        <p class="details">${current_position}</p>
                                        </div>
                                    </section>

                                    <section role="content">
                                        ${objective_section}
                                        ${experience_section}
                                        ${education_section}
                                        ${additional_feature_section}
                                        ${disability_section}
                                    </section>

                                </div>
                            </div>
                            <div class="col-3 sidePane">
                                <div class="p-5 my-3" style=" margin-top: 30% !important">
                                    ${contact_section}
                                    ${certificate_section}
                                    ${skill_section}
                                    ${language_section}
                                </div>
                            </div>
                    `;

    var html_closing = `</div></div></main></body></html>`;
    return html_opening + html_closing;
}

async function template4(color_code, username, profile_flag_status, profile_pic, address, email, contact_number, skill_flag_status, skill, certificate_flag_status, certificate, objective_flag_status, objective, experience_flag_status, experience, education_flag_status, education, language_flag_status, language, additional_feature_flag_status, additional_feature,disabled,disability_type) {
    var html_opening = `<!DOCTYPE html>
    <html lang="en" data-bs-theme="auto">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="" />
        <meta name="author" content="CV" />
        <meta name="generator" content="CV" />
        <title>CV Template</title>
        <link  href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous"/>
        <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css" integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj" crossorigin="anonymous">
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Your+Selected+Font&display=swap">
        <!-- Custom styles for this template -->
        <!-- <link href="custom.css" rel="stylesheet" /> -->
    
        <style>
          @import url("https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap");
    /* body{
        font-size:14px;
    }
    .sidePane{
        width: calc(188px * 1.4); 
        color:black;
    }
    .name_sec{ 
        color: aliceblue;
        margin-top: 5%;
    }
      h2{font-size: 23px; font-weight: 700; margin-top: 2%; color: rgb(10, 10, 10); text-decoration: underline; }
    
      h3 { font-size: 16px;font-weight: 700;}
    
      h4{font-size: 14px; font-weight: 700;}
      
      h5{font-size: 12px;}
      .ms-2{
        font-size: larger;
        color: rgb(191 180 180);
      }
    .sidePane .details{ color: rgb(0, 0, 0); }
    .avatar{
        width: 86px; height: 86px;
         border-radius: 100%;
        overflow: hidden;
        margin-left: 22%;
    }
    .w3-black{
        height: 3px ;
    }
    
    .checked {
        color : black;
        font-size : 20px;
    }
    .unchecked {
        font-size : 20px;
        color: black;
    }
    section[role="content"]{
        color: rgba(0, 0, 0, 0.7);
    }
    section[role="content"] h2{color: rgba(0, 0, 0, 1);}
    .black{color: #000;}
    section[role="content"] .checked{color:#000000}
    section[role="content"] .unchecked {color:black}
    
    
    .head_div{
        background-color: #272727;
        border-bottom-left-radius:24px;
        border-bottom-right-radius:24px;
    }
    
    @media print {
        body{font-size:12px;}
        .shadow-lg.my-4{box-shadow: none; margin: 0 !important;}
    }
    @page {
        size:A4;
        margin-left: 0px;
        margin-right: 0px;
        margin-top: 0px;
        margin-bottom: 0px;
        margin: 0;
        -webkit-print-color-adjust: exact;
    } */
    
    .sidePane{
        width: calc(188px * 1.4); 
        color:black;
    }
    .banner{
        /* margin-top: 9% !important; */
        display: flex;
      }
    
      .left-div {
        width: 150px; /* Adjust the width as needed */
      }
    
      .avatar{
        width: 85%; 
        height: 85%; 
        border-radius: 100%;
        overflow: hidden;
        margin-left: 8%;
    }
    .image-container {
        padding: 8px; /* Adjust the padding as needed */
      }
    
      .name {
        font-weight: 900;
        font-family: 'Lora', serif;
      }
      .details{
        margin-bottom: 0px; 
        color: rgb(170, 171, 172);
        font-size : 12px;
      }
      .contact-info {
        margin-left: 20%;
        display: flex;
        flex-direction: column;
        align-items: flex-end;
      }
      .heading{
        color: rgb(100, 104, 107);
        font-family: 'Open Sans', sans-serif;
      }
      .position{
        font-weight: 700;
        margin-bottom: 0% !important;
      }
      .date{
        color: rgb(100, 104, 107);
        margin-top: 0% !important;
      }
      .definition,.objective{
        color: rgb(100, 104, 107);
      }
        </style>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
        />
      </head>
      <body>
        <main>
          
          <div class="container shadow-none my-0" style="max-width: 860px">
            <div class="container banner">
                <div class="left-div mt-5">
                   <div class="image-container">
                    <img alt="profile" class="avatar" src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/1931674c-b4c7-4333-b2b7-7b4c4399ec48/dg2zdsz-82187bcb-2f96-4f40-889f-fbbdc5da899a.png/v1/fill/w_894,h_894,q_70,strp/beautiful_avatar_profilepicture_by_ventulart_dg2zdsz-pre.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzE5MzE2NzRjLWI0YzctNDMzMy1iMmI3LTdiNGM0Mzk5ZWM0OFwvZGcyemRzei04MjE4N2JjYi0yZjk2LTRmNDAtODg5Zi1mYmJkYzVkYTg5OWEucG5nIiwiaGVpZ2h0IjoiPD05MDAiLCJ3aWR0aCI6Ijw9OTAwIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmltYWdlLndhdGVybWFyayJdLCJ3bWsiOnsicGF0aCI6Ilwvd21cLzE5MzE2NzRjLWI0YzctNDMzMy1iMmI3LTdiNGM0Mzk5ZWM0OFwvdmVudHVsYXJ0LTQucG5nIiwib3BhY2l0eSI6OTUsInByb3BvcnRpb25zIjowLjQ1LCJncmF2aXR5IjoiY2VudGVyIn19.3H5X5AsiXo9dpk8_NnWcecMgv7qPFO1BzdPJ-mpO2VI"/>
                   </div>
                </div>
                <div class="mt-5 ms-2">
                  <h1 class="name"><div class="w-75">TAYLOR STIMBERT</div></h2>
                </div>
                <div  class="contact-info mt-5">
                  <p class="details"> San Francisco, California </p>
                  <p  class="details"> tstimbert@gmail.com</p>
                  <p class="details">  (315) 802-8179</p>
                </div>
            </div>
    
            <div class="moredetails" style="padding-bottom: 10%;">
    
              <div class="w3-row ms-5" style="margin-top: 5%;">
                  <div class="w3-col m4 l3">
                  <p class="heading">Profile</p>
                  </div>
                  <div class="w3-col m8 l9">
                  <p class="objective">UX/UI specialist focused on designing clean and functional projects across all platforms and devices in response to specific briefs and problems, while always maintaining a unique look and feel.</p>
                  </div>
              </div>
    
              <div class="w3-row ms-5" style="margin-top: 1%;">
                <div class="w3-col m4 l3">
                <p class="heading">Experience</p>
                </div>
                <div class="w3-col m8 l9">
                  <p class="position">Product Designer, Uber</p>
                  <p class="date">Mar 2015 - Present</p>
                  <p class="definition">Designed safety-focused experiences for Riders and Drivers
                    Physical space problem solving and it’s interaction with the digital
                    Navigated organization to achieve operational improvements</p>
    
                    <p class="position">Product Designer, IFTTT</p>
                    <p class="date">Dec 2013 - Mar 2015</p>
                    <p class="definition">Product and system design for a complex product
                      Designed both consumer and developer products for IFTTT
                      Responsible for maintaining design across iOS, Android, and web.</p>
    
                      <p class="position">Product Designer, Facebook</p>
                      <p class="date">June 2013 - Sep 2013</p>
                      <p class="definition">Designer and prototyped internal tools
                        Worked with Privacy team to build assets and features
                        Redesigned Newsfeed curation experience for mobile.</p>
                    </div>
              </div>
    
              <div class="w3-row ms-5" style="margin-top: 1%;">
                <div class="w3-col m4 l3">
                <p class="heading">Education</p>
                </div>
                  <div class="w3-col m8 l9">
                    <p class="position">Rhode Island School of Design</p>
                    <p class="date">BFA Industrial Design, Class of 2013</p>
                    <p class="position">Rhode Island School of Design</p>
                    <p class="date">BFA Industrial Design, Class of 2013</p>
                  </div>
              </div>
    
              <div class="w3-row ms-5" style="margin-top: 2%;">
                <div class="w3-col m4 l3">
                <p class="heading">Languages</p>
                </div>
                <div class="w3-col m8 l9">
                <span class="">English : C2</span> |  <span class="">Italian : B2</span>
                </div>
              </div>
    
            <div class="w3-row ms-5" style="margin-top: 2%;">
              <div class="w3-col m4 l3">
              <p class="heading">Skills</p>
              </div>
              <div class="w3-col m8 l9">
              <span class="">Figma</span> | <span class="">Sketch</span> | <span class="">Photoshop</span>
              </div>
            </div>
    
            <div class="w3-row ms-5" style="margin-top: 2%;">
              <div class="w3-col m4 l3">
              <p class="heading">Certifications</p>
              </div>
              <div class="w3-col m8 l9">
              <span class="">Google UX Design Certificate</span> 
              </div>
            </div>
    
            </div>`;
    var html_closing = `</div>
    </main>
  </body>
</html>`;
    return html_opening + html_closing;
}

async function template5(color_code, username, profile_flag_status, profile_pic, address, email, contact_number, skill_flag_status, skill, certificate_flag_status, certificate, objective_flag_status, objective, experience_flag_status, experience, education_flag_status, education, language_flag_status, language, additional_feature_flag_status, additional_feature,disabled,disability_type) {
    var skill_section = '';
    var certificate_section = '';
    var experience_section = '';
    var education_section = '';
    var language_section = '';
    var profile_pic_tag = '';
    var current_position = '';
    var additional_feature_section = '';
    var objective_section = '';
    var disability_section='';

    if (profile_flag_status) {
        profile_pic_tag = profile_pic_tag + '';
    }

    if (objective_flag_status) {
        objective_section = objective_section + '<div class="about">' + objective + '</div>';
    }

    if (experience_flag_status) {
        experience_section = experience_section + '<div class="block">';
        experience_section = experience_section + '<h3><span>experience</span></h3>';
        for (var experience_i = 0; experience_i < experience.length; experience_i++) {
            var start_date = experience[experience_i].start_date ? experience[experience_i].start_date : '';
            var end_date = experience[experience_i].end_date ? experience[experience_i].end_date : '';
            var date_status = false;
            if (start_date != '0000-00-00' && start_date != '') {
                date_status = true;
                start_date = await utils.change_data_format(start_date);
            }
            if (date_status) {
                if (end_date != '0000-00-00' && end_date != '') {
                    end_date = await utils.change_data_format(end_date);
                    var sorted_experience=await utils.sortExperienceByDate(experience,'asc');
                    if(sorted_experience.length>0){
                        current_position=sorted_experience[sorted_experience.length-1].position;
                    }
                } else {
                    end_date = 'Present';
                    current_position = experience[experience_i].position;
                }
            }
            console.log(date_status, start_date, end_date)
            experience_section = experience_section + '<div class="subblock">';
            experience_section = experience_section + '<h4>' + experience[experience_i].company_name + '</h4>';
            experience_section = experience_section + '<h5>' + experience[experience_i].position + '</h5>';
            experience_section = experience_section + '<h6>' + start_date + ' - ' + end_date + '</h6>';
            var responsibilities = experience[experience_i].responsilbilities ? experience[experience_i].responsilbilities.split(';') : '';
            if (responsibilities.length > 0) {
                experience_section = experience_section + '<ul>';
                for (var responsibility_i = 0; responsibility_i < responsibilities.length; responsibility_i++) {
                    experience_section = experience_section + '<li>' + responsibilities[responsibility_i] + '</li>';
                }
                experience_section = experience_section + '</ul>';
            }
            //experience_section=experience_section+'<ul><li>Designed safety-focused experiences for Riders and Drivers </li></ul>'
            experience_section = experience_section + '</div>';

        }
        experience_section = experience_section + '</div>'
    }
    if (education_flag_status) {
        education_section = education_section + '<div class="block">';
        education_section = education_section + '<h3><span>Education</span></h3>';
        for (var education_i = 0; education_i < education.length; education_i++) {
            education_section = education_section + '<div class="subblock">';
            education_section = education_section + '<h4>' + education[education_i].institution + '</h4>';
            education_section = education_section + '<h6>' + education[education_i].course_name + ', ' + education[education_i].academic_year + '</h6>';
            education_section = education_section + '</div>';
        }
        education_section = education_section + '</div>';
    }
    if (skill_flag_status) {
        skill_section = skill_section + '<div class="block">';
        skill_section = skill_section + '<h3><span>skills</span></h3>';
        for (var skill_i = 0; skill_i < skill.length; skill_i++) {
            skill_section = skill_section + '<div class="progress">';
            skill_section = skill_section + '<div class="p-label">' + skill[skill_i].skill + '</div>';
            if (skill[skill_i].rating_status == 1) {
                skill_section = skill_section + '<div class="bar">';
                skill_section = skill_section + '<div class="bar-fill" style="width: ' + skill[skill_i].rating * 20 + '%;"></div>';
                skill_section = skill_section + '</div>';
            }
            skill_section = skill_section + '</div>';
        }
        skill_section = skill_section + '</div>';
    }
    
    if (language_flag_status) {
        language_section = language_section + '<div class="block">';
        language_section = language_section + '<h3><span>Languages</span></h3>';
        for (var language_i = 0; language_i < language.length; language_i++) {
            language_section = language_section + '<div class="progress">';
            language_section = language_section + '<div class="p-label">' + language[language_i].language + '</div>';
            if (language[language_i].rating_status == 1) {
                language_section = language_section + '<div class="bar">';
                language_section = language_section + '<div class="bar-fill" style="width: ' + language[language_i].rating * 20 + '%;"></div>';
                language_section = language_section + '</div>';
            }
            language_section = language_section + '</div>';
        }
        language_section = language_section + '</div';
    }
    if (certificate_flag_status) {
        certificate_section = certificate_section + '<div class="block">';
        certificate_section = certificate_section + '<h3><span>Certifications</span></h3>';
        for (var certificate_i = 0; certificate_i < certificate.length; certificate_i++) {
            certificate_section = certificate_section + '<p>' + certificate[certificate_i].document_type + '</p>';
        }
        certificate_section = certificate_section + '</div>';
    }

    if (additional_feature_flag_status) {
        for (var additional_feature_i = 0; additional_feature_i < additional_feature.length; additional_feature_i++) {
            if(additional_feature[additional_feature_i].show_status==1 && additional_feature[additional_feature_i].type_description!=''){
                additional_feature_section = additional_feature_section + '<div class="block">';
                additional_feature_section = additional_feature_section + '<h3><span>' + additional_feature[additional_feature_i].type + '</span></h3>';
                additional_feature_section = additional_feature_section + '<p>' + additional_feature[additional_feature_i].type_description + '</p>';
                additional_feature_section = additional_feature_section + '</div>';
            }
        }
    }

    if(disabled==1){
        if(disability_type!=''){
            disability_section=disability_section+`<div class="block"><h3><span>Physical Disability</span></h3><p>${disability_type}</p></div>`;
        }
    }

    var html_opening = `<!doctype html>
    <html lang="en">
      <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>CV Template</title>
    
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;700&display=swap" rel="stylesheet"> 
        <!--<link href="css/style.css" rel="stylesheet" type="text/css">-->
        <style>
        body {
            font-size: 9px;
            color: rgba(0, 0, 0, 0.7);
            font-family: "Poppins", sans-serif;
            font-weight: 400;
            line-height: 11px;
            /*margin: 0;*/
             }
          
          .wrapper {
            width: 100%;
            /*max-width: 595px;*/
            max-width: 715px;
            padding: 40px;
            margin: 20px auto;
            /*margin: 0 !important;*/
            background-color: #f6f8fd;
            background-image: url(${appURL}uploads/images/template/top_bg.png), url(${appURL}uploads/images/template/bottom_bg.png);
            background-size: 300px, 100%;
            background-repeat: no-repeat, no-repeat;
            background-position: top right, center 104%;
            border-radius: 6px;
            padding-bottom: 120px; }
            @media print {
              .wrapper {
                border: 0; } }
          
          h1 {
            font-size: 36px;
            font-weight: 700;
            line-height: 45px;
            color: #00356B;
            margin: 0;
            padding-bottom: 4px; }
          
          h2 {
            font-size: 12px;
            font-weight: 700;
            line-height: 18px;
            letter-spacing: 0.02em;
            margin: 0;
            color: rgba(0, 53, 107, 0.7);
            padding-bottom: 7px; }
          
          h3 {
            font-size: 15px;
            font-weight: 700;
            line-height: 22px;
            letter-spacing: 0.02em;
            color: rgba(0, 53, 107, 0.7);
            margin: 0;
            padding-bottom: 9px;
            text-transform: capitalize; }
          
          h4, h5, h6 {
            margin: 0; }
          
          h4, h5 {
            color: #000000; }
          
          h4 {
            font-size: 10px;
            font-weight: 700;
            line-height: 15px;
            letter-spacing: 0.02em;
            text-align: left;
            padding-bottom: 2px; }
          
          h5 {
            font-size: 9px;
            font-weight: 400;
            line-height: 14px;
            letter-spacing: 0.01em;
            text-align: left;
            padding-bottom: 3px; }
          
          h6 {
            color: rgba(0, 0, 0, 0.7);
            font-size: 9px;
            font-weight: 400;
            line-height: 14px;
            letter-spacing: 0.01em;
            text-align: left;
            padding-bottom: 5px; }
            h6:last-child {
              padding-bottom: 0; }
          
          .about {
            font-size: 9px;
            font-weight: 400;
            line-height: 14px;
            max-width: 310px;
            padding-bottom: 30px; }
          
          p {
            margin: 0; }
          
          .left {
            width: 135px; }
            .left p {
              padding-bottom: 12px;
              font-size: 10px;
              font-weight: 400;
              line-height: 12px;
              letter-spacing: 0.01em;
              color: rgba(0, 0, 0, 0.7);
              margin: 0; }
              .left p strong {
                font-size: 10px;
                font-weight: 700;
                line-height: 12px;
                letter-spacing: 0.02em;
                color: #000000;
                padding-bottom: 4px; }
          
          .right {
            padding-right: 50px;
            width: 100%; }
            .right ul, .right p {
              font-size: 9px;
              font-weight: 400;
              line-height: 13px;
              letter-spacing: 0em;
              color: rgba(0, 0, 0, 0.7);
              margin: 0; }
            .right ul {
              padding-left: 16px; }
          
          .content-table td {
            vertical-align: top; }
          
          .block {
            padding-bottom: 30px; }
            .block:last-child {
              padding-bottom: 0; }
            .block p:last-child {
              padding-bottom: 0; }
          
          .subblock {
            padding-bottom: 15px; }
            .subblock:last-child {
              padding-bottom: 0; }
          
          .p-label {
            font-size: 9px;
            font-weight: 400;
            line-height: 11px;
            letter-spacing: 0.01em;
            text-align: left;
            padding-bottom: 6px; }
          
          .bar {
            background: #D9D9D9;
            height: 3px;
            width: 100%;
            margin-bottom: 17px; }
            .bar .bar-fill {
              height: 100%;
              background: #000000; }          
            .address{
                width: 135px;
                word-wrap: break-word;
            }
        </style>
    </head>
    
    <body>
    
        <div class="wrapper">
            <div class="header">
                <h1>${username}</h1>
                <h2>${current_position}</h2>
                ${objective_section}
            </div>
            <div class="cv-body">
            <table class="content-table">
            <tbody>
            <tr>
                <td class="right">
                    ${experience_section}
                    ${education_section}
                    ${additional_feature_section}
                    ${disability_section}
                </td>
                <td class="left">
                    <div class="block">
                        <h3><span>Details</span></h3>
                        <p class="address">
                            <strong>Address</strong><br />
                            ${address}
                        </p>
                        <p class="address">
                            <strong>Phone</strong><br />
                            ${contact_number}
                        </p>
                        <p class="address">
                            <strong>Email</strong><br />
                            ${email}
                        </p>
                    </div>
                    ${skill_section}
                    ${language_section}
                    ${certificate_section}
                </td>`


    var html_closing = `</tr></tbody></table></div></div></body></html>`;
    return html_opening + html_closing;
}

async function template6(color_code, username, profile_flag_status, profile_pic, address, email, contact_number, skill_flag_status, skill, certificate_flag_status, certificate, objective_flag_status, objective, experience_flag_status, experience, education_flag_status, education, language_flag_status, language, additional_feature_flag_status, additional_feature,disabled,disability_type) {
    var skill_section = '';
    var certificate_section = '';
    var experience_section = '';
    var education_section = '';
    var language_section = '';
    var profile_pic_tag = '';
    var current_position = '';
    var additional_feature_section = '';
    var objective_section = '';
    var contact_section='';
    var disability_section='';
    
    if(address!='' || contact_number!='' || email!=''){
        contact_section=contact_section+`
            <div class="block">
                <h3><span>Details</span></h3>
        `;
        if(address!=''){
            contact_section=contact_section+`
                <p class="address">
                    <strong>Address</strong><br />
                    ${address}
                </p>
            `;
        }
        if(contact_number!=''){
            contact_section=contact_section+`
                <p class="address">
                    <strong>Phone</strong><br />
                    ${contact_number}
                </p>
            `;
        }
        if(email!=''){
            contact_section=contact_section+`
                <p class="address">
                    <strong>Email</strong><br />
                    ${email}
                </p>
            `;
        }
        contact_section=contact_section+`</div>`;
    }
    if (certificate_flag_status) {
        certificate_section = certificate_section + '<div class="block">';
        certificate_section = certificate_section + '<h3><span>Certifications</span></h3>';
        for (var certificate_i = 0; certificate_i < certificate.length; certificate_i++) {
            certificate_section = certificate_section + '<p>' + certificate[certificate_i].document_type + '</p>';
        }
        certificate_section = certificate_section + '</div>';
    }

    if (skill_flag_status) {
        skill_section = skill_section + '<div class="block">';
        skill_section = skill_section + '<h3><span>skills</span></h3>';
        for (var skill_i = 0; skill_i < skill.length; skill_i++) {
            skill_section = skill_section + '<div class="progress">';
            skill_section = skill_section + '<div class="p-label">' + skill[skill_i].skill + '</div>';
            if (skill[skill_i].rating_status == 1) {
                skill_section = skill_section + '<div class="bar">'
                skill_section = skill_section + '<div class="bar-fill" style="width: ' + skill[skill_i].rating * 20 + '%;"></div>'
                skill_section = skill_section + '</div>';
            }
            skill_section = skill_section + '</div>';

            // skill_section=skill_section+`
            //     <div class="progress">
            //         <div class="p-label">${skill[skill_i].skill}</div>
            //         <div class="bar">
            //             <div class="bar-fill" style="width: 90%;"></div>
            //         </div>
            //     </div>
            // `;
        }
    }

    if (language_flag_status) {
        language_section = language_section + '<div class="block" style="margin-top: 32px;"><h3><span>Languages</span></h3>';
        for (var language_i = 0; language_i < language.length; language_i++) {
            language_section = language_section + '<div class="progress"><div class="p-label">' + language[language_i].language + '</div>';
            if (language[language_i].rating_status==1) {
                language_section = language_section + '<div class="bar"><div class="bar-fill" style="width: ' + language[language_i].rating * 20 + '%;"></div></div>';
            }
            language_section = language_section + '</div>';
        }
        language_section = language_section + '</div>';
    }

    if (objective_flag_status) {
        objective_section = objective_section + `
        <div class="block">
            <h3><span>profile</span></h3>
            <p>${objective}</p>
        </div>`;
    }

    if (experience_flag_status) {
        experience_section = experience_section + '<div class="block"><h3><span>experience</span></h3>';
        for (var experience_i = 0; experience_i < experience.length; experience_i++) {
            var start_date = experience[experience_i].start_date ? experience[experience_i].start_date : '';
            var end_date = experience[experience_i].end_date ? experience[experience_i].end_date : '';
            var date_status = false;
            if (start_date != '0000-00-00' && start_date != '') {
                date_status = true;
                start_date = await utils.change_data_format(start_date);
            }
            if (date_status) {
                if (end_date != '0000-00-00' && end_date != '') {
                    end_date = await utils.change_data_format(end_date);
                    var sorted_experience=await utils.sortExperienceByDate(experience,'asc');
                    if(sorted_experience.length>0){
                        current_position=sorted_experience[sorted_experience.length-1].position;
                    }
                } else {
                    end_date = 'Present';
                    current_position = experience[experience_i].position;
                }
            }
            if(experience_i!=0){
                experience_section = experience_section + '<div class="subblock" style="margin-top: 10px;"><h4>' + experience[experience_i].company_name + '</h4><h5>' + experience[experience_i].position + '</h5><h6>'+start_date+' - '+end_date+'</h6>';
            }else{
                experience_section = experience_section + '<div class="subblock"><h4>' + experience[experience_i].company_name + '</h4><h5>' + experience[experience_i].position + '</h5><h6>'+start_date+' - '+end_date+'</h6>';
            }
            
            var responsibilities = experience[experience_i].responsilbilities ? experience[experience_i].responsilbilities.split(';') : '';
            if (experience[experience_i].responsilbilities.length > 0) {
                experience_section = experience_section + '<ul>';
                for (var responsibility_i = 0; responsibility_i < responsibilities.length; responsibility_i++) {
                    experience_section = experience_section + '<li>' + responsibilities[responsibility_i] + '</li>';
                }
                experience_section = experience_section + '</ul>';
            }

        }
        experience_section = experience_section + '</div>';
    }

    if (education_flag_status) {
        education_section = education_section + '<div class="block" style="margin-top: 14px;"><h3><span>Education</span></h3>';
        for (var education_i = 0; education_i < education.length; education_i++) {
            education_section = education_section + `
                <div class="subblock">
                    <h4>${education[education_i].institution}</h4>
                    <h6>${education[education_i].course_name}, ${education[education_i].academic_year}</h6>
                </div>
            `
        }
        education_section = education_section + '</div>';
    }

    if (additional_feature_flag_status) {
        for (var additional_feature_i = 0; additional_feature_i < additional_feature.length; additional_feature_i++) {
            if(additional_feature[additional_feature_i].show_status==1 && additional_feature[additional_feature_i].type_description!=''){
                additional_feature_section = additional_feature_section + '<div class="block"><h3><span>' + additional_feature[additional_feature_i].type + '</span></h3>';
                //additional_feature_section=additional_feature_section+'<div class="subblock"><h4>'+additional_feature[additional_feature_i].type_description+'</h4><h6>'+additional_feature[additional_feature_i].type_description+'</h6></div></div>';
                additional_feature_section = additional_feature_section + '<div class="subblock"><h6>' + additional_feature[additional_feature_i].type_description + '</h6></div></div>';
            }
        }
    }

    if(disabled==1){
        if(disability_type!=''){
            disability_section=disability_section+`<div class="block"><h3><span>Physical Disability</span></h3><div class="subblock"><h6>${disability_type}</h6></div></div>`;
        }
    }

    var html_opening = `<!doctype html>
    <html lang="en">
      <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>CV Template</title>
    
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"> 
        <style>
        body {
            font-weight: 400;
            font-size: 9px;
            color: rgba(0, 0, 0, 0.7);
            font-family: "Roboto", sans-serif;
            line-height: 11px;
            /*margin: 0;*/
             }
          
          .wrapper {
            width: 100%;
            max-width: 595px;
            padding: 40px;
            margin: 20px auto;
            /*border: 1px solid #000;*/
             }
          
          h1 {
            font-size: 36px;
            font-weight: 700;
            line-height: 45px;
            text-transform: uppercase;
            color: #000000;
            margin: 0;
            padding-bottom: 4px; }
          
          h2 {
            font-size: 10px;
            font-weight: 400;
            line-height: 12px;
            letter-spacing: 0.02em;
            margin: 0;
            padding-bottom: 24px; }
          
          h3 {
            font-size: 15px;
            font-weight: 700;
            line-height: 18px;
            letter-spacing: 0.02em;
            text-transform: uppercase;
            color: #000000;
            margin: 0;
            padding-bottom: 15px; }
            h3 span {
              text-decoration: underline; }
          
          h4, h5, h6 {
            margin: 0; }
          
          h4, h5 {
            color: #000000; }
          
          h4 {
            font-size: 10px;
            font-weight: 700;
            line-height: 12px;
            letter-spacing: 0.02em;
            text-align: left;
            padding-bottom: 3px; }
          
          h5 {
            font-size: 9px;
            font-weight: 400;
            line-height: 11px;
            letter-spacing: 0.01em;
            text-align: left;
            padding-bottom: 3px; }
          
          h6 {
            color: rgba(0, 0, 0, 0.7);
            font-size: 9px;
            font-weight: 400;
            line-height: 11px;
            letter-spacing: 0.01em;
            text-align: left;
            padding-bottom: 8px; }
            h6:last-child {
              padding-bottom: 0; }
          
          p {
            margin: 0; }
          
          .left {
            max-width: 190px;
            padding-right: 26px;
            padding-top: 24px;
            border-top: 1px solid rgba(0, 0, 0, 0.15);
            border-right: 1px solid rgba(0, 0, 0, 0.15); }
            .left p {
              padding-bottom: 12px;
              font-size: 10px;
              font-weight: 400;
              line-height: 12px;
              letter-spacing: 0.01em;
              color: rgba(0, 0, 0, 0.7);
              margin: 0; }
              .left p strong {
                font-size: 10px;
                font-weight: 700;
                line-height: 12px;
                letter-spacing: 0.02em;
                color: #000000;
                padding-bottom: 4px; }
          
          .right {
            padding-left: 26px;
            padding-top: 24px;
            border-top: 1px solid rgba(0, 0, 0, 0.15); }
            .right ul, .right p {
              font-size: 9px;
              font-weight: 400;
              line-height: 13px;
              letter-spacing: 0em;
              color: rgba(0, 0, 0, 0.7);
              margin: 0; }
            .right ul {
              padding-left: 16px; }
          
          .content-table td {
            vertical-align: top; }
          
          .block {
            padding-bottom: 30px; }
            .block:last-child {
              padding-bottom: 0; }
            .block p:last-child {
              padding-bottom: 0; }
          
          .subblock {
            padding-bottom: 15px; }
            .subblock:last-child {
              padding-bottom: 0; }
          
          .p-label {
            font-size: 9px;
            font-weight: 400;
            line-height: 11px;
            letter-spacing: 0.01em;
            text-align: left;
            padding-bottom: 6px; }
          
          .bar {
            background: #D9D9D9;
            height: 3px;
            width: 100%;
            margin-bottom: 17px; }
            .bar .bar-fill {
              height: 100%;
              background: #000000; }

            .address{
                word-wrap: break-word;
            }
          
          /*# sourceMappingURL=style.css.map */          
        </style>
        <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap" rel="stylesheet">
    </head>
    
    <body>
    
        <div class="wrapper">
            <div class="header">
                <h1>${username}</h1>
                <h2>${current_position}</h2>
            </div>`;
    var html_closing = `
        <div class="cv-body">
                <table class="content-table">
                    <tbody>
                        <tr>
                            <td class="left">
                                ${contact_section}
                                ${certificate_section}
                                ${skill_section}
                                ${language_section}
                            </td>
                            <td class=right>
                                ${objective_section}
                                ${experience_section}
                                ${education_section}
                                ${additional_feature_section}
                                ${disability_section}
                            </td>
                        </tr>
                    </tbody>
                </table>
        </div>
    </div><!-- ./wrapper -->

    </body>

    </html>`;
    return html_opening + html_closing;
}

async function template7(color_code, username, profile_flag_status, profile_pic, address, email, contact_number, skill_flag_status, skill, certificate_flag_status, certificate, objective_flag_status, objective, experience_flag_status, experience, education_flag_status, education, language_flag_status, language, additional_feature_flag_status, additional_feature,disabled,disability_type) {
    var skill_section = '';
    var certificate_section = '';
    var experience_section = '';
    var education_section = '';
    var language_section = '';
    var profile_pic_tag = '';
    var current_position = '';
    var additional_feature_section = '';
    var objective_section = '';
    var contact_section='';
    var disability_section='';

    if(address!='' || email!='' || contact_number!=''){
        contact_section=contact_section+`<table class="table-contact"><tr>`;
        if(address!=''){
            contact_section=contact_section+`<td><img src="${appURL}uploads/images/template/Location.png"/><span class="span-content">${address}</span></td>`;
        }
        if(email!=''){
            contact_section=contact_section+`<td><img src="${appURL}uploads/images/template/Mail_7.png"/><span class="span-content">${email}</span></td>`;
        }
        if(contact_number!=''){
            contact_section=contact_section+`<td><img src="${appURL}uploads/images/template/Call.png"/><span class="span-content">${contact_number}</span></td>`;
        }
        contact_section=contact_section+`</tr></table>`;
    }

    if (profile_flag_status) {
        profile_pic_tag = `<img src="${profile_pic}" class="profile-img" />`;
    }

    if (objective_flag_status) {
        objective_section = objective_section + `<tr>
        <td class="label">Profile</td>
        <td class="content" style="font-size:13px;font-weight:400px;line-height: 15px;">
            ${objective}
        </td>
    </tr>`
    }

    if (experience_flag_status) {
        experience_section = experience_section + '<tr><td class="label">experience</td><td class="content">';
        for (var experience_i = 0; experience_i < experience.length; experience_i++) {
            var start_date = experience[experience_i].start_date ? experience[experience_i].start_date : '';
            var end_date = experience[experience_i].end_date ? experience[experience_i].end_date : '';
            var date_status = false;
            if (start_date != '0000-00-00' && start_date != '') {
                date_status = true;
                start_date = await utils.change_data_format(start_date);
            }
            if (date_status) {
                if (end_date != '0000-00-00' && end_date != '') {
                    end_date = await utils.change_data_format(end_date);
                    var sorted_experience=await utils.sortExperienceByDate(experience,'asc');
                    if(sorted_experience.length>0){
                        current_position=sorted_experience[sorted_experience.length-1].position;
                    }
                } else {
                    end_date = 'Present';
                    current_position = experience[experience_i].position;
                }
            }
            experience_section = experience_section + '<div class="subblock"><h4>' + experience[experience_i].company_name + '</h4><h5>' + experience[experience_i].position + '</h5><h6>' + start_date + ' - ' + end_date + '</h6>';
            var responsibilities = experience[experience_i].responsilbilities ? experience[experience_i].responsilbilities.split(';') : '';
            if (responsibilities.length > 0) {
                experience_section = experience_section + '<ul>';
                for (var responsibility_i = 0; responsibility_i < responsibilities.length; responsibility_i++) {
                    experience_section = experience_section + '<li style="font-size: 13px;line-height: 16px;">' + responsibilities[responsibility_i] + '</li>';
                }
                experience_section = experience_section + '</ul>';
            }
            experience_section = experience_section + '</div>';
        }
        experience_section = experience_section + '</td></tr>';
    }

    if (education_flag_status) {
        education_section = education_section + '<tr><td class="label">Education</td><td class="content">';
        for (var education_i = 0; education_i < education.length; education_i++) {
            education_section = education_section + '<div class="item"><h4>' + education[education_i].institution + '</h4><h3 style="font-size: 13px;line-height: 16px;">' + education[education_i].course_name + ', ' + education[education_i].academic_year + '</h3></div>';
        }
        education_section = education_section + '</td></tr>';
    }

    if (skill_flag_status) {
        skill_section = skill_section + '<tr><td class="label">Skills</td><td class="content">';
        for (var skill_i = 0; skill_i < skill.length; skill_i++) {
            skill_section = skill_section + '<span class="pillow" style="padding-bottom: 6px;line-height:14px;font-size:13px;font-weight:400px;">' + skill[skill_i].skill + '</span>';
        }
        skill_section = skill_section + '</td></tr>';
    }

    if (language_flag_status) {
        language_section = language_section + '<tr><td class="label">Languages</td>';
        var last_loop_iteration = language.length - 1;
        language_section = language_section + '<td class="content">';
        for (var language_i = 0; language_i < language.length; language_i++) {
            language_section = language_section + language[language_i].language;
            if (language[language_i].rating_status == 1) {
                var language_rating_symbol = '';
                if (language[language_i].rating == 5) {
                    language_rating_symbol = 'A1';
                } else if (language[language_i].rating == 4) {
                    language_rating_symbol = 'A2';
                } else if (language[language_i].rating == 3) {
                    language_rating_symbol = 'A3';
                } else if (language[language_i].rating == 2) {
                    language_rating_symbol = 'A4';
                } else if (language[language_i].rating == 1) {
                    language_rating_symbol = 'A5';
                }
                language_section = language_section + ': ' + language_rating_symbol;
            }

            if (language_i != last_loop_iteration) {
                language_section = language_section + '<span class="seperator">&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;<span>';
            }
        }
        language_section = language_section + '</td>';
    }

    if (certificate_flag_status) {
        certificate_section = certificate_section + '<tr><td class="label" >Certifications</td><td class="content">';
        for (var certificate_i = 0; certificate_i < certificate.length; certificate_i++) {
            certificate_section = certificate_section +`<div style="padding-bottom: 6px;line-height:14px;font-size:13px;font-weight:400px;">${certificate[certificate_i].document_type}</div>`;
        }
        certificate_section = certificate_section + '</td></tr>';
    }

    if (additional_feature_flag_status) {
        for (var additional_feature_i = 0; additional_feature_i < additional_feature.length; additional_feature_i++) {
            if(additional_feature[additional_feature_i].show_status==1 && additional_feature[additional_feature_i].type_description!=''){
                additional_feature_section = additional_feature_section + '<tr><td class="label">' + additional_feature[additional_feature_i].type + '</td>';
                additional_feature_section = additional_feature_section + '<td class="content"  style="padding-bottom: 6px;line-height:14px;font-size:13px;font-weight:400px;">' + additional_feature[additional_feature_i].type_description + '</td>';
                additional_feature_section = additional_feature_section + '</td></tr>';
            }
        }
    }

    if(disabled==1){
        if(disability_type!=''){
            disability_section=disability_section+`<tr><td class="label">Physical Disability</td><td class="content"  style="padding-bottom: 6px;line-height:14px;font-size:13px;font-weight:400px;">${disability_type}</td></td></tr>`;
        }
    }

    var html_opening = `
    <!doctype html>
    <html lang="en">
      <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>CV Template</title>
    
        <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap" rel="stylesheet">
        <style>
        body {
            font-weight: 400;
            font-size: 13px;
            color: rgba(0, 0, 0, 0.7);
            font-family: "Roboto", sans-serif; }
          
          h1 {
            font-size: 17px;
            font-weight: 700;
            line-height: 20px;
            letter-spacing: 0em;
            text-align: center;
            color: #000000;
            margin: 0;
            padding-bottom: 5px;
            text-transform: capitalize; }
          
          h4, h5, h6 {
            margin: 0; }
          
          h4, h5 {
            color: #000000; }
          
          h4 {
            font-size: 16px;
            font-weight: 700;
            line-height: 12px;
            letter-spacing: 0.02em;
            text-align: left;
            padding-bottom: 8px; }
          
          h5 {
            font-size: 13px;
            font-weight: 400;
            line-height: 11px;
            letter-spacing: 0.01em;
            text-align: left;
            padding-bottom: 8px; }
          
          h6 {
            color: rgba(0, 0, 0, 0.7);
            font-size: 13px;
            font-weight: 400;
            line-height: 11px;
            letter-spacing: 0.01em;
            text-align: left;
            padding-bottom: 9px; }
            h6:last-child {
              padding-bottom: 0; }
          
          .pillow {
            background: #EEEEEE;
            border-radius: 15px;
            padding: 4px 8px 4px 8px;
            font-size: 9px;
            line-height: 11px;
            color: #000000;
            margin-right: 7px;
            margin-bottom: 3px; }
          
          .wrapper {
            width: 100%;
            max-width: 595px;
            padding: 45px;
            margin: 20px auto;
            border: 1px solid #000;
            background: url(${appURL}uploads/images/template/top_bg_7.png);
            background-repeat: no-repeat;
            background-size: contain;
            background-position: top center; }
            @media print {
              .wrapper {
                border: 0; } }
          
          .profile-img-td {
            width: 100px; }
          
          .profile-img {
            width: 50px;
            height: 50px;
            border-radius: 50%;
            margin-bottom: 11px; }
          
          .profile-img-td > img {
            width: 100px;
            height: 100px;
            float: left;
            margin-right: 23px; }
          
          .profile-top {
            text-align: center;
            padding-bottom: 30px; }
          
          .cv-body {
            border-top: 1px solid rgba(0, 0, 0, 0.07);
            padding-top: 30px; }
          
          .table-contact {
            max-width: 90%;
            width: 100%;
            margin: 0 auto; }
            .table-contact td {
              font-size: 13px;
              line-height: 12px;
              letter-spacing: .01em; }
              .table-contact td > img {
                margin-right: 6px; }
          
          .designation {
            font-size: 13px;
            line-height: 12px;
            letter-spacing: .02em; }
          
          .header {
            position: relative;
            padding-bottom: 30px; }
          
          .contact {
            position: absolute;
            right: 0;
            top: 0;
            text-align: right;
            line-height: 13px;
            font-family: "Roboto", sans-serif;
            font-weight: 400;
            color: rgba(0, 0, 0, 0.6); }
            .contact p {
              font-size: 8px; }
            .contact a {
              display: inline-block;
              padding-bottom: 3px;
              color: inherit;
              text-decoration: none; }
          
          .content-table td {
            vertical-align: top;
            padding-bottom: 30px;
            font-size: 10px;
            line-height: 12px;
            color: rgba(0, 0, 0, 0.7);
            font-family: "Roboto", sans-serif; }
            .content-table td.label {
              font-family: "Roboto", sans-serif;
              font-size: 14px;
              font-weight: 700;
              line-height: 14px;
              letter-spacing: 0.02em;
              text-align: left;
              width: 155px;
              text-transform: uppercase;
              color: #000000; }
            .content-table td.content.bold {
              color: #000000;
              font-size: 9px;
              font-weight: 400;
              line-height: 11px; }
          .content-table .item {
            padding-bottom: 20px; }
            .content-table .item:last-child {
              padding-bottom: 0; }
          .content-table h2 {
            font-size: 10px;
            font-weight: 700;
            line-height: 12px;
            text-align: left;
            margin: 0;
            color: #000000;
            padding-bottom: 5px; }
          .content-table h3 {
            font-size: 9px;
            font-weight: 400;
            line-height: 11px;
            color: rgba(0, 0, 0, 0.7);
            padding-bottom: 8px;
            margin: 0; }
          .content-table ul {
            margin: 0;
            padding-left: 16px; }
            .content-table ul li {
              font-family: "Roboto", sans-serif;
              font-size: 9px;
              font-weight: 400;
              line-height: 13px; }
          .content-table .seperator {
            margin: 0 7px; }
          .content-table tr:last-child td {
            padding-bottom: 0; }
          .content-table .subblock {
            padding-bottom: 15px; }
            .content-table .subblock:last-child {
              padding-bottom: 0; }
          
          /*# sourceMappingURL=style.css.map */
          .flex-item {
                flex: 1;
                display: flex;
                align-items: flex-start;
                margin: 5px 10px;
                width: 33.33%;
            }
          .icon {
                margin-right: 5px;
                flex-shrink: 0;
                position: relative;
                top: 4px;
            }
          .span-content {
                white-space: normal;
                word-break: break-all;
            }
        </style>
        
    </head>
    
    <body>
    
        <div class="wrapper">
            <div class="header">
                <div class="profile-top">
                    ${profile_pic_tag}
                    <h1>${username}</h1>
                    <div class="designation">${current_position}</div>
                </div>
                ${contact_section}
            </div>`;
    var html_closing = `<div class="cv-body">
            <table class="content-table">
                <tbody>
                    ${objective_section}
                    ${experience_section}
                    ${education_section}
                    ${skill_section}
                    ${language_section}   
                    ${certificate_section} 
                    ${additional_feature_section} 
                    ${disability_section}
                </tbody>
            </table>
        </div>
    </div><!-- ./wrapper -->

</body>

</html>`;
    return html_opening + html_closing;
}

async function template8(color_code, username, profile_flag_status, profile_pic, address, email, contact_number, skill_flag_status, skill, certificate_flag_status, certificate, objective_flag_status, objective, experience_flag_status, experience, education_flag_status, education, language_flag_status, language, additional_feature_flag_status, additional_feature,disabled,disability_type) {
    var skill_section = '';
    var certificate_section = '';
    var experience_section = '';
    var education_section = '';
    var language_section = '';
    var profile_pic_tag = '';
    var current_position = '';
    var additional_feature_section = '';
    var objective_section = '';
    var name_section='';
    var disability_section='';
    
    if (profile_flag_status) {
        profile_pic_tag = `<img src="${profile_pic}" alt="Profile" class="profile-dp" />`;
        //profile_pic_tag=`<img src="http://localhost:3000/uploads/images/template/profile_7.png" alt="Profile" class="profile-dp" />`;
    }
    if (objective_flag_status) {
        objective_section = objective_section + `<div class="about">${objective}</div>`;
    }
    if (experience_flag_status) {
        experience_section = experience_section + '<tr><td class="label">experience</td><td class="content">';
        for (var experience_i = 0; experience_i < experience.length; experience_i++) {
            var start_date = experience[experience_i].start_date ? experience[experience_i].start_date : '';
            var end_date = experience[experience_i].end_date ? experience[experience_i].end_date : '';
            var date_status = false;
            if (start_date != '0000-00-00' && start_date != '') {
                date_status = true;
                start_date = await utils.change_data_format(start_date);
            }
            if (date_status) {
                if (end_date != '0000-00-00' && end_date != '') {
                    end_date = await utils.change_data_format(end_date);
                    var sorted_experience=await utils.sortExperienceByDate(experience,'asc');
                    if(sorted_experience.length>0){
                        current_position=sorted_experience[sorted_experience.length-1].position;
                    }
                } else {
                    end_date = 'Present';
                    current_position = experience[experience_i].position;
                }
            }
            experience_section = experience_section + '<div class="item"><h2>' + experience[experience_i].position + ', ' + experience[experience_i].company_name + '</h2><h3>' + start_date + ' - ' + end_date + '</h3>';
            var responsibilities = experience[experience_i].responsilbilities ? experience[experience_i].responsilbilities.split(';') : '';
            if (responsibilities.length > 0) {
                experience_section = experience_section + '<ul>';
                for (var responsibility_i = 0; responsibility_i < responsibilities.length; responsibility_i++) {
                    experience_section = experience_section + '<li style="overflow-wrap: break-word;padding-right:10px;">' + responsibilities[responsibility_i] + '</li>';
                }
                experience_section = experience_section + '</ul>';
            }
            experience_section = experience_section + '</div>';
        }
        experience_section = experience_section + '</td></tr>';
    }
    if (education_flag_status) {
        education_section = education_section + '<tr><td class="label">Education</td><td class="content"> ';
        for (var education_i = 0; education_i < education.length; education_i++) {
            if(education_i!=education.length-1){
                education_section = education_section + '<div class="item" style="padding-bottom:20px;"><h2>' + education[education_i].institution + '</h2><h3>' + education[education_i].course_name + ', class of ' + education[education_i].academic_year + '</h3></div>'
            }else{
                education_section = education_section + '<div class="item" style="padding-bottom:0px;"><h2>' + education[education_i].institution + '</h2><h3>' + education[education_i].course_name + ', class of ' + education[education_i].academic_year + '</h3></div>';
            }
            
        }
        education_section = education_section + '</td></tr>';
    }
    if (language_flag_status) {
        language_section = language_section + '<tr><td class="label">Languages</td><td class="content bold" style="font-size: 14px;">';
        var last_loop_iteration = language.length - 1;
        for (var language_i = 0; language_i < language.length; language_i++) {
            language_section = language_section + language[language_i].language;
            var language_rating_symbol = '';
            if (language[language_i].rating_status == 1) {
                if (language[language_i].rating == 5) {
                    language_rating_symbol = 'A1';
                } else if (language[language_i].rating == 4) {
                    language_rating_symbol = 'A2';
                } else if (language[language_i].rating == 3) {
                    language_rating_symbol = 'A3';
                } else if (language[language_i].rating == 2) {
                    language_rating_symbol = 'A4';
                } else if (language[language_i].rating == 1) {
                    language_rating_symbol = 'A5';
                }
                language_section = language_section + ': ' + language_rating_symbol;
                if (language_i != last_loop_iteration) {
                    language_section = language_section + ' <span class="seperator">&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;<span>';
                }
            }
        }
        language_section + language_section + '</td></tr>';
    }
    if (skill_flag_status) {
        skill_section = skill_section + '<tr><td class="label">Skills</td><td class="content bold"  style="font-size: 14px;">';
        var skill_last_iteration = skill.length - 1;
        for (var skill_i = 0; skill_i < skill.length; skill_i++) {
            skill_section = skill_section + skill[skill_i].skill;
            if (skill_i != skill_last_iteration) {
                skill_section = skill_section + ' <span class="seperator">|</span>';
            }
        }
        skill_section = skill_section + '</td></tr>';
    }
    if (certificate_flag_status) {
        certificate_section = certificate_section + '<tr><td class="label">Certifications</td><td class="content bold">';
        for (var certificate_i = 0; certificate_i < certificate.length; certificate_i++) {
            certificate_section = certificate_section + '<div class="item" style="font-size: 14px;">' + certificate[certificate_i].document_type + '</div>';
        }
        certificate_section = certificate_section + '</td></tr>';
    }
    if (additional_feature_flag_status) {
        for (var additional_feature_i = 0; additional_feature_i < additional_feature.length; additional_feature_i++) {
            if(additional_feature[additional_feature_i].show_status==1 && additional_feature[additional_feature_i].type_description!=''){
                additional_feature_section = additional_feature_section + '<tr><td class="label">' + additional_feature[additional_feature_i].type + '</td><td class="content bold">';
                additional_feature_section = additional_feature_section + '<div class="item" style="font-size: 14px;line-height: 18px;">' + additional_feature[additional_feature_i].type_description + '</div>';
                additional_feature_section = additional_feature_section + '</td></tr>';
            }
        }
    }

    if(disabled==1){
        if(disability_type!=''){
            disability_section=disability_section+`<tr><td class="label">Physical Disability</td><td class="content bold"><div class="item" style="font-size: 14px;line-height: 18px;">${disability_type}</div></td></tr>`;
        }
    }

    if(current_position!=''){
        name_section=`<h1>${username}, ${current_position}</h1>`
    }else{
        name_section=`<h1>${username}</h1>`
    }
    var html_opening = `
    <!doctype html>
    <html lang="en">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>CV Template</title>
        <style>
        body {
            font-weight: 400;
            font-size: 9px;
            color: rgba(0, 0, 0, 0.7);
            font-family: "Inter", sans-serif;
             }
        
        h1 {
            font-size: 18px;
            font-weight: 700;
            line-height: 18px;
            letter-spacing: 0em;
            text-align: left;
            color: #000000;
            text-transform: capitalize;
            margin: 0;
            padding-bottom: 10px; }
        
        .contact-top {
            font-size: 12.5px;
            font-weight: 400;
            line-height: 14px;
            letter-spacing: 0em;
            text-align: left;
            color: rgba(0, 0, 0, 0.7);
            padding-bottom: 24px; }
        
        .wrapper {
            width: 100%;
            max-width: 595px;
            padding: 45px;
            margin: 20px auto;
            /*border: 1px solid #000;*/
            background: url(${appURL}uploads/images/template/bg_8.png);
            background-size: contain;
            background-position: right top;
            background-repeat: no-repeat; }

            @media print {
                .wrapper {
                    box-shadow: none;
                    /*added css*/
                    max-width: 100%;
                    } }
        
        .profile-img-td {
            width: 100px; }
        
        .profile-img-td > img {
            width: 100px;
            height: 100px;
            float: left;
            margin-right: 23px; }
        
        .profile-dp {
            /*width: 50%;
            height: 50%;
            object-fit: contain;
            border-radius: 40%;*/

            width: 100px;
            height: 100px;
            object-fit: contain;
            border-radius:250px;
         }
        
        .about {
            font-size: 15px;
            font-weight: 400;
            line-height: 18px;
            letter-spacing: 0em;
            text-align: left;
            /*max-width: 342px;*/
            max-width: 600px; }
        
        .header {
            position: relative;
            padding-bottom: 30px; }
        
        .contact {
            position: absolute;
            right: 0;
            top: 0;
            text-align: right;
            line-height: 13px;
            font-family: "Inter", sans-serif;
            font-weight: 400;
            color: rgba(0, 0, 0, 0.6); }
            .contact p {
            font-size: 8px; }
            .contact a {
            display: inline-block;
            padding-bottom: 3px;
            color: inherit;
            text-decoration: none; }
        
        .content-table td {
            vertical-align: top;
            padding-bottom: 30px;
            font-size: 10px;
            line-height: 12px;
            color: rgba(0, 0, 0, 0.7);
            font-family: "Inter", sans-serif; }
            .content-table td.label {
            font-family: "Inter", sans-serif;
            font-size: 16px;
            font-weight: 500;
            line-height: 12px;
            letter-spacing: 0.03em;
            
            text-align: left;
            width: 163px;
            color: rgba(0, 0, 0, 0.5);
            text-transform: capitalize; }
            .content-table td.content.bold {
            color: #000000;
            font-size: 9px;
            font-weight: 400;
            line-height: 11px; }
        .content-table .item {
            padding-bottom: 20px; }
            .content-table .item:last-child {
            padding-bottom: 0; }
        .content-table h2 {
            font-size: 15px;
            font-weight: 700;
            line-height: 13px;
            text-align: left;
            margin: 0;
            color: #000000;
            padding-bottom: 7px; }
        .content-table h3 {
            font-size: 14px;
            font-weight: 400;
            line-height: 14px;
            color: rgba(0, 0, 0, 0.7);
            padding-bottom: 11px;
            margin: 0; }
        .content-table ul {
            margin: 0;
            padding-left: 19px; }
            .content-table ul li {
            font-family: "Inter", sans-serif;
            font-size: 14px;
            font-weight: 400;
            line-height: 18px;
            word-wrap: break-word; }
        .content-table .seperator {
            margin: 0 7px; }
        .content-table tr:last-child td {
            padding-bottom: 0; }
        
        /*# sourceMappingURL=style.css.map */
            </style>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400..700&display=swap" rel="stylesheet">
    </head>

    <body>

        <div class="wrapper">
            <div class="header">
                <table class="content-table">
                    <tbody>
                        <tr>
                            <td class="label">
                                ${profile_pic_tag}
                            </td>
                            <td class="content">
                                <div class="contact-top">
                                    <div style="padding-bottom:6px;">${address}</div>
                                    <div>${contact_number} ${email}</div>
                                </div>
                                ${name_section}
                                ${objective_section}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
    `;
    var html_closing = `
    <div class="cv-body">
    <table class="content-table">
        <tbody>   
            ${experience_section}                 
            ${education_section}
            ${language_section}
            ${skill_section}
            ${certificate_section}
            ${additional_feature_section}
            ${disability_section}
        </tbody>
    </table>
</div>
</div><!-- ./wrapper -->

</body>

</html>
    `;
    return html_opening + html_closing;
}

async function template9(color_code, username, profile_flag_status, profile_pic, address, email, contact_number, skill_flag_status, skill, certificate_flag_status, certificate, objective_flag_status, objective, experience_flag_status, experience, education_flag_status, education, language_flag_status, language, additional_feature_flag_status, additional_feature,disabled,disability_type) {
    var skill_section = '';
    var certificate_section = '';
    var experience_section = '';
    var education_section = '';
    var language_section = '';
    var profile_pic_tag = '';
    var current_position = '';
    var additional_feature_section = '';
    var objective_section = '';
    var contact_section = '';
    var name_section='';
    var disability_section='';
    
    
    if (profile_flag_status) {
        profile_pic_tag = `<img src="${profile_pic}" />`;
        //profile_pic_tag=`<img src="${appURL}uploads/images/template/profile_7.png" />`;
    }
    if (address != '' || email != '' || contact_number != '') {
        contact_section = `
            <div class="block">
                <h2>Contact</h2>
                <div class="contact-row"><img src="${appURL}uploads/images/template/mail.png" /><span class="span-content">${email}</span></div>
                <div class="contact-row"><img src="${appURL}uploads/images/template/tel.png" /><span class="span-content">${contact_number}</span></div>
                <div class="contact-row"><img src="${appURL}uploads/images/template/location_9.png" /><span class="span-content">${address}</span></div>
            </div>
        `;
    }
    if (education_flag_status) {
        education_section = education_section + '<div class="block"><h2>Education</h2>';
        for (var education_i = 0; education_i < education.length; education_i++) {
            education_section = education_section + `
                <div class="block-sm">
                    <h4>${education[education_i].qualification} in ${education[education_i].course_name}</h4>
                    <h5>${education[education_i].institution}</h5>
                    <div class="year">${education[education_i].academic_year}</div>
                </div>
            `;
        }
        education_section = education_section + '</div>';
    }
    if (skill_flag_status) {
        skill_section = skill_section + '<div class="block"><h2>Skills</h2>';
        for (var skill_i = 0; skill_i < skill.length; skill_i++) {
            skill_section = skill_section + `<div class="ellipse-row"><img src="${appURL}uploads/images/template/ellipse.png" /><span>${skill[skill_i].skill}</span></div>`;
        }
        skill_section = skill_section + '</div>';
    }
    if (certificate_flag_status) {
        certificate_section = certificate_section + '<div class="block"><h2>Certifications</h2>';
        for (var certificate_i = 0; certificate_i < certificate.length; certificate_i++) {
            // class="span-content"
            //certificate_section = certificate_section + `<div class="ellipse-row"><img src="${appURL}uploads/images/template/ellipse.png" /><span>${certificate[certificate_i].document_type}</span></div>`;
            certificate_section = certificate_section + `<div class="ellipse-row-certificate">
                <img src="${appURL}uploads/images/template/ellipse.png" class="bullet-image" />
                <span class="document-type">${certificate[certificate_i].document_type}</span>
            </div>`;
            //certificate_section=certificate_section+`<li>${certificate[certificate_i].document_type}</li>`
        }
        certificate_section = certificate_section + '</div>';
    }
    if (language_flag_status) {
        language_section = language_section + '<div class="block"><h2>Languages</h2>';
        for (var language_i = 0; language_i < language.length; language_i++) {
            language_section = language_section + `<div class="ellipse-row"><img src="${appURL}uploads/images/template/ellipse.png" /><span>${language[language_i].language}</span></div>`;
        }
        language_section = language_section + '</div>';
    }
    if (additional_feature_flag_status) {
        for (var additional_feature_i = 0; additional_feature_i < additional_feature.length; additional_feature_i++) {
            if(additional_feature[additional_feature_i].show_status==1 && additional_feature[additional_feature_i].type_description!=''){
                additional_feature_section = additional_feature_section + `
                    <div class="block">
                        <h2>${additional_feature[additional_feature_i].type}</h2>
                        <div class="ellipse-row"><span>${additional_feature[additional_feature_i].type_description}</span></div>
                    </div>
                `;
            }
        }
    }

    if(disabled==1){
        if(disability_type!=''){
            disability_section=disability_section+`
                <div class="block">
                    <h2>Physical Disability</h2>
                    <div class="ellipse-row"><span>${disability_type}</span></div>
                </div>`;
        }
    }
    if (objective_flag_status) {
        objective_section = objective_section + `
            <div class="block">
                <h2>Profile</h2>
                <p>${objective}</p>
                <hr />
            </div>
        `;
    }
    if (experience_flag_status) {
        experience_section = experience_section + ' <div class="block"><h2>Experience</h2>';
        for (var experience_i = 0; experience_i < experience.length; experience_i++) {
            var start_date = experience[experience_i].start_date ? experience[experience_i].start_date : '';
            var end_date = experience[experience_i].end_date ? experience[experience_i].end_date : '';
            var date_status = false;
            if (start_date != '0000-00-00' && start_date != '') {
                date_status = true;
                start_date = await utils.change_data_format(start_date);
            }
            if (date_status) {
                if (end_date != '0000-00-00' && end_date != '') {
                    end_date = await utils.change_data_format(end_date);
                    var sorted_experience=await utils.sortExperienceByDate(experience,'asc');
                    if(sorted_experience.length>0){
                        current_position=sorted_experience[sorted_experience.length-1].position;
                    }
                } else {
                    end_date = 'Present';
                    current_position = experience[experience_i].position;
                }
            }
            experience_section = experience_section + '<div class="subblock"><h3>' + experience[experience_i].company_name + '</h3><h4>' + experience[experience_i].position + '<span class="seperator">|</span><span class="duration">' + start_date + ' - ' + end_date + '</span></h4>';
            var responsibilities = experience[experience_i].responsilbilities ? experience[experience_i].responsilbilities.split(';') : '';
            if (responsibilities.length > 0) {
                for (var responsibility_i = 0; responsibility_i < responsibilities.length; responsibility_i++) {
                    experience_section = experience_section + '<div class="description">' + responsibilities[responsibility_i] + '</div>'
                }
            }
            experience_section = experience_section + '</div>';
        }
        experience_section = experience_section + '</div>';
    }
    if(current_position!=''){
        name_section=name_section+`<h1>i’m ${username},<br /><span style="text-transform:lowercase;color: #3A395E;">a</span> <span>${current_position}.</span></h1>`;
    }else{
        name_section=name_section+`<h1>i’m ${username}</h1>`;
    }



    var html_opening = `
        <!doctype html>
        <html lang="en">
        <head>
            <meta charset="utf-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <title>CV Template</title>
            <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;600;700&display=swap" rel="stylesheet">
            <style>
            body {
                font-family: "Roboto", sans-serif;
                font-weight: 400;
                color: #6E6D8F;
                font-size: 10px;
                line-height: 16px;
                zoom: 1.3;
                 }
            
            h1, h2, h3, h4, h5, h6, p {
                margin: 0; }
            
            h1 {
                font-weight: 700;
                font-size: 25px;
                line-height: 34px;
                color: #3A395E;
                text-transform: capitalize; }
                h1 span {
                color: #7051EF; }
            
            h2 {
                font-size: 17px;
                line-height: 20px;
                color: #3A395D;
                padding-bottom: 15px; }
            
            h3 {
                color: #7051EF;
                font-size: 11px;
                line-height: 14px;
                font-weight: 600;
                padding-bottom: 12px; }
            
            h4 {
                color: #3A395D;
                font-weight: 600;
                font-size: 11px;
                line-height: 13px;
                padding-bottom: 4px; }
            
            h5 {
                color: #6E6D8F;
                font-weight: 400;
                font-size: 11px;
                line-height: 13px;
                padding-bottom: 10px; }
            
            hr {
                background-color: #E5E5EA; }
            
            .year {
                color: #7051EF;
                font-weight: 500;
                font-size: 11px;
                line-height: 12px; }
            
            .duration {
                font-weight: 500;
                color: #6E6D8F; }
            
            .seperator {
                color: #D5D5E7;
                margin: 0 5px;
                font-weight: 400; }
            
            .upper-line {
                width: 45px;
                height: 3px;
                background: #7051EF;
                margin-bottom: 0px;
                display: inline-block; }
            
            .wrapper {
                width: 100%;
                max-width: 595px;
                margin: 20px auto;
                box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
                }
                @media print {
                .wrapper {
                    box-shadow: none;
                    /*added css*/
                    max-width: 100%;
                    margin: 0px;
                } }
            
            table {
                width: 100%;
                border-collapse: collapse; }
                table.header-table td.picture {
                width: 87px; }
                table.header-table td.picture > img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    border-radius: 50%; }
                table.header-table td.name {
                padding-left: 17px;
                vertical-align: top; }
                table.main-table td {
                vertical-align: top; }
                table td.col-small {
                padding: 30px 30px 30px;
                max-width: 200px; }
            
            .border {
                border: 1px solid #E5E5EA;
                border-top-left-radius: 15px;
                padding: 30px 40px 70px;
                border-right: 0;
                border-bottom: 0; }
                .border h4 {
                padding-bottom: 8px; }
            
            .header {
                padding: 30px;
                padding-bottom: 36px; }
            
            .contact-row {
                padding-bottom: 15px; }
                .contact-row:last-child {
                padding-bottom: 0; }
                .contact-row:after {
                content: "";
                display: table;
                clear: both; }
                .contact-row > img {
                margin-right: 6px;
                float: left; }
                .contact-row > span {
                line-height: 1.1;
                float: left; }
            .contact-row {
                display: flex;
                align-items: center; /* Align items vertically center */
                flex-wrap: wrap;    /* Allow items to wrap to the next line */
                }
            .contact-row span {
                flex: 1; /* Allow the span to take up available space */
            }
            .ellipse-row {
                padding-bottom: 15px; }
                .ellipse-row:last-child {
                padding-bottom: 0; }
                .ellipse-row:after {
                content: "";
                display: table;
                clear: both; }
                .ellipse-row > img {
                margin-right: 6px;
                float: left;
                margin-top: 5px; }
                .ellipse-row > span {
                float: left;
                font-size: 11px;
                line-height: 13px; }
            
            .block {
                padding-bottom: 35px; }
                .block:last-child {
                padding-bottom: 0; }
            
            .block-sm {
                padding-bottom: 15px; }
                .block-sm:last-child {
                padding-bottom: 0; }
            
            .subblock {
                padding-bottom: 30px; }
                .subblock:last-child {
                padding-bottom: 0; }
            
            /*# sourceMappingURL=style.css.map */

            .span-content {
                white-space: normal;
                word-break: break-all;
            }

            .list-margin{
                padding-left: 16px;
                margin-top: 10px;
            }
            
            .list-color{
                color: #7051EF;
            }

            .ellipse-row-certificate {
                display: flex;
                align-items: center;
            }

            .bullet-image {
                display: inline-block;
                margin-right: 5px; /* Adjust the margin as needed */
            }

            .document-type {
                display: inline-block;
                /*word-break: break-all;
                word-wrap: break-work;*/
            }
            
            </style>
        </head>
        
        <body>
        
            <div class="wrapper">
                <div class="header">
                    <table class="header-table">
                        <tbody>
                            <tr>
                                <td class="picture">
                                    ${profile_pic_tag}
                                </td>
                                <td class="name">
                                    <span class="upper-line"></span>
                                    ${name_section}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div><!-- ./header -->
            
    `;
    var html_closing = `
    <div class="main">
        <table class="main-table">
            <tbody>
                <tr>
                    <td class="col-small">
                        ${contact_section}
                        ${education_section}
                        ${skill_section}
                        ${certificate_section}
                        <!-- ./block -->
                    </td>
                    <td class="col-large">
                        <div class="border">
                            ${objective_section}
                            ${experience_section}
                            ${language_section}
                            ${additional_feature_section}
                            ${disability_section}
                            <!-- ./block -->
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    </div><!-- ./main -->
    </div><!-- ./wrapper -->

    </body>

    </html>`;
    return html_opening + html_closing;
}

async function template10(color_code, username, profile_flag_status, profile_pic, address, email, contact_number, skill_flag_status, skill, certificate_flag_status, certificate, objective_flag_status, objective, experience_flag_status, experience, education_flag_status, education, language_flag_status, language, additional_feature_flag_status, additional_feature,disabled,disability_type) {
    var skill_section = '';
    var certificate_section = '';
    var experience_section = '';
    var education_section = '';
    var language_section = '';
    var profile_pic_tag = '';
    var current_position = '';
    var additional_feature_section = '';
    var objective_section = '';
    var contact_section = '';
    var disability_section='';
    
    if (address != '' || email != '' || contact_number != '') {
        contact_section = `<div class="subblock">
                            <h3>Details</h3>
                            <div class="contact contact-detail">
                                <div style="max-width: 161px;white-space: normal;word-break: break-all;">${address}</div>
                                <div style="max-width: 161px;white-space: normal;word-break: break-all;">${contact_number}</div>
                                <div style="max-width: 161px;white-space: normal;word-break: break-all;">${email}</div>
                            </div>
                        </div>`;
    }
    if (skill_flag_status) {
        skill_section = skill_section + '<div class="subblock"><h3>Skills</h3>';
        for (var skill_i = 0; skill_i < skill.length; skill_i++) {
            skill_section = skill_section + '<div class="p-label" style="margin-bottom:5px;">' + skill[skill_i].skill + '</div>';
            if (skill[skill_i].rating_status == 1) {
                skill_section = skill_section + `<div class="bar">
                                                <div class="bar-fill" style="width: ${skill[skill_i].rating * 20}%;"></div>
                                            </div>`;
            }
        }
        skill_section = skill_section + '</div>';

    }
    if (education_flag_status) {
        education_section = education_section + '<div class="subblock"><h3>Education</h3>';
        for (var education_i = 0; education_i < education.length; education_i++) {
            education_section = education_section + `
                <div class="contact contact-detail">
                    ${education[education_i].institution}<br>
                    ${education[education_i].qualification} in ${education[education_i].course_name}, <br>${education[education_i].academic_year}
                </div>
            `;
        }
        education_section = education_section + '</div>';

    }
    if (language_flag_status) {
        language_section = language_section + '<div class="subblock lang"><h3>Languages</h3>';
        for (var language_i = 0; language_i < language.length; language_i++) {
            language_section = language_section + `<div class="contact">${language[language_i].language}</div>`;
            if (language[language_i].rating_status == 1) {
                language_section = language_section + `<div class="bar">
                                                <div class="bar-fill" style="width: ${language[language_i].rating * 20}%;"></div>
                                            </div>`;
            }
        }
        language_section = language_section + '</div>';
    }
    if (certificate_flag_status) {
        certificate_section = certificate_section + '<div class="subblock"><h3>Certifications</h3>';
        for (var certificate_i = 0; certificate_i < certificate.length; certificate_i++) {
            certificate_section = certificate_section + `
                <div class="contact">
                    ${certificate[certificate_i].document_type}
                </div>
            `
        }
        certificate_section = certificate_section + '</div>';
    }
    if (experience_flag_status) {
        //experience_section=experience_section+'<div class="block"><h3>Experience</h3>';
        for (var experience_i = 0; experience_i < experience.length; experience_i++) {
            var start_date = experience[experience_i].start_date ? experience[experience_i].start_date : '';
            var end_date = experience[experience_i].end_date ? experience[experience_i].end_date : '';
            var date_status = false;
            var formated_start_date = '';
            var formated_end_date = '';
            var formated_date = '';
            if (start_date != '0000-00-00' && start_date != '') {
                date_status = true;
                formated_start_date = await utils.change_data_format(start_date);
            }
            if (date_status) {
                if (end_date != '0000-00-00' && end_date != '') {
                    formated_end_date = await utils.change_data_format(end_date);
                    const date1 = new Date(start_date);
                    const date2 = new Date(end_date);
                    const diffYears = date2.getFullYear() - date1.getFullYear();
                    const diffMonths = date2.getMonth() - date1.getMonth();
                    const diffDays = date2.getDate() - date1.getDate();
                    let years = diffYears;
                    let months = diffMonths;
                    let days = diffDays;
                    if (days < 0) {
                        months -= 1;
                        days += new Date(date2.getFullYear(), date2.getMonth(), 0).getDate();
                    }
                    if (months < 0) {
                        years -= 1;
                        months += 12;
                    }
                    var txt_years = years <= 1 ? years + " yr" : years + " yrs";
                    var txt_months = months <= 1 ? months + " mo" : months + " mos";
                    var text_days= days<=1 ? days+" dy" : days+" dys";
                    //formated_date=years+' yrs and '+months+' mos';
                    if (years != 0 && months != 0) {
                        formated_date = txt_years + ' and ' + txt_months;
                    } else if (years == 0 && months == 0 && days==0) {
                        formated_date = '';
                    }else if (years == 0 && months == 0) {
                        formated_date = text_days;
                    } else if (months == 0) {
                        formated_date = txt_years;
                    } else if (years == 0) {
                        formated_date = txt_months;
                    }

                    var sorted_experience=await utils.sortExperienceByDate(experience,'asc');
                    if(sorted_experience.length>0){
                        current_position=sorted_experience[sorted_experience.length-1].position;
                    }

                } else {
                    formated_end_date = 'Present';
                    current_position = experience[experience_i].position;
                    formated_date = formated_start_date + ' – ' + formated_end_date
                }
            }
            if (experience_i == 0) {
                experience_section = experience_section + '<div class="block"><h3>Experience</h3>';
            } else {
                experience_section = experience_section + '<div class="block">';
            }

            //experience_section = experience_section + `<h4>${experience[experience_i].position}</h4><h5>${experience[experience_i].company_name}, ${formated_date}, ${experience[experience_i].country}</h5>`;
            if(formated_date!=''){
                experience_section = experience_section + `<h4>${experience[experience_i].position}</h4><h5>${experience[experience_i].company_name}, ${formated_date}, ${experience[experience_i].country}</h5>`;
            }else{
                experience_section = experience_section + `<h4>${experience[experience_i].position}</h4><h5>${experience[experience_i].company_name}, ${experience[experience_i].country}</h5>`;
            }
            var responsibilities = experience[experience_i].responsilbilities ? experience[experience_i].responsilbilities.split(';') : '';
            if (responsibilities.length > 0) {
                experience_section = experience_section + '<ul>';
                for (var responsibility_i = 0; responsibility_i < responsibilities.length; responsibility_i++) {
                    experience_section = experience_section + '<li>' + responsibilities[responsibility_i] + '</li>';
                }
                experience_section = experience_section + '</ul>';
            }
            experience_section = experience_section + '</div>';
        }
    }
    if (additional_feature_flag_status) {
        for (var additional_feature_i = 0; additional_feature_i < additional_feature.length; additional_feature_i++) {
            if(additional_feature[additional_feature_i].show_status==1 && additional_feature[additional_feature_i].type_description!=''){
                additional_feature_section = additional_feature_section + `<div class="block">
                    <h4>${additional_feature[additional_feature_i].type}</h4>
                    <p>${additional_feature[additional_feature_i].type_description}</p>
                </div>`;
            }

        }
    }

    if(disabled==1){
        if(disability_type!=''){
            disability_section=disability_section+`
                <div class="block">
                    <h4>Physical Disability</h4>
                    <p>${disability_type}</p>
                </div>`;
        }
    }
    //console.log(experience_section)
    //exit ()
    var html_opening = `
    <!doctype html>
    <html lang="en">
      <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>CV Template</title>
        <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;600;700&display=swap" rel="stylesheet">
        <style>
            * {
                box-sizing: border-box; }
            
            body {
                font-family: "Roboto", sans-serif;
                font-weight: 400;
                color: #000000;
                font-size: 10px;
                line-height: 14px; }
            
            h1, h2, h3, h4, h5, h6, p {
                margin: 0; }
            
            h1 {
                font-weight: 500;
                font-size: 20px;
                line-height: 23px;
                color: #050506;
                padding-bottom: 4px;
                letter-spacing: -1px; 
            }
            
            h2 {
                font-size: 17px;
                line-height: 19px;
                color: #75787B; }
            
            h3 {
                /*
                font-size: 7px;
                line-height: 8px;
                */
                font-size: 17px;
                line-height: 22px;
                font-weight: 700;
                letter-spacing: 0.5px;
                color: #E56900;
                padding-bottom: 4px;
                text-transform: uppercase; }
            
            h4 {
                font-size: 13px;
                line-height: 18px;
                font-weight: 500;
                letter-spacing: -0.25px; }
            
            h5 {
                font-size: 13px;
                line-height: 16px;
                font-weight: 400;
                letter-spacing: -0.15px;
                padding-bottom: 8px;
                color: rgba(0, 0, 0, 0.62); }
            
            ul {
                padding-left: 16px;
                margin: 0;
                font-size: 14px;
                line-height: 16px;
                font-weight: 400;
                }
            
            .wrapper {
                width: 100%;
                max-width: 595px;
                /*margin: 20px auto;*/
                margin: 20px auto 0px auto;
                min-height: 842px;
                box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px; }
                @media print {
                .wrapper {
                    box-shadow: none;
                    /*added css*/
                    max-width:100%;
                     } }
            
            .header {
                padding: 32px;
                background: #ECECE7; }
            
            table {
                width: 100%; }
            
            .col-small {
                width: 161px; }
            
            .col-large {
                padding-left: 24px; }
                .col-large h3 {
                padding-bottom: 16px; }
            
            .about {
                font-size: 15px;
                line-height: 17px;
                letter-spacing: -0.25px;
                /*word-break: break-all;*/
                word-wrap: break-word;
            }
            
            .main {
                padding: 24px 32px 32px; }
            
            .main-table {
                min-height: 680px; }
                .main-table td {
                vertical-align: top; }
                .main-table td.col-small {
                    background: #F4F4F1;
                    padding: 16px;
                    font-size: 9px;
                    line-height: 12px; }
                .main-table td.col-large {
                    padding-top: 16px; }
            
            .subblock {
                padding-bottom: 10px;
                margin-bottom: 10px;
                border-bottom: 1px solid rgba(0, 0, 0, 0.2);
                font-size: 13px; }

                .subblock.lang .contact:not(:last-child) {
                    padding-bottom: 5px;
                    font-size: 13px;
                 }
            
            .bar {
                background: rgba(0, 0, 0, 0.2);
                height: 3px;
                width: 100%;
                margin-bottom: 17px; }
                .bar .bar-fill {
                height: 100%;
                background: #E56900; }
            
            .progress:last-child .bar {
                margin-bottom: 0; }
            
            .block {
                padding-bottom: 16px;
                margin-bottom: 16px;
                border-bottom: 1px solid rgba(0, 0, 0, 0.3); }
                .block:last-child {
                padding-bottom: 0;
                margin-bottom: 0;
                border-bottom: 0; }
                .block p + ul {
                padding-top: 8px; }
            
            .contact-detail{
                font-size: 12px;
                line-height: 16px;
            }
            
            /*# sourceMappingURL=style.css.map */
        
        </style>
    </head>
    
    <body>
    
        <div class="wrapper">
            <div class="header">
                <table class="header-table">
                    <tbody>
                        <tr>
                            <td class="col-small">
                                <h1>${username}</h1>
                                <h2>${current_position}</h2>
                            </td>
                            <td class="col-large">
                                <div class="about">
                                    ${objective}
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div><!-- ./header -->
    `;
    var html_closing = `
        <div class="main">
            <table class="main-table">
                <tbody>
                    <tr>
                        <td class="col-small">
                            ${contact_section}
                            ${skill_section}
                            ${education_section}
                            ${language_section}
                            ${certificate_section}
                            <!-- ./subblock -->
                        </td>
                        <td class="col-large">
                            ${experience_section}
                            ${additional_feature_section}
                            ${disability_section}
                        </td>
                    </tr>
                </tbody>
            </table>
        </div><!-- ./main -->
        </div><!-- ./wrapper -->

        </body>

        </html>
    `
    return html_opening + html_closing;
}

async function template11(color_code, username, profile_flag_status, profile_pic, address, email, contact_number, skill_flag_status, skill, certificate_flag_status, certificate, objective_flag_status, objective, experience_flag_status, experience, education_flag_status, education, language_flag_status, language, additional_feature_flag_status, additional_feature,disabled,disability_type) {
    var skill_section = '';
    var certificate_section = '';
    var experience_section = '';
    var education_section = '';
    var language_section = '';
    var profile_pic_tag = '';
    var current_position = '';
    var additional_feature_section = '';
    var objective_section = '';
    var contact_section = '';
    var disability_section='';
    
    if (profile_flag_status) {
        profile_pic_tag = `<img src="${profile_pic}" alt="DP" />`;
        //profile_pic_tag=`<img src="http://localhost:3000/uploads/images/template/your_image.png" alt="DP" />`;
    }
    if (email != '' || contact_number != '' || address != '') {
        contact_section = contact_section + `
            <div class="subblock">
                <h3>Details</h3>
                <div class="contact">
                    <div class="detail-contact-row"><img src="${appURL}uploads/images/template/map-pin_11.svg" /><span style="max-width: 161px;white-space: normal;word-break: break-all;">${address}</span></div>
                    <div class="detail-contact-row"><img src="${appURL}uploads/images/template/phone_11.svg" /><span  style="max-width: 161px;white-space: normal;word-break: break-all;">${contact_number}</span></div>
                    <div class="detail-contact-row"><img src="${appURL}uploads/images/template/mail_11.svg"><span  style="max-width: 161px;white-space: normal;word-break: break-all;">${email}</span></div>
                </div>
            </div>
        `;
    }
    if (skill_flag_status) {
        skill_section = skill_section + '<div class="subblock"><h3>Skills</h3>';
        for (var skill_i = 0; skill_i < skill.length; skill_i++) {
            skill_section = skill_section + `<div class="progress"><div class="p-label">${skill[skill_i].skill}</div>`;
            if (skill[skill_i].rating_status == 1) {
                skill_section = skill_section + `
                    <div class="bar">
                        <div class="bar-fill" style="width: ${skill[skill_i].rating * 20}%;"></div>
                    </div>
                `;
            }
            skill_section = skill_section + '</div>';
        }
        skill_section = skill_section + '</div>';

    }
    if (education_flag_status) {
        education_section = education_section + `<div class="subblock"><h3>Education</h3>`;
        for (var education_i = 0; education_i < education.length; education_i++) {
            education_section = education_section + `
                <div class="contact">
                    ${education[education_i].institution}<br>
                    ${education[education_i].qualification} in ${education[education_i].course_name}, <br>${education[education_i].academic_year}
                </div>
            `;
            if (education_i != education.length - 1) {
                education_section = education_section + `<br/>`;
            }
        }
        education_section = education_section + `</div>`;

    }
    if (language_flag_status) {
        language_section = language_section + `<div class="subblock lang"><h3>Languages</h3>`;
        for (var language_i = 0; language_i < language.length; language_i++) {
            language_section = language_section + `<div class="contact">${language[language_i].language}`;
            if (language[language_i].rating_status == 1) {
                //change to A1, A2
                var language_rating_symbol = '';
                if (language[language_i].rating == 5) {
                    language_rating_symbol = 'A1';
                } else if (language[language_i].rating == 4) {
                    language_rating_symbol = 'A2';
                } else if (language[language_i].rating == 3) {
                    language_rating_symbol = 'A3';
                } else if (language[language_i].rating == 2) {
                    language_rating_symbol = 'A4';
                } else if (language[language_i].rating == 1) {
                    language_rating_symbol = 'A5';
                }
                language_section = language_section + ': ' + language_rating_symbol;
            }
            language_section = language_section + `</div>`;
        }
        language_section = language_section + `</div>`;
    }
    if (certificate_flag_status) {
        certificate_section = certificate_section + `<div class="subblock"><h3>Certifications</h3>`;
        for (var certificate_i = 0; certificate_i < certificate.length; certificate_i++) {
            certificate_section = certificate_section + `
                <div class="contact">
                    ${certificate[certificate_i].document_type}
                </div>
            `;
            // if(certificate_i!=certificate.length-1){
            //     certificate_section=certificate_section+`<br/>`;
            // }
        }
        certificate_section = certificate_section + `</div>`;
    }
    if (objective_flag_status) {
        objective_section = objective_section + `
            <div class="block">
                <h3>About</h3>
                <div class="about">${objective}</div>
            </div>`;
    }
    if (experience_flag_status) {
        for (var experience_i = 0; experience_i < experience.length; experience_i++) {
            if (experience_i == 0) {
                experience_section = experience_section + `<div class="block"><h3>Experience</h3>`;
            } else {
                experience_section = experience_section + `<div class="block">`;
            }
            var start_date = experience[experience_i].start_date ? experience[experience_i].start_date : '';
            var end_date = experience[experience_i].end_date ? experience[experience_i].end_date : '';
            var date_status = false;
            if (start_date != '0000-00-00' && start_date != '') {
                date_status = true;
                start_date = await utils.change_data_format(start_date);
            }
            if (date_status) {
                if (end_date != '0000-00-00' && end_date != '') {
                    end_date = await utils.change_data_format(end_date);
                    var sorted_experience=await utils.sortExperienceByDate(experience,'asc');
                    if(sorted_experience.length>0){
                        current_position=sorted_experience[sorted_experience.length-1].position;
                    }
                } else {
                    end_date = 'Present';
                    current_position = experience[experience_i].position + '.';
                }
            }
            experience_section = experience_section + `<h4>${experience[experience_i].position}</h4><div>${experience[experience_i].company_name}</div>
            <h5>${start_date} – ${end_date}, ${experience[experience_i].country}</h5>`;
            var responsibilities = experience[experience_i].responsilbilities ? experience[experience_i].responsilbilities.split(';') : '';
            if (responsibilities.length > 0) {
                experience_section = experience_section + '<ul>';
                for (var responsibility_i = 0; responsibility_i < responsibilities.length; responsibility_i++) {
                    experience_section = experience_section + `<li>${responsibilities[responsibility_i]}</li>`;
                }
                experience_section = experience_section + '</ul>';
            }
            experience_section = experience_section + '</div>';
        }
    }

    if (additional_feature_flag_status) {
        for (var additional_feature_i = 0; additional_feature_i < additional_feature.length; additional_feature_i++) {
            if(additional_feature[additional_feature_i].show_status==1 && additional_feature[additional_feature_i].type_description!=''){
                additional_feature_section = additional_feature_section + `<div class="block"><h3>${additional_feature[additional_feature_i].type}</h3><div>${additional_feature[additional_feature_i].type_description}</div></div>`;
            }
        }
    }

    if(disabled==1){
        if(disability_type!=''){
            disability_section=disability_section+`
                <div class="block"><h3>Physical Disability</h3><div>${disability_type}</div></div>
                `;
        }
    }

    var html_opening = `
            <!doctype html>
            <html lang="en">
            <head>
                <meta charset="utf-8">
                <meta http-equiv="X-UA-Compatible" content="IE=edge">
                <meta name="viewport" content="width=device-width, initial-scale=1">
                <title>CV Template</title>
                <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;600;700&display=swap" rel="stylesheet">
                <style>
                    * {
                        box-sizing: border-box; }
                    
                    body {
                        font-family: "Roboto", sans-serif;
                        font-weight: 400;
                        color: #050506;
                        font-size: 9.5px;
                        line-height: 14px;
                        letter-spacing: -0.25px; }
                    
                    h1, h2, h3, h4, h5, h6, p {
                        margin: 0; }
                    
                    h1 {
                        font-weight: 500;
                        font-size: 18px;
                        line-height: 20px;
                        color: #050506;
                        letter-spacing: -0.03em; }
                    
                    h2 {
                        font-size: 13px;
                        line-height: 16px;
                        color: #75787B; }
                    
                    h3 {
                        font-size: 12px;
                        font-weight: 700;
                        line-height: 12px;
                        letter-spacing: 0.5px;
                        color: #046663;
                        padding-bottom: 7px;
                        text-transform: uppercase; }
                    
                    h4 {
                        font-size: 15px;
                        line-height: 18px;
                        font-weight: 500;
                        letter-spacing: -0.25px; }
                    
                    h5 {
                        font-size: 14px;
                        line-height: 17px;
                        font-weight: 400;
                        letter-spacing: -0.15px;
                        padding-bottom: 16px;
                        color: #666666; }
                    
                    ul {
                        padding-left: 20px;
                        margin: 0; }
                    
                    .wrapper {
                        width: 100%;
                        max-width: 595px;
                        margin: 20px auto;
                        min-height: 842px;
                        box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px; }
                        @media print {
                        .wrapper {
                            box-shadow: none;
                            /*added css*/
                            max-width: 100%;
                         } }
                    
                    .header {
                        padding: 10px 32px;
                        background: url(${appURL}uploads/images/template/header_11.png);
                        background-size: cover;
                        border-radius: 0 10px 10px 0;
                        overflow: hidden;
                        text-align: center; }
                    
                    .header-table {
                        min-height: 144px; }
                        .header-table img {
                        width: 32px;
                        height: 32px;
                        border-radius: 50%;
                        display: block;
                        margin: 0 auto;
                        margin-bottom: 16px; }
                    
                    table {
                        width: 100%;
                        border-collapse: collapse; }
                    
                    .col-small {
                        width: 161px;
                        font-size: 13px; }
                    
                    .col-large {
                        padding-left: 24px; }
                        .col-large h3 {
                        padding-bottom: 16px; }
                    
                    .about {
                        font-size: 13px;
                        line-height: 18px;
                        letter-spacing: -0.5px;
                        padding-bottom: 8px; }
                    
                    .main {
                        padding: 24px 32px 0px; }
                    
                    .main-table {
                        min-height: 680px; }
                        .main-table td {
                        vertical-align: top; }
                        .main-table td.col-small {
                            background: #F5F5FA;
                            padding: 16px;
                            font-size: 13px;
                            line-height: 17px;
                            border-radius: 12px 12px 0 0; }
                        .main-table td.col-large {
                            padding-top: 16px;
                            font-size: 15px;
                            line-height: 17px; }
                    
                    .subblock {
                        padding-bottom: 24px;
                        margin-bottom: 24px;
                        border-bottom: 1px solid rgba(0, 0, 0, 0.1); }
                        .subblock.lang .contact:not(:last-child) {
                        padding-bottom: 8px; }
                    
                    .bar {
                        background: rgba(0, 0, 0, 0.1);
                        height: 3px;
                        width: 100%;
                        margin-bottom: 17px; }
                        .bar .bar-fill {
                        height: 100%;
                        background: #046663; }
                    
                    .progress:last-child .bar {
                        margin-bottom: 0; }
                    
                    .block {
                        padding-bottom: 24px;
                        margin-bottom: 24px;
                        border-bottom: 1px solid rgba(0, 0, 0, 0.1); }
                        .block:last-child {
                        padding-bottom: 0;
                        margin-bottom: 0;
                        border-bottom: 0; }
                        .block p + ul {
                        padding-top: 8px; }
                    
                    .p-label {
                        padding-bottom: 3px; }
                    
                    .timeline-item {
                        position: relative;
                        padding-left: 11px; }
                    
                    .v-ellipse {
                        width: 3px;
                        height: 3px;
                        position: absolute;
                        background: #666666;
                        left: -3px;
                        top: 2px;
                        border-radius: 50%;
                        z-index: 9;
                        border: 3px solid white;
                        box-sizing: content-box; }
                    
                    .v-line {
                        background: #666666;
                        width: 1px;
                        height: 100%;
                        position: absolute;
                        left: 1px;
                        top: 6px; }
                    
                    .timeline-item {
                        padding-bottom: 8px; }
                        .timeline-item:last-child .v-line {
                        display: none; }
                    
                    .title {
                        font-weight: 600; }
                    
                    .duration {
                        color: #666666; }
                    .detail-contact-row{
                        display: flex;
                        align-items: center;
                        padding-bottom: 5px;
                    }
                    .detail-contact-row > img {
                        margin-right: 6px;
                        float: left;
                        width: 10px;
                        height: auto; }
                    .detail-contact-row > span {
                        line-height: 1.1;
                        float: left; }
                    .contact-row {
                        padding-bottom: 5px; }
                        .contact-row:last-child {
                        padding-bottom: 0; }
                        .contact-row:after {
                        content: "";
                        display: table;
                        clear: both; }
                        .contact-row > img {
                        margin-right: 6px;
                        float: left;
                        width: 10px;
                        height: auto; }
                        .contact-row > span {
                        line-height: 1.1;
                        float: left; }
                    
                    /*# sourceMappingURL=style.css.map */
              
                </style>
            </head>
            
            <body>
            
                <div class="wrapper">
                    <div class="header">
                        <table class="header-table">
                            <tbody>
                                <tr>
                                    <td class="col-small">
                                        ${profile_pic_tag}
                                        <h1>${username}</h1>
                                        <div>${current_position}</h2>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div><!-- ./header -->
    `;
    var html_closing = `
            <div class="main">
                <table class="main-table">
                    <tbody>
                        <tr>
                            <td class="col-small">
                                ${contact_section}
                                ${skill_section}
                                ${education_section}
                                ${language_section}
                                ${certificate_section}
                                <!-- ./subblock -->
                            </td>
                            <td class="col-large">
                                ${objective_section}
                                ${experience_section}
                                ${additional_feature_section}
                                ${disability_section}
                                <!-- ./block -->
                                <!-- ./block -->
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div><!-- ./main -->
            </div><!-- ./wrapper -->

            </body>

            </html>
    `;
    return html_opening + html_closing;
}

async function template12(color_code, username, profile_flag_status, profile_pic, address, email, contact_number, skill_flag_status, skill, certificate_flag_status, certificate, objective_flag_status, objective, experience_flag_status, experience, education_flag_status, education, language_flag_status, language, additional_feature_flag_status, additional_feature,disabled,disability_type) {
    var skill_section = '';
    var certificate_section = '';
    var experience_section = '';
    var education_section = '';
    var language_section = '';
    var profile_pic_tag = '';
    var current_position = '';
    var additional_feature_section = '';
    var objective_section = '';
    var contact_section = '';
    var position_section = '';
    var contact_number_section = '';
    var disability_section = '';
    if (profile_flag_status) {
        profile_pic_tag = `
            <div class="picture">
                <img src="${profile_pic}" />
            </div>`;
    }
    if (objective_flag_status) {
        objective_section = objective_section + `<div class="about">${objective}</div>`;
    }

    if (experience_flag_status) {
        experience_section = experience_section + `<h2>Experience</h2>`;
        for (var experience_i = 0; experience_i < experience.length; experience_i++) {
            var start_date = experience[experience_i].start_date ? experience[experience_i].start_date : '';
            var end_date = experience[experience_i].end_date ? experience[experience_i].end_date : '';
            var date_status = false;
            var formated_start_date = '';
            var formated_end_date = '';
            var formated_date = '';
            if (start_date != '0000-00-00' && start_date != '') {
                date_status = true;
                formated_start_date = await utils.change_data_format(start_date);
            }
            if (date_status) {
                if (end_date != '0000-00-00' && end_date != '') {
                    formated_end_date = await utils.change_data_format(end_date);
                    const date1 = new Date(start_date);
                    const date2 = new Date(end_date);
                    const diffYears = date2.getFullYear() - date1.getFullYear();
                    const diffMonths = date2.getMonth() - date1.getMonth();
                    const diffDays = date2.getDate() - date1.getDate();
                    let years = diffYears;
                    let months = diffMonths;
                    let days = diffDays;
                    if (days < 0) {
                        months -= 1;
                        days += new Date(date2.getFullYear(), date2.getMonth(), 0).getDate();
                    }
                    if (months < 0) {
                        years -= 1;
                        months += 12;
                    }
                    var txt_years = years <= 1 ? years + " yr" : years + " yrs";
                    var txt_months = months <= 1 ? months + " mo" : months + " mos";
                    var text_days= days<=1 ? days+" dy" : days+" dys";
                    //formated_date=years+' yrs and '+months+' mos';
                    if (years != 0 && months != 0) {
                        formated_date = txt_years + ' and ' + txt_months;
                    } else if (years == 0 && months == 0 && days==0) {
                        formated_date = '';
                    }else if (years == 0 && months == 0) {
                        formated_date = text_days;
                    } else if (months == 0) {
                        formated_date = txt_years;
                    } else if (years == 0) {
                        formated_date = txt_months;
                    }
                    var sorted_experience=await utils.sortExperienceByDate(experience,'asc');
                    if(sorted_experience.length>0){
                        current_position=sorted_experience[sorted_experience.length-1].position;
                    }

                } else {
                    formated_end_date = 'Present';
                    current_position = experience[experience_i].position;
                    formated_date = formated_start_date + ' – ' + formated_end_date;
                }
            }
            if(formated_date!=''){
                experience_section = experience_section + `<div class="block"><h3>${experience[experience_i].position}</h3><h4>${experience[experience_i].company_name}, ${formated_date}</h4>`;
            }else{
                experience_section = experience_section + `<div class="block"><h3>${experience[experience_i].position}</h3><h4>${experience[experience_i].company_name}</h4>`;
            }
            
            var responsibilities = experience[experience_i].responsilbilities ? experience[experience_i].responsilbilities.split(';') : '';
            if (responsibilities.length > 0) {
                experience_section = experience_section + `<ul>`;
                for (var responsibility_i = 0; responsibility_i < responsibilities.length; responsibility_i++) {
                    experience_section = experience_section + `<li>${responsibilities[responsibility_i]}</li>`;
                }
                experience_section = experience_section + `</ul>`;
            }
            experience_section = experience_section + `</div>`;
        }
    }
    if (contact_number != '') {
        contact_number_section = contact_number_section + `<div class="pillow green">${contact_number}</div>`;
    }
    if (current_position != '') {
        position_section = position_section + `<div class="pillow">${current_position}</div>`;
    }
    if (skill_flag_status) {
        skill_section = skill_section + `<div class="subblock"><h3>Skills</h3><div>`;
        for (var skill_i = 0; skill_i < skill.length; skill_i++) {
            skill_section = skill_section + `${skill[skill_i].skill}`;
            if (skill_i != skill.length - 1) {
                skill_section = skill_section + '<br>';
            }
        }
        skill_section = skill_section + `</div></div>`;
    }
    if (language_flag_status) {
        language_section = language_section + `<div class="subblock"><h3>Languages</h3><div>`;
        for (var language_i = 0; language_i < language.length; language_i++) {
            language_section = language_section + `${language[language_i].language}`;
            if (language_i != language.length - 1) {
                language_section = language_section + '<br/>';
            }
        }
        language_section = language_section + `</div></div>`;
    }
    if (email != '' || contact_number != '' || address != '') {
        contact_section = `
            <h2>Details</h2>
            <div class="subblock">
                <h3>Address</h3>
                <div style="max-width: 217px;white-space: normal;word-break: break-all;">${address}</div>
            </div>
            <div class="subblock">
                <h3>Phone</h3>
                <div style="max-width: 217px;white-space: normal;word-break: break-all;">${contact_number}</div>
            </div>
            <div class="subblock">
                <h3>Email</h3>
                <div style="max-width: 217px;white-space: normal;word-break: break-all;">${email}</div>
            </div>`;
    }
    if (education_flag_status) {
        education_section = education_section + `<div class="subblock"><h3>Education</h3>`;
        for (var education_i = 0; education_i < education.length; education_i++) {
            education_section = education_section + `<div class="item-line-spacing">${education[education_i].qualification} in ${education[education_i].course_name} <br>${education[education_i].institution}</div>`;
        }
        education_section = education_section + `</div>`;
    }
    if (certificate_flag_status) {
        certificate_section = certificate_section + `<div class="subblock"><h3>Certifications</h3>`;
        for (var certificate_i = 0; certificate_i < certificate.length; certificate_i++) {
            certificate_section = certificate_section + `<div class="item-line-spacing">${certificate[certificate_i].document_type}</div>`;
        }
        certificate_section = certificate_section + `</div>`;
    }
    if (additional_feature_flag_status) {
        for (var additional_feature_i = 0; additional_feature_i < additional_feature.length; additional_feature_i++) {
            if(additional_feature[additional_feature_i].show_status==1 && additional_feature[additional_feature_i].type_description!=''){
                additional_feature_section = additional_feature_section + `
                    <h2>${additional_feature[additional_feature_i].type}</h2>
                    <div class="block">
                        <h3>${additional_feature[additional_feature_i].type_description}</h3>
                        <!--<h4>${additional_feature[additional_feature_i].type_description}</h4>
                        <div>${additional_feature[additional_feature_i].type_description}</div>-->
                    </div>`;
            }

        }
    }

    if(disabled==1){
        if(disability_type!=''){
            disability_section=disability_section+`
                <h2>Physical Disability</h2>
                    <div class="block">
                        <h3>${disability_type}</h3>
                    </div>
                `;
        }
    }
    var html = `
    <!doctype html>
    <html lang="en">
      <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>CV Template</title>
        <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;600;700&display=swap" rel="stylesheet">
        <style>
            * {
                box-sizing: border-box; }
            
            body {
                font-family: "Roboto", sans-serif;
                font-weight: 400;
                color: #050506;
                font-size: 15px;
                line-height: 17px;
                letter-spacing: -0.25px;
                background-color: #f5f5f5; }
            
            h1, h2, h3, h4, h5, h6, p {
                margin: 0; }
            
            h1 {
                font-size: 28px;
                font-weight: 700;
                line-height: 30px;
                letter-spacing: -1px;
                padding-bottom: 4px; }
            
            h2 {
                font-size: 22px;
                font-weight: 700;
                line-height: 23px;
                letter-spacing: -0.75px;
                color: #F16E55;
                padding-bottom: 16px; }
            
            h3 {
                font-weight: 700;
                letter-spacing: -0.15px;
                padding-bottom: 1px;
                font-size: 16px;
                line-height: 17px; }
            
            h4 {
                color: rgba(0, 0, 0, 0.6);
                font-weight: 400;
                padding-bottom: 12px;
                font-size: 16px;
                line-height: 17px; }
            
            ul {
                padding-left: 20px;
                margin: 0;
                margin-bottom: 12px; }
            
            .about {
                font-size: 13px;
                line-height: 17px; }
            
            table {
                border-collapse: collapse;
                width: 100%; }
                table td {
                vertical-align: top; }
                table.main {
                min-height: 842px; }
            
            .header {
                padding: 0 0 24px 0; }
                .header table {
                margin-bottom: 16px; }
            
            .col-sm {
                width: 217px;
                padding: 40px 32px 40px 18px;
                border-left: 1px solid rgba(0, 0, 0, 0.1); }
            
            .col-xl {
                padding: 40px 18px 40px 32px; }
            
            .wrapper {
                width: 100%;
                max-width: 595px;
                margin: 20px auto;
                min-height: 842px;
                box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px; }
                @media print {
                .wrapper {
                    box-shadow: none;
                    /*added css*/
                    max-width: 100%; } }
            
            .right {
                text-align: right; }
            
            .pillow {
                display: inline-block;
                padding: 4px 13px;
                background: #D9DEDC;
                border-radius: 24px;
                line-height: 1.1;
                font-size: 15px; }
                .pillow.green {
                color: white;
                background: #2C9F81; }
            
            .picture {
                margin-bottom: 12px; }
                .picture img {
                width: 32px;
                height: 32px;
                display: block;
                border-radius: 50%; }
            
            .block {
                padding-bottom: 12px;
                margin-bottom: 12px;
                border-bottom: 1px solid rgba(0, 0, 0, 0.1); }
                .block:last-child {
                padding-bottom: 0;
                margin-bottom: 0;
                border: 0; }
            
            .subblock {
                padding-bottom: 16px; }
                .subblock:last-child {
                padding-bottom: 0; }

            .item-line-spacing {
                margin-bottom: 5px;
            }
            
            /*# sourceMappingURL=style.css.map */
      
        </style>
    </head>
    <body>
        <div class="wrapper">        
            <table class="main">
                <tbody>
                    <tr>
                        <td class="col-xl">
                            <div class="header">
                                <table>
                                    <tbody>
                                        <tr>
                                            <td class="left">
                                                ${position_section}
                                            </td>
                                            <td class="right">
                                                ${contact_number_section}
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                ${profile_pic_tag}
                                <h1>${username}</h1>
                                ${objective_section}
                            </div>
                            ${experience_section}
                            ${additional_feature_section}
                            ${disability_section}
                        </td>
                        <td class="col-sm">
                            ${contact_section}
                            ${skill_section}
                            ${language_section}
                            ${education_section}
                            ${certificate_section}
                        </td>
                    </tr>
                </tbody>
            </table>
        </div><!-- ./wrapper -->
    
    </body>
    
    </html>
    `;
    return html;
}

async function template13(color_code, username, profile_flag_status, profile_pic, address, email, contact_number, skill_flag_status, skill, certificate_flag_status, certificate, objective_flag_status, objective, experience_flag_status, experience, education_flag_status, education, language_flag_status, language, additional_feature_flag_status, additional_feature,disabled,disability_type) {
    var skill_section = '';
    var certificate_section = '';
    var experience_section = '';
    var education_section = '';
    var language_section = '';
    var profile_pic_tag = '';
    var current_position = '';
    var additional_feature_section = '';
    var objective_section = '';
    var contact_section = '';
    var position_section = '';
    var contact_number_section = '';
    var contact_section = '';
    var disability_section='';

    if (profile_flag_status) {
        profile_pic_tag = `<img src="${profile_pic}" />`;
    }
    if (skill_flag_status) {
        skill_section = skill_section + `<div class="block"><h3>SKILLS</h3><div class="points">`;
        for (var skill_i = 0; skill_i < skill.length; skill_i++) {
            //skill_section = skill_section +`<div class="skill-points">${skill[skill_i].skill}</div>`;
            if (skill_i != skill.length - 1) {
                //skill_section = skill_section + '<br/>';
                skill_section = skill_section +`<div class="skill-points">${skill[skill_i].skill}</div>`;
            }else{
                skill_section=skill_section+`<div>${skill[skill_i].skill}</div>`
            }
        }
        skill_section = skill_section + `</div></div>`;
    }
    if (education_flag_status) {
        education_section = education_section + `<div class="block"><h3>EDUCATION</h3>`;
        for (var education_i = 0; education_i < education.length; education_i++) {
            if(education_i!=education.length-1){
                education_section = education_section + `
                    <div class="points education-points">
                        ${education[education_i].institution}<br>
                        ${education[education_i].qualification} in ${education[education_i].course_name},<br>
                        ${education[education_i].academic_year}
                    </div>`;
            }else{
                education_section = education_section + `
                    <div class="points">
                        ${education[education_i].institution}<br>
                        ${education[education_i].qualification} in ${education[education_i].course_name},<br>
                        ${education[education_i].academic_year}
                    </div>`;
            }
            
        }
        education_section = education_section + `</div>`;
    }
    if (language_flag_status) {
        language_section = language_section + `<div class="block"><h3>LANGUAGES</h3><div class="points">`;
        for (var language_i = 0; language_i < language.length; language_i++) {
            // language_section = language_section + language[language_i].language;
            // if (language_i != language.length - 1) {
            //     language_section = language_section + `<br/>`;
            // }

            if (language_i != language.length - 1) {
                //skill_section = skill_section + '<br/>';
                language_section = language_section +`<div class="skill-points">${language[language_i].language}</div>`;
            }else{
                language_section=language_section+`<div>${language[language_i].language}</div>`
            }
        }
        language_section = language_section + `</div></div>`;
    }
    if (certificate_flag_status) {
        certificate_section = certificate_section + `<div class="block"><h3>CERTIFICATIONS</h3>`;
        for (var certificate_i = 0; certificate_i < certificate.length; certificate_i++) {
            certificate_section = certificate_section + `<div class="points skill-points">${certificate[certificate_i].document_type}</div>`;
        }
        certificate_section = certificate_section + `</div>`;
    }
    if (experience_flag_status) {
        experience_section = experience_section + `<h3>EXPERIENCE</h3>`;
        for (var experience_i = 0; experience_i < experience.length; experience_i++) {
            var start_date = experience[experience_i].start_date ? experience[experience_i].start_date : '';
            var end_date = experience[experience_i].end_date ? experience[experience_i].end_date : '';
            var date_status = false;
            var formated_start_date = '';
            var formated_end_date = '';
            var formated_date = '';
            if (start_date != '0000-00-00' && start_date != '') {
                date_status = true;
                formated_start_date = await utils.change_data_format(start_date);
            }
            if (date_status) {
                if (end_date != '0000-00-00' && end_date != '') {
                    formated_end_date = await utils.change_data_format(end_date);
                    const date1 = new Date(start_date);
                    const date2 = new Date(end_date);
                    const diffYears = date2.getFullYear() - date1.getFullYear();
                    const diffMonths = date2.getMonth() - date1.getMonth();
                    const diffDays = date2.getDate() - date1.getDate();
                    let years = diffYears;
                    let months = diffMonths;
                    let days = diffDays;
                    if (days < 0) {
                        months -= 1;
                        days += new Date(date2.getFullYear(), date2.getMonth(), 0).getDate();
                    }
                    if (months < 0) {
                        years -= 1;
                        months += 12;
                    }
                    var txt_years = years <= 1 ? years + " yr" : years + " yrs";
                    var txt_months = months <= 1 ? months + " mo" : months + " mos";
                    var text_days= days<=1 ? days+" dy" : days+" dys";
                    //formated_date=years+' yrs and '+months+' mos';
                    if (years != 0 && months != 0) {
                        formated_date = txt_years + ' and ' + txt_months;
                    } else if (years == 0 && months == 0 && days==0) {
                        formated_date = '';
                    }else if (years == 0 && months == 0) {
                        formated_date = text_days;
                    } else if (months == 0) {
                        formated_date = txt_years;
                    } else if (years == 0) {
                        formated_date = txt_months;
                    }

                    var sorted_experience=await utils.sortExperienceByDate(experience,'asc');
                    if(sorted_experience.length>0){
                        current_position=sorted_experience[sorted_experience.length-1].position;
                    }
                } else {
                    formated_end_date = 'Present';
                    current_position = experience[experience_i].position;
                    formated_date = formated_start_date + ' – ' + formated_end_date;
                }
            }
            experience_section = experience_section + `
                <div class="block">
                    <h4>${experience[experience_i].position} · ${experience[experience_i].company_name}</h4>
            `;
            if(formated_date!=''){
                experience_section=experience_section+`<h5>${formated_date}</h5>`;
            }
            var responsibilities = experience[experience_i].responsilbilities ? experience[experience_i].responsilbilities.split(';') : '';
            if (responsibilities.length > 0) {
                experience_section = experience_section + `<div><ul>`;
                for (var responsibility_i = 0; responsibility_i < responsibilities.length; responsibility_i++) {
                    experience_section = experience_section + `<li style="line-height:20px;">${responsibilities[responsibility_i]}</li>`;
                }
                experience_section = experience_section + `</ul></div>`;
            }
            experience_section = experience_section + `</div>`;
        }
    }
    if (additional_feature_flag_status) {
        for (var additional_feature_i = 0; additional_feature_i < additional_feature.length; additional_feature_i++) {
            if(additional_feature[additional_feature_i].show_status==1 && additional_feature[additional_feature_i].type_description!=''){
                additional_feature[additional_feature_i].type=additional_feature[additional_feature_i].type.toUpperCase()
                additional_feature_section = additional_feature_section + `<h3>${additional_feature[additional_feature_i].type}</h3><div class="block">${additional_feature[additional_feature_i].type_description}</div>`;
            }
        }
    }
    if(disabled==1){
        if(disability_type!=''){
            disability_section=disability_section+`
                    <h3>Physical Disability</h3><div class="block">${disability_type}</div>
                `;
        }
    }
    var html = `
        <!doctype html>
        <html lang="en">
        <head>
            <meta charset="utf-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <title>CV Template</title>
            <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;600;700&display=swap" rel="stylesheet">
            <style>
                * {
                    box-sizing: border-box; }
                
                body {
                    font-family: "Roboto", sans-serif;
                    font-weight: 400;
                    color: #000000;
                    font-size: 14px;
                    line-height: 17px;
                    letter-spacing: -0.10px;
                    /*margin: 0;*/
                     }
                
                h1, h2, h3, h4, h5, h6, p {
                    margin: 0; }
                
                h1 {
                    font-size: 22px;
                    line-height: 19px;
                    font-weight: 500;
                    color: #050506;
                    padding-bottom: 5px; }
                
                h2 {
                    font-size: 18px;
                    font-weight: 500;
                    line-height: 16px;
                    letter-spacing: 0px;
                    color: #666666; }
                
                h3 {
                    font-size: 12px;
                    font-weight: 700;
                    line-height: 8px;
                    letter-spacing: 0.5px;
                    color: #625DF5;
                    padding-bottom: 15px; }
                
                h4 {
                    font-size: 14px;
                    font-weight: 500;
                    padding-bottom: 6px; }
                
                h5 {
                    font-size: 14px;
                    color: rgba(0, 0, 0, 0.6);
                    padding-bottom: 8px; }
                
                ul {
                    margin: 8px 0;
                    padding-left: 20px; }
                    ul:last-child {
                    margin-bottom: 0; }
                
                table {
                    border-collapse: collapse;
                    width: 100%; }
                .points{
                    font-size: 12px;
                }
                .skill-points{
                    padding-bottom: 8px;                
                }
                
                .education-points{
                    padding-bottom: 8px;                
                }
                
                .wrapper {
                    width: 100%;
                    max-width: 595px;
                    /*margin: 20px auto;*/
                    margin: 20 auto;
                    min-height: 842px;
                    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
                    background: url(${appURL}uploads/images/template/top_bg_13.png);
                    background-repeat: no-repeat;
                    background-size: 110%;
                    background-position: 0 -5%; }
                    @media print {
                    .wrapper {
                        box-shadow: none;
                        max-width: 100%;
                     } }
                
                .header {
                    padding: 40px 32px 32px;
                    border-bottom: 1px solid rgba(0, 0, 0, 0.1); }
                    .header img {
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;
                    object-fit: contain; }
                    .header .picture {
                    width: 40px; }
                    .header .name {
                    padding-left: 8px; }
                    .header .contact {
                    font-size: 16px;
                    font-weight: 400;
                    line-height: 17px;
                    letter-spacing: -0.25px;
                    text-align: right; }
                    .header table {
                    margin-bottom: 24px; }
                
                .block {
                    padding-bottom: 12px;
                    margin-bottom: 12px;
                    border-bottom: 1px solid rgba(0, 0, 0, 0.2); }
                    .block:last-child {
                    padding-bottom: 0;
                    margin-bottom: 0;
                    border: 0; }
                
                .col-sm {
                    width: 217px;
                    padding: 16px 20px 40px 48px;
                    vertical-align: top;
                    font-size: 9px;
                    line-height: 12px; }
                    .col-sm div {
                    line-height: 15px; }
                
                .col-xl {
                    padding: 16px 32px 40px 20px;
                    vertical-align: top; }
                    .col-xl h3 {
                    padding-bottom: 16px; }
                    .col-xl .block {
                    padding-bottom: 16px;
                    margin-bottom: 16px; }
                    .col-xl .block:last-child {
                        padding-bottom: 0;
                        margin-bottom: 0; }

                .about{
                     padding-top: 15px;
                     padding-bottom: 15px;  
                     line-height: 20px;              
                }
                
                /*# sourceMappingURL=style.css.map */
          
            </style>
        </head>
        
        <body>
        
            <div class="wrapper">        
                <div class="header">
                    <table class="profile">
                        <tbody>
                            <tr>
                                <td class="picture">
                                    ${profile_pic_tag}
                                </td>
                                <td class="name">
                                    <h1 style="padding-bottom: 10px;">${username}</h1>
                                    <h2>${current_position}</h2>
                                </td>
                                <td class="contact">
                                    <p style="padding-bottom: 10px;">${contact_number}</p><p>${email}</p>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <div class="about">
                       ${objective}
                    </div>
                </div><!-- ./header -->
                <div class="main">
                    <table>
                        <tbody>
                            <tr>
                                <td class="col-sm">
                                    ${skill_section}
                                    ${education_section}
                                    ${language_section}
                                    ${certificate_section}
                                    <!-- ./block -->
                                </td>
                                <td class="col-xl">
                                    ${experience_section}
                                    ${additional_feature_section}
                                    ${disability_section}
                                    <!-- ./block -->
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div><!-- ./header -->
            </div><!-- ./wrapper -->
        
        </body>
        
        </html>
    `;
    return html;
}

async function template14(color_code, first_name, last_name, username, profile_flag_status, profile_pic, address, email, contact_number, skill_flag_status, skill, certificate_flag_status, certificate, objective_flag_status, objective, experience_flag_status, experience, education_flag_status, education, language_flag_status, language, additional_feature_flag_status, additional_feature,disabled,disability_type) {
    var skill_section = '';
    var certificate_section = '';
    var experience_section = '';
    var education_section = '';
    var language_section = '';
    var profile_pic_tag = '';
    var current_position = '';
    var additional_feature_section = '';
    var objective_section = '';
    var contact_section = '';
    var position_section = '';
    var contact_number_section = '';
    var contact_section = '';
    var disability_section='';
    var template_theme = `<img src="${appURL}uploads/images/template/top_bg_14_1.png" class="banner" />`;
    //color code = ["#596977","#6F3F3F","#1C8EB5"]
    if (color_code != '') {
        if (color_code == '#596977') {
            template_theme = `<img src="${appURL}uploads/images/template/top_bg_14_1.png" class="banner" />`;
        } else if (color_code == '#6F3F3F') {
            template_theme = `<img src="${appURL}uploads/images/template/top_bg_14_2.png" class="banner" />`;
        } else if (color_code == '#1C8EB5') {
            template_theme = `<img src="${appURL}uploads/images/template/top_bg_14_3.png" class="banner" />`;
        }
    }else{
        color_code='#596977';
    }
    if (address != '' || contact_number != '' || email != '') {
        contact_section = contact_section + `
            <div class="contact-row"><img src="${appURL}uploads/images/template/Mail_black.svg" /><span style="max-width: 150px;white-space: normal;word-break: break-all;">${address}</span></div>
            <div class="contact-row"><img src="${appURL}uploads/images/template/Viber.svg" /><span style="max-width: 150px;white-space: normal;word-break: break-all;">${contact_number}</span></div>
            <div class="contact-row"><img src="${appURL}uploads/images/template/email_14.svg" /><span style="max-width: 150px;white-space: normal;word-break: break-all;">${email}</span></div>
        `;
    }
    if (experience_flag_status) {
        experience_section = experience_section + `<h3>Experience</h3>`;
        for (var experience_i = 0; experience_i < experience.length; experience_i++) {
            var start_date = experience[experience_i].start_date ? experience[experience_i].start_date : '';
            var end_date = experience[experience_i].end_date ? experience[experience_i].end_date : '';
            var date_status = false;
            if (start_date != '0000-00-00' && start_date != '') {
                date_status = true;
                start_date = await utils.change_data_format(start_date);
            }
            if (date_status) {
                if (end_date != '0000-00-00' && end_date != '') {
                    end_date = await utils.change_data_format(end_date);
                    var sorted_experience=await utils.sortExperienceByDate(experience,'asc');
                    if(sorted_experience.length>0){
                        current_position=sorted_experience[sorted_experience.length-1].position;
                    }
                } else {
                    end_date = 'Present';
                    current_position = experience[experience_i].position;
                }
            }
            experience_section = experience_section + `
            <div class="block">
                <h4>${experience[experience_i].position}</h4>
                <h5>${experience[experience_i].company_name}, ${start_date} - ${end_date}</h5>`;
            var responsibilities = experience[experience_i].responsilbilities ? experience[experience_i].responsilbilities.split(';') : '';
            if (responsibilities.length > 0) {
                experience_section = experience_section + `<div><ul>`;
                for (var responsibility_i = 0; responsibility_i < responsibilities.length; responsibility_i++) {
                    experience_section = experience_section + `<li>${responsibilities[responsibility_i]}</li>`;
                }
                experience_section = experience_section + `</div></ul>`;
            }
            experience_section = experience_section + `</div>`;
        }
    }
    if (education_flag_status) {
        education_section = education_section + `<h3>Education</h3>`;
        for (var education_i = 0; education_i < education.length; education_i++) {
            education_section = education_section + `
                <div class="block">                                
                    <h6>${education[education_i].qualification} in ${education[education_i].course_name}</h6>
                    <div class="desc">${education[education_i].institution}, ${education[education_i].academic_year}</div>
                </div>`;
        }
    }
    if (skill_flag_status) {
        skill_section = skill_section + `<h3>Skills</h3><div>`;
        for (var skill_i = 0; skill_i < skill.length; skill_i++) {
            skill_section = skill_section + `
                    ${skill[skill_i].skill}
                `;
            if (skill_i != skill.length - 1) {
                skill_section = skill_section + `<br/>`;
            }
        }
        skill_section = skill_section + `</div>`;
    }
    if (language_flag_status) {
        language_section = language_section + `<h3>Languages</h3><div>`;
        for (var language_i = 0; language_i < language.length; language_i++) {
            language_section = language_section + `${language[language_i].language}`;
            if (language_i != language.length - 1) {
                language_section = language_section + `<br/>`;
            }
        }
        language_section = language_section + `</div>`;
    }
    if (certificate_flag_status) {
        certificate_section = certificate_section + `<h3>Certifications</h3>`;
        for (var certificate_i = 0; certificate_i < certificate.length; certificate_i++) {
            certificate_section = certificate_section + `<div>${certificate[certificate_i].document_type}</div>`;
        }
    }
    if (profile_flag_status) {
        profile_pic_tag = profile_pic_tag + `<img src="${profile_pic}" />`;
    }
    if (additional_feature_flag_status) {
        for (var additional_feature_i = 0; additional_feature_i < additional_feature.length; additional_feature_i++) {
            if(additional_feature[additional_feature_i].show_status==1 && additional_feature[additional_feature_i].type_description!=''){
                additional_feature_section = additional_feature_section + `
                    <h3>${additional_feature[additional_feature_i].type}</h3>
                    <div class="block">
                        <div class="desc">${additional_feature[additional_feature_i].type_description}</div>
                    </div>
                `;
            }
        }
    }
    if(disabled==1){
        if(disability_type!=''){
            disability_section=disability_section+`
                    <h3>Physical Disability</h3>
                    <div class="block">
                        <div class="desc">${disability_type}</div>
                    </div>
                `;
        }
    }
    var html = `
        <!doctype html>
        <html lang="en">
        <head>
            <meta charset="utf-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <title>CV Template</title>
            <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;600;700&display=swap" rel="stylesheet">
            <style>
                * {
                    box-sizing: border-box; }
                
                body {
                    font-family: "Roboto", sans-serif;
                    font-weight: 400;
                    color: #222222;
                    font-size: 10px;
                    line-height: 14px; 
                    /*margin: 0;*/
                    zoom: 1.2;
                    }
                
                h1, h2, h3, h4, h5, h6, p {
                    margin: 0; }
                
                h1 {
                    font-size: 35px;
                    line-height: 42px;
                    font-weight: 400;
                    color: #ffffff; }
                
                h2 {
                    font-size: 14px;
                    font-weight: 400;
                    line-height: 24px;
                    letter-spacing: 0px;
                    color: #ffffff; }
                
                h3 {
                    font-size: 14px;
                    font-weight: 400;
                    line-height: 20px;
                    color: #CA6D18;
                    padding-bottom: 10px; }
                
                h4 {
                    font-weight: 400;
                    font-size: 14px;
                    line-height: 20px; }
                
                h5 {
                    color: #797979;
                    font-size: 11px;
                    line-height: 16px;
                    padding-bottom: 8px;
                    font-weight: 400; }
                
                h6 {
                    font-size: 12px;
                    line-height: 20px;
                    font-weight: 400; }
                
                .desc {
                    font-size: 11px;
                    color: #797979;
                    line-height: 16px; }
                
                ul {
                    margin: 8px 0;
                    padding-left: 20px; }
                    ul:last-child {
                    margin-bottom: 0; }
                
                table {
                    border-collapse: collapse;
                    width: 100%; }
                
                .banner {
                    width: 100%;
                    display: block;
                    margin-top: -3px; 
                }
                
                .wrapper {
                    width: 100%;
                    max-width: 595px;
                    margin: 20px auto;
                    min-height: 842px;
                    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px; }
                    @media print {
                    .wrapper {
                        box-shadow: none;
                        /*added css*/
                        max-width: 100%;
                        } }
                
                .header {
                    padding: 40px 32px 0;
                    background-color: ${color_code};
                 }
                    .header img {
                        width: 104px;
                        height: 104px;
                        border-radius: 50%;
                        object-fit: contain;
                     }
                    .header .picture {
                    width: 104px; }
                    .header .name {
                    padding-left: 20px; }
                    .header .contact {
                    color: white;
                    vertical-align: top; }
                
                .block {
                    padding-bottom: 16px; }
                    .block:last-child {
                    padding-bottom: 0;
                    margin-bottom: 0;
                    border: 0; }
                
                .main {
                    padding: 30px; }
                
                .col-sm {
                    width: 50%;
                    vertical-align: top; }
                
                .col-xl {
                    vertical-align: top;
                    padding-right: 30px; }
                    .col-xl h3 {
                    padding-bottom: 16px; }
                    .col-xl .block {
                    padding-bottom: 30px; }
                    .col-xl .block:last-child {
                        padding-bottom: 0;
                        margin-bottom: 0; }
                
                .contact-row {
                    padding-bottom: 6px; }
                    .contact-row:last-child {
                    padding-bottom: 0; }
                    .contact-row:after {
                    content: "";
                    display: table;
                    clear: both; }
                    .contact-row > img {
                    margin-right: 6px;
                    float: left;
                    width: 12px;
                    height: 12px;
                    object-fit: contain; }
                    .contact-row > span {
                    line-height: 1.1;
                    float: left; }
                
                .footer {
                    margin-top: 38px; }
                    .footer td {
                    vertical-align: top; }
                
                /*# sourceMappingURL=style.css.map */
                .split-col {
                    width: 33.33%;
                }
            </style>
        </head>
        
        <body>
        
            <div class="wrapper">        
                <div class="header">
                    <table class="profile">
                        <tbody>
                            <tr>
                                <td class="picture">
                                    ${profile_pic_tag}
                                </td>
                                <td class="name">                            
                                    <h2>${current_position}</h2>
                                    <h1>${first_name} <br>${last_name}</h1>
                                </td>
                                <td class="contact">
                                    ${contact_section}
                                </td>
                            </tr>
                        </tbody>
                    </table>            
                </div><!-- ./header -->
                <div>
                    ${template_theme}
                </div>
                <div class="main">
                    <table>
                        <tbody>
                            <tr>                        
                                <td class="col-xl">
                                    ${experience_section}
                                    <!-- ./block -->
                                    
                                </td>
                                <td class="col-sm">
                                    ${education_section}
                                    ${additional_feature_section}
                                    ${disability_section}
                                    <!-- ./block -->
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <table class="footer">
                        <tbody>
                            <tr>
                                <td class="split-col">
                                    ${skill_section}
                                </td>
                                <td class="split-col">
                                   ${language_section}
                                </td>
                                <td class="split-col">
                                    ${certificate_section}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div><!-- ./header -->
            </div><!-- ./wrapper -->
        
        </body>
        
        </html>
    `;
    return html;
}

async function template15(color_code, first_name, last_name, username, profile_flag_status, profile_pic, address, email, contact_number, skill_flag_status, skill, certificate_flag_status, certificate, objective_flag_status, objective, experience_flag_status, experience, education_flag_status, education, language_flag_status, language, additional_feature_flag_status, additional_feature,disabled,disability_type) {
    var skill_section = '';
    var certificate_section = '';
    var experience_section = '';
    var education_section = '';
    var language_section = '';
    var profile_pic_tag = '';
    var current_position = '';
    var additional_feature_section = '';
    var objective_section = '';
    var contact_section = '';
    var position_section = '';
    var contact_number_section = '';
    var contact_section = '';
    var address_section = '';
    var email_section = '';
    var disability_section='';
    if (address != '') {
        address_section = `
            <div class="cont-row">
                <span>Address</span>
                <div style="white-space: normal;word-break: break-all;max-width: 150px;">${address}</div>
            </div>`;
    }
    if (profile_flag_status) {
        profile_pic_tag = `
            <td class="picture">
                <img src="${profile_pic}" />
            </td>
        `;
    }
    //["#E4F6FB80","","#F4E4E1","#596977"]
    /*background-color: rgba(228, 246, 251, 0.5);*/
    //background-color: rgba(89,105,119, 0.2);

    if (color_code == '') {
        color_code = 'rgba(228, 246, 251, 0.5)';
    } else {
        if (color_code == "#E4F6FB80") {
            color_code = 'rgba(228, 246, 251, 0.5)';
        } else if (color_code == "#F4E4E1") {
            color_code = 'rgb(244, 228, 225,0.5)';
        } else if (color_code == "#596977") {
            color_code = 'rgba(89,105,119, 0.2)';
        }
    }

    if (contact_number != '') {
        contact_number_section = `
            <div class="cont-row">
                <span>Phone</span>
                <div style="white-space: normal;word-break: break-all;max-width: 150px;">${contact_number}</div>
            </div>`;
    }
    if (email != '') {
        email_section = `
            <div class="cont-row">
                <span>Email</span>
                <div style="white-space: normal;word-break: break-all;max-width: 150px;">${email}</div>
            </div>`;
    }
    if (experience_flag_status) {
        experience_section = experience_section + `<h3>Experience</h3>`;
        for (var experience_i = 0; experience_i < experience.length; experience_i++) {
            var start_date = experience[experience_i].start_date ? experience[experience_i].start_date : '';
            var end_date = experience[experience_i].end_date ? experience[experience_i].end_date : '';
            var date_status = false;
            if (start_date != '0000-00-00' && start_date != '') {
                date_status = true;
                start_date = await utils.change_data_format(start_date);
            }
            if (date_status) {
                if (end_date != '0000-00-00' && end_date != '') {
                    end_date = await utils.change_data_format(end_date);
                    var sorted_experience=await utils.sortExperienceByDate(experience,'asc');
                    if(sorted_experience.length>0){
                        current_position=sorted_experience[sorted_experience.length-1].position;
                    }
                } else {
                    end_date = 'Present';
                    current_position = experience[experience_i].position;
                }
            }
            experience_section = experience_section + `
                <div class="block">
                    <h4>${experience[experience_i].position}</h4>
                    <h5>${experience[experience_i].company_name}, ${start_date} – ${end_date}</h5>
            `;
            var responsibilities = experience[experience_i].responsilbilities ? experience[experience_i].responsilbilities.split(';') : '';
            if (responsibilities.length > 0) {
                experience_section = experience_section + `<div><ul>`;
                for (var responsibility_i = 0; responsibility_i < responsibilities.length; responsibility_i++) {
                    experience_section = experience_section + `<li>${responsibilities[responsibility_i]}</li>`;
                }
                experience_section = experience_section + `</ul></div>`;
            }
            experience_section = experience_section + `</div>`;
        }
        experience_section = experience_section + `</div>`;
    }
    if (education_flag_status) {
        education_section = education_section + `<h3>Education</h3>`;
        for (var education_i = 0; education_i < education.length; education_i++) {
            education_section = education_section + `
                <div class="block">                                
                    <h6>${education[education_i].qualification} in ${education[education_i].course_name}</h6>
                    <div class="desc">${education[education_i].institution}, ${education[education_i].academic_year}</div>
                </div>`;
        }
    }
    if (skill_flag_status) {
        skill_section = skill_section + `<h3>Skills</h3><div class="list block">`
        for (var skill_i = 0; skill_i < skill.length; skill_i++) {
            skill_section = skill_section + `${skill[skill_i].skill}`;
            if (skill_i != skill.length - 1) {
                skill_section = skill_section + `<br/>`;
            }
        }
        skill_section = skill_section + `</div>`;
    }
    if (language_flag_status) {
        language_section = language_section + `<h3>Languages</h3><div class="list block">`;
        for (var language_i = 0; language_i < language.length; language_i++) {
            language_section = language_section + `${language[language_i].language}`;
            if (language_i != language.length - 1) {
                language_section = language_section + `<br/>`;
            }
        }
        language_section = language_section + `</div>`;
    }
    if (certificate_flag_status) {
        certificate_section = certificate_section + `<h3>Certifications</h3><div class="list block">`;
        for (var certificate_i = 0; certificate_i < certificate.length; certificate_i++) {
            certificate_section = certificate_section + `${certificate[certificate_i].document_type}`;
            if (certificate_i != certificate.length - 1) {
                certificate_section = certificate_section + `<br/>`;
            }
        }
        certificate_section = certificate_section + `</div>`;
    }
    if (additional_feature_flag_status) {
        for (var additional_feature_i = 0; additional_feature_i < additional_feature.length; additional_feature_i++) {
            if(additional_feature[additional_feature_i].show_status==1 && additional_feature[additional_feature_i].type_description!=''){
                additional_feature_section = additional_feature_section + `
                    <h3>${additional_feature[additional_feature_i].type}</h3>
                    <div class="block">                                
                        <div class="desc">${additional_feature[additional_feature_i].type_description}</div>
                    </div>`;
            }
        }
    }
    if(disabled==1){
        if(disability_type!=''){
            disability_section=disability_section+`
                    <h3>Physical Disability</h3>
                    <div class="block">                                
                        <div class="desc">${disability_type}</div>
                    </div>
                `;
        }
    }
    var html = `
        <!doctype html>
        <html lang="en">
        <head>
            <meta charset="utf-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <title>CV Template</title>
            <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;600;700&display=swap" rel="stylesheet">
            <style>
                * {
                    box-sizing: border-box; }
                
                body {
                    font-family: "Roboto", sans-serif;
                    font-weight: 400;
                    color: #222222;
                    font-size: 10px;
                    line-height: 14px;
                    /*margin: 0px;*/
                    zoom: 1.2;
                     }
                
                h1, h2, h3, h4, h5, h6, p {
                    margin: 0; }
                
                h1 {
                    font-size: 26px;
                    line-height: 34px;
                    font-weight: 600; }
                
                h2 {
                    font-size: 16px;
                    font-weight: 500;
                    line-height: 24px;
                    letter-spacing: 0px;
                    color: #1C8EB5; }
                
                h3 {
                    font-size: 14px;
                    font-weight: 500;
                    line-height: 20px;
                    color: #1C8EB5;
                    padding-bottom: 12px; }
                
                h4 {
                    font-weight: 700;
                    font-size: 14px;
                    line-height: 20px; }
                
                h5 {
                    color: #797979;
                    font-size: 11px;
                    line-height: 16px;
                    padding-bottom: 8px;
                    font-weight: 400; }
                
                h6 {
                    font-size: 12px;
                    line-height: 20px;
                    font-weight: 700; }
                
                .desc {
                    font-size: 11px;
                    color: #797979;
                    line-height: 16px; }
                
                ul {
                    margin: 8px 0;
                    padding-left: 20px; }
                    ul:last-child {
                    margin-bottom: 0; }
                
                table {
                    border-collapse: collapse;
                    width: 100%; }
                
                .banner {
                    width: 100%;
                    display: block;
                    margin-top: -1px; }
                
                .name {
                    padding-left: 12px; }
                
                .wrapper {
                    width: 100%;
                    max-width: 595px;
                    margin: 20px auto;
                    /*margin: 0px auto;*/
                    min-height: 842px;
                    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px; }
                    @media print {
                    .wrapper {
                        box-shadow: none;
                        /*added css*/
                        max-width: 100%;
                     } }
                
                .header {
                    padding: 32px;
                    /*background-color: rgba(228, 246, 251, 0.5);*/
                    background-color: ${color_code};

                }
                    .header img {
                    width: 58px;
                    height: 58px;
                    border-radius: 50%;
                    object-fit: contain; }
                    .header .picture {
                    width: 58px; }
                
                td.contact {
                    width: 220px;
                    padding-left: 40px; }
                
                .block {
                    padding-bottom: 16px; }
                    .block:last-child {
                    padding-bottom: 0;
                    margin-bottom: 0;
                    border: 0; }
                
                .main {
                    padding: 30px; }
                
                .col-sm {
                    width: 245px;
                    vertical-align: top; }
                
                .col-xl {
                    vertical-align: top;
                    padding-right: 30px; }
                    .col-xl .block {
                    padding-bottom: 30px; }
                    .col-xl .block:last-child {
                        padding-bottom: 0;
                        margin-bottom: 0; }
                
                .cont-row {
                    font-weight: 600;
                    padding-bottom: 12px; }
                    .cont-row span {
                    color: #1C8EB5;
                    font-weight: 500; }
                    .cont-row:last-child {
                    padding-bottom: 0; }
                
                .contact-row {
                    padding-bottom: 6px; }
                    .contact-row:last-child {
                    padding-bottom: 0; }
                    .contact-row:after {
                    content: "";
                    display: table;
                    clear: both; }
                    .contact-row > img {
                    margin-right: 6px;
                    float: left;
                    width: 12px;
                    height: 12px;
                    object-fit: contain; }
                    .contact-row > span {
                    line-height: 1.1;
                    float: left; }
                
                .list {
                    line-height: 18px; }
                
                .about {
                    padding-top: 14px; }
                
                /*# sourceMappingURL=style.css.map */
          
            </style>
        </head>
        
        <body>
        
            <div class="wrapper">        
                <div class="header">
                    <table class="profile">
                        <tbody>
                            <tr>
                                <td>
                                    <table class="img-name">
                                        <tbody>
                                            <tr>
                                                ${profile_pic_tag}
                                                <td class="name">
                                                    <h1>${username}</h1>
                                                    <h2>${current_position}</h2>                                            
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <div class="about">
                                        ${objective}
                                    </div>
                                </td>
                                <td class="contact">
                                    ${address_section}
                                    ${contact_number_section}
                                    ${email_section}
                                </td>
                            </tr>
                        </tbody>
                    </table>            
                </div><!-- ./header -->
                <div class="main">
                    <table>
                        <tbody>
                            <tr>                        
                                <td class="col-xl">
                                    ${experience_section}
                                    ${additional_feature_section}
                                    ${disability_section}
                                </td>
                                <td class="col-sm">
                                    ${education_section}
                                    <!-- ./block -->
                                    <br>
                                    ${skill_section}
                                    ${language_section}
                                    ${certificate_section}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div><!-- ./header -->
            </div><!-- ./wrapper -->
        
        </body>
        
        </html>
    `;
    return html;
}

async function template16(color_code, first_name, last_name, username, profile_flag_status, profile_pic, address, email, contact_number, skill_flag_status, skill, certificate_flag_status, certificate, objective_flag_status, objective, experience_flag_status, experience, education_flag_status, education, language_flag_status, language, additional_feature_flag_status, additional_feature,disabled,disability_type) {
    var skill_section = '';
    var certificate_section = '';
    var experience_section = '';
    var education_section = '';
    var language_section = '';
    var profile_pic_tag = '';
    var current_position = '';
    var additional_feature_section = '';
    var objective_section = '';
    var contact_section = '';
    var position_section = '';
    var contact_number_section = '';
    var contact_section = '';
    var address_section = '';
    var email_section = '';
    var disability_section='';

    if (address != '') {
        address_section = address_section + `<div class="contact-row" ><img src="${appURL}uploads/images/template/home_16.svg" /><span style="white-space: normal;word-break: break-all;">${address}</span></div>`;
    }
    if (contact_number != '') {
        contact_number_section = contact_number_section + `<div class="contact-row"><img src="${appURL}uploads/images/template/call_16.svg" /><span style="white-space: normal;word-break: break-all;">${contact_number}</span></div>`;
    }
    if (email != '') {
        email_section = `<div class="contact-row"><img src="${appURL}uploads/images/template/email_16.svg" /><span style="white-space: normal;word-break: break-all;">${email}</span></div>`;
    }
    if (skill_flag_status) {
        skill_section = skill_section + `<div class="block"><h4>Skills</h4><div>`;
        for (var skill_i = 0; skill_i < skill.length; skill_i++) {
            skill_section = skill_section + `${skill[skill_i].skill}`;
            if (skill_i != skill.length - 1) {
                skill_section = skill_section + `<br/>`;
            }
        }
        skill_section = skill_section + `</div></div>`;
    }
    if (language_flag_status) {
        language_section = language_section + `<div class="block"><h4>Languages</h4><div>`;
        for (var language_i = 0; language_i < language.length; language_i++) {
            language_section = language_section + language[language_i].language;
            if (language_i != language.length - 1) {
                language_section = language_section + ', ';
            }
        }
        language_section = language_section + `</div></div>`
    }
    if (experience_flag_status) {
        for (var experience_i = 0; experience_i < experience.length; experience_i++) {
            var start_date = experience[experience_i].start_date ? experience[experience_i].start_date : '';
            var end_date = experience[experience_i].end_date ? experience[experience_i].end_date : '';
            var date_status = false;
            if (start_date != '0000-00-00' && start_date != '') {
                date_status = true;
                start_date = await utils.change_data_format(start_date);
            }
            if (date_status) {
                if (end_date != '0000-00-00' && end_date != '') {
                    end_date = await utils.change_data_format(end_date);
                    var sorted_experience=await utils.sortExperienceByDate(experience,'asc');
                    if(sorted_experience.length>0){
                        current_position=sorted_experience[sorted_experience.length-1].position;
                    }
                } else {
                    end_date = 'Present';
                    current_position = experience[experience_i].position;
                }
            }
            experience_section = experience_section + `<div class="block"><h3>${experience[experience_i].position}</h3><h4>${experience[experience_i].company_name}, ${start_date} - ${end_date}</h4>`;
            var responsibilities = experience[experience_i].responsilbilities ? experience[experience_i].responsilbilities.split(';') : '';
            if (responsibilities.length > 0) {
                experience_section = experience_section + `<ul>`;
                for (var responsibility_i = 0; responsibility_i < responsibilities.length; responsibility_i++) {
                    experience_section = experience_section + `<li>${responsibilities[responsibility_i]}</li>`;
                }
                experience_section = experience_section + `</ul>`;
            }
            experience_section = experience_section + `</div>`;
        }
    }
    if (education_flag_status) {
        education_section = education_section = `<h4>Education </h4>`;
        for (var education_i = 0; education_i < education.length; education_i++) {
            education_section = education_section + `
                <div class="subblock">
                    <h5>${education[education_i].qualification} in ${education[education_i].course_name}</h5>
                    <div>${education[education_i].institution}, ${education[education_i].academic_year}</div>
                </div>
            `;
        }
    }
    if (certificate_flag_status) {
        certificate_section = certificate_section + `<h4>Certifications </h4>`;
        for (var certificate_i = 0; certificate_i < certificate.length; certificate_i++) {
            certificate_section = certificate_section + `
                <div class="subblock">
                    <h5>${certificate[certificate_i].document_type}</h5>
                    <div>${certificate[certificate_i].year}</div>
                </div>
            `;
        }
    }
    if (additional_feature_flag_status) {
        for (var additional_feature_i = 0; additional_feature_i < additional_feature.length; additional_feature_i++) {
            if(additional_feature[additional_feature_i].show_status==1 && additional_feature[additional_feature_i].type_description!=''){
                additional_feature_section = additional_feature_section + `<div class="block"><h3>${additional_feature[additional_feature_i].type}</h3></h4><div>${additional_feature[additional_feature_i].type_description}</div></div>`;
            }
        }
    }
    if(disabled==1){
        if(disability_type!=''){
            disability_section=disability_section+`
                    <div class="block"><h3>Physical Disability</h3></h4><div>${disability_type}</div></div>
                `;
        }
    }
    var html = `
        <!doctype html>
        <html lang="en">
        <head>
            <meta charset="utf-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <title>CV Template</title>
            <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;600;700&display=swap" rel="stylesheet">
            <style>
                * {
                    box-sizing: border-box; }
                
                body {
                    font-family: "Roboto", sans-serif;
                    font-weight: 400;
                    color: #222222;
                    font-size: 8px;
                    line-height: 14px;
                    zoom: 1.2; }
                
                h1, h2, h3, h4, h5, h6, p {
                    margin: 0; }
                
                h1 {
                    font-size: 24px;
                    line-height: 30px;
                    font-weight: 700;
                    padding-bottom: 4px; }
                
                h2 {
                    font-size: 14px;
                    font-weight: 600;
                    line-height: 20px;
                    letter-spacing: 0px;
                    color: #0E6CC2;
                    padding-bottom: 12px; }
                
                h3 {
                    font-size: 12px;
                    font-weight: 700;
                    line-height: 18px; }
                
                h4 {
                    color: #0E6CC2;
                    font-size: 9px;
                    line-height: 14px;
                    font-weight: 600;
                    padding-bottom: 8px; }
                
                h5 {
                    font-size: 11px;
                    font-weight: 700;
                    line-height: 18px; }
                
                h6 {
                    font-size: 9px;
                    font-weight: 700;
                    line-height: 14px; }
                
                ul {
                    padding-left: 16px;
                    margin: 0; }
                
                table {
                    border-collapse: collapse;
                    width: 100%; }
                    table td {
                    vertical-align: top; }
                    table td.col-sm {
                        max-width: 176px;
                        /*width: 176px;*/
                        padding-right: 22px; }
                
                .wrapper {
                    width: 100%;
                    max-width: 595px;
                    margin: 20px auto;
                    min-height: 842px;
                    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
                    padding: 28px 24px 24px; }
                    @media print {
                    .wrapper {
                        box-shadow: none;
                        /*added css*/
                        max-width: 100%; } }
                
                .about {
                    padding-bottom: 36px; }
                
                .contact-row {
                    display: flex;
                    align-items: center;
                    /*justify-content: center;*/
                    padding-bottom: 8px; }
                    .contact-row:last-child {
                    padding-bottom: 0; }
                    .contact-row:after {
                    content: "";
                    display: table;
                    clear: both; }
                    .contact-row > img {
                    margin-right: 3px;
                    float: left;
                    width: 12px;
                    height: 12px;
                    object-fit: contain;
                    margin-top: -1px; }
                    .contact-row > span {
                    line-height: 1.4;
                    float: left;
                    display: inline-block; }
                
                .block {
                    padding-bottom: 12px; }
                    .block:last-child {
                    padding-bottom: 0; }
                
                .box {
                    padding: 20px;
                    background: #F9F9F9; }
                
                .footer {
                    padding: 16px;
                    background-color: #F9F9F9;
                    margin-top: 18px;
                    border-radius: 8px; }
                    .footer table td {
                    vertical-align: top; }
                
                .col-xl {
                    font-size: 9px;
                    line-height: 14px; }
                    .col-xl .block {
                    padding-bottom: 38px; }
                    .col-xl .block:last-child {
                        padding-bottom: 0; }
                
                .subsubblock {
                    padding-bottom: 8px; }
                    .subsubblock:last-child {
                    padding-bottom: 0; }
                
                .subblock {
                    padding-bottom: 12px;
                    max-width: 234px;
                    padding-right: 12px; }
                    .subblock:last-child {
                    padding-bottom: 0; }
                
                /*# sourceMappingURL=style.css.map */
          
            </style>
        </head>
        
        <body>
        
            <div class="wrapper">        
                <table>
                    <tbody>
                        <tr>
                            <td class="col-sm">
                                <h1>${username}</h1>
                                <h2>${current_position}</h2>
                                <div class="about">
                                    ${objective}
                                </div>
                                <div class="block">
                                    <h4>Contacts</h4>
                                    <div>
                                        ${address_section}
                                        ${contact_number_section}
                                        ${email_section}
                                    </div>
                                </div>
                                ${skill_section}
                                ${language_section}
                            </td>
                            <td class="col-xl">
                                <div class="box">
                                    ${experience_section}
                                    ${additional_feature_section}
                                    ${disability_section}
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div class="footer">
                    <table>
                        <tbody>
                            <tr>
                                <td>
                                    ${education_section}
                                </td>
                                <td>
                                    ${certificate_section}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div><!-- ./wrapper -->
        
        </body>
        
        </html>
    `;
    return html;
}

async function template17(color_code, first_name, last_name, username, profile_flag_status, profile_pic, address, email, contact_number, skill_flag_status, skill, certificate_flag_status, certificate, objective_flag_status, objective, experience_flag_status, experience, education_flag_status, education, language_flag_status, language, additional_feature_flag_status, additional_feature,disabled,disability_type) {
    var skill_section = '';
    var certificate_section = '';
    var experience_section = '';
    var education_section = '';
    var language_section = '';
    var profile_pic_tag = '';
    var current_position = '';
    var additional_feature_section = '';
    var objective_section = '';
    var contact_section = '';
    var position_section = '';
    var contact_number_section = '';
    var contact_section = '';
    var address_section = '';
    var email_section = '';
    var disability_section='';

    if (profile_flag_status) {
        profile_pic_tag = `<td class="picture">
                            <img src="${profile_pic}" />                     
                        </td>`;
    }
    if (email != '') {
        email_section = `
            <tr>
                <td class="icon">
                    <img src="${appURL}uploads/images/template/Email_17.svg" />
                </td>
                <td class="info">${email}</td>
            </tr>
        `;
    }
    if (address != '') {
        address_section = `
            <tr>
                <td class="icon">
                    <img src="${appURL}uploads/images/template/location_17.svg" />
                </td>
                <td class="info">${address}</td>
            </tr>
        `;
    }
    if (contact_number != '') {
        contact_number_section = `
            <tr>
                <td class="icon">
                    <img src="${appURL}uploads/images/template/phone_17.svg" />
                </td>
                <td class="info">${contact_number}</td>
            </tr>
        `;
    }
    if (objective_flag_status) {
        objective_section = `
            <td class="about">
                <h3>
                    <span>Profile</span>
                </h3>
                <div>${objective}</div>
            </td>
        `;
    }
    if (skill_flag_status) {
        skill_section = skill_section + `
            <td class="skills">
                <h3>
                    <span>Skills</span>
                </h3>
                <ul class="list-with-icon">`;
        for (var skill_i = 0; skill_i < skill.length; skill_i++) {
            skill_section = skill_section + `<li>${skill[skill_i].skill}</li>`;
        }
        skill_section = skill_section + `</ul></td>`;
    }
    if (education_flag_status) {
        education_section = education_section + `
            <h3>
                <span>Education</span>
            </h3>
            <table class="block">
                <tbody>
        `;
        for (var education_i = 0; education_i < education.length; education_i++) {
            education_section = education_section + `
                <tr>
                    <td class="year">${education[education_i].academic_year}</td>
                    <td class="content">
                        <h4>${education[education_i].institution}</h4>
                        <p>${education[education_i].qualification} in ${education[education_i].course_name}, GPA: ${education[education_i].cgpa}</p>
                        <span class="location">${education[education_i].country}</span>
                    </td>
                </tr>
            `;
        }
        education_section = education_section + `</tbody></table>`;
    }
    if (language_flag_status) {
        language_section = language_section + `
            <h3>
                <span>Languages</span>
            </h3>
            <table class="block">
                <tbody><tr>
                <td><ul>
        `;
        for (var language_i = 0; language_i < language.length; language_i++) {
            language_section = language_section + `<li>${language[language_i].language}</li>`;
        }
        language_section = language_section + `</ul></td></tr> </tbody></table>`;
    }
    if (certificate_flag_status) {
        certificate_section = certificate_section + `
            <h3>
                <span>Cetification</span>
            </h3>
            <table class="block">
                <tbody><tr>
                <td><ul>
        `;
        for (var certificate_i = 0; certificate_i < certificate.length; certificate_i++) {
            certificate_section = certificate_section + `<li>${certificate[certificate_i].document_type}</li>`;
        }
        certificate_section = certificate_section + `</ul></td></tr> </tbody></table>`;
    }
    if(additional_feature_flag_status){
        
        for(var additional_feature_i=0; additional_feature_i<additional_feature.length; additional_feature_i++){
            if(additional_feature[additional_feature_i].show_status==1 && additional_feature[additional_feature_i].type_description!=''){
                additional_feature_section=additional_feature_section+`
                    <h3>
                        <span>${additional_feature[additional_feature_i].type}</span>
                    </h3>
                    <table class="block">
                        <tbody><tr>
                        <td><p>${additional_feature[additional_feature_i].type_description}</p></td></tr> </tbody></table>
                `;
            }
        }
        additional_feature_section=additional_feature_section+`</ul></td></tr> </tbody></table>`;
    }

    if(disabled==1){
        if(disability_type!=''){
            disability_section=disability_section+`
                    <h3>
                        <span>Physical Disability</span>
                    </h3>
                    <table class="block">
                        <tbody><tr>
                        <td><p>${disability_type}</p></td></tr> </tbody></table>
                `;
        }
    }
    if (experience_flag_status) {
        experience_section = experience_section + `
            <h3>
            <span>experience</span>
            </h3>
            <table class="block">
                <tbody>`;
        for (var experience_i = 0; experience_i < experience.length; experience_i++) {
            var start_date = experience[experience_i].start_date ? experience[experience_i].start_date : '';
            var end_date = experience[experience_i].end_date ? experience[experience_i].end_date : '';
            var date_status = false;
            if (start_date != '0000-00-00' && start_date != '') {
                date_status = true;
                start_date = await utils.change_date_format_to_year(start_date);
            }
            if (date_status) {
                if (end_date != '0000-00-00' && end_date != '') {
                    end_date = await utils.change_date_format_to_year(end_date);
                    var sorted_experience=await utils.sortExperienceByDate(experience,'asc');
                    if(sorted_experience.length>0){
                        current_position=sorted_experience[sorted_experience.length-1].position;
                    }
                } else {
                    end_date = 'Present';
                    current_position = experience[experience_i].position;
                }
            }
            experience_section = experience_section + `
                <tr>
                    <td class="year">${start_date} - ${end_date}</td>
                    <td class="content">
                        <h4>${experience[experience_i].position} at ${experience[experience_i].company_name}</h4>
            `;
            var responsibilities = experience[experience_i].responsilbilities ? experience[experience_i].responsilbilities.split(';') : '';
            if (responsibilities.length > 0) {
                experience_section = experience_section + `<ul>`;
                for (var responsibility_i = 0; responsibility_i < responsibilities.length; responsibility_i++) {
                    experience_section = experience_section + `<li>${responsibilities[responsibility_i]}</li>`;
                }
                experience_section = experience_section + `</ul>`;
            }
            experience_section = experience_section + `<span class="location">${experience[experience_i].country}</span></td></tr>`;
        }
        experience_section = experience_section + `</tbody></table>`;
    }
    
    var html = `
        <!doctype html>
        <html lang="en">
        <head>
            <meta charset="utf-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <title>CV Template</title>
            <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;600;700&display=swap" rel="stylesheet">
            <style>
                * {
                    box-sizing: border-box; }
                
                body {
                    font-family: "Roboto", sans-serif;
                    font-weight: 400;
                    color: #212121;
                    font-size: 11px;
                    line-height: 17px;
                    letter-spacing: -0.2px;
                    zoom: 1.2 }
                
                h1, h2, h3, h4, h5, h6, p {
                    margin: 0; }
                
                h1 {
                    font-size: 24px;
                    font-weight: 700;
                    line-height: 25px;
                    letter-spacing: -0.3px;
                    padding-bottom: 11px; }
                
                h2 {
                    font-size: 10px;
                    font-weight: 400;
                    line-height: 19px;
                    letter-spacing: 0.60px;
                    color: #3E6AF2;
                    padding-bottom: 5px; }
                
                h3 {
                    font-size: 13px;
                    font-weight: 700;
                    line-height: 15px;
                    letter-spacing: -0.3px;
                    margin-bottom: 15px;
                    background-image: url(${appURL}uploads/images/template/line_17.svg);
                    background-repeat: repeat-x;
                    background-position: center;
                    text-transform: capitalize; }
                    h3 span {
                    background-color: white;
                    width: 80px;
                    display: block; }
                
                h4 {
                    font-size: 11px;
                    font-weight: 600;
                    line-height: 18px;
                    letter-spacing: 0px;
                    padding-bottom: 5px; }
                
                p {
                    opacity: .7;
                    padding-bottom: 12px; }
                
                table {
                    border-collapse: collapse;
                    width: 100%; }
                    table td {
                    border-collapse: collapse; }
                    table .picture {
                    width: 115px;
                    /*height: 144px;*/
                 }
                    table .picture > img {
                        width: 115px;
                        height: 144px;
                        object-fit: cover;
                        border-radius: 6px;
                        /*background-repeat: no-repeat*/;
                     }
                    table .name {
                    padding-left: 20px;
                    padding-top:0px;
                    margin-top:0px; }
                    table .icon {
                    vertical-align: middle;
                    width: 23px;
                    text-align: center; }
                    table .icon img {
                        display: block;
                        width: 16px; }
                    table.contact-with-icon td {
                    padding-bottom: 6px; }
                    table.profile {
                    margin-bottom: 36px; }
                    table.profile td {
                        vertical-align: top; }
                    table .about {
                    width: 270px; }
                    table .about div {
                        opacity: .7; }
                    table .skills {
                    padding-left: 30px; }
                    table .info {
                    opacity: .7;
                    word-wrap: break-word;
                    white-space: normal;
                    word-break: break-all;
                     }
                    table.top {
                    margin-bottom: 20px; }
                    table.block {
                    margin-bottom: 12px; }
                    table.block td {
                        vertical-align: top; }
                    table.block .year {
                        width: 75px;
                        color: #3E6AF2;
                        font-size: 10px;
                        line-height: 18px; }
                    table.block .content {
                        position: relative; }
                        table.block .content span {
                        position: absolute;
                        font-size: 10px;
                        font-weight: 400;
                        line-height: 18px;
                        letter-spacing: 0px;
                        top: 0;
                        right: 0;
                        opacity: .4; }
                
                ul.list-with-icon {
                    list-style: none;
                    margin: 0;
                    padding: 0;
                    column-count: 2; }
                    ul.list-with-icon li {
                    padding-left: 14px;
                    background-image: url(${appURL}uploads/images/template/Oval_17.svg);
                    background-repeat: no-repeat;
                    background-position: left 4px;
                    margin-bottom: 5px; }
                
                .wrapper {
                    width: 100%;
                    max-width: 595px;
                    margin: 20px auto;
                    min-height: 842px;
                    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
                    padding: 28px 24px 24px; }
                    @media print {
                    .wrapper {
                        box-shadow: none;
                        /*added css*/
                        max-width: 100%;
                     } }
                
                /*# sourceMappingURL=style.css.map */
          
            </style>
        </head>
        
        <body>
        
            <div class="wrapper">        
                <div class="header">
                    <table class="top">
                        <tbody>
                            <tr>
                                ${profile_pic_tag}
                                <td class="name">
                                    <h2>${current_position}</h2>
                                    <h1>${username}</h1>
                                    <table class="contact-with-icon">
                                        <tbody>
                                            ${email_section}
                                            ${address_section}
                                            ${contact_number_section}
                                        </tbody>
                                    </table><!-- ./contact-with-icon -->
                                </td>
                            </tr>
                        </tbody>
                    </table><!-- ./top -->
                    <table class="profile">
                        <tbody>
                            <tr>
                                ${objective_section}
                                ${skill_section}
                            </tr>
                        </tbody>
                    </table><!-- ./profile -->
                </div><!-- ./header -->
                <div class="main">
                    ${education_section}
                    ${experience_section}
                    ${language_section}
                    ${certificate_section}
                    ${additional_feature_section}
                    ${disability_section}
                    <!-- ./block -->
                </div><!-- ./main -->
            </div><!-- ./wrapper -->
        
        </body>
        
        </html>
    `;
    return html;
}

async function template18(color_code, first_name, last_name, username, profile_flag_status, profile_pic, address, email, contact_number, skill_flag_status, skill, certificate_flag_status, certificate, objective_flag_status, objective, experience_flag_status, experience, education_flag_status, education, language_flag_status, language, additional_feature_flag_status, additional_feature,disabled,disability_type){
    var skill_section = '';
    var certificate_section = '';
    var experience_section = '';
    var education_section = '';
    var language_section = '';
    var profile_pic_tag = '';
    var current_position = '';
    var additional_feature_section = '';
    var objective_section = '';
    var contact_section = '';
    var position_section = '';
    var contact_number_section = '';
    var contact_section = '';
    var address_section = '';
    var email_section = '';
    var disability_section='';

    var template_theme_path=`${appURL}uploads/images/template/left-top-bg_18_1.png`;
    if(color_code!=''){
        if(color_code=='#FFD739'){
            template_theme_path=`${appURL}uploads/images/template/left-top-bg_18_1.png`;
        }else if(color_code=='#1C8EB5'){
            template_theme_path=`${appURL}uploads/images/template/left-top-bg_18_2.png`;
        }else if(color_code=='#768491'){
            template_theme_path=`${appURL}uploads/images/template/left-top-bg_18_3.png`;
        }
    }
    if(profile_flag_status){
        profile_pic_tag=`<img src="${profile_pic}" />`;
    }
    if(address!='' || contact_number!='' || email!=''){
        contact_section=contact_section+`
            <div class="block">
                <h3>Details</h3>
        `;

        if(address!=''){
            contact_section=contact_section+`
                <div class="subblock">
                    <h4>Address</h4>
                    <p  style="word-wrap:break-word;white-space: normal;word-break: break-all;letter-spacing: normal;">${address}</p>
                </div>
            `
        }

        if(contact_number!=''){
            contact_section=contact_section+`
                <div class="subblock">
                    <h4>Phone</h4>
                    <p>${contact_number}</p>
                </div>
            `;
        }

        if(email!=''){
            contact_section=contact_section+`
                <div class="subblock">
                    <h4>Email</h4>
                    <p>${email}</p>
                </div>
            `;
        }

        contact_section=contact_section+`</div>`;
    }

    if(skill_flag_status){
        skill_section=skill_section+`<div class="block"><h3>Skills</h3>`;
        for(var skill_i=0; skill_i<skill.length; skill_i++){
            skill_section=skill_section+`
                <div class="subblock">
                <p>${skill[skill_i].skill}</p>
            `;
            if(skill[skill_i].rating_status==1){
                skill_section=skill_section+`<div class="stars">`;
                for (var rating_i = 1; rating_i <= 5; rating_i++) {
                    if (rating_i <= skill[skill_i].rating) {
                        skill_section = skill_section +`<img src="${appURL}uploads/images/template/Star_18.svg" />`;
                    } else {
                        skill_section = skill_section +`<img src="${appURL}uploads/images/template/Star_notactie_18.svg" />`;
                    }
                }
                skill_section=skill_section+`</div>`;
            }
            skill_section=skill_section+`</div>`;
        }
        skill_section=skill_section+`</div>`;
    }

    if(certificate_flag_status){
        certificate_section=certificate_section+`<div class="block"><h3>Certifications</h3>`;
        for(var certificate_i=0; certificate_i<certificate.length; certificate_i++){
            certificate_section=certificate_section+`<p>${certificate[certificate_i].document_type}</p>`;
        }
        certificate_section=certificate_section+`</div>`;
    }

    if(objective_flag_status){
        objective_section=`
            <div class="block">
                <h3>Objective</h3>
                <p style="letter-spacing: normal;">${objective}</p>
            </div>
        `;
    }

    if(experience_flag_status){
        experience_section=experience_section+`<div class="block"><h3>Experience</h3>`;
        for(var experience_i=0; experience_i<experience.length; experience_i++){
            var start_date = experience[experience_i].start_date ? experience[experience_i].start_date : '';
            var end_date = experience[experience_i].end_date ? experience[experience_i].end_date : '';
            var date_status = false;
            if (start_date != '0000-00-00' && start_date != '') {
                date_status = true;
                start_date = await utils.change_data_format(start_date);
            }
            if (date_status) {
                if (end_date != '0000-00-00' && end_date != '') {
                    end_date = await utils.change_data_format(end_date);
                    var sorted_experience=await utils.sortExperienceByDate(experience,'asc');
                    if(sorted_experience.length>0){
                        current_position=sorted_experience[sorted_experience.length-1].position;
                    }
                } else {
                    end_date = 'Present';
                    current_position = experience[experience_i].position;
                }
            }
            experience_section = experience_section + `
                <div class="subblock">
                    <h4>${experience[experience_i].company_name}</h4>
                    <h5>${experience[experience_i].position}</h5>
                    <p>${start_date} - ${end_date}</p>
            `;
            var responsibilities = experience[experience_i].responsilbilities ? experience[experience_i].responsilbilities.split(';') : '';
            if(responsibilities.length>0){
                experience_section=experience_section+`<ul>`;
                for(var responsibility_i=0; responsibility_i<responsibilities.length; responsibility_i++){
                    experience_section=experience_section+`<li>${responsibilities[responsibility_i]}</li>`;
                }
                experience_section=experience_section+`</ul>`;
            }
            experience_section=experience_section+`</div>`;
        }
        experience_section=experience_section+`</div>`;
    }

    if(education_flag_status){
        education_section=education_section+`<div class="block"><h3>Education</h3>`;
        for(var education_i=0; education_i<education.length; education_i++){
            education_section=education_section+`
                <div class="subblock">
                    <h4>${education[education_i].institution}</h4>
                    <p>${education[education_i].qualification} in ${education[education_i].course_name}, ${education[education_i].academic_year}</p>
                </div><!-- ./subblock -->
            `;
        }
        education_section=education_section+`</div>`;
    }

    if(language_flag_status){
        language_section=language_section+`
            <div class="block">
            <h3>Languages</h3>
            <div class="subblock">
                <table class="star-table">
                    <tbody>
        `;
        for(var language_i=0; language_i<language.length; language_i++){
            language_section=language_section+`
                <tr>
                    <td class="label">${language[language_i].language}</td>
                    <td>
            `;
            if(language[language_i].rating_status==1){
                for (var lang_rating_i = 1; lang_rating_i <= 5; lang_rating_i++) {
                    if (lang_rating_i <= language[language_i].rating) {
                        language_section = language_section +`<img src="${appURL}uploads/images/template/Star_gray_18.svg" />`;
                    } else {
                        language_section = language_section +`<img src="${appURL}uploads/images/template/Star_gray_dis_18.svg" />`;
                    }
                }
            }
            
            language_section=language_section+`</td></tr>`;
        }
        language_section=language_section+`</tbody></table></div></div>`;
    }
    
    if(additional_feature_flag_status){
        for(var additional_feature_i=0; additional_feature_i<additional_feature.length; additional_feature_i++){
            if(additional_feature[additional_feature_i].show_status==1 && additional_feature[additional_feature_i].type_description!=''){
                additional_feature_section=additional_feature_section+`
                    <div class="block">
                        <h3>${additional_feature[additional_feature_i].type}</h3>
                        <div class="subblock">
                            ${additional_feature[additional_feature_i].type_description}
                        </div>
                    </div>
                `;
            }
        }
    }

    if(disabled==1){
        if(disability_type!=''){
            disability_section=disability_section+`
                    <div class="block">
                        <h3>Physical Disability</h3>
                        <div class="subblock">
                            ${disability_type}
                        </div>
                    </div>
                `;
        }
    }

    var html=`
        <!doctype html>
        <html lang="en">
        <head>
            <meta charset="utf-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <title>CV Template</title>
            <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;600;700&display=swap" rel="stylesheet">
            <style>
                * {
                    box-sizing: border-box; }
                
                body {
                    font-family: "Roboto", sans-serif;
                    font-weight: 400;
                    color: rgba(0, 0, 0, 0.7);
                    font-size: 9px;
                    line-height: 12px;
                    letter-spacing: normal;
                    zoom: 1.2; }
                
                h1, h2, h3, h4, h5, h6, p {
                    margin: 0; }
                
                h1 {
                    font-size: 16px;
                    font-weight: 700;
                    line-height: 19px;
                    letter-spacing: 0em;
                    text-align: center;
                    color: white;
                    padding-bottom: 3px; }
                
                h2 {
                    font-size: 12px;
                    font-weight: 400;
                    line-height: 14px;
                    letter-spacing: 0.02em;
                    text-align: center;
                    color: rgba(255, 255, 255, 0.7); }
                
                h3 {
                    font-size: 15px;
                    font-weight: 700;
                    line-height: 18px;
                    letter-spacing: 0.02em;
                    color: #313131;
                    padding-bottom: 15px; }
                
                h4 {
                    font-size: 12px;
                    font-weight: 700;
                    line-height: 13px;
                    letter-spacing: 0.02em;
                    text-align: left;
                    color: #313131;
                    padding-bottom: 4px; }
                
                h5 {
                    font-size: 10px;
                    font-weight: 400;
                    line-height: 12px;
                    letter-spacing: 0.01em;
                    text-align: left;
                    color: #000000;
                    padding-bottom: 5px;
                    padding-top: 1px; }
                
                ul {
                    padding-left: 15px;
                    margin: 0; }
                
                p + ul {
                    padding-top: 8px; }
                
                ul + p {
                    padding-top: 8px; }
                
                .wrapper {
                    width: 100%;
                    max-width: 595px;
                    margin: 20px auto;
                    min-height: 842px;
                    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px; }
                    @media print {
                    .wrapper {
                        box-shadow: none;
                        /*added css*/
                        max-width: 100%;
                     } }
                
                table {
                    width: 100%;
                    border-collapse: collapse; }
                    table .left {
                    width: 250px;
                    background: #F6F6F6;
                    color: rgba(49, 49, 49, 0.7); }
                    table .right {
                    padding: 45px 40px 40px 24px; }
                    table.main {
                    min-height: 842px; }
                    table.main td {
                        vertical-align: top; }
                
                .profile {
                    height: 280px;
                    width: 100%;
                    background-image: url(${template_theme_path});
                    background-repeat: no-repeat;
                    background-size: 100%;
                    text-align: center; }
                    .profile .name {
                    padding-top: 45px;
                    height: 110px;
                    max-width: 134px;
                    margin: 0 auto; }
                    .profile img {
                        width: 104px;
                        height: 104px;
                        margin: 0 auto;
                        border-radius: 50%;
                        object-fit: contain;
                    }
                
                .left-box {
                    padding: 10px 20px 40px 50px; }
                
                .subblock {
                    padding-bottom: 12px; }
                    .subblock:last-child {
                    padding-bottom: 0; }
                
                .block {
                    padding-bottom: 30px; }
                    .block:last-child {
                    padding-bottom: 0; }
                
                .star-table .label {
                    width: 45px; }
                
                .stars {
                    padding-top: 2px; }
                
                .star-table td {
                    padding-bottom: 9px; }
                
                /*# sourceMappingURL=style.css.map */
          
            </style>
        </head>
        
        <body>
        
            <div class="wrapper">        
                <table class="main">
                    <tbody>
                        <tr>
                            <td class="left">
                                <div class="profile">
                                    <div class="name">
                                        <h1>${username}</h1>
                                        <h2>${current_position}</h2>
                                    </div>
                                    ${profile_pic_tag}
                                </div><!-- ./profile -->
                                <div class="left-box">
                                    ${contact_section}
                                    ${skill_section}
                                    ${certificate_section}
                                </div><!-- ./left-box -->
                            </td>
                            <td class="right">
                                ${objective_section}
                                ${experience_section}
                                ${education_section}
                                ${language_section}
                                ${additional_feature_section}
                                ${disability_section}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div><!-- ./wrapper -->
        
        </body>
        
        </html>
    `;
    return html;
}

async function template19(color_code, first_name, last_name, username, profile_flag_status, profile_pic, address, email, contact_number, skill_flag_status, skill, certificate_flag_status, certificate, objective_flag_status, objective, experience_flag_status, experience, education_flag_status, education, language_flag_status, language, additional_feature_flag_status, additional_feature,disabled,disability_type){
    var skill_section = '';
    var certificate_section = '';
    var experience_section = '';
    var education_section = '';
    var language_section = '';
    var profile_pic_tag = '';
    var current_position = '';
    var additional_feature_section = '';
    var objective_section = '';
    var contact_section = '';
    var position_section = '';
    var contact_number_section = '';
    var contact_section = '';
    var address_section = '';
    var email_section = '';
    var disability_section='';
    if(profile_flag_status){
        profile_pic_tag=`
            <div class="picture">
                <img src="${profile_pic}" />
            </div>
        `;
    }
    if(contact_number!='' || email!='' || address!=''){
        contact_section=contact_section+`<div class="block"><h3>Details</h3><table class="contact-with-icon"><tbody>`;
        if(contact_number!=''){
            contact_section=contact_section+`
                <tr>
                    <td class="icon">
                        <img src="${appURL}uploads/images/template/Phone_19.svg" />
                    </td>
                    <td style="word-wrap: break-word;white-space: normal;word-break: break-all;">
                        ${contact_number}
                    </td>
                </tr>
            `;
        }
        if(address!=''){
            contact_section=contact_section+`
                <tr>
                    <td class="icon">
                        <img src="${appURL}uploads/images/template/Address_19.svg" />
                    </td>
                    <td style="word-wrap: break-word;white-space: normal;word-break: break-all;">
                        ${address}
                    </td>
                </tr>
            `;
        }
        if(email!=''){
            contact_section=contact_section+`
                <tr>
                    <td class="icon">
                        <img src="${appURL}uploads/images/template/Mail_19.svg" />
                    </td>
                    <td style="word-wrap: break-word;white-space: normal;word-break: break-all;">
                        ${email}
                    </td>
                </tr>
            `;
        }
        contact_section=contact_section+`</tbody></table></div>`;
    }

    if(language_flag_status){
        language_section=language_section+`
            <div class="block">
                <h3>Languages</h3>
                <table class="progress">
                    <tbody>
        `;
        for(var language_i=0; language_i<language.length; language_i++){
            language_section=language_section+`
                <tr>
                    <td class="progress-label">${language[language_i].language}</td>
                    
            `;
            if(language[language_i].rating_status==1){
                language_section=language_section+`
                    <td class="progress-bar">
                            <div class="bar">
                                <div class="bar-fill" style="width: ${language[language_i].rating*20}%;"></div>
                            </div>
                        </td>
                    `;
            }
            language_section=language_section+`</tr>`;
        }
        language_section=language_section+`</tbody></table></div>`;
    }

    if(certificate_flag_status){
        certificate_section=certificate_section+`
            <div class="block">
            <h3>Certifications</h3>
            <ul class="list">`;
        for(var certificate_i=0; certificate_i<certificate.length; certificate_i++){
            certificate_section=certificate_section+`<li>${certificate[certificate_i].document_type}</li>`;
        }
        certificate_section=certificate_section+`</ul></div>`;
    }

    if(objective_flag_status){
        objective_section=objective_section+`
            <div class="block">
                <h3>Objective</h3>
                <p>${objective}</p>
            </div>
        `;
    }

    if(education_flag_status){
        education_section=education_section+`
            <div class="block">
                <h3>Education</h3>
        `;
        for(var education_i=0; education_i<education.length; education_i++){
            education_section=education_section+`
                <div class="subblock">
                    <h5 style="max-width: 260px;word-wrap: break-word;">${education[education_i].institution}</h5>
                    <p>${education[education_i].qualification} in ${education[education_i].course_name}</p>
                    <div class="year">${education[education_i].academic_year}</div>
                </div>
            `;
        }
        education_section=education_section+`</div>`;
    }

    if(experience_flag_status){
        experience_section=experience_section+`<div class="block"><h3>Experience</h3>`;
        for(var experience_i=0; experience_i<experience.length; experience_i++){
            var start_date = experience[experience_i].start_date ? experience[experience_i].start_date : '';
            var end_date = experience[experience_i].end_date ? experience[experience_i].end_date : '';
            var date_status = false;
            if (start_date != '0000-00-00' && start_date != '') {
                date_status = true;
                start_date = await utils.change_data_format(start_date);
            }
            if (date_status) {
                if (end_date != '0000-00-00' && end_date != '') {
                    end_date = await utils.change_data_format(end_date);
                    var sorted_experience=await utils.sortExperienceByDate(experience,'asc');
                    if(sorted_experience.length>0){
                        current_position=sorted_experience[sorted_experience.length-1].position;
                    }
                } else {
                    end_date = 'Present';
                    current_position = experience[experience_i].position;
                }
            }
            experience_section = experience_section + `
                <div class="subblock">
                    <h5 style="max-width: 260px;word-wrap: break-word;">${experience[experience_i].position} at ${experience[experience_i].company_name}</h5>
                    <div class="year">${start_date} - ${end_date}</div>
            `;
            var responsibilities = experience[experience_i].responsilbilities ? experience[experience_i].responsilbilities.split(';') : '';
            if(responsibilities.length>0){
                experience_section=experience_section+`<ul>`;
                for(var responsibility_i=0; responsibility_i<responsibilities.length; responsibility_i++){
                    experience_section=experience_section+`<li>${responsibilities[responsibility_i]}</li>`;
                }
                experience_section=experience_section+`</ul>`;
            }
            experience_section=experience_section+`</div>`;
        }
        experience_section=experience_section+`</div>`;
    }
    
    if(skill_flag_status){
        skill_section=skill_section+`<div class="block"><h3>Professional Skills</h3><ul class="col-2">`;
        for(var skill_i=0; skill_i<skill.length; skill_i++){
            skill_section=skill_section+`<li>${skill[skill_i].skill}</li>`
        }
        skill_section=skill_section+`</ul></div>`;
    }

    if(additional_feature_flag_status){
        for(var additional_feature_i=0; additional_feature_i<additional_feature.length; additional_feature_i++){
            if(additional_feature[additional_feature_i].show_status==1 && additional_feature[additional_feature_i].type_description!=''){
                additional_feature_section=additional_feature_section+`
                    <div class="block">
                            <h3>${additional_feature[additional_feature_i].type}</h3>
                            <div class="subblock">
                                <p>${additional_feature[additional_feature_i].type_description}</p>
                            </div>
                        </div>
                `;
            }
        }
    }

    if(disabled==1){
        if(disability_type!=''){
            disability_section=disability_section+`
                        <div class="block">
                            <h3>Physical Disability</h3>
                            <div class="subblock">
                                <p>${disability_type}</p>
                            </div>
                        </div>
                `;
        }
    }

    var html=`
        <!doctype html>
        <html lang="en">
        <head>
            <meta charset="utf-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <title>CV Template</title>
            <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;600;700&display=swap" rel="stylesheet">
            <style>
                * {
                    box-sizing: border-box; }
                
                body {
                    font-family: "Roboto", sans-serif;
                    font-weight: 400;
                    color: #212121;
                    font-size: 11px;
                    line-height: 17px;
                    letter-spacing: -0.2px;
                    zoom: 1.2;
                    margin: 0; }
                
                h1, h2, h3, h4, h5, h6, p {
                    margin: 0; }
                
                h1, h2 {
                    text-align: center; }
                
                h1 {
                    font-size: 24px;
                    font-weight: 700;
                    line-height: 25px;
                    letter-spacing: -0.3px;
                    margin-bottom: 72px; }
                
                h2 {
                    font-size: 13px;
                    font-weight: 700;
                    line-height: 15px;
                    letter-spacing: -0.3px;
                    background-image: url(${appURL}uploads/images/template/Line_19.svg);
                    background-repeat: repeat-x;
                    background-position: center;
                    margin-bottom: 7px; }
                    h2 span {
                    background-color: white;
                    padding-left: 23px;
                    padding-right: 23px; }
                
                h3 {
                    font-size: 13px;
                    font-weight: 700;
                    line-height: 15px;
                    letter-spacing: -0.3px;
                    border: 1px solid currentColor;
                    text-align: center;
                    padding: 9px;
                    margin-bottom: 20px; }
                
                h4 {
                    font-size: 13px;
                    font-weight: 700;
                    line-height: 15px;
                    letter-spacing: -0.3px;
                    padding-bottom: 2px; }
                
                h5 {
                    font-size: 11px;
                    font-weight: 600;
                    line-height: 18px;
                    letter-spacing: 0px;
                    text-align: left;
                    padding-bottom: 3px; }
                
                p {
                    opacity: .7; }
                
                ul.col-2 {
                    column-count: 2;
                    padding-left: 16px;
                    line-height: 19px; }
                ul.list{
                    padding-left: 16px;
                    line-height: 19px;
                }
                
                .wrapper {
                    width: 100%;
                    max-width: 595px;
                    /*margin: 20px auto;*/
                    margin: 0px auto;
                    min-height: 842px;
                    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
                    padding: 40px; }
                    @media print {
                    .wrapper {
                        box-shadow: none;
                        /*added css*/
                        max-width: 100%;
                        /*margin: 20px auto 20px auto;*/
                        }
                        }
                
                table {
                    width: 100%;
                    border-collapse: collapse; }
                    table .icon {
                    vertical-align: middle;
                    width: 18px;
                    text-align: center; }
                    table .icon img {
                        display: block;
                        width: 14px;
                        height: 14px;
                        object-fit: contain; }
                    table.contact-with-icon td {
                    padding-bottom: 10px;
                    font-size: 11px;
                    font-weight: 600;
                    line-height: 18px;
                    letter-spacing: 0px; }
                    table.main td {
                    vertical-align: top; }
                    table .left {
                    width: 160px; }
                    table .right {
                    padding-left: 42px; }
                    table .progress-label {
                    width: 72px; }
                    table.progress td {
                    vertical-align: middle;
                    padding-bottom: 8px; }
                    table .icon-arrow {
                    width: 8px; }
                    table .icon-arrow img {
                        width: 100%; }
                    table .icon-arrow + td {
                        padding-left: 8px; }
                    table.arrow-table td {
                    padding-bottom: 12px; }
                
                .subblock {
                    padding-bottom: 12px;
                    position: relative; }
                    .subblock:last-child {
                    padding-bottom: 0; }
                
                .block {
                    padding-bottom: 40px; }
                    .block:last-child {
                    padding-bottom: 0; }
                
                .bar {
                    background: rgba(33, 33, 33, 0.15);
                    height: 10px;
                    width: 100%; }
                    .bar .bar-fill {
                    height: 100%;
                    background: #212121; }
                
                .picture {
                    text-align: center;
                    padding-bottom: 22px; }
                    .picture img {
                    width: 100px;
                    height: 100px;
                    object-fit: contain;
                    border-radius: 50%; }
                
                .year {
                    position: absolute;
                    top: -1px;
                    right: 0;
                    opacity: .4; }
                
                /*# sourceMappingURL=style.css.map */
          
            </style>
        </head>
        
        <body>
        
            <div class="wrapper">        
                <table class="main">
                    <tbody>
                        <tr>
                            <td class="left" style="max-width: 200px;">
                                ${profile_pic_tag}
                                <h2>
                                    <span>${first_name}</span>
                                </h2>
                                <h1>${last_name}</h1>
                                ${contact_section}
                                ${language_section}
                                ${certificate_section}
                                <!-- ./block -->                    
                            </td>
                            <td class="right">
                                ${objective_section}
                                ${education_section}
                                ${experience_section}
                                ${skill_section}
                                ${additional_feature_section}
                                ${disability_section}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div><!-- ./wrapper -->
        
        </body>
        
        </html>
    `;
    return html;
}

async function template20(color_code, first_name, last_name, username, profile_flag_status, profile_pic, address, email, contact_number, skill_flag_status, skill, certificate_flag_status, certificate, objective_flag_status, objective, experience_flag_status, experience, education_flag_status, education, language_flag_status, language, additional_feature_flag_status, additional_feature,disabled,disability_type){
    var skill_section = '';
    var certificate_section = '';
    var experience_section = '';
    var education_section = '';
    var language_section = '';
    var profile_pic_tag = '';
    var current_position = '';
    var additional_feature_section = '';
    var objective_section = '';
    var contact_section = '';
    var position_section = '';
    var contact_number_section = '';
    var contact_section = '';
    var address_section = '';
    var email_section = '';
    var disability_section='';
    
    if(color_code==''){
        color_code='#6F3F3F';
    }

    if(contact_number!='' || email!='' || address!=''){
        contact_section=contact_section+`<tr><td class="left"><h3>Contacts</h3></td><td class="right"><table class="contact-with-icon"><tbody>`;
        if(email!=''){
            contact_section=contact_section+`
                <tr>
                    <td class="icon">
                        <img src="${appURL}uploads/images/template/Mail_20.svg"  style="position: relative; top: 2px;"/>
                    </td>
                    <td>
                        <div style="max-width: 595px;word-wrap:break-word;white-space: normal;word-break: break-all;">${email}</div>
                    </td>
                </tr>
            `;
        }
        if(address!=''){
            contact_section=contact_section+`
                <tr>
                    <td class="icon">
                        <img src="${appURL}uploads/images/template/Address_20.svg" style="position: relative; top: 2px;"/>
                    </td>
                    <td>
                        <div style="max-width: 595px;word-wrap:break-word;white-space: normal;word-break: break-all;">${address}</div>
                    </td>
                </tr>
            `;
        }
        if(contact_number!=''){
            contact_section=contact_section+`
                <tr>
                    <td class="icon">
                        <img src="${appURL}uploads/images/template/Phone_20.svg"  style="position: relative; top: 2px;"/>
                    </td>
                    <td>
                        <div style="max-width: 595px;word-wrap:break-word;white-space: normal;word-break: break-all;">${contact_number}</div>
                    </td>
                </tr>
            `;
        } 
        contact_section=contact_section+`</tbody></table></td></tr>`;
    }

    if(objective_flag_status){
        objective_section=`<tr>
                            <td class="left">
                                <h3>Profile</h3>
                            </td>
                            <td class="right">
                                ${objective}
                            </td>
                        </tr>`;
    }

    if(education_flag_status){
        education_section=education_section+`<tr><td class="left sub"><h3>Education</h3>
                            </td>`;
        var highest_education='';
        var education_tag='';
        for(var education_i=0; education_i<education.length; education_i++){
            if(education_i==0){
                highest_education=education[education_i].qualification;
            }
            education_tag=education_tag+`
                <tr>
                    <td class="left">
                        <h5>${education[education_i].academic_year}</h5>
                    </td>
                    <td class="right">
                        <h4>${education[education_i].institution}</h4>
                        <div>${education[education_i].qualification} in ${education[education_i].course_name}, GPA: ${education[education_i].cgpa}</div>
                    </td>
                </tr
            `;
        }
        education_section=education_section+`<td class="right sub">High degree in ${highest_education}</td>`+education_tag;
    }

    if(experience_flag_status){
        experience_section=experience_section+`<tr><td class="left sub"><h3>Employment</h3></td>`;
        //arrange array data based on start_date
        var sorted_experience=await utils.sortExperienceByDate(experience,'asc');
        //console.log(sorted_experience)
        var get_start_date='';
        var get_end_date='';
        for(var exp_i=0; exp_i<sorted_experience.length; exp_i++){
            var exp_start_date = sorted_experience[exp_i].start_date ? sorted_experience[exp_i].start_date : '';
            var exp_end_date = sorted_experience[exp_i].end_date ? sorted_experience[exp_i].end_date : '';
            if(exp_i==0){
                if (exp_start_date != '0000-00-00' && exp_start_date != '') {
                    get_start_date=sorted_experience[exp_i].start_date;
                }
            }
            if(exp_i==sorted_experience.length-1){
                if(exp_end_date!='0000-00-00' && exp_end_date!=''){
                    get_end_date=sorted_experience[exp_i].end_date;
                }else{
                    var current_date=new Date();
                    var two_digit_month=(current_date.getMonth()+1).toString().padStart(2,'0');
                    console.log(current_date.getMonth())
                    get_end_date=current_date.getFullYear()+'-'+two_digit_month+'-'+current_date.getDate();
                }
                console.log(get_end_date)
            }
        }
        //console.log(get_start_date,get_end_date);

        if(get_start_date!='' && get_end_date!=''){
            var formated_start_date = '';
            var formated_end_date = '';
            var formated_date = '';
            const date1 = new Date(get_start_date);
            const date2 = new Date(get_end_date);
            const diffYears = date2.getFullYear() - date1.getFullYear();
            const diffMonths = date2.getMonth() - date1.getMonth();
            const diffDays = date2.getDate() - date1.getDate();
            console.log(`${diffYears} year  ${diffMonths} month`);
            let years = diffYears;
            let months = diffMonths;
            let days = diffDays;
            if (days < 0) {
                months -= 1;
                days += new Date(date2.getFullYear(), date2.getMonth(), 0).getDate();
            }
            if (months < 0) {
                years -= 1;
                months += 12;
            }
            console.log(years,months,days)
            var txt_years=years<=1 ? await utils.convertNumberToWords(years)+' year' : await utils.convertNumberToWords(years)+' years';
            var txt_months=months<=1 ? await utils.convertNumberToWords(months)+' month' : await utils.convertNumberToWords(months)+' months';
            console.log(txt_years,txt_months);
            if (years != 0 && months != 0) {
                formated_date = txt_years + ' and ' + txt_months;
            } else if (years == 0 && months == 0) {
                formated_date = txt_months;
            } else if (months == 0) {
                formated_date = txt_years;
            } else if (years == 0) {
                formated_date = txt_months;
            }
            experience_section=experience_section+`<td class="right sub">${formated_date} of work experience</td>`
        }else{
            experience_section=experience_section+`<td></td></tr>`;
        }
        
        for(var experience_i=0; experience_i<experience.length; experience_i++){
            var start_date = experience[experience_i].start_date ? experience[experience_i].start_date : '';
            var end_date = experience[experience_i].end_date ? experience[experience_i].end_date : '';
            var date_status = false;
            if (start_date != '0000-00-00' && start_date != '') {
                date_status = true;
                start_date = await utils.change_data_format(start_date);
            }
            if (date_status) {
                if (end_date != '0000-00-00' && end_date != '') {
                    end_date = await utils.change_data_format(end_date);
                    var sorted_experience=await utils.sortExperienceByDate(experience,'asc');
                    if(sorted_experience.length>0){
                        current_position=sorted_experience[sorted_experience.length-1].position;
                    }
                } else {
                    end_date = 'Present';
                    current_position = experience[experience_i].position;
                }
            }
            experience_section = experience_section + `<tr>
                            <td class="left sub">
                                <h5>${start_date} — ${end_date}</h5>
                            </td>
                            <td class="right sub">
                                <h4>${experience[experience_i].position} at ${experience[experience_i].company_name}</h4>`;
            var responsibilities = experience[experience_i].responsilbilities ? experience[experience_i].responsilbilities.split(';') : '';
            if(responsibilities.length>0){
                experience_section=experience_section+`<div><ul>`;
                for(var responsibility_i=0; responsibility_i<responsibilities.length; responsibility_i++){
                    experience_section=experience_section+`<li>${responsibilities[responsibility_i]}</li>`;
                }
                experience_section=experience_section+`</ul></div>`;
            }
            experience_section=experience_section+`</td></tr>`;
        }
    }

    if(certificate_flag_status){
        certificate_section=certificate_section+`
            <tr>
                <td class="left">
                    <h3>Certifications</h3>
                </td>
                <td class="right">
        `;
        for(var certificate_i=0; certificate_i<certificate.length; certificate_i++){
            certificate_section=certificate_section+`<h4>${certificate[certificate_i].document_type}</h4>`;
        }
        certificate_section=certificate_section+`</td></tr>`;
    }

    if(skill_flag_status){
        skill_section=skill_section+`<tr><td class="left"><h3>Skills</h3></td><td class="right"><table class="star-table"><tbody>`;
        var i=1;
        for(var skill_i=0; skill_i<skill.length; skill_i+=2){
            skill_section=skill_section+`<tr>`;
            skill_section=skill_section+`<td class="label">${skill[skill_i].skill}</td>`;
            skill_section=skill_section+`<td>`;
                if(skill[skill_i].rating_status==1){
                    for(var rating_i=1; rating_i<=5; rating_i++){
                        if(rating_i<=skill[skill_i].rating){
                            skill_section=skill_section+`<img src="${appURL}uploads/images/template/Star_20.svg" />`;
                        }else{
                            skill_section=skill_section+`<img src="${appURL}uploads/images/template/Star_dis_20.svg" />`;
                        }
                            
                    }
                }
                skill_section=skill_section+`</td>`;
            if(skill_i+1<skill.length){
                skill_section=skill_section+`<td class="label">${skill[skill_i+1].skill}</td><td>`;
                if(skill[skill_i+1].rating_status==1){
                    for(var rating_i=1; rating_i<=5; rating_i++){
                        if(rating_i<=skill[skill_i+1].rating){
                            skill_section=skill_section+`<img src="${appURL}uploads/images/template/Star_20.svg" />`;
                        }else{
                            skill_section=skill_section+`<img src="${appURL}uploads/images/template/Star_dis_20.svg" />`;
                        }
                            
                    }
                }
                skill_section=skill_section+`</td>`;
            }else{
                skill_section=skill_section+`<td></td><td></td>`;
            }
            skill_section=skill_section+`</tr>`;
        }
        skill_section=skill_section+`</tbody></table></td></tr>`;
    }

    if(language_flag_status){
        language_section=language_section+`<tr><td class="left"><h3>Languages</h3></td><td class="right"><table class="star-table"><tbody>`;
        for(var language_i=0; language_i<language.length; language_i+=2){
            language_section=language_section+`<tr>`;
            language_section=language_section+`<td class="label">${language[language_i].language}</td>`
            language_section=language_section+`<td>`;
            if(language[language_i].rating_status==1){
                for(var lang_rating_i=1; lang_rating_i<=5; lang_rating_i++){
                    if(lang_rating_i<=language[language_i].rating){
                        language_section=language_section+`<img src="${appURL}uploads/images/template/Star_20.svg" />`;
                    }else{
                        language_section=language_section+`<img src="${appURL}uploads/images/template/Star_dis_20.svg" />`;
                    }
                }
            }
            language_section=language_section+`</td>`;
            
            if(language_i+1<language.length){
                language_section=language_section+`<td class="label">${language[language_i+1].language}</td>`;
                language_section=language_section+`<td>`;
                if(language[language_i+1].rating_status==1){
                    for(var lang_rating_i=1; lang_rating_i<=5; lang_rating_i++){
                        if(lang_rating_i<=language[language_i+1].rating){
                            language_section=language_section+`<img src="${appURL}uploads/images/template/Star_20.svg" />`;
                        }else{
                            language_section=language_section+`<img src="${appURL}uploads/images/template/Star_dis_20.svg" />`;
                        }
                    }
                }
            }else{
                language_section=language_section+`<td></td><td></td>`;
            }
            language_section=language_section+`</tr>`;
        }
        language_section=language_section+`</tbody></table></td></tr>`;
    }

    if(additional_feature_flag_status){
        for(var additional_feature_i=0; additional_feature_i<additional_feature.length; additional_feature_i++){
            if(additional_feature[additional_feature_i].show_status==1 && additional_feature[additional_feature_i].type_description!=''){
                additional_feature_section=additional_feature_section+`<tr>
                    <td class="left">
                        <h3>${additional_feature[additional_feature_i].type}</h3>
                    </td>
                    <td class="right"><div>${additional_feature[additional_feature_i].type_description}</div></td></tr>`;
            }
        }
    }

    if(disabled==1){
        if(disability_type!=''){
            disability_section=disability_section+`
                            <tr>
                    <td class="left">
                        <h3>Physical Disability</h3>
                    </td>
                    <td class="right"><div>${disability_type}</div></td></tr>
                `;
        }
    }
    
    var html=`
        <!doctype html>
        <html lang="en">
        <head>
            <meta charset="utf-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <title>CV Template</title>
            <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;600;700&display=swap" rel="stylesheet">
            <style>
                * {
                    box-sizing: border-box; }

                    body {
                    font-family: "Roboto", sans-serif;
                    font-weight: 400;
                    color: rgba(33, 33, 33, 0.6);
                    font-size: 11px;
                    line-height: 18px;
                    letter-spacing: -0.2px;
                    zoom: 1.2; }

                    h1, h2, h3, h4, h5, h6, p {
                    margin: 0; }

                    h1 {
                    font-size: 24px;
                    font-weight: 600;
                    line-height: 25px;
                    letter-spacing: -0.2px; }

                    h2 {
                    font-size: 10px;
                    font-weight: 400;
                    line-height: 19px;
                    letter-spacing: 0.81px;
                    padding-bottom: 5px; }

                    h3 {
                    font-size: 13px;
                    font-weight: 600;
                    line-height: 15px;
                    letter-spacing: -0.2px;
                    text-align: left;
                    color: white; }

                    h4 {
                    font-size: 12px;
                    font-weight: 500;
                    line-height: 18px;
                    letter-spacing: -0.3px;
                    color: #212121;
                    padding-bottom: 5px; }

                    h5 {
                    font-size: 10px;
                    font-weight: 400;
                    line-height: 18px;
                    letter-spacing: 0px;
                    text-align: left;
                    color: rgba(255, 255, 255, 0.7); }

                    .wrapper {
                    width: 100%;
                    max-width: 595px;
                    margin: 20px auto;
                    min-height: 842px;
                    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
                    position: relative; }
                    @media print {
                        .wrapper {
                        box-shadow: none;
                        max-width: 100%; } }

                    table {
                    width: 100%;
                    border-collapse: collapse;
                    position: relative;
                    z-index: 2; }
                    table .left {
                        padding: 0 10px 24px 34px;
                        background-color: ${color_code};
                        width: 170px; }
                        table .left.first {
                        padding-top: 35px;
                        padding-bottom: 13px; }
                        table .left.sub {
                        padding-bottom: 12px; }
                    table .right {
                        padding: 0 24px 24px; }
                        table .right.first {
                        padding-top: 35px;
                        padding-bottom: 13px; }
                        table .right.sub {
                        padding-bottom: 12px; }
                    table.main td {
                        vertical-align: top; }

                    .star-table .label {
                    width: 110px;
                    font-size: 12px;
                    font-weight: 500;
                    line-height: 18px;
                    letter-spacing: -0.3px;
                    text-align: left;
                    color: #212121; }
                    .star-table td {
                    padding-bottom: 7px; }

                    .left-bg {
                    width: 170px;
                    height: 100%;
                    background-color: ${color_code};
                    position: absolute;
                    top: 0;
                    left: 0;
                    z-index: 1; }

                    .icon {
                    vertical-align: middle;
                    width: 18px;
                    text-align: center;
                    padding-bottom: 6px; }
                    .icon img {
                        display: block;
                        width: 14px;
                        height: 14px;
                        object-fit: contain;
                        opacity: .2; }
                    .icon + td {
                        padding-bottom: 6px; }

                    /*# sourceMappingURL=style.css.map */

            </style>
        </head>

        <body>

            <div class="wrapper">        
                <table class="main">
                    <tbody>
                        <tr>
                            <td class="left first"></td>
                            <td class="right first">
                                <h2>${current_position}</h2>
                                <h1>${username}</h1>
                            </td>
                        </tr>
                        ${contact_section}
                        ${objective_section}
                        ${education_section}
                        ${experience_section}
                        ${certificate_section}
                        ${skill_section}
                        ${language_section}
                        ${additional_feature_section}
                        ${disability_section}
                    </tbody>
                </table>
                <div class="left-bg">

                </div>
            </div><!-- ./wrapper -->

        </body>

        </html>
    `;
    return html;
}

async function convertHtmlToImage(file_name, html_code) {
    console.log(file_name)
    // await nodeHtmlToImage({
    //     output: file_name,
    //     html: html_code
    //   })
    //     .then(() => {
    //         console.log('The image was created successfully!')
    //         return file_name+'_succes'
    // })

    return new Promise(async (resolve, reject) => {
        try {
            await nodeHtmlToImage({
                output: file_name,
                html: html_code
            });

            console.log('The image was created successfully!');
            resolve(true);
        } catch (error) {
            // Handle errors, if any
            console.error('Error creating image:', error);
            reject(error);
        }
    });
}

async function convertHtmlToPdf(file_name, template) {
    const htmlPDF = new PuppeteerHTMLPDF();
    const options = {
        format: 'A4',
        width: '219mm',
        height: '297mm',
        margin: {
            left: '25px',
            right: '25px',
            top: '40px',
            bottom: '40px'
        },
        path: file_name, // you can pass path to save the file
        timeout: 60000,
        args: ['--no-sandbox', '--disable-setuid-sandbox'], // Add these flags to avoid potential sandbox issues
        dumpio: true
    }

    const options1 = {
        format: 'A4',
        width: '0mm',
        height: '0mm',
        margin: {
            left: '0px',
            right: '0px',
            top: '0px',
            bottom: '0px'
        }
    }

    htmlPDF.setOptions(options);
    try {
        await htmlPDF.create(template);
        console.log('success')
        return true;
    } catch (error) {
        console.error('PuppeteerHTMLPDF error', error);
        return false;
    }
}

async function convertPdfToImage(user_id, file_path) {

    var images = [];
    //width: '594px', height: '841px'
    //var outputImages = pdf2img.convert('./' + file_path);
    var outputImages = pdf2img.convert('./' + file_path,{scale:3});
    console.log('output', outputImages)
    await outputImages.then(async function (outputImages) {
        console.log(outputImages)
        for (i = 0; i < outputImages.length; i++) {
            var code = await utils.getRandomUniqueFiveDigitCode();
            var file_name = "uploads/IMG_" + user_id + i + code + ".png";
            await fs.writeFile(file_name, outputImages[i]);
            images.push(file_name);
        }
    });
    console.log(images)
    return images;
}

async function savePdfAndDownload(req, res) {
    try {
        var body = req.body;
        var current_datetime = utils.current_datetime();
        //console.log('body',body, typeof(body), Object.keys(body).length)
        if (typeof (body) == 'object' && Object.keys(body).length > 0) {
            var user_id = body.user_id ? body.user_id : '';
            var access_token = body.access_token ? body.access_token : '';
            var profile_pic = body.profile_pic ? body.profile_pic : '';
            var first_name = body.first_name ? body.first_name : '';
            var last_name = body.last_name ? body.last_name : '';
            var address = body.address ? body.address : '';
            var username = first_name + ' ' + last_name;
            var email = body.email ? body.email : '';
            var skill = body.skills ? body.skills : [];
            var certificate = body.certificate ? body.certificate : [];
            var objective = body.objective ? body.objective : '';
            var experience = body.experience ? body.experience : [];
            var education = body.education ? body.education : [];
            var language = body.language ? body.language : [];
            var additional_feature = body.additional_feature ? body.additional_feature : [];
            var disabled=body.disabled ? body.disabled : 0;
            var disability_type=body.disability_type ? body.disability_type : '';
            //var other_contact = body.other_contact ? body.other_contact : '';
            var other_contact = body.phone ? body.phone : '';
            var profile_flag_status = false;
            var skill_flag_status = false;
            var certificate_flag_status = false;
            var experience_flag_status = false;
            var education_flag_status = false;
            var language_flag_status = false;
            var additional_feature_flag_status = false;
            var objective_flag_status = false;
            var template_id = body.template_id ? body.template_id : '';
            var color_code = body.color_code ? body.color_code : '';
            var id = body.id ? body.id : '';
            var file_name = body.file_name ? body.file_name + '.pdf' : '';
            if (file_name != '') {
                if (profile_pic != '') {
                    profile_pic = baseURLProfilePic + profile_pic;
                    profile_flag_status = true;
                }
                if (skill.length > 0) {
                    skill_flag_status = true;
                }
                if (certificate.length > 0) {
                    certificate_flag_status = true;
                }
                if (experience.length > 0) {
                    experience_flag_status = true;
                }
                if (education.length > 0) {
                    education_flag_status = true;
                }
                if (language.length > 0) {
                    language_flag_status = true;
                }
                if (additional_feature.length > 0) {
                    additional_feature_flag_status = true;
                }
                if (objective != '') {
                    objective_flag_status = true;
                }
                if (template_id != '') {
                    var check_user_data = await queries.checkUserData(user_id, access_token)
                    if (check_user_data.length > 0) {
                        console.log(typeof template_id)
                        let html_code = '';
                        let template_available_flag = false;
                        if (template_id == 1) {
                            html_code = await template1(color_code, username, profile_flag_status, profile_pic, address, email, other_contact, skill_flag_status, skill, certificate_flag_status, certificate, objective_flag_status, objective, experience_flag_status, experience, education_flag_status, education, language_flag_status, language, additional_feature_flag_status, additional_feature,disabled,disability_type);
                            template_available_flag = true;
                        } else if (template_id == 2) {
                            html_code = await template2(color_code, username, profile_flag_status, profile_pic, address, email, other_contact, skill_flag_status, skill, certificate_flag_status, certificate, objective_flag_status, objective, experience_flag_status, experience, education_flag_status, education, language_flag_status, language, additional_feature_flag_status, additional_feature,disabled,disability_type);
                            template_available_flag = true;
                        } else if (template_id == 3) {
                            html_code = await template3(color_code, username, profile_flag_status, profile_pic, address, email, other_contact, skill_flag_status, skill, certificate_flag_status, certificate, objective_flag_status, objective, experience_flag_status, experience, education_flag_status, education, language_flag_status, language, additional_feature_flag_status, additional_feature,disabled,disability_type);
                            template_available_flag = true;
                        } else if (template_id == 4) {
                            html_code = await template4(color_code, username, profile_flag_status, profile_pic, address, email, other_contact, skill_flag_status, skill, certificate_flag_status, certificate, objective_flag_status, objective, experience_flag_status, experience, education_flag_status, education, language_flag_status, language, additional_feature_flag_status, additional_feature,disabled,disability_type);
                            template_available_flag = true;
                        } else if (template_id == 5) {
                            html_code = await template5(color_code, username, profile_flag_status, profile_pic, address, email, other_contact, skill_flag_status, skill, certificate_flag_status, certificate, objective_flag_status, objective, experience_flag_status, experience, education_flag_status, education, language_flag_status, language, additional_feature_flag_status, additional_feature,disabled,disability_type);
                            template_available_flag = true;
                        } else if (template_id == 6) {
                            html_code = await template6(color_code, username, profile_flag_status, profile_pic, address, email, other_contact, skill_flag_status, skill, certificate_flag_status, certificate, objective_flag_status, objective, experience_flag_status, experience, education_flag_status, education, language_flag_status, language, additional_feature_flag_status, additional_feature,disabled,disability_type);
                            template_available_flag = true;
                        } else if (template_id == 7) {
                            html_code = await template7(color_code, username, profile_flag_status, profile_pic, address, email, other_contact, skill_flag_status, skill, certificate_flag_status, certificate, objective_flag_status, objective, experience_flag_status, experience, education_flag_status, education, language_flag_status, language, additional_feature_flag_status, additional_feature,disabled,disability_type);
                            template_available_flag = true;
                        } else if (template_id == 8) {
                            html_code = await template8(color_code, username, profile_flag_status, profile_pic, address, email, other_contact, skill_flag_status, skill, certificate_flag_status, certificate, objective_flag_status, objective, experience_flag_status, experience, education_flag_status, education, language_flag_status, language, additional_feature_flag_status, additional_feature,disabled,disability_type);
                            template_available_flag = true;
                        } else if (template_id == 9) {
                            html_code = await template9(color_code, username, profile_flag_status, profile_pic, address, email, other_contact, skill_flag_status, skill, certificate_flag_status, certificate, objective_flag_status, objective, experience_flag_status, experience, education_flag_status, education, language_flag_status, language, additional_feature_flag_status, additional_feature,disabled,disability_type);
                            template_available_flag = true;
                        } else if (template_id == 10) {
                            html_code = await template10(color_code, username, profile_flag_status, profile_pic, address, email, other_contact, skill_flag_status, skill, certificate_flag_status, certificate, objective_flag_status, objective, experience_flag_status, experience, education_flag_status, education, language_flag_status, language, additional_feature_flag_status, additional_feature,disabled,disability_type);
                            template_available_flag = true;
                        } else if (template_id == 11) {
                            html_code = await template11(color_code, username, profile_flag_status, profile_pic, address, email, other_contact, skill_flag_status, skill, certificate_flag_status, certificate, objective_flag_status, objective, experience_flag_status, experience, education_flag_status, education, language_flag_status, language, additional_feature_flag_status, additional_feature,disabled,disability_type);
                            template_available_flag = true;
                        } else if (template_id == 12) {
                            html_code = await template12(color_code, username, profile_flag_status, profile_pic, address, email, other_contact, skill_flag_status, skill, certificate_flag_status, certificate, objective_flag_status, objective, experience_flag_status, experience, education_flag_status, education, language_flag_status, language, additional_feature_flag_status, additional_feature,disabled,disability_type);
                            template_available_flag = true;
                        } else if (template_id == 13) {
                            html_code = await template13(color_code, username, profile_flag_status, profile_pic, address, email, other_contact, skill_flag_status, skill, certificate_flag_status, certificate, objective_flag_status, objective, experience_flag_status, experience, education_flag_status, education, language_flag_status, language, additional_feature_flag_status, additional_feature,disabled,disability_type);
                            template_available_flag = true;
                        } else if (template_id == 14) {
                            html_code = await template14(color_code, first_name, last_name, username, profile_flag_status, profile_pic, address, email, other_contact, skill_flag_status, skill, certificate_flag_status, certificate, objective_flag_status, objective, experience_flag_status, experience, education_flag_status, education, language_flag_status, language, additional_feature_flag_status, additional_feature,disabled,disability_type);
                            template_available_flag = true;
                        } else if (template_id == 15) {
                            html_code = await template15(color_code, first_name, last_name, username, profile_flag_status, profile_pic, address, email, other_contact, skill_flag_status, skill, certificate_flag_status, certificate, objective_flag_status, objective, experience_flag_status, experience, education_flag_status, education, language_flag_status, language, additional_feature_flag_status, additional_feature,disabled,disability_type);
                            template_available_flag = true;
                        } else if (template_id == 16) {
                            html_code = await template16(color_code, first_name, last_name, username, profile_flag_status, profile_pic, address, email, other_contact, skill_flag_status, skill, certificate_flag_status, certificate, objective_flag_status, objective, experience_flag_status, experience, education_flag_status, education, language_flag_status, language, additional_feature_flag_status, additional_feature,disabled,disability_type);
                            template_available_flag = true;
                        } else if (template_id == 17) {
                            html_code = await template17(color_code, first_name, last_name, username, profile_flag_status, profile_pic, address, email, other_contact, skill_flag_status, skill, certificate_flag_status, certificate, objective_flag_status, objective, experience_flag_status, experience, education_flag_status, education, language_flag_status, language, additional_feature_flag_status, additional_feature,disabled,disability_type);
                            template_available_flag = true;
                        } else if (template_id == 18) {
                            html_code = await template18(color_code, first_name, last_name, username, profile_flag_status, profile_pic, address, email, other_contact, skill_flag_status, skill, certificate_flag_status, certificate, objective_flag_status, objective, experience_flag_status, experience, education_flag_status, education, language_flag_status, language, additional_feature_flag_status, additional_feature,disabled,disability_type);
                            template_available_flag = true;
                        } else if (template_id == 19) {
                            html_code = await template19(color_code, first_name, last_name, username, profile_flag_status, profile_pic, address, email, other_contact, skill_flag_status, skill, certificate_flag_status, certificate, objective_flag_status, objective, experience_flag_status, experience, education_flag_status, education, language_flag_status, language, additional_feature_flag_status, additional_feature,disabled,disability_type);
                            template_available_flag = true;
                        } else if (template_id == 20) {
                            html_code = await template20(color_code, first_name, last_name, username, profile_flag_status, profile_pic, address, email, other_contact, skill_flag_status, skill, certificate_flag_status, certificate, objective_flag_status, objective, experience_flag_status, experience, education_flag_status, education, language_flag_status, language, additional_feature_flag_status, additional_feature,disabled,disability_type);
                            template_available_flag = true;
                        }
                        if (template_available_flag) {
                            console.log(html_code);
                            var random_code = await utils.getRandomUniqueFiveDigitCode();
                            var set_file_name = 'doc' + user_id + random_code + '.pdf';
                            var file_path = 'uploads/' + set_file_name;
                            var htmltopdf = await convertHtmlToPdf(file_path, html_code);
                            //console.log(htmltopdf)
                            if (htmltopdf) {
                                var pdftoimage = await convertPdfToImage(user_id, file_path);
                                console.log('pdf to image ', pdftoimage);
                                body=JSON.stringify(body).replace(/'/g, "''");
                                let data_saved_status = false;
                                if (id != '') {
                                    //update to db
                                    var update_data = await queries.updateCvData(id, current_datetime, user_id, file_name, file_path, JSON.stringify(pdftoimage), body);
                                    console.log(update_data);
                                    if (update_data.affectedRows > 0) {
                                        data_saved_status = true;
                                    }
                                } else {
                                    //save to db
                                    var save_data = await queries.saveCvData(current_datetime, user_id, file_name, file_path, JSON.stringify(pdftoimage), body);
                                    console.log(save_data)
                                    if (save_data > 0) {
                                        data_saved_status = true;
                                        //save to user downloaded cv's and update count in default cvs
                                        var saveDownloadedCV = await queries.saveDownloadedCV(current_datetime, user_id, template_id);
                                        var updateDownloadCVCount = await queries.updateDownloadedCVCount(template_id);
                                    }
                                }

                                if (data_saved_status) {
                                    var preview_images = [];
                                    for (var i = 0; i < pdftoimage.length; i++) {
                                        if (pdftoimage[i] != '') {
                                            preview_images.push(appURL + pdftoimage[i]);
                                        }
                                    }
                                    res.json({
                                        status: true,
                                        statuscode: 200,
                                        message: "success",
                                        data: {
                                            file_path: appURL + file_path,
                                            image_path: preview_images
                                        }
                                    });

                                    //delete the preview files
                                    var get_temporary_files = await queries.getTemporaryData(user_id);
                                    console.log(get_temporary_files)
                                    for (var file_i = 0; file_i < get_temporary_files.length; file_i++) {
                                        if (get_temporary_files[file_i] != '') {
                                            try {
                                                let check_file_exist = fileSystem.existsSync(get_temporary_files[file_i]['path'])
                                                if (check_file_exist) {
                                                    await fs.unlink(get_temporary_files[file_i]['path'])
                                                }
                                                //delete user's temporary preview file
                                                let delete_temporary_data = await queries.deleteTemporaryFiles(user_id);
                                                console.log(delete_temporary_data)
                                            } catch (file_delete_error) {
                                                console.log('file delete section error ', file_delete_error);
                                            }
                                        }
                                    }
                                } else {
                                    res.json({
                                        status: false,
                                        statuscode: 400,
                                        message: "Not saved to db",
                                        data: {}
                                    });
                                }
                            } else {
                                res.json({
                                    status: false,
                                    statuscode: 200,
                                    message: 'Unable to generate PDF file',
                                    data: {}
                                });
                            }
                        } else {
                            res.json({
                                status: false,
                                statuscode: 200,
                                message: "Template id doesn't available",
                                data: {}
                            });
                        }
                    } else {
                        res.json({
                            status: false,
                            statuscode: 200,
                            message: 'No user data found',
                            data: {}
                        });
                    }
                } else {
                    res.json({
                        status: false,
                        statuscode: 200,
                        message: 'Please provide template id',
                        data: {}
                    })
                }
            } else {
                res.json({
                    status: false,
                    statuscode: 400,
                    message: "file name is empty",
                    data: {}
                });
            }

        } else {
            res.json({
                status: false,
                statuscode: 400,
                message: 'Input data is missing',
                data: {}
            });
        }
        // let save=await queries.saveCvData(JSON.stringify(req.body));
        // res.json({status:true,data:req.body});
    } catch (e) {
        console.log(`Error occurs in generate pdf and image function ${e}`)
        res.json({
            status: false,
            statuscode: 400,
            message: `Error occurs in generate pdf and image function ${e}`,
            data: {}
        });
    }

}


module.exports = {
    generateImage,
    generatePreviewPdfAndImage,
    convertHtmlToImage,
    convertHtmlToPdf,
    template1,
    template2,
    template3,
    template4,
    template5,
    template6,
    template7,
    template8,
    template9,
    template10,
    template11,
    template12,
    template13,
    template14,
    template15,
    template16,
    template17,
    template18,
    template19,
    template20,
    convertPdfToImage,
    savePdfAndDownload
}