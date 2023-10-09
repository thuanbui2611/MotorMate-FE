import Autocomplete from "@mui/material/Autocomplete";
import { UserDetail } from "../models/User";
import { useEffect, useState } from "react";
import LoaderButton from "./LoaderButton";
import agent from "../api/agent";
import { Box, Paper, TextField } from "@mui/material";

interface Props {
  onSelect: (user: string) => void;
}
export default function SelectUserChat({ onSelect }: Props) {
  const [users, setUsers] = useState<UserDetail[]>([]);
  const [selectedUser, setSelectedUser] = useState<UserDetail | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await agent.User.all();
        setUsers(response);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, []);

  const handleUserChange = (
    event: React.SyntheticEvent<Element, Event>,
    newValue: UserDetail | null
  ) => {
    setSelectedUser(newValue);
    if (newValue) {
      onSelect(newValue?.userName);
    }
  };

  return (
    <>
      {loading ? (
        <LoaderButton />
      ) : (
        <Autocomplete
          openOnFocus={true}
          fullWidth={true}
          size="small"
          disablePortal
          value={selectedUser}
          options={users}
          getOptionLabel={(option) => option.userName}
          onChange={(event, newValue) => handleUserChange(event, newValue)}
          noOptionsText="No users found"
          renderOption={(props, option) => (
            <Box
              component="li"
              sx={{
                "& > img": { mr: 2, flexShrink: 0 },
              }}
              {...props}
            >
              <div className="flex items-center justify-start">
                <div className="h-8 w-8 rounded-md mr-2 ">
                  <img
                    className="h-full w-full rounded-md object-cover"
                    src={option.picture}
                    alt="logo"
                  />
                </div>
                <div className="flex-1 line-clamp-1">{option.userName}</div>
              </div>
            </Box>
          )}
          renderInput={(params) => (
            <TextField
              {...params}
              required
              placeholder="Find user to start a chat..."
              InputProps={{
                ...params.InputProps,
                endAdornment: null,
                style: { paddingRight: 8 },
                startAdornment: (
                  <>
                    {selectedUser && (
                      <div className="h-6 w-6 flex justify-center items-center">
                        <img
                          className="h-full w-full rounded-full mb-[1px]"
                          src={selectedUser.picture}
                          alt="avatar"
                        />
                      </div>
                    )}
                    {params.InputProps.startAdornment}
                  </>
                ),
              }}
            />
          )}
          ListboxProps={{
            className: "scrollbar",
            style: { maxHeight: 180, overflow: "auto" },
          }}
        />
      )}
    </>
  );
}
