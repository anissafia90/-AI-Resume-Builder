import axios from "axios";

const API_KEY = import.meta.env.VITE_STRAPI_API_KEY;

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL + "/api",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${API_KEY}`,
  },
});

// CREATE
const CreateNewResume = (data) => axiosClient.post("/user-resumes", data);

// GET all resumes for user
const GetUserResumes = (UserEmail) =>
  axiosClient.get("/user-resumes?filters[UserEmail][$eq]=" + UserEmail);

// UPDATE (id must be numeric!)
const UpdateResumeDetail = (id, data) =>
  axiosClient.put("/user-resumes/" + id, data);

const GetResumeByDocumentId = (documentId) =>
  axiosClient.get(
    `/user-resumes?filters[documentId][$eq]=${documentId}&populate=*`
  );

// GET by numeric id
const GetResumeById = (id) =>
  axiosClient.get("/user-resumes/" + id + "?populate=*");

// DELETE
const DeleteResumeById = (id) => axiosClient.delete("/user-resumes/" + id);

export default {
  CreateNewResume,
  GetUserResumes,
  UpdateResumeDetail,
  GetResumeById,
  DeleteResumeById,
  GetResumeByDocumentId,
};
