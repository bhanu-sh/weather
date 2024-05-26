import React, { useRef } from "react";
import emailjs from "@emailjs/browser";
import toast from "react-hot-toast";

export const ContactUs = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm("service_e0o8amw", "template_re5ctdy", form.current, {
        publicKey: "nteq2RQV0UXjnw0j5",
      })
      .then(
        () => {
          console.log("SUCCESS!");
          toast.success("Email sent successfully!");
          console.log(form.current);
        },
        (error) => {
          console.log("FAILED...", error.text);
          toast.error("Failed to send email!");
        }
      );
  };

  return (
    <form ref={form} onSubmit={sendEmail}>
      <label>Name</label>
      <input type="text" name="name" />
      <label>Email</label>
      <input type="text" name="email" />
      <label>Message</label>
      <textarea name="message" />
      <input type="submit" value="Send" />
    </form>
  );
};
