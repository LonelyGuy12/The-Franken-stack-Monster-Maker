import axios from 'axios';
import type { HeadData } from '../types';

export async function fetchHeadData(): Promise<HeadData> {
  try {
    const response = await axios.get('https://randomuser.me/api/');
    const user = response.data.results[0];
    
    return {
      name: `${user.name.first} ${user.name.last}`,
      gender: user.gender,
      email: user.email,
      picture: user.picture.large,
      location: `${user.location.city}, ${user.location.country}`
    };
  } catch (error) {
    console.error('Failed to fetch head data from randomuser.me:', error);
    throw new Error('Could not assemble the head');
  }
}
