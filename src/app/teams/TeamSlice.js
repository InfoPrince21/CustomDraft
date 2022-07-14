import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { baseUrl } from '../../app/shared/baseUrl';
import { mapImageURL } from '../../utils/mapImageURL';

export const draftedPlayersList = createAsyncThunk(
    'teams/draftedPlayersList',
  async (staffData, { dispatch }) => {
      const response = await fetch(
          (baseUrl + 'DraftedPlayers'),
          {
            method: 'POST',
            body: JSON.stringify(staffData),
            headers: { 'Content-Type': 'application/json' }
        }
      );
      if(!response.ok) {
          return Promise.reject('Unable to fetch, status: ' + response.status);
      }
      const data = await response.json();
    //   dispatch(setDraftTeam1(data))
      
      
  }
);

export const draftTeam1 = createAsyncThunk(
    'teams/draftTeam1',
  async (staffData, { dispatch }) => {
      const response = await fetch(
          (baseUrl + 'Draft-Team1'),
          {
            method: 'POST',
            body: JSON.stringify(staffData),
            headers: { 'Content-Type': 'application/json' }
        }
      );
      if(!response.ok) {
          return Promise.reject('Unable to fetch, status: ' + response.status);
      }
      const data = await response.json();
      dispatch(setDraftTeam1(data))
      
      
  }
);

export const draftTeam2 = createAsyncThunk(
    'teams/draftTeam2',
  async (staffData, { dispatch }) => {
      const response = await fetch(
          (baseUrl + 'Draft-Team2'),
          {
            method: 'POST',
            body: JSON.stringify(staffData),
            headers: { 'Content-Type': 'application/json' }
        }
      );
      if(!response.ok) {
          return Promise.reject('Unable to fetch, status: ' + response.status);
      }
      const data = await response.json();
      dispatch(setDraftTeam2(data))
  }
);

export const draftTeam3 = createAsyncThunk(
    'teams/draftTeam3',
  async (staffData, { dispatch }) => {
      const response = await fetch(
          (baseUrl + 'Draft-Team3'),
          {
            method: 'POST',
            body: JSON.stringify(staffData),
            headers: { 'Content-Type': 'application/json' }
        }
      );
      if(!response.ok) {
          return Promise.reject('Unable to fetch, status: ' + response.status);
      }
      const data = await response.json();
      dispatch(setDraftTeam3(data))
  }
);

export const deleteTeams = createAsyncThunk(
    'teams/deleteTeam',
  async (id, { dispatch }) => {
      const response = await fetch(
          (baseUrl + 'teams/' + id),
          {
              method: 'DELETE'
          }
      );
      if(!response.ok) {
          return Promise.reject('Unable to fetch, status: ' + response.status);
      }
      dispatch(removeTeam(id));
  }
);

export const undoDraftedTeams = createAsyncThunk(
    'teams/undoDraftedTeams',
  async (id, { dispatch }) => {
      const response = await fetch(
          (baseUrl + 'DraftedPlayers/' + id),
          {
              method: 'DELETE'
          }
      );
      if(!response.ok) {
          return Promise.reject('Unable to fetch, status: ' + response.status);
      }
      dispatch(undoLastDraftedTeams(id));
      
  }
);


export const undoTeam1 = createAsyncThunk(
    'teams/undoTeam',
  async (id, { dispatch }) => {
      const response = await fetch(
          (baseUrl + 'Draft-Team1/' + id),
          {
              method: 'DELETE'
          }
      );
      if(!response.ok) {
          return Promise.reject('Unable to fetch, status: ' + response.status);
      }
      dispatch(undoDraftTeam1(id));
      
  }
);

export const undoTeam2 = createAsyncThunk(
    'teams/undoTeam',
  async (id, { dispatch }) => {
      const response = await fetch(
          (baseUrl + 'Draft-Team2/' + id),
          {
              method: 'DELETE'
          }
      );
      if(!response.ok) {
          return Promise.reject('Unable to fetch, status: ' + response.status);
      }
      dispatch(undoDraftTeam2(id));
      
  }
);

export const undoTeam3 = createAsyncThunk(
    'teams/undoTeam',
  async (id, { dispatch }) => {
      const response = await fetch(
          (baseUrl + 'Draft-Team3/' + id),
          {
              method: 'DELETE'
          }
      );
      if(!response.ok) {
          return Promise.reject('Unable to fetch, status: ' + response.status);
      }
      dispatch(undoDraftTeam3(id));
      
  }
);

export const fetchTeams = createAsyncThunk(
    'teams/fetchTeams',
    async () => {
        const response = await fetch(baseUrl + 'teams');
        if (!response.ok) {
            return Promise.reject('Unable to fetch, status: ' + response.status);
        }
        const data = await response.json();
        return data;
    }
);

