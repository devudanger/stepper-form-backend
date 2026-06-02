const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = require("../config/db");
const FormConfig = require("../models/FormConfig");

const seedConfig = async () => {
  try {
    await connectDB();

    await FormConfig.deleteMany();

    await FormConfig.create({
      title: "Employee Onboarding",

      steps: [
        {
          title: "Personal Information",

          fields: [
            {
              name: "fullName",
              label: "Full Name",
              type: "text",
              placeholder: "Enter your full name",
              required: true,
            },

            {
              name: "email",
              label: "Email Address",
              type: "text",
              placeholder: "Enter your Email",
              required: true,
            },

            {
              name: "gender",
              label: "Gender",
              type: "radio",
              required: true,
              options: ["Male", "Female", "Other"],
            },
          ],
        },

        {
          title: "Professional Details",

          fields: [
            {
              name: "experience",
              label: "Experience Level",
              placeholder: "Select your experience",
              type: "select",
              required: true,
              options: ["Fresher", "1-3 Years", "3-5 Years", "5+ Years"],
            },

            {
              name: "preferredRole",
              label: "Preferred Role",
              type: "select",
              placeholder: "Select your Preferred role",
              required: true,
              options: [
                "Frontend Developer",
                "Backend Developer",
                "Full Stack Developer",
                "UI/UX Designer",
              ],
            },

            {
              name: "skills",
              label: "Primary Skills",
              placeholder: "Enter skills you have expertise in",
              type: "text",
              required: true,
            },
          ],
        },

        {
          title: "Additional Information",

          fields: [
            {
              name: "workMode",
              label: "Preferred Work Mode",
              type: "radio",
              required: true,
              options: ["Remote", "Hybrid", "Onsite"],
            },

            {
              name: "currentLocation",
              label: "Current Location",
              type: "text",
              placeholder: "Enter your city with state",
              required: true,
            },

            {
              name: "bio",
              label: "Short Bio",
              type: "text",
              placeholder: "Write what can grab our attention ",
              required: false,
            },
          ],
        },
      ],
    });

    console.log("Form Config Seeded");

    process.exit();
  } catch (error) {
    console.log(error);

    process.exit(1);
  }
};

seedConfig();
