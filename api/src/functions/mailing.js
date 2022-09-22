export const notifyMail = async (emails) => {
  console.log(emails)

  var postmark = require("postmark");

  // Send an email:


  var client = new postmark.ServerClient('735360f3-82d0-4e10-8634-571baadcab6b');


  client.sendEmail({
    "From": "aca@stuntcoders.com",
    "To": emails,
    "Subject": "Hello from Todo-App!",
    "HtmlBody": "<strong>Hello</strong> dear Todo-App user. Your reset code is : ",
    "TextBody": "Hello from Postmark!",
    "MessageStream": "outbound"
  });

}
