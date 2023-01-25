import { TypedUseSelectorHook, useDispatch as reduxUseDispatch, useSelector as reduxUseSelector } from "react-redux";
import { TAppDispatch, TRootState } from "../services/reducers/store";

export const useDispatch = () => reduxUseDispatch<TAppDispatch>();
export const useSelector: TypedUseSelectorHook<TRootState> = reduxUseSelector;