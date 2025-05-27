import axios from 'axios';
import { FindRandomComment, InstaPost, ResponseType, Userlist } from '@/types';

const API_BASE_URL = '/api'; // !Global
// const API_BASE_URL = 'http://sud-upload-file.garant.uz/api'; //? Lokal
// const API_BASE_URL = 'http://10.100.104.104:9505/api'; //? Lokal

// API functions
export const api = {
  // Fetch comments for a post
  async getPostComments(postId: string): Promise<ResponseType<InstaPost>> {
    try {
      const response = await axios.get(`${API_BASE_URL}/post/show/${postId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching post comments:', error);
      throw error;
    }
  },
  
  // Select a random winner
  async selectRandomWinner(postId: string): Promise<ResponseType<FindRandomComment>> {
    try {
      const response = await axios.get(`${API_BASE_URL}/post/random/${postId}`);
      return response.data;
    } catch (error) {
      console.error('Error selecting random winner:', error);
      throw error;
    }
  },

  // Toggle Block user
  async blockUserComment(userId: number, commentId: number): Promise<ResponseType<string>> {
    try {
      const response = await axios.get(`${API_BASE_URL}/post/user/blocked/${userId}/comment/${commentId}`);
      return response.data;
    } catch (error) {
      console.error('Error selecting random winner:', error);
      throw error;
    }
  },
  
  // Blocked users list
  async blockedUsersList(shortCard: string): Promise<ResponseType<Userlist[]>> {
    try {
      const response = await axios.get(`${API_BASE_URL}/post/show/blocked/${shortCard}`); 
      return response.data;
    } catch (error) {
      console.error('Error selecting random winner:', error);
      throw error;
    }
  },

  // Winners user list
  async winnersUserList(shortCard: string): Promise<ResponseType<Userlist[]>> {
    try {
      const response = await axios.get(`${API_BASE_URL}/post/show/winner/${shortCard}`); 
        return response.data;
      } catch (error) {
        console.error('Error selecting random winner:', error);
        throw error;
      }
    },

    // add winner
  async addWinner({post_id, instagram_user_id, comment_id}: { post_id: number, instagram_user_id: number, comment_id: number }): Promise<ResponseType<string>> {
    try {
      const response = await axios.post(`${API_BASE_URL}/post/add/winner`, {post_id, instagram_user_id, comment_id}); 
        return response.data;
      } catch (error) {
        console.error('Error selecting random winner:', error);
        throw error;
      }
    }  
};