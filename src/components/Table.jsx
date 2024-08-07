import { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Box } from '@mui/material';

const ThePillowsSongsTable = () => {
  const [songs, setSongs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredSongs, setFilteredSongs] = useState([]);

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const response = await fetch('/thepillowsYeahSongs.json');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const songs = await response.json();
        setSongs(songs);
        setFilteredSongs(songs);
      } catch (error) {
        console.error("Error fetching the pillows' songs", error);
      }
    };

    fetchSongs();
  }, []);

  useEffect(() => {
    const filtered = songs.filter(row => 
      ["songName", "albumName", "year"].some(key =>
        row[key]?.toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
    
    setFilteredSongs(filtered);
  }, [searchTerm, songs]);

  const handleSearchChange = (event) => {
    const searchTerm = event.target.value.toLocaleLowerCase();
    setSearchTerm(searchTerm);
  };

  const columns = [
    { field: 'id', headerName: '#', width: 60 },
    { field: 'songName', headerName: 'Song Name', width: 400, flex: 1 },
    { field: 'albumName', headerName: 'Album Name', width: 255, flex: 1 },
    { field: 'discType', headerName: 'Disc Type', width: 115 },
    { field: 'year', headerName: 'Year', type: 'number', width: 80 },
    { field: 'numberOfYeah', headerName: 'Yeahs', type: 'number', width: 90 }
  ];

  return (
    <>
      <input id="tp-search-song" name="tp-search-song" type="search" value={searchTerm} onChange={handleSearchChange} placeholder="Search a song, album, or year" />

      <Box>
        <DataGrid columns={columns} rows={filteredSongs} pageSizeOptions={[10]} density='compact'
            initialState={{
              sorting: {
                sortModel: [{ field: "numberOfYeah", sort: "desc" }],
              },
              pagination: {
                  paginationModel: {
                      pageSize: 10,
                  },
              },
            }}
            sx={{
                '.MuiDataGrid-columnSeparator': {
                  display: 'none',
                },
                '.MuiDataGrid-columnHeader': {
                    backgroundColor: '#ffbc09',
                },
                '.MuiDataGrid-columnHeaderTitle': {
                    fontWeight: '700'
                },
                '.MuiDataGrid-row:nth-of-type(2n+1)': {
                    backgroundColor: 'rgba(0,0,0,.05)'
                },
                '.MuiTablePagination-root': {
                    margin: 'auto'
                },
            }}
            autoHeight
            disableRowSelectionOnClick
            disableColumnFilter
            disableColumnMenu
            disableAutosize
            disableColumnResize
        />
      </Box>
    </>
  );
};

export default ThePillowsSongsTable;
