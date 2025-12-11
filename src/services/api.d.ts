import type { AxiosInstance, AxiosResponse } from 'axios';
import type { User } from '@supabase/supabase-js';

declare const api: AxiosInstance;

export function setAuthHeaders(user: User | null): void;

export interface Workout {
  _id: string;
  name: string;
  date?: string;
  createdAt?: string;
  duration?: number;
  caloriesBurned?: number;
  [key: string]: any;
}

export interface Exercise {
  _id: string;
  name: string;
  category: string;
  muscleGroups: string[];
  difficulty: string;
  equipment: string;
  description: string;
  [key: string]: any;
}

export interface Progress {
  _id: string;
  [key: string]: any;
}

export interface ApiResponse<T> {
  data: {
    data: T;
    [key: string]: any;
  };
  [key: string]: any;
}

export const workoutsAPI: {
  getAll: () => Promise<ApiResponse<Workout[]>>;
  getById: (id: string) => Promise<ApiResponse<Workout>>;
  create: (data: any) => Promise<ApiResponse<Workout>>;
  update: (id: string, data: any) => Promise<ApiResponse<Workout>>;
  delete: (id: string) => Promise<ApiResponse<void>>;
};

export const exercisesAPI: {
  getAll: (params?: any) => Promise<ApiResponse<Exercise[]>>;
  getById: (id: string) => Promise<ApiResponse<Exercise>>;
  create: (data: any) => Promise<ApiResponse<Exercise>>;
  update: (id: string, data: any) => Promise<ApiResponse<Exercise>>;
  delete: (id: string) => Promise<ApiResponse<void>>;
};

export const progressAPI: {
  getAll: (params?: any) => Promise<ApiResponse<Progress[]>>;
  getStats: (params?: any) => Promise<ApiResponse<any>>;
  create: (data: any) => Promise<ApiResponse<Progress>>;
  update: (id: string, data: any) => Promise<ApiResponse<Progress>>;
};

export const usersAPI: {
  getProfile: () => Promise<ApiResponse<any>>;
  updateProfile: (data: any) => Promise<ApiResponse<any>>;
  getStats: () => Promise<ApiResponse<any>>;
};

export default api;