export const fetchDraftedPlayers = createAsyncThunk(
    'teams/fetchDraftedPlayers',
    async () => {
        const response = await fetch(baseUrl + 'DraftedPlayers');
        if (!response.ok) {
            return Promise.reject('Unable to fetch, status: ' + response.status);
        }
        const data = await response.json();
        // dispatch(setDraftedPlayers(data));
        return data;
    }
);

export const fetchTeam1 = createAsyncThunk(
    'teams/fetchTeam1',
    async () => {
        const response = await fetch(baseUrl + 'Draft-Team1');
        if (!response.ok) {
            return Promise.reject('Unable to fetch, status: ' + response.status);
        }
        const data = await response.json();
        
        return data;
    }
);

export const fetchTeam2 = createAsyncThunk(
    'teams/fetchTeam2',
    async () => {
        const response = await fetch(baseUrl + 'Draft-Team2');
        if (!response.ok) {
            return Promise.reject('Unable to fetch, status: ' + response.status);
        }
        const data = await response.json();
        
        return data;
    }
);

export const fetchTeam3 = createAsyncThunk(
    'teams/fetchTeam3',
    async () => {
        const response = await fetch(baseUrl + 'Draft-Team3');
        if (!response.ok) {
            return Promise.reject('Unable to fetch, status: ' + response.status);
        }
        const data = await response.json();
        
        return data;
    }
);

const initialState = {
    teamsArray: [],
    draftTeam1Array: [],
    draftTeam2Array: [],
    draftTeam3Array: [],
    isLoading: true,
    loadingDraft: false,
    playerDrafted: false,
    dratedPlayers: [],
    errMsg: ''
};

