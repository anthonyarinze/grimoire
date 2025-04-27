import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { FirebaseError } from "firebase/app"; // Import FirebaseError for proper error handling
import { app } from "../firebase";
import { errorNotifier, successNotifier } from "../notifications";

const auth = getAuth(app);

interface User {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
}

// Define the shape of the authentication state
interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null; // Store only the error message instead of an object
}

// Initial state
const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
};

// **Async Thunks for Authentication**
export const signInWithGoogle = createAsyncThunk(
  "auth/googleSignIn",
  async (_, { rejectWithValue }) => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const { uid, email, displayName, photoURL } = result.user;
      successNotifier("Login successful! Redirecting to home...");
      return { uid, email, displayName, photoURL };
    } catch (error: unknown) {
      if (error instanceof FirebaseError) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue("An unknown error occurred.");
    }
  }
);

export const signInWithEmail = createAsyncThunk(
  "auth/emailSignIn",
  async (
    { email, password }: { email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      const { uid, email: userEmail, displayName, photoURL } = result.user;
      successNotifier("Login successful! Redirecting to home...");
      return { uid, email: userEmail, displayName, photoURL };
    } catch (error: unknown) {
      if (error instanceof FirebaseError) {
        return rejectWithValue(error.message);
        errorNotifier("Error signing in. Please try again.");
      }
      errorNotifier("Error signing in. Please try again.");
      return rejectWithValue("An unknown error occurred.");
    }
  }
);

export const signUpWithEmail = createAsyncThunk(
  "auth/emailSignUp",
  async (
    { email, password }: { email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const { uid, email: userEmail, displayName, photoURL } = result.user; // Extract only serializable fields
      successNotifier("Sign up successful! Redirecting to home...");
      return { uid, email: userEmail, displayName, photoURL };
    } catch (error: unknown) {
      if (error instanceof FirebaseError) {
        errorNotifier("Error signing up. Please try again.");
        return rejectWithValue(error.message);
      }
      errorNotifier("Error signing up. Please try again.");
      return rejectWithValue("An unknown error occurred.");
    }
  }
);

export const logout = createAsyncThunk("auth/logout", async () => {
  await signOut(auth);
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<User | null>) {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signInWithGoogle.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signInWithGoogle.fulfilled, (state, action) => {
        state.loading = false;
        state.user = {
          uid: action.payload.uid,
          email: action.payload.email,
          displayName: action.payload.displayName,
          photoURL: action.payload.photoURL,
        };
      })
      .addCase(signInWithGoogle.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(signInWithEmail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signInWithEmail.fulfilled, (state, action) => {
        state.loading = false;
        state.user = {
          uid: action.payload.uid,
          email: action.payload.email,
          displayName: action.payload.displayName,
          photoURL: action.payload.photoURL,
        };
      })
      .addCase(signInWithEmail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(signUpWithEmail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signUpWithEmail.fulfilled, (state, action) => {
        state.loading = false;
        state.user = {
          uid: action.payload.uid,
          email: action.payload.email,
          displayName: action.payload.displayName,
          photoURL: action.payload.photoURL,
        };
      })
      .addCase(signUpWithEmail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
      });
  },
});

export const { setUser } = authSlice.actions;
export default authSlice.reducer;
