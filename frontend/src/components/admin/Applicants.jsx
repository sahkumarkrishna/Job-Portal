import React, { useEffect } from 'react';
import Navbar from '../shared/Navbar';
import ApplicantsTable from './ApplicantsTable';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setAllApplicants } from '@/redux/applicationSlice';

// ✅ Accessing .env variable
const APPLICATION_API = import.meta.env.VITE_APPLICATION_API;

const Applicants = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const { applicants } = useSelector((store) => store.application);

  useEffect(() => {
    const fetchAllApplicants = async () => {
      try {
        const res = await axios.get(`${APPLICATION_API}/${params.id}/applicants`, {
          withCredentials: true,
        });
        dispatch(setAllApplicants(res.data.job));
      } catch (error) {
        console.log(error);
      }
    };

    fetchAllApplicants();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <h1 className="font-bold text-2xl sm:text-3xl mb-6">
          Applicants ({applicants?.applications?.length || 0})
        </h1>
        <div className="overflow-x-auto">
          <ApplicantsTable />
        </div>
      </div>
    </div>
  );
};

export default Applicants;
