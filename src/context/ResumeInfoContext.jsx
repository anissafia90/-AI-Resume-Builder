const defaultResume = {
  Experience: [],
  Education: [],
  Skills: [],
  // ...
};

export const ResumeInfoContext = createContext();

export const ResumeInfoProvider = ({ children }) => {
  const [resumeInfo, setResumeInfo] = useState(defaultResume);

  return (
    <ResumeInfoContext.Provider value={{ resumeInfo, setResumeInfo }}>
      {children}
    </ResumeInfoContext.Provider>
  );
};
