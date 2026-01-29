import { axiosClient } from './axiosClient';

export async function fetchAllCategories() {
  const res = await axiosClient.get('/categories/all');
  return res.data;
}