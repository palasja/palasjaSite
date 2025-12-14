import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {} from '../withTypes';
import { ArtileAction, SoftInfo } from '../../helpers/contractTypes';
import { RootState } from '../store';

interface SoftState {
  changingSoft: SoftInfo | undefined;
  actionArticle: ArtileAction;
  chosenSoftId: string | undefined;
  choosenArticleId: string | undefined;
}

const initialState: SoftState = {
  changingSoft: undefined,
  actionArticle: 'show',
  chosenSoftId: undefined,
  choosenArticleId: undefined,
};

const softSlice = createSlice({
  name: 'soft',
  initialState: initialState,
  reducers: {
    changeSoft(state, action: PayloadAction<SoftInfo | undefined>) {
      state.changingSoft = action.payload;
    },
    changeActionArticle(state, action: PayloadAction<ArtileAction>) {
      state.actionArticle = action.payload;
    },
    choseSoftId(state, action: PayloadAction<string | undefined>) {
      state.chosenSoftId = action.payload;
    },
    choseArticleId(state, action: PayloadAction<string | undefined>) {
      state.choosenArticleId = action.payload;
    },
  },
});

export default softSlice.reducer;

export const { changeSoft, changeActionArticle, choseSoftId, choseArticleId } = softSlice.actions;
export const getChangingSoft = (state: RootState) => state.soft.changingSoft;
export const getActionArticle = (state: RootState) => state.soft.actionArticle;
export const getSoftId = (state: RootState) => state.soft.chosenSoftId;
export const getArticleId = (state: RootState) => state.soft.choosenArticleId;
