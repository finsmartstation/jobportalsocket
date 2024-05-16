const nodeHtmlToImage = require('node-html-to-image');
const PuppeteerHTMLPDF = require('puppeteer-html-pdf');
const pdf2img = require('pdf-img-convert');
const fs = require('fs').promises;
const fileSystem=require('fs');
const env=require('dotenv').config();
const baseURLProfilePic=process.env.PROFILEPICBASEURL;
const appURL=process.env.APPURL;
const queries=require('../models/queries/queries');
const utils=require('../utils/commonUtils');
async function generateImage(req,res){
    console.log(req.body)
    console.log('hello world')
    var html=`<!doctype html>
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
    var arr=[];
    for(var i=0; i<=3; i++){
        // await convertHtmlToImage('images/a4_'+i+'.png',html).then((result)=>{
        //     console.log('sucess',result)
        //     if(result){
        //         arr.push(i+'.png')
        //     }
            
        // })
        convertHtmlToPdf(i+'.pdf');
        
    }
    console.log(arr)
    res.json({
        status: true,
        messsage: 'success'
    })
}

async function generatePreviewPdfAndImage(req,res){
    //{"user_id":"1","access_token":"1","template_id":"1","color_code":"#596977","file_name":"","first_name":"gokul","last_name":"pandei","dob":"1998","gender":"male","country":"india","state":"maharastra","city":"Bhokardan","pincode":"431114","address":"ran nivas,house num:2089,Bhokardan","email":"gokul.1998@gmail.com","other_contact":"9876543210","profile_pic":"uploads/job_seeker/6/profilepic/FILE_20231122145934.png","disabled":"0","disability_type":"none","objective":"To secure a challenging position in a reputable organization to expand my learnings, knowledge, and skills. I want to succeed in a stimulating and challenging environment that will provide me with advancement opportunities. I want to excel in this field with hard work, perseverance and dedication. I want a highly rewarding career where I can use my skills and knowledge for organizational and personal growth.","education":[{"qualification":"btech","course_name":"Computer science and engineering","institution":"IIT DELHI","country":"india","cgpa":"8.8","academic_year":"2018-2022"}],"experience":[{"position":"software developer","company_name":"carestack","country":"indian","start_date":"2019-04-11","end_date":"2021-04-11","responsilbilities":["Designed safety-focused experiences for Riders and Drivers", "Physical space problem solving and it’s interaction with the digital", "Navigated organization to achieve operational improvements"],"document":"img(1).img"},{"position":"Senior software developer","company_name":"carestack","country":"indian","start_date":"2021-05-11","end_date":"0000-00-00","responsilbilities":["Designed safety-focused experiences for Riders and Drivers", "Physical space problem solving and it’s interaction with the digital", "Navigated organization to achieve operational improvements"],"document":"img(1).img"}],"skill":[{"skill":"Python","rating":"5","rating_status":"1"},{"skill":"Angular","rating":"3","rating_status":"1"},{"skill":"Php","rating":"4","rating_status":"1"}],"certificate":[{"document_type":"google uc design certificate","document_path":"certificate(1).img","year":"2020"},{"document_type":"google uc design data","document_path":"certificate(1).img","year":"2020"}],"language":[{"language":"English","rating":"5","rating_status":"1"},{"language":"Tamil","rating":"4","rating_status":"1"},{"language":"Malayalam","rating":"4","rating_status":"1"}],"additional_feature":[{"type":"Hobbies","type_description":"hjsb","icon":"icon1","show_status":"1","status":"1"},{"type":"Achievement","type_description":"Rank holder in UG","icon":"icon1","show_status":"1","status":"1"}]}
    try{
        //set data to templates
        var body=req.body ? req.body : {}; 
        var response_data=[];
        console.log('body',body, typeof(body), Object.keys(body).length)
        if(typeof(body)=='object' && Object.keys(body).length>0){
            var current_datetime=await utils.current_datetime();
            var user_id=body.user_id ? body.user_id : '';
            var access_token=body.access_token ? body.access_token : '';
            var profile_pic=body.profile_pic ? body.profile_pic : '';
            var first_name=body.first_name ? body.first_name : '';
            var last_name=body.last_name ? body.last_name : '';
            var address=body.address ? body.address : '';
            var username=first_name+' '+last_name;
            var email=body.email ? body.email : '';
            var skill=body.skill ? body.skill : [];
            var certificate=body.certificate ? body.certificate : [];
            var objective=body.objective ? body.objective : '';
            var experience=body.experience ? body.experience : [];
            var education=body.education ? body.education : [];
            var language=body.language ? body.language : [];
            var additional_feature=body.additional_feature ? body.additional_feature : [];
            var other_contact=body.other_contact ? body.other_contact : '';
            var template_id=body.template_id ? body.template_id : '';
            var color_code=body.color_code ? body.color_code : '';
            var profile_flag_status=false;
            var skill_flag_status=false;
            var certificate_flag_status=false;
            var experience_flag_status=false;
            var education_flag_status=false;
            var language_flag_status=false;
            var additional_feature_flag_status=false;
            var objective_flag_status=false;
            console.log(skill)
            if(profile_pic!=''){
                profile_pic=baseURLProfilePic+profile_pic;
                profile_flag_status=true;
            }
            if(skill.length>0){
                skill_flag_status=true;
            }
            if(certificate.length>0){
                certificate_flag_status=true;
            }
            if(experience.length>0){
                experience_flag_status=true;
            }
            if(education.length>0){
                education_flag_status=true;
            }
            if(language.length>0){
                language_flag_status=true;
            }
            if(additional_feature.length>0){
                additional_feature_flag_status=true;
            }
            if(objective!=''){
                objective_flag_status=true;
            }
            if(template_id!=''){
                var check_user_data=await queries.checkUserData(user_id,access_token)
                if(check_user_data.length>0){
                    var contact_number=check_user_data[0].country_code+check_user_data[0].phone;
                    let html_code='';
                    let template_available_flag=false;
                    if(template_id==1){
                        html_code=await template1(color_code,username,profile_flag_status,profile_pic,address,email,other_contact,skill_flag_status,skill,certificate_flag_status,certificate,objective_flag_status,objective,experience_flag_status,experience,education_flag_status,education,language_flag_status,language,additional_feature_flag_status,additional_feature);
                        template_available_flag=true;
                    }else if(template_id==2){
                        html_code=await template2(color_code,username,profile_flag_status,profile_pic,address,email,other_contact,skill_flag_status,skill,certificate_flag_status,certificate,objective_flag_status,objective,experience_flag_status,experience,education_flag_status,education,language_flag_status,language,additional_feature_flag_status,additional_feature);
                        template_available_flag=true;
                    }else if(template_id==3){
                        html_code=await template3(color_code,username,profile_flag_status,profile_pic,address,email,other_contact,skill_flag_status,skill,certificate_flag_status,certificate,objective_flag_status,objective,experience_flag_status,experience,education_flag_status,education,language_flag_status,language,additional_feature_flag_status,additional_feature);
                        template_available_flag=true;
                    }else if(template_id==4){
                        html_code=await template4(color_code,username,profile_flag_status,profile_pic,address,email,other_contact,skill_flag_status,skill,certificate_flag_status,certificate,objective_flag_status,objective,experience_flag_status,experience,education_flag_status,education,language_flag_status,language,additional_feature_flag_status,additional_feature);
                        template_available_flag=true;
                    }else if(template_id==5){
                        html_code=await template5(color_code,username,profile_flag_status,profile_pic,address,email,other_contact,skill_flag_status,skill,certificate_flag_status,certificate,objective_flag_status,objective,experience_flag_status,experience,education_flag_status,education,language_flag_status,language,additional_feature_flag_status,additional_feature);
                        template_available_flag=true;
                    }else if(template_id==6){
                        html_code=await template6(color_code,username,profile_flag_status,profile_pic,address,email,other_contact,skill_flag_status,skill,certificate_flag_status,certificate,objective_flag_status,objective,experience_flag_status,experience,education_flag_status,education,language_flag_status,language,additional_feature_flag_status,additional_feature);
                        template_available_flag=true;
                    }else if(template_id==7){
                        html_code=await template7(color_code,username,profile_flag_status,profile_pic,address,email,other_contact,skill_flag_status,skill,certificate_flag_status,certificate,objective_flag_status,objective,experience_flag_status,experience,education_flag_status,education,language_flag_status,language,additional_feature_flag_status,additional_feature);
                        template_available_flag=true;
                    }else if(template_id==8){
                        
                    }else if(template_id==9){

                    }else if(template_id==10){

                    }
                    
                    if(template_available_flag){
                        var random_code=await utils.getRandomUniqueFiveDigitCode();
                        var set_file_name='Docpreview'+user_id+random_code+'.pdf';
                        var file_path='uploads/'+set_file_name;
                        var htmltopdf=await convertHtmlToPdf(file_path,html_code);
                        if(htmltopdf){
                            var preview_images=[];
                            var pdftoimage=await convertPdfToImage(user_id,file_path);
                            for(var image_i=0; image_i<pdftoimage.length; image_i++){
                                if(pdftoimage[image_i]!=''){
                                    preview_images.push(appURL+pdftoimage[image_i]);
                                }
                            }
                            console.log('pdf to image ',pdftoimage);
                            console.log(current_datetime)
                            //save to temporary files db
                            var save_preview_pdf_files_data=await queries.savePreviewData(current_datetime,user_id,file_path);
                            var preview_image_query='';
                            for(var i=0; i<pdftoimage.length; i++){
                                preview_image_query=preview_image_query+"('"+current_datetime+"','"+user_id+"','"+pdftoimage[i]+"'),";
                            }
                            preview_image_query=preview_image_query.replace(/(^,)|(,$)/g, "");
                            let query="INSERT INTO `temporary_preview_cv`(`created_datetime`, `user_id`, `path`) VALUES "+preview_image_query+";";
                            console.log(query);
                            //save the preview data
                            let save_preview_data=await queries.executePreviewQuery(query);
                            // if(save_preview_data>0){

                            // }else{

                            // }
                            res.json({
                                status: true,
                                statuscode: 200,
                                message: 'success',
                                data:{
                                    file_path: appURL+file_path,
                                    image_path: preview_images
                                }
                            })
                        }else{
                            res.json({
                                status: false,
                                statuscode: 200,
                                messsage: 'Unable to create pdf file',
                                data: {}
                            });
                        }
                    }else{
                        res.json({
                            status: false,
                            statuscode: 200,
                            message: "Template id doesn't available",
                            data: {}
                        })
                    }
                }else{
                    res.json({
                        status: false,
                        statuscode: 200,
                        messsage: 'No user data found',
                        data: {}
                    });
                }
            }else{
                res.json({
                    status: false,
                    statuscode: 200,
                    messsage: 'No template id',
                    data: {}
                });
            }
            
        }else{
            res.json({
                status: false,
                statuscode: 400,
                message: 'Input data is missing',
                data: {}
            });
        }
    }catch(e){
        console.log(`Error occurs in generate pdf and image function ${e}`)
        res.json({
            status: false,
            statuscode: 400,
            message: `Error occurs in generate pdf and image function ${e}`,
            data: {}
        })
    }
}

async function generatePreviewPdfAndImage_old(req,res){
    //{"user_id":"1","access_token":"1","template_id":"1","color_code":"#596977","file_name":"","first_name":"gokul","last_name":"pandei","dob":"1998","gender":"male","country":"india","state":"maharastra","city":"Bhokardan","pincode":"431114","address":"ran nivas,house num:2089,Bhokardan","email":"gokul.1998@gmail.com","other_contact":"9876543210","profile_pic":"uploads/job_seeker/6/profilepic/FILE_20231122145934.png","disabled":"0","disability_type":"none","objective":"To secure a challenging position in a reputable organization to expand my learnings, knowledge, and skills. I want to succeed in a stimulating and challenging environment that will provide me with advancement opportunities. I want to excel in this field with hard work, perseverance and dedication. I want a highly rewarding career where I can use my skills and knowledge for organizational and personal growth.","education":[{"qualification":"btech","course_name":"Computer science and engineering","institution":"IIT DELHI","country":"india","cgpa":"8.8","academic_year":"2018-2022"}],"experience":[{"position":"software developer","company_name":"carestack","country":"indian","start_date":"2019-04-11","end_date":"2021-04-11","responsilbilities":["Designed safety-focused experiences for Riders and Drivers", "Physical space problem solving and it’s interaction with the digital", "Navigated organization to achieve operational improvements"],"document":"img(1).img"},{"position":"Senior software developer","company_name":"carestack","country":"indian","start_date":"2021-05-11","end_date":"0000-00-00","responsilbilities":["Designed safety-focused experiences for Riders and Drivers", "Physical space problem solving and it’s interaction with the digital", "Navigated organization to achieve operational improvements"],"document":"img(1).img"}],"skill":[{"skill":"Python","rating":"5","rating_status":"1"},{"skill":"Angular","rating":"3","rating_status":"1"},{"skill":"Php","rating":"4","rating_status":"1"}],"certificate":[{"document_type":"google uc design certificate","document_path":"certificate(1).img","year":"2020"},{"document_type":"google uc design data","document_path":"certificate(1).img","year":"2020"}],"language":[{"language":"English","rating":"5","rating_status":"1"},{"language":"Tamil","rating":"4","rating_status":"1"},{"language":"Malayalam","rating":"4","rating_status":"1"}],"additional_feature":[{"type":"Hobbies","type_description":"hjsb","icon":"icon1","show_status":"1","status":"1"},{"type":"Achievement","type_description":"Rank holder in UG","icon":"icon1","show_status":"1","status":"1"}]}
    try{
        //set data to templates
        var body=req.body ? req.body : {}; 
        var response_data=[];
        console.log('body',body, typeof(body), Object.keys(body).length)
        if(typeof(body)=='object' && Object.keys(body).length>0){
            var user_id=body.user_id ? body.user_id : '';
            var access_token=body.access_token ? body.access_token : '';
            var profile_pic=body.profile_pic ? body.profile_pic : '';
            var first_name=body.first_name ? body.first_name : '';
            var last_name=body.last_name ? body.last_name : '';
            var address=body.address ? body.address : '';
            var username=first_name+' '+last_name;
            var email=body.email ? body.email : '';
            var skill=body.skill ? body.skill : [];
            var certificate=body.certificate ? body.certificate : [];
            var objective=body.objective ? body.objective : '';
            var experience=body.experience ? body.experience : [];
            var education=body.education ? body.education : [];
            var language=body.language ? body.language : [];
            var additional_feature=body.additional_feature ? body.additional_feature : [];
            var other_contact=body.other_contact ? body.other_contact : '';
            var profile_flag_status=false;
            var skill_flag_status=false;
            var certificate_flag_status=false;
            var experience_flag_status=false;
            var education_flag_status=false;
            var language_flag_status=false;
            var additional_feature_flag_status=false;
            var objective_flag_status=false;
            console.log(skill)
            if(profile_pic!=''){
                profile_pic=baseURLProfilePic+profile_pic;
                profile_flag_status=true;
            }
            if(skill.length>0){
                skill_flag_status=true;
            }
            if(certificate.length>0){
                certificate_flag_status=true;
            }
            if(experience.length>0){
                experience_flag_status=true;
            }
            if(education.length>0){
                education_flag_status=true;
            }
            if(language.length>0){
                language_flag_status=true;
            }
            if(additional_feature.length>0){
                additional_feature_flag_status=true;
            }
            if(objective!=''){
                objective_flag_status=true;
            }
            var check_user_data=await queries.checkUserData(user_id,access_token)
            if(check_user_data.length>0){
                var contact_number=check_user_data[0].country_code+check_user_data[0].phone;
                //background: #67D6E0;
                
                var color_code=['#596977','#03A9F4','#67D6E0','#5E6A75'];
                var color_variants=[];
                for(var i=0; i<color_code.length; i++){
                    console.log(color_code[i])
                    var template_1=await template1(color_code[i],username,profile_flag_status,profile_pic,address,email,other_contact,skill_flag_status,skill,certificate_flag_status,certificate,objective_flag_status,objective,experience_flag_status,experience,education_flag_status,education,language_flag_status,language,additional_feature_flag_status,additional_feature);
                    console.log(template_1)
                    var code=await utils.getRandomUniqueFiveDigitCode();
                    var file_name='uploads/template1_'+user_id+code+'.pdf';
                    var htmltopdf=await convertHtmlToPdf(file_name,template_1);
                    if(htmltopdf){
                        var pdftoimage=await convertPdfToImage(user_id,file_name);
                        console.log('pdf to image ',pdftoimage);
                        color_variants.push({
                            color: color_code[i],
                            peview_data: pdftoimage,
                            pdf: appURL+file_name
                        })
                    }
                }
                var template1_res={
                    template_id: "1",
                    template_name:"one",
                    template_url:"https://creativeapplab.in/job_portal/api/uploads/job_seeker/2/resume/FILE_20231213103548.png",
                    color_variants: color_variants
                }
                response_data.push(template1_res);

                //template 2
                var template2_color_code=['#272727'];
                var template2_color_variants=[];
                for(var j=0; j<template2_color_code.length; j++){
                    var template_2=await template2(template2_color_code[j],username,profile_flag_status,profile_pic,address,email,other_contact,skill_flag_status,skill,certificate_flag_status,certificate,objective_flag_status,objective,experience_flag_status,experience,education_flag_status,education,language_flag_status,language,additional_feature_flag_status,additional_feature);
                    var template2_code=await utils.getRandomUniqueFiveDigitCode();
                    var template2_file_name='uploads/template2_'+user_id+template2_code+'.pdf';
                    var htmltopdf_template2=await convertHtmlToPdf(template2_file_name,template_2);
                    if(htmltopdf_template2){
                        var pdftoimage_template2=await convertPdfToImage(user_id,template2_file_name);
                        template2_color_variants.push({
                            color: template2_color_code[j],
                            preview_data: pdftoimage_template2,
                            pdf: appURL+template2_file_name
                        })
                    }
                }

                var template2_res={
                    template_id: "2",
                    template_name:"two",
                    template_url:"https://creativeapplab.in/job_portal/api/uploads/job_seeker/2/resume/FILE_20231213103548.png",
                    color_variants: template2_color_variants
                }
                response_data.push(template2_res);

                //template 3
                var template3_color_code=[''];
                var template3_color_variants=[];
                for(var k=0; k<template3_color_code.length; k++){
                    var template_3=await template3(template3_color_code[j],username,profile_flag_status,profile_pic,address,email,other_contact,skill_flag_status,skill,certificate_flag_status,certificate,objective_flag_status,objective,experience_flag_status,experience,education_flag_status,education,language_flag_status,language,additional_feature_flag_status,additional_feature);
                    var template3_code=await utils.getRandomUniqueFiveDigitCode();
                    var template3_file_name='uploads/template2_'+user_id+template3_code+'.pdf';
                    var htmltopdf_template3=await convertHtmlToPdf(template3_file_name,template_3);
                    if(htmltopdf_template3){
                        var pdftoimage_template3=await convertPdfToImage(user_id,template3_file_name);
                        template3_color_variants.push({
                            color: template3_color_code[j],
                            preview_data: pdftoimage_template3,
                            pdf: appURL+template3_file_name
                        })
                    }
                }

                var template3_res={
                    template_id: "3",
                    template_name:"three",
                    template_url:"https://creativeapplab.in/job_portal/api/uploads/job_seeker/2/resume/FILE_20231213103548.png",
                    color_variants: template3_color_variants
                }
                response_data.push(template3_res);
                
                res.json({
                    status: true,
                    statuscode: 200,
                    messsage: 'success',
                    data: response_data
                });
            }else{
                res.json({
                    status: false,
                    statuscode: 200,
                    messsage: 'No user data found',
                    data: []
                });
            }
        }else{
            res.json({
                status: false,
                statuscode: 400,
                message: 'Input data is missing',
                data: []
            });
        }
    }catch(e){
        console.log(`Error occurs in generate pdf and image function ${e}`)
        res.json({
            status: false,
            statuscode: 400,
            message: `Error occurs in generate pdf and image function ${e}`,
            data: []
        })
    }
}

async function template1(color_code,username,profile_flag_status,profile_pic,address,email,contact_number,skill_flag_status,skill,certificate_flag_status,certificate,objective_flag_status,objective,experience_flag_status,experience,education_flag_status,education,language_flag_status,language,additional_feature_flag_status,additional_feature){
    var skill_section='';
    var certificate_section='';
    var experience_section='';
    var education_section='';
    var language_section='';
    var profile_pic_tag='';
    var current_position='';
    var additional_feature_section='';
    var objective_section='';
    if(profile_flag_status){
        profile_pic_tag=`<div class="avatar mb-3">
                            <img alt="profile" class="img-fluid" src="${profile_pic}"/>
                        </div>`;
    }

    if(objective_flag_status){
        objective_section=objective_section+'<section>';
        objective_section=objective_section+'<h2 class="mb-3">Objective</h2>';
        objective_section=objective_section+'<p>'+objective+'</p>';
        objective_section=objective_section+'</section>';
    }
    if(skill_flag_status){
        console.log(skill.length)
        skill_section=skill_section+'<section role="main">'
        skill_section=skill_section+'<section class="mt-5">'
        skill_section=skill_section+'<h2>Details</h2>'
        
        for(var skill_i=0; skill_i<skill.length; skill_i++){
            console.log(skill[skill_i])
            console.log(skill_i)
            skill_section=skill_section+'<section class="mt-3">'
            skill_section=skill_section+'<h4 class="title mt-3 details p">'+skill[skill_i].skill+'</h4>'
            if(skill[skill_i].rating_status==1){
                skill_section=skill_section+'<p class=" rating">'
                for(var rating_i=1; rating_i<=5; rating_i++){
                    console.log('yes rating index ', rating_i)
                    if(rating_i<=skill[skill_i].rating){
                        skill_section=skill_section+'<span class = "fa fa-star checked"></span>'
                    }else{
                        skill_section=skill_section+'<span class = "fa fa-star unchecked"></span>'
                    }
                }
                // skill_section=skill_section+'<span class = "fa fa-star checked"></span>'
                // skill_section=skill_section+'<span class = "fa fa-star checked"></span>'
                // skill_section=skill_section+'<span class = "fa fa-star checked"></span>'
                // skill_section=skill_section+'<span class = "fa fa-star unchecked"></span>'
                // skill_section=skill_section+'<span class = "fa fa-star unchecked"></span>'
                skill_section=skill_section+'</p>'
                
            }
            skill_section=skill_section+'</section>';
            
        }
        skill_section=skill_section+'</section>'
    }
    console.log(skill_section);
    if(certificate_flag_status){
        certificate_section=certificate_section+'<section role="main">';
        certificate_section=certificate_section+'<section class="mt-5">';
        certificate_section=certificate_section+'<h2>Certifications</h2>';
        certificate_section=certificate_section+'</section>';
        for(var certificate_i=0; certificate_i<certificate.length; certificate_i++){
            certificate_section=certificate_section+'<section class="mt-3">';
            certificate_section=certificate_section+'<p class="details">'+certificate[certificate_i].document_type+'</p>';
            certificate_section=certificate_section+'</section>';
        }
        certificate_section=certificate_section+'</section>';
    }
    
    if(experience_flag_status){
        experience_section=experience_section+'<section>';
        experience_section=experience_section+'<h2 class="mb-3 mt-5">Experience</h2>';
        experience=experience.reverse();
        for(var experience_i=0; experience_i<experience.length; experience_i++){
            var start_date=experience[experience_i].start_date ? experience[experience_i].start_date : '';
            var end_date=experience[experience_i].end_date ? experience[experience_i].end_date : '';
            var date_status=false;
            if(start_date!='0000-00-00' && start_date!=''){
                date_status=true;
                start_date=await utils.change_data_format(start_date);
                console.log('yes ',start_date);
            }
            if(date_status){
                if(end_date!='0000-00-00' && end_date!=''){
                    end_date=await utils.change_data_format(end_date);
                }else{
                    end_date='Present'; 
                    current_position=experience[experience_i].position;
                }
            }
            if(experience_i==0){
                experience_section=experience_section+'<div>';
            }else{
                experience_section=experience_section+'<div class="mt-4">';
            }
            
            experience_section=experience_section+'<h4 class="black">'+experience[experience_i].company_name+'</h4>';
            experience_section=experience_section+'<p class="black">'+experience[experience_i].position+'</p>';
            if(date_status){
                experience_section=experience_section+'<p>'+start_date+' - '+end_date+'</p>';
            }
            //var responsibilities=experience[experience_i].responsilbilities ? experience[experience_i].responsilbilities : [];
            var responsibilities=experience[experience_i].responsilbilities ? experience[experience_i].responsilbilities.split(';') : '';
            console.log(responsibilities);
            if(responsibilities.length>0){
                experience_section=experience_section+'<ul>';
                for(var responsibility_i=0; responsibility_i<responsibilities.length; responsibility_i++){
                    experience_section=experience_section+'<li>'+responsibilities[responsibility_i]+'</li>';
                }
                experience_section=experience_section+'</ul>';
            }
            experience_section=experience_section+'</div>';
        }
        experience_section=experience_section+'</section>';
    }

    if(education_flag_status){
        education_section=education_section+'<section>';
        education_section=education_section+'<h2 class="mb-3 mt-5">Education</h2>';
        for(var education_i=0; education_i<education.length; education_i++){
            education_section=education_section+'<div>'; 
            education_section=education_section+'<h4 class="black">'+education[education_i].institution+'</h4>';
            education_section=education_section+'<p>'+education[education_i].course_name+', '+education[education_i].academic_year+'</p>';
            education_section=education_section+'</div>';
        }
        education_section=education_section+'</section>';
    }

    if(language_flag_status){
        language_section=language_section+'<section>';
        language_section=language_section+'<h2 class="mb-3 mt-5">Language</h2>';
        console.log(language)
        for(var language_i=0; language_i<language.length; language_i++){
            console.log(language_i)
            if(language_i==0){
                language_section=language_section+'<div class="d-flex align-items-center">';
            }else{
                language_section=language_section+'<div class="d-flex align-items-center mt-3">';
            }
            language_section=language_section+'<h4 class="title details p m-0">'+language[language_i].language+'</h4>';
            if(language[language_i].rating_status==1){
                language_section=language_section+'<p class=" rating m-0 ps-5 ms-4 position-absolute">';
                for(var lang_rating_i=1; lang_rating_i<=5; lang_rating_i++){
                    if(lang_rating_i<=language[language_i].rating){
                        language_section=language_section+'<span class = "fa fa-star checked"></span>';
                    }else{
                        language_section=language_section+'<span class = "fa fa-star unchecked"></span>';
                    }
                }
                language_section=language_section+'</p>';
            }
            language_section=language_section+'</div>';
        }
        language_section=language_section+'</section>';
    }

    if(additional_feature_flag_status){
        for(var additional_feature_i=0; additional_feature_i<additional_feature.length; additional_feature_i++){
            if(additional_feature[additional_feature_i].show_status==1){
                additional_feature_section=additional_feature_section+'<section class="mt-3">'
                additional_feature_section=additional_feature_section+'<h2 class="mb-3 mt-5">'+additional_feature[additional_feature_i].type+'</h2>'
                additional_feature_section=additional_feature_section+'<p class="details">'+additional_feature[additional_feature_i].type_description+'</p>'
                additional_feature_section=additional_feature_section+'</section>'
            }
        }
    }
    
    //exit ()
    var html_opening= `
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
                /* @media print {
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
                    <section role="main">
                        <section class="mt-5">
                            <h2>Details</h2>
                        </section>
                        <section class="mt-3">
                            <h4 class="title mt-3">Address</h4>
                            <p class="details">${address}</p>
                        </section>
                        <section class="mt-3">
                            <h4 class="title mt-3">Phone</h4>
                            <p class="details">${contact_number}</p>
                        </section>
                        <section class="mt-3">
                            <h4 class="title mt-3">Email</h4>
                            <p class="details">${email}</p>
                        </section>
                    </section>
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
                        </section>
                    </div>
                </div>
    `;

    var html_closing=`</div></div></main></body></html>`

    return html_opening+html_closing;
}

async function template2(color_code,username,profile_flag_status,profile_pic,address,email,contact_number,skill_flag_status,skill,certificate_flag_status,certificate,objective_flag_status,objective,experience_flag_status,experience,education_flag_status,education,language_flag_status,language,additional_feature_flag_status,additional_feature){
    var skill_section='';
    var certificate_section='';
    var experience_section='';
    var education_section='';
    var language_section='';
    var profile_pic_tag='';
    var current_position='';
    var additional_feature_section='';
    var objective_section='';
    console.log(profile_pic,profile_flag_status);
    
    if(profile_flag_status){
        profile_pic_tag=`<img
        alt="profile"
        class="avatar"
        src="${profile_pic}"
      />`
    }

    if(objective_flag_status){
         objective_section=objective_section+'<section>';
         objective_section=objective_section+'<h2 class="">Objective</h2>';
         objective_section=objective_section+'<p>'+objective+'</p>';
         objective_section=objective_section+'</section>';
    }

    if(experience_flag_status){
        experience_section=experience_section+'<section>';
        experience_section=experience_section+'<h2 class="mb-3">Experience</h2>';
        experience=experience.reverse();
        for(var experience_i=0; experience_i<experience.length; experience_i++){
            var start_date=experience[experience_i].start_date ? experience[experience_i].start_date : '';
            var end_date=experience[experience_i].end_date ? experience[experience_i].end_date : '';
            var date_status=false;
            if(start_date!='0000-00-00' && start_date!=''){
                date_status=true;
                start_date=await utils.change_data_format(start_date);
            }
            if(date_status){
                if(end_date!='0000-00-00' && end_date!=''){
                    end_date=await utils.change_data_format(end_date);
                }else{
                    end_date='Present'; 
                    current_position=experience[experience_i].position;
                }
            }
            if(experience_i==0){
                experience_section=experience_section+'<div>';
            }else{
                experience_section=experience_section+'<div class="mt-4">';
            }
            //var responsibilities=experience[experience_i].responsilbilities ? experience[experience_i].responsilbilities : [];
            var responsibilities=experience[experience_i].responsilbilities ? experience[experience_i].responsilbilities.split(';') : '';
            
            experience_section=experience_section+'<h4 class="black">'+experience[experience_i].company_name+'</h4>';
            experience_section=experience_section+'<p class="black mt-0" style="margin-bottom: 0.2rem !important">'+experience[experience_i].position+'</p>';
            experience_section=experience_section+'<p>'+start_date+' '+end_date+'</p>';

            if(responsibilities.length>0){
                experience_section=experience_section+'<ul>'; 
                for(var responsibility_i=0; responsibility_i<responsibilities.length; responsibility_i++){
                    experience_section=experience_section+'<li>'+responsibilities[responsibility_i]+'</li>';
                }
                experience_section=experience_section+'</ul>'; 
            }
        }
        experience_section=experience_section+'</section>';
    }

    if(education_flag_status){
        education_section=education_section+'<section>';
        education_section=education_section+'<h2 class="mb-3">Education</h2>';
        for(var education_i=0; education_i<education.length; education_i++){
            education_section=education_section+'<div><h4 class="black">'+education[education_i].institution+'</h4><p>'+education[education_i].course_name+', '+education[education_i].academic_year+'</p></div>';
        }
        education_section=education_section+'</section>';
    }

    if(certificate_flag_status){
        certificate_section=certificate_section+'<section>';
        certificate_section=certificate_section+'<section class="mt-2"><h2 style="color: black">Certifications</h2></section>';
        for(var certificate_i=0; certificate_i<certificate.length; certificate_i++){
            certificate_section=certificate_section+'<section class="mt-3"><p class="details">'+certificate[certificate_i].document_type+'</p></section>';
        }
        certificate_section=certificate_section+'<section>';
    }

    if(skill_flag_status){
        skill_section=skill_section+'<section class="mt-5"><h2 style="color: black">Skills</h2></section>';
        for(var skill_i=0; skill_i<skill.length; skill_i++){
            skill_section=skill_section+'<section class="mt-3">';
            skill_section=skill_section+'<h4 class="title mt-3 details p">'+skill[skill_i].skill+'</h4>';
            if(skill[skill_i].rating_status==1){
                skill_section=skill_section+'<div class="w3-light-grey w3-xxlarge" style="width: 100%">';
                skill_section=skill_section+'<div class="w3-container w3-black" style="width: '+skill[skill_i].rating*20+'%"></div>';
                skill_section=skill_section+'</div>';
            }
            skill_section=skill_section+'</section">';
        }
    }

    if(language_flag_status){
        language_section=language_section+'<section>';
        language_section=language_section+'<h2 class="mb-3 mt-5" style="color: black">Language</h2>';
        language_section=language_section+'</section>';
        for(var language_i=0; language_i<language.length; language_i++){
            language_section=language_section+'<section class="mt-3">';
            language_section=language_section+'<h4 class="title mt-3 details">Principle</h4>';
            if(language[language_i].rating_status==1){
                language_section=language_section+'<div class="w3-light-grey w3-tiny" style="width: 100%">';
                language_section=language_section+'<div class="w3-container w3-black" style="width: '+language[language_i].rating*20+'%"></div>';
                language_section=language_section+'</div>';
            }
            language_section=language_section+'</section>';
        }
    }

    if(additional_feature_flag_status){
        for(var additional_feature_i=0; additional_feature_i<additional_feature.length; additional_feature_i++){
            if(additional_feature[additional_feature_i].show_status==1){
                additional_feature_section=additional_feature_section+'<section>'
                additional_feature_section=additional_feature_section+'<section class="mt-2"><h2 style="color: black">'+additional_feature[additional_feature_i].type+'</h2></section>';
                additional_feature_section=additional_feature_section+'<section class="mt-3"><p class="details">'+additional_feature[additional_feature_i].type_description+'</p></section>'
                additional_feature_section=additional_feature_section+'</section>'
            }
        }
    }

    var html_opening=`<!DOCTYPE html>
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
            font-size: 12px;
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
            margin-left: 22%;
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
            background-color: #272727;
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
              <section
            role="main"
            class="d-flex align-items-center justify-content-center mb-2"
          >
            <p class="details" style="color: rgb(170, 171, 172)">
              <i class="fa fa-home"></i>
              ${address}
            </p>
            &nbsp; &nbsp;
            <p class="details" style="color: rgb(170, 171, 172)">
              <i class="fa fa-phone"></i> ${contact_number}
            </p>
            &nbsp; &nbsp; 
            <p class="details" style="color: rgb(170, 171, 172)">
              <i class="fa fa-envelope"></i> ${email}
            </p>
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
    var html_closing=`</div></div></main>
                        </body>
                    </html>`;
    return html_opening+html_closing;
}


async function template3(color_code,username,profile_flag_status,profile_pic,address,email,contact_number,skill_flag_status,skill,certificate_flag_status,certificate,objective_flag_status,objective,experience_flag_status,experience,education_flag_status,education,language_flag_status,language,additional_feature_flag_status,additional_feature){
    var skill_section='';
    var certificate_section='';
    var experience_section='';
    var education_section='';
    var language_section='';
    var profile_pic_tag='';
    var current_position='';
    var additional_feature_section='';
    var objective_section='';

    if(profile_flag_status){
        profile_pic_tag=profile_pic_tag+'<div class="avatar mb-3 mt-1">';
        profile_pic_tag=profile_pic_tag+'<img alt="profile" class="img-fluid" src="'+profile_pic+'">';
        profile_pic_tag=profile_pic_tag+'</div>';
    }

    if(objective_flag_status){
        objective_section=objective_section+'<section><h2 style=" margin-top: 1% !important;">Objective</h2>';
        objective_section=objective_section+'<p>'+objective+'</p>';
        objective_section=objective_section+'</section>';
    }

    if(experience_flag_status){
        experience_section=experience_section+'<section>';
        experience_section=experience_section+'<h2 class="mb-2 mt-4">Experience</h2>';
        for(var experience_i=0; experience_i<experience.length; experience_i++){
            var start_date=experience[experience_i].start_date ? experience[experience_i].start_date : '';
            var end_date=experience[experience_i].end_date ? experience[experience_i].end_date : '';
            var date_status=false;
            if(start_date!='0000-00-00' && start_date!=''){
                date_status=true;
                start_date=await utils.change_data_format(start_date);
            }
            if(date_status){
                if(end_date!='0000-00-00' && end_date!=''){
                    end_date=await utils.change_data_format(end_date);
                }else{
                    end_date='Present'; 
                    current_position=experience[experience_i].position;
                }
            }
            if(experience_i==0){
                experience_section=experience_section+'<div>';
            }else{
                experience_section=experience_section+'<div class="mt-4">';
            }
            //var responsibilities=experience[experience_i].responsilbilities ? experience[experience_i].responsilbilities : [];
            var responsibilities=experience[experience_i].responsilbilities ? experience[experience_i].responsilbilities.split(';') : '';
            experience_section=experience_section+'<div>';
            experience_section=experience_section+'<h4 class="black">'+experience[experience_i].company_name+'</h4>';
            experience_section=experience_section+'<span> '+experience[experience_i].position+'</span><br>';
            experience_section=experience_section+'<span class="date">'+start_date+' - '+end_date+'</span>';
            if(responsibilities.length>0){
                experience_section=experience_section+'<ul>';
                for(var responsibility_i=0; responsibility_i<responsibilities.length; responsibility_i++){
                    experience_section=experience_section+'<li>'+responsibilities[responsibility_i]+'</li>';
                }
                experience_section=experience_section+'</ul>';
            }
            experience_section=experience_section+'</div>';
        }
        experience_section=experience_section+'</section>';
    }

    if(education_flag_status){
        education_section=education_section+'<section>';
        education_section=education_section+'<h2 class="mb-1 ">Education</h2>';
        for(var education_i=0; education_i<education.length; education_i++){
            education_section=education_section+'<div>';
            education_section=education_section+'<h4 class="black ">'+education[education_i].institution+'</h4>';
            education_section=education_section+'<p>'+education[education_i].course_name+', '+education[education_i].academic_year+'</p>';
            education_section=education_section+'</div>';
        }
        education_section=education_section+'</section>';
    }

    if(certificate_flag_status){
        certificate_section=certificate_section+'<section role="main">';
        certificate_section=certificate_section+'<section class="mt-4">';
        certificate_section=certificate_section+'<h2>Certifications</h2>';
        certificate_section=certificate_section+'</section>';
        for(var certificate_i=0; certificate_i<certificate.length; certificate_i++){
            certificate_section=certificate_section+'<section class="mt-1">';
            certificate_section=certificate_section+'<p class="details">'+certificate[certificate_i].document_type+'</p>';
            certificate_section=certificate_section+'</section>';
        }
        certificate_section=certificate_section+'</section>';
    }

    if(skill_flag_status){
        skill_section=skill_section+'<section role="main">';
        skill_section=skill_section+'<section class="mt-4">';
        skill_section=skill_section+'<h2>Skills</h2>';
        skill_section=skill_section+'</section>';
        for(var skill_i=0; skill_i<skill.length; skill_i++){
            skill_section=skill_section+'<section class="mt-3">';
            skill_section=skill_section+'<h4 class="title mt-3 details p">'+skill[skill_i].skill+'</h4>';
            if(skill[skill_i].rating_status==1){
                skill_section=skill_section+'<div class="w3-light-grey w3-large " style="width: 100%;">';
                skill_section=skill_section+'<div class="w3-container w3-black" style="width: '+skill[skill_i].rating*20+'%; height: 5px;"></div>';
                skill_section=skill_section+'</div>';
            }
            skill_section=skill_section+'</section>';
        }
        skill_section=skill_section+'</section>';
    }

    if(language_flag_status){
        language_section=language_section+'<section role="main">';
        language_section=language_section+'<h2 class="mb-3 mt-5">Language</h2>';
        for(var language_i=0; language_i<language.length; language_i++){
            if(language_i==0){
                language_section=language_section+'<section class="mt-0">';
            }else{
                language_section=language_section+'<section class="mt-3">';
            }
                // <h4 class="title mt-3 details">Adobe XD</h4>
                // <div class="w3-light-grey w3-large " style="width: 100%;">
                //     <div class="w3-container w3-black" style="width: 50%; height: 5px;"></div>
                // </div>
            language_section=language_section+'<h4 class="title mt-3 details">'+language[language_i].language+'</h4>';
            if(language[language_i].rating_status==1){
                language_section=language_section+'<div class="w3-light-grey w3-large" style="width: 100%;">';
                language_section=language_section+'<div class="w3-container w3-black" style="width: '+language[language_i].rating*20+'%; height: 5px;"></div>';
                language_section=language_section+'</div>';
            }
            language_section=language_section+'</section>';
        }
        language_section=language_section+'</section>';
    }

    if(additional_feature_flag_status){
        additional_feature_section=additional_feature_section+'<section>';
        
        for(var additional_feature_i=0; additional_feature_i<additional_feature.length; additional_feature_i++){
            if(additional_feature[additional_feature_i].show_status==1){
                additional_feature_section=additional_feature_section+'<h2 class="mb-1 ">'+additional_feature[additional_feature_i].type+'</h2>';
                additional_feature_section=additional_feature_section+'<p>'+additional_feature[additional_feature_i].type_description+'</p>';
            }
            
        }
        additional_feature_section=additional_feature_section+'</section>';
    }

    var html_opening=`<!doctype html>
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
                                font-size: 14px;
                            }
                            .sidePane {
                                width: calc(188px * 1.4);
                                background: linear-gradient(
                                rgba(248, 252, 3, 0.5) -2%,
                                rgba(255, 255, 255, 0) 10%,
                                white 7%,
                                white 83%,
                                rgba(255, 255, 255, 0) 76%,
                                rgba(135, 206, 235, 0.5) 100%
                                );
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
                                            <h2>${username}</h2>
                                        <p class="details">${current_position}</p>
                                        </div>
                                    </section>

                                    <section role="content">
                                        ${objective_section}
                                        ${experience_section}
                                        ${education_section}
                                        ${additional_feature_section}
                                    </section>

                                </div>
                            </div>
                            <div class="col-3 sidePane">
                                <div class="p-5 my-3" style=" margin-top: 30% !important">
                                    <section role="main ">
                                        <section class="mt-5">
                                            <h2>Details</h2>
                                        </section>
                                        <section class="mt-3">
                                            <h4 class="title">Address</h4>
                                            <p class="details" >${address}</p>
                                        </section>
                                        <section >
                                            <h4 class="title">Phone</h4>
                                            <p class="details">${contact_number}</p>
                                        </section>
                                        <section >
                                            <h4 class="title ">Email</h4>
                                            <span class="details">${email}</span>
                                        </section>
                                    </section>
                                    ${certificate_section}
                                    ${skill_section}
                                    ${language_section}
                                </div>
                            </div>
                    `;

    var html_closing=`</div></div></main></body></html>`;
    return html_opening+html_closing;
}

async function template4(color_code,username,profile_flag_status,profile_pic,address,email,contact_number,skill_flag_status,skill,certificate_flag_status,certificate,objective_flag_status,objective,experience_flag_status,experience,education_flag_status,education,language_flag_status,language,additional_feature_flag_status,additional_feature){
    var html_opening=`<!DOCTYPE html>
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
    var html_closing=`</div>
    </main>
  </body>
</html>`;
    return html_opening+html_closing;
}

async function template5(color_code,username,profile_flag_status,profile_pic,address,email,contact_number,skill_flag_status,skill,certificate_flag_status,certificate,objective_flag_status,objective,experience_flag_status,experience,education_flag_status,education,language_flag_status,language,additional_feature_flag_status,additional_feature){
    var skill_section='';
    var certificate_section='';
    var experience_section='';
    var education_section='';
    var language_section='';
    var profile_pic_tag='';
    var current_position='';
    var additional_feature_section='';
    var objective_section='';

    if(profile_flag_status){
        profile_pic_tag=profile_pic_tag+'';
    }

    if(objective_flag_status){
        objective_section=objective_section+'<div class="about">'+objective+'</div>';
    }

    if(experience_flag_status){
        experience_section=experience_section+'<div class="block">';
        experience_section=experience_section+'<h3><span>experience</span></h3>';
        for(var experience_i=0; experience_i<experience.length; experience_i++){
            var start_date=experience[experience_i].start_date ? experience[experience_i].start_date : '';
            var end_date=experience[experience_i].end_date ? experience[experience_i].end_date : '';
            var date_status=false;
            if(start_date!='0000-00-00' && start_date!=''){
                date_status=true;
                start_date=await utils.change_data_format(start_date);
            }
            if(date_status){
                if(end_date!='0000-00-00' && end_date!=''){
                    end_date=await utils.change_data_format(end_date);
                }else{
                    end_date='Present'; 
                    current_position=experience[experience_i].position;
                }
            }
            console.log(date_status,start_date,end_date)
            experience_section=experience_section+'<div class="subblock">';
            experience_section=experience_section+'<h4>'+experience[experience_i].company_name+'</h4>';
            experience_section=experience_section+'<h5>'+experience[experience_i].position+'</h5>';
            experience_section=experience_section+'<h6>'+start_date+' - '+end_date+'</h6>';
            var responsibilities=experience[experience_i].responsilbilities ? experience[experience_i].responsilbilities.split(';') : '';
            if(responsibilities.length>0){
                experience_section=experience_section+'<ul>';
                for(var responsibility_i=0; responsibility_i<responsibilities.length; responsibility_i++){
                    experience_section=experience_section+'<li>'+responsibilities[responsibility_i]+'</li>';
                }
                experience_section=experience_section+'</ul>';
            }
            //experience_section=experience_section+'<ul><li>Designed safety-focused experiences for Riders and Drivers </li></ul>'
            experience_section=experience_section+'</div>';
            
        }
        experience_section=experience_section+'</div>'
    }
    if(education_flag_status){
        education_section=education_section+'<div class="block">';
        education_section=education_section+'<h3><span>Education</span></h3>';
        for(var education_i=0; education_i<education.length; education_i++){
            education_section=education_section+'<div class="subblock">';
            education_section=education_section+'<h4>'+education[education_i].institution+'</h4>';
            education_section=education_section+'<h6>'+education[education_i].course_name+', '+education[education_i].academic_year+'</h6>';
            education_section=education_section+'</div>';
        }
        education_section=education_section+'</div>';
    }
    if(skill_flag_status){
        skill_section=skill_section+'<div class="block">';
        skill_section=skill_section+'<h3><span>skills</span></h3>';
        for(var skill_i=0; skill_i<skill.length; skill_i++){
            skill_section=skill_section+'<div class="progress">';
            skill_section=skill_section+'<div class="p-label">'+skill[skill_i].skill+'</div>';
            if(skill[skill_i].rating_status==1){
                skill_section=skill_section+'<div class="bar">';
                skill_section=skill_section+'<div class="bar-fill" style="width: '+skill[skill_i].rating*20+'%;"></div>';
                skill_section=skill_section+'</div>';
            }
            skill_section=skill_section+'</div>';
        }
        skill_section=skill_section+'</div>';
    }
    if(language_flag_status){
        language_section=language_section+'<div class="block">';
        language_section=language_section+'<h3><span>Language</span></h3>';
        for(var language_i=0; language_i<language.length; language_i++){
            language_section=language_section+'<div class="progress">';
            language_section=language_section+'<div class="p-label">'+language[language_i].language+'</div>';
            if(language[language_i].rating_status==1){
                language_section=language_section+'<div class="bar">';
                language_section=language_section+'<div class="bar-fill" style="width: '+language[language_i].rating*20+'%;"></div>';
                language_section=language_section+'</div>';
            }
            language_section=language_section+'</div>';
        }
        language_section=language_section+'</div';
    }
    if(certificate_flag_status){
        certificate_section=certificate_section+'<div class="block">';
        certificate_section=certificate_section+'<h3><span>Certifications</span></h3>';  
        for(var certificate_i=0; certificate_i<certificate.length; certificate_i++){
            certificate_section=certificate_section+'<p>'+certificate[certificate_i].document_type+'</p>';
        } 
        certificate_section=certificate_section+'</div>';
    }

    if(additional_feature_flag_status){
        for(var additional_feature_i=0; additional_feature_i<additional_feature.length; additional_feature_i++){
            additional_feature_section=additional_feature_section+'<div class="block">';
            additional_feature_section=additional_feature_section+'<h3><span>'+additional_feature[additional_feature_i].type+'</span></h3>';
            additional_feature_section=additional_feature_section+'<p>'+additional_feature[additional_feature_i].type_description+'</p>';
            additional_feature_section=additional_feature_section+'</div>';
        }
    }
    
    var html_opening=`<!doctype html>
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
            line-height: 11px; }
          
          .wrapper {
            width: 100%;
            max-width: 595px;
            padding: 40px;
            margin: 20px auto;
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
            
    
    var html_closing=`</tr></tbody></table></div></div></body></html>`;
    return html_opening+html_closing;
}

async function template6(color_code,username,profile_flag_status,profile_pic,address,email,contact_number,skill_flag_status,skill,certificate_flag_status,certificate,objective_flag_status,objective,experience_flag_status,experience,education_flag_status,education,language_flag_status,language,additional_feature_flag_status,additional_feature){
    var skill_section='';
    var certificate_section='';
    var experience_section='';
    var education_section='';
    var language_section='';
    var profile_pic_tag='';
    var current_position='';
    var additional_feature_section='';
    var objective_section='';

    if(certificate_flag_status){
        certificate_section=certificate_section+'<div class="block">';
        certificate_section=certificate_section+'<h3><span>Certifications</span></h3>';
        for(var certificate_i=0; certificate_i<certificate.length; certificate_i++){
            certificate_section=certificate_section+'<p>'+certificate[certificate_i].document_type+'</p>';
        }
        certificate_section=certificate_section+'</div>';
    }

    if(skill_flag_status){
        skill_section=skill_section+'<div class="block">';
        skill_section=skill_section+'<h3><span>skills</span></h3>';
        for(var skill_i=0; skill_i<skill.length; skill_i++){
            skill_section=skill_section+'<div class="progress">';
            skill_section=skill_section+'<div class="p-label">'+skill[skill_i].skill+'</div>';
            if(skill[skill_i].rating_status==1){
                skill_section=skill_section+'<div class="bar">'
                skill_section=skill_section+'<div class="bar-fill" style="width: '+skill[skill_i].rating*20+'%;"></div>'
                skill_section=skill_section+'</div>';
            }
            skill_section=skill_section+'</div>';

            // skill_section=skill_section+`
            //     <div class="progress">
            //         <div class="p-label">${skill[skill_i].skill}</div>
            //         <div class="bar">
            //             <div class="bar-fill" style="width: 90%;"></div>
            //         </div>
            //     </div>
            // `;
        }

        if(language_flag_status){
            language_section=language_section+'<div class="block"><h3><span>Languages</span></h3>';
            for(var language_i=0; language_i<language.length; language_i++){
                language_section=language_section+'<div class="progress"><div class="p-label">'+language[language_i].language+'</div>';
                if(language[language_i].rating_status){
                    language_section=language_section+'<div class="bar"><div class="bar-fill" style="width: '+language[language_i].rating*20+'%;"></div></div>';
                }
                language_section=language_section+'</div>';
            }
            language_section=language_section+'</div>';
        }
    }

    if(objective_flag_status){
        objective_section=objective_section+`
        <div class="block">
            <h3><span>profile</span></h3>
            <p>${objective}</p>
        </div>`;
    }

    if(experience_flag_status){
        experience_section=experience_section+'<div class="block"><h3><span>experience</span></h3>';
        for(var experience_i=0; experience_i<experience.length; experience_i++){
            var start_date=experience[experience_i].start_date ? experience[experience_i].start_date : '';
            var end_date=experience[experience_i].end_date ? experience[experience_i].end_date : '';
            var date_status=false;
            if(start_date!='0000-00-00' && start_date!=''){
                date_status=true;
                start_date=await utils.change_data_format(start_date);
            }
            if(date_status){
                if(end_date!='0000-00-00' && end_date!=''){
                    end_date=await utils.change_data_format(end_date);
                }else{
                    end_date='Present'; 
                    current_position=experience[experience_i].position;
                }
            }
            experience_section=experience_section+'<div class="subblock"><h4>'+experience[experience_i].company_name+'</h4><h5>'+experience[experience_i].position+'</h5>';
            var responsibilities=experience[experience_i].responsilbilities ? experience[experience_i].responsilbilities.split(';') : '';
            if(experience[experience_i].responsilbilities.length>0){
                experience_section=experience_section+'<ul>';
                for(var responsibility_i=0; responsibility_i<responsibilities.length; responsibility_i++){
                    experience_section=experience_section+'<li>'+responsibilities[responsibility_i]+'</li>';
                }
                experience_section=experience_section+'</ul>';
            }
            
        }
        experience_section=experience_section+'</div>';
    }

    if(education_flag_status){
        education_section=education_section+'<div class="block"><h3><span>Education</span></h3>';
        for(var education_i=0; education_i<education.length; education_i++){
            education_section=education_section+`
                <div class="subblock">
                    <h4>${education[education_i].institution}</h4>
                    <h6>${education[education_i].course_name}, ${education[education_i].academic_year}</h6>
                </div>
            `
        }
        education_section=education_section+'</div>';
    }

    if(additional_feature_flag_status){
        for(var additional_feature_i=0; additional_feature_i<additional_feature.length; additional_feature_i++){
            if(additional_feature[additional_feature_i].show_status==1){
                additional_feature_section=additional_feature_section+'<div class="block"><h3><span>'+additional_feature[additional_feature_i].type+'</span></h3>';
                //additional_feature_section=additional_feature_section+'<div class="subblock"><h4>'+additional_feature[additional_feature_i].type_description+'</h4><h6>'+additional_feature[additional_feature_i].type_description+'</h6></div></div>';
                additional_feature_section=additional_feature_section+'<div class="subblock"><h6>'+additional_feature[additional_feature_i].type_description+'</h6></div></div>';
            }
        }
    }

    var html_opening=`<!doctype html>
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
            line-height: 11px; }
          
          .wrapper {
            width: 100%;
            max-width: 595px;
            padding: 40px;
            margin: 20px auto;
            border: 1px solid #000; }
          
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
            width: 190px;
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
    var html_closing=`
        <div class="cv-body">
                <table class="content-table">
                    <tbody>
                        <tr>
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
                                ${certificate_section}
                                ${skill_section}
                                ${language_section}
                            </td>
                            <td class=right>
                                ${objective_section}
                                ${experience_section}
                                ${education_section}
                                ${additional_feature_section}
                            </td>
                        </tr>
                    </tbody>
                </table>
        </div>
    </div><!-- ./wrapper -->

    </body>

    </html>`;
    return html_opening+html_closing;
}

async function template7(color_code,username,profile_flag_status,profile_pic,address,email,contact_number,skill_flag_status,skill,certificate_flag_status,certificate,objective_flag_status,objective,experience_flag_status,experience,education_flag_status,education,language_flag_status,language,additional_feature_flag_status,additional_feature){
    var skill_section='';
    var certificate_section='';
    var experience_section='';
    var education_section='';
    var language_section='';
    var profile_pic_tag='';
    var current_position='';
    var additional_feature_section='';
    var objective_section='';
    var html_opening=`
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
            font-size: 9px;
            color: rgba(0, 0, 0, 0.7);
            font-family: "Roboto", sans-serif; }
          
          h1 {
            font-size: 15px;
            font-weight: 700;
            line-height: 18px;
            letter-spacing: 0em;
            text-align: center;
            color: #000000;
            margin: 0;
            padding-bottom: 4px;
            text-transform: capitalize; }
          
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
              font-size: 10px;
              line-height: 12px;
              letter-spacing: .01em; }
              .table-contact td > img {
                margin-right: 6px; }
          
          .designation {
            font-size: 10px;
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
              font-size: 12px;
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
          
        </style>
        
    </head>
    
    <body>
    
        <div class="wrapper">
            <div class="header">
                <div class="profile-top">
                    <img src="${appURL}uploads/images/template/dp.png" class="profile-img" />
                    <h1>rick Tang</h1>
                    <div class="designation">Product Designer</div>
                </div>
                <table class="table-contact">
                    <tr>
                        <td><img src="${appURL}uploads/images/template/Location.png" /><span>San Francisco, California</span></td>
                        <td><img src="${appURL}uploads/images/template/Location.png" /><span>ricktang@gmail.com</span></td>
                        <td><img src="${appURL}uploads/images/template/Location.png" /><span>(315) 802-8179</span></td>
                    </tr>
                </table>
            </div>`;
            var html_closing=`<div class="cv-body">
            <table class="content-table">
                <tbody>
                    <tr>
                        <td class="label">Profile</td>
                        <td class="content">
                            UX/UI specialist focused on designing clean and functional projects across all platforms and 
                            devices in response to specific briefs and problems, while always maintaining a unique look and feel.
                        </td>
                    </tr>
                    <tr>
                        <td class="label">experience</td>
                        <td class="content">
                            <div class="subblock">
                                <h4>Uber</h4>
                                <h5>Product Designer</h5>
                                <h6>Mar 2015 - Present</h6>
                                <ul>
                                    <li>Designed safety-focused experiences for Riders and Drivers </li>
                                    <li>Physical space problem solving and it’s interaction with the digital</li>
                                    <li>Navigated organization to achieve operational improvements</li>
                                </ul>
                            </div>
                            <div class="subblock">
                                <h4>IFTTT </h4>
                                <h5>Product Designer</h5>
                                <h6>Dec 2013 - Mar 2015</h6>
                                <ul>
                                    <li>Product and system design for a complex product</li>
                                    <li>Designed both consumer and developer products for IFTTT</li>
                                    <li> Responsible for maintaining design across iOS, Android, and web</li>
                                </ul>
                            </div>
                            <div class="subblock">
                                <h4>Facebook</h4>
                                <h5>Product Designer</h5>
                                <h6>June 2013 - Sep 2013</h6>
                                <ul>
                                    <li>Designer and prototyped internal tools
                                    <li>Redesigned Newsfeed curation experience for mobile</li>
                                    <li>Redesigned Newsfeed curation experience for mobile</li>
                                </ul>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td class="label">Education</td>
                        <td class="content">  
                            <div class="item">
                                <h2>Brown University</h2>
                                <h3>Interdisciplinary studies, Sep 2010 - May 2013</h3>
                            </div>                          
                        </td>
                    </tr>
                    <tr>
                        <td class="label">Skills</td>
                        <td class="content">
                            <span class="pillow">Figma</span><span class="pillow">Sketch</span><span class="pillow">Photoshop</span><span class="pillow">Illustrator</span>
                        </td>
                    </tr>
                    <tr>
                        <td class="label">Languages</td>
                        <td class="content">
                            English: C2 <span class="seperator">|</span> Italian: B2
                        </td>
                    </tr>                    
                    <tr>
                        <td class="label">CERTIFICATIONS</td>
                        <td class="content">Google UX Design Certificate</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div><!-- ./wrapper -->

</body>

</html>`;
    return html_opening+html_closing;
}

async function convertHtmlToImage(file_name,html_code){
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

async function convertHtmlToPdf(file_name,template){
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
        },
        path: file_name, // you can pass path to save the file
      }

      htmlPDF.setOptions(options);
      try {
        await htmlPDF.create(template); 
        console.log('success')
        return true;
      } catch (error) {
        console.log('PuppeteerHTMLPDF error', error);
    }
}

async function convertPdfToImage(user_id,file_path){

    var images=[];
    var outputImages = pdf2img.convert('./'+file_path);
    console.log('output',outputImages)
    await outputImages.then(async function(outputImages) {
        console.log(outputImages)
        for (i = 0; i < outputImages.length; i++){
            var code=await utils.getRandomUniqueFiveDigitCode();
            var file_name="uploads/IMG_"+user_id+i+code+".png";
            await fs.writeFile(file_name, outputImages[i]);
            images.push(file_name);
        }
    });
    console.log(images)
    return images;
}

async function savePdfAndDownload(req,res){
    try{
        var body=req.body;
        var current_datetime= utils.current_datetime();
        //console.log('body',body, typeof(body), Object.keys(body).length)
        if(typeof(body)=='object' && Object.keys(body).length>0){
            var user_id=body.user_id ? body.user_id : '';
            var access_token=body.access_token ? body.access_token : '';
            var profile_pic=body.profile_pic ? body.profile_pic : '';
            var first_name=body.first_name ? body.first_name : '';
            var last_name=body.last_name ? body.last_name : '';
            var address=body.address ? body.address : '';
            var username=first_name+' '+last_name;
            var email=body.email ? body.email : '';
            var skill=body.skill ? body.skill : [];
            var certificate=body.certificate ? body.certificate : [];
            var objective=body.objective ? body.objective : '';
            var experience=body.experience ? body.experience : [];
            var education=body.education ? body.education : [];
            var language=body.language ? body.language : [];
            var additional_feature=body.additional_feature ? body.additional_feature : [];
            var other_contact=body.other_contact ? body.other_contact : '';
            var profile_flag_status=false;
            var skill_flag_status=false;
            var certificate_flag_status=false;
            var experience_flag_status=false;
            var education_flag_status=false;
            var language_flag_status=false;
            var additional_feature_flag_status=false;
            var objective_flag_status=false;
            var template_id=body.template_id ? body.template_id : '';
            var color_code=body.color_code ? body.color_code : '';
            var id=body.id ? body.id : '';
            console.log(skill)
            if(profile_pic!=''){
                profile_pic=baseURLProfilePic+profile_pic;
                profile_flag_status=true;
            }
            if(skill.length>0){
                skill_flag_status=true;
            }
            if(certificate.length>0){
                certificate_flag_status=true;
            }
            if(experience.length>0){
                experience_flag_status=true;
            }
            if(education.length>0){
                education_flag_status=true;
            }
            if(language.length>0){
                language_flag_status=true;
            }
            if(additional_feature.length>0){
                additional_feature_flag_status=true;
            }
            if(objective!=''){
                objective_flag_status=true;
            }
            if(template_id!=''){
                var check_user_data=await queries.checkUserData(user_id,access_token)
                if(check_user_data.length>0){
                    console.log(typeof template_id)
                    let html_code='';
                    let template_available_flag=false;
                    if(template_id==1){
                        html_code=await template1(color_code,username,profile_flag_status,profile_pic,address,email,other_contact,skill_flag_status,skill,certificate_flag_status,certificate,objective_flag_status,objective,experience_flag_status,experience,education_flag_status,education,language_flag_status,language,additional_feature_flag_status,additional_feature);
                        template_available_flag=true;
                    }else if(template_id==2){
                        html_code=await template2(color_code,username,profile_flag_status,profile_pic,address,email,other_contact,skill_flag_status,skill,certificate_flag_status,certificate,objective_flag_status,objective,experience_flag_status,experience,education_flag_status,education,language_flag_status,language,additional_feature_flag_status,additional_feature);
                        template_available_flag=true;
                    }else if(template_id==3){
                        html_code=await template3(color_code,username,profile_flag_status,profile_pic,address,email,other_contact,skill_flag_status,skill,certificate_flag_status,certificate,objective_flag_status,objective,experience_flag_status,experience,education_flag_status,education,language_flag_status,language,additional_feature_flag_status,additional_feature);
                        template_available_flag=true;
                    }else if(template_id==4){
                        html_code=await template4(color_code,username,profile_flag_status,profile_pic,address,email,other_contact,skill_flag_status,skill,certificate_flag_status,certificate,objective_flag_status,objective,experience_flag_status,experience,education_flag_status,education,language_flag_status,language,additional_feature_flag_status,additional_feature);
                        template_available_flag=true;
                    }else if(template_id==5){
                        html_code=await template5(color_code,username,profile_flag_status,profile_pic,address,email,other_contact,skill_flag_status,skill,certificate_flag_status,certificate,objective_flag_status,objective,experience_flag_status,experience,education_flag_status,education,language_flag_status,language,additional_feature_flag_status,additional_feature);
                        template_available_flag=true;
                    }else if(template_id==6){
                        html_code=await template6(color_code,username,profile_flag_status,profile_pic,address,email,other_contact,skill_flag_status,skill,certificate_flag_status,certificate,objective_flag_status,objective,experience_flag_status,experience,education_flag_status,education,language_flag_status,language,additional_feature_flag_status,additional_feature);
                        template_available_flag=true;
                    }else if(template_id==7){
                        html_code=await template7(color_code,username,profile_flag_status,profile_pic,address,email,other_contact,skill_flag_status,skill,certificate_flag_status,certificate,objective_flag_status,objective,experience_flag_status,experience,education_flag_status,education,language_flag_status,language,additional_feature_flag_status,additional_feature);
                        template_available_flag=true;
                    }
                    if(template_available_flag){
                        console.log(html_code);
                        var random_code=await utils.getRandomUniqueFiveDigitCode();
                        var set_file_name='doc'+user_id+random_code+'.pdf';
                        var file_path='uploads/'+set_file_name;
                        var htmltopdf=await convertHtmlToPdf(file_path,html_code);
                        //console.log(htmltopdf)
                        if(htmltopdf){
                            var pdftoimage=await convertPdfToImage(user_id,file_path);
                            console.log('pdf to image ',pdftoimage);
                            let data_saved_status=false;
                            if(id!=''){
                                //update to db
                                var update_data=await queries.updateCvData(id,current_datetime,user_id,set_file_name,file_path,JSON.stringify(pdftoimage),JSON.stringify(body));
                                console.log(update_data);
                                if(update_data.affectedRows>0){
                                    data_saved_status=true;
                                }
                            }else{
                                //save to db
                                var save_data=await queries.saveCvData(current_datetime,user_id,set_file_name,file_path,JSON.stringify(pdftoimage),JSON.stringify(body));
                                console.log(save_data)
                                if(save_data>0){
                                    data_saved_status=true;
                                }
                            }
                            
                            if(data_saved_status){
                                var preview_images=[];
                                for(var i=0; i<pdftoimage.length; i++){
                                    if(pdftoimage[i]!=''){
                                        preview_images.push(appURL+pdftoimage[i]);
                                    }
                                }
                                res.json({
                                    status: true,
                                    statuscode: 200,
                                    message: "success",
                                    data: {
                                        file_path: appURL+file_path,
                                        image_path: preview_images
                                    }
                                });

                                //delete the preview files
                                var get_temporary_files=await queries.getTemporaryData(user_id);
                                console.log(get_temporary_files)
                                for(var file_i=0; file_i<get_temporary_files.length; file_i++){
                                    if(get_temporary_files[file_i]!=''){
                                        try{
                                            let check_file_exist=fileSystem.existsSync(get_temporary_files[file_i]['path'])
                                            if(check_file_exist){
                                                await fs.unlink(get_temporary_files[file_i]['path'])
                                            }
                                            //delete user's temporary preview file
                                            let delete_temporary_data=await queries.deleteTemporaryFiles(user_id);
                                            console.log(delete_temporary_data)
                                        }catch(file_delete_error){
                                            console.log('file delete section error ',file_delete_error);
                                        }
                                    }
                                }
                            }else{
                                res.json({
                                    status: false,
                                    statuscode: 400,
                                    message: "Not saved to db",
                                    data: {}
                                });
                            }
                        }else{
                            res.json({
                                status: false,
                                statuscode: 200,
                                message: 'Unable to generate PDF file',
                                data: {}
                            });
                        }
                    }else{
                        res.json({
                            status: false,
                            statuscode: 200,
                            message: "Template id doesn't available",
                            data: {}
                        });
                    }
                }else{
                    res.json({
                        status: false,
                        statuscode: 200,
                        message: 'No user data found',
                        data: {}
                    });
                }
            }else{
                res.json({
                    status: false,
                    statuscode: 200,
                    message: 'Please provide template id',
                    data: {}
                })
            }
            
        }else{
            res.json({
                status: false,
                statuscode: 400,
                message: 'Input data is missing',
                data: {}
            });
        }
        // let save=await queries.saveCvData(JSON.stringify(req.body));
        // res.json({status:true,data:req.body});
    }catch(e){
        console.log(`Error occurs in generate pdf and image function ${e}`)
        res.json({
            status: false,
            statuscode: 400,
            message: `Error occurs in generate pdf and image function ${e}`,
            data: {}
        });
    }
    
}


module.exports={
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
    convertPdfToImage,
    savePdfAndDownload
}