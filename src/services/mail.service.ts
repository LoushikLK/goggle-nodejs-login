import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.SERVICE_EMAIL,
    pass: process.env.EMAIL_SERVICE_PASSWORD,
  },
});

const htmlTemplet = (html?: string) => `<!DOCTYPE html>
  <html lang="en">
  
  <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Chhattisgarh Lac Portal</title>
      <link rel="preconnect" href="https://fonts.googleapis.com">
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
      <link href="https://fonts.googleapis.com/css2?family=Lato&family=Sacramento&display=swap" rel="stylesheet">
      <style>
          * {
              padding: 0%;
              margin: 0%;
              box-sizing: border-box;
              font-family: Arial, Helvetica, sans-serif;
              text-decoration: none;
              border: none !important;
          }
  
          .container {
              width: 100%;
              padding: 0.5rem;
          }
  
          .table_one {
              height: 100%;
              width: 100%;
              background-color: white;
              padding-top: 1rem;
              padding-bottom: 1rem;
          }
  
          table {
              border-collapse: collapse;
          }
  
          .img_one {
              width: 15rem;
              margin-left: 2rem;
          }
  
          #td_2 {
              float: right;
              margin-right: 2rem;
              background-color: #22b7cb;
              color: white;
              padding: 10px;
          }
  
          #td_3 {
              background: #000;
              width: 100%;
              height: 1px;
          }
  
          #td_3 p {
              font-size: 1px;
          }
  
          .td_5 {
              float: left;
              padding-left: 2rem;
              padding-top: 1rem;
              padding-bottom: 0.5rem;
          }
  
          .td_4 {
              padding-left: 2rem;
              padding-top: 1rem;
              padding-bottom: 0.5rem;
          }
  
          #td_6 {
              padding-left: 2rem;
              padding-bottom: 0.5rem;
              color: #22b7cb;
          }
  
          #td_7 {
              float: left;
              padding-left: 2rem;
              padding-bottom: 0.5rem;
              color: #22b7cb;
          }
  
          #td_8 {
              padding-left: 2rem;
              padding-bottom: 0.5rem;
          }
  
          #td_9 {
              float: left;
              padding-left: 2rem;
              padding-bottom: 0.5rem;
          }
  
          #td_10 {
              padding-left: 2rem;
              padding-bottom: 0.5rem;
          }
  
          #td_11 {
              float: left;
              padding-left: 2rem;
              padding-bottom: 0.5rem;
          }
  
          #td_12 {
              padding-left: 2rem;
              padding-bottom: 0.5rem;
          }
  
          #td_13 {
              float: left;
              padding-left: 2rem;
              padding-bottom: 0.5rem;
          }
  
          #td_17 {
              padding-left: 2rem;
              padding-bottom: 0.5rem;
              padding-top: 0.5rem;
          }
  
          #td_19 {
              padding-left: 2rem;
              padding-bottom: 0.5rem;
          }
  
          #td_18 {
              float: left;
              padding-left: 2rem;
              padding-bottom: 0.5rem;
              padding-top: 0.5rem;
          }
  
          #td_14 {
              padding-left: 2rem;
              padding-bottom: 1rem;
              padding-top: 1rem;
          }
  
          #td_15 {
              float: left;
              padding-left: 2rem;
              padding-bottom: 1rem;
              padding-top: 1rem;
          }
  
          #td_16 {
              background-color: black;
              width: 100%;
              width: 1px;
              font-size: 1px;
          }
  
          .table_two {
              height: 100%;
              width: 100%;
              background-color: white;
              padding-top: 1rem;
              padding-bottom: 1rem;
          }
  
          .description {
              width: 40%;
          }
  
          #td-1 {
              padding-left: 2rem;
              padding-top: 0.5rem;
              padding-bottom: 0.5rem;
              background: #22b7cb;
              color: white;
              text-align: start;
          }
  
          #td-2 {
              padding-left: 2rem;
              padding-top: 0.5rem;
              padding-bottom: 0.5rem;
              background: #22b7cb;
              color: white;
              text-align: start;
          }
  
          #td-3 {
              padding-left: 2rem;
              padding-top: 0.5rem;
              padding-bottom: 0.5rem;
              background: #22b7cb;
              color: white;
              text-align: start;
          }
  
          #td-4 {
              padding-left: 2rem;
              padding-top: 0.5rem;
              padding-bottom: 0.5rem;
              background: #22b7cb;
              color: white;
              text-align: start;
          }
  
          #td-5 {
              padding-left: 2rem;
              padding-top: 0.5rem;
              padding-bottom: 0.5rem;
              background: #22b7cb;
              color: white;
              text-align: start;
          }
  
          .img_two {
              height: 2.5rem;
              width: 2.5rem;
          }
  
          #td-6 {
              padding-left: 2rem;
              padding-top: 0.5rem;
              padding-bottom: 0.5rem;
          }
  
          #td-7 {
              padding-left: 2rem;
              padding-top: 0.5rem;
              padding-bottom: 0.5rem;
          }
  
          #td-8 {
              padding-left: 2rem;
              padding-top: 0.5rem;
              padding-bottom: 0.5rem;
          }
  
          #td-9 {
              padding-left: 2rem;
              padding-top: 0.5rem;
              padding-bottom: 0.5rem;
          }
  
          #td-10 {
              padding-left: 2rem;
              padding-top: 0.5rem;
              padding-bottom: 0.5rem;
          }
  
          #td-11 {
              padding-left: 2rem;
              padding-top: 0.5rem;
              padding-bottom: 0.5rem;
          }
  
          #td-12 {
              padding-left: 2rem;
              padding-top: 0.5rem;
              padding-bottom: 0.5rem;
          }
  
          #td-13 {
              padding-left: 2rem;
              padding-top: 0.5rem;
              padding-bottom: 0.5rem;
          }
  
          #td-14 {
              padding-left: 2rem;
              padding-top: 0.5rem;
              padding-bottom: 0.5rem;
          }
  
          #td-15 {
              padding-left: 2rem;
              padding-top: 0.5rem;
              padding-bottom: 0.5rem;
          }
  
          .border {
              background: #000;
              width: 100%;
              height: 1px;
              font-size: 1px;
          }
  
          .heading {
              background: #22b7cb;
          }
  
          .table_head {
              padding-left: 2rem;
              text-align: start;
          }
  
          .table_three {
              width: 100%;
          }
  
          .headId {
              width: 70%;
          }
  
          .table_body {
              padding-left: 2rem;
              padding-top: 0.5rem;
          }
  
          .table_span {
              padding: 5px;
              border: 1px solid black;
          }
  
          #sign {
              text-align: end;
              padding-top: 7rem;
              padding-bottom: 1rem;
              padding-right: 2rem;
          }
  
          .button-warper {
              white-space: nowrap;
              padding-top: 0.5rem 1rem;
          }
      </style>
  </head>
  
  <body>
      <div style="width: 100%;max-width:720px;margin:auto; background-color: rgb(238,238,238);">
          <table style="width: 100%; ">
              <tr style="
                        width: 100%;
                        text-align: center;
                        background-color: #ffebf5;
                      ">
                  <td style="width: 100%; padding: 1rem;text-align:start">
                      <!-- <div style="text-align: start"> -->
                      <img src="${process.env.WHITE_LOGO_URL}" alt="${process.env.APP_NAME}"
                          style="width: 100%; max-width: 180px" />
  
                      <!-- </div> -->
                  </td>
                  <td style="
                          background-color: transparent;
                          border-color: transparent;
                          padding: 1rem;
                        ">
                      <div class="button-warper">
                          <a href="${process.env.WEBSITE_END_POINT}" target="_blank" style="
                              padding: 0.7rem 3rem;
                              background-color: #400524;
                              border-radius: 0.5rem;
                              border: 1px solid white;
                              float: right;
                              font-weight: 900;
                              margin-top: 1rem;
                              color: white;
                            ">
                              Login
                          </a>
                      </div>
                  </td>
              </tr>
              <tr style="width: 100%; height: 18rem">
                  <td colspan="2" style="padding: 1rem">
                      ${html}
                  </td>
              </tr>
              <tr style="width:100%;">
                  <td colspan="2"
                      style="text-align:center ; padding: 1rem; background-color: rgb(228,228,237); color: rgb(113, 113, 113);">
                      <div>
                          <a href="${process.env.TWITTER_LINK}" target="_blank" style="height: 100% ; width: 100%;">
  
  
                              <svg stroke="currentColor" fill="#00acee" strokeWidth="0" viewBox="0 0 1024 1024"
                                  height="2.5rem" width="2.5rem">
                                  <path
                                      d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm215.3 337.7c.3 4.7.3 9.6.3 14.4 0 146.8-111.8 315.9-316.1 315.9-63 0-121.4-18.3-170.6-49.8 9 1 17.6 1.4 26.8 1.4 52 0 99.8-17.6 137.9-47.4-48.8-1-89.8-33-103.8-77 17.1 2.5 32.5 2.5 50.1-2a111 111 0 0 1-88.9-109v-1.4c14.7 8.3 32 13.4 50.1 14.1a111.13 111.13 0 0 1-49.5-92.4c0-20.7 5.4-39.6 15.1-56a315.28 315.28 0 0 0 229 116.1C492 353.1 548.4 292 616.2 292c32 0 60.8 13.4 81.1 35 25.1-4.7 49.1-14.1 70.5-26.7-8.3 25.7-25.7 47.4-48.8 61.1 22.4-2.4 44-8.6 64-17.3-15.1 22.2-34 41.9-55.7 57.6z" />
                              </svg>
  
  
                          </a>
                          <a href="${process.env.LINKED_IN}" target="_blank" style="text-decoration: none; margin: .2rem;   ">
  
                              <svg stroke="currentColor" fill=" #0e76a8" stroke-width="0" viewBox="0 0 1024 1024"
                                  height="2.5rem" width="2.5rem" xmlns="http://www.w3.org/2000/svg">
                                  <path
                                      d="M880 112H144c-17.7 0-32 14.3-32 32v736c0 17.7 14.3 32 32 32h736c17.7 0 32-14.3 32-32V144c0-17.7-14.3-32-32-32zM349.3 793.7H230.6V411.9h118.7v381.8zm-59.3-434a68.8 68.8 0 1 1 68.8-68.8c-.1 38-30.9 68.8-68.8 68.8zm503.7 434H675.1V608c0-44.3-.8-101.2-61.7-101.2-61.7 0-71.2 48.2-71.2 98v188.9H423.7V411.9h113.8v52.2h1.6c15.8-30 54.5-61.7 112.3-61.7 120.2 0 142.3 79.1 142.3 181.9v209.4z">
                                  </path>
                              </svg>
  
                          </a>
                          <a href="${process.env.FACEBOOK}" target="_blank" style="text-decoration: none; margin: .2rem ">
  
                              <svg stroke="currentColor" fill="#3b5998" stroke-width="0" viewBox="0 0 1024 1024"
                                  height="2.5rem" width="2.5rem" xmlns="http://www.w3.org/2000/svg">
                                  <path
                                      d="M880 112H144c-17.7 0-32 14.3-32 32v736c0 17.7 14.3 32 32 32h736c17.7 0 32-14.3 32-32V144c0-17.7-14.3-32-32-32zm-92.4 233.5h-63.9c-50.1 0-59.8 23.8-59.8 58.8v77.1h119.6l-15.6 120.7h-104V912H539.2V602.2H434.9V481.4h104.3v-89c0-103.3 63.1-159.6 155.3-159.6 44.2 0 82.1 3.3 93.2 4.8v107.9z">
                                  </path>
                              </svg>
  
  
                          </a>
                          <a href="${process.env.INSTAGRAM}" target="_blank" style="text-decoration: none; margin: .2rem; ">
  
                              <svg stroke="currentColor" fill="#e95950" stroke-width="0" viewBox="0 0 1024 1024"
                                  height="2.5rem" width="2.5rem" xmlns="http://www.w3.org/2000/svg">
                                  <path
                                      d="M512 378.7c-73.4 0-133.3 59.9-133.3 133.3S438.6 645.3 512 645.3 645.3 585.4 645.3 512 585.4 378.7 512 378.7zM911.8 512c0-55.2.5-109.9-2.6-165-3.1-64-17.7-120.8-64.5-167.6-46.9-46.9-103.6-61.4-167.6-64.5-55.2-3.1-109.9-2.6-165-2.6-55.2 0-109.9-.5-165 2.6-64 3.1-120.8 17.7-167.6 64.5C132.6 226.3 118.1 283 115 347c-3.1 55.2-2.6 109.9-2.6 165s-.5 109.9 2.6 165c3.1 64 17.7 120.8 64.5 167.6 46.9 46.9 103.6 61.4 167.6 64.5 55.2 3.1 109.9 2.6 165 2.6 55.2 0 109.9.5 165-2.6 64-3.1 120.8-17.7 167.6-64.5 46.9-46.9 61.4-103.6 64.5-167.6 3.2-55.1 2.6-109.8 2.6-165zM512 717.1c-113.5 0-205.1-91.6-205.1-205.1S398.5 306.9 512 306.9 717.1 398.5 717.1 512 625.5 717.1 512 717.1zm213.5-370.7c-26.5 0-47.9-21.4-47.9-47.9s21.4-47.9 47.9-47.9 47.9 21.4 47.9 47.9a47.84 47.84 0 0 1-47.9 47.9z">
                                  </path>
                              </svg>
  
                          </a>
                      </div>
                      <h3 style="text-align: center; padding: 1rem;">${process.env.PHONE_NUMBER}</h3>
                      <p>Copyright © 2022 ${process.env.APP_NAME}</p>
                  </td>
              </tr>
  
  
          </table>
          <div style="width: 100%; text-align: center; padding: 2rem;">
              <p style="color: rgb(113, 113, 113) ;">${process.env.APP_NAME}</p>
              <p style="color: rgb(113, 113, 113) ;">${process.env.ADDRESS}</p>
          </div>
          <div style="width: 100%; text-align: center; padding: 2rem;">
              <p style="color: rgb(113, 113, 113) ; font-size: 12px;">You're receiving this email because you
                  signed up for a ${process.env.APP_NAME}
                  account.</p>
          </div>
      </div>
  </body>
  
  </html>`;

export async function sendEmail({
  to,
  subject,
  text,
}: {
  to: string;
  subject: string;
  text: string;
}): Promise<void> {
  return new Promise((resolve, reject) => {
    try {
      const mailOptions = {
        from: process.env.EMAIL,
        to,
        subject,
        html: htmlTemplet(text),
      };

      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          reject(error);
        } else {
          resolve();
        }
      });
    } catch (error) {
      reject(error);
    }
  });
}
