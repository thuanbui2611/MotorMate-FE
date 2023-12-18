import Autocomplete from "@mui/material/Autocomplete";
import { UserDetail } from "../models/User";
import { useEffect, useState } from "react";
import LoaderButton from "./LoaderButton";
import agent from "../api/agent";
import { Box, Paper, TextField } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../store/ConfigureStore";
import { setStartChatToUser } from "../../pages/chat/ChatSlice";
import { getUsersAsync } from "../../pages/filter/FilterSlice";

interface Props {
  onSelect: (user: string) => void;
}
export default function SelectUserChat({ onSelect }: Props) {
  const [selectedUser, setSelectedUser] = useState<UserDetail | null>(null);

  const { startChatToUser } = useAppSelector((state) => state.chat);
  const { users, usersLoading } = useAppSelector((state) => state.filter);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (users.length === 0 && !usersLoading) {
      dispatch(getUsersAsync());
    }
  }, []);

  // Start chat to user on click message user button
  useEffect(() => {
    if (startChatToUser && !usersLoading) {
      const userSelected =
        users.find(
          (user) =>
            user.username.toLowerCase() === startChatToUser.toLowerCase()
        ) || null;
      setSelectedUser(userSelected);
      if (userSelected) onSelect(userSelected.username);
      dispatch(setStartChatToUser(null));
    }
  }, [startChatToUser, usersLoading]);

  const handleUserChange = (
    event: React.SyntheticEvent<Element, Event>,
    newValue: UserDetail | null
  ) => {
    setSelectedUser(newValue);
    if (newValue) {
      onSelect(newValue?.username);
    }
  };

  return (
    <>
      {usersLoading ? (
        <LoaderButton />
      ) : (
        <Autocomplete
          openOnFocus={true}
          fullWidth={true}
          size="small"
          disablePortal
          value={selectedUser}
          options={users}
          getOptionLabel={(option) => option.username}
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
                    src={option.image.imageUrl}
                    alt="logo"
                  />
                </div>
                <div className="flex-1 line-clamp-1">{option.username}</div>
              </div>
            </Box>
          )}
          renderInput={(params) => (
            <TextField
              {...params}
              required
              placeholder="Find user to start a chat..."
              sx={{
                "& label.Mui-focused": {
                  color: "#FF7E06",
                },
                "& .MuiOutlinedInput-input": {
                  boxShadow: "none",
                },
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "#6B7280",
                  },
                  "&:hover fieldset": {
                    borderColor: "#FF7E06",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#FF7E06",
                  },
                },
              }}
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
                          src={selectedUser.image.imageUrl}
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
