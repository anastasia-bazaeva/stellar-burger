import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialAuth = {
    isAuthChecked: false,
    user: null,
    hasError: false,
    
}