const teamsSlice = createSlice({
    name: 'teams',
    initialState,
    reducers: {
        removeTeam: (state, action) => {
            state.teamsArray = state.teamsArray.filter(team => team.id != parseInt(action.payload));
        },
        undoDraftTeam1: (state, action) => {
            state.draftTeam1Array = state.draftTeam1Array.filter(team => team.id != parseInt(action.payload));
            state.playerDrafted = false;
            // state.dratedPlayers = state.dratedPlayers.filter(team => team != parseInt(action.payload));
        },
        undoDraftTeam2: (state, action) => {
            state.draftTeam2Array = state.draftTeam2Array.filter(team => team.id != parseInt(action.payload));
            // state.dratedPlayers = state.dratedPlayers.filter(team => team != parseInt(action.payload));
        },
        undoDraftTeam3: (state, action) => {
            state.draftTeam3Array = state.draftTeam3Array.filter(team => team.id != parseInt(action.payload));
            // state.dratedPlayers = state.dratedPlayers.filter(team => team != parseInt(action.payload));
        },
        undoLastDraftedTeams: (state, action) => {
            state.dratedPlayers = state.dratedPlayers.filter(team => team != parseInt(action.payload));
        },
        setDraftTeam1: (state, action,) => {
            state.draftTeam1Array.push(action.payload)
            state.dratedPlayers.push(action.payload.id)
            // state.playerDrafted = true;
            
        },
        setDraftTeam2: (state, action) => {
            state.draftTeam2Array.push(action.payload)
            state.dratedPlayers.push(action.payload.id)
            
        },
        setDraftTeam3: (state, action) => {
            state.draftTeam3Array.push(action.payload)
            state.dratedPlayers.push(action.payload.id)
            
        },
        setDraftPlayers: (state, action) => {
            state.dratedPlayers.push(action.payload)
            
        },
    },
    extraReducers: {
        [fetchTeams.pending]: (state) => {
            state.isLoading = true;
        },
        [fetchTeams.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.errMsg = '';
            state.teamsArray = mapImageURL(action.payload);
        },
        [fetchTeams.rejected]: (state, action) => {
            state.isLoading = false;
            state.errMsg = action.error ? action.error.message : 'Fetch failed';
        },
        [fetchTeam1.pending]: (state) => {
            state.isLoading = true;
        },
        [fetchTeam1.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.errMsg = '';
            state.draftTeam1Array = (action.payload);
        },
        [fetchTeam1.rejected]: (state, action) => {
            state.isLoading = false;
            state.errMsg = action.error ? action.error.message : 'Fetch failed';
        },
        [fetchTeam2.pending]: (state) => {
            state.isLoading = true;
        },
        [fetchTeam2.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.errMsg = '';
            state.draftTeam2Array = (action.payload);
        },
        [fetchTeam2.rejected]: (state, action) => {
            state.isLoading = false;
            state.errMsg = action.error ? action.error.message : 'Fetch failed';
        },
        [fetchTeam3.pending]: (state) => {
            state.isLoading = true;
        },
        [fetchTeam3.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.errMsg = '';
            state.draftTeam3Array = (action.payload);
        },
        [fetchTeam3.rejected]: (state, action) => {
            state.isLoading = false;
            state.errMsg = action.error ? action.error.message : 'Fetch failed';
        },
        [draftTeam1.pending]: (state) => {
            state.loadingDraft= true;
        },
        [draftTeam1.fulfilled]: (state, action) => {
            state.loadingDraft = false;
            state.errMsg = '';
            // state.teamsArray = mapImageURL(action.payload);
        },
        [draftTeam1.rejected]: (state, action) => {
            state.loadingDraft = false;
            state.errMsg = action.error ? action.error.message : 'Fetch failed';
        },
        [draftTeam2.pending]: (state) => {
            state.loadingDraft= true;
        },
        [draftTeam2.fulfilled]: (state, action) => {
            state.loadingDraft = false;
            state.errMsg = '';
            // state.teamsArray = mapImageURL(action.payload);
        },
        [draftTeam2.rejected]: (state, action) => {
            state.loadingDraft = false;
            state.errMsg = action.error ? action.error.message : 'Fetch failed';
        },
        [draftTeam3.pending]: (state) => {
            state.loadingDraft= true;
        },
        [draftTeam3.fulfilled]: (state, action) => {
            state.loadingDraft = false;
            state.errMsg = '';
            // state.teamsArray = mapImageURL(action.payload);
        },
        [draftTeam3.rejected]: (state, action) => {
            state.loadingDraft = false;
            state.errMsg = action.error ? action.error.message : 'Fetch failed';
        },
        [undoTeam1.pending]: (state) => {
            state.loadingDraft= true;
        },
        [undoTeam1.fulfilled]: (state, action) => {
            state.loadingDraft = false;
            state.errMsg = '';
            // state.teamsArray = mapImageURL(action.payload);
        },
        [undoTeam1.rejected]: (state, action) => {
            state.loadingDraft = false;
            state.errMsg = action.error ? action.error.message : 'Fetch failed';
        },
        [draftedPlayersList.pending]: (state) => {
            state.loadingDraft= true;
        },
        [draftedPlayersList.fulfilled]: (state, action) => {
            state.loadingDraft = false;
            state.errMsg = '';
            state.dratedPlayers.push(action.payload.id);
        },
        [draftedPlayersList.rejected]: (state, action) => {
            state.loadingDraft = false;
            state.errMsg = action.error ? action.error.message : 'Fetch failed';
        },
        [fetchDraftedPlayers.pending]: (state) => {
            state.loadingDraft= true;
        },
        [fetchDraftedPlayers.fulfilled]: (state, action) => {
            state.loadingDraft = false;
            state.errMsg = '';
            const tempArray = action.payload
            tempArray.map(team => state.dratedPlayers.push(team.id));
        },
        [fetchDraftedPlayers.rejected]: (state, action) => {
            state.loadingDraft = false;
            state.errMsg = action.error ? action.error.message : 'Fetch failed';
        },
    }
});





export const {undoLastDraftedTeams, setDraftedPlayers, removeTeam, setDraftTeam1, setDraftTeam2, setDraftTeam3, undoDraftTeam1, undoDraftTeam2, undoDraftTeam3} = teamsSlice.actions;


export const teamsReducer = teamsSlice.reducer;

export const selectAllTeams = (state) => {
    return state.teams.teamsArray;
};

export const selectAllDrafted = (state) => {
    return state.teams.dratedPlayers;
};

export const selectAllTeam1 = (state) => {
    return state.teams.draftTeam1Array;
};


export const selectAllTeam2 = (state) => {
    return state.teams.draftTeam2Array
};

export const selectAllTeam3 = (state) => {
    return state.teams.draftTeam3Array;
};

export const selectTeamById = (id) => (state) => {
    return state.teams.teamsArray.find((team) => team.id === parseInt(id));
};

export const deleteTeamById = (id) => (state) => {
    return state.teams.teamsArray.filter((team) => team.id != parseInt(id));
};

export const removeDraftTeam1ById = (id) => (state) => {
    return state.teams.draftTeam1Array.filter((team) => team.id != parseInt(id));
};

export const selectFeaturedTeam= (state) => {
    return {
        featuredItem: state.teams.teamsArray.find(
            (team) => team.featured
            ),
        isLoading: state.teams.isLoading,
        errMsg: state.teams.errMsg
    };
};