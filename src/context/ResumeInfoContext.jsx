import { createContext, useState } from "react";

const defaultResume = {
  Title: "",
  FirstName: "",
  LastName: "",
  Email: "",
  Phone: "",
  Summary: "",
  Experience: [],
  Education: [],
  Skills: [],
};

export const ResumeInfoContext = createContext({
  resumeInfo: defaultResume,
  setResumeInfo: () => {},
});